import React from 'react';
import { LanguageCode } from '../../translations/formTranslations';

interface Certification {
  id: string;
  name: string;
  issuer: string;
  date: string;
  url?: string;
  description: string;
}

interface CertificationsProps {
  data: Certification[];
  updateData: (data: Certification[]) => void;
  language: LanguageCode;
}

const Certifications: React.FC<CertificationsProps> = ({ data, updateData, language }) => {
  const addCertification = () => {
    updateData([
      ...data,
      {
        id: Date.now().toString(),
        name: '',
        issuer: '',
        date: '',
        url: '',
        description: ''
      }
    ]);
  };

  const removeCertification = (index: number) => {
    const newData = [...data];
    newData.splice(index, 1);
    updateData(newData);
  };

  const updateCertification = (index: number, field: keyof Certification, value: string) => {
    const newData = [...data];
    newData[index] = {
      ...newData[index],
      [field]: value
    };
    updateData(newData);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-medium">Certificações e Cursos</h3>
        <button
          type="button"
          onClick={addCertification}
          className="inline-flex items-center px-3 py-1 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          Adicionar Certificação
        </button>
      </div>

      {data.map((cert, index) => (
        <div key={cert.id} className="bg-gray-50 p-4 rounded-lg space-y-4">
          <div className="flex justify-between items-center">
            <h4 className="text-md font-medium">Certificação {index + 1}</h4>
            {data.length > 1 && (
              <button
                type="button"
                onClick={() => removeCertification(index)}
                className="text-red-600 hover:text-red-800"
              >
                Remover
              </button>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Nome da Certificação
              </label>
              <input
                type="text"
                value={cert.name}
                onChange={(e) => updateCertification(index, 'name', e.target.value)}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                placeholder="Ex: AWS Certified Developer"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Instituição/Emissor
              </label>
              <input
                type="text"
                value={cert.issuer}
                onChange={(e) => updateCertification(index, 'issuer', e.target.value)}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                placeholder="Ex: Amazon Web Services"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Data de Emissão
              </label>
              <input
                type="date"
                value={cert.date}
                onChange={(e) => updateCertification(index, 'date', e.target.value)}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                URL do Certificado (opcional)
              </label>
              <input
                type="url"
                value={cert.url}
                onChange={(e) => updateCertification(index, 'url', e.target.value)}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                placeholder="https://www.credential.net/..."
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Descrição
            </label>
            <textarea
              value={cert.description}
              onChange={(e) => updateCertification(index, 'description', e.target.value)}
              rows={3}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              placeholder="Descreva o que foi aprendido ou o escopo da certificação..."
            />
          </div>
        </div>
      ))}
    </div>
  );
};

export default Certifications; 