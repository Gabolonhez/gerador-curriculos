export type LanguageCode = 'pt' | 'en' | 'es';

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
  personalInfo: string;
  name: string;
  desiredPosition: string;
  email: string;
  phone: string;
  address: string;
  portfolio: string;
  linkedin: string;
  github: string;

  // Professional Summary
  summary: string;
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
  removeSkill: string;

  // Languages
  addLanguage: string;
  language: string;
  languagePlaceholder: string;
  proficiency: string;
  proficiencyLevels: ProficiencyLevels;
  removeLanguage: string;

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
  es: FormTranslations;
}

export const formTranslations: Translations = {
  pt: {
    // Personal Info
    personalInfo: 'Informações Pessoais',
    name: 'Nome Completo',
    desiredPosition: 'Cargo Desejado',
    email: 'E-mail',
    phone: 'Telefone',
    address: 'Endereço',
  portfolio: 'Portfólio',
    linkedin: 'LinkedIn',
    github: 'GitHub',

    // Professional Summary
    summary: 'Resumo Profissional',
    summaryPlaceholder: 'Escreva um breve resumo sobre você, suas qualidades, interesses e objetivos profissionais...',

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
    field: 'Curso',
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
    skillPlaceholder: 'HTML, CSS, JavaScript...',
    level: 'Nível',
    skillLevels: {
      basic: 'Básico',
      intermediate: 'Intermediário',
      advanced: 'Avançado',
      expert: 'Especialista'
    },
    removeSkill: 'Remover Habilidade',

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
    removeLanguage: 'Remover Idioma',

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
    personalInfo: 'Personal Information',
    name: 'Full Name',
    desiredPosition: 'Desired Position',
    email: 'Email',
    phone: 'Phone',
    address: 'Address',
  portfolio: 'Portfolio',
    linkedin: 'LinkedIn',
    github: 'GitHub',

    // Professional Summary
    summary: 'Professional Summary',
    summaryPlaceholder: 'Write a brief summary about you, your qualities, professional interests and goals...',

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
      bachelor: 'Graduation',
      postgraduate: 'Postgraduate',
      master: 'Master',
      doctorate: 'Doctorate'
    },

    // Skills
    addSkill: 'Add Skill',
    skill: 'Skill',
    skillPlaceholder: 'HTML, CSS, JavaScript...',
    level: 'Level',
    skillLevels: {
      basic: 'Basic',
      intermediate: 'Intermediate',
      advanced: 'Advanced',
      expert: 'Expert'
    },
    removeSkill: 'Remove Skill',

    // Languages
    addLanguage: 'Add Language',
    language: 'Language',
    languagePlaceholder: 'English, Spanish, Portuguese...',
    proficiency: 'Proficiency',
    proficiencyLevels: {
      basic: 'Basic',
      intermediate: 'Intermediate',
      advanced: 'Advanced',
      fluent: 'Fluent',
      native: 'Native'
    },
    removeLanguage: 'Remove Language',

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
  ,
  es: {
    // Personal Info
    personalInfo: 'Información Personal',
    name: 'Nombre Completo',
    desiredPosition: 'Puesto Deseado',
    email: 'Correo',
    phone: 'Teléfono',
    address: 'Dirección',
  portfolio: 'Portfolio',
    linkedin: 'LinkedIn',
    github: 'GitHub',

    // Professional Summary
    summary: 'Resumen Profesional',
    summaryPlaceholder: 'Escribe un breve resumen sobre ti, tus cualidades, intereses y objetivos profesionales...',

    // Experience
    addExperience: 'Agregar Experiencia',
    experience: 'Experiencia',
    company: 'Empresa',
    position: 'Puesto',
    startDate: 'Fecha de Inicio',
    endDate: 'Fecha de Fin',
    current: 'Actual',
    description: 'Descripción',
    jobDescription: 'Describe tus principales responsabilidades y logros...',
    remove: 'Eliminar',

    // Education
    addEducation: 'Agregar Formación',
    education: 'Formación',
    institution: 'Institución',
    degree: 'Título',
    field: 'Campo',
    educationDescription: 'Información adicional sobre tu formación...',
    inProgress: 'En curso',
    degreeOptions: {
      highSchool: 'Bachillerato',
      technical: 'Técnico',
      bachelor: 'Licenciatura',
      postgraduate: 'Posgrado',
      master: 'Máster',
      doctorate: 'Doctorado'
    },

    // Skills
    addSkill: 'Agregar Habilidad',
    skill: 'Habilidad',
    skillPlaceholder: 'HTML, CSS, JavaScript...',
    level: 'Nivel',
    skillLevels: {
      basic: 'Básico',
      intermediate: 'Intermedio',
      advanced: 'Avanzado',
      expert: 'Experto'
    },
    removeSkill: 'Eliminar Habilidad',

    // Languages
    addLanguage: 'Agregar Idioma',
    language: 'Idioma',
    languagePlaceholder: 'Inglés, Español, Portugués...',
    proficiency: 'Competencia',
    proficiencyLevels: {
      basic: 'Básico',
      intermediate: 'Intermedio',
      advanced: 'Avanzado',
      fluent: 'Fluido',
      native: 'Nativo'
    },
    removeLanguage: 'Eliminar Idioma',

    // Certifications
    addCertification: 'Agregar Certificación/Curso',
    certification: 'Certificación',
    certificationName: 'Nombre de la Certificación/Curso',
    certificationPlaceholder: 'AWS Certified Developer',
    issuer: 'Institución/Emisor',
    issuerPlaceholder: 'Amazon Web Services',
    date: 'Fecha de Emisión',
    certificationUrl: 'URL del Certificado (opcional)',
    urlPlaceholder: 'https://www.credential.net/...',
    certificationDescription: 'Breve descripción de lo aprendido o el alcance de la certificación...'
  }
}; 