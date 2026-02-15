
export enum UserRole {
  GUEST = 'GUEST',
  MEMBER = 'MEMBER',
  ADMIN = 'ADMIN'
}

export enum ApplicationStatus {
  PENDING = 'Pending',
  APPROVED = 'Approved',
  REJECTED = 'Rejected'
}

export enum Category {
  STUDENT = 'STUDENT',
  STARTUP = 'STARTUP',
  INVESTOR = 'INVESTOR',
  ORGANIZER = 'ORGANIZER',
  TECH_CONTENT_CREATOR = 'TECH_CONTENT_CREATOR'
}

export enum Step {
  AGREEMENTS = 0,
  PERSONAL_INFO = 1,
  SELECT_CATEGORY = 2,
  CATEGORY_DETAILS = 3,
  ADDITIONAL_INFO = 4,
  PAYMENT = 5,
  COMPLETE = 6
}

export enum FormType {
  STUDENT = 'STUDENT',
  COMPANY = 'COMPANY'
}

export interface SocialNetwork {
  platform: string;
  url: string;
}

export interface FormData {
  receiveNotifications: boolean;
  agreedToTerms: boolean;
  firstName: string;
  lastName: string;
  personalEmail: string;
  professionalEmail: string;
  personalContact: string;
  professionalContact: string;
  gender: string;
  pronoun: string;
  city: string;
  state: string;
  category: string;
  department: string;
  focusArea: string;
  enrollmentMode: string;
  interests: string[];
  socialNetworks: SocialNetwork[];
}

export const INITIAL_FORM_DATA: FormData = {
  receiveNotifications: false,
  agreedToTerms: false,
  firstName: '',
  lastName: '',
  personalEmail: '',
  professionalEmail: '',
  personalContact: '',
  professionalContact: '',
  gender: '',
  pronoun: '',
  city: '',
  state: '',
  category: '',
  department: '',
  focusArea: '',
  enrollmentMode: 'Alliance',
  interests: [],
  socialNetworks: [{ platform: '', url: '' }]
};

// Added ChatMessage interface to fix import error in MentorChat.tsx
export interface ChatMessage {
  id: string;
  sender: 'mentor' | 'student';
  text: string;
  time: string;
}

// Added ModalType to fix import error in PrivateResearch.tsx
export type ModalType = 'connect' | 'join' | null;
