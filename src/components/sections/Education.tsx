import React from 'react';
const Education = ({
  data,
  updateData
}) => {
  const addEducation = () => {
    updateData([...data, {
      institution: '',
      degree: '',
      field: '',
      startDate: '',
      endDate: ''
    }]);
  };
  const removeEducation = index => {
    const newData = [...data];
    newData.splice(index, 1);
    updateData(newData);
  };
  const updateEducation = (index, field, value) => {
    const newData = [...data];
    newData[index][field] = value;
    updateData(newData);
  };
  return <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-medium">Formação Acadêmica</h3>
        <button type="button" onClick={addEducation} className="inline-flex items-center px-3 py-1 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
          Adicionar Formação
        </button>
      </div>
      {data.map((education, index) => <div key={index} className="bg-gray-50 p-4 rounded-lg space-y-4">
          <div className="flex justify-between items-center">
            <h4 className="text-md font-medium">Formação {index + 1}</h4>
            {data.length > 1 && <button type="button" onClick={() => removeEducation(index)} className="text-red-600 hover:text-red-800">
                Remover
              </button>}
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Instituição
              </label>
              <input type="text" value={education.institution} onChange={e => updateEducation(index, 'institution', e.target.value)} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Grau
              </label>
              <select value={education.degree} onChange={e => updateEducation(index, 'degree', e.target.value)} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500">
                <option value="">Selecione</option>
                <option value="Ensino Médio">Ensino Médio</option>
                <option value="Técnico">Técnico</option>
                <option value="Graduação">Graduação</option>
                <option value="Pós-Graduação">Pós-Graduação</option>
                <option value="Mestrado">Mestrado</option>
                <option value="Doutorado">Doutorado</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Área de Estudo
              </label>
              <input type="text" value={education.field} onChange={e => updateEducation(index, 'field', e.target.value)} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500" />
            </div>
            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Início
                </label>
                <input type="date" value={education.startDate} onChange={e => updateEducation(index, 'startDate', e.target.value)} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Término
                </label>
                <input type="date" value={education.endDate} onChange={e => updateEducation(index, 'endDate', e.target.value)} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500" />
              </div>
            </div>
          </div>
        </div>)}
    </div>;
};
export default Education;