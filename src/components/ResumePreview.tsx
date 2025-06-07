import React from 'react';
import { PhoneIcon, MailIcon, MapPinIcon, GlobeIcon, LinkedinIcon, GithubIcon } from 'lucide-react';
import { LanguageCode } from '../translations/formTranslations';
import { ResumeData } from '../types/resume';

interface ResumePreviewProps {
  data: ResumeData;
  language: LanguageCode;
}

const translations = {
  pt: {
    professionalSummary: 'Resumo Profissional',
    workExperience: 'Experiência Profissional',
    education: 'Formação Acadêmica',
    technicalSkills: 'Habilidades Técnicas',
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
    technicalSkills: 'Technical Skills',
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
      {/* Header / Personal Info */}
      <header className="mb-8 border-b pb-6">
        <h1 
          className="text-3xl font-bold mb-4 text-gray-900"
          itemProp="name"
        >
          {personal.name}
        </h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm mb-4">
          {personal.phone && (
            <div className="flex items-center gap-2" itemProp="telephone">
              <PhoneIcon className="h-4 w-4 text-gray-500"/>
              <span style={{ marginLeft: 8 }}>{personal.phone}</span>
            </div>
          )}
          {personal.email && (
            <div className="flex items-center gap-2" itemProp="email">
              <MailIcon className="h-4 w-4 text-gray-500 " />
              <span style={{ marginLeft: 8 }}>{personal.email}</span>
            </div>
          )}
          {personal.address && (
            <div className="flex items-center gap-2" itemProp="address">
              <MapPinIcon className="h-4 w-4 text-gray-500" />
               <span style={{ marginLeft: 8 }}>{personal.address}</span>
            </div>
          )}
          {personal.website && (
            <div className="flex items-center gap-2" itemProp="url">
              <GlobeIcon className="h-4 w-4 text-gray-500" />
              <a
                  href={personal.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ marginLeft: 8 }}
                  className="hover:text-blue-600"
                >
                  {personal.website}
              </a>
            </div>
          )}
        </div>
        <div className="flex flex-wrap gap-4 text-sm">
          {personal.linkedin && (
            <div className="flex items-center gap-2">
              <LinkedinIcon className="h-4 w-4 text-gray-500" />
              <a style={{ marginLeft: 8 }} href={personal.linkedin} target="_blank" rel="noopener noreferrer" className="hover:text-blue-600">
                LinkedIn
              </a>
            </div>
          )}
          {personal.github && (
            <div className="flex items-center gap-2">
              <GithubIcon className="h-4 w-4 text-gray-500" />
              <a style={{ marginLeft: 8 }} href={personal.github} target="_blank" rel="noopener noreferrer" className="hover:text-blue-600">
                GitHub
              </a>
            </div>
          )}
        </div>
      </header>

      {/* Professional Summary */}
      {summary && (
        <section className="mb-8 section" itemProp="description">
          <h2 className="text-xl font-semibold mb-3 text-gray-900 border-b pb-2">
            {t.professionalSummary}
          </h2>
          <p className="text-base text-gray-700 whitespace-pre-wrap">{summary}</p>
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

      {/* Skills and Languages in two columns */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 mb-8">
        {/* Technical Skills */}
        {skills && skills.length > 0 && (
          <section className="section">
            <h2 className="text-xl font-semibold mb-4 text-gray-900 border-b pb-2">
              {t.technicalSkills}
            </h2>
            <div className="space-y-2">
              {skills.map((skill) => (
                 <div 
    key={skill.id} 
    className="flex justify-between items-center"
    itemProp="knowsAbout"
  >
    <span className="text-base text-gray-700">{skill.name}</span> <span>-</span>
    <span className="text-sm text-gray-600 bg-gray-100 px-2 py-1 rounded" style={{ marginLeft: 8 }}>
      {t.skillLevels[skill.level as keyof typeof t.skillLevels]}
    </span>
  </div>
              ))}
            </div>
          </section>
        )}

        {/* Languages */}
        {languageSkills && languageSkills.length > 0 && (
          <section className="section">
            <h2 className="text-xl font-semibold mb-4 text-gray-900 border-b pb-2">
              {t.languages}
            </h2>
            <div className="space-y-2">
              {languageSkills.map((lang) => (
                <div 
                  key={lang.id} 
                  className="flex justify-between items-center"
                  itemProp="knowsLanguage"
                >
                  <span className="text-base text-gray-700">{lang.name}</span> <span>-</span>
                  <span className="text-sm text-gray-600 bg-gray-100 px-2 py-1 rounded" style={{ marginLeft: 8 }}>
                    {t.proficiencyLevels[lang.level as keyof typeof t.proficiencyLevels]}
                  </span>
                </div>
              ))}
            </div>
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