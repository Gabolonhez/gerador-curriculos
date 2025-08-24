import { useMemo } from 'react';
import { ResumeData } from '../types/resume';
import { 
  validateEmail, 
  validatePhone, 
  validateLinkedIn, 
  validateGitHub,
  validateDescriptionLength,
  validateATSKeywords
} from '../utils/validators/resumeValidators';

interface ATSScore {
  score: number;
  maxScore: number;
  percentage: number;
  feedback: ATSFeedback[];
  recommendations: string[];
}

interface ATSFeedback {
  section: string;
  status: 'good' | 'warning' | 'error';
  message: string;
  points: number;
}

const COMMON_ATS_KEYWORDS = [
  // Tecnologia
  'javascript', 'typescript', 'react', 'node.js', 'python', 'java', 'sql',
  'html', 'css', 'git', 'docker', 'kubernetes', 'aws', 'azure',
  // Soft Skills
  'liderança', 'comunicação', 'trabalho em equipe', 'resolução de problemas',
  'leadership', 'communication', 'teamwork', 'problem solving',
  // Metodologias
  'agile', 'scrum', 'kanban', 'devops', 'ci/cd',
  // Experiência
  'gerenciamento', 'desenvolvimento', 'implementação', 'otimização',
  'management', 'development', 'implementation', 'optimization'
];

export const useATSAnalysis = (resumeData: ResumeData, language: 'pt' | 'en' | 'es' = 'pt') => {
  const analysis = useMemo((): ATSScore => {
    const feedback: ATSFeedback[] = [];
    let score = 0;
    const maxScore = 100;

    // Análise de Informações Pessoais (20 pontos)
    const personalScore = analyzePersonalInfo(resumeData.personal, feedback, language);
    score += personalScore;

    // Análise de Resumo Profissional (15 pontos)
    const summaryScore = analyzeSummary(resumeData.summary, feedback, language);
    score += summaryScore;

    // Análise de Experiência (25 pontos)
    const experienceScore = analyzeExperience(resumeData.experience, feedback, language);
    score += experienceScore;

    // Análise de Educação (15 pontos)
    const educationScore = analyzeEducation(resumeData.education, feedback, language);
    score += educationScore;

    // Análise de Habilidades (15 pontos)
    const skillsScore = analyzeSkills(resumeData.skills, feedback, language);
    score += skillsScore;

    // Análise de Palavras-chave ATS (10 pontos)
    const keywordScore = analyzeKeywords(resumeData, feedback, language);
    score += keywordScore;

    const percentage = Math.round((score / maxScore) * 100);

    const recommendations = generateRecommendations(feedback, language);

    return {
      score,
      maxScore,
      percentage,
      feedback,
      recommendations
    };
  }, [resumeData, language]);

  return analysis;
};

const analyzePersonalInfo = (personal: ResumeData['personal'], feedback: ATSFeedback[], language: 'pt' | 'en' | 'es'): number => {
  let score = 0;

  // Nome (obrigatório) - 5 pontos
  if (personal.name && personal.name.trim().length > 0) {
    score += 5;
    feedback.push({
  section: language === 'pt' ? 'Informações Pessoais' : language === 'es' ? 'Información Personal' : 'Personal Information',
  status: 'good',
  message: language === 'pt' ? 'Nome presente' : language === 'es' ? 'Nombre proporcionado' : 'Name provided',
      points: 5
    });
  } else {
    feedback.push({
  section: language === 'pt' ? 'Informações Pessoais' : language === 'es' ? 'Información Personal' : 'Personal Information',
  status: 'error',
  message: language === 'pt' ? 'Nome é obrigatório' : language === 'es' ? 'El nombre es obligatorio' : 'Name is required',
      points: 0
    });
  }

  // Email (obrigatório) - 5 pontos
  if (personal.email && validateEmail(personal.email)) {
    score += 5;
    feedback.push({
  section: language === 'pt' ? 'Informações Pessoais' : language === 'es' ? 'Información Personal' : 'Personal Information',
  status: 'good',
  message: language === 'pt' ? 'Email válido' : language === 'es' ? 'Correo válido' : 'Valid email',
      points: 5
    });
  } else {
    feedback.push({
  section: language === 'pt' ? 'Informações Pessoais' : language === 'es' ? 'Información Personal' : 'Personal Information',
  status: 'error',
  message: language === 'pt' ? 'Email válido é obrigatório' : language === 'es' ? 'Se requiere un correo válido' : 'Valid email is required',
      points: 0
    });
  }

  // Telefone (obrigatório) - 5 pontos
  if (personal.phone && validatePhone(personal.phone)) {
    score += 5;
    feedback.push({
  section: language === 'pt' ? 'Informações Pessoais' : language === 'es' ? 'Información Personal' : 'Personal Information',
  status: 'good',
  message: language === 'pt' ? 'Telefone válido' : language === 'es' ? 'Teléfono válido' : 'Valid phone',
      points: 5
    });
  } else {
    feedback.push({
  section: language === 'pt' ? 'Informações Pessoais' : language === 'es' ? 'Información Personal' : 'Personal Information',
  status: 'error',
  message: language === 'pt' ? 'Telefone válido é obrigatório' : language === 'es' ? 'Se requiere un teléfono válido' : 'Valid phone is required',
      points: 0
    });
  }

  // LinkedIn (opcional) - 3 pontos
  if (personal.linkedin && validateLinkedIn(personal.linkedin)) {
    score += 3;
    feedback.push({
    section: language === 'pt' ? 'Informações Pessoais' : language === 'es' ? 'Información Personal' : 'Personal Information',
    status: 'good',
    message: language === 'pt' ? 'LinkedIn presente' : language === 'es' ? 'LinkedIn proporcionado' : 'LinkedIn provided',
      points: 3
    });
  }

  // GitHub (opcional) - 2 pontos
  if (personal.github && validateGitHub(personal.github)) {
    score += 2;
    feedback.push({
    section: language === 'pt' ? 'Informações Pessoais' : language === 'es' ? 'Información Personal' : 'Personal Information',
    status: 'good',
    message: language === 'pt' ? 'GitHub presente' : language === 'es' ? 'GitHub proporcionado' : 'GitHub provided',
      points: 2
    });
  }

  return score;
};

const analyzeSummary = (summary: string, feedback: ATSFeedback[], language: 'pt' | 'en' | 'es'): number => {
  let score = 0;

  if (!summary || summary.trim().length === 0) {
    feedback.push({
      section: language === 'pt' ? 'Resumo Profissional' : language === 'es' ? 'Resumen Profesional' : 'Professional Summary',
      status: 'error',
      message: language === 'pt' ? 'Resumo profissional é obrigatório' : language === 'es' ? 'Resumen profesional es obligatorio' : 'Professional summary is required',
      points: 0
    });
    return 0;
  }

  const validation = validateDescriptionLength(summary);
  
    if (validation.score === 'good') {
    score += 15;
    feedback.push({
      section: language === 'pt' ? 'Resumo Profissional' : language === 'es' ? 'Resumen Profesional' : 'Professional Summary',
      status: 'good',
      message: validation.message,
      points: 15
    });
    } else if (validation.score === 'fair') {
    score += 10;
    feedback.push({
      section: language === 'pt' ? 'Resumo Profissional' : language === 'es' ? 'Resumen Profesional' : 'Professional Summary',
      status: 'warning',
      message: validation.message,
      points: 10
    });
  } else {
    score += 5;
    feedback.push({
      section: language === 'pt' ? 'Resumo Profissional' : 'Professional Summary',
      status: 'warning',
      message: validation.message,
      points: 5
    });
  }

  return score;
};

const analyzeExperience = (experience: ResumeData['experience'], feedback: ATSFeedback[], language: 'pt' | 'en' | 'es'): number => {
  let score = 0;

  if (!experience || experience.length === 0) {
    feedback.push({
      section: language === 'pt' ? 'Experiência Profissional' : 'Work Experience',
      status: 'error',
      message: language === 'pt' ? 'Pelo menos uma experiência é obrigatória' : 'At least one work experience is required',
      points: 0
    });
    return 0;
  }

  // Pontuação base por ter experiências
  score += 10;

  // Analisa qualidade das descrições
  const descriptionsScore = experience.reduce((acc, exp) => {
    if (exp.description && exp.description.trim().length > 50) {
      return acc + 3;
    }
    return acc;
  }, 0);

  score += Math.min(descriptionsScore, 15); // Máximo 15 pontos para descrições

  feedback.push({
    section: language === 'pt' ? 'Experiência Profissional' : language === 'es' ? 'Experiencia Laboral' : 'Work Experience',
    status: score >= 20 ? 'good' : 'warning',
    message: language === 'pt' 
      ? `${experience.length} experiência(s) adicionada(s)` 
      : language === 'es' ? `${experience.length} experiencia(s) agregada(s)` : `${experience.length} work experience(s) added`,
    points: score
  });

  return score;
};

const analyzeEducation = (education: ResumeData['education'], feedback: ATSFeedback[], language: 'pt' | 'en' | 'es'): number => {
  let score = 0;

  if (!education || education.length === 0) {
    feedback.push({
      section: language === 'pt' ? 'Formação Acadêmica' : language === 'es' ? 'Formación Académica' : 'Education',
      status: 'warning',
      message: language === 'pt' ? 'Recomendado adicionar formação acadêmica' : language === 'es' ? 'Se recomienda agregar formación académica' : 'Recommended to add education',
      points: 0
    });
    return 0;
  }

  score += Math.min(education.length * 7, 15); // 7 pontos por educação, máximo 15

  feedback.push({
    section: language === 'pt' ? 'Formação Acadêmica' : language === 'es' ? 'Formación Académica' : 'Education',
    status: 'good',
    message: language === 'pt' 
      ? `${education.length} formação(ões) adicionada(s)` 
      : language === 'es' ? `${education.length} formación(es) agregada(s)` : `${education.length} education(s) added`,
    points: score
  });

  return score;
};

const analyzeSkills = (skills: ResumeData['skills'], feedback: ATSFeedback[], language: 'pt' | 'en' | 'es'): number => {
  let score = 0;

  if (!skills || skills.length === 0) {
    feedback.push({
      section: language === 'pt' ? 'Habilidades' : language === 'es' ? 'Habilidades' : 'Skills',
      status: 'error',
      message: language === 'pt' ? 'Habilidades são obrigatórias para ATS' : language === 'es' ? 'Las habilidades son obligatorias para ATS' : 'Skills are required for ATS',
      points: 0
    });
    return 0;
  }

  if (skills.length >= 5) {
    score += 15;
    feedback.push({
      section: language === 'pt' ? 'Habilidades' : language === 'es' ? 'Habilidades' : 'Skills',
      status: 'good',
      message: language === 'pt' ? 'Boa quantidade de habilidades' : language === 'es' ? 'Buena cantidad de habilidades' : 'Good amount of skills',
      points: 15
    });
  } else {
    score += skills.length * 3;
    feedback.push({
      section: language === 'pt' ? 'Habilidades' : language === 'es' ? 'Habilidades' : 'Skills',
      status: 'warning',
      message: language === 'pt' ? 'Adicione mais habilidades (mín. 5)' : language === 'es' ? 'Agrega más habilidades (mín. 5)' : 'Add more skills (min. 5)',
      points: score
    });
  }

  return score;
};

const analyzeKeywords = (resumeData: ResumeData, feedback: ATSFeedback[], language: 'pt' | 'en' | 'es'): number => {
  let score = 0;

  // Combina todo o texto do currículo
  const allText = [
    resumeData.summary,
    ...resumeData.experience.map(exp => `${exp.position} ${exp.company} ${exp.description}`),
    ...resumeData.skills.map(skill => skill.name),
    ...resumeData.education.map(edu => `${edu.degree} ${edu.field} ${edu.description}`)
  ].join(' ');

  const keywordCount = validateATSKeywords(allText, COMMON_ATS_KEYWORDS);

  if (keywordCount >= 10) {
    score += 10;
    feedback.push({
      section: language === 'pt' ? 'Palavras-chave ATS' : language === 'es' ? 'Palabras clave ATS' : 'ATS Keywords',
      status: 'good',
      message: language === 'pt' 
        ? `Excelente! ${keywordCount} palavras-chave encontradas` 
        : language === 'es' ? `¡Excelente! ${keywordCount} palabras clave encontradas` : `Excellent! ${keywordCount} keywords found`,
      points: 10
    });
  } else if (keywordCount >= 5) {
    score += 7;
    feedback.push({
      section: language === 'pt' ? 'Palavras-chave ATS' : language === 'es' ? 'Palabras clave ATS' : 'ATS Keywords',
      status: 'warning',
      message: language === 'pt' 
        ? `Bom! ${keywordCount} palavras-chave encontradas` 
        : language === 'es' ? `¡Bien! ${keywordCount} palabras clave encontradas` : `Good! ${keywordCount} keywords found`,
      points: 7
    });
  } else {
    score += 3;
    feedback.push({
      section: language === 'pt' ? 'Palavras-chave ATS' : language === 'es' ? 'Palabras clave ATS' : 'ATS Keywords',
      status: 'warning',
      message: language === 'pt' 
        ? `Poucas palavras-chave (${keywordCount}). Adicione mais termos técnicos` 
        : language === 'es' ? `Pocas palabras clave (${keywordCount}). Añade más términos técnicos` : `Few keywords (${keywordCount}). Add more technical terms`,
      points: 3
    });
  }

  return score;
};

const generateRecommendations = (feedback: ATSFeedback[], language: 'pt' | 'en' | 'es'): string[] => {
  const recommendations: string[] = [];
  
  const errorItems = feedback.filter(item => item.status === 'error');
  const warningItems = feedback.filter(item => item.status === 'warning');

  if (language === 'pt') {
    if (errorItems.length > 0) {
      recommendations.push('Corrija os erros críticos primeiro para melhorar a compatibilidade com ATS');
    }
    if (warningItems.length > 0) {
      recommendations.push('Considere as melhorias sugeridas para otimizar ainda mais seu currículo');
    }
    recommendations.push('Use palavras-chave relevantes para sua área de atuação');
    recommendations.push('Mantenha formatação simples e evite elementos gráficos complexos');
    recommendations.push('Use fontes padrão como Arial ou Helvetica');
    recommendations.push('Salve sempre em formato PDF para preservar a formatação');
  } else if (language === 'es') {
    if (errorItems.length > 0) {
      recommendations.push('Corrige los errores críticos primero para mejorar la compatibilidad con ATS');
    }
    if (warningItems.length > 0) {
      recommendations.push('Considera las mejoras sugeridas para optimizar aún más tu CV');
    }
    recommendations.push('Usa palabras clave relevantes para tu campo');
    recommendations.push('Mantén un formato sencillo y evita gráficos complejos');
    recommendations.push('Usa fuentes estándar como Arial o Helvetica');
    recommendations.push('Guarda siempre en formato PDF para preservar el formato');
  } else {
    if (errorItems.length > 0) {
      recommendations.push('Fix critical errors first to improve ATS compatibility');
    }
    if (warningItems.length > 0) {
      recommendations.push('Consider suggested improvements to further optimize your resume');
    }
    recommendations.push('Use relevant keywords for your field');
    recommendations.push('Keep simple formatting and avoid complex graphics');
    recommendations.push('Use standard fonts like Arial or Helvetica');
    recommendations.push('Always save as PDF to preserve formatting');
  }

  return recommendations;
};
