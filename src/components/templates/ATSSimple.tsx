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
  const { personal, summary, experience, education, skills, languages, certifications } = data;
  const t = resumeTranslations[language as keyof typeof resumeTranslations];

  return (
    <div className="ats-resume ats-simple ats-minimal">
      <header className="ats-minimal-header">
        <h1 className="ats-minimal-name">{personal.name}</h1>
        <div className="ats-minimal-contact">
          {personal.address && <span className="ats-minimal-contact-item">{personal.address}</span>}
          {personal.phone && <span className="ats-minimal-contact-item">{formatPhoneNumber(personal.phone)}</span>}
          {personal.email && <span className="ats-minimal-contact-item">{personal.email}</span>}
          {personal.linkedin && <span className="ats-minimal-contact-item">{personal.linkedin}</span>}
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
                  <strong>{exp.position}</strong>
                  <div className="ats-minimal-company">{exp.company} — {formatDateRange(exp.startDate, exp.endDate, exp.current, language)}</div>
                </div>
              </div>
              {exp.description && <div className="ats-minimal-exp-desc"><p>{exp.description}</p></div>}
            </div>
          ))}
        </section>
      )}

  {education && education.length > 0 && (
        <section className="ats-section ats-minimal-section">
          <h2 className="ats-minimal-title">{t.education}</h2>
          <ul>
            {education.map((edu, idx) => (
              <li key={edu.id || idx}>{t.degreeOptions[edu.degree as keyof typeof t.degreeOptions] || edu.degree} — {edu.institution} ({edu.startDate} - {edu.endDate})</li>
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
              <li key={c.id || idx}>{c.name} — {c.issuer}{c.date ? ` (${c.date})` : ''}</li>
            ))}
          </ul>
        </section>
      )}

  {languages && languages.length > 0 && (
        <section className="ats-section ats-minimal-section">
          <h2 className="ats-minimal-title">{t.languages}</h2>
          <ul>
    {languages.map((l, idx) => (<li key={l.id || idx}>{l.name} — {t.proficiencyLevels[l.level as keyof typeof t.proficiencyLevels]}</li>))}
          </ul>
        </section>
      )}
    </div>
  );
};

export default ATSSimple;
