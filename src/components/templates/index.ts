import ATSCompact from './ATSCompact';
import ATSSimple from './ATSSimple';
import ATSOptimized from '../ATSOptimizedResume';
import ATSTwoColumn from './ATSTwoColumn';
import type { ResumeData } from '../../types/resume';
import type { LanguageCode } from '../../translations/formTranslations';
import type { TemplateKey } from '../TemplateTypes';

export type TemplateComponent = React.ComponentType<{ data: ResumeData; language: LanguageCode }>;

export const templates: Record<TemplateKey, TemplateComponent> = {
  optimized: ATSOptimized,
  compact: ATSCompact,
  simple: ATSSimple,
  twocolumn: ATSTwoColumn
};

export default templates;
