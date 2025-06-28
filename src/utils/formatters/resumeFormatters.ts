/**
 * Formatadores para melhorar compatibilidade com ATS
 */

export const formatPhoneNumber = (phone: string): string => {
  // Remove todos os caracteres não numéricos
  const cleaned = phone.replace(/\D/g, '');
  
  // Formata para padrão internacional (+55 11 99999-9999)
  if (cleaned.length === 11 && cleaned.startsWith('11')) {
    return `+55 ${cleaned.slice(0, 2)} ${cleaned.slice(2, 7)}-${cleaned.slice(7)}`;
  } else if (cleaned.length === 11) {
    return `+55 ${cleaned.slice(0, 2)} 9${cleaned.slice(2, 6)}-${cleaned.slice(6)}`;
  } else if (cleaned.length === 10) {
    return `+55 ${cleaned.slice(0, 2)} ${cleaned.slice(2, 6)}-${cleaned.slice(6)}`;
  }
  
  return phone; // Retorna original se não conseguir formatar
};

export const formatDate = (dateString: string, language: 'pt' | 'en' = 'pt'): string => {
  if (!dateString) return '';
  
  // Se o formato é YYYY-MM (input type="month"), precisamos ajustar
  if (dateString.match(/^\d{4}-\d{2}$/)) {
    const [year, month] = dateString.split('-');
    // Cria a data com o primeiro dia do mês para evitar problemas de timezone
    const date = new Date(parseInt(year), parseInt(month) - 1, 1);
    
    if (language === 'pt') {
      return date.toLocaleDateString('pt-BR', {
        year: 'numeric',
        month: 'long'
      });
    } else {
      return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long'
      });
    }
  }
  
  // Para outros formatos de data
  const date = new Date(dateString);
  
  if (language === 'pt') {
    return date.toLocaleDateString('pt-BR', {
      year: 'numeric',
      month: 'long'
    });
  } else {
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long'
    });
  }
};

export const formatDateRange = (
  startDate: string, 
  endDate: string, 
  current: boolean, 
  language: 'pt' | 'en' = 'pt'
): string => {
  const start = formatDate(startDate, language);
  
  if (current) {
    return `${start} - ${language === 'pt' ? 'Presente' : 'Present'}`;
  }
  
  const end = formatDate(endDate, language);
  return `${start} - ${end}`;
};

export const calculateDuration = (
  startDate: string, 
  endDate: string, 
  current: boolean,
  language: 'pt' | 'en' = 'pt'
): string => {
  const start = new Date(startDate);
  const end = current ? new Date() : new Date(endDate);
  
  const months = (end.getFullYear() - start.getFullYear()) * 12 + (end.getMonth() - start.getMonth());
  const years = Math.floor(months / 12);
  const remainingMonths = months % 12;
  
  if (language === 'pt') {
    if (years === 0) {
      return `${remainingMonths} ${remainingMonths === 1 ? 'mês' : 'meses'}`;
    } else if (remainingMonths === 0) {
      return `${years} ${years === 1 ? 'ano' : 'anos'}`;
    } else {
      return `${years} ${years === 1 ? 'ano' : 'anos'} e ${remainingMonths} ${remainingMonths === 1 ? 'mês' : 'meses'}`;
    }
  } else {
    if (years === 0) {
      return `${remainingMonths} ${remainingMonths === 1 ? 'month' : 'months'}`;
    } else if (remainingMonths === 0) {
      return `${years} ${years === 1 ? 'year' : 'years'}`;
    } else {
      return `${years} ${years === 1 ? 'year' : 'years'} and ${remainingMonths} ${remainingMonths === 1 ? 'month' : 'months'}`;
    }
  }
};

export const formatURL = (url: string): string => {
  if (!url) return '';
  
  // Remove protocolo para display mais limpo
  return url.replace(/^https?:\/\//, '');
};

export const formatLinkedInURL = (linkedin: string): string => {
  if (!linkedin) return '';
  
  // Se já é um URL completo, retorna formatado
  if (linkedin.startsWith('http')) {
    return linkedin;
  }
  
  // Se é apenas o username, constrói o URL
  if (!linkedin.includes('linkedin.com')) {
    const username = linkedin.replace('@', '');
    return `https://linkedin.com/in/${username}`;
  }
  
  // Se tem linkedin.com mas sem protocolo
  if (!linkedin.startsWith('http')) {
    return `https://${linkedin}`;
  }
  
  return linkedin;
};

export const formatGitHubURL = (github: string): string => {
  if (!github) return '';
  
  // Se já é um URL completo, retorna formatado
  if (github.startsWith('http')) {
    return github;
  }
  
  // Se é apenas o username, constrói o URL
  if (!github.includes('github.com')) {
    const username = github.replace('@', '');
    return `https://github.com/${username}`;
  }
  
  // Se tem github.com mas sem protocolo
  if (!github.startsWith('http')) {
    return `https://${github}`;
  }
  
  return github;
};
