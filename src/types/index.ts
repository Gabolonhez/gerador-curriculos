import { LanguageCode } from '../translations/formTranslations';

export interface PersonalInfo {
  name: string;
  email: string;
  phone: string;
  address: string;
  portfolio?: string;
  linkedin?: string;
  github?: string;
}

export interface Experience {
  id: string;
  company: string;
  position: string;
  startDate: string;
  endDate: string;
  current: boolean;
  description: string;
}

export interface Education {
  id: string;
  institution: string;
  degree: string;
  field: string;
  startDate: string;
  endDate: string;
  current: boolean;
  description: string;
}

export interface Skill {
  id: string;
  name: string;
  level: string;
}

export interface Language {
  id: string;
  name: string;
  level: string;
}

export interface Certification {
  id: string;
  name: string;
  issuer: string;
  date: string;
  url?: string;
  description: string;
}

export interface ResumeData {
  personal: PersonalInfo;
  summary: string;
  experience: Experience[];
  education: Education[];
  skills: Skill[];
  languages: Language[];
  certifications: Certification[];
}

export type TabType = 'personal' | 'summary' | 'experience' | 'education' | 'skills' | 'languages' | 'certifications';

export interface TranslationStrings {
  title: string;
  exportPdf: string;
  personalInfo: string;
  summary: string;
  experience: string;
  education: string;
  skills: string;
  languages: string;
  certifications: string;
  preview: string;
  previous: string;
  next: string;
  printError: string;
  contentError: string;
}

export interface Translations {
  pt: TranslationStrings;
  en: TranslationStrings;
}

export interface ComponentProps {
  language: LanguageCode;
}

export interface FormProps<T> extends ComponentProps {
  data: T;
  updateData: (data: T) => void;
}

export interface ResumePreviewProps extends ComponentProps {
  data: ResumeData;
}

export interface TabNavigationProps extends ComponentProps {
  activeTab: TabType;
  setActiveTab: (tab: TabType) => void;
}

export interface PDFGeneratorProps extends ComponentProps {
  resumeData: ResumeData;
} 