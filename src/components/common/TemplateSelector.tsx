import React from 'react';
import { TemplateKey } from '../../components/ResumePreview';
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
    compact: 'Resumo (Compacto)',
    simple: 'Essencial (Minimal)'
  },
  en: {
    selectorLabel: 'Template',
    optimized: 'Precision (ATS)',
    compact: 'Snapshot (Compact)',
    simple: 'Minimal (Essential)'
  },
  es: {
    selectorLabel: 'Plantilla',
    optimized: 'Precisión (ATS)',
    compact: 'Resumen (Compacto)',
    simple: 'Esencial (Minimal)'
  }
};

const TemplateSelector: React.FC<Props> = ({ value, onChange, language }) => {
  const l = labels[language];

  return (
    <div className="flex items-center space-x-2">
      <label htmlFor="template-select" className="text-sm font-medium">{l.selectorLabel}:</label>
      <select
        id="template-select"
        aria-label="Select resume template"
        value={value}
        onChange={(e) => onChange(e.target.value as TemplateKey)}
        className="px-2 py-1 border rounded-md bg-white"
      >
        <option value="optimized">{l.optimized}</option>
        <option value="compact">{l.compact}</option>
        <option value="simple">{l.simple}</option>
      </select>
    </div>
  );
};

export default TemplateSelector;
