export function getRedirectUrl(path: string = '/auth/callback'): string {
  const base = import.meta.env.VITE_PUBLIC_URL || window.location.origin;
  return `${base}${path}`;
}
