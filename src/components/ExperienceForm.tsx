import React from 'react';
import { PlusIcon, TrashIcon } from 'lucide-react';
import { LanguageCode, formTranslations } from '../translations/formTranslations';

interface Experience {
  id: string;
  company: string;
  position: string;
  startDate: string;
  endDate: string;
  current: boolean;
  description: string;
}

interface ExperienceFormProps {
  data: Experience[];
  updateData: (data: Experience[]) => void;
  language: LanguageCode;
}

const ExperienceForm: React.FC<ExperienceFormProps> = ({ data, updateData, language }) => {
  const t = formTranslations[language];

  const addExperience = () => {
    const newExperience: Experience = {
      id: Date.now().toString(),
      company: '',
      position: '',
      startDate: '',
      endDate: '',
      current: false,
      description: ''
    };
    updateData([...data, newExperience]);
  };

  const removeExperience = (id: string) => {
    updateData(data.filter(exp => exp.id !== id));
  };

  const handleChange = (id: string, field: keyof Experience, value: string | boolean) => {
    updateData(
      data.map(exp => {
        if (exp.id === id) {
          return {
            ...exp,
            [field]: value,
            ...(field === 'current' && value === true ? { endDate: '' } : {})
          };
        }
        return exp;
      })
    );
  };

  return (
    <div className="space-y-6">
      {data.map(exp => (
        <div key={exp.id} className="p-4 border rounded-lg bg-gray-50">
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-medium">{t.experience}</h3>
            <button
              onClick={() => removeExperience(exp.id)}
              className="cursor-pointer text-red-500 hover:text-red-700"
              disabled={data.length <= 1}
            >
              <TrashIcon className="h-5 w-5" />
            </button>
          </div>
          <div className="grid grid-cols-1 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                {t.company}
              </label>
              <input
                type="text"
                value={exp.company}
                onChange={e => handleChange(exp.id, 'company', e.target.value)}
                className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 border p-2"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                {t.position}
              </label>
              <input
                type="text"
                value={exp.position}
                onChange={e => handleChange(exp.id, 'position', e.target.value)}
                className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 border p-2"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  {t.startDate}
                </label>
                <input
                  type="month"
                  value={exp.startDate}
                  onChange={e => handleChange(exp.id, 'startDate', e.target.value)}
                  className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 border p-2"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  {t.endDate}
                </label>
                <input
                  type="month"
                  value={exp.endDate}
                  onChange={e => handleChange(exp.id, 'endDate', e.target.value)}
                  className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 border p-2"
                  disabled={exp.current}
                />
              </div>
            </div>
            <div>
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={exp.current}
                  onChange={e => handleChange(exp.id, 'current', e.target.checked)}
                  className="rounded border-gray-300 text-blue-600 shadow-sm focus:border-blue-500 focus:ring-blue-500 mr-2"
                />
                <span className="text-sm text-gray-700">{t.current}</span>
              </label>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                {t.description}
              </label>
              <textarea
                value={exp.description}
                onChange={e => handleChange(exp.id, 'description', e.target.value)}
                rows={3}
                className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 border p-2"
                placeholder={t.jobDescription}
              />
            </div>
          </div>
        </div>
      ))}
      <button
        type="button"
        onClick={addExperience}
        className="flex items-center justify-center w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
      >
        <PlusIcon className="h-5 w-5 mr-2" />
        {t.addExperience}
      </button>
    </div>
  );
};

export default ExperienceForm;