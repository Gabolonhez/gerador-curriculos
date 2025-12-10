import React, { useState } from 'react';
import { PlusIcon, TrashIcon, GripVertical } from 'lucide-react';
import { LanguageCode, formTranslations } from '../translations/formTranslations';

interface Certification {
  id: string;
  name: string;
  issuer: string;
  date: string;
  url?: string;
  description: string;
}

interface CertificationsFormProps {
  data: Certification[];
  updateData: (data: Certification[]) => void;
  language: LanguageCode;
}

const CertificationsForm: React.FC<CertificationsFormProps> = ({ data, updateData, language }) => {
  const t = formTranslations[language];
  const [draggingId, setDraggingId] = useState<string | null>(null);

  const move = <T,>(arr: T[], from: number, to: number) => {
    const copy = arr.slice();
    const [item] = copy.splice(from, 1);
    copy.splice(to, 0, item);
    return copy;
  };

  const addCertification = () => {
    const newCertification: Certification = {
      id: Date.now().toString(),
      name: '',
      issuer: '',
      date: '',
      url: '',
      description: ''
    };
    updateData([...data, newCertification]);
  };

  const removeCertification = (id: string) => {
    updateData(data.filter(cert => cert.id !== id));
  };

  const handleChange = (id: string, field: keyof Certification, value: string) => {
    updateData(
      data.map(cert => {
        if (cert.id === id) {
          return {
            ...cert,
            [field]: value
          };
        }
        return cert;
      })
    );
  };

  return (
    <div className="space-y-6">
      <div role="list" className="space-y-3">
        {data.map(cert => (
          <div
            key={cert.id}
            className={`p-4 border rounded-lg bg-gray-50 dark:bg-gray-800 dark:border-gray-700 ${draggingId === cert.id ? 'opacity-60' : ''}`}
            draggable
            onDragStart={e => {
              e.dataTransfer.effectAllowed = 'move';
              e.dataTransfer.setData('text/plain', cert.id);
              setDraggingId(cert.id);
            }}
            onDragOver={e => {
              e.preventDefault();
              e.dataTransfer.dropEffect = 'move';
            }}
            onDrop={e => {
              e.preventDefault();
              const sourceId = e.dataTransfer.getData('text/plain');
              if (!sourceId || sourceId === cert.id) {
                setDraggingId(null);
                return;
              }
              const from = data.findIndex(c => c.id === sourceId);
              const to = data.findIndex(c => c.id === cert.id);
              if (from >= 0 && to >= 0 && from !== to) {
                updateData(move(data, from, to));
              }
              setDraggingId(null);
            }}
            onDragEnd={() => setDraggingId(null)}
            role="listitem"
            tabIndex={0}
            aria-label={`${t.certification} item`}
          >
            <div className="flex justify-between items-center mb-4">
              <div className="flex items-center">
                <GripVertical className="h-5 w-5 mr-2 text-gray-400" aria-hidden />
                <h3 className="font-medium dark:text-white">{t.certification}</h3>
              </div>
              <button
                onMouseDown={e => e.stopPropagation()}
                onClick={e => {
                  e.stopPropagation();
                  removeCertification(cert.id);
                }}
                className="cursor-pointer text-red-500 hover:text-red-700"
                aria-label={t.remove}
                title={t.remove}
              >
                <TrashIcon className="h-5 w-5" />
              </button>
            </div>
            <div className="grid grid-cols-1 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1 dark:text-gray-200">
                  {t.certificationName}
                </label>
                <input
                  type="text"
                  value={cert.name}
                  onChange={e => handleChange(cert.id, 'name', e.target.value)}
                  className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 border p-2 dark:bg-gray-700 dark:text-white dark:border-gray-600 dark:placeholder-gray-400"
                  placeholder={t.certificationPlaceholder}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1 dark:text-gray-200">
                  {t.issuer}
                </label>
                <input
                  type="text"
                  value={cert.issuer}
                  onChange={e => handleChange(cert.id, 'issuer', e.target.value)}
                  className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 border p-2 dark:bg-gray-700 dark:text-white dark:border-gray-600 dark:placeholder-gray-400"
                  placeholder={t.issuerPlaceholder}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1 dark:text-gray-200">
                  {t.date}
                </label>
                <input
                  type="month"
                  value={cert.date}
                  onChange={e => handleChange(cert.id, 'date', e.target.value)}
                  className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 border p-2 dark:bg-gray-700 dark:text-white dark:border-gray-600"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1 dark:text-gray-200">
                  {t.certificationUrl}
                </label>
                <input
                  type="url"
                  value={cert.url}
                  onChange={e => handleChange(cert.id, 'url', e.target.value)}
                  className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 border p-2 dark:bg-gray-700 dark:text-white dark:border-gray-600 dark:placeholder-gray-400"
                  placeholder={t.urlPlaceholder}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1 dark:text-gray-200">
                  {t.description}
                </label>
                <textarea
                  value={cert.description}
                  onChange={e => handleChange(cert.id, 'description', e.target.value)}
                  rows={3}
                  className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 border p-2 dark:bg-gray-700 dark:text-white dark:border-gray-600 dark:placeholder-gray-400"
                  placeholder={t.certificationDescription}
                />
              </div>
            </div>
          </div>
        ))}
      </div>
      <button
        type="button"
        onClick={addCertification}
        className="flex items-center justify-center w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
      >
        <PlusIcon className="h-5 w-5 mr-2" />
        {t.addCertification}
      </button>

    </div>
  );
};

export default CertificationsForm;