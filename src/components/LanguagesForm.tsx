import React, { useState } from 'react';
import { PlusIcon, TrashIcon, GripVertical } from 'lucide-react';
import { LanguageCode, formTranslations } from '../translations/formTranslations';
import { Language } from '../types/resume';

interface LanguagesFormProps {
  data: Language[];
  updateData: (data: Language[]) => void;
  language: LanguageCode;
}

const LanguagesForm: React.FC<LanguagesFormProps> = ({ data, updateData, language }) => {
  const t = formTranslations[language];
  const [draggingId, setDraggingId] = useState<string | null>(null);

  const move = <T,>(arr: T[], from: number, to: number) => {
    const copy = arr.slice();
    const [item] = copy.splice(from, 1);
    copy.splice(to, 0, item);
    return copy;
  };

  const addLanguage = () => {
    const newLanguage: Language = {
      id: Date.now().toString(),
      name: '',
      level: 'basic'
    };
    updateData([...data, newLanguage]);
  };

  const removeLanguage = (id: string) => {
    updateData(data.filter(lang => lang.id !== id));
  };

  const handleChange = (id: string, field: keyof Language, value: string) => {
    updateData(
      data.map(lang => {
        if (lang.id === id) {
          return {
            ...lang,
            [field]: field === 'level' ? value as Language['level'] : value
          };
        }
        return lang;
      })
    );
  };

  return (
    <div className="space-y-6">
      <div role="list" className="space-y-3">
        {data.map(lang => (
          <div
            key={lang.id}
            className={`p-4 border rounded-lg bg-gray-50 ${draggingId === lang.id ? 'opacity-60' : ''}`}
            draggable
            onDragStart={e => {
              e.dataTransfer.effectAllowed = 'move';
              e.dataTransfer.setData('text/plain', lang.id);
              setDraggingId(lang.id);
            }}
            onDragOver={e => {
              e.preventDefault();
              e.dataTransfer.dropEffect = 'move';
            }}
            onDrop={e => {
              e.preventDefault();
              const sourceId = e.dataTransfer.getData('text/plain');
              if (!sourceId || sourceId === lang.id) {
                setDraggingId(null);
                return;
              }
              const from = data.findIndex(l => l.id === sourceId);
              const to = data.findIndex(l => l.id === lang.id);
              if (from >= 0 && to >= 0 && from !== to) {
                updateData(move(data, from, to));
              }
              setDraggingId(null);
            }}
            onDragEnd={() => setDraggingId(null)}
            role="listitem"
            tabIndex={0}
            aria-label={`${t.language} item`}
          >
          <div className="flex justify-between items-center mb-4">
            <div className="flex items-center">
              <GripVertical className="h-5 w-5 mr-2 text-gray-400" aria-hidden />
              <h3 className="font-medium">{t.language}</h3>
            </div>
            <button
              onMouseDown={e => e.stopPropagation()}
              onClick={e => {
                e.stopPropagation();
                removeLanguage(lang.id)}
              } 
              className="cursor-pointer text-red-500 hover:text-red-700"
              aria-label={t.removeLanguage}
            >
              <TrashIcon className="h-5 w-5" />
            </button>
          </div>
          <div className="grid grid-cols-1 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                {t.language}
              </label>
              <input
                type="text"
                value={lang.name}
                onChange={e => handleChange(lang.id, 'name', e.target.value)}
                className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 border p-2"
                placeholder={t.languagePlaceholder}
              />
            </div>
            <div>
              <label htmlFor={`language-level-${lang.id}`} className="block text-sm font-medium text-gray-700 mb-1">
                {t.proficiency}
              </label>
              <select
                id={`language-level-${lang.id}`}
                value={lang.level}
                onChange={e => handleChange(lang.id, 'level', e.target.value)}
                className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 border p-2"
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
      <button
        type="button"
        onClick={addLanguage}
        className="flex items-center justify-center w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
      >
        <PlusIcon className="h-5 w-5 mr-2" />
        {t.addLanguage}
      </button>
    </div>
  );
};

export default LanguagesForm;