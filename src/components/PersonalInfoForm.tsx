import React from 'react';
import { User, Mail, Phone, MapPin, Globe, Linkedin, Github } from 'lucide-react';
import { LanguageCode } from '../translations/formTranslations';

interface PersonalInfo {
  name?: string;
  email?: string;
  phone?: string;
  address?: string;
  website?: string;
  linkedin?: string;
  github?: string;
}

interface PersonalInfoFormProps {
  data: PersonalInfo;
  updateData: (data: PersonalInfo) => void;
  language: LanguageCode;
}

interface TranslationStrings {
  title: string;
  fullName: string;
  email: string;
  phone: string;
  address: string;
  website: string;
  linkedin: string;
  github: string;
  placeholders: {
    name: string;
    email: string;
    phone: string;
    address: string;
    website: string;
    linkedin: string;
    github: string;
  };
}

interface Translations {
  pt: TranslationStrings;
  en: TranslationStrings;
}

const translations: Translations = {
  pt: {
    title: 'Informações Pessoais',
    fullName: 'Nome Completo',
    email: 'Email',
    phone: 'Telefone',
    address: 'Endereço',
    website: 'Website (opcional)',
    linkedin: 'LinkedIn (opcional)',
    github: 'GitHub (opcional)',
    placeholders: {
      name: 'João Silva',
      email: 'joao.silva@email.com',
      phone: '(11) 98765-4321',
      address: 'São Paulo, SP',
      website: 'www.meusite.com.br',
      linkedin: 'linkedin.com/in/joaosilva',
      github: 'github.com/joaosilva'
    }
  },
  en: {
    title: 'Personal Information',
    fullName: 'Full Name',
    email: 'Email',
    phone: 'Phone',
    address: 'Address',
    website: 'Website (optional)',
    linkedin: 'LinkedIn (optional)',
    github: 'GitHub (optional)',
    placeholders: {
      name: 'John Smith',
      email: 'john.smith@email.com',
      phone: '(555) 123-4567',
      address: 'New York, NY',
      website: 'www.mywebsite.com',
      linkedin: 'linkedin.com/in/johnsmith',
      github: 'github.com/johnsmith'
    }
  }
};

const PersonalInfoForm: React.FC<PersonalInfoFormProps> = ({
  data,
  updateData,
  language
}) => {
  const t = translations[language];

  const handleChange = (field: keyof PersonalInfo, value: string) => {
    updateData({
      ...data,
      [field]: value
    });
  };

  return (
    <div className="space-y-4 sm:space-y-6">
      <h2 className="text-lg sm:text-xl font-semibold text-gray-900 mb-4 sm:mb-6">{t.title}</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
        {/* Nome Completo - Full width */}
        <div className="md:col-span-2">
          <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
            {t.fullName}
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <User className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              id="name"
              value={data.name || ''}
              onChange={(e) => handleChange('name', e.target.value)}
              placeholder={t.placeholders.name}
              className="pl-10 w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-1 focus:ring-blue-500 focus:border-blue-500 text-sm sm:text-base"
            />
          </div>
        </div>

        {/* Email */}
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
            {t.email}
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Mail className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="email"
              id="email"
              value={data.email || ''}
              onChange={(e) => handleChange('email', e.target.value)}
              placeholder={t.placeholders.email}
              className="pl-10 w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-1 focus:ring-blue-500 focus:border-blue-500 text-sm sm:text-base"
            />
          </div>
        </div>

        {/* Telefone */}
        <div>
          <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
            {t.phone}
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Phone className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="tel"
              id="phone"
              value={data.phone || ''}
              onChange={(e) => handleChange('phone', e.target.value)}
              placeholder={t.placeholders.phone}
              className="pl-10 w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-1 focus:ring-blue-500 focus:border-blue-500 text-sm sm:text-base"
            />
          </div>
        </div>

        {/* Endereço */}
        <div>
          <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-1">
            {t.address}
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <MapPin className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              id="address"
              value={data.address || ''}
              onChange={(e) => handleChange('address', e.target.value)}
              placeholder={t.placeholders.address}
              className="pl-10 w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-1 focus:ring-blue-500 focus:border-blue-500 text-sm sm:text-base"
            />
          </div>
        </div>

        {/* Website */}
        <div>
          <label htmlFor="website" className="block text-sm font-medium text-gray-700 mb-1">
            {t.website}
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Globe className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="url"
              id="website"
              value={data.website || ''}
              onChange={(e) => handleChange('website', e.target.value)}
              placeholder={t.placeholders.website}
              className="pl-10 w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-1 focus:ring-blue-500 focus:border-blue-500 text-sm sm:text-base"
            />
          </div>
        </div>

        {/* LinkedIn */}
        <div>
          <label htmlFor="linkedin" className="block text-sm font-medium text-gray-700 mb-1">
            {t.linkedin}
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Linkedin className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="url"
              id="linkedin"
              value={data.linkedin || ''}
              onChange={(e) => handleChange('linkedin', e.target.value)}
              placeholder={t.placeholders.linkedin}
              className="pl-10 w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-1 focus:ring-blue-500 focus:border-blue-500 text-sm sm:text-base"
            />
          </div>
        </div>

        {/* GitHub */}
        <div>
          <label htmlFor="github" className="block text-sm font-medium text-gray-700 mb-1">
            {t.github}
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Github className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="url"
              id="github"
              value={data.github || ''}
              onChange={(e) => handleChange('github', e.target.value)}
              placeholder={t.placeholders.github}
              className="pl-10 w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-1 focus:ring-blue-500 focus:border-blue-500 text-sm sm:text-base"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PersonalInfoForm;