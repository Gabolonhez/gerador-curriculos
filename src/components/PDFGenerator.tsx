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
        <div 
          id="resume-preview" 
          className="resume-preview max-w-[21cm] mx-auto"
          itemScope 
          itemType="http://schema.org/Person"
        >
          <ResumePreview data={resumeData} language={language} />
        </div>
      </div>
      <style>
        {`
          @media print {
            @page {
              size: A4;
              margin: 1.5cm;
            }
            
            body {
              -webkit-print-color-adjust: exact;
              print-color-adjust: exact;
            }

            .resume-preview {
              font-size: 11pt;
              line-height: 1.4;
              color: #000;
            }

            button, .no-print {
              display: none !important;
            }

            h2 {
              break-after: avoid;
            }

            .section {
              break-inside: avoid;
            }

            .text-gray-600, .text-gray-700 {
              color: #333 !important;
            }

            a {
              text-decoration: none;
              color: #000;
            }

            .mb-6 {
              margin-bottom: 1.2rem;
            }

            .gap-4 {
              gap: 0.8rem;
            }
          }
        `}
      </style>
    </div>
  );
};

export default PDFGenerator; 