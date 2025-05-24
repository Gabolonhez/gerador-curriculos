import React from 'react';
import { PlusIcon, TrashIcon } from 'lucide-react';
import { LanguageCode, formTranslations } from '../translations/formTranslations';

interface Skill {
  id: string;
  name: string;
  level: string;
}

interface SkillsFormProps {
  data: Skill[];
  updateData: (data: Skill[]) => void;
  language: LanguageCode;
}

const SkillsForm: React.FC<SkillsFormProps> = ({ data, updateData, language }) => {
  const t = formTranslations[language];

  const addSkill = () => {
    const newSkill: Skill = {
      id: Date.now().toString(),
      name: '',
      level: ''
    };
    updateData([...data, newSkill]);
  };

  const removeSkill = (id: string) => {
    updateData(data.filter(skill => skill.id !== id));
  };

  const handleChange = (id: string, field: keyof Skill, value: string) => {
    updateData(
      data.map(skill => {
        if (skill.id === id) {
          return {
            ...skill,
            [field]: value
          };
        }
        return skill;
      })
    );
  };

  return (
    <div className="space-y-6">
      {data.map(skill => (
        <div key={skill.id} className="p-4 border rounded-lg bg-gray-50">
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-medium">{t.skill}</h3>
            <button
              onClick={() => removeSkill(skill.id)}
              className="cursor-pointer text-red-500 hover:text-red-700"
              disabled={data.length <= 1}
            >
              <TrashIcon className="h-5 w-5" />
            </button>
          </div>
          <div className="grid grid-cols-1 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                {t.skill}
              </label>
              <input
                type="text"
                value={skill.name}
                onChange={e => handleChange(skill.id, 'name', e.target.value)}
                className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 border p-2"
                placeholder={t.skillPlaceholder}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                {t.level}
              </label>
              <select
                value={skill.level}
                onChange={e => handleChange(skill.id, 'level', e.target.value)}
                className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 border p-2"
              >
                <option value="basic">{t.skillLevels.basic}</option>
                <option value="intermediate">{t.skillLevels.intermediate}</option>
                <option value="advanced">{t.skillLevels.advanced}</option>
              </select>
            </div>
          </div>
        </div>
      ))}
      <button
        type="button"
        onClick={addSkill}
        className="flex items-center justify-center w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
      >
        <PlusIcon className="h-5 w-5 mr-2" />
        {t.addSkill}
      </button>
    </div>
  );
};

export default SkillsForm;