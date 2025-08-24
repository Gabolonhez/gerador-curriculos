import React from 'react';
import { LanguageCode } from '../../translations/formTranslations';
import { ResumeData } from '../../types/resume';
import { formatPhoneNumber, formatDateRange, calculateDuration } from '../../utils/formatters/resumeFormatters';
import resumeTranslations from '../../translations/resumeTranslations';

interface Props {
  data: ResumeData;
  language: LanguageCode;
}

const ATSSimple: React.FC<Props> = ({ data, language }) => {
  const { personal, summary, experience, education, skills, languages: languageSkills } = data;
  const t = resumeTranslations[language as keyof typeof resumeTranslations];

  return (
    <div className="ats-resume ats-simple">
      <header className="ats-header">
        <h1 className="ats-name">{personal.name}</h1>
        {personal.desiredPosition && <div className="ats-desired-position">{personal.desiredPosition}</div>}
        <div className="ats-contact-info">
          {personal.email && <div className="ats-contact-item"><strong>{t.email}:</strong> {personal.email}</div>}
          {personal.phone && <div className="ats-contact-item"><strong>{t.phone}:</strong> {formatPhoneNumber(personal.phone)}</div>}
        </div>
      </header>

      {summary && (
        <section className="ats-section">
          <h2 className="ats-section-title">{t.professionalSummary}</h2>
          <p>{summary}</p>
        </section>
      )}

      {skills && skills.length > 0 && (
        <section className="ats-section">
          <h2 className="ats-section-title">{t.technicalSkills}</h2>
          <div className="ats-skills-grid">
            {skills.map((s, idx) => (
              <div key={s.id || idx} className="ats-skill-item">
                <span className="ats-skill-name">{s.name}</span>
              </div>
            ))}
          </div>
        </section>
      )}

      {experience && experience.length > 0 && (
        <section className="ats-section">
          <h2 className="ats-section-title">{t.workExperience}</h2>
          {experience.map((exp, idx) => (
            <div key={exp.id || idx} className="ats-experience-item">
              <div className="ats-experience-header">
                <strong>{exp.position}</strong> — {exp.company}
                <div className="ats-date-info">{formatDateRange(exp.startDate, exp.endDate, exp.current, language)} ({calculateDuration(exp.startDate, exp.endDate, exp.current, language)})</div>
              </div>
              {exp.description && <div className="ats-description"><p>{exp.description}</p></div>}
            </div>
          ))}
        </section>
      )}

      {education && education.length > 0 && (
        <section className="ats-section">
          <h2 className="ats-section-title">{t.education}</h2>
          {education.map((edu, idx) => (
            <div key={edu.id || idx} className="ats-education-item">
              <div className="ats-education-header">{t.degreeOptions[edu.degree as keyof typeof t.degreeOptions] || edu.degree} {t.degreeIn} {edu.field} — {edu.institution}</div>
            </div>
          ))}
        </section>
      )}

      {languageSkills && languageSkills.length > 0 && (
        <section className="ats-section">
          <h2 className="ats-section-title">{t.languages}</h2>
          <div className="ats-languages">
            {languageSkills.map((l, idx) => (
              <div key={l.id || idx} className="ats-language-item">{l.name} — {t.proficiencyLevels[l.level as keyof typeof t.proficiencyLevels]}</div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
};

export default ATSSimple;
