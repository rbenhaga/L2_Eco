import { getDefaultLearningPath, normalizeEnabledSemester } from '../config/semesterAccess';
import { authFetch } from './authFetch';

export function getCachedCourseEntryPath(userId?: string | null): string | null {
  if (!userId) return null;

  try {
    const raw = localStorage.getItem(`last-nav-${userId}`);
    if (!raw) return null;

    const parsed = JSON.parse(raw);
    return `/${normalizeEnabledSemester(parsed?.semester)}/macro`;
  } catch {
    return null;
  }
}

export async function resolveCourseEntryPath(userId?: string | null, apiUrl?: string): Promise<string> {
  if (!userId) return getDefaultLearningPath();

  const cachedPath = getCachedCourseEntryPath(userId);
  if (cachedPath) return cachedPath;

  try {
    const response = await authFetch(`${apiUrl || 'http://localhost:3001'}/api/user/${userId}/semester`);
    if (response.ok) {
      const data = await response.json();
      return `/${normalizeEnabledSemester(data?.semester)}/macro`;
    }
  } catch {
    // Ignore and use the default fallback below.
  }

  return getDefaultLearningPath();
}
