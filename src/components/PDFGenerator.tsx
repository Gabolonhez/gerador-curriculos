import React from 'react';
import ResumePreview from './ResumePreview';
import { LanguageCode } from '../translations/formTranslations';
import { ResumeData } from '../types/resume';

interface PersonalInfo {
  name?: string;
  email?: string;
  phone?: string;
  address?: string;
  website?: string;
  linkedin?: string;
  github?: string;
}

interface Experience {
  id: string;
  company: string;
  position: string;
  startDate: string;
  endDate: string;
  current: boolean;
  description: string;
}

interface Education {
  id: string;
  institution: string;
  degree: string;
  field: string;
  startDate: string;
  endDate: string;
  current: boolean;
  description: string;
}

interface Skill {
  id: string;
  name: string;
  level: string;
}

interface Language {
  id: string;
  name: string;
  level: string;
}

interface Certification {
  id: string;
  name: string;
  issuer: string;
  date: string;
  url?: string;
  description: string;
}

interface ResumeData {
  personal: PersonalInfo;
  summary: string;
  experience: Experience[];
  education: Education[];
  skills: Skill[];
  languages: Language[];
  certifications: Certification[];
}

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