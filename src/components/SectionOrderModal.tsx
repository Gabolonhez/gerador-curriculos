import React, { useState } from 'react';
import { X, GripVertical } from 'lucide-react';
import resumeTranslations from '../translations/resumeTranslations';

interface Props {
  open: boolean;
  onClose: () => void;
  order: string[];
  onChange: (order: string[]) => void;
  title?: string;
  language?: 'pt' | 'en' | 'es';
  doneLabel?: string;
}

const SectionOrderModal: React.FC<Props> = ({ open, onClose, order, onChange, title, language = 'pt', doneLabel }) => {
  const [dragIndex, setDragIndex] = useState<number | null>(null);
  const [localOrder, setLocalOrder] = useState<string[]>(order || []);

  React.useEffect(() => {
    setLocalOrder(order || []);
  }, [order]);

  const handleDragStart = (e: React.DragEvent, idx: number) => {
    setDragIndex(idx);
    e.dataTransfer.effectAllowed = 'move';
    try {
      e.dataTransfer.setData('text/plain', String(idx));
    } catch (err) {
      // some browsers may throw when setting drag data
    }
  };

  const handleDragOver = (e: React.DragEvent, idx: number) => {
    e.preventDefault();
    if (dragIndex === null || dragIndex === idx) return;
    // move placeholder in localOrder
    const copy = localOrder.slice();
    const [item] = copy.splice(dragIndex, 1);
    copy.splice(idx, 0, item);
    setDragIndex(idx);
    setLocalOrder(copy);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragIndex(null);
    onChange && onChange(localOrder);
  };

  const handleDragEnd = () => {
    setDragIndex(null);
    // ensure parent gets final order
    onChange && onChange(localOrder);
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black opacity-30" onClick={onClose} />
      <div className="relative bg-white dark:bg-gray-800 rounded-lg shadow-lg w-full max-w-lg p-4">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-medium dark:text-white">{title || 'Order Sections'}</h3>
          <button onClick={onClose} className="p-1 text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200" title={title || 'Close'}><X /></button>
        </div>
        <div className="space-y-2" role="list" aria-label={title || 'Order Sections'}>
          {localOrder.map((s, i) => {
            const labels = resumeTranslations[language as keyof typeof resumeTranslations] || resumeTranslations.pt;
            const mapLabel = (key: string) => {
              switch (key) {
                case 'summary':
                  return labels.professionalSummary;
                case 'experience':
                  return labels.workExperience;
                case 'education':
                  return labels.education;
                case 'skills':
                  return labels.skills || labels.technicalSkills;
                case 'languages':
                  return labels.languages;
                case 'certifications':
                  return labels.certifications;
                case 'projects':
                  return labels.projects;
                default:
                  return key;
              }
            };

            return (
              <div
                key={s}
                className="flex items-center justify-between border dark:border-gray-700 rounded px-3 py-2 bg-white dark:bg-gray-700/50 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                draggable
                onDragStart={(e) => handleDragStart(e, i)}
                onDragOver={(e) => handleDragOver(e, i)}
                onDrop={handleDrop}
                onDragEnd={handleDragEnd}
                role="listitem"
              >
                <div className="flex items-center space-x-3">
                  <GripVertical className="w-4 h-4 text-gray-500 dark:text-gray-400 cursor-grab" />
                  <div className="text-sm text-gray-800 dark:text-gray-200">{mapLabel(s)}</div>
                </div>
              </div>
            );
          })}
        </div>
        <div className="mt-4 flex justify-end">
          <button onClick={onClose} className="px-3 py-2 bg-blue-600 text-white rounded">{doneLabel || 'Done'}</button>
        </div>
      </div>
    </div>
  );
};

export default SectionOrderModal;
