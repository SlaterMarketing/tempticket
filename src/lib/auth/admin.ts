const ADMIN_EMAIL = "will@slatermarketing.co.uk";

export function isAdminEmail(email: string) {
  return email.trim().toLowerCase() === ADMIN_EMAIL;
}
