import React from 'react';
import { LanguageCode } from '../../translations/formTranslations';

interface Skill {
  id: string;
  name: string;
  level: string;
}

interface TechnicalSkillsProps {
  data: Skill[];
  updateData: (data: Skill[]) => void;
  language: LanguageCode;
}

const TechnicalSkills: React.FC<TechnicalSkillsProps> = ({ data, updateData, language }) => {
  const addSkill = () => {
    updateData([
      ...data,
      {
        id: Date.now().toString(),
        name: '',
        level: ''
      }
    ]);
  };

  const removeSkill = (index: number) => {
    const newData = [...data];
    newData.splice(index, 1);
    updateData(newData);
  };

  const updateSkill = (index: number, field: keyof Skill, value: string) => {
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
        <h3 className="text-lg font-medium">Habilidades Técnicas</h3>
        <button
          type="button"
          onClick={addSkill}
          className="inline-flex items-center px-3 py-1 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          Adicionar Habilidade
        </button>
      </div>

      {data.map((skill, index) => (
        <div key={skill.id} className="bg-gray-50 p-4 rounded-lg space-y-4">
          <div className="flex justify-between items-center">
            <h4 className="text-md font-medium">Habilidade {index + 1}</h4>
            {data.length > 1 && (
              <button
                type="button"
                onClick={() => removeSkill(index)}
                className="text-red-600 hover:text-red-800"
              >
                Remover
              </button>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Nome da Habilidade
              </label>
              <input
                type="text"
                value={skill.name}
                onChange={(e) => updateSkill(index, 'name', e.target.value)}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                placeholder="Ex: React.js, Python, Design UX/UI..."
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Nível
              </label>
              <select
                value={skill.level}
                onChange={(e) => updateSkill(index, 'level', e.target.value)}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="">Selecione</option>
                <option value="basic">Básico</option>
                <option value="intermediate">Intermediário</option>
                <option value="advanced">Avançado</option>
                <option value="expert">Especialista</option>
              </select>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default TechnicalSkills; 