export const DEGREE_OPTIONS = {
  highSchool: 'highSchool',
  technical: 'technical',
  bachelor: 'bachelor',
  postgraduate: 'postgraduate',
  master: 'master',
  doctorate: 'doctorate'
} as const;

export type DegreeOption = typeof DEGREE_OPTIONS[keyof typeof DEGREE_OPTIONS];

export const PROFICIENCY_LEVELS = {
  basic: 'basic',
  intermediate: 'intermediate',
  advanced: 'advanced',
  fluent: 'fluent',
  native: 'native'
} as const;

export type ProficiencyLevel = typeof PROFICIENCY_LEVELS[keyof typeof PROFICIENCY_LEVELS];
