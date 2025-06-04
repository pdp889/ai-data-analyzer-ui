const SESSION_TOKEN_KEY = 'session_token';
const SESSION_TOKEN_HEADER = 'x-session-token';

export const getSessionToken = (): string | null => {
  const token = localStorage.getItem(SESSION_TOKEN_KEY);
  return token;
};

export const setSessionToken = (token: string): void => {
  localStorage.setItem(SESSION_TOKEN_KEY, token);
};

export const clearSessionToken = (): void => {
  localStorage.removeItem(SESSION_TOKEN_KEY);
};

export const getAuthHeaders = (): HeadersInit => {
  const token = getSessionToken();
  return {
    Accept: 'application/json',
    'X-Requested-With': 'XMLHttpRequest',
    ...(token ? { [SESSION_TOKEN_HEADER]: token } : {}),
  };
};

export const extractSessionToken = (response: Response): string | null => {
  const token = response.headers.get(SESSION_TOKEN_HEADER);
  return token;
};
