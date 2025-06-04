import type { AnalysisResponse } from '../../features/analysis/types/analysis.types';
import { getAuthHeaders, setSessionToken, extractSessionToken } from './session.service';

const API_URL = import.meta.env.VITE_API_URL + '/existing-analysis';
const REQUEST_TIMEOUT = 300000; // 5 minutes

if (!API_URL) {
  throw new Error('VITE_API_URL environment variable is not set or endpoint is incorrect');
}

const createTimeoutPromise = (ms: number): Promise<never> =>
  new Promise((_, reject) => setTimeout(() => reject(new Error('Request timeout')), ms));

const handleResponse = async (response: Response): Promise<AnalysisResponse> => {
  // Log all response headers for debugging
  console.log('All response headers:', Object.fromEntries(response.headers.entries()));
  
  // Store the session token if it exists in the response
  const sessionToken = extractSessionToken(response);
  console.log('Session token from response:', sessionToken);
  if (sessionToken) {
    console.log('Setting session token in localStorage');
    setSessionToken(sessionToken);
  }

  if (!response.ok) {
    return { status: 'success', data: null, conversationHistory: undefined };
  }

  return response.json();
};

export const fetchExistingAnalysis = async (): Promise<AnalysisResponse> => {
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), REQUEST_TIMEOUT);

    const response = await Promise.race([
      fetch(API_URL, {
        method: 'GET',
        headers: {
          ...getAuthHeaders(),
          'Content-Type': 'application/json',
        },
        signal: controller.signal,
      }),
      createTimeoutPromise(REQUEST_TIMEOUT),
    ]);

    clearTimeout(timeoutId);
    return handleResponse(response);
  } catch (error) {
    if (error instanceof Error) {
      if (error.name === 'AbortError') {
        throw new Error('Request timed out');
      }
      throw new Error('An error occurred while fetching existing analysis');
    }
    return { status: 'success', data: null, conversationHistory: undefined };
  }
};
