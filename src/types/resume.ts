import { LanguageCode } from '../translations/formTranslations';

export interface PersonalInfo {
  name: string;
  desiredPosition?: string;
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
  level?: '' | 'basic' | 'intermediate' | 'advanced' | 'expert';
}

export interface Language {
  id: string;
  name: string;
  level: 'basic' | 'intermediate' | 'advanced' | 'fluent' | 'native';
}

export interface Certification {
  id: string;
  name: string;
  issuer: string;
  date: string;
  description: string;
  url?: string;
}

export interface Project {
  id: string;
  name: string;
  description: string;
  technologies: string;
  link?: string;
  startDate: string;
  endDate: string;
  current: boolean;
}

export interface ResumeData {
  personal: PersonalInfo;
  summary: string;
  experience: Experience[];
  education: Education[];
  skills: Skill[];
  languages: Language[];
  certifications: Certification[];
  projects: Project[];
  // Order in which sections should render in the preview
  sectionOrder?: Array<
    | 'summary'
    | 'experience'
    | 'education'
    | 'skills'
    | 'languages'
    | 'certifications'
    | 'projects'
  >;
}

export type TabType =
  | 'informacoes-pessoais'
  | 'resumo-profissional'
  | 'experiencia-profissional'
  | 'formacao-academica'
  | 'habilidades-tecnicas'
  | 'idiomas'
  | 'certificacoes-cursos'
  | 'projetos';

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
  projects: string;
  orderSections: string;
  preview: string;
  atsAnalysis: string;
  previous: string;
  next: string;
  printError: string;
  contentError: string;
  madeBy: string;
  allRightsReserved: string;
  clearData: string;
  clearDataConfirm: string;
  dataSaved: string;
  dataCleared: string;
  done: string;
}

export interface Translations {
  pt: TranslationStrings;
  en: TranslationStrings;
  es: TranslationStrings;
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