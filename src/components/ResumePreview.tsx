import React from 'react';
import { LanguageCode } from '../translations/formTranslations';
import { ResumeData } from '../types/resume';
import ATSOptimizedResume from './ATSOptimizedResume';
import ATSCompact from './templates/ATSCompact';
import ATSSimple from './templates/ATSSimple';
import '../styles/ats-resume.css';

export type TemplateKey = 'optimized' | 'compact' | 'simple';

interface ResumePreviewProps {
  data: ResumeData;
  language: LanguageCode;
  templateKey?: TemplateKey;
}

const ResumePreview: React.FC<ResumePreviewProps> = ({ data, language, templateKey = 'optimized' }) => {
  switch (templateKey) {
    case 'compact':
      return <ATSCompact data={data} language={language} />;
    case 'simple':
      return <ATSSimple data={data} language={language} />;
    case 'optimized':
    default:
      return <ATSOptimizedResume data={data} language={language} />;
  }
};

export default ResumePreview;
