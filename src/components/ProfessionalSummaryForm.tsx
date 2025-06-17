import React from 'react';
import { LanguageCode, formTranslations } from '../translations/formTranslations';

interface ProfessionalSummaryFormProps {
  data: string;
  updateData: (data: string) => void;
  language: LanguageCode;
}

const ProfessionalSummaryForm: React.FC<ProfessionalSummaryFormProps> = ({ data, updateData, language }) => {
  const t = formTranslations[language];

  return (
    <div>
      <h2 className="text-lg font-medium mb-4">Resumo Profissional</h2>
      <p className="text-sm text-gray-600 mb-4">
      </p>
      <div>
        <textarea
          value={data}
          onChange={(e) => updateData(e.target.value)}
          rows={6}
          className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 border p-2"
          placeholder={t.summaryPlaceholder}
        />
      </div>
    </div>
  );
};

export default ProfessionalSummaryForm;