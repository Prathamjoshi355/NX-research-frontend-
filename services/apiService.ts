/**
 * API Service for NX Research Frontend
 * This service handles all API calls to the backend
 */
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';


// Type definitions
interface ApplicationFilters {
  status?: string;
  category?: string;
  sortBy?: string;
}

interface RegistrationFilters {
  category?: string;
  status?: string;
  sortBy?: string;
}

interface CompanyFilters {
  status?: string;
  sortBy?: string;
}

interface ChallengeFilters {
  studentId?: string;
  status?: string;
  sortBy?: string;
}

// ==================== APPLICATION FORM ENDPOINTS ====================

export const applicationService = {
  // Get all applications
  getAllApplications: async (filters: ApplicationFilters = {}) => {
    try {
      const params = new URLSearchParams();
      if (filters.status) params.append('status', filters.status);
      if (filters.category) params.append('category', filters.category);
      if (filters.sortBy) params.append('sortBy', filters.sortBy);

      const response = await fetch(`${API_BASE_URL}/applications?${params}`);
      if (!response.ok) throw new Error('Failed to fetch applications');
      return await response.json();
    } catch (error) {
      console.error('Error fetching applications:', error);
      throw error;
    }
  },

  // Get single application
  getApplicationById: async (id: string) => {
    try {
      const response = await fetch(`${API_BASE_URL}/applications/${id}`);
      if (!response.ok) throw new Error('Application not found');
      return await response.json();
    } catch (error) {
      console.error('Error fetching application:', error);
      throw error;
    }
  },

  // Create new application
  createApplication: async (formData: any) => {
    try {
      const response = await fetch(`${API_BASE_URL}/applications`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      if (!response.ok) throw new Error('Failed to create application');
      return await response.json();
    } catch (error) {
      console.error('Error creating application:', error);
      throw error;
    }
  },

  // Update application
  updateApplication: async (id: string, formData: any) => {
    try {
      const response = await fetch(`${API_BASE_URL}/applications/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      if (!response.ok) throw new Error('Failed to update application');
      return await response.json();
    } catch (error) {
      console.error('Error updating application:', error);
      throw error;
    }
  },

  // Delete application
  deleteApplication: async (id: string) => {
    try {
      const response = await fetch(`${API_BASE_URL}/applications/${id}`, {
        method: 'DELETE',
      });
      if (!response.ok) throw new Error('Failed to delete application');
      return await response.json();
    } catch (error) {
      console.error('Error deleting application:', error);
      throw error;
    }
  },

  // Get application statistics
  getApplicationStats: async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/applications/stats`);
      if (!response.ok) throw new Error('Failed to fetch stats');
      return await response.json();
    } catch (error) {
      console.error('Error fetching application stats:', error);
      throw error;
    }
  },
};

// ==================== REGISTRATION FORM ENDPOINTS ====================

export const registrationService = {
  // Get all registrations
  getAllRegistrations: async (filters: RegistrationFilters = {}) => {
    try {
      const params = new URLSearchParams();
      if (filters.category) params.append('category', filters.category);
      if (filters.status) params.append('status', filters.status);
      if (filters.sortBy) params.append('sortBy', filters.sortBy);

      const response = await fetch(`${API_BASE_URL}/registrations?${params}`);
      if (!response.ok) throw new Error('Failed to fetch registrations');
      return await response.json();
    } catch (error) {
      console.error('Error fetching registrations:', error);
      throw error;
    }
  },

  // Get single registration
  getRegistrationById: async (id: string) => {
    try {
      const response = await fetch(`${API_BASE_URL}/registrations/${id}`);
      if (!response.ok) throw new Error('Registration not found');
      return await response.json();
    } catch (error) {
      console.error('Error fetching registration:', error);
      throw error;
    }
  },

  // Create new registration
  createRegistration: async (formData: any) => {
    try {
      const response = await fetch(`${API_BASE_URL}/registrations`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to create registration');
      }
      return await response.json();
    } catch (error) {
      console.error('Error creating registration:', error);
      throw error;
    }
  },

  // Update registration
  updateRegistration: async (id: string, formData: any) => {
    try {
      const response = await fetch(`${API_BASE_URL}/registrations/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      if (!response.ok) throw new Error('Failed to update registration');
      return await response.json();
    } catch (error) {
      console.error('Error updating registration:', error);
      throw error;
    }
  },

  // Delete registration
  deleteRegistration: async (id: string) => {
    try {
      const response = await fetch(`${API_BASE_URL}/registrations/${id}`, {
        method: 'DELETE',
      });
      if (!response.ok) throw new Error('Failed to delete registration');
      return await response.json();
    } catch (error) {
      console.error('Error deleting registration:', error);
      throw error;
    }
  },

  // Save form progress
  saveFormProgress: async (id: string, formProgress: number) => {
    try {
      const response = await fetch(`${API_BASE_URL}/registrations/${id}/progress`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ formProgress }),
      });
      if (!response.ok) throw new Error('Failed to save progress');
      return await response.json();
    } catch (error) {
      console.error('Error saving progress:', error);
      throw error;
    }
  },

  // Submit registration
  submitRegistration: async (id: string) => {
    try {
      const response = await fetch(`${API_BASE_URL}/registrations/${id}/submit`, {
        method: 'PATCH',
      });
      if (!response.ok) throw new Error('Failed to submit registration');
      return await response.json();
    } catch (error) {
      console.error('Error submitting registration:', error);
      throw error;
    }
  },

  // Upload logo for investor
  uploadLogoForInvestor: async (id: string, file: File) => {
    try {
      const formData = new FormData();
      formData.append('logo', file);

      const response = await fetch(`${API_BASE_URL}/registrations/${id}/upload-logo`, {
        method: 'POST',
        body: formData,
      });
      if (!response.ok) throw new Error('Failed to upload logo');
      return await response.json();
    } catch (error) {
      console.error('Error uploading logo:', error);
      throw error;
    }
  },

  // Get registration statistics
  getRegistrationStats: async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/registrations/stats`);
      if (!response.ok) throw new Error('Failed to fetch stats');
      return await response.json();
    } catch (error) {
      console.error('Error fetching registration stats:', error);
      throw error;
    }
  },
};

// ==================== COMPANY FORM ENDPOINTS ====================

export const companyService = {
  // Get all companies
  getAllCompanies: async (filters: CompanyFilters = {}) => {
    try {
      const params = new URLSearchParams();
      if (filters.status) params.append('status', filters.status);
      if (filters.sortBy) params.append('sortBy', filters.sortBy);

      const response = await fetch(`${API_BASE_URL}/companies?${params}`);
      if (!response.ok) throw new Error('Failed to fetch companies');
      return await response.json();
    } catch (error) {
      console.error('Error fetching companies:', error);
      throw error;
    }
  },

  // Get single company
  getCompanyById: async (id: string) => {
    try {
      const response = await fetch(`${API_BASE_URL}/companies/${id}`);
      if (!response.ok) throw new Error('Company not found');
      return await response.json();
    } catch (error) {
      console.error('Error fetching company:', error);
      throw error;
    }
  },

  // Create new company
  createCompany: async (formData: any) => {
    try {
      const response = await fetch(`${API_BASE_URL}/companies`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      if (!response.ok) throw new Error('Failed to create company');
      return await response.json();
    } catch (error) {
      console.error('Error creating company:', error);
      throw error;
    }
  },

  // Update company
  updateCompany: async (id: string, formData: any) => {
    try {
      const response = await fetch(`${API_BASE_URL}/companies/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      if (!response.ok) throw new Error('Failed to update company');
      return await response.json();
    } catch (error) {
      console.error('Error updating company:', error);
      throw error;
    }
  },

  // Delete company
  deleteCompany: async (id: string) => {
    try {
      const response = await fetch(`${API_BASE_URL}/companies/${id}`, {
        method: 'DELETE',
      });
      if (!response.ok) throw new Error('Failed to delete company');
      return await response.json();
    } catch (error) {
      console.error('Error deleting company:', error);
      throw error;
    }
  },

  // Upload logo
  uploadLogo: async (id: string, file: File) => {
    try {
      const formData = new FormData();
      formData.append('logo', file);

      const response = await fetch(`${API_BASE_URL}/companies/${id}/upload-logo`, {
        method: 'POST',
        body: formData,
      });
      if (!response.ok) throw new Error('Failed to upload logo');
      return await response.json();
    } catch (error) {
      console.error('Error uploading logo:', error);
      throw error;
    }
  },

  // Upload cover image
  uploadCoverImage: async (id: string, file: File) => {
    try {
      const formData = new FormData();
      formData.append('coverImage', file);

      const response = await fetch(`${API_BASE_URL}/companies/${id}/upload-cover`, {
        method: 'POST',
        body: formData,
      });
      if (!response.ok) throw new Error('Failed to upload cover image');
      return await response.json();
    } catch (error) {
      console.error('Error uploading cover image:', error);
      throw error;
    }
  },

  // Add problem
  addProblem: async (id: string, problemData: any, attachment: File | null = null) => {
    try {
      const formData = new FormData();
      formData.append('title', problemData.title);
      formData.append('description', problemData.description);
      formData.append('category', problemData.category);
      if (attachment) {
        formData.append('attachment', attachment);
      }

      const response = await fetch(`${API_BASE_URL}/companies/${id}/add-problem`, {
        method: 'POST',
        body: formData,
      });
      if (!response.ok) throw new Error('Failed to add problem');
      return await response.json();
    } catch (error) {
      console.error('Error adding problem:', error);
      throw error;
    }
  },

  // Add founder
  addFounder: async (id: string, founderData: any, image: File | null = null) => {
    try {
      const formData = new FormData();
      formData.append('name', founderData.name);
      formData.append('role', founderData.role);
      formData.append('bio', founderData.bio);
      formData.append('email', founderData.email);
      formData.append('linkedin', founderData.linkedin || '');
      if (image) {
        formData.append('image', image);
      }

      const response = await fetch(`${API_BASE_URL}/companies/${id}/add-founder`, {
        method: 'POST',
        body: formData,
      });
      if (!response.ok) throw new Error('Failed to add founder');
      return await response.json();
    } catch (error) {
      console.error('Error adding founder:', error);
      throw error;
    }
  },

  // Get company statistics
  getCompanyStats: async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/companies/stats`);
      if (!response.ok) throw new Error('Failed to fetch stats');
      return await response.json();
    } catch (error) {
      console.error('Error fetching company stats:', error);
      throw error;
    }
  },
};

// ==================== STUDENT CHALLENGE ENDPOINTS ====================

export const challengeService = {
  // Get all challenges
  getAllChallenges: async (filters: ChallengeFilters = {}) => {
    try {
      const params = new URLSearchParams();
      if (filters.studentId) params.append('studentId', filters.studentId);
      if (filters.status) params.append('status', filters.status);
      if (filters.sortBy) params.append('sortBy', filters.sortBy);

      const response = await fetch(`${API_BASE_URL}/challenges?${params}`);
      if (!response.ok) throw new Error('Failed to fetch challenges');
      return await response.json();
    } catch (error) {
      console.error('Error fetching challenges:', error);
      throw error;
    }
  },

  // Get single challenge
  getChallengeById: async (id: string) => {
    try {
      const response = await fetch(`${API_BASE_URL}/challenges/${id}`);
      if (!response.ok) throw new Error('Challenge not found');
      return await response.json();
    } catch (error) {
      console.error('Error fetching challenge:', error);
      throw error;
    }
  },

  // Create challenge
  createChallenge: async (challengeData: any) => {
    try {
      const response = await fetch(`${API_BASE_URL}/challenges`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(challengeData),
      });
      if (!response.ok) throw new Error('Failed to create challenge');
      return await response.json();
    } catch (error) {
      console.error('Error creating challenge:', error);
      throw error;
    }
  },

  // Update challenge
  updateChallenge: async (id: string, challengeData: any) => {
    try {
      const response = await fetch(`${API_BASE_URL}/challenges/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(challengeData),
      });
      if (!response.ok) throw new Error('Failed to update challenge');
      return await response.json();
    } catch (error) {
      console.error('Error updating challenge:', error);
      throw error;
    }
  },

  // Delete challenge
  deleteChallenge: async (id: string) => {
    try {
      const response = await fetch(`${API_BASE_URL}/challenges/${id}`, {
        method: 'DELETE',
      });
      if (!response.ok) throw new Error('Failed to delete challenge');
      return await response.json();
    } catch (error) {
      console.error('Error deleting challenge:', error);
      throw error;
    }
  },

  // Upload attachment
  uploadAttachment: async (id: string, file: File) => {
    try {
      const formData = new FormData();
      formData.append('attachment', file);

      const response = await fetch(`${API_BASE_URL}/challenges/${id}/upload-attachment`, {
        method: 'POST',
        body: formData,
      });
      if (!response.ok) throw new Error('Failed to upload attachment');
      return await response.json();
    } catch (error) {
      console.error('Error uploading attachment:', error);
      throw error;
    }
  },

  // Get challenge statistics
  getChallengeStats: async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/challenges/stats`);
      if (!response.ok) throw new Error('Failed to fetch stats');
      return await response.json();
    } catch (error) {
      console.error('Error fetching challenge stats:', error);
      throw error;
    }
  },
};

// ==================== GENERAL API UTILITIES ====================

export const apiUtils = {
  // Check API health
  checkHealth: async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/health`);
      return response.ok;
    } catch (error) {
      console.error('API health check failed:', error);
      return false;
    }
  },
};
