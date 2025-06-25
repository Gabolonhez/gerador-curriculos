import { useState, useCallback } from 'react';
import { ResumeData } from '../types/resume';

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

export const useResumeData = () => {
  const [resumeData, setResumeData] = useState<ResumeData>(initialResumeData);

  const updateResumeData = useCallback(<T extends keyof ResumeData>(
    section: T, 
    data: ResumeData[T]
  ): void => {
    setResumeData(prev => ({
      ...prev,
      [section]: data
    }));
  }, []);

  const resetResumeData = useCallback(() => {
    setResumeData(initialResumeData);
  }, []);

  return {
    resumeData,
    updateResumeData,
    resetResumeData
  };
};
