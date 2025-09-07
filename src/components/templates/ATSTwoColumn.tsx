import React from 'react';
import { ResumeData } from '../../types/resume';
import { LanguageCode } from '../../translations/formTranslations';
import { formatDateRange } from '../../utils/formatters/resumeFormatters';
import resumeTranslations from '../../translations/resumeTranslations';
import '../../styles/ats-resume.css';

type Props = { data: ResumeData; language: LanguageCode };

const ATSTwoColumn: React.FC<Props> = ({ data, language }) => {
  const t = resumeTranslations[language as keyof typeof resumeTranslations];

  const { personal, experience = [], education = [], skills = [], certifications = [], languages = [], summary } = data;

  const normalizeUrl = (u?: string) => {
    if (!u) return undefined;
    if (u.startsWith('http://') || u.startsWith('https://')) return u;
    return `https://${u}`;
  };

  return (
    <div className="ats-resume ats-twocolumn">
      <header className="ats-twocolumn-header">
        <h1 className="ats-name">{personal?.name}</h1>
        {personal?.desiredPosition && <div className="ats-role">{personal.desiredPosition}</div>}
      </header>

      <aside className="ats-twocolumn-sidebar">
        <div className="ats-personal">
          <div className="ats-contact">
            {personal.email && (
              <div>
                <strong>{t.email}: </strong>
                <a href={`mailto:${personal.email}`}>{personal.email}</a>
              </div>
            )}
            {personal.phone && (
              <div>
                <strong>{t.phone}: </strong>
                <a href={`tel:${personal.phone}`}>{personal.phone}</a>
              </div>
            )}
              {personal.portfolio && (
                <div>
                  <strong>{t.website}: </strong>
                  <a href={normalizeUrl(personal.portfolio)} target="_blank" rel="noopener noreferrer">
                    {personal.portfolio}
                  </a>
                </div>
              )}
          </div>

          {skills.length > 0 && (
            <section className="ats-section" aria-label={t.skills}>
              <h4>{t.skills}</h4>
              <ul className="ats-list">
                {skills.map((s, i) => (
                  <li key={s.id || i}>{s.name}</li>
                ))}
              </ul>
            </section>
          )}

          {languages.length > 0 && (
            <section className="ats-section" aria-label={t.languages}>
              <h4>{t.languages}</h4>
              <ul className="ats-list">
                {languages.map((l, i) => (
                  <li key={l.id || i}>{l.name}{l.level ? ` — ${t.proficiencyLevels[l.level as keyof typeof t.proficiencyLevels] || l.level}` : ''}</li>
                ))}
              </ul>
            </section>
          )}
        </div>
      </aside>

      <main className="ats-twocolumn-main">
        {summary && (
          <div className="ats-section ats-summary">
            <h4>{t.professionalSummary}</h4>
            <p>{summary}</p>
          </div>
        )}

        {experience.length > 0 && (
          <div className="ats-section">
            <h4>{t.workExperience}</h4>
            {experience.map((exp, idx) => (
              <div key={exp.id || idx} className="ats-experience-item">
                <div className="ats-exp-header">
                  <div className="ats-job-title">{exp.position}</div>
                  <div className="ats-company">{exp.company}</div>
                </div>
                <div className="ats-exp-meta">
                  <span className="ats-exp-dates">{formatDateRange(exp.startDate, exp.endDate, exp.current, language)}</span>
                </div>
                {exp.description && (
                  <div className="ats-exp-desc">
                    {exp.description.includes('\n') ? (
                      <ul>
                        {exp.description.split('\n').map((ln, i) => ln.trim() ? <li key={i}>{ln.trim()}</li> : null)}
                      </ul>
                    ) : (
                      <p>{exp.description}</p>
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        {education.length > 0 && (
          <div className="ats-section">
            <h4>{t.education}</h4>
            {education.map((edu, i) => (
              <div key={edu.id || i} className="ats-edu-item">
                <div className="ats-edu-header">
                  <div className="ats-edu-school">{edu.institution}</div>
                  <div className="ats-edu-degree">{t.degreeOptions[edu.degree as keyof typeof t.degreeOptions] || edu.degree}</div>
                </div>
                <div className="ats-edu-meta">{formatDateRange(edu.startDate, edu.endDate, edu.current, language)}</div>
              </div>
            ))}
          </div>
        )}

        {certifications.length > 0 && (
          <div className="ats-section">
            <h4>{t.certifications}</h4>
            <ul className="ats-list">
              {certifications.map((c, i) => (
                <li key={c.id || i}>{c.name}{c.issuer ? ` — ${c.issuer}` : ''}{c.date ? ` (${c.date})` : ''}</li>
              ))}
            </ul>
          </div>
        )}
      </main>
    </div>
  );
};

export default ATSTwoColumn;
