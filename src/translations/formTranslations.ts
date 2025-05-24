export type LanguageCode = 'pt' | 'en';

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

interface FormTranslations {
  // Personal Info
  name: string;
  email: string;
  phone: string;
  address: string;
  website: string;
  linkedin: string;
  github: string;

  // Professional Summary
  summaryPlaceholder: string;

  // Experience
  addExperience: string;
  experience: string;
  company: string;
  position: string;
  startDate: string;
  endDate: string;
  current: string;
  description: string;
  jobDescription: string;
  remove: string;

  // Education
  addEducation: string;
  education: string;
  institution: string;
  degree: string;
  field: string;
  educationDescription: string;
  inProgress: string;
  degreeOptions: DegreeOptions;

  // Skills
  addSkill: string;
  skill: string;
  skillPlaceholder: string;
  level: string;
  skillLevels: SkillLevels;

  // Languages
  addLanguage: string;
  language: string;
  languagePlaceholder: string;
  proficiency: string;
  proficiencyLevels: ProficiencyLevels;

  // Certifications
  addCertification: string;
  certification: string;
  certificationName: string;
  certificationPlaceholder: string;
  issuer: string;
  issuerPlaceholder: string;
  date: string;
  certificationUrl: string;
  urlPlaceholder: string;
  certificationDescription: string;
}

interface Translations {
  pt: FormTranslations;
  en: FormTranslations;
}

export const formTranslations: Translations = {
  pt: {
    // Personal Info
    name: 'Nome Completo',
    email: 'Email',
    phone: 'Telefone',
    address: 'Endereço',
    website: 'Website',
    linkedin: 'LinkedIn',
    github: 'GitHub',

    // Professional Summary
    summaryPlaceholder: 'Escreva um breve resumo sobre sua experiência profissional e objetivos...',

    // Experience
    addExperience: 'Adicionar Experiência',
    experience: 'Experiência',
    company: 'Empresa',
    position: 'Cargo',
    startDate: 'Data de Início',
    endDate: 'Data de Término',
    current: 'Atual',
    description: 'Descrição',
    jobDescription: 'Descreva suas principais responsabilidades e conquistas...',
    remove: 'Remover',

    // Education
    addEducation: 'Adicionar Formação',
    education: 'Formação',
    institution: 'Instituição',
    degree: 'Grau',
    field: 'Área',
    educationDescription: 'Informações adicionais sobre sua formação...',
    inProgress: 'Em andamento',
    degreeOptions: {
      highSchool: 'Ensino Médio',
      technical: 'Técnico',
      bachelor: 'Graduação',
      postgraduate: 'Pós-Graduação',
      master: 'Mestrado',
      doctorate: 'Doutorado'
    },

    // Skills
    addSkill: 'Adicionar Habilidade',
    skill: 'Habilidade',
    skillPlaceholder: 'React.js, Python, Design UX/UI...',
    level: 'Nível',
    skillLevels: {
      basic: 'Básico',
      intermediate: 'Intermediário',
      advanced: 'Avançado',
      expert: 'Especialista'
    },

    // Languages
    addLanguage: 'Adicionar Idioma',
    language: 'Idioma',
    languagePlaceholder: 'Português, Inglês, Espanhol...',
    proficiency: 'Proficiência',
    proficiencyLevels: {
      basic: 'Básico',
      intermediate: 'Intermediário',
      advanced: 'Avançado',
      fluent: 'Fluente',
      native: 'Nativo'
    },

    // Certifications
    addCertification: 'Adicionar Certificação/Curso',
    certification: 'Certificação',
    certificationName: 'Nome da Certificação/Curso',
    certificationPlaceholder: 'AWS Certified Developer',
    issuer: 'Instituição/Emissor',
    issuerPlaceholder: 'Amazon Web Services',
    date: 'Data de Emissão',
    certificationUrl: 'URL do Certificado (opcional)',
    urlPlaceholder: 'https://www.credential.net/...',
    certificationDescription: 'Breve descrição do que foi aprendido ou do escopo da certificação...'
  },
  en: {
    // Personal Info
    name: 'Full Name',
    email: 'Email',
    phone: 'Phone',
    address: 'Address',
    website: 'Website',
    linkedin: 'LinkedIn',
    github: 'GitHub',

    // Professional Summary
    summaryPlaceholder: 'Write a brief summary about your professional experience and goals...',

    // Experience
    addExperience: 'Add Experience',
    experience: 'Experience',
    company: 'Company',
    position: 'Position',
    startDate: 'Start Date',
    endDate: 'End Date',
    current: 'Current',
    description: 'Description',
    jobDescription: 'Describe your main responsibilities and achievements...',
    remove: 'Remove',

    // Education
    addEducation: 'Add Education',
    education: 'Education',
    institution: 'Institution',
    degree: 'Degree',
    field: 'Field',
    educationDescription: 'Additional information about your education...',
    inProgress: 'In Progress',
    degreeOptions: {
      highSchool: 'High School',
      technical: 'Technical',
      bachelor: 'Bachelor',
      postgraduate: 'Postgraduate',
      master: 'Master',
      doctorate: 'Doctorate'
    },

    // Skills
    addSkill: 'Add Skill',
    skill: 'Skill',
    skillPlaceholder: 'React.js, Python, UX/UI Design...',
    level: 'Level',
    skillLevels: {
      basic: 'Basic',
      intermediate: 'Intermediate',
      advanced: 'Advanced',
      expert: 'Expert'
    },

    // Languages
    addLanguage: 'Add Language',
    language: 'Language',
    languagePlaceholder: 'English, Portuguese, Spanish...',
    proficiency: 'Proficiency',
    proficiencyLevels: {
      basic: 'Basic',
      intermediate: 'Intermediate',
      advanced: 'Advanced',
      fluent: 'Fluent',
      native: 'Native'
    },

    // Certifications
    addCertification: 'Add Certification/Course',
    certification: 'Certification',
    certificationName: 'Certification/Course Name',
    certificationPlaceholder: 'AWS Certified Developer',
    issuer: 'Institution/Issuer',
    issuerPlaceholder: 'Amazon Web Services',
    date: 'Issue Date',
    certificationUrl: 'Certificate URL (optional)',
    urlPlaceholder: 'https://www.credential.net/...',
    certificationDescription: 'Brief description of what was learned or the certification scope...'
  }
}; 