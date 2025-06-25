import { useState, useCallback } from 'react';
import { TabType } from '../types/resume';

const TAB_ORDER: TabType[] = [
  'informacoes-pessoais',
  'resumo-profissional',
  'experiencia-profissional',
  'formacao-academica',
  'habilidades-tecnicas',
  'idiomas',
  'certificacoes-cursos'
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
