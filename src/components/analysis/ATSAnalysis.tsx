import React from 'react';
import { CheckCircle, AlertTriangle, XCircle, TrendingUp } from 'lucide-react';
import { useATSAnalysis } from '../../hooks/useATSAnalysis';
import { ResumeData } from '../../types/resume';
import { LanguageCode } from '../../translations/formTranslations';

interface ATSAnalysisProps {
  resumeData: ResumeData;
  language: LanguageCode;
}

const ATSAnalysis: React.FC<ATSAnalysisProps> = ({ resumeData, language }) => {
  const analysis = useATSAnalysis(resumeData, language);

  const getScoreColor = (percentage: number) => {
    if (percentage >= 80) return 'text-green-600 dark:text-green-400';
    if (percentage >= 60) return 'text-yellow-600 dark:text-yellow-400';
    return 'text-red-600 dark:text-red-400';
  };

  const getScoreBackgroundColor = (percentage: number) => {
    if (percentage >= 80) return 'bg-green-100 dark:bg-green-900/30';
    if (percentage >= 60) return 'bg-yellow-100 dark:bg-yellow-900/30';
    return 'bg-red-100 dark:bg-red-900/30';
  };

  const getStatusIcon = (status: 'good' | 'warning' | 'error') => {
    switch (status) {
      case 'good':
        return <CheckCircle className="w-4 h-4 text-green-600" />;
      case 'warning':
        return <AlertTriangle className="w-4 h-4 text-yellow-600" />;
      case 'error':
        return <XCircle className="w-4 h-4 text-red-600" />;
    }
  };

  const translations = {
    pt: {
      title: 'Análise ATS',
      subtitle: 'Compatibilidade com Sistemas de Rastreamento de Candidatos',
      infoText: 'Preencha informações completas e precisas. Sistemas ATS analisam cada campo para ranquear seu currículo.',
      score: 'Pontuação ATS',
      feedback: 'Feedback Detalhado',
      recommendations: 'Recomendações',
      excellent: 'Excelente',
      good: 'Bom',
      needsImprovement: 'Precisa Melhorar',
      points: 'pontos'
    },
    en: {
      title: 'ATS Analysis',
      subtitle: 'Applicant Tracking System Compatibility',
      infoText: 'Fill in complete and accurate information. ATS systems analyze each field to rank your resume.',
      score: 'ATS Score',
      feedback: 'Detailed Feedback',
      recommendations: 'Recommendations',
      excellent: 'Excellent',
      good: 'Good',
      needsImprovement: 'Needs Improvement',
      points: 'points'
    }
    ,
    es: {
      title: 'Análisis ATS',
      subtitle: 'Compatibilidad con Sistemas de Seguimiento de Candidatos',
      infoText: 'Rellena información completa y precisa. Los sistemas ATS analizan cada campo para clasificar tu CV.',
      score: 'Puntuación ATS',
      feedback: 'Comentarios Detallados',
      recommendations: 'Recomendaciones',
      excellent: 'Excelente',
      good: 'Bueno',
      needsImprovement: 'Necesita Mejorar',
      points: 'puntos'
    }
  };

  const t = translations[language as keyof typeof translations];

  const getScoreDescription = (percentage: number) => {
    if (percentage >= 80) return t.excellent;
    if (percentage >= 60) return t.good;
    return t.needsImprovement;
  };

  return (
    <div className="ats-analysis bg-white dark:bg-gray-800 rounded-lg shadow-sm border dark:border-gray-700 p-6 space-y-6">
      {/* Header */}
      <div className="text-center">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white flex items-center justify-center gap-2">
          <TrendingUp className="w-5 h-5" />
          {t.title}
        </h3>
        <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">{t.subtitle}</p>
      </div>

      {/* Info Text */}
      <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
        <p className="text-sm text-blue-700 dark:text-blue-300">
          💡 {t.infoText}
        </p>
      </div>

      {/* Score Display */}
      <div className="text-center">
        <div className={`inline-flex items-center justify-center w-24 h-24 rounded-full ${getScoreBackgroundColor(analysis.percentage)} mb-3`}>
          <span className={`text-2xl font-bold ${getScoreColor(analysis.percentage)}`}>
            {analysis.percentage}%
          </span>
        </div>
        <div className="space-y-1">
          <p className={`font-medium ${getScoreColor(analysis.percentage)}`}>
            {getScoreDescription(analysis.percentage)}
          </p>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            {analysis.score}/{analysis.maxScore} {t.points}
          </p>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3">
        <div
          className={`h-3 rounded-full transition-all duration-300 ${analysis.percentage >= 80 ? 'bg-green-600' :
              analysis.percentage >= 60 ? 'bg-yellow-600' : 'bg-red-600'
            }`}
          style={{ width: `${analysis.percentage}%` }}
        />
      </div>

      {/* Detailed Feedback */}
      <div>
        <h4 className="font-medium text-gray-900 dark:text-white mb-3">{t.feedback}</h4>
        <div className="space-y-2">
          {analysis.feedback.map((item, index) => (
            <div key={index} className="flex items-start gap-3 p-3 rounded-lg bg-gray-50 dark:bg-gray-700/50">
              {getStatusIcon(item.status)}
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-medium text-gray-900 dark:text-white">{item.section}</p>
                  <span className="text-xs text-gray-500 dark:text-gray-400">+{item.points} {t.points}</span>
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">{item.message}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Recommendations */}
      {analysis.recommendations.length > 0 && (
        <div>
          <h4 className="font-medium text-gray-900 dark:text-white mb-3">{t.recommendations}</h4>
          <div className="space-y-2">
            {analysis.recommendations.map((recommendation, index) => (
              <div key={index} className="flex items-start gap-2 text-sm text-gray-600 dark:text-gray-300">
                <span className="text-blue-600 mt-1">•</span>
                <span>{recommendation}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ATSAnalysis;
