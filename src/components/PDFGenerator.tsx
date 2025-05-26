import React from 'react';
import ResumePreview from './ResumePreview';
import { LanguageCode } from '../translations/formTranslations';
import { ResumeData } from '../types/resume';

interface PDFGeneratorProps {
  resumeData: ResumeData;
  language: LanguageCode;
}

const PDFGenerator: React.FC<PDFGeneratorProps> = ({ resumeData, language }) => {
  return (
    <div className="bg-white shadow-lg rounded-lg overflow-hidden">
      <div className="p-6">
        <div id="resume-preview" className="resume-preview">
          <ResumePreview data={resumeData} language={language} />
        </div>
      </div>
    </div>
  );
};

export default PDFGenerator; 