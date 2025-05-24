import React from 'react';
const WorkExperience = ({
  data,
  updateData
}) => {
  const addExperience = () => {
    updateData([...data, {
      company: '',
      position: '',
      startDate: '',
      endDate: '',
      description: ''
    }]);
  };
  const removeExperience = index => {
    const newData = [...data];
    newData.splice(index, 1);
    updateData(newData);
  };
  const updateExperience = (index, field, value) => {
    const newData = [...data];
    newData[index][field] = value;
    updateData(newData);
  };
  return <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-medium">Experiência Profissional</h3>
        <button type="button" onClick={addExperience} className="inline-flex items-center px-3 py-1 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
          Adicionar Experiência
        </button>
      </div>
      {data.map((experience, index) => <div key={index} className="bg-gray-50 p-4 rounded-lg space-y-4">
          <div className="flex justify-between items-center">
            <h4 className="text-md font-medium">Experiência {index + 1}</h4>
            {data.length > 1 && 
            <button type="button" onClick={() => removeExperience(index)} className=" text-red-600 hover:text-red-800">
                Remover
              </button>}
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Empresa
              </label>
              <input type="text" value={experience.company} onChange={e => updateExperience(index, 'company', e.target.value)} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Cargo
              </label>
              <input type="text" value={experience.position} onChange={e => updateExperience(index, 'position', e.target.value)} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Data de Início
              </label>
              <input type="date" value={experience.startDate} onChange={e => updateExperience(index, 'startDate', e.target.value)} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Data de Término
              </label>
              <input type="date" value={experience.endDate} onChange={e => updateExperience(index, 'endDate', e.target.value)} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500" />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Descrição das Atividades
            </label>
            <textarea value={experience.description} onChange={e => updateExperience(index, 'description', e.target.value)} rows={3} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500" />
          </div>
        </div>)}
    </div>;
};
export default WorkExperience;