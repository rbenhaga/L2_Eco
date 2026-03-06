const adminEmails = String(process.env.ADMIN_EMAILS || '')
    .split(',')
    .map((value) => value.trim().toLowerCase())
    .filter(Boolean);

export function isAdminEmail(email) {
    const normalized = String(email || '').trim().toLowerCase();
    if (!normalized) return false;
    return adminEmails.includes(normalized);
}

export function isAdminUser(user) {
    return isAdminEmail(user?.email);
}
