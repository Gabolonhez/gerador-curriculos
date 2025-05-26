import React from 'react';
import { PhoneIcon, MailIcon, MapPinIcon, GlobeIcon } from 'lucide-react';
import { LanguageCode } from '../translations/formTranslations';
import { ResumeData } from '../types/resume';

interface ResumePreviewProps {
  data: ResumeData;
  language: LanguageCode;
}

const translations = {
  pt: {
    professionalSummary: 'Resumo Profissional',
    workExperience: 'Experiência Profissional',
    education: 'Formação Acadêmica',
    technicalSkills: 'Habilidades Técnicas',
    languages: 'Idiomas',
    certifications: 'Certificações e Cursos',
    present: 'Presente',
    inProgress: 'Em andamento',
    skillLevels: {
      basic: 'Básico',
      intermediate: 'Intermediário',
      advanced: 'Avançado'
    },
    proficiencyLevels: {
      basic: 'Básico',
      intermediate: 'Intermediário',
      advanced: 'Avançado',
      fluent: 'Fluente',
      native: 'Nativo'
    }
  },
  en: {
    professionalSummary: 'Professional Summary',
    workExperience: 'Work Experience',
    education: 'Education',
    technicalSkills: 'Technical Skills',
    languages: 'Languages',
    certifications: 'Certifications and Courses',
    present: 'Present',
    inProgress: 'In Progress',
    skillLevels: {
      basic: 'Basic',
      intermediate: 'Intermediate',
      advanced: 'Advanced'
    },
    proficiencyLevels: {
      basic: 'Basic',
      intermediate: 'Intermediate',
      advanced: 'Advanced',
      fluent: 'Fluent',
      native: 'Native'
    }
  }
};

const ResumePreview: React.FC<ResumePreviewProps> = ({ data, language }) => {
  const {
    personal,
    summary,
    experience,
    education,
    skills,
    languages: languageSkills,
    certifications
  } = data;

  const t = translations[language];

  const formatDate = (dateString: string) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString(language === 'pt' ? 'pt-BR' : 'en-US', {
      year: 'numeric',
      month: 'long'
    });
  };

  const getSkillLevel = (level: string) => {
    return t.skillLevels[level as keyof typeof t.skillLevels] || level;
  };

  const getLanguageLevel = (level: string) => {
    return t.proficiencyLevels[level as keyof typeof t.proficiencyLevels] || level;
  };

  return (
    <div className="p-4 sm:p-6">
      {/* Header / Personal Info */}
      <div className="mb-6">
        <h1 className="text-xl sm:text-2xl font-bold mb-4">{personal.name || 'Seu Nome'}</h1>
        <div className="flex flex-wrap gap-2 sm:gap-4 text-sm">
          {personal.phone && (
            <div className="flex items-center gap-1 sm:gap-2">
              <PhoneIcon className="h-4 w-4 sm:h-5 sm:w-5 text-gray-400 flex-shrink-0" />
              <span className="break-all">{personal.phone}</span>
            </div>
          )}
          {personal.email && (
            <div className="flex items-center gap-1 sm:gap-2">
              <MailIcon className="h-4 w-4 sm:h-5 sm:w-5 text-gray-400 flex-shrink-0" />
              <span className="break-all">{personal.email}</span>
            </div>
          )}
          {personal.address && (
            <div className="flex items-center gap-1 sm:gap-2">
              <MapPinIcon className="h-4 w-4 sm:h-5 sm:w-5 text-gray-400 flex-shrink-0" />
              <span className="break-all">{personal.address}</span>
            </div>
          )}
          {personal.website && (
            <div className="flex items-center gap-1 sm:gap-2">
              <GlobeIcon className="h-4 w-4 sm:h-5 sm:w-5 text-gray-400 flex-shrink-0" />
              <span className="break-all">{personal.website}</span>
            </div>
          )}
        </div>
        {(personal.linkedin || personal.github) && (
          <div className="flex flex-wrap gap-2 sm:gap-4 mt-2 text-sm">
            {personal.linkedin && (
              <div className="flex items-center gap-1 sm:gap-2">
                <span className="font-medium">LinkedIn:</span>
                <span className="break-all">{personal.linkedin}</span>
              </div>
            )}
            {personal.github && (
              <div className="flex items-center gap-1 sm:gap-2">
                <span className="font-medium">GitHub:</span>
                <span className="break-all">{personal.github}</span>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Professional Summary */}
      {summary && (
        <div className="mb-6">
          <h2 className="text-lg sm:text-xl font-medium mb-2">{t.professionalSummary}</h2>
          <p className="text-sm sm:text-base text-gray-700 whitespace-pre-wrap break-words">{summary}</p>
        </div>
      )}

      {/* Experience */}
      {experience && experience.length > 0 && (
        <div className="mb-6">
          <h2 className="text-lg sm:text-xl font-medium mb-4">{t.workExperience}</h2>
          <div className="space-y-4">
            {experience.map((exp) => (
              <div key={exp.id}>
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center">
                  <div>
                    <h3 className="text-base sm:text-lg font-medium">{exp.position}</h3>
                    <div className="text-sm text-gray-600">{exp.company}</div>
                  </div>
                  <div className="text-sm text-gray-500 mt-1 sm:mt-0">
                    {formatDate(exp.startDate)} -{' '}
                    {exp.current ? t.present : formatDate(exp.endDate)}
                  </div>
                </div>
                {exp.description && (
                  <p className="mt-2 text-sm sm:text-base text-gray-700">{exp.description}</p>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Education */}
      {education && education.length > 0 && (
        <div className="mb-6">
          <h2 className="text-lg sm:text-xl font-medium mb-4">{t.education}</h2>
          <div className="space-y-4">
            {education.map((edu) => (
              <div key={edu.id}>
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center">
                  <div>
                    <h3 className="text-base sm:text-lg font-medium">
                      {edu.degree} {edu.field && `em ${edu.field}`}
                    </h3>
                    <div className="text-sm text-gray-600">{edu.institution}</div>
                  </div>
                  <div className="text-sm text-gray-500 mt-1 sm:mt-0">
                    {formatDate(edu.startDate)} -{' '}
                    {edu.current ? t.inProgress : formatDate(edu.endDate)}
                  </div>
                </div>
                {edu.description && (
                  <p className="mt-2 text-sm sm:text-base text-gray-700">{edu.description}</p>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Skills */}
      {skills && skills.length > 0 && (
        <div className="mb-6">
          <h2 className="text-lg sm:text-xl font-medium mb-4">{t.technicalSkills}</h2>
          <div className="flex flex-wrap gap-2">
            {skills.map((skill) => (
              <div
                key={skill.id}
                className="bg-gray-100 px-3 py-1 rounded-full text-sm"
              >
                {skill.name} ({getSkillLevel(skill.level)})
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Languages */}
      {languageSkills && languageSkills.length > 0 && (
        <div className="mb-6">
          <h2 className="text-lg sm:text-xl font-medium mb-4">{t.languages}</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {languageSkills.map((lang) => (
              <div key={lang.id} className="text-sm sm:text-base">
                <span className="font-medium">{lang.name}:</span> {getLanguageLevel(lang.level)}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Certifications */}
      {certifications && certifications.length > 0 && (
        <div className="mb-6">
          <h2 className="text-lg sm:text-xl font-medium mb-4">{t.certifications}</h2>
          <div className="space-y-4">
            {certifications.map((cert) => (
              <div key={cert.id}>
                <h3 className="text-base sm:text-lg font-medium">{cert.name}</h3>
                <div className="text-sm text-gray-600">
                  {cert.issuer} • {formatDate(cert.date)}
                </div>
                {cert.description && (
                  <p className="mt-2 text-sm sm:text-base text-gray-700">{cert.description}</p>
                )}
                {cert.url && (
                  <a
                    href={cert.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:underline text-sm mt-1 block break-all"
                  >
                    Ver certificado
                  </a>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ResumePreview;