// API utility file for frontend

// determine base URL from environment variable or default to local server
let API_BASE_URL = ((import.meta as any).env.VITE_API_URL as string) || 'http://localhost:5000/api';
// remove any trailing slash(es)
API_BASE_URL = API_BASE_URL.replace(/\/+$/g, '');

if (!API_BASE_URL.startsWith('http')) {
  console.warn('VITE_API_URL may be misconfigured:', API_BASE_URL);
}

// helper that ensures a leading slash when joining
const makeUrl = (path: string) => {
  const prefix = path.startsWith('/') ? '' : '/';
  return `${API_BASE_URL}${prefix}${path}`;
};

interface APIResponse {
  success: boolean;
  message?: string;
  registrationId?: string;
  [key: string]: any;
}

// FCC Registration APIs
export const fccAPI = {
  // Save registration
  saveRegistration: async (formData: any): Promise<APIResponse> => {
    try {
      const url = makeUrl('/forms/fcc-registration');
      console.debug('fccAPI.saveRegistration posting to', url);
      const response = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      return await response.json();
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
