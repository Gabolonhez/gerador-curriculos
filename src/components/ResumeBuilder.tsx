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
import { ResumeData, TabType, PersonalInfo as PersonalInfoType, Experience, Education as EducationType, Skill, Language, Certification } from '../types/resume';

const initialResumeData: ResumeData = {
  personal: {
    name: '',
    email: '',
    phone: '',
    address: '',
    website: '',
    linkedin: '',
    github: ''
  },
  summary: '',
  experience: [],
  education: [],
  skills: [],
  languages: [],
  certifications: []
};

const ResumeBuilder: React.FC = () => {
  const [activeTab, setActiveTab] = useState<TabType>('informacoes-pessoais');
  const [showPDF, setShowPDF] = useState(false);
  const [resumeData, setResumeData] = useState<ResumeData>(initialResumeData);
  const language: LanguageCode = 'pt'; // Default to Portuguese

  const updateResumeData = <T extends keyof ResumeData>(section: T, data: ResumeData[T]) => {
    setResumeData(prev => ({
      ...prev,
      [section]: data
    }));
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case 'informacoes-pessoais':
        return <PersonalInfo data={resumeData.personal} updateData={(data: PersonalInfoType) => updateResumeData('personal', data)} language={language} />;
      case 'resumo-profissional':
        return <ProfessionalSummary data={resumeData.summary} updateData={(data: string) => updateResumeData('summary', data)} language={language} />;
      case 'experiencia-profissional':
        return <WorkExperience data={resumeData.experience} updateData={(data: Experience[]) => updateResumeData('experience', data)} language={language} />;
      case 'formacao-academica':
        return <Education data={resumeData.education} updateData={(data: EducationType[]) => updateResumeData('education', data)} language={language} />;
      case 'habilidades-tecnicas':
        return <TechnicalSkills data={resumeData.skills} updateData={(data: Skill[]) => updateResumeData('skills', data)} language={language} />;
      case 'idiomas':
        return <Languages data={resumeData.languages} updateData={(data: Language[]) => updateResumeData('languages', data)} language={language} />;
      case 'certificacoes-cursos':
        return <Certifications data={resumeData.certifications} updateData={(data: Certification[]) => updateResumeData('certifications', data)} language={language} />;
      default:
        return <PersonalInfo data={resumeData.personal} updateData={(data: PersonalInfoType) => updateResumeData('personal', data)} language={language} />;
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