import React from 'react';
import { LanguageCode, formTranslations } from '../../translations/formTranslations';

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
  const t = formTranslations[language];

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
        <h3 className="text-lg font-medium">{t.certification}</h3>
        <button
          type="button"
          onClick={addCertification}
          className="inline-flex items-center px-3 py-1 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          {t.addCertification}
        </button>
      </div>

      {data.map((cert, index) => (
        <div key={cert.id} className="bg-gray-50 p-4 rounded-lg space-y-4">
          <div className="flex justify-between items-center">
            <h4 className="text-md font-medium">{t.certification} {index + 1}</h4>
            {data.length > 1 && (
              <button
                type="button"
                onClick={() => removeCertification(index)}
                className="text-red-600 hover:text-red-800"
              >
                {t.remove}
              </button>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                {t.certificationName}
              </label>
              <input
                type="text"
                value={cert.name}
                onChange={(e) => updateCertification(index, 'name', e.target.value)}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                placeholder={t.certificationPlaceholder}
                title={t.certificationName}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                {t.issuer}
              </label>
              <input
                type="text"
                value={cert.issuer}
                onChange={(e) => updateCertification(index, 'issuer', e.target.value)}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                placeholder={t.issuerPlaceholder}
                title={t.issuer}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                {t.date}
              </label>
              <input
                type="date"
                value={cert.date}
                onChange={(e) => updateCertification(index, 'date', e.target.value)}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                title={t.date}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                {t.certificationUrl}
              </label>
              <input
                type="url"
                value={cert.url}
                onChange={(e) => updateCertification(index, 'url', e.target.value)}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                placeholder={t.urlPlaceholder}
                title={t.certificationUrl}
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              {t.description}
            </label>
            <textarea
              value={cert.description}
              onChange={(e) => updateCertification(index, 'description', e.target.value)}
              rows={3}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              placeholder={t.certificationDescription}
              title={t.description}
            />
          </div>
        </div>
      ))}
    </div>
  );
};

export default Certifications; 