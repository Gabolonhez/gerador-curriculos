import React from 'react';
import { SaveIcon, ArrowRight, ArrowLeft } from 'lucide-react';
import PersonalInfoForm from './components/PersonalInfoForm';
import ProfessionalSummaryForm from './components/ProfessionalSummaryForm';
import ExperienceForm from './components/ExperienceForm';
import EducationForm from './components/EducationForm';
import SkillsForm from './components/SkillsForm';
import LanguagesForm from './components/LanguagesForm';
import CertificationsForm from './components/CertificationsForm';
import ResumePreview from './components/ResumePreview';
import ATSAnalysis from './components/analysis/ATSAnalysis';
import LanguageToggle from './components/common/LanguageToggle';
import Navigation from './components/common/Navigation';
import Button from './components/ui/Button';
import { useResumeData } from './hooks/useResumeData';
import { useTabNavigation } from './hooks/useTabNavigation';
import { useLanguage } from './hooks/useLanguage';
import { usePDFExport } from './hooks/usePDFExport';
import { PersonalInfo, Experience, Education, Skill, Language, Certification } from './types/resume';
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
  atsAnalysis: string;
  previous: string;
  next: string;
  printError: string;
  contentError: string;
  madeBy: string;
  allRightsReserved: string;
}

interface Translations {
  pt: TranslationStrings;
  en: TranslationStrings;
}

const translations: Translations = {
  pt: {
    title: 'Gerador de Currículos',
    exportPdf: 'Exportar currículo em PDF',
    personalInfo: 'Informações Pessoais',
    summary: 'Resumo Profissional',
    experience: 'Experiência Profissional',
    education: 'Formação Acadêmica',
    skills: 'Habilidades',
    languages: 'Idiomas',
    certifications: 'Certificações/Cursos',
    preview: 'Pré-visualização',
    atsAnalysis: 'Análise ATS',
    previous: 'Anterior',
    next: 'Próximo',
    printError: 'Não foi possível abrir a janela de impressão. Por favor, verifique se os pop-ups estão permitidos.',
    contentError: 'Erro ao encontrar o conteúdo para impressão.',
    madeBy: 'Feito por',
    allRightsReserved: 'Todos os direitos reservados.'
  },
  en: {
    title: 'Resume Generator',
    exportPdf: 'Export resume in PDF',
    personalInfo: 'Personal Information',
    summary: 'Professional Summary',
    experience: 'Work Experience',
    education: 'Education',
    skills: 'Skills',
    languages: 'Languages',
    certifications: 'Certifications/Courses',
    preview: 'Preview',
    atsAnalysis: 'ATS Analysis',
    previous: 'Previous',
    next: 'Next',
    printError: 'Could not open the print window. Please check if pop-ups are allowed.',
    contentError: 'Error finding content for printing.',
    madeBy: 'Made by',
    allRightsReserved: 'All rights reserved.'
  }
};

const App: React.FC = () => {
  // Usando os hooks customizados
  const { resumeData, updateResumeData } = useResumeData();
  const { activeTab, setActiveTab, handleNextPage, handlePreviousPage, canGoNext, canGoPrevious } = useTabNavigation();
  const { currentLanguage, setLanguage } = useLanguage();
  const { exportToPDF } = usePDFExport({ language: currentLanguage });

  // Estado para alternar entre preview e análise ATS
  const [previewMode, setPreviewMode] = React.useState<'preview' | 'analysis'>('preview');

  const t = translations[currentLanguage];

  // Função para lidar com exportação de PDF
  const handleExportPDF = () => {
    // Se estiver na análise ATS, mudar para preview primeiro
    if (previewMode === 'analysis') {
      setPreviewMode('preview');
      // Aguardar um momento para o DOM ser atualizado
      setTimeout(() => {
        exportToPDF();
      }, 100);
    } else {
      exportToPDF();
    }
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
                <LanguageToggle 
                  currentLanguage={currentLanguage}
                  onLanguageChange={setLanguage}
                />
                <Button onClick={handleExportPDF}>
                  <SaveIcon className="w-4 h-4 mr-2" /> {t.exportPdf}
                </Button>
              </div>
            </div>
          </div>
        </header>

        {/* Navigation */}
        <Navigation 
          activeTab={activeTab}
          onTabChange={setActiveTab}
          translations={t}
        />

        {/* Main Content */}
        <main className="flex-grow py-6">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
              {/* Form Section */}
              <div className="bg-white shadow-sm rounded-lg p-4 sm:p-6">
                {renderTabContent()}
                <div className="flex flex-col sm:flex-row justify-between mt-6 space-y-4 sm:space-y-0">
                  <Button
                    onClick={handlePreviousPage}
                    disabled={!canGoPrevious}
                    variant={canGoPrevious ? 'primary' : 'secondary'}
                    className="w-full sm:w-auto"
                  >
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    {t.previous}
                  </Button>
                  <Button
                    onClick={handleNextPage}
                    disabled={!canGoNext}
                    variant={canGoNext ? 'primary' : 'secondary'}
                    className="w-full sm:w-auto"
                  >
                    {t.next}
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </div>
              </div>

              {/* Preview Section */}
              <div className="bg-white shadow-sm rounded-lg p-4 sm:p-6">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-lg font-medium">
                    {previewMode === 'preview' ? t.preview : t.atsAnalysis}
                  </h2>
                  <div className="flex rounded-lg bg-gray-100 p-1">
                    <button
                      onClick={() => setPreviewMode('preview')}
                      className={`px-3 py-1 text-sm font-medium rounded-md transition-colors ${
                        previewMode === 'preview'
                          ? 'bg-white text-gray-900 shadow-sm'
                          : 'text-gray-500 hover:text-gray-700'
                      }`}
                    >
                      {t.preview}
                    </button>
                    <button
                      onClick={() => setPreviewMode('analysis')}
                      className={`px-3 py-1 text-sm font-medium rounded-md transition-colors ${
                        previewMode === 'analysis'
                          ? 'bg-white text-gray-900 shadow-sm'
                          : 'text-gray-500 hover:text-gray-700'
                      }`}
                    >
                      {t.atsAnalysis}
                    </button>
                  </div>
                </div>
                
                {previewMode === 'preview' ? (
                  <div
                    id="resume-preview"
                    className="border rounded-lg p-4 sm:p-6 overflow-auto resume-preview"
                  >
                    <ResumePreview data={resumeData} language={currentLanguage} />
                  </div>
                ) : (
                  <div className="overflow-auto">
                    <ATSAnalysis resumeData={resumeData} language={currentLanguage} />
                  </div>
                )}
              </div>
            </div>
          </div>
        </main>

        {/* Footer */}
        <footer className="bg-white border-t mt-auto w-full">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="py-4 text-center text-sm text-gray-500 space-y-2">
              <p>
                © {new Date().getFullYear()} {t.title}. {t.allRightsReserved}
              </p>
              <p className="flex items-center justify-center space-x-2">
                <span>{t.madeBy}</span>
                <a 
              
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:text-blue-800 font-medium"
                >
                  Gabriel Bolonhez
                </a>
                <span>•</span>
                <a 
                  href="https://github.com/gabolonhez"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:text-blue-800"
                >
                  GitHub
                </a>
                <span>•</span>
                <a 
                  href="https://linkedin.com/in/gabolonhez"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:text-blue-800"
                >
                  LinkedIn
                </a>
              </p>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default App;