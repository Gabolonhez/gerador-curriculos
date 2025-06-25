/**
 * Validadores para garantir compatibilidade com ATS
 */

export const validateEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const validatePhone = (phone: string): boolean => {
  // Remove caracteres não numéricos
  const cleaned = phone.replace(/\D/g, '');
  
  // Aceita formatos brasileiros (10 ou 11 dígitos)
  return cleaned.length >= 10 && cleaned.length <= 11;
};

export const validateURL = (url: string): boolean => {
  if (!url) return true; // URL é opcional
  
  try {
    new URL(url.startsWith('http') ? url : `https://${url}`);
    return true;
  } catch {
    return false;
  }
};

export const validateLinkedIn = (linkedin: string): boolean => {
  if (!linkedin) return true; // LinkedIn é opcional
  
  // Aceita vários formatos:
  // - linkedin.com/in/username
  // - www.linkedin.com/in/username
  // - https://linkedin.com/in/username
  // - username (será convertido automaticamente)
  
  const linkedinRegex = /^(https?:\/\/)?(www\.)?linkedin\.com\/in\/[\w-]+\/?$/;
  const usernameRegex = /^[\w-]+$/;
  
  return linkedinRegex.test(linkedin) || usernameRegex.test(linkedin);
};

export const validateGitHub = (github: string): boolean => {
  if (!github) return true; // GitHub é opcional
  
  // Aceita vários formatos:
  // - github.com/username
  // - www.github.com/username
  // - https://github.com/username
  // - username (será convertido automaticamente)
  
  const githubRegex = /^(https?:\/\/)?(www\.)?github\.com\/[\w-]+\/?$/;
  const usernameRegex = /^[\w-]+$/;
  
  return githubRegex.test(github) || usernameRegex.test(github);
};

export const validateRequiredField = (value: string): boolean => {
  return value.trim().length > 0;
};

export const validateTextLength = (text: string, maxLength: number): boolean => {
  return text.length <= maxLength;
};

export const validateDateRange = (startDate: string, endDate: string, current: boolean): boolean => {
  if (!startDate) return false;
  if (!current && !endDate) return false;
  
  const start = new Date(startDate);
  const end = current ? new Date() : new Date(endDate);
  
  return start <= end;
};

// Valida se o texto contém palavras-chave relevantes para ATS
export const validateATSKeywords = (text: string, keywords: string[]): number => {
  const lowerText = text.toLowerCase();
  const foundKeywords = keywords.filter(keyword => 
    lowerText.includes(keyword.toLowerCase())
  );
  
  return foundKeywords.length;
};

// Valida comprimento ideal para descrições (ATS-friendly)
export const validateDescriptionLength = (description: string): {
  isValid: boolean;
  message: string;
  score: 'good' | 'fair' | 'poor';
} => {
  const length = description.trim().length;
  
  if (length === 0) {
    return {
      isValid: false,
      message: 'Descrição é obrigatória',
      score: 'poor'
    };
  }
  
  if (length < 50) {
    return {
      isValid: true,
      message: 'Descrição muito curta. Adicione mais detalhes.',
      score: 'poor'
    };
  }
  
  if (length > 500) {
    return {
      isValid: true,
      message: 'Descrição muito longa. ATS podem truncar.',
      score: 'fair'
    };
  }
  
  return {
    isValid: true,
    message: 'Comprimento ideal para ATS',
    score: 'good'
  };
};
