export const MOCK_LOGGED_OUT_COOKIE = 'mock_logged_out'

export function isMockLoggedOutCookie(value: string | undefined): boolean {
  return value === '1'
}

/** Client-only: mark mock session as logged out */
export function setMockLoggedOut(): void {
  document.cookie = `${MOCK_LOGGED_OUT_COOKIE}=1; path=/`
}

/** Client-only: restore mock session on login */
export function clearMockLoggedOut(): void {
  document.cookie = `${MOCK_LOGGED_OUT_COOKIE}=; path=/; max-age=0`
}
