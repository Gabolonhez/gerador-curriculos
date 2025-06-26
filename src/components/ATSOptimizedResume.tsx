import React from 'react';
import { LanguageCode } from '../translations/formTranslations';
import { ResumeData } from '../types/resume';
import { 
  formatPhoneNumber, 
  formatDateRange, 
  calculateDuration,
  formatLinkedInURL,
  formatGitHubURL,
  formatURL
} from '../utils/formatters/resumeFormatters';

interface ATSOptimizedResumeProps {
  data: ResumeData;
  language: LanguageCode;
}

const translations = {
  pt: {
    professionalSummary: 'Resumo Profissional',
    workExperience: 'Experiência Profissional',
    education: 'Formação Acadêmica',
    technicalSkills: 'Competências Técnicas',
    languages: 'Idiomas',
    certifications: 'Certificações e Cursos',
    present: 'Presente',
    duration: 'Duração',
    contact: 'Contato',
    skills: 'Habilidades',
    proficiencyLevels: {
      basic: 'Básico',
      intermediate: 'Intermediário',
      advanced: 'Avançado',
      fluent: 'Fluente',
      native: 'Nativo'
    },
    skillLevels: {
      basic: 'Básico',
      intermediate: 'Intermediário',
      advanced: 'Avançado',
      expert: 'Especialista'
    }
  },
  en: {
    professionalSummary: 'Professional Summary',
    workExperience: 'Work Experience',
    education: 'Education',
    technicalSkills: 'Technical Skills',
    languages: 'Languages',
    certifications: 'Certifications & Courses',
    present: 'Present',
    duration: 'Duration',
    contact: 'Contact',
    skills: 'Skills',
    proficiencyLevels: {
      basic: 'Basic',
      intermediate: 'Intermediate',
      advanced: 'Advanced',
      fluent: 'Fluent',
      native: 'Native'
    },
    skillLevels: {
      basic: 'Basic',
      intermediate: 'Intermediate',
      advanced: 'Advanced',
      expert: 'Expert'
    }
  }
};

const ATSOptimizedResume: React.FC<ATSOptimizedResumeProps> = ({ data, language }) => {
  const { personal, summary, experience, education, skills, languages: languageSkills, certifications } = data;
  const t = translations[language];

  return (
    <div className="ats-resume">
      {/* Header com informações pessoais - Formato ATS otimizado */}
      <header className="ats-header">
        <h1 className="ats-name">{personal.name}</h1>
        {personal.desiredPosition && (
          <div className="ats-desired-position">{personal.desiredPosition}</div>
        )}
        
        <div className="ats-contact-info">
          {/* Linha 1: Email, Telefone, Endereço */}
          <div className="ats-contact-row">
            {personal.email && (
              <div className="ats-contact-item">
                <span className="ats-label">Email:</span>
                <span className="ats-value">{personal.email}</span>
              </div>
            )}
            
            {personal.phone && (
              <div className="ats-contact-item">
                <span className="ats-label">Telefone:</span>
                <span className="ats-value">{formatPhoneNumber(personal.phone)}</span>
              </div>
            )}
            
            {personal.address && (
              <div className="ats-contact-item">
                <span className="ats-label">Endereço:</span>
                <span className="ats-value">{personal.address}</span>
              </div>
            )}
          </div>

          {/* Linha 2: LinkedIn, GitHub, Website */}
          {(personal.linkedin || personal.github || personal.website) && (
            <div className="ats-contact-row">
              {personal.linkedin && (
                <div className="ats-contact-item">
                  <span className="ats-label">LinkedIn:</span>
                  <a 
                    href={formatLinkedInURL(personal.linkedin)} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="ats-value ats-link"
                  >
                    {formatURL(formatLinkedInURL(personal.linkedin))}
                  </a>
                </div>
              )}
              
              {personal.github && (
                <div className="ats-contact-item">
                  <span className="ats-label">GitHub:</span>
                  <a 
                    href={formatGitHubURL(personal.github)} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="ats-value ats-link"
                  >
                    {formatURL(formatGitHubURL(personal.github))}
                  </a>
                </div>
              )}
              
              {personal.website && (
                <div className="ats-contact-item">
                  <span className="ats-label">Website:</span>
                  <a 
                    href={personal.website.startsWith('http') ? personal.website : `https://${personal.website}`} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="ats-value ats-link"
                  >
                    {formatURL(personal.website)}
                  </a>
                </div>
              )}
            </div>
          )}
        </div>
      </header>

      {/* Resumo Profissional */}
      {summary && (
        <section className="ats-section">
          <h2 className="ats-section-title">{t.professionalSummary}</h2>
          <div className="ats-summary">
            <p>{summary}</p>
          </div>
        </section>
      )}

      {/* Competências Técnicas - Prioridade alta para ATS */}
      {skills && skills.length > 0 && (
        <section className="ats-section">
          <h2 className="ats-section-title">{t.technicalSkills}</h2>
          <div className="ats-skills-grid">
            {skills.map((skill, index) => (
              <div key={skill.id || index} className="ats-skill-item">
                <span className="ats-skill-name">{skill.name}</span>
                <span className="ats-skill-level">({t.skillLevels[skill.level as keyof typeof t.skillLevels]})</span>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Experiência Profissional */}
      {experience && experience.length > 0 && (
        <section className="ats-section">
          <h2 className="ats-section-title">{t.workExperience}</h2>
          {experience.map((exp, index) => (
            <div key={exp.id || index} className="ats-experience-item">
              <div className="ats-experience-header">
                <h3 className="ats-job-title">{exp.position}</h3>
                <h4 className="ats-company">{exp.company}</h4>
                <div className="ats-date-info">
                  <span className="ats-dates">
                    {formatDateRange(exp.startDate, exp.endDate, exp.current, language)}
                  </span>
                  <span className="ats-duration">
                    ({calculateDuration(exp.startDate, exp.endDate, exp.current, language)})
                  </span>
                </div>
              </div>
              {exp.description && (
                <div className="ats-description">
                  <p>{exp.description}</p>
                </div>
              )}
            </div>
          ))}
        </section>
      )}

      {/* Formação Acadêmica */}
      {education && education.length > 0 && (
        <section className="ats-section">
          <h2 className="ats-section-title">{t.education}</h2>
          {education.map((edu, index) => (
            <div key={edu.id || index} className="ats-education-item">
              <div className="ats-education-header">
                <h3 className="ats-degree">{edu.degree} em {edu.field}</h3>
                <h4 className="ats-institution">{edu.institution}</h4>
                <div className="ats-date-info">
                  <span className="ats-dates">
                    {formatDateRange(edu.startDate, edu.endDate, edu.current, language)}
                  </span>
                </div>
              </div>
              {edu.description && (
                <div className="ats-description">
                  <p>{edu.description}</p>
                </div>
              )}
            </div>
          ))}
        </section>
      )}

      {/* Certificações */}
      {certifications && certifications.length > 0 && (
        <section className="ats-section">
          <h2 className="ats-section-title">{t.certifications}</h2>
          {certifications.map((cert, index) => (
            <div key={cert.id || index} className="ats-certification-item">
              <div className="ats-certification-header">
                <h3 className="ats-cert-name">{cert.name}</h3>
                <h4 className="ats-cert-issuer">{cert.issuer}</h4>
                {cert.date && (
                  <span className="ats-cert-date">
                    {new Date(cert.date).toLocaleDateString(language === 'pt' ? 'pt-BR' : 'en-US', {
                      year: 'numeric',
                      month: 'long'
                    })}
                  </span>
                )}
              </div>
              {cert.description && (
                <div className="ats-description">
                  <p>{cert.description}</p>
                </div>
              )}
              {cert.url && (
                <div className="ats-cert-url">
                  <span>Verificar em: </span>
                  <a 
                    href={cert.url.startsWith('http') ? cert.url : `https://${cert.url}`} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="ats-link"
                  >
                    {formatURL(cert.url)}
                  </a>
                </div>
              )}
            </div>
          ))}
        </section>
      )}

      {/* Idiomas */}
      {languageSkills && languageSkills.length > 0 && (
        <section className="ats-section">
          <h2 className="ats-section-title">{t.languages}</h2>
          <div className="ats-languages">
            {languageSkills.map((lang, index) => (
              <div key={lang.id || index} className="ats-language-item">
                <span className="ats-language-name">{lang.name}</span>
                <span className="ats-language-level">({t.proficiencyLevels[lang.level as keyof typeof t.proficiencyLevels]})</span>
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
};

export default ATSOptimizedResume;
