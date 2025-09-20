import React, { useState } from 'react';
import { PlusIcon, TrashIcon, GripVertical } from 'lucide-react';
import { LanguageCode, formTranslations } from '../translations/formTranslations';

interface Education {
  id: string;
  institution: string;
  degree: string;
  field: string;
  startDate: string;
  endDate: string;
  current: boolean;
  description: string;
}

interface EducationFormProps {
  data: Education[];
  updateData: (data: Education[]) => void;
  language: LanguageCode;
}

const EducationForm: React.FC<EducationFormProps> = ({ data, updateData, language }) => {
  const t = formTranslations[language];
  const [draggingId, setDraggingId] = useState<string | null>(null);

  const move = <T,>(arr: T[], from: number, to: number) => {
    const copy = arr.slice();
    const [item] = copy.splice(from, 1);
    copy.splice(to, 0, item);
    return copy;
  };

  const addEducation = () => {
    const newEducation: Education = {
      id: Date.now().toString(),
      institution: '',
      degree: '',
      field: '',
      startDate: '',
      endDate: '',
      current: false,
      description: ''
    };
    updateData([...data, newEducation]);
  };

  const removeEducation = (id: string) => {
    updateData(data.filter(edu => edu.id !== id));
  };

  const handleChange = (id: string, field: keyof Education, value: string | boolean) => {
    updateData(
      data.map(edu => {
        if (edu.id === id) {
          return {
            ...edu,
            [field]: value,
            ...(field === 'current' && value === true ? { endDate: '' } : {})
          };
        }
        return edu;
      })
    );
  };

  return (
    <div className="space-y-6">
      <div role="list" className="space-y-3">
        {data.map(edu => (
          <div
            key={edu.id}
            className={`p-4 border rounded-lg bg-gray-50 ${draggingId === edu.id ? 'opacity-60' : ''}`}
            draggable
            onDragStart={e => {
              e.dataTransfer.effectAllowed = 'move';
              e.dataTransfer.setData('text/plain', edu.id);
              setDraggingId(edu.id);
            }}
            onDragOver={e => {
              e.preventDefault();
              e.dataTransfer.dropEffect = 'move';
            }}
            onDrop={e => {
              e.preventDefault();
              const sourceId = e.dataTransfer.getData('text/plain');
              if (!sourceId || sourceId === edu.id) {
                setDraggingId(null);
                return;
              }
              const from = data.findIndex(d => d.id === sourceId);
              const to = data.findIndex(d => d.id === edu.id);
              if (from >= 0 && to >= 0 && from !== to) {
                updateData(move(data, from, to));
              }
              setDraggingId(null);
            }}
            onDragEnd={() => setDraggingId(null)}
            role="listitem"
            tabIndex={0}
            aria-label={`${t.education} item`}
          >
          <div className="flex justify-between items-center mb-4">
            <div className="flex items-center">
              <GripVertical className="h-5 w-5 mr-2 text-gray-400" aria-hidden />
              <h3 className="font-medium">{t.education}</h3>
            </div>
            <button
              onMouseDown={e => e.stopPropagation()}
              onClick={e => {
                e.stopPropagation();
                removeEducation(edu.id)}
              } 
              className="cursor-pointer text-red-500 hover:text-red-700"
              aria-label={t.remove}
              title={t.remove}
            >
              <TrashIcon className="h-5 w-5" />
            </button>
          </div>
          <div className="grid grid-cols-1 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                {t.institution}
              </label>
              <input
                type="text"
                value={edu.institution}
                onChange={e => handleChange(edu.id, 'institution', e.target.value)}
                className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 border p-2"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                {t.degree}
              </label>
              <select
                value={edu.degree}
                onChange={e => handleChange(edu.id, 'degree', e.target.value)}
                className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 border p-2"
              >
                <option value="highSchool">{t.degreeOptions.highSchool}</option>
                <option value="technical">{t.degreeOptions.technical}</option>
                <option value="bachelor">{t.degreeOptions.bachelor}</option>
                <option value="postgraduate">{t.degreeOptions.postgraduate}</option>
                <option value="master">{t.degreeOptions.master}</option>
                <option value="doctorate">{t.degreeOptions.doctorate}</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                {t.field}
              </label>
              <input
                type="text"
                value={edu.field}
                onChange={e => handleChange(edu.id, 'field', e.target.value)}
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
                  value={edu.startDate}
                  onChange={e => handleChange(edu.id, 'startDate', e.target.value)}
                  className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 border p-2"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  {t.endDate}
                </label>
                <input
                  type="month"
                  value={edu.endDate}
                  onChange={e => handleChange(edu.id, 'endDate', e.target.value)}
                  className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 border p-2"
                  disabled={edu.current}
                />
              </div>
            </div>
            <div>
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={edu.current}
                  onChange={e => handleChange(edu.id, 'current', e.target.checked)}
                  className="rounded border-gray-300 text-blue-600 shadow-sm focus:border-blue-500 focus:ring-blue-500 mr-2"
                />
                <span className="text-sm text-gray-700">{t.inProgress}</span>
              </label>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                {t.description}
              </label>
              <textarea
                value={edu.description}
                onChange={e => handleChange(edu.id, 'description', e.target.value)}
                rows={3}
                className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 border p-2"
                placeholder={t.educationDescription}
              />
            </div>
          </div>
        </div>
        ))}
      </div>
      <button
        type="button"
        onClick={addEducation}
        className="flex items-center justify-center w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
      >
        <PlusIcon className="h-5 w-5 mr-2" />
        {t.addEducation}
      </button>
    </div>
  );
};

export default EducationForm;