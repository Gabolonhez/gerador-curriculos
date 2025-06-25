import { useState, useCallback } from 'react';
import { LanguageCode } from '../translations/formTranslations';

export const useLanguage = (initialLanguage: LanguageCode = 'pt') => {
  const [currentLanguage, setCurrentLanguage] = useState<LanguageCode>(initialLanguage);

  const toggleLanguage = useCallback(() => {
    setCurrentLanguage(prev => prev === 'pt' ? 'en' : 'pt');
  }, []);

  const setLanguage = useCallback((language: LanguageCode) => {
    setCurrentLanguage(language);
  }, []);

  return {
    currentLanguage,
    setLanguage,
    toggleLanguage
  };
};
