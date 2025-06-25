import React from 'react';
import { LanguageCode } from '../translations/formTranslations';
import { ResumeData } from '../types/resume';
import ATSOptimizedResume from './ATSOptimizedResume';
import '../styles/ats-resume.css';

interface ResumePreviewProps {
  data: ResumeData;
  language: LanguageCode;
}

const ResumePreview: React.FC<ResumePreviewProps> = ({ data, language }) => {
  return <ATSOptimizedResume data={data} language={language} />;
};

export default ResumePreview;
