import { useState, useCallback, useEffect } from 'react';
import { ResumeData } from '../types/resume';

const STORAGE_KEY = 'resume-generator-data';

const initialResumeData: ResumeData = {
  personal: {
    name: '',
    email: '',
    phone: '',
    address: '',
  portfolio: '',
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

// Função para carregar dados do localStorage
const loadDataFromStorage = (): ResumeData => {
  try {
    const storedData = localStorage.getItem(STORAGE_KEY);
    if (storedData) {
      const parsedData = JSON.parse(storedData);
      // Verificar se os dados têm a estrutura correta
      if (parsedData && typeof parsedData === 'object') {
        // Mesclar com dados iniciais para garantir que todas as propriedades existam
        return {
          personal: { ...initialResumeData.personal, ...parsedData.personal },
          summary: parsedData.summary || '',
          experience: Array.isArray(parsedData.experience) ? parsedData.experience : [],
          education: Array.isArray(parsedData.education) ? parsedData.education : [],
          skills: Array.isArray(parsedData.skills) ? parsedData.skills : [],
          languages: Array.isArray(parsedData.languages) ? parsedData.languages : [],
          certifications: Array.isArray(parsedData.certifications) ? parsedData.certifications : []
        };
      }
    }
  } catch (error) {
    console.warn('Erro ao carregar dados do localStorage:', error);
  }
  return initialResumeData;
};

// Função para salvar dados no localStorage
const saveDataToStorage = (data: ResumeData): void => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  } catch (error) {
    console.warn('Erro ao salvar dados no localStorage:', error);
  }
};

export const useResumeData = () => {
  const [resumeData, setResumeData] = useState<ResumeData>(initialResumeData);

  // Carregar dados do localStorage ao inicializar
  useEffect(() => {
    const savedData = loadDataFromStorage();
    setResumeData(savedData);
  }, []);

  const updateResumeData = useCallback(<T extends keyof ResumeData>(
    section: T, 
    data: ResumeData[T]
  ): void => {
    setResumeData(prev => {
      const newData = {
        ...prev,
        [section]: data
      };
      // Salvar automaticamente no localStorage
      saveDataToStorage(newData);
      return newData;
    });
  }, []);

  const resetResumeData = useCallback(() => {
    setResumeData(initialResumeData);
    // Limpar dados do localStorage
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch (error) {
      console.warn('Erro ao limpar dados do localStorage:', error);
    }
  }, []);

  // Função para exportar dados (útil para backup)
  const exportData = useCallback((): string => {
    return JSON.stringify(resumeData, null, 2);
  }, [resumeData]);

  // Função para importar dados (útil para restaurar backup)
  const importData = useCallback((jsonData: string): boolean => {
    try {
      const parsedData = JSON.parse(jsonData);
      if (parsedData && typeof parsedData === 'object') {
        setResumeData(parsedData);
        saveDataToStorage(parsedData);
        return true;
      }
      return false;
    } catch (error) {
      console.warn('Erro ao importar dados:', error);
      return false;
    }
  }, []);

  return {
    resumeData,
    updateResumeData,
    resetResumeData,
    exportData,
    importData
  };
};
