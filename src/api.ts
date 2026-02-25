// API utility file for frontend
const API_BASE_URL = ((import.meta as any).env.VITE_API_URL as string) || 'http://localhost:5000/api';

// Type definitions for Razorpay response
interface RazorpayPaymentResponse {
  razorpay_payment_id: string;
  razorpay_order_id: string;
  razorpay_signature: string;
}

interface RazorpayOrderResponse {
  success: boolean;
  message?: string;
  orderId: string;
  amount: number;
  currency: string;
  keyId: string;
  email: string;
  name: string;
  contact: string;
}

interface VerifyPaymentResponse {
  success: boolean;
  message?: string;
  registrationId?: string;
}

interface PricingResponse {
  success: boolean;
  message?: string;
  category?: string;
  amount?: number;
  currency?: string;
}

interface APIResponse {
  success: boolean;
  message?: string;
  [key: string]: any;
}

// FCC Registration APIs
export const fccAPI = {
  // Get pricing for a category
  getPricing: async (category: string): Promise<PricingResponse> => {
    try {
      const response = await fetch(`${API_BASE_URL}/forms/pricing/${category}`);
      return await response.json();
    } catch (error) {
      console.error('Error fetching pricing:', error);
      throw error;
    }
  },

  // Create Razorpay payment order
  createPaymentOrder: async (paymentData: any): Promise<RazorpayOrderResponse> => {
    try {
      const response = await fetch(`${API_BASE_URL}/forms/fcc-registration/create-order`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(paymentData),
      });
      return await response.json();
    } catch (error) {
      console.error('Error creating payment order:', error);
      throw error;
    }
  },

  // Verify payment and save registration
  verifyPayment: async (paymentVerificationData: any): Promise<VerifyPaymentResponse> => {
    try {
      const response = await fetch(`${API_BASE_URL}/forms/fcc-registration/verify-payment`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(paymentVerificationData),
      });
      return await response.json();
    } catch (error) {
      console.error('Error verifying payment:', error);
      throw error;
    }
  },

  // Save registration without payment (for pending status)
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

// Script to load Razorpay
export const loadRazorpay = (): Promise<boolean> => {
  return new Promise((resolve) => {
    const script = document.createElement('script');
    script.src = 'https://checkout.razorpay.com/v1/checkout.js';
    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);
    document.body.appendChild(script);
  });
};

// Function to handle Razorpay payment
export const handleRazorpayPayment = async (options: any): Promise<RazorpayPaymentResponse> => {
  const isRazorpayLoaded = await loadRazorpay();
  
  if (!isRazorpayLoaded) {
    throw new Error('Failed to load Razorpay');
  }

  return new Promise((resolve, reject) => {
    const razorpayOptions = {
      ...options,
      handler: (response: RazorpayPaymentResponse) => {
        resolve(response);
      },
      prefill: {
        name: options.prefill?.name || '',
        email: options.prefill?.email || '',
        contact: options.prefill?.contact || '',
      },
    };

    const rzp = new (window as any).Razorpay(razorpayOptions);
    rzp.on('payment.failed', (response: any) => {
      reject(response.error);
    });
    rzp.open();
  });
};
