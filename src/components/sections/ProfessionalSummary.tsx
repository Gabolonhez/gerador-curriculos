import React from 'react';
const ProfessionalSummary = ({
  data,
  updateData
}) => {
  return <div className="space-y-4">
      <h3 className="text-lg font-medium">Resumo Profissional</h3>
      <p className="text-gray-500">
        Escreva um breve resumo sobre sua carreira e objetivos profissionais.
      </p>
      <div>
        <textarea value={data} onChange={e => updateData(e.target.value)} rows={6} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500" placeholder="Ex: Profissional de TI com 5 anos de experiência em desenvolvimento web..." />
      </div>
    </div>;
};
export default ProfessionalSummary;