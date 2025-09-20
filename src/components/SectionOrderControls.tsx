import React from 'react';
import { ArrowUp, ArrowDown } from 'lucide-react';

interface Props {
  order?: string[];
  onChange: (order: string[]) => void;
  translations?: any;
}

const defaultOrder = ['summary', 'skills', 'experience', 'education', 'languages', 'certifications'];

const displayShortLabel: Record<string, string> = {
  summary: 'summary',
  skills: 'skills',
  experience: 'experience',
  education: 'education',
  languages: 'languages',
  certifications: 'certifications'
};

const SectionOrderControls: React.FC<Props> = ({ order = defaultOrder, onChange }) => {
  const move = (arr: string[], idx: number, dir: -1 | 1) => {
    const copy = arr.slice();
    const target = idx + dir;
    if (target < 0 || target >= arr.length) return arr;
    const [item] = copy.splice(idx, 1);
    copy.splice(target, 0, item);
    return copy;
  };

  return (
    <div className="w-full">
      <div className="flex items-center space-x-2 overflow-x-auto py-1">
        {order.map((s, i) => (
          <div key={s} className="flex items-center space-x-1 flex-shrink-0 bg-gray-50 px-2 py-1 rounded text-xs mr-2">
            <span className="text-xs text-gray-700 mr-1 whitespace-nowrap">{displayShortLabel[s] || s}</span>
            <button
              type="button"
              onClick={() => onChange(move(order, i, -1))}
              className="p-1 text-gray-600 hover:text-gray-900"
              aria-label={`Move ${s} up`}
              title={`Move ${s} up`}
            >
              <ArrowUp className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={() => onChange(move(order, i, 1))}
              className="p-1 text-gray-600 hover:text-gray-900"
              aria-label={`Move ${s} down`}
              title={`Move ${s} down`}
            >
              <ArrowDown className="w-4 h-4" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SectionOrderControls;
