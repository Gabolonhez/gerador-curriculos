import { useState, useCallback } from 'react';
import { TabType } from '../types/resume';

const TAB_ORDER: TabType[] = [
  'informacoes-pessoais',
  'resumo-profissional',
  'experiencia-profissional',
  'formacao-academica',
  'habilidades-tecnicas',
  'idiomas',
  'certificacoes-cursos',
  'projetos'
];

export const TAB_CONFIG = [
  { id: 'informacoes-pessoais' as TabType, key: 'personalInfo' },
  { id: 'resumo-profissional' as TabType, key: 'summary' },
  { id: 'experiencia-profissional' as TabType, key: 'experience' },
  { id: 'formacao-academica' as TabType, key: 'education' },
  { id: 'habilidades-tecnicas' as TabType, key: 'skills' },
  { id: 'idiomas' as TabType, key: 'languages' },
  { id: 'certificacoes-cursos' as TabType, key: 'certifications' },
  { id: 'projetos' as TabType, key: 'projects' }
];

export const useTabNavigation = (initialTab: TabType = 'informacoes-pessoais') => {
  const [activeTab, setActiveTab] = useState<TabType>(initialTab);

  const handleNextPage = useCallback((): void => {
    const currentIndex = TAB_ORDER.indexOf(activeTab);
    if (currentIndex < TAB_ORDER.length - 1) {
      setActiveTab(TAB_ORDER[currentIndex + 1]);
    }
  }, [activeTab]);

  const handlePreviousPage = useCallback((): void => {
    const currentIndex = TAB_ORDER.indexOf(activeTab);
    if (currentIndex > 0) {
      setActiveTab(TAB_ORDER[currentIndex - 1]);
    }
  }, [activeTab]);

  const canGoNext = activeTab !== TAB_ORDER[TAB_ORDER.length - 1];
  const canGoPrevious = activeTab !== TAB_ORDER[0];

  return {
    activeTab,
    setActiveTab,
    handleNextPage,
    handlePreviousPage,
    canGoNext,
    canGoPrevious,
    tabOrder: TAB_ORDER
  };
};
