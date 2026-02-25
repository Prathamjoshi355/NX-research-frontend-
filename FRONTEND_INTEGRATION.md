# Frontend Integration Guide

## Overview
This guide explains how the frontend integrates with the backend API for:
- **FCC Registration with Payment Gateway**
- **Join Page Form Submissions**

---

## Setup Instructions

### 1. Configure Environment Variables

Create a `.env` file in the frontend root directory:

```bash
# Copy the example
cp .env.example .env
```

Edit `.env`:

```env
# Backend API URL
VITE_API_URL=http://localhost:5000/api

# For production:
# VITE_API_URL=https://your-backend-domain.com/api
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Start Frontend

```bash
# Development
npm run dev

# Production build
npm run build

# Preview production build
npm run preview
```

Frontend runs at: `http://localhost:5173`

---

## API Integration Files

### 1. API Utility File: `src/api.ts`
Contains all API calls and Razorpay integration:

```typescript
// Get pricing
const pricing = await fccAPI.getPricing('STUDENT');

// Create payment order
const order = await fccAPI.createPaymentOrder({
  category, email, phone, firstName, lastName
});

// Verify payment
const result = await fccAPI.verifyPayment({
  razorpay_order_id, razorpay_payment_id, razorpay_signature, formData
});

// Save join submission
const response = await joinAPI.saveSubmission(selectedPath, formData);
```

---

## Components Using Backend Integration

### 1. FCC Registration (`src/pages/FCCregistration.tsx`)

**Features:**
- Multi-step form with validation
- Category-based pricing (Student: ₹2,999 | Startup: ₹9,999 | Investor: ₹19,999)
- Razorpay payment integration
- Real-time pricing display
- Payment status tracking

**Payment Flow:**
1. User completes all form steps
2. Selects payment method at Payment step
3. Clicks "Complete Payment" button
4. Razorpay popup opens
5. Payment is verified
6. Form data is saved to database
7. Success message with registration ID

**State Variables:**
```typescript
const [currentStep, setCurrentStep] = useState<Step>(Step.AGREEMENTS);
const [formData, setFormData] = useState<FormData>(INITIAL_FORM_DATA);
const [paymentPrice, setPaymentPrice] = useState<number>(0);
const [isProcessing, setIsProcessing] = useState(false);
const [paymentStatus, setPaymentStatus] = useState<'idle' | 'pending' | 'success' | 'failed'>('idle');
```

### 2. Join Page (`src/pages/JoinPage.tsx`)

**Features:**
- Select pathway option
- Dynamic form generation based on pathway
- Form submission to database
- Submission ID in success screen

**State Variables:**
```typescript
const [selectedPath, setSelectedPath] = useState<AppPath>(null);
const [formData, setFormData] = useState<Record<string, any>>({});
const [isSubmitted, setIsSubmitted] = useState(false);
const [isSubmitting, setIsSubmitting] = useState(false);
const [submissionId, setSubmissionId] = useState<string>('');
```

---

## Data Flow

### FCC Registration Flow
```
User fills form
    ↓
Validates each step
    ↓
Reaches Payment step
    ↓
Fetches pricing from backend
    ↓
Creates Razorpay order
    ↓
Opens payment popup
    ↓
Payment success/failure
    ↓
Verifies payment signature
    ↓
Saves complete form to database
    ↓
Shows success with Registration ID
```

### Join Page Flow
```
User selects pathway
    ↓
Fills dynamic form
    ↓
Submits form
    ↓
Sends data to backend API
    ↓
Backend saves to database
    ↓
Shows success with Submission ID
```

---

## Environment Variables Reference

```env
# API Configuration
VITE_API_URL=http://localhost:5000/api

# Backend Server Details
# Development: http://localhost:5000/api
# Production: https://your-backend-domain.com/api
```

---

## Troubleshooting

### API Calls Failing
**Problem**: Network errors when calling backend
**Solution**: 
- Ensure backend is running (`npm run dev` in backend folder)
- Check `VITE_API_URL` in `.env` matches your backend URL
- Check CORS settings in backend

### Payment Not Opening
**Problem**: Razorpay popup not appearing
**Solution**:
- Check browser console for errors
- Verify Razorpay script loads correctly
- Check `RAZORPAY_KEY_ID` configuration on backend

### Form Data Not Saving
**Problem**: Submission successful but data not in database
**Solution**:
- Verify MongoDB is running
- Check backend API logs for errors
- Confirm `MONGODB_URI` is correct in backend `.env`

### CORS Error
**Problem**: XMLHttpRequest blocked by CORS policy
**Solution**:
- Update `FRONTEND_URL` in backend `.env` to match your frontend URL
- Example: `FRONTEND_URL=http://localhost:5173`

---

## Key Features

### 1. Multi-Step Form Validation
Each step validates before proceeding:
- Agreements: Terms and notifications
- Personal Info: Name, email, contact, location
- Category: Student/Startup/Investor
- Category Details: Institution/Company/Investment info
- Additional Info: Interests and social networks
- Payment: Razorpay integration

### 2. Real-time Pricing
Pricing fetches from backend based on selected category:
- Student: ₹2,999
- Startup: ₹9,999
- Investor: ₹19,999

Prices are configurable in backend `.env`

### 3. Razorpay Payment
- Secure payment with industry-standard encryption
- Test cards available for development
- Payment verification with cryptographic signatures
- Automatic database update on success

### 4. Form Tracking
- Each form submission gets unique ID
- Submission metadata (IP, timestamp, user agent)
- Full form data persisted in database

---

## Testing

### Development Testing

**FCC Registration:**
1. Fill all form fields
2. Select a category (Student/Startup/Investor)
3. At payment step, verify pricing displays correctly
4. Click "Complete Payment"
5. Use Razorpay test card: `4111 1111 1111 1111`
6. Verify success message with registration ID

**Join Page:**
1. Select a pathway
2. Fill form fields
3. Submit form
4. Verify success with submission ID

### Test Razorpay Cards
- **Success**: 4111 1111 1111 1111
- **Failure**: 4111 1111 1111 1112
- **Expiry**: Any future date
- **CVV**: Any 3 digits
- **OTP**: 123456

---

## Deployment Notes

### Frontend Deployment
```bash
# Build for production
npm run build

# Output in: dist/
```

Deploy `dist/` folder to:
- Vercel
- Netlify
- GitHub Pages
- AWS S3 + CloudFront
- Your own server

### Required Environment Variables
```env
VITE_API_URL=https://your-production-backend-url/api
```

---

## API Response Examples

### Pricing Response
```json
{
  "success": true,
  "category": "STUDENT",
  "amount": 2999,
  "currency": "INR"
}
```

### Payment Order Response
```json
{
  "success": true,
  "orderId": "order_9A33XWu590g9jT",
  "amount": 2999,
  "currency": "INR",
  "keyId": "rzp_test_1Aa00000000001",
  "email": "user@example.com",
  "name": "John Doe",
  "contact": "9876543210"
}
```

### Registration Success Response
```json
{
  "success": true,
  "message": "Registration and payment successful",
  "registrationId": "507f1f77bcf86cd799439011"
}
```

### Join Submission Response
```json
{
  "success": true,
  "message": "Form submission saved successfully",
  "submissionId": "507f1f77bcf86cd799439012"
}
```

---

## Support

For issues or questions:
1. Check backend logs
2. Verify environment variables
3. Test API endpoints with Postman
4. Check browser console for frontend errors

---

## License

Apache License 2.0
