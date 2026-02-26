// API utility file for frontend

// determine base URL from environment variable or default to local server
let API_BASE_URL = ((import.meta as any).env.VITE_API_URL as string) || 'http://localhost:5000/api';

// strip any accidental leading junk like "[{" or whitespace
API_BASE_URL = API_BASE_URL.replace(/^[^h]*?(https?:\/\/)/, '$1');
// remove any trailing slash(es)
API_BASE_URL = API_BASE_URL.replace(/\/+$/g, '');

// final sanity check
if (!API_BASE_URL.startsWith('http')) {
  console.warn('VITE_API_URL may be misconfigured:', API_BASE_URL);
}

// ensure the base URL includes the /api path expected by the server
let API_PATH_PREFIX = '';
if (!API_BASE_URL.endsWith('/api')) {
  API_PATH_PREFIX = '/api';
}

console.debug('Using API_BASE_URL =', API_BASE_URL + API_PATH_PREFIX);

// helper that ensures a leading slash when joining and adds the prefix
const makeUrl = (path: string) => {
  const leading = path.startsWith('/') ? '' : '/';
  return `${API_BASE_URL}${API_PATH_PREFIX}${leading}${path}`;
};

interface APIResponse {
  success: boolean;
  message?: string;
  registrationId?: string;
  [key: string]: any;
}

export const fccAPI = {
  // Save registration
  saveRegistration: async (formData: any): Promise<APIResponse> => {
    try {
      const url = makeUrl('/forms/fcc-registration');
      console.debug('fccAPI.saveRegistration posting to', url);
      console.debug('Payload:', formData);
      
      const response = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      
      console.debug('Response status:', response.status, response.statusText);
      const data = await response.json();
      console.debug('Response data:', data);
      
      if (!response.ok) {
        console.error('Server returned error:', response.status, data);
      }
      
      return data;
    } catch (error) {
      console.error('Error saving registration:', error);
      throw error;
    }
  },
};

// Join Page APIs
export const joinAPI = {
  // Save join page submission
  saveSubmission: async (selectedPath: string, formData: any): Promise<APIResponse> => {
    try {
      const url = makeUrl('/forms/join-submission');
      console.debug('joinAPI.saveSubmission posting to', url);
      const response = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ selectedPath, formData }),
      });
      return await response.json();
    } catch (error) {
      console.error('Error saving join submission:', error);
      throw error;
    }
  },
};
