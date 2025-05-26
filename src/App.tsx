import React, { useState } from 'react';
import { SaveIcon, ArrowRight, ArrowLeft, Globe2 } from 'lucide-react';
import PersonalInfoForm from './components/PersonalInfoForm';
import ProfessionalSummaryForm from './components/ProfessionalSummaryForm';
import ExperienceForm from './components/ExperienceForm';
import EducationForm from './components/EducationForm';
import SkillsForm from './components/SkillsForm';
import LanguagesForm from './components/LanguagesForm';
import CertificationsForm from './components/CertificationsForm';
import ResumePreview from './components/ResumePreview';
import { LanguageCode } from './translations/formTranslations';
import { ResumeData, TabType, PersonalInfo, Experience, Education, Skill, Language, Certification } from './types/resume';
import './styles/resume.css';

interface TranslationStrings {
  title: string;
  exportPdf: string;
  personalInfo: string;
  summary: string;
  experience: string;
  education: string;
  skills: string;
  languages: string;
  certifications: string;
  preview: string;
  previous: string;
  next: string;
  printError: string;
  contentError: string;
}

interface Translations {
  pt: TranslationStrings;
  en: TranslationStrings;
}

const translations: Translations = {
  pt: {
    title: 'Gerador de Currículos',
    exportPdf: 'Exportar PDF',
    personalInfo: 'Informações Pessoais',
    summary: 'Resumo Profissional',
    experience: 'Experiência Profissional',
    education: 'Formação Acadêmica',
    skills: 'Habilidades Técnicas',
    languages: 'Idiomas',
    certifications: 'Certificações/Cursos',
    preview: 'Pré-visualização',
    previous: 'Anterior',
    next: 'Próximo',
    printError: 'Não foi possível abrir a janela de impressão. Por favor, verifique se os pop-ups estão permitidos.',
    contentError: 'Erro ao encontrar o conteúdo para impressão.'
  },
  en: {
    title: 'Resume Generator',
    exportPdf: 'Export PDF',
    personalInfo: 'Personal Information',
    summary: 'Professional Summary',
    experience: 'Work Experience',
    education: 'Education',
    skills: 'Technical Skills',
    languages: 'Languages',
    certifications: 'Certifications/Courses',
    preview: 'Preview',
    previous: 'Previous',
    next: 'Next',
    printError: 'Could not open the print window. Please check if pop-ups are allowed.',
    contentError: 'Error finding content for printing.'
  }
};

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<TabType>('informacoes-pessoais');
  const [currentLanguage, setCurrentLanguage] = useState<LanguageCode>('pt');
  const [resumeData, setResumeData] = useState<ResumeData>({
    personal: {
      name: 'Your Name',
      email: 'your.email@example.com',
      phone: '(00) 00000-0000',
      address: 'Your Address',
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
  });

  const t = translations[currentLanguage];

  const updateResumeData = <T extends keyof ResumeData>(section: T, data: ResumeData[T]): void => {
    setResumeData(prev => ({
      ...prev,
      [section]: data
    }));
  };

  const handleNextPage = (): void => {
    const tabOrder: TabType[] = [
      'informacoes-pessoais',
      'resumo-profissional',
      'experiencia-profissional',
      'formacao-academica',
      'habilidades-tecnicas',
      'idiomas',
      'certificacoes-cursos'
    ];
    const currentIndex = tabOrder.indexOf(activeTab);
    if (currentIndex < tabOrder.length - 1) {
      setActiveTab(tabOrder[currentIndex + 1]);
    }
  };

  const handlePreviousPage = (): void => {
    const tabOrder: TabType[] = [
      'informacoes-pessoais',
      'resumo-profissional',
      'experiencia-profissional',
      'formacao-academica',
      'habilidades-tecnicas',
      'idiomas',
      'certificacoes-cursos'
    ];
    const currentIndex = tabOrder.indexOf(activeTab);
    if (currentIndex > 0) {
      setActiveTab(tabOrder[currentIndex - 1]);
    }
  };

  const handleExportPDF = (): void => {
    const printWindow = window.open('', '_blank');
    if (!printWindow) {
      alert(t.printError);
      return;
    }

    const resumePreview = document.getElementById('resume-preview');
    if (!resumePreview) {
      alert(t.contentError);
      return;
    }

    const styles = `
      @page {
        margin: 0;
        size: A4;
      }
      body {
        margin: 0;
        padding: 25mm 20mm;
        font-family: Arial, sans-serif;
        line-height: 1.5;
        color: #2d3748;
      }
      @media print {
        body {
          -webkit-print-color-adjust: exact;
          print-color-adjust: exact;
        }
        .no-print {
          display: none !important;
        }
        h1 {
          font-size: 24px;
          margin-bottom: 16px;
          color: #1a202c;
        }
        h2 {
          font-size: 18px;
          margin-top: 24px;
          margin-bottom: 12px;
          color: #2d3748;
          border-bottom: 2px solid #e2e8f0;
          padding-bottom: 4px;
        }
        h3 {
          font-size: 16px;
          margin-bottom: 8px;
          color: #2d3748;
        }
        p {
          margin-bottom: 8px;
          line-height: 1.6;
        }
        .section {
          margin-bottom: 20px;
        }
        .contact-info {
          margin-bottom: 24px;
          display: flex;
          flex-wrap: wrap;
          gap: 16px;
        }
        .contact-item {
          display: flex;
          align-items: center;
          gap: 8px;
          color: #4a5568;
        }
        .experience-item, .education-item {
          margin-bottom: 16px;
        }
        .skills-list {
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
          margin-bottom: 16px;
        }
        .skill-item {
          background-color: #f7fafc;
          padding: 4px 12px;
          border-radius: 16px;
          font-size: 14px;
        }
        .date {
          color: #718096;
          font-size: 14px;
        }
        .description {
          margin-top: 8px;
          color: #4a5568;
        }
      }
    `;

    printWindow.document.write(`
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <title>${resumeData.personal.name || 'Resume'}</title>
          <style>${styles}</style>
        </head>
        <body>
          ${resumePreview.innerHTML}
        </body>
      </html>
    `);
    
    printWindow.document.close();
    
    printWindow.onload = () => {
      printWindow.print();
      printWindow.close();
    };
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case 'informacoes-pessoais':
        return <PersonalInfoForm 
          data={resumeData.personal} 
          updateData={(data: PersonalInfo) => updateResumeData('personal', data)} 
          language={currentLanguage}
        />;
      case 'resumo-profissional':
        return <ProfessionalSummaryForm 
          data={resumeData.summary} 
          updateData={(data: string) => updateResumeData('summary', data)} 
          language={currentLanguage}
        />;
      case 'experiencia-profissional':
        return <ExperienceForm 
          data={resumeData.experience} 
          updateData={(data: Experience[]) => updateResumeData('experience', data)} 
          language={currentLanguage}
        />;
      case 'formacao-academica':
        return <EducationForm 
          data={resumeData.education} 
          updateData={(data: Education[]) => updateResumeData('education', data)} 
          language={currentLanguage}
        />;
      case 'habilidades-tecnicas':
        return <SkillsForm 
          data={resumeData.skills} 
          updateData={(data: Skill[]) => updateResumeData('skills', data)} 
          language={currentLanguage}
        />;
      case 'idiomas':
        return <LanguagesForm 
          data={resumeData.languages} 
          updateData={(data: Language[]) => updateResumeData('languages', data)} 
          language={currentLanguage}
        />;
      case 'certificacoes-cursos':
        return <CertificationsForm 
          data={resumeData.certifications} 
          updateData={(data: Certification[]) => updateResumeData('certifications', data)} 
          language={currentLanguage}
        />;
      default:
        return <PersonalInfoForm 
          data={resumeData.personal} 
          updateData={(data: PersonalInfo) => updateResumeData('personal', data)} 
          language={currentLanguage}
        />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="flex flex-col min-h-screen">
        {/* Header */}
        <header className="bg-white shadow-sm sticky top-0 z-50 w-full">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col sm:flex-row justify-between items-center py-4 sm:h-16 space-y-4 sm:space-y-0">
              <h1 className="text-2xl font-semibold text-gray-900">
                {t.title}
              </h1>
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2">
                  <button
                    className={`flex items-center px-3 py-2 rounded-md transition-colors ${
                      currentLanguage === 'pt'
                        ? 'bg-blue-600 text-white'
                        : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                    }`}
                    onClick={() => setCurrentLanguage('pt')}
                  >
                    <Globe2 className="w-4 h-4 mr-1" /> PT
                  </button>
                  <button
                    className={`flex items-center px-3 py-2 rounded-md transition-colors ${
                      currentLanguage === 'en'
                        ? 'bg-blue-600 text-white'
                        : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                    }`}
                    onClick={() => setCurrentLanguage('en')}
                  >
                    <Globe2 className="w-4 h-4 mr-1" /> EN
                  </button>
                </div>
                <button
                  className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
                  onClick={handleExportPDF}
                >
                  <SaveIcon className="w-4 h-4 mr-2" /> {t.exportPdf}
                </button>
              </div>
            </div>
          </div>
        </header>

        {/* Navigation */}
        <nav className="bg-white border-b overflow-x-auto w-full">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex space-x-8 whitespace-nowrap">
              {[
                { id: 'informacoes-pessoais', label: t.personalInfo },
                { id: 'resumo-profissional', label: t.summary },
                { id: 'experiencia-profissional', label: t.experience },
                { id: 'formacao-academica', label: t.education },
                { id: 'habilidades-tecnicas', label: t.skills },
                { id: 'idiomas', label: t.languages },
                { id: 'certificacoes-cursos', label: t.certifications },
              ].map((tab) => (
                <button
                  key={tab.id}
                  className={`py-4 text-sm font-medium border-b-2 transition-colors flex-shrink-0 ${
                    activeTab === tab.id
                      ? 'text-blue-600 border-blue-600'
                      : 'text-gray-500 border-transparent hover:text-gray-700 hover:border-gray-300'
                  }`}
                  onClick={() => setActiveTab(tab.id as TabType)}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>
        </nav>

        {/* Main Content */}
        <main className="flex-grow py-6">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
              {/* Form Section */}
              <div className="bg-white shadow-sm rounded-lg p-4 sm:p-6">
                {renderTabContent()}
                <div className="flex flex-col sm:flex-row justify-between mt-6 space-y-4 sm:space-y-0">
                  <button
                    onClick={handlePreviousPage}
                    className={`flex items-center justify-center px-4 py-2 rounded-md transition-colors w-full sm:w-auto ${
                      activeTab === 'informacoes-pessoais'
                        ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                        : 'bg-blue-600 hover:bg-blue-700 text-white'
                    }`}
                    disabled={activeTab === 'informacoes-pessoais'}
                  >
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    {t.previous}
                  </button>
                  <button
                    onClick={handleNextPage}
                    className={`flex items-center justify-center px-4 py-2 rounded-md transition-colors w-full sm:w-auto ${
                      activeTab === 'certificacoes-cursos'
                        ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                        : 'bg-blue-600 hover:bg-blue-700 text-white'
                    }`}
                    disabled={activeTab === 'certificacoes-cursos'}
                  >
                    {t.next}
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </button>
                </div>
              </div>

              {/* Preview Section */}
              <div className="bg-white shadow-sm rounded-lg p-4 sm:p-6">
                <h2 className="text-lg font-medium mb-4">{t.preview}</h2>
                <div
                  id="resume-preview"
                  className="border rounded-lg p-4 sm:p-6 overflow-auto"
                  style={{ maxHeight: 'calc(100vh - 300px)' }}
                >
                  <ResumePreview data={resumeData} language={currentLanguage} />
                </div>
              </div>
            </div>
          </div>
        </main>

        {/* Footer */}
        <footer className="bg-white border-t mt-auto w-full">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <p className="py-4 text-center text-sm text-gray-500">
              © {new Date().getFullYear()} {t.title}. {currentLanguage === 'pt' ? 'Todos os direitos reservados.' : 'All rights reserved.'}
            </p>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default App;