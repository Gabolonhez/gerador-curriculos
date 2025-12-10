import React from 'react';
import { LanguageCode } from '../../translations/formTranslations';
import { ResumeData } from '../../types/resume';
import {
  formatPhoneNumber,
  formatDateRange,
  calculateDuration,
  formatLinkedInURL,
  formatGitHubURL,
  formatURL
} from '../../utils/formatters/resumeFormatters';

interface ATSOptimizedResumeProps {
  data: ResumeData;
  language: LanguageCode;
}

import resumeTranslations from '../../translations/resumeTranslations';

const ATSOptimizedResume: React.FC<ATSOptimizedResumeProps> = ({ data, language }) => {
  const { personal, summary, experience, education, skills, languages: languageSkills, certifications, projects, sectionOrder } = data;
  // Map project language codes to resumeTranslations keys (resumeTranslations includes 'es')
  const t = resumeTranslations[language as keyof typeof resumeTranslations];

  // Render sections according to `sectionOrder` when provided, otherwise fallback to default sequence
  const order = sectionOrder && sectionOrder.length > 0 ? sectionOrder : ['summary', 'skills', 'experience', 'education', 'languages', 'certifications', 'projects'];

  const renderSection = (key: string) => {
    switch (key) {
      case 'summary':
        return summary ? (
          <section key="summary" className="ats-section">
            <h2 className="ats-section-title">{t.professionalSummary}</h2>
            <div className="ats-summary"><p>{summary}</p></div>
          </section>
        ) : null;
      case 'skills':
        return skills && skills.length > 0 ? (
          <section key="skills" className="ats-section">
            <h2 className="ats-section-title">{t.technicalSkills}</h2>
            <div className="ats-skills-grid">
              {skills.map((skill, index) => (
                <div key={skill.id || index} className="ats-skill-item">
                  <span className="ats-skill-name">{skill.name}</span>
                  {skill.level ? (
                    <span className="ats-skill-level">{t.skillLevels[skill.level as keyof typeof t.skillLevels]}</span>
                  ) : null}
                </div>
              ))}
            </div>
          </section>
        ) : null;
      case 'experience':
        return experience && experience.length > 0 ? (
          <section key="experience" className="ats-section">
            <h2 className="ats-section-title">{t.workExperience}</h2>
            {experience.map((exp, index) => (
              <div key={exp.id || index} className="ats-experience-item">
                <div className="ats-experience-header">
                  <h3 className="ats-job-title">{exp.position}</h3>
                  <h4 className="ats-company">{exp.company}</h4>
                  <div className="ats-date-info">
                    <span className="ats-dates">{formatDateRange(exp.startDate, exp.endDate, exp.current, language)}</span>
                    <span className="ats-duration">({calculateDuration(exp.startDate, exp.endDate, exp.current, language)})</span>
                  </div>
                </div>
                {exp.description && <div className="ats-description"><p>{exp.description}</p></div>}
              </div>
            ))}
          </section>
        ) : null;
      case 'education':
        return education && education.length > 0 ? (
          <section key="education" className="ats-section">
            <h2 className="ats-section-title">{t.education}</h2>
            {education.map((edu, index) => (
              <div key={edu.id || index} className="ats-education-item">
                <div className="ats-education-header">
                  <h3 className="ats-degree">{t.degreeOptions[edu.degree as keyof typeof t.degreeOptions] || edu.degree} {t.degreeIn} {edu.field}</h3>
                  <h4 className="ats-institution">{edu.institution}</h4>
                  <div className="ats-date-info"><span className="ats-dates">{formatDateRange(edu.startDate, edu.endDate, edu.current, language)}</span></div>
                </div>
                {edu.description && <div className="ats-description"><p>{edu.description}</p></div>}
              </div>
            ))}
          </section>
        ) : null;
      case 'languages':
        return languageSkills && languageSkills.length > 0 ? (
          <section key="languages" className="ats-section">
            <h2 className="ats-section-title">{t.languages}</h2>
            <div className="ats-languages">
              {languageSkills.map((lang, index) => (
                <div key={lang.id || index} className="ats-language-item">
                  <span className="ats-language-name">{lang.name}</span>
                  <span className="ats-language-level">{t.proficiencyLevels[lang.level as keyof typeof t.proficiencyLevels]}</span>
                </div>
              ))}
            </div>
          </section>
        ) : null;
      case 'certifications':
        return certifications && certifications.length > 0 ? (
          <section key="certifications" className="ats-section">
            <h2 className="ats-section-title">{t.certifications}</h2>
            {certifications.map((cert, index) => (
              <div key={cert.id || index} className="ats-certification-item">
                <div className="ats-certification-header">
                  <h3 className="ats-cert-name">{cert.name}</h3>
                  <h4 className="ats-cert-issuer">{cert.issuer}</h4>
                  {cert.date && (
                    <span className="ats-cert-date">{new Date(cert.date).toLocaleDateString(language === 'pt' ? 'pt-BR' : 'en-US', { year: 'numeric', month: 'long' })}</span>
                  )}
                </div>
                {cert.description && <div className="ats-description"><p>{cert.description}</p></div>}
                {cert.url && (
                  <div className="ats-cert-url"><span>{t.checkAt}: </span><a href={cert.url.startsWith('http') ? cert.url : `https://${cert.url}`} target="_blank" rel="noopener noreferrer" className="ats-link">{formatURL(cert.url)}</a></div>
                )}
              </div>
            ))}
          </section>
        ) : null;
      case 'projects':
        return projects && projects.length > 0 ? (
          <section key="projects" className="ats-section">
            <h2 className="ats-section-title">{t.projects}</h2>
            {projects.map((project, index) => (
              <div
                key={project.id || index}
                className={`ats-project-item${index !== projects.length - 1 ? ' mb-4' : ''}`}
              >
                <div className="ats-project-header">
                  <h3 className="ats-project-name">{project.name}</h3>
                </div>
                {project.description && <div className="ats-description"><p>{project.description}</p></div>}
                {project.technologies && (
                  <div className="ats-project-technologies">
                    <span className="ats-label">{t.technologies}: </span>
                    <span className="ats-technologies-list">{project.technologies}</span>
                  </div>
                )}
                {project.link && (
                  <div className="ats-project-url">
                    <span>{t.checkAt}: </span>
                    <a href={project.link.startsWith('http') ? project.link : `https://${project.link}`} target="_blank" rel="noopener noreferrer" className="ats-link">{formatURL(project.link)}</a>
                  </div>
                )}
              </div>
            ))}
          </section>
        ) : null;
      default:
        return null;
    }
  };

  // Render all sections in configured order
  const sections = order.map(k => renderSection(k)).filter(Boolean);

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
                <span className="ats-label">{t.email}:</span>
                <span className="ats-value">{personal.email}</span>
              </div>
            )}

            {personal.phone && (
              <div className="ats-contact-item">
                <span className="ats-label">{t.phone}:</span>
                <span className="ats-value">{formatPhoneNumber(personal.phone)}</span>
              </div>
            )}

            {personal.address && (
              <div className="ats-contact-item">
                <span className="ats-label">{t.address}:</span>
                <span className="ats-value">{personal.address}</span>
              </div>
            )}
          </div>

          {/* Linha 2: LinkedIn, GitHub, Website */}
          {(personal.linkedin || personal.github || personal.portfolio) && (
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

              {personal.portfolio && (
                <div className="ats-contact-item">
                  <span className="ats-label">{t.website}:</span>
                  <a
                    href={personal.portfolio.startsWith('http') ? personal.portfolio : `https://${personal.portfolio}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="ats-value ats-link"
                  >
                    {formatURL(personal.portfolio)}
                  </a>
                </div>
              )}
            </div>
          )}
        </div>
      </header>

      {sections}
    </div>
  );
};

export default ATSOptimizedResume;
