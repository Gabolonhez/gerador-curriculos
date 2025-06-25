import { TabType } from '../../types/resume';

export const TAB_ORDER: TabType[] = [
  'informacoes-pessoais',
  'resumo-profissional',
  'experiencia-profissional',
  'formacao-academica',
  'habilidades-tecnicas',
  'idiomas',
  'certificacoes-cursos'
];

export const TAB_CONFIG = [
  { id: 'informacoes-pessoais' as TabType, key: 'personalInfo' },
  { id: 'resumo-profissional' as TabType, key: 'summary' },
  { id: 'experiencia-profissional' as TabType, key: 'experience' },
  { id: 'formacao-academica' as TabType, key: 'education' },
  { id: 'habilidades-tecnicas' as TabType, key: 'skills' },
  { id: 'idiomas' as TabType, key: 'languages' },
  { id: 'certificacoes-cursos' as TabType, key: 'certifications' },
] as const;
