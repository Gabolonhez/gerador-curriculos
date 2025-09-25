import React from 'react';
import { LanguageCode } from '../../translations/formTranslations';
import { ResumeData } from '../../types/resume';
import { formatPhoneNumber, formatDateRange } from '../../utils/formatters/resumeFormatters';
import resumeTranslations from '../../translations/resumeTranslations';

interface Props {
  data: ResumeData;
  language: LanguageCode;
}

const ATSSimple: React.FC<Props> = ({ data, language }) => {
  const { personal, summary, experience, education, skills, languages, certifications, projects } = data;
  const t = resumeTranslations[language as keyof typeof resumeTranslations];

  return (
    <div className="ats-resume ats-simple ats-minimal">
      <header className="ats-minimal-header">
        <h1 className="ats-minimal-name">{personal.name}</h1>
        <div className="ats-minimal-contact" aria-label="contact">
          {personal.address && <span className="ats-minimal-contact-item">{personal.address}</span>}
          {personal.phone && (
            <span className="ats-minimal-contact-item">
              <a href={`tel:${personal.phone}`}>{formatPhoneNumber(personal.phone)}</a>
            </span>
          )}
          {personal.email && (
            <span className="ats-minimal-contact-item">
              <a href={`mailto:${personal.email}`}>{personal.email}</a>
            </span>
          )}
            {personal.linkedin && (
              <span className="ats-minimal-contact-item">
                <a href={personal.linkedin} target="_blank" rel="noopener noreferrer">{personal.linkedin}</a>
              </span>
            )}
            {personal.portfolio && (
              <span className="ats-minimal-contact-item">
                <a href={personal.portfolio.startsWith('http') ? personal.portfolio : `https://${personal.portfolio}`} target="_blank" rel="noopener noreferrer">{personal.portfolio}</a>
              </span>
            )}
        </div>
      </header>

      {summary && (
        <section className="ats-section ats-minimal-section">
          <h2 className="ats-minimal-title">{t.professionalSummary}</h2>
          <p>{summary}</p>
        </section>
      )}

      {experience && experience.length > 0 && (
        <section className="ats-section ats-minimal-section">
          <h2 className="ats-minimal-title">{t.workExperience}</h2>
          {experience.map((exp, idx) => (
            <div key={exp.id || idx} className="ats-minimal-exp">
              <div className="ats-minimal-exp-header">
                <div className="ats-minimal-exp-left">
                  <strong className="ats-job-title">{exp.position}</strong>
                  <div className="ats-minimal-company">{exp.company} — {formatDateRange(exp.startDate, exp.endDate, exp.current, language)}</div>
                </div>
              </div>
              {exp.description && (
                <div className="ats-minimal-exp-desc">
                  {exp.description.includes('\n') ? (
                    <ul>
                      {exp.description.split('\n').map((line, i) => line.trim() ? <li key={i}>{line.trim()}</li> : null)}
                    </ul>
                  ) : (
                    <p>{exp.description}</p>
                  )}
                </div>
              )}
            </div>
          ))}
        </section>
      )}

  {education && education.length > 0 && (
        <section className="ats-section ats-minimal-section">
          <h2 className="ats-minimal-title">{t.education}</h2>
          <ul>
            {education.map((edu, idx) => (
              <li key={edu.id || idx}>
                <strong>{t.degreeOptions[edu.degree as keyof typeof t.degreeOptions] || edu.degree}</strong>
                {edu.field ? ` — ${edu.field}` : ''} — {edu.institution}
                {edu.startDate || edu.endDate ? ` (${edu.startDate || '—'} - ${edu.current ? t.present : edu.endDate || '—'})` : ''}
              </li>
            ))}
          </ul>
        </section>
      )}

      {skills && skills.length > 0 && (
        <section className="ats-section ats-minimal-section">
          <h2 className="ats-minimal-title">{t.technicalSkills}</h2>
          <ul>
            {skills.map((s, idx) => <li key={s.id || idx}>{s.name}</li>)}
          </ul>
        </section>
      )}

      {certifications && certifications.length > 0 && (
        <section className="ats-section ats-minimal-section">
          <h2 className="ats-minimal-title">{t.certifications}</h2>
          <ul>
            {certifications.map((c, idx) => (
              <li key={c.id || idx}><strong>{c.name}</strong> — {c.issuer}{c.date ? ` (${c.date})` : ''}</li>
            ))}
          </ul>
        </section>
      )}

  {languages && languages.length > 0 && (
        <section className="ats-section ats-minimal-section">
          <h2 className="ats-minimal-title">{t.languages}</h2>
          <ul>
            {languages.map((l, idx) => (
              <li key={l.id || idx}>{l.name} — {t.proficiencyLevels[l.level as keyof typeof t.proficiencyLevels]}</li>
            ))}
          </ul>
        </section>
      )}

      {projects && projects.length > 0 && (
        <section className="ats-section ats-minimal-section">
          <h2 className="ats-minimal-title">{t.projects}</h2>
          {projects.map((project, idx) => (
            <div key={project.id || idx} className="ats-minimal-project">
              <h3><strong>{project.name}</strong></h3>
              <div className="ats-minimal-dates">{formatDateRange(project.startDate, project.endDate, project.current, language)}</div>
              {project.technologies && (
                <div><strong>{t.technologies}:</strong> {project.technologies}</div>
              )}
              {project.description && <p>{project.description}</p>}
              {project.link && (
                <div>
                  <a href={project.link.startsWith('http') ? project.link : `https://${project.link}`} target="_blank" rel="noopener noreferrer">{project.link}</a>
                </div>
              )}
            </div>
          ))}
        </section>
      )}
    </div>
  );
};

export default ATSSimple;
