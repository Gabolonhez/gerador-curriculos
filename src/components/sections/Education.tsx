import React from 'react';
import { LanguageCode, formTranslations } from '../../translations/formTranslations';

interface EducationItem {
  id: string;
  institution: string;
  degree: string;
  field: string;
  startDate: string;
  endDate: string;
  current: boolean;
  description: string;
}

interface EducationProps {
  data: EducationItem[];
  updateData: (data: EducationItem[]) => void;
  language: LanguageCode;
}

const Education: React.FC<EducationProps> = ({ data, updateData, language }) => {
  const t = formTranslations[language];

  const addEducation = () => {
    updateData([
      ...data,
      {
        id: Date.now().toString(),
        institution: '',
        degree: '',
        field: '',
        startDate: '',
        endDate: '',
        current: false,
        description: ''
      }
    ]);
  };

  const removeEducation = (index: number) => {
    const newData = [...data];
    newData.splice(index, 1);
    updateData(newData);
  };

  const updateEducation = (index: number, field: keyof EducationItem, value: string | boolean) => {
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
        <h3 className="text-lg font-medium">{t.education}</h3>
        <button
          type="button"
          onClick={addEducation}
          className="inline-flex items-center px-3 py-1 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          {t.addEducation}
        </button>
      </div>

      {data.map((education, index) => (
        <div key={education.id} className="bg-gray-50 p-4 rounded-lg space-y-4">
          <div className="flex justify-between items-center">
            <h4 className="text-md font-medium">{t.education} {index + 1}</h4>
            {data.length > 1 && (
              <button
                type="button"
                onClick={() => removeEducation(index)}
                className="text-red-600 hover:text-red-800"
              >
                {t.remove}
              </button>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                {t.institution}
              </label>
              <input
                type="text"
                value={education.institution}
                onChange={(e) => updateEducation(index, 'institution', e.target.value)}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                title={t.institution}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                {t.degree}
              </label>
              <input
                type="text"
                value={education.degree}
                onChange={(e) => updateEducation(index, 'degree', e.target.value)}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                title={t.degree}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                {t.field}
              </label>
              <input
                type="text"
                value={education.field}
                onChange={(e) => updateEducation(index, 'field', e.target.value)}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                title={t.field}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                {t.startDate}
              </label>
              <input
                type="date"
                value={education.startDate}
                onChange={(e) => updateEducation(index, 'startDate', e.target.value)}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                title={t.startDate}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                {t.endDate}
              </label>
              <input
                type="date"
                value={education.endDate}
                onChange={(e) => updateEducation(index, 'endDate', e.target.value)}
                disabled={education.current}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                title={t.endDate}
              />
              <div className="mt-2">
                <label className="inline-flex items-center">
                  <input
                    type="checkbox"
                    checked={education.current}
                    onChange={(e) => updateEducation(index, 'current', e.target.checked)}
                    className="rounded border-gray-300 text-blue-600 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                  />
                  <span className="ml-2 text-sm text-gray-600">{t.inProgress}</span>
                </label>
              </div>
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              {t.description}
            </label>
            <textarea
              value={education.description}
              onChange={(e) => updateEducation(index, 'description', e.target.value)}
              rows={3}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              placeholder={t.educationDescription}
              title={t.description}
            />
          </div>
        </div>
      ))}
    </div>
  );
};

export default Education;