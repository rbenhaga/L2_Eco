const CHECKOUT_RETURN_STORAGE_KEY = 'stripe_checkout_return_guard_v1';
const CHECKOUT_PENDING_MAX_AGE_MS = 6 * 60 * 60 * 1000;
const CHECKOUT_VERIFIED_MAX_AGE_MS = 12 * 60 * 60 * 1000;
const STRIPE_CHECKOUT_SESSION_ID_PATTERN = /^cs_(?:test|live)_[A-Za-z0-9]+$/;
const CHECKOUT_CANCEL_TOKEN_PATTERN = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

interface StoredCheckoutAttempt {
  sessionId: string;
  userId: string;
  cancelToken: string | null;
  createdAt: number;
  verifiedAt: number | null;
}

interface StoredCheckoutState {
  attempts: StoredCheckoutAttempt[];
}

function getStorage(): Storage | null {
  try {
    return window.sessionStorage;
  } catch {
    return null;
  }
}

function readState(): StoredCheckoutState {
  const storage = getStorage();
  if (!storage) {
    return { attempts: [] };
  }

  try {
    const raw = storage.getItem(CHECKOUT_RETURN_STORAGE_KEY);
    if (!raw) {
      return { attempts: [] };
    }

    const parsed = JSON.parse(raw) as Partial<StoredCheckoutState>;
    return {
      attempts: Array.isArray(parsed.attempts) ? parsed.attempts.filter(Boolean) as StoredCheckoutAttempt[] : [],
    };
  } catch {
    return { attempts: [] };
  }
}

function writeState(state: StoredCheckoutState) {
  const storage = getStorage();
  if (!storage) {
    return;
  }

  storage.setItem(CHECKOUT_RETURN_STORAGE_KEY, JSON.stringify(state));
}

function isAttemptFresh(attempt: StoredCheckoutAttempt, now = Date.now()) {
  if (attempt.verifiedAt) {
    return now - attempt.verifiedAt <= CHECKOUT_VERIFIED_MAX_AGE_MS;
  }

  return now - attempt.createdAt <= CHECKOUT_PENDING_MAX_AGE_MS;
}

function cleanupAttempts(attempts: StoredCheckoutAttempt[], now = Date.now()) {
  return attempts.filter((attempt) => {
    if (!attempt?.sessionId || !attempt?.userId) {
      return false;
    }

    return isAttemptFresh(attempt, now);
  });
}

function updateAttempts(mutator: (attempts: StoredCheckoutAttempt[]) => StoredCheckoutAttempt[]) {
  const now = Date.now();
  const current = cleanupAttempts(readState().attempts, now);
  const next = cleanupAttempts(mutator(current), now);
  writeState({ attempts: next });
}

export function isStripeCheckoutSessionId(value: string | null | undefined): value is string {
  return typeof value === 'string' && STRIPE_CHECKOUT_SESSION_ID_PATTERN.test(value.trim());
}

export function isCheckoutCancelToken(value: string | null | undefined): value is string {
  return typeof value === 'string' && CHECKOUT_CANCEL_TOKEN_PATTERN.test(value.trim());
}

export function rememberCheckoutSessionStart(sessionId: string, userId: string, cancelToken?: string | null) {
  if (!isStripeCheckoutSessionId(sessionId) || !userId) {
    return;
  }

  updateAttempts((attempts) => {
    const otherAttempts = attempts.filter((attempt) => attempt.sessionId !== sessionId);
    return [
      ...otherAttempts,
      {
        sessionId,
        userId,
        cancelToken: isCheckoutCancelToken(cancelToken) ? cancelToken : null,
        createdAt: Date.now(),
        verifiedAt: null,
      },
    ];
  });
}

export function markCheckoutSessionVerified(sessionId: string, userId: string) {
  if (!isStripeCheckoutSessionId(sessionId) || !userId) {
    return;
  }

  updateAttempts((attempts) => {
    let updated = false;
    const nextAttempts = attempts.map((attempt) => {
      if (attempt.sessionId !== sessionId || attempt.userId !== userId) {
        return attempt;
      }

      updated = true;
      return {
        ...attempt,
        verifiedAt: Date.now(),
      };
    });

    if (updated) {
      return nextAttempts;
    }

    return [
      ...nextAttempts,
      {
        sessionId,
        userId,
        cancelToken: null,
        createdAt: Date.now(),
        verifiedAt: Date.now(),
      },
    ];
  });
}

export function hasRecentCheckoutAccess(sessionId: string, userId: string) {
  if (!isStripeCheckoutSessionId(sessionId) || !userId) {
    return false;
  }

  const now = Date.now();
  const attempts = cleanupAttempts(readState().attempts, now);
  writeState({ attempts });

  return attempts.some((attempt) => attempt.sessionId === sessionId && attempt.userId === userId);
}

export function getMostRecentCheckoutAttempt(userId?: string | null): StoredCheckoutAttempt | null {
  if (!userId) {
    return null;
  }

  const now = Date.now();
  const attempts = cleanupAttempts(readState().attempts, now);
  writeState({ attempts });

  const matchingAttempts = attempts
    .filter((attempt) => attempt.userId === userId)
    .sort((left, right) => {
      const leftTime = left.verifiedAt ?? left.createdAt;
      const rightTime = right.verifiedAt ?? right.createdAt;
      return rightTime - leftTime;
    });

  return matchingAttempts[0] || null;
}

export function getMostRecentPendingCheckoutAttempt(userId?: string | null): StoredCheckoutAttempt | null {
  if (!userId) {
    return null;
  }

  const now = Date.now();
  const attempts = cleanupAttempts(readState().attempts, now);
  writeState({ attempts });

  const matchingAttempts = attempts
    .filter((attempt) => attempt.userId === userId && !attempt.verifiedAt)
    .sort((left, right) => right.createdAt - left.createdAt);

  return matchingAttempts[0] || null;
}

export function getPendingCheckoutAttemptByCancelToken(cancelToken: string, userId?: string | null): StoredCheckoutAttempt | null {
  if (!isCheckoutCancelToken(cancelToken)) {
    return null;
  }

  const now = Date.now();
  const attempts = cleanupAttempts(readState().attempts, now);
  writeState({ attempts });

  const matchingAttempts = attempts
    .filter((attempt) => {
      if (attempt.verifiedAt || attempt.cancelToken !== cancelToken) {
        return false;
      }

      if (!userId) {
        return true;
      }

      return attempt.userId === userId;
    })
    .sort((left, right) => right.createdAt - left.createdAt);

  return matchingAttempts[0] || null;
}

export function hasRecentCheckoutCancelAccess(cancelToken: string, userId?: string | null) {
  return Boolean(getPendingCheckoutAttemptByCancelToken(cancelToken, userId));
}

export function clearCheckoutSessionAttempt(sessionId: string, userId?: string | null) {
  if (!isStripeCheckoutSessionId(sessionId)) {
    return;
  }

  updateAttempts((attempts) => attempts.filter((attempt) => {
    if (attempt.sessionId !== sessionId) {
      return true;
    }

    if (!userId) {
      return false;
    }

    return attempt.userId !== userId;
  }));
}
