
export type Category = 'STUDENT' | 'STARTUP' | 'INVESTOR' | 'ORGANIZER' | 'TECH_CONTENT_CREATOR';

export interface SocialNetwork {
  platform: string;
  url: string;
}

export interface FormData {
  // Step 1: Agreements
  agreedToTerms: boolean;
  receiveNotifications: boolean;

  // Step 2: Personal Info
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

  // Step 3: Category
  category: Category | null;

  // Step 4: Category Specifics
  studentInfo?: {
    institution: string;
    degreeProgram: string;
    degreeLevel: string;
    graduationYear: string;
    isGroup: boolean;
    memberCount: number;
    groupName: string;
    members: string[];
  };
  startupInfo?: {
    name: string;
    stage: 'IDEA' | 'MVP' | 'REVENUE' | null;
    memberCount: number;
    industry: string;
    wantsPromotion: boolean;
  };
  investorInfo?: {
    companyName: string;
    wantsPromotion: boolean;
    logoEmail: string;
  };

  // Step 5: Additional Info
  interests: string[];
  socialNetworks: SocialNetwork[];

  // Step 6: Payment
  paymentMethod: string;
}

export const INITIAL_FORM_DATA: FormData = {
  agreedToTerms: false,
  receiveNotifications: true,
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
  category: null,
  interests: [],
  socialNetworks: [{ platform: '', url: '' }],
  paymentMethod: '',
};

export enum Step {
  AGREEMENTS = 0,
  PERSONAL_INFO = 1,
  SELECT_CATEGORY = 2,
  CATEGORY_DETAILS = 3,
  ADDITIONAL_INFO = 4,
  PAYMENT = 5,
}
