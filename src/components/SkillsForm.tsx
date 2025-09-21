import React, { useState } from 'react';
import { PlusIcon, TrashIcon, GripVertical } from 'lucide-react';
import { LanguageCode, formTranslations } from '../translations/formTranslations';
import { Skill } from '../types/resume';

interface SkillsFormProps {
  data: Skill[];
  updateData: (data: Skill[]) => void;
  language: LanguageCode;
}

const SkillsForm: React.FC<SkillsFormProps> = ({ data, updateData, language }) => {
  const t = formTranslations[language];
  const [draggingId, setDraggingId] = useState<string | null>(null);

  const move = <T,>(arr: T[], from: number, to: number) => {
    const copy = arr.slice();
    const [item] = copy.splice(from, 1);
    copy.splice(to, 0, item);
    return copy;
  };

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
            [field]: field === 'level' ? value as Skill['level'] : value
          };
        }
        return skill;
      })
    );
  };

  return (
    <div className="space-y-6">
      <div role="list" className="space-y-3">
      {data.map(skill => (
        <div
          key={skill.id}
          className={`p-4 border rounded-lg bg-gray-50 ${draggingId === skill.id ? 'opacity-60' : ''}`}
          draggable
          onDragStart={e => {
            e.dataTransfer.effectAllowed = 'move';
            e.dataTransfer.setData('text/plain', skill.id);
            setDraggingId(skill.id);
          }}
          onDragOver={e => {
            e.preventDefault();
            e.dataTransfer.dropEffect = 'move';
          }}
          onDrop={e => {
            e.preventDefault();
            const sourceId = e.dataTransfer.getData('text/plain');
            if (!sourceId || sourceId === skill.id) {
              setDraggingId(null);
              return;
            }
            const from = data.findIndex(s => s.id === sourceId);
            const to = data.findIndex(s => s.id === skill.id);
            if (from >= 0 && to >= 0 && from !== to) {
              updateData(move(data, from, to));
            }
            setDraggingId(null);
          }}
          onDragEnd={() => setDraggingId(null)}
          role="listitem"
          tabIndex={0}
          aria-label={`${t.skill} item`}
        >
          <div className="flex justify-between items-center mb-4">
            <div className="flex items-center">
              <GripVertical className="h-5 w-5 mr-2 text-gray-400" aria-hidden />
              <h3 className="font-medium">{t.skill}</h3>
            </div>
            <button
              onMouseDown={e => e.stopPropagation()}
              onClick={e => {
                e.stopPropagation();
                removeSkill(skill.id);
              }}
              className="cursor-pointer text-red-500 hover:text-red-700"
              aria-label={t.removeSkill}
              title={t.removeSkill}
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
              <label htmlFor={`skill-level-${skill.id}`} className="block text-sm font-medium text-gray-700 mb-1">
                {t.level}
              </label>
              <select
                id={`skill-level-${skill.id}`}
                value={skill.level || ''}
                onChange={e => handleChange(skill.id, 'level', e.target.value)}
                className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 border p-2"
              >
                <option value="">{/* empty - no level selected */}</option>
                <option value="basic">{t.skillLevels.basic}</option>
                <option value="intermediate">{t.skillLevels.intermediate}</option>
                <option value="advanced">{t.skillLevels.advanced}</option>
                <option value="expert">{t.skillLevels.expert}</option>
              </select>
            </div>
          </div>
        </div>
      ))}
      </div>
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