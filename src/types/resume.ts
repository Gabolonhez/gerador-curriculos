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
  level: 'basic' | 'intermediate' | 'advanced' | 'expert';
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

export interface ResumeData {
  personal: PersonalInfo;
  summary: string;
  experience: Experience[];
  education: Education[];
  skills: Skill[];
  languages: Language[];
  certifications: Certification[];
  // Order in which sections should render in the preview
  sectionOrder?: Array<
    | 'summary'
    | 'experience'
    | 'education'
    | 'skills'
    | 'languages'
    | 'certifications'
  >;
}

export type TabType = 
  | 'informacoes-pessoais'
  | 'resumo-profissional'
  | 'experiencia-profissional'
  | 'formacao-academica'
  | 'habilidades-tecnicas'
  | 'idiomas'
  | 'certificacoes-cursos'; 