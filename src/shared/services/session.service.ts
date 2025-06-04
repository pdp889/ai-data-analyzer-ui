const SESSION_TOKEN_KEY = 'session_token';
const SESSION_TOKEN_HEADER = 'x-session-token';

export const getSessionToken = (): string | null => {
  const token = localStorage.getItem(SESSION_TOKEN_KEY);
  console.log('Getting session token from localStorage:', token);
  return token;
};

export const setSessionToken = (token: string): void => {
  console.log('Setting session token in localStorage:', token);
  localStorage.setItem(SESSION_TOKEN_KEY, token);
};

export const clearSessionToken = (): void => {
  console.log('Clearing session token from localStorage');
  localStorage.removeItem(SESSION_TOKEN_KEY);
};

export const getAuthHeaders = (): HeadersInit => {
  const token = getSessionToken();
  console.log('Getting auth headers with token:', token);
  return {
    'Accept': 'application/json',
    'X-Requested-With': 'XMLHttpRequest',
    ...(token ? { [SESSION_TOKEN_HEADER]: token } : {})
  };
};

export const extractSessionToken = (response: Response): string | null => {
  const token = response.headers.get(SESSION_TOKEN_HEADER);
  console.log('Extracting session token from response:', token);
  return token;
}; 