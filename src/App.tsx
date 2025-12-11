import React from 'react';
import { ResumeData } from './types/resume';
import { SaveIcon, ArrowRight, ArrowLeft, TrashIcon } from 'lucide-react';
import PersonalInfoForm from './components/PersonalInfoForm';
import ProfessionalSummaryForm from './components/ProfessionalSummaryForm';
import ExperienceForm from './components/ExperienceForm';
import EducationForm from './components/EducationForm';
import SkillsForm from './components/SkillsForm';
import LanguagesForm from './components/LanguagesForm';
import CertificationsForm from './components/CertificationsForm';
import ProjectsForm from './components/ProjectsForm';
import ResumePreview from './components/ResumePreview';
import ATSAnalysis from './components/analysis/ATSAnalysis';
import LanguageToggle from './components/common/LanguageToggle';
import TemplateSelector from './components/common/TemplateSelector';
import Navigation from './components/common/Navigation';
import Button from './components/ui/Button';
import { useResumeData } from './hooks/useResumeData';
import { useTabNavigation } from './hooks/useTabNavigation';
import { useLanguage } from './hooks/useLanguage';
import { usePDFExport } from './hooks/usePDFExport';
import SectionOrderModal from './components/SectionOrderModal';
import { PersonalInfo, Experience, Education, Skill, Language, Certification, Project } from './types/resume';
import { ThemeProvider } from './hooks/useTheme';
import ThemeToggle from './components/common/ThemeToggle';
import './styles/resume.css';
import PdfImportModal from './components/PdfImportModal';
import { Upload } from 'lucide-react';

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
  projects: string;
  orderSections: string;
  preview: string;
  atsAnalysis: string;
  previous: string;
  next: string;
  printError: string;
  contentError: string;
  madeBy: string;
  allRightsReserved: string;
  clearData: string;
  clearDataConfirm: string;
  dataSaved: string;
  dataCleared: string;
  done: string;
}

interface Translations {
  pt: TranslationStrings;
  en: TranslationStrings;
  es: TranslationStrings;
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
    certifications: 'Certificados',
    projects: 'Projetos',
    orderSections: 'Ordenar seções',
    preview: 'Pré-visualização',
    atsAnalysis: 'Análise ATS',
    previous: 'Anterior',
    next: 'Próximo',
    printError: 'Não foi possível abrir a janela de impressão. Por favor, verifique se os pop-ups estão permitidos.',
    contentError: 'Erro ao encontrar o conteúdo para impressão.',
    madeBy: 'Desenvolvido por',
    allRightsReserved: 'Todos os direitos reservados.',
    clearData: 'Limpar Dados',
    clearDataConfirm: 'Tem certeza que deseja limpar todos os dados salvos? Esta ação não pode ser desfeita.',
    dataSaved: 'Dados salvos automaticamente',
    dataCleared: 'Dados limpos com sucesso',
    done: 'Concluído'
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
    certifications: 'Certificates',
    projects: 'Projects',
    orderSections: 'Order sections',
    preview: 'Preview',
    atsAnalysis: 'ATS Analysis',
    previous: 'Previous',
    next: 'Next',
    printError: 'Could not open the print window. Please check if pop-ups are allowed.',
    contentError: 'Error finding content for printing.',
    madeBy: 'Developed by',
    allRightsReserved: 'All rights reserved.',
    clearData: 'Clear Data',
    clearDataConfirm: 'Are you sure you want to clear all saved data? This action cannot be undone.',
    dataSaved: 'Data saved automatically',
    dataCleared: 'Data cleared successfully',
    done: 'Done'
  }
  ,
  es: {
    title: 'Generador de Currículums',
    exportPdf: 'Exportar CV en PDF',
    personalInfo: 'Información Personal',
    summary: 'Resumen Profesional',
    experience: 'Experiencia Profesional',
    education: 'Formación Académica',
    skills: 'Habilidades',
    languages: 'Idiomas',
    certifications: 'Certificados',
    projects: 'Proyectos',
    orderSections: 'Ordenar secciones',
    preview: 'Previsualización',
    atsAnalysis: 'Análisis ATS',
    previous: 'Anterior',
    next: 'Siguiente',
    printError: 'No se pudo abrir la ventana de impresión. Por favor, comprueba que los pop-ups estén permitidos.',
    contentError: 'Error al encontrar el contenido para imprimir.',
    madeBy: 'Desarrollado por',
    allRightsReserved: 'Todos los derechos reservados.',
    clearData: 'Borrar Datos',
    clearDataConfirm: '¿Seguro que deseas borrar todos los datos guardados? Esta acción no se puede deshacer.',
    dataSaved: 'Datos guardados automáticamente',
    dataCleared: 'Datos borrados con éxito',
    done: 'Hecho'
  }
};

const App: React.FC = () => {
  // Usando os hooks customizados
  interface ResumeHookReturn {
    resumeData: ResumeData;
    updateResumeData: <T extends keyof ResumeData>(section: T, data: ResumeData[T]) => void;
    updateSectionOrder?: (order: ResumeData['sectionOrder']) => void;
    resetResumeData: () => void;
    exportData?: () => string;
    importData?: (json: string) => boolean;
    importPartialData?: (data: Partial<ResumeData>) => void;
  }

  const resumeHook = useResumeData() as ResumeHookReturn;
  const { resumeData, updateResumeData, resetResumeData, updateSectionOrder, importPartialData } = resumeHook;
  const { activeTab, setActiveTab, handleNextPage, handlePreviousPage, canGoNext, canGoPrevious } = useTabNavigation();
  const { currentLanguage, setLanguage } = useLanguage();
  const { exportToPDF } = usePDFExport({ language: currentLanguage });

  // Estado para alternar entre preview e análise ATS
  const [previewMode, setPreviewMode] = React.useState<'preview' | 'analysis'>('preview');
  const [showSectionModal, setShowSectionModal] = React.useState(false);
  const [showImportModal, setShowImportModal] = React.useState(false);
  // Template selection (persisted)
  const TEMPLATE_STORAGE_KEY = 'resume-generator-template';
  const [templateKey, setTemplateKey] = React.useState<'optimized' | 'simple' | 'twocolumn' | 'professional'>(() => {
    try {
      const v = localStorage.getItem(TEMPLATE_STORAGE_KEY);
      if (v === 'simple' || v === 'optimized' || v === 'twocolumn' || v === 'professional')
        return v as 'optimized' | 'simple' | 'twocolumn' | 'professional';
    } catch (e) {
      console.warn('Could not read template from localStorage', e);
    }
    return 'optimized';
  });

  React.useEffect(() => {
    try {
      localStorage.setItem(TEMPLATE_STORAGE_KEY, templateKey);
    } catch (e) {
      console.warn('Could not persist template to localStorage', e);
    }
  }, [templateKey]);

  // Estado para mostrar indicador de salvamento
  const [showSavedIndicator, setShowSavedIndicator] = React.useState(false);

  const t = translations[currentLanguage];

  // Efeito para mostrar indicador quando dados são alterados
  React.useEffect(() => {
    setShowSavedIndicator(true);
    const timer = setTimeout(() => {
      setShowSavedIndicator(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, [resumeData]);

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

  // Função para limpar dados
  const handleClearData = () => {
    resetResumeData();
  };

  const handleImportPdf = (data: Partial<ResumeData>) => {
    if (importPartialData) {
      importPartialData(data);
      setShowSavedIndicator(true);
      setTimeout(() => setShowSavedIndicator(false), 2000);
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
      case 'projetos':
        return <ProjectsForm
          data={resumeData.projects}
          updateData={(data: Project[]) => updateResumeData('projects', data)}
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
    <ThemeProvider>
      <div className="min-h-screen bg-gray-100 dark:bg-gray-900 transition-colors duration-200">
        <div className="flex flex-col min-h-screen">
          {/* Header */}
          <header className="bg-white dark:bg-gray-800 shadow-sm sticky top-0 z-50 w-full transition-colors duration-200">
            <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
              <div className="flex flex-col sm:flex-row justify-between items-center py-3 sm:py-4 space-y-3 sm:space-y-0">
                {/* Title Section */}
                <div className="flex items-center space-x-2 sm:space-x-4 w-full sm:w-auto justify-center sm:justify-start">
                  <h1 className="text-xl sm:text-2xl font-semibold text-gray-900 dark:text-white">
                    {t.title}
                  </h1>
                  {showSavedIndicator && (
                    <div className="hidden sm:flex items-center text-green-600 text-sm animate-fade-in">
                      <SaveIcon className="w-4 h-4 mr-1" />
                      {t.dataSaved}
                    </div>
                  )}
                </div>

                {/* Actions Section */}
                <div className="flex items-center gap-2 sm:gap-3 w-full sm:w-auto justify-center">
                  {/* Import PDF Button */}
                  <Button
                    onClick={() => setShowImportModal(true)}
                    variant="secondary"
                    size="sm"
                    className="flex-shrink-0"
                    title="Importar PDF"
                  >
                    <Upload className="w-4 h-4 sm:mr-2" />
                    <span className="hidden sm:inline">Importar PDF</span>
                  </Button>
                  {/* Clear Data Button */}
                  <Button
                    onClick={handleClearData}
                    variant="secondary"
                    size="sm"
                    className="text-red-600 hover:text-red-800 flex-shrink-0"
                    title={t.clearData}
                  >
                    <TrashIcon className="w-4 h-4 sm:mr-2" />
                    <span className="hidden sm:inline">{t.clearData}</span>
                  </Button>

                  {/* Theme Toggle */}
                  <ThemeToggle />

                  {/* Language Toggle */}
                  <LanguageToggle
                    currentLanguage={currentLanguage}
                    onLanguageChange={setLanguage}
                  />

                  {/* Export PDF Button */}
                  <Button
                    onClick={handleExportPDF}
                    size="sm"
                    className="flex-shrink-0"
                    title={t.exportPdf}
                  >
                    <SaveIcon className="w-4 h-4 sm:mr-2" />
                    <span className="hidden lg:inline">{t.exportPdf}</span>
                    <span className="hidden sm:inline lg:hidden">PDF</span>
                  </Button>
                </div>
              </div>
            </div>

            {/* Template Selector */}
            <div className="flex justify-center pb-3 px-3">
              <TemplateSelector value={templateKey} onChange={setTemplateKey} language={currentLanguage} />
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
                <div className="bg-white dark:bg-gray-800 shadow-sm rounded-lg p-4 sm:p-6 transition-colors duration-200">
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
                <div className="bg-white dark:bg-gray-800 shadow-sm rounded-lg p-4 sm:p-6 transition-colors duration-200">
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="text-lg font-medium dark:text-white">
                      {previewMode === 'preview' ? t.preview : t.atsAnalysis}
                    </h2>
                    <div className="flex items-center space-x-2">
                      <button
                        type="button"
                        className="px-2 py-1 text-sm bg-gray-100 dark:bg-gray-700 dark:text-gray-200 rounded hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
                        onClick={() => setShowSectionModal(true)}
                      >
                        {t.orderSections}
                      </button>
                    </div>
                    <div className="flex rounded-lg bg-gray-100 dark:bg-gray-700 p-1">
                      <button
                        onClick={() => setPreviewMode('preview')}
                        className={`px-3 py-1 text-sm font-medium rounded-md transition-colors ${previewMode === 'preview'
                          ? 'bg-white dark:bg-gray-600 text-gray-900 dark:text-white shadow-sm'
                          : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200'
                          }`}
                      >
                        {t.preview}
                      </button>
                      <button
                        onClick={() => setPreviewMode('analysis')}
                        className={`px-3 py-1 text-sm font-medium rounded-md transition-colors ${previewMode === 'analysis'
                          ? 'bg-white dark:bg-gray-600 text-gray-900 dark:text-white shadow-sm'
                          : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200'
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
                      <ResumePreview data={resumeData} language={currentLanguage} templateKey={templateKey} />
                      <SectionOrderModal
                        open={showSectionModal}
                        onClose={() => setShowSectionModal(false)}
                        title={t.orderSections}
                        order={(resumeData && resumeData.sectionOrder) || ['summary', 'skills', 'experience', 'education', 'languages', 'certifications']}
                        onChange={(order) => updateSectionOrder && updateSectionOrder(order as ResumeData['sectionOrder'])}
                        language={currentLanguage}
                        doneLabel={t.done}
                      />
                    </div>
                  ) : (
                    <div className="overflow-auto">
                      <ATSAnalysis resumeData={resumeData} language={currentLanguage} />
                    </div>
                  )}
                </div>
                <Button onClick={handleExportPDF}>
                  <SaveIcon className="w-4 h-4 mr-2" /> {t.exportPdf}
                </Button>
              </div>
            </div>
          </main>
          {/* Footer */}
          <footer className="bg-white dark:bg-gray-800 border-t dark:border-gray-700 mt-auto w-full transition-colors duration-200">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="py-4 text-center text-sm text-gray-500 dark:text-gray-400 space-y-2">
                <p>
                  © {new Date().getFullYear()} {t.title}. {t.allRightsReserved}
                </p>
                <p className="flex items-center justify-center space-x-2 flex-wrap">
                  <span>{t.madeBy}</span>
                  <a
                    href="https://gabolonhez.github.io/Portfolio/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 font-medium"
                  >
                    Gabriel Bolonhez
                  </a>
                </p>
              </div>
            </div>
          </footer>
        </div>
        <PdfImportModal
          open={showImportModal}
          onClose={() => setShowImportModal(false)}
          onImport={handleImportPdf}
        />
      </div>
    </ThemeProvider>
  );
};

export default App;