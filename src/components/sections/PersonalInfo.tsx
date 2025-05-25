import React from 'react';
import { LanguageCode, formTranslations } from '../../translations/formTranslations';

interface PersonalInfoData {
  name: string;
  email: string;
  phone: string;
  address: string;
  website?: string;
  linkedin?: string;
  github?: string;
}

interface PersonalInfoProps {
  data: PersonalInfoData;
  updateData: (data: PersonalInfoData) => void;
  language: LanguageCode;
}

const PersonalInfo: React.FC<PersonalInfoProps> = ({ data, updateData, language }) => {
  const t = formTranslations[language];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    updateData({
      ...data,
      [name]: value
    });
  };

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-medium">{t.personalInfo}</h3>
      <div className="grid grid-cols-1 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            {t.name}
          </label>
          <input
            type="text"
            name="name"
            value={data.name}
            onChange={handleChange}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            title={t.name}
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            {t.email}
          </label>
          <input
            type="email"
            name="email"
            value={data.email}
            onChange={handleChange}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            title={t.email}
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            {t.phone}
          </label>
          <input
            type="tel"
            name="phone"
            value={data.phone}
            onChange={handleChange}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            title={t.phone}
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            {t.address}
          </label>
          <input
            type="text"
            name="address"
            value={data.address}
            onChange={handleChange}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            title={t.address}
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            {t.website}
          </label>
          <input
            type="url"
            name="website"
            value={data.website || ''}
            onChange={handleChange}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            title={t.website}
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            {t.linkedin}
          </label>
          <input
            type="url"
            name="linkedin"
            value={data.linkedin || ''}
            onChange={handleChange}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            title={t.linkedin}
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            {t.github}
          </label>
          <input
            type="url"
            name="github"
            value={data.github || ''}
            onChange={handleChange}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            title={t.github}
          />
        </div>
      </div>
    </div>
  );
};

export default PersonalInfo;