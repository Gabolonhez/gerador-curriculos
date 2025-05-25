import React from 'react';
import { LanguageCode, formTranslations } from '../../translations/formTranslations';

interface ProfessionalSummaryProps {
  data: string;
  updateData: (data: string) => void;
  language: LanguageCode;
}

const ProfessionalSummary: React.FC<ProfessionalSummaryProps> = ({ data, updateData, language }) => {
  const t = formTranslations[language];

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-medium">{t.summary}</h3>
      <p className="text-gray-500">
        {t.summaryPlaceholder}
      </p>
      <div>
        <textarea 
          value={data} 
          onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => updateData(e.target.value)} 
          rows={6} 
          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500" 
          placeholder={t.summaryPlaceholder}
          title={t.summary}
        />
      </div>
    </div>
  );
};

export default ProfessionalSummary;