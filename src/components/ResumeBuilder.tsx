import React, { useState } from 'react';
import TabNavigation from './TabNavigation';
import PersonalInfo from './sections/PersonalInfo';
import ProfessionalSummary from './sections/ProfessionalSummary';
import WorkExperience from './sections/WorkExperience';
import Education from './sections/Education';
import TechnicalSkills from './sections/TechnicalSkills';
import Languages from './sections/Languages';
import Certifications from './sections/Certifications';
import PDFGenerator from './PDFGenerator';
import { LanguageCode } from '../translations/formTranslations';

interface PersonalInfoData {
  name: string;
  email: string;
  phone: string;
  address: string;
  website?: string;
  linkedin?: string;
  github?: string;
}

interface ExperienceItem {
  company: string;
  position: string;
  startDate: string;
  endDate: string;
  description: string;
}

interface EducationItem {
  institution: string;
  degree: string;
  field: string;
  startDate: string;
  endDate: string;
}

interface Skill {
  name: string;
  level: string;
}

interface LanguageItem {
  language: string;
  proficiency: string;
}

interface Certification {
  name: string;
  issuer: string;
  date: string;
  description: string;
}

interface ResumeData {
  personalInfo: PersonalInfoData;
  professionalSummary: string;
  workExperience: ExperienceItem[];
  education: EducationItem[];
  technicalSkills: Skill[];
  languages: LanguageItem[];
  certifications: Certification[];
}

const initialResumeData: ResumeData = {
  personalInfo: {
    name: '',
    email: '',
    phone: '',
    address: '',
    linkedin: '',
    github: ''
  },
  professionalSummary: '',
  workExperience: [{
    company: '',
    position: '',
    startDate: '',
    endDate: '',
    description: ''
  }],
  education: [{
    institution: '',
    degree: '',
    field: '',
    startDate: '',
    endDate: ''
  }],
  technicalSkills: [],
  languages: [{
    language: '',
    proficiency: ''
  }],
  certifications: [{
    name: '',
    issuer: '',
    date: '',
    description: ''
  }]
};

type TabType = 'informacoes-pessoais' | 'resumo-profissional' | 'experiencia-profissional' | 
               'formacao-academica' | 'habilidades-tecnicas' | 'idiomas' | 'certificacoes-cursos';

const ResumeBuilder: React.FC = () => {
  const [activeTab, setActiveTab] = useState<TabType>('informacoes-pessoais');
  const [showPDF, setShowPDF] = useState(false);
  const [resumeData, setResumeData] = useState<ResumeData>(initialResumeData);
  const language: LanguageCode = 'pt'; // Default to Portuguese

  const updateResumeData = (section: keyof ResumeData, data: any) => {
    setResumeData(prev => ({
      ...prev,
      [section]: data
    }));
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case 'informacoes-pessoais':
        return <PersonalInfo data={resumeData.personalInfo} updateData={data => updateResumeData('personalInfo', data)} language={language} />;
      case 'resumo-profissional':
        return <ProfessionalSummary data={resumeData.professionalSummary} updateData={data => updateResumeData('professionalSummary', data)} language={language} />;
      case 'experiencia-profissional':
        return <WorkExperience data={resumeData.workExperience} updateData={data => updateResumeData('workExperience', data)} language={language} />;
      case 'formacao-academica':
        return <Education data={resumeData.education} updateData={data => updateResumeData('education', data)} language={language} />;
      case 'habilidades-tecnicas':
        return <TechnicalSkills data={resumeData.technicalSkills} updateData={data => updateResumeData('technicalSkills', data)} language={language} />;
      case 'idiomas':
        return <Languages data={resumeData.languages} updateData={data => updateResumeData('languages', data)} language={language} />;
      case 'certificacoes-cursos':
        return <Certifications data={resumeData.certifications} updateData={data => updateResumeData('certifications', data)} language={language} />;
      default:
        return <PersonalInfo data={resumeData.personalInfo} updateData={data => updateResumeData('personalInfo', data)} language={language} />;
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold">Crie seu Currículo</h2>
        <button 
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition" 
          onClick={() => setShowPDF(!showPDF)}
        >
          {showPDF ? 'Voltar para Edição' : 'Gerar PDF'}
        </button>
      </div>
      {showPDF ? (
        <PDFGenerator resumeData={resumeData} language={language} />
      ) : (
        <>
          <TabNavigation activeTab={activeTab} setActiveTab={setActiveTab} />
          <div className="mt-6">{renderTabContent()}</div>
        </>
      )}
    </div>
  );
};

export default ResumeBuilder;