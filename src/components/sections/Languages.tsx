import React from 'react';
import { LanguageCode, formTranslations } from '../../translations/formTranslations';
import { Language } from '../../types/resume';

interface LanguagesProps {
  data: Language[];
  updateData: (data: Language[]) => void;
  language: LanguageCode;
}

const Languages: React.FC<LanguagesProps> = ({ data, updateData, language }) => {
  const t = formTranslations[language];

  const addLanguage = () => {
    updateData([
      ...data,
      {
        id: Date.now().toString(),
        name: '',
        level: 'basic'
      }
    ]);
  };

  const removeLanguage = (index: number) => {
    const newData = [...data];
    newData.splice(index, 1);
    updateData(newData);
  };

  const updateLanguage = (index: number, field: keyof Language, value: string) => {
    const newData = [...data];
    newData[index] = {
      ...newData[index],
      [field]: field === 'level' ? value as Language['level'] : value
    };
    updateData(newData);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-medium">{t.language}</h3>
        <button
          type="button"
          onClick={addLanguage}
          className="inline-flex items-center px-3 py-1 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          {t.addLanguage}
        </button>
      </div>

      {data.map((lang, index) => (
        <div key={lang.id} className="bg-gray-50 p-4 rounded-lg space-y-4">
          <div className="flex justify-between items-center">
            <h4 className="text-md font-medium">{t.language} {index + 1}</h4>
            {data.length > 1 && (
              <button
                type="button"
                onClick={() => removeLanguage(index)}
                className="text-red-600 hover:text-red-800"
              >
                {t.remove}
              </button>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                {t.language}
              </label>
              <input
                type="text"
                value={lang.name}
                onChange={(e) => updateLanguage(index, 'name', e.target.value)}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                placeholder={t.languagePlaceholder}
                title={t.language}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                {t.proficiency}
              </label>
              <select
                value={lang.level}
                onChange={(e) => updateLanguage(index, 'level', e.target.value)}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                title={t.proficiency}
              >
                <option value="basic">{t.proficiencyLevels.basic}</option>
                <option value="intermediate">{t.proficiencyLevels.intermediate}</option>
                <option value="advanced">{t.proficiencyLevels.advanced}</option>
                <option value="fluent">{t.proficiencyLevels.fluent}</option>
                <option value="native">{t.proficiencyLevels.native}</option>
              </select>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Languages; 