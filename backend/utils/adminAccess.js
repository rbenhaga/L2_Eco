const adminEmails = String(process.env.ADMIN_EMAILS || '')
    .split(',')
    .map((value) => value.trim().toLowerCase())
    .filter(Boolean);
const adminUids = String(process.env.ADMIN_UIDS || '')
    .split(',')
    .map((value) => value.trim())
    .filter(Boolean);

export function isAdminEmail(email) {
    const normalized = String(email || '').trim().toLowerCase();
    if (!normalized) return false;
    return adminEmails.includes(normalized);
}

export function isAdminUid(uid) {
    const normalized = String(uid || '').trim();
    if (!normalized) return false;
    return adminUids.includes(normalized);
}

export function isAdminUser(user) {
    return isAdminUid(user?.uid) || isAdminEmail(user?.email);
}
