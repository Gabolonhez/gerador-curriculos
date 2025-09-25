import React from 'react';
import { ResumeData } from '../../types/resume';
import { LanguageCode } from '../../translations/formTranslations';
import resumeTranslations from '../../translations/resumeTranslations';
import { formTranslations } from '../../translations/formTranslations';
import { formatDateRange } from '../../utils/formatters/resumeFormatters';
import '../../styles/ats-resume.css';

type Props = { data: ResumeData; language: LanguageCode };

const ATSProfessional: React.FC<Props> = ({ data, language }) => {
  const t = resumeTranslations[language as keyof typeof resumeTranslations];
  const { personal, summary, skills = [], experience = [], education = [], certifications = [], projects = [] } = data;

  const joinSkills = () => skills.map(s => s.name).join(', ');

  const formT = formTranslations[language as keyof typeof formTranslations];

  return (
    <div className="ats-resume ats-professional">
      <header className="prof-header">
        <h1 className="prof-name">{personal?.name}</h1>
        <div className="prof-subline">
          {personal.phone && <span>{formT.phone}: {personal.phone}</span>}
          {personal.email && <span> — {formT.email}: <a href={`mailto:${personal.email}`}>{personal.email}</a></span>}
          {personal.github && <span> — {formT.github || 'Github'}: {personal.github}</span>}
        </div>
      </header>

      {summary && (
        <section className="prof-section">
          <h3>{t.professionalSummary}</h3>
          <ul>
            {summary.split('\n').map((ln, i) => ln.trim() ? <li key={i}>{ln}</li> : null)}
          </ul>
        </section>
      )}

      {skills.length > 0 && (
        <section className="prof-section">
          <h3>{t.technicalSkills || t.skills}</h3>
          <div className="prof-skills">{joinSkills()}</div>
        </section>
      )}

      {experience.length > 0 && (
        <section className="prof-section">
          <h3>{t.workExperience}</h3>
          {experience.map((exp) => (
            <div key={exp.id} className="prof-exp">
              <strong>{exp.company} ({formatDateRange(exp.startDate, exp.endDate, exp.current, language)})</strong>
              <div className="prof-exp-title">{exp.position}</div>
              {exp.description && (
                <ul>
                  {exp.description.split('\n').map((ln, i) => ln.trim() ? <li key={i}>{ln}</li> : null)}
                </ul>
              )}
            </div>
          ))}
        </section>
      )}

      {education.length > 0 && (
        <section className="prof-section">
          <h3>{t.education}</h3>
          {education.map((edu) => (
            <div key={edu.id} className="prof-edu">
              <strong>{edu.institution}</strong>
              <div>{t.degreeIn} {edu.field} — {formatDateRange(edu.startDate, edu.endDate, edu.current, language)}</div>
            </div>
          ))}
        </section>
      )}

      {certifications.length > 0 && (
        <section className="prof-section">
          <h3>{t.certifications}</h3>
          <ul>
            {certifications.map((c) => <li key={c.id}>{c.name}{c.issuer ? ` — ${c.issuer}` : ''}</li>)}
          </ul>
        </section>
      )}

      {projects.length > 0 && (
        <section className="prof-section">
          <h3>{t.projects}</h3>
          {projects.map((project) => (
            <div key={project.id} className="prof-project">
              <div className="prof-project-header">
                <strong>{project.name}</strong>
                <span className="prof-date">{formatDateRange(project.startDate, project.endDate, project.current, language)}</span>
              </div>
              {project.description && <div className="prof-desc">{project.description}</div>}
              {project.technologies && <div className="prof-tech"><strong>{t.technologies}:</strong> {project.technologies}</div>}
              {project.link && <div className="prof-link"><a href={project.link.startsWith('http') ? project.link : `https://${project.link}`} target="_blank" rel="noopener noreferrer">{project.link}</a></div>}
            </div>
          ))}
        </section>
      )}
    </div>
  );
};

export default ATSProfessional;
