import React from 'react';
import { LanguageCode, formTranslations } from '../../translations/formTranslations';

interface ExperienceItem {
  id: string;
  company: string;
  position: string;
  startDate: string;
  endDate: string;
  current: boolean;
  description: string;
}

interface WorkExperienceProps {
  data: ExperienceItem[];
  updateData: (data: ExperienceItem[]) => void;
  language: LanguageCode;
}

const WorkExperience: React.FC<WorkExperienceProps> = ({ data, updateData, language }) => {
  const t = formTranslations[language];

  const addExperience = () => {
    updateData([
      ...data,
      {
        id: Date.now().toString(),
        company: '',
        position: '',
        startDate: '',
        endDate: '',
        current: false,
        description: ''
      }
    ]);
  };

  const removeExperience = (index: number) => {
    const newData = [...data];
    newData.splice(index, 1);
    updateData(newData);
  };

  const updateExperience = (index: number, field: keyof ExperienceItem, value: string | boolean) => {
    const newData = [...data];
    newData[index] = {
      ...newData[index],
      [field]: value
    };
    updateData(newData);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-medium">{t.experience}</h3>
        <button
          type="button"
          onClick={addExperience}
          className="inline-flex items-center px-3 py-1 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          {t.addExperience}
        </button>
      </div>

      {data.map((experience, index) => (
        <div key={experience.id} className="space-y-4 p-4 border border-gray-200 rounded-md">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">{t.company}</label>
              <input
                type="text"
                value={experience.company}
                onChange={(e) => updateExperience(index, 'company', e.target.value)}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                title={t.company}
                placeholder={t.company}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">{t.position}</label>
              <input
                type="text"
                value={experience.position}
                onChange={(e) => updateExperience(index, 'position', e.target.value)}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                title={t.position}
                placeholder={t.position}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">{t.startDate}</label>
              <input
                type="date"
                value={experience.startDate}
                onChange={(e) => updateExperience(index, 'startDate', e.target.value)}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                title={t.startDate}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">{t.endDate}</label>
              <input
                type="date"
                value={experience.endDate}
                onChange={(e) => updateExperience(index, 'endDate', e.target.value)}
                disabled={experience.current}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                title={t.endDate}
              />
              <div className="mt-2">
                <label className="inline-flex items-center">
                  <input
                    type="checkbox"
                    checked={experience.current}
                    onChange={(e) => updateExperience(index, 'current', e.target.checked)}
                    className="rounded border-gray-300 text-blue-600 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                  />
                  <span className="ml-2 text-sm text-gray-600">{t.current}</span>
                </label>
              </div>
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">{t.description}</label>
            <textarea
              value={experience.description}
              onChange={(e) => updateExperience(index, 'description', e.target.value)}
              rows={4}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              placeholder={t.jobDescription}
            />
          </div>
          {data.length > 1 && (
            <div className="flex justify-end">
              <button
                type="button"
                onClick={() => removeExperience(index)}
                className="inline-flex items-center px-3 py-1 border border-transparent text-sm font-medium rounded-md text-red-700 bg-red-100 hover:bg-red-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
              >
                {t.remove}
              </button>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default WorkExperience;