export type ResumeLanguageCode = 'pt' | 'en' | 'es';

interface DegreeOptions {
  highSchool: string;
  technical: string;
  bachelor: string;
  postgraduate: string;
  master: string;
  doctorate: string;
}

interface SkillLevels {
  basic: string;
  intermediate: string;
  advanced: string;
  expert: string;
}

interface ProficiencyLevels {
  basic: string;
  intermediate: string;
  advanced: string;
  fluent: string;
  native: string;
}

interface ResumeTranslations {
  professionalSummary: string;
  workExperience: string;
  education: string;
  technicalSkills: string;
  languages: string;
  certifications: string;
  projects: string;
  technologies: string;
  present: string;
  duration: string;
  contact: string;
  skills: string;
  email: string;
  phone: string;
  address: string;
  checkAt: string;
  website: string;
  degreeIn: string;
  proficiencyLevels: ProficiencyLevels;
  skillLevels: SkillLevels;
  degreeOptions: DegreeOptions;
}

export const resumeTranslations: Record<ResumeLanguageCode, ResumeTranslations> = {
  pt: {
    professionalSummary: 'Resumo Profissional',
    workExperience: 'Experiência Profissional',
    education: 'Formação Acadêmica',
    technicalSkills: 'Competências Técnicas',
    languages: 'Idiomas',
    certifications: 'Certificados',
    projects: 'Projetos',
    technologies: 'Tecnologias',
    present: 'Presente',
    duration: 'Duração',
    contact: 'Contato',
    skills: 'Habilidades',
    email: 'Email',
    phone: 'Telefone',
    address: 'Endereço',
    checkAt: 'Link',
  website: 'Portfólio',
    degreeIn: 'em',
    proficiencyLevels: {
      basic: 'Básico',
      intermediate: 'Intermediário',
      advanced: 'Avançado',
      fluent: 'Fluente',
      native: 'Nativo'
    },
    skillLevels: {
      basic: 'Básico',
      intermediate: 'Intermediário',
      advanced: 'Avançado',
      expert: 'Especialista'
    },
    degreeOptions: {
      highSchool: 'Ensino Médio',
      technical: 'Técnico',
      bachelor: 'Graduação',
      postgraduate: 'Pós-Graduação',
      master: 'Mestrado',
      doctorate: 'Doutorado'
    }
  },
  en: {
    professionalSummary: 'Professional Summary',
    workExperience: 'Work Experience',
    education: 'Education',
    technicalSkills: 'Technical Skills',
    languages: 'Languages',
    certifications: 'Certificates',
    projects: 'Projects',
    technologies: 'Technologies',
    present: 'Present',
    duration: 'Duration',
    contact: 'Contact',
    skills: 'Skills',
    email: 'Email',
    phone: 'Phone number',
    address: 'Address',
    checkAt: 'Link',
  website: 'Portfolio',
    degreeIn: 'in',
    proficiencyLevels: {
      basic: 'Basic',
      intermediate: 'Intermediate',
      advanced: 'Advanced',
      fluent: 'Fluent',
      native: 'Native'
    },
    skillLevels: {
      basic: 'Basic',
      intermediate: 'Intermediate',
      advanced: 'Advanced',
      expert: 'Expert'
    },
    degreeOptions: {
      highSchool: 'High School',
      technical: 'Technical',
      bachelor: 'Graduation',
      postgraduate: 'Postgraduate',
      master: 'Master',
      doctorate: 'Doctorate'
    }
  },
  es: {
    professionalSummary: 'Resumen Profesional',
    workExperience: 'Experiencia Laboral',
    education: 'Formación Académica',
    technicalSkills: 'Habilidades',
    languages: 'Idiomas',
    certifications: 'Certificados',
    projects: 'Proyectos',
    technologies: 'Tecnologías',
    present: 'Presente',
    duration: 'Duración',
    contact: 'Contacto',
    skills: 'Habilidades',
    email: 'Correo',
    phone: 'Teléfono',
    address: 'Dirección',
    checkAt: 'Verificar en',
  website: 'Portfolio',
    degreeIn: 'en',
    proficiencyLevels: {
      basic: 'Básico',
      intermediate: 'Intermedio',
      advanced: 'Avanzado',
      fluent: 'Fluido',
      native: 'Nativo'
    },
    skillLevels: {
      basic: 'Básico',
      intermediate: 'Intermedio',
      advanced: 'Avanzado',
      expert: 'Experto'
    },
    degreeOptions: {
      highSchool: 'Bachillerato',
      technical: 'Técnico',
      bachelor: 'Grado',
      postgraduate: 'Posgrado',
      master: 'Maestría',
      doctorate: 'Doctorado'
    }
  }
};

export default resumeTranslations;
