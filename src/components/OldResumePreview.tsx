import React from 'react';
import { LanguageCode } from '../translations/formTranslations';
import { ResumeData } from '../types/resume';
import ATSOptimizedResume from './ATSOptimizedResume';
import '../styles/ats-resume.css';

interface ResumePreviewProps {
  data: ResumeData;
  language: LanguageCode;
}

const ResumePreview: React.FC<ResumePreviewProps> = ({ data, language }) => {
  return <ATSOptimizedResume data={data} language={language} />;
};

export default ResumePreview;

interface ResumePreviewProps {
  data: ResumeData;
  language: LanguageCode;
}

const translations = {
  pt: {
    professionalSummary: 'Resumo Profissional',
    workExperience: 'Experiência Profissional',
    education: 'Formação Acadêmica',
    technicalSkills: 'Habilidades',
    languages: 'Idiomas',
    certifications: 'Certificações e Cursos',
    present: 'Presente',
    inProgress: 'Em andamento',
    degreeOptions: {
      bachelor: 'Bacharelado',
      master: 'Mestrado',
      doctorate: 'Doutorado',
      associate: 'Tecnólogo',
      highschool: 'Ensino Médio',
      other: 'Outro'
    },
    skillLevels: {
      basic: 'Básico',
      intermediate: 'Intermediário',
      advanced: 'Avançado',
      expert: 'Especialista'
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
    technicalSkills: 'Skills',
    languages: 'Languages',
    certifications: 'Certifications and Courses',
    present: 'Present',
    inProgress: 'In Progress',
    degreeOptions: {
      bachelor: 'Bachelor',
      master: 'Master',
      doctorate: 'Doctorate',
      associate: 'Associate',
      highschool: 'High School',
      other: 'Other'
    },
    skillLevels: {
      basic: 'Basic',
      intermediate: 'Intermediate',
      advanced: 'Advanced',
      expert: 'Expert'
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

  return (
    <article className="pdf-page max-w-4xl mx-auto font-sans">
      {/* Header / Personal Info */}      <header className="mb-8 border-b pb-6">
       <div className="resume-container">
  <h1>{personal.name}</h1>
  <div className="contact-info">
    {personal.phone && <span>{personal.phone}</span>}
    {personal.email && <span>{personal.email}</span>}
    {personal.address && <span>{personal.address}</span>}
    
    {personal.linkedin && (
      <a
        href={personal.linkedin?.startsWith('http')
          ? personal.linkedin
          : `https://${personal.linkedin}`}
        target="_blank"
        rel="noopener noreferrer">
        LinkedIn
      </a>
    )}
    {personal.github && (
      <a
        href={personal.github?.startsWith('http')
          ? personal.github
          : `https://${personal.github}`}
        target="_blank"
        rel="noopener noreferrer">
        Github
      </a>
    )}
    {personal.website && (
      <a
        href={personal.website?.startsWith('http')
          ? personal.website
          : `https://${personal.website}`}
        target="_blank"
        rel="noopener noreferrer">
        Website
      </a>
    )}
  </div>
  </div>
      </header>

      {/* Professional Summary */}
      {summary && (
     <section className="section">
          <h2 className="text-xl font-semibold mb-3 text-gray-900 border-b pb-2">
            {t.professionalSummary}
          </h2>
        <p className="description">{summary}</p>
        </section>
      )}

      {/* Experience */}
      {experience && experience.length > 0 && (
        <section className="mb-8 section">
          <h2 className="text-xl font-semibold mb-4 text-gray-900 border-b pb-2">
            {t.workExperience}
          </h2>
          <div className="space-y-6">
            {experience.map((exp) => (
              <div key={exp.id} className="section" itemProp="workExperience">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-2">
                  <div>
                    <h3 className="text-lg font-medium text-gray-900" itemProp="jobTitle">
                      {exp.position}
                    </h3>
                    <div className="text-base text-gray-700" itemProp="worksFor">
                      {exp.company}
                    </div>
                  </div>
                  <div className="text-sm text-gray-600 mt-1 sm:mt-0">
                    <time itemProp="startDate">{formatDate(exp.startDate)}</time>
                    {' - '}
                    {exp.current ? (
                      <span>{t.present}</span>
                    ) : (
                      <time itemProp="endDate">{formatDate(exp.endDate)}</time>
                    )}
                  </div>
                </div>
                {exp.description && (
                  <p className="text-base text-gray-700 whitespace-pre-wrap" itemProp="description">
                    {exp.description}
                  </p>
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Education */}
      {education && education.length > 0 && (
        <section className="mb-8 section">
          <h2 className="text-xl font-semibold mb-4 text-gray-900 border-b pb-2">
            {t.education}
          </h2>
          <div className="space-y-6">
            {education.map((edu) => (
              <div key={edu.id} className="section" itemProp="education">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-2">
                  <div>
                   <h3 className="text-lg font-medium text-gray-900">
                      <span itemProp="degreeType">
                       {t.degreeOptions && t.degreeOptions[edu.degree as keyof typeof t.degreeOptions] || edu.degree}
                      </span>
                      {edu.field && <span itemProp="fieldOfStudy">{` em ${edu.field}`}</span>}
                   </h3>
                    <div className="text-base text-gray-700" itemProp="educationalOrganization">
                      {edu.institution}
                    </div>
                  </div>
                  <div className="text-sm text-gray-600 mt-1 sm:mt-0">
                    <time itemProp="startDate">{formatDate(edu.startDate)}</time>
                    {' - '}
                    {edu.current ? (
                      <span>{t.inProgress}</span>
                    ) : (
                      <time itemProp="endDate">{formatDate(edu.endDate)}</time>
                    )}
                  </div>
                </div>
                {edu.description && (
                  <p className="text-base text-gray-700 whitespace-pre-wrap" itemProp="description">
                    {edu.description}
                  </p>
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Skills */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 mb-8">
        {skills && skills.length > 0 && (
        <section className="section">
          <h2 className="text-xl font-semibold mb-4 text-gray-900 border-b pb-2">
            {t.technicalSkills}
          </h2>
    <ul className="skills-list">
      {skills.map((skill) => (
        <li className="skill-item" key={skill.id}>
          <span className="skill-badge">
            {skill.name} - {t.skillLevels[skill.level as keyof typeof t.skillLevels]}
          </span>
        </li>
      ))}
    </ul>
        </section>
      )}
        {/* Languages */}
       {languageSkills && languageSkills.length > 0 && (
    <section className="section">
        <h2>Idiomas</h2>
      <ul className="languages-list">
        {languageSkills.map((lang) => (
          <li className="language-item" key={lang.id}>
            {lang.name} - {t.proficiencyLevels[lang.level as keyof typeof t.proficiencyLevels]}
          </li>
        ))}
      </ul>
    </section>
  )}
      </div>

      {/* Certifications */}
      {certifications && certifications.length > 0 && (
        <section className="mb-8 section">
          <h2 className="text-xl font-semibold mb-4 text-gray-900 border-b pb-2">
            {t.certifications}
          </h2>
          <div className="space-y-4">
            {certifications.map((cert) => (
              <div 
                key={cert.id} 
                className="section"
                itemProp="hasCredential"
              >
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-2">
                  <div>
                    <h3 className="text-lg font-medium text-gray-900">
                      {cert.name}
                    </h3>
                    <div className="text-base text-gray-700">
                      {cert.issuer}
                    </div>
                  </div>
                  <div className="text-sm text-gray-600 mt-1 sm:mt-0">
                    <time itemProp="dateCreated">{formatDate(cert.date)}</time>
                  </div>
                </div>
                {cert.description && (
                  <p className="text-base text-gray-700 whitespace-pre-wrap">
                    {cert.description}
                  </p>
                )}
                {cert.url && (
                  <a 
                    href={cert.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-blue-600 hover:text-blue-800 mt-2 inline-block"
                  >
                    Ver certificado
                  </a>
                )}
              </div>
            ))}
          </div>
        </section>
      )}
    </article>
  );
};

export default ResumePreview;