export const SKILL_LEVELS = {
  basic: 'basic',
  intermediate: 'intermediate',
  advanced: 'advanced',
  expert: 'expert'
} as const;

export type SkillLevel = typeof SKILL_LEVELS[keyof typeof SKILL_LEVELS];

export const SKILL_LEVEL_ORDER = [
  SKILL_LEVELS.basic,
  SKILL_LEVELS.intermediate,
  SKILL_LEVELS.advanced,
  SKILL_LEVELS.expert
] as const;
