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
const initialResumeData = {
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
const ResumeBuilder = () => {
  const [activeTab, setActiveTab] = useState('informacoes-pessoais');
  const [showPDF, setShowPDF] = useState(false);
  const updateResumeData = (section, data) => {
    setResumeData(prev => ({
      ...prev,
      [section]: data
    }));
  };
  const renderTabContent = () => {
    switch (activeTab) {
      case 'informacoes-pessoais':
        return <PersonalInfo data={resumeData.personalInfo} updateData={data => updateResumeData('personalInfo', data)} />;
      case 'resumo-profissional':
        return <ProfessionalSummary data={resumeData.professionalSummary} updateData={data => updateResumeData('professionalSummary', data)} />;
      case 'experiencia-profissional':
        return <WorkExperience data={resumeData.workExperience} updateData={data => updateResumeData('workExperience', data)} />;
      case 'formacao-academica':
        return <Education data={resumeData.education} updateData={data => updateResumeData('education', data)} />;
      case 'habilidades-tecnicas':
        return <TechnicalSkills data={resumeData.technicalSkills} updateData={data => updateResumeData('technicalSkills', data)} />;
      case 'idiomas':
        return <Languages data={resumeData.languages} updateData={data => updateResumeData('languages', data)} />;
      case 'certificacoes-cursos':
        return <Certifications data={resumeData.certifications} updateData={data => updateResumeData('certifications', data)} />;
      default:
        return <PersonalInfo data={resumeData.personalInfo} updateData={data => updateResumeData('personalInfo', data)} />;
    }
  };
  return <div className="bg-white rounded-lg shadow-lg p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold">Crie seu Currículo</h2>
        <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition" onClick={() => setShowPDF(!showPDF)}>
          {showPDF ? 'Voltar para Edição' : 'Gerar PDF'}
        </button>
      </div>
      {showPDF ? <PDFGenerator resumeData={resumeData} /> : <>
          <TabNavigation activeTab={activeTab} setActiveTab={setActiveTab} />
          <div className="mt-6">{renderTabContent()}</div>
        </>}
    </div>;
};
export default ResumeBuilder;