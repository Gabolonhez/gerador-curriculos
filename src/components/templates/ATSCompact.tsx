import React from 'react';
import { LanguageCode } from '../../translations/formTranslations';
import { ResumeData } from '../../types/resume';
import { formatPhoneNumber } from '../../utils/formatters/resumeFormatters';
import resumeTranslations from '../../translations/resumeTranslations';

interface Props { data: ResumeData; language: LanguageCode }

const ATSCompact: React.FC<Props> = ({ data, language }) => {
  const { personal, skills, experience } = data;
  const t = resumeTranslations[language as keyof typeof resumeTranslations];

  return (
    <div className="ats-resume ats-compact">
      <div className="ats-compact-top">
        <div>
          <h1 className="ats-name">{personal.name}</h1>
          {personal.desiredPosition && <div className="ats-desired-position">{personal.desiredPosition}</div>}
        </div>
        <div className="ats-compact-contact">
          {personal.email && <div>{t.email}: {personal.email}</div>}
          {personal.phone && <div>{t.phone}: {formatPhoneNumber(personal.phone)}</div>}
        </div>
      </div>

      {skills && skills.length > 0 && (
        <div className="ats-compact-section">
          <strong>{t.technicalSkills}:</strong> {skills.map(s => s.name).join(', ')}
        </div>
      )}

      {experience && experience.length > 0 && (
        <div className="ats-compact-section">
          <strong>{t.workExperience}:</strong>
          <ul>
            {experience.map(exp => (
              <li key={exp.id}>{exp.position} @ {exp.company}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default ATSCompact;
