import React from 'react';
import { TemplateKey } from '../TemplateTypes';
import { LanguageCode } from '../../translations/formTranslations';

interface Props {
  value: TemplateKey;
  onChange: (key: TemplateKey) => void;
  language: LanguageCode;
}

const labels: Record<LanguageCode, Record<TemplateKey, string> & { selectorLabel: string }> = {
  pt: {
    selectorLabel: 'Modelo',
    optimized: 'Precisão (ATS)',
    professional: 'Profissional',
    simple: 'Essencial (Minimalista)',
    twocolumn: 'Duas colunas',
  },
  en: {
    selectorLabel: 'Template',
    optimized: 'Precision (ATS)',
    professional: 'Professional',
    simple: 'Essential (Minimal)',
    twocolumn: 'Two Column',
  },
  es: {
    selectorLabel: 'Plantilla',
    optimized: 'Precisión (ATS)',
    professional: 'Profesional',
    simple: 'Esencial (Minimalista)',
    twocolumn: 'Dos columnas',
  },
};

const options: TemplateKey[] = ['optimized', 'professional', 'simple', 'twocolumn'];

const TemplateSelector: React.FC<Props> = ({ value, onChange, language }) => {
  const l = labels[language] || labels.en;

  return (
    <div className="flex flex-col items-center sm:flex-row sm:items-center sm:space-x-4 gap-3">
      <div className="text-sm font-medium pb-1 sm:pb-0 text-center dark:text-gray-300">{l.selectorLabel}:</div>
      {/* Mobile: combobox */}
      <div className="block sm:hidden w-full">
        <label htmlFor="template-select" className="sr-only">
          {l.selectorLabel}
        </label>
        <select
          id="template-select"
          className="w-full border rounded-md px-3 py-2 text-sm dark:bg-gray-800 dark:text-white dark:border-gray-600 focus:ring-2 focus:ring-blue-500"
          value={value}
          onChange={(e) => onChange(e.target.value as TemplateKey)}
          aria-label={l.selectorLabel}
        >
          {options.map((key) => (
            <option key={key} value={key}>
              {l[key]}
            </option>
          ))}
        </select>
      </div>

      {/* Desktop / larger: buttons */}
      <div className="hidden sm:flex space-x-2 items-center overflow-x-auto py-1">
        {options.map((key) => {
          const isActive = value === key;
          const buttonClass = `min-w-[110px] sm:min-w-0 whitespace-nowrap text-center px-3 py-1 text-sm rounded-md border ${isActive
              ? 'bg-indigo-50 dark:bg-indigo-900/50 border-indigo-400 dark:border-indigo-400 text-indigo-700 dark:text-indigo-200'
              : 'bg-white dark:bg-gray-800 border-transparent text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-gray-50 dark:hover:bg-gray-700'
            } focus:outline-none transition-colors duration-200`;

          return (
            <button
              key={key}
              type="button"
              onClick={() => onChange(key)}
              className={buttonClass}
              aria-pressed={isActive}
              aria-label={l[key]}
            >
              {l[key]}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default TemplateSelector;

