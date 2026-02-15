# Frontend API Integration Guide

This document explains how to integrate the backend API into your frontend components using the `apiService.ts`.

## Configuration

### Set API Base URL

In your frontend `.env` file:
```env
REACT_APP_API_URL=http://localhost:5000/api
```

Or it will default to `http://localhost:5000/api`

## Available Services

The `apiService.ts` exports four main services:

### 1. Application Service

For handling course applications and skill assessments.

```typescript
import { applicationService } from '../services/apiService';

// Get all applications
const apps = await applicationService.getAllApplications({
  status: 'Pending',
  category: 'Programming & Languages',
  sortBy: '-submittedAt'
});

// Get single application
const app = await applicationService.getApplicationById(appId);

// Create new application
const response = await applicationService.createApplication({
  fullName: 'John Doe',
  email: 'john@example.com',
  mobile: '+91 9876543210',
  institution: 'XYZ College',
  educationLevel: 'B.Tech',
  category: 'Programming & Languages',
  specificCourses: ['Python Basics', 'Web Development'],
  skillLevel: 'Intermediate',
  projectsExperience: 'Built 3 projects',
  goals: ['Skill building', 'Internship preparation'],
  mainGoal6Months: 'Secure an AI internship',
  preferredIntensity: '1 Month',
  availability: '2–4 hrs',
  learningMode: 'Online',
  links: 'https://github.com/johndoe',
  seriousConfirmation: true
});

// Update application
const updated = await applicationService.updateApplication(appId, {
  mainGoal6Months: 'Secure a startup internship'
});

// Delete application
await applicationService.deleteApplication(appId);

// Get statistics
const stats = await applicationService.getApplicationStats();
```

### 2. Registration Service

For multi-step registration forms with progress tracking.

```typescript
import { registrationService } from '../services/apiService';

// Get all registrations
const registrations = await registrationService.getAllRegistrations({
  category: 'STARTUP',
  status: 'Submitted'
});

// Get single registration
const registration = await registrationService.getRegistrationById(regId);

// Create new registration
const response = await registrationService.createRegistration({
  agreedToTerms: true,
  receiveNotifications: true,
  firstName: 'John',
  lastName: 'Doe',
  personalEmail: 'john@example.com',
  professionalEmail: 'john@company.com',
  personalContact: '+91 9876543210',
  professionalContact: '+91 9876543211',
  gender: 'Male',
  pronoun: 'he/him',
  city: 'Bangalore',
  state: 'Karnataka',
  category: 'STARTUP',
  startupInfo: {
    name: 'Tech Startup',
    stage: 'MVP',
    memberCount: 3,
    industry: 'AI/ML',
    wantsPromotion: true
  },
  interests: ['AI', 'Blockchain'],
  socialNetworks: [
    { platform: 'LinkedIn', url: 'https://linkedin.com/in/johndoe' }
  ],
  paymentMethod: 'Credit Card'
});

// Update registration
const updated = await registrationService.updateRegistration(regId, {
  city: 'Mumbai',
  state: 'Maharashtra'
});

// Save form progress (0-100)
await registrationService.saveFormProgress(regId, 50);

// Submit registration
const submitted = await registrationService.submitRegistration(regId);

// Upload investor logo
const file = new File(['content'], 'logo.png', { type: 'image/png' });
const logoResult = await registrationService.uploadLogoForInvestor(regId, file);

// Get statistics
const stats = await registrationService.getRegistrationStats();
```

### 3. Company Service

For company profiles, problems, and founder information.

```typescript
import { companyService } from '../services/apiService';

// Get all companies
const companies = await companyService.getAllCompanies({
  status: 'Active'
});

// Get single company
const company = await companyService.getCompanyById(companyId);

// Create new company
const response = await companyService.createCompany({
  companyName: 'Tech Corp',
  companyEmail: 'info@techcorp.com',
  contactPerson: 'John Doe',
  contactEmail: 'john@techcorp.com',
  contactPhone: '+91 9876543210',
  industry: 'Software',
  description: 'Leading tech company',
  website: 'https://techcorp.com',
  linkedIn: 'https://linkedin.com/company/techcorp',
  numberOfEmployees: '100-500',
  location: 'Bangalore'
});

// Update company
const updated = await companyService.updateCompany(companyId, {
  description: 'Updated description'
});

// Upload company logo
const logoFile = new File(['content'], 'logo.png', { type: 'image/png' });
const logoResult = await companyService.uploadLogo(companyId, logoFile);

// Upload cover image
const coverFile = new File(['content'], 'cover.jpg', { type: 'image/jpeg' });
const coverResult = await companyService.uploadCoverImage(companyId, coverFile);

// Add problem/challenge
const problemFile = new File(['content'], 'problem.pdf', { type: 'application/pdf' });
const problemResult = await companyService.addProblem(companyId, {
  title: 'AI Model Optimization',
  description: 'Need to optimize ML model performance',
  category: 'AI/ML'
}, problemFile);

// Add founder
const founderImageFile = new File(['content'], 'founder.jpg', { type: 'image/jpeg' });
const founderResult = await companyService.addFounder(companyId, {
  name: 'Jane Smith',
  role: 'CEO',
  bio: 'Tech visionary',
  email: 'jane@techcorp.com',
  linkedin: 'https://linkedin.com/in/janesmith'
}, founderImageFile);

// Get statistics
const stats = await companyService.getCompanyStats();
```

### 4. Challenge Service

For student challenges and submissions.

```typescript
import { challengeService } from '../services/apiService';

// Get all challenges
const challenges = await challengeService.getAllChallenges({
  status: 'Active',
  studentId: 'studentIdHere'
});

// Get single challenge
const challenge = await challengeService.getChallengeById(challengeId);

// Create challenge
const response = await challengeService.createChallenge({
  studentId: 'studentIdHere',
  title: 'Build a Todo App',
  description: 'Create a todo application with React',
  category: 'Web Development',
  difficulty: 'Intermediate'
});

// Update challenge
const updated = await challengeService.updateChallenge(challengeId, {
  status: 'Completed'
});

// Delete challenge
await challengeService.deleteChallenge(challengeId);

// Upload attachment
const attachmentFile = new File(['content'], 'solution.zip', { type: 'application/zip' });
const attachmentResult = await challengeService.uploadAttachment(challengeId, attachmentFile);

// Get statistics
const stats = await challengeService.getChallengeStats();
```

## Usage Examples in Components

### Example 1: Application Form with Backend

```typescript
import React, { useState } from 'react';
import { applicationService } from '../services/apiService';

export const ApplicationForm = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [formData, setFormData] = useState({...});

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await applicationService.createApplication(formData);
      if (response.success) {
        console.log('Application submitted:', response.data);
        // Show success message
      }
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {error && <div className="error">{error}</div>}
      {/* form fields */}
      <button disabled={loading}>
        {loading ? 'Submitting...' : 'Submit'}
      </button>
    </form>
  );
};
```

### Example 2: Display Registrations List

```typescript
import React, { useState, useEffect } from 'react';
import { registrationService } from '../services/apiService';

export const RegistrationsList = () => {
  const [registrations, setRegistrations] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRegistrations = async () => {
      try {
        const response = await registrationService.getAllRegistrations({
          category: 'STUDENT'
        });
        setRegistrations(response.data);
      } catch (error) {
        console.error('Error fetching registrations:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchRegistrations();
  }, []);

  if (loading) return <div>Loading...</div>;

  return (
    <div>
      {registrations.map(reg => (
        <div key={reg._id}>
          <h3>{reg.firstName} {reg.lastName}</h3>
          <p>{reg.personalEmail}</p>
          <p>Status: {reg.status}</p>
        </div>
      ))}
    </div>
  );
};
```

### Example 3: File Upload to Cloudinary

```typescript
import React, { useRef } from 'react';
import { companyService } from '../services/apiService';

export const UploadCompanyLogo = ({ companyId }: { companyId: string }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    try {
      const response = await companyService.uploadLogo(companyId, file);
      console.log('Logo uploaded:', response.data.logoUrl);
      // Show success
    } catch (error) {
      console.error('Upload failed:', error);
      // Show error
    } finally {
      setUploading(false);
    }
  };

  return (
    <div>
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleFileUpload}
        disabled={uploading}
      />
      {uploading && <p>Uploading...</p>}
    </div>
  );
};
```

### Example 4: Progress Tracking for Multi-Step Form

```typescript
import React, { useState } from 'react';
import { registrationService } from '../services/apiService';

export const StepForm = ({ registrationId }: { registrationId: string }) => {
  const [currentStep, setCurrentStep] = useState(1);

  const handleNextStep = async (formData: any) => {
    // Calculate progress (assuming 6 steps)
    const progress = (currentStep / 6) * 100;
    
    // Save progress to backend
    await registrationService.saveFormProgress(registrationId, progress);
    
    // Update current step
    setCurrentStep(prev => prev + 1);
  };

  const handleSubmit = async (finalData: any) => {
    // Update with final data
    await registrationService.updateRegistration(registrationId, finalData);
    
    // Mark as submitted
    await registrationService.submitRegistration(registrationId);
  };

  return (
    <div>
      <div className="progress-bar" style={{ width: `${(currentStep / 6) * 100}%` }} />
      <p>Step {currentStep} of 6</p>
      {/* Step content */}
    </div>
  );
};
```

## Error Handling

All API methods throw errors that should be caught:

```typescript
try {
  const response = await applicationService.createApplication(data);
  // Handle success
} catch (error: any) {
  // Handle error
  console.error(error.message);
  // Show user-friendly error message
}
```

## Response Format

Successful responses:
```json
{
  "success": true,
  "message": "Operation successful",
  "data": { /* form data */ }
}
```

Error responses:
```json
{
  "success": false,
  "message": "Error description"
}
```

## Best Practices

1. **Always handle loading states** - Show loading indicators during API calls
2. **Provide error messages** - Display user-friendly error messages
3. **Validate input** - Validate before sending to backend
4. **Use appropriate HTTP methods** - GET, POST, PUT, DELETE
5. **Handle file uploads** - Use File objects for image/document uploads
6. **Track form progress** - For multi-step forms, save progress regularly
7. **Check response success** - Always check if response.success is true

## Debugging

Enable console logs in apiService.ts to debug API calls:

```typescript
// All methods include console.error for debugging
console.error('Error in method:', error);
```

Use browser DevTools Network tab to inspect API requests and responses.

## Testing with Postman

You can test the backend APIs directly with Postman:

1. Import the collection or create requests manually
2. Use `http://localhost:5000/api` as base URL
3. Set `Content-Type: application/json` for JSON requests
4. For file uploads, use `multipart/form-data`

Example Postman request:
```
POST /api/applications
Content-Type: application/json

{
  "fullName": "John Doe",
  "email": "john@example.com",
  ...
}
```

## Performance Tips

1. Batch API calls when possible
2. Use pagination for large data lists
3. Cache responses using React Query or SWR
4. Implement debouncing for search inputs
5. Optimize file sizes before upload

---

For more help, refer to the backend README.md and individual API endpoint documentation.
