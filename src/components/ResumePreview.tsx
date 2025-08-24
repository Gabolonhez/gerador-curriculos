import React from 'react';
import { LanguageCode } from '../translations/formTranslations';
import { ResumeData } from '../types/resume';
import templates from './templates';
import { TemplateKey } from './TemplateTypes';
import '../styles/ats-resume.css';

interface ResumePreviewProps {
  data: ResumeData;
  language: LanguageCode;
  templateKey?: TemplateKey;
}

const ResumePreview: React.FC<ResumePreviewProps> = ({ data, language, templateKey = 'optimized' }) => {
  const Comp = templates[templateKey];
  return <Comp data={data} language={language} />;
};

export default ResumePreview;
