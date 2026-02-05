export type ModalType = 'connect' | 'join' | null;
export enum Category {
  Programming = 'Programming & Languages',
  AdvancedTech = 'Advanced Tech Domains',
  Academic = 'Academic Subjects',
  ProjectDev = 'Project Development',
  CareerPrep = 'Career Preparation'
}

export interface Course {
  id: string;
  name: string;
  category: Category;
  pricing: {
    tenDays?: number;
    oneMonth?: number;
    threeMonths?: number;
    fixed?: number;
  };
}

export interface ApplicationFormData {
  fullName: string;
  email: string;
  mobile: string;
  institution: string;
  educationLevel: string;
  category: Category | '';
  specificCourses: string[];
  skillLevel: 'Beginner' | 'Basic' | 'Intermediate' | 'Advanced' | '';
  projectsExperience: string;
  goals: string[];
  mainGoal6Months: string;
  preferredIntensity: string;
  availability: string;
  learningMode: string;
  links: string;
  seriousConfirmation: boolean;
}
export interface Message {
  role: 'user' | 'model';
  text: string;
}