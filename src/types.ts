export type FieldType = 
  | 'text' 
  | 'textarea' 
  | 'email' 
  | 'tel' 
  | 'select' 
  | 'multi-select' 
  | 'radio' 
  | 'checkbox' 
  | 'file' 
  | 'url';

export interface FormField {
  id: string;
  label: string;
  type: FieldType;
  placeholder?: string;
  required?: boolean;
  options?: string[];
  condition?: (values: any) => boolean;
}

export interface FormSection {
  id: string;
  title: string;
  fields: FormField[];
  condition?: (values: any) => boolean;
}

export interface PathDefinition {
  id: string;
  label: string;
  description: string;
  icon: string;
  sections: FormSection[];
}

export type AppPath = 'learn' | 'idea' | 'startup' | 'research' | 'idontknow' | null;
