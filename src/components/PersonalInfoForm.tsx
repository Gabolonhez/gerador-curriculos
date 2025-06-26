import React, { useState } from 'react';
import { User, Mail, Phone, MapPin, Globe, Linkedin, Github, AlertCircle, CheckCircle, Briefcase } from 'lucide-react';
import { LanguageCode } from '../translations/formTranslations';
import { PersonalInfo } from '../types/resume';
import { 
  validateEmail, 
  validatePhone, 
  validateURL, 
  validateLinkedIn, 
  validateGitHub,
  validateRequiredField 
} from '../utils/validators/resumeValidators';

interface PersonalInfoFormProps {
  data: PersonalInfo;
  updateData: (data: PersonalInfo) => void;
  language: LanguageCode;
}

interface ValidationState {
  name: { isValid: boolean; message: string };
  desiredPosition: { isValid: boolean; message: string };
  email: { isValid: boolean; message: string };
  phone: { isValid: boolean; message: string };
  address: { isValid: boolean; message: string };
  linkedin: { isValid: boolean; message: string };
  github: { isValid: boolean; message: string };
  website: { isValid: boolean; message: string };
}

interface TranslationStrings {
  title: string;
  fullName: string;
  desiredPosition: string;
  email: string;
  phone: string;
  address: string;
  website: string;
  linkedin: string;
  github: string;
  placeholders: {
    name: string;
    desiredPosition: string;
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
    desiredPosition: 'Cargo Desejado (opcional)',
    email: 'Email',
    phone: 'Telefone',
    address: 'Endereço',
    website: 'Website (opcional)',
    linkedin: 'LinkedIn (opcional)',
    github: 'GitHub (opcional)',
    placeholders: {
      name: 'João Silva',
      desiredPosition: 'Desenvolvedor Full Stack',
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
    desiredPosition: 'Desired Position (optional)',
    email: 'Email',
    phone: 'Phone',
    address: 'Address',
    website: 'Website (optional)',
    linkedin: 'LinkedIn (optional)',
    github: 'GitHub (optional)',
    placeholders: {
      name: 'John Smith',
      desiredPosition: 'Full Stack Developer',
      email: 'john.smith@email.com',
      phone: '+1 (555) 123-4567',
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
  
  // Estado para validação em tempo real
  const [validation, setValidation] = useState<ValidationState>({
    name: { isValid: true, message: '' },
    desiredPosition: { isValid: true, message: '' },
    email: { isValid: true, message: '' },
    phone: { isValid: true, message: '' },
    address: { isValid: true, message: '' },
    linkedin: { isValid: true, message: '' },
    github: { isValid: true, message: '' },
    website: { isValid: true, message: '' }
  });

  const handleChange = (field: keyof PersonalInfo, value: string) => {
    // Atualiza os dados
    updateData({
      ...data,
      [field]: value
    });

    // Valida em tempo real
    validateField(field, value);
  };

  const validateField = (field: keyof PersonalInfo, value: string) => {
    let isValid = true;
    let message = '';

    switch (field) {
      case 'name':
        isValid = validateRequiredField(value);
        message = !isValid ? (language === 'pt' ? 'Nome é obrigatório' : 'Name is required') : '';
        break;
      case 'desiredPosition':
        // Desired position is optional, always valid
        isValid = true;
        message = '';
        break;
      case 'email':
        if (value) {
          isValid = validateEmail(value);
          message = !isValid ? (language === 'pt' ? 'Email inválido' : 'Invalid email') : '';
        }
        break;
      case 'phone':
        if (value) {
          isValid = validatePhone(value);
          message = !isValid ? (language === 'pt' ? 'Telefone inválido' : 'Invalid phone') : '';
        }
        break;
      case 'address':
        // Address validation is optional, always valid
        isValid = true;
        message = '';
        break;
      case 'linkedin':
        isValid = validateLinkedIn(value);
        message = !isValid ? (language === 'pt' ? 'LinkedIn inválido' : 'Invalid LinkedIn') : '';
        break;
      case 'github':
        isValid = validateGitHub(value);
        message = !isValid ? (language === 'pt' ? 'GitHub inválido' : 'Invalid GitHub') : '';
        break;
      case 'website':
        isValid = validateURL(value);
        message = !isValid ? (language === 'pt' ? 'URL inválida' : 'Invalid URL') : '';
        break;
    }

    setValidation(prev => ({
      ...prev,
      [field]: { isValid, message }
    }));
  };

  const renderFieldWithValidation = (
    field: keyof PersonalInfo,
    type: string,
    icon: React.ReactNode,
    label: string,
    placeholder: string,
    required = false,
    helpText?: string
  ) => (
    <div>
      <label htmlFor={field} className="block text-sm font-medium text-gray-700 mb-1">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          {icon}
        </div>
        <input
          type={type}
          id={field}
          value={data[field] || ''}
          onChange={(e) => handleChange(field, e.target.value)}
          placeholder={placeholder}
          className={`pl-10 pr-10 w-full px-3 py-2 border rounded-md focus:ring-1 text-sm sm:text-base ${
            validation[field].isValid
              ? 'border-gray-300 focus:ring-blue-500 focus:border-blue-500'
              : 'border-red-300 focus:ring-red-500 focus:border-red-500'
          }`}
        />
        <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
          {data[field] && (
            validation[field].isValid ? (
              <CheckCircle className="h-5 w-5 text-green-400" />
            ) : (
              <AlertCircle className="h-5 w-5 text-red-400" />
            )
          )}
        </div>
      </div>
      {validation[field].message && (
        <p className="mt-1 text-sm text-red-600">{validation[field].message}</p>
      )}
      {helpText && !validation[field].message && (
        <p className="mt-1 text-xs text-gray-500">{helpText}</p>
      )}
    </div>
  );

  const atsHints = {
    pt: {
      name: "Use seu nome completo como aparece em documentos oficiais",
      email: "Use um email profissional para melhor impressão",
      phone: "Inclua DDD e país para facilitar contato",
      linkedin: "Mantenha seu perfil atualizado - muitos recrutadores verificam",
      github: "Importante para vagas técnicas - mostre seus projetos",
      website: "Portfolio online impressiona recrutadores"
    },
    en: {
      name: "Use your full name as it appears on official documents",
      email: "Use a professional email for better impression",
      phone: "Include area code and country for easy contact",
      linkedin: "Keep your profile updated - many recruiters check",
      github: "Important for technical roles - showcase your projects",
      website: "Online portfolio impresses recruiters"
    }
  };

  const hints = atsHints[language];

  return (
    <div className="space-y-4 sm:space-y-6">
      <h2 className="text-lg sm:text-xl font-semibold text-gray-900 mb-4 sm:mb-6">{t.title}</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
        {/* Nome Completo - Full width */}
        <div className="md:col-span-2">
          {renderFieldWithValidation(
            'name',
            'text',
            <User className="h-5 w-5 text-gray-400" />,
            t.fullName,
            t.placeholders.name,
            true,
            hints.name
          )}
        </div>

        {/* Cargo Desejado - Full width */}
        <div className="md:col-span-2">
          {renderFieldWithValidation(
            'desiredPosition',
            'text',
            <Briefcase className="h-5 w-5 text-gray-400" />,
            t.desiredPosition,
            t.placeholders.desiredPosition
          )}
        </div>

        {/* Email */}
        {renderFieldWithValidation(
          'email',
          'email',
          <Mail className="h-5 w-5 text-gray-400" />,
          t.email,
          t.placeholders.email,
          true,
          hints.email
        )}

        {/* Telefone */}
        {renderFieldWithValidation(
          'phone',
          'tel',
          <Phone className="h-5 w-5 text-gray-400" />,
          t.phone,
          t.placeholders.phone,
          false,
          hints.phone
        )}

        {/* Endereço - Full width */}
        <div className="md:col-span-2">
          {renderFieldWithValidation(
            'address',
            'text',
            <MapPin className="h-5 w-5 text-gray-400" />,
            t.address,
            t.placeholders.address
          )}
        </div>

        {/* Website */}
        {renderFieldWithValidation(
          'website',
          'url',
          <Globe className="h-5 w-5 text-gray-400" />,
          t.website,
          t.placeholders.website,
          false,
          hints.website
        )}

        {/* LinkedIn */}
        {renderFieldWithValidation(
          'linkedin',
          'url',
          <Linkedin className="h-5 w-5 text-gray-400" />,
          t.linkedin,
          t.placeholders.linkedin,
          false,
          hints.linkedin
        )}

        {/* GitHub */}
        {renderFieldWithValidation(
          'github',
          'url',
          <Github className="h-5 w-5 text-gray-400" />,
          t.github,
          t.placeholders.github,
          false,
          hints.github
        )}
      </div>
    </div>
  );
};

export default PersonalInfoForm;