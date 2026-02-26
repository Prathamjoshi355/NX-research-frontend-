// API utility file for frontend
const API_BASE_URL = ((import.meta as any).env.VITE_API_URL as string);

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
      const response = await fetch(`${API_BASE_URL}/forms/fcc-registration`, {
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
      const response = await fetch(`${API_BASE_URL}/forms/join-submission`, {
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
