import React from 'react';
import { LanguageCode } from '../../translations/formTranslations';
import { ResumeData } from '../../types/resume';
import { formatPhoneNumber, formatDateRange } from '../../utils/formatters/resumeFormatters';
import resumeTranslations from '../../translations/resumeTranslations';

interface Props { data: ResumeData; language: LanguageCode }

const ATSCompact: React.FC<Props> = ({ data, language }) => {
  const { personal, skills, experience, education, languages, certifications, summary } = data;
  const t = resumeTranslations[language as keyof typeof resumeTranslations];

  return (
    <div className="ats-resume ats-compact">
      <header className="ats-compact-header">
        <div>
          <h1 className="ats-name">{personal.name}</h1>
          {personal.desiredPosition && <div className="ats-desired-position">{personal.desiredPosition}</div>}
        </div>
        <div className="ats-compact-contact" aria-label="contact">
          {personal.email && <div><a href={`mailto:${personal.email}`}>{personal.email}</a></div>}
          {personal.phone && <div><a href={`tel:${personal.phone}`}>{formatPhoneNumber(personal.phone)}</a></div>}
          {personal.linkedin && <div><a href={personal.linkedin} target="_blank" rel="noopener noreferrer">{personal.linkedin}</a></div>}
        </div>
      </header>

      <div className="ats-compact-grid">
        <aside className="ats-compact-left" aria-label="Informações">
          <section className="ats-compact-block">
            <h2 className="ats-section-title ats-compact-section-title">{t.contact}</h2>
            <div className="ats-contact-col">
              {personal.email && <div>{t.email}: {personal.email}</div>}
              {personal.phone && <div>{t.phone}: {formatPhoneNumber(personal.phone)}</div>}
              {personal.address && <div>{personal.address}</div>}
              {personal.portfolio && <div><span className="ats-label">{t.website}:</span> <a href={personal.portfolio.startsWith('http') ? personal.portfolio : `https://${personal.portfolio}`} target="_blank" rel="noopener noreferrer">{personal.portfolio}</a></div>}
              {personal.linkedin && <div>{personal.linkedin}</div>}
              {personal.github && <div>{personal.github}</div>}
            </div>
          </section>

          {skills && skills.length > 0 && (
            <section className="ats-compact-block">
              <h3 className="ats-subtitle">{t.technicalSkills}</h3>
              <ul className="ats-compact-skill-list">
                {skills.map((s, idx) => <li key={s.id || idx}>{s.name}</li>)}
              </ul>
            </section>
          )}

          {languages && languages.length > 0 && (
            <section className="ats-compact-block">
              <h3 className="ats-subtitle">{t.languages}</h3>
              <ul className="ats-compact-skill-list">
                {languages.map((lg, idx) => (
                  <li key={lg.id || idx}>{lg.name} — {t.proficiencyLevels[lg.level as keyof typeof t.proficiencyLevels]}</li>
                ))}
              </ul>
            </section>
          )}

          {certifications && certifications.length > 0 && (
            <section className="ats-compact-block">
              <h3 className="ats-subtitle">{t.certifications}</h3>
              <ul className="ats-compact-skill-list">
                {certifications.map((c, idx) => (
                  <li key={c.id || idx}>{c.name} — {c.issuer} {c.date ? `(${c.date})` : ''}</li>
                ))}
              </ul>
            </section>
          )}

        </aside>

        <main className="ats-compact-right" aria-label="Resumo e Experiência">
          {summary && (
            <section className="ats-compact-block">
              <h3 className="ats-subtitle">{t.professionalSummary}</h3>
              <p>{summary}</p>
            </section>
          )}

          {experience && experience.length > 0 && (
            <section className="ats-compact-block">
              <h3 className="ats-subtitle">{t.workExperience}</h3>
              {experience.map((exp) => (
                <article key={exp.id} className="ats-compact-exp">
                  <div className="ats-compact-exp-header">
                    <div>
                      <strong className="ats-job-title">{exp.position}</strong>
                      <div className="ats-compact-exp-company">{exp.company} — {formatDateRange(exp.startDate, exp.endDate, exp.current, language)}</div>
                    </div>
                        <div className="ats-compact-exp-dates">{formatDateRange(exp.startDate, exp.endDate, exp.current, language)}</div>
                  </div>
                      {exp.description && (
                        <div className="ats-compact-exp-desc">
                          {exp.description.includes('\n') ? (
                            <ul>
                              {exp.description.split('\n').map((ln, i) => ln.trim() ? <li key={i}>{ln.trim()}</li> : null)}
                            </ul>
                          ) : (
                            <p>{exp.description}</p>
                          )}
                        </div>
                      )}
                </article>
              ))}
            </section>
          )}

          {education && education.length > 0 && (
            <section className="ats-compact-block">
              <h3 className="ats-subtitle">{t.education}</h3>
              <ul className="ats-compact-skill-list">
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
        </main>
      </div>
    </div>
  );
};

export default ATSCompact;
