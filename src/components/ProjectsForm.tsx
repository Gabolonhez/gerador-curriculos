import React, { useState } from 'react';
import { PlusIcon, TrashIcon, GripVertical } from 'lucide-react';
import { LanguageCode, formTranslations } from '../translations/formTranslations';

interface Project {
  id: string;
  name: string;
  description: string;
  technologies: string;
  link?: string;
  startDate: string;
  endDate: string;
  current: boolean;
}

interface ProjectsFormProps {
  data: Project[];
  updateData: (data: Project[]) => void;
  language: LanguageCode;
}

const ProjectsForm: React.FC<ProjectsFormProps> = ({ data, updateData, language }) => {
  const t = formTranslations[language];
  const [draggingId, setDraggingId] = useState<string | null>(null);

  const move = <T,>(arr: T[], from: number, to: number) => {
    const copy = arr.slice();
    const [item] = copy.splice(from, 1);
    copy.splice(to, 0, item);
    return copy;
  };

  const addProject = () => {
    const newProject: Project = {
      id: Date.now().toString(),
      name: '',
      description: '',
      technologies: '',
      link: '',
      startDate: '',
      endDate: '',
      current: false
    };
    updateData([...data, newProject]);
  };

  const removeProject = (id: string) => {
    updateData(data.filter(project => project.id !== id));
  };

  const handleChange = (id: string, field: keyof Project, value: string | boolean) => {
    updateData(
      data.map(project => {
        if (project.id === id) {
          return {
            ...project,
            [field]: value
          };
        }
        return project;
      })
    );
  };

  return (
    <div className="space-y-6">
      <div role="list" className="space-y-3">
        {data.map(project => (
          <div
            key={project.id}
            className={`p-4 border rounded-lg bg-gray-50 ${draggingId === project.id ? 'opacity-60' : ''}`}
            draggable
            onDragStart={e => {
              e.dataTransfer.effectAllowed = 'move';
              e.dataTransfer.setData('text/plain', project.id);
              setDraggingId(project.id);
            }}
            onDragOver={e => {
              e.preventDefault();
              e.dataTransfer.dropEffect = 'move';
            }}
            onDrop={e => {
              e.preventDefault();
              const sourceId = e.dataTransfer.getData('text/plain');
              if (!sourceId || sourceId === project.id) {
                setDraggingId(null);
                return;
              }
              const from = data.findIndex(p => p.id === sourceId);
              const to = data.findIndex(p => p.id === project.id);
              if (from >= 0 && to >= 0 && from !== to) {
                updateData(move(data, from, to));
              }
              setDraggingId(null);
            }}
            onDragEnd={() => setDraggingId(null)}
            role="listitem"
            tabIndex={0}
            aria-label={`${t.project} item`}
          >
            <div className="flex justify-between items-center mb-4">
              <div className="flex items-center">
                <GripVertical className="h-5 w-5 mr-2 text-gray-400" aria-hidden />
                <h3 className="font-medium">{t.project}</h3>
              </div>
              <button
                onMouseDown={e => e.stopPropagation()}
                onClick={e => {
                  e.stopPropagation();
                  removeProject(project.id);
                }}
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
                  {t.projectName}
                </label>
                <input
                  type="text"
                  value={project.name}
                  onChange={e => handleChange(project.id, 'name', e.target.value)}
                  className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 border p-2"
                  placeholder={t.projectPlaceholder}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  {t.projectDescription}
                </label>
                <textarea
                  value={project.description}
                  onChange={e => handleChange(project.id, 'description', e.target.value)}
                  rows={3}
                  className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 border p-2"
                  placeholder={t.projectDescriptionPlaceholder}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  {t.technologies}
                </label>
                <input
                  type="text"
                  value={project.technologies}
                  onChange={e => handleChange(project.id, 'technologies', e.target.value)}
                  className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 border p-2"
                  placeholder={t.technologiesPlaceholder}
                />
              </div>   
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  {t.projectLink}
                </label>
                <input
                  type="url"
                  value={project.link}
                  onChange={e => handleChange(project.id, 'link', e.target.value)}
                  className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 border p-2"
                  placeholder={t.projectLinkPlaceholder}
                />
              </div>
            </div>
          </div>
        ))}
      </div>
      <button
        type="button"
        onClick={addProject}
        className="flex items-center justify-center w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
      >
        <PlusIcon className="h-5 w-5 mr-2" />
        {t.addProject}
      </button>
    </div>
  );
};

export default ProjectsForm;