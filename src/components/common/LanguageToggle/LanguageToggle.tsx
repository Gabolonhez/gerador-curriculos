import React from 'react';
import { Globe2 } from 'lucide-react';
import { LanguageCode } from '../../../translations/formTranslations';
import Button from '../../ui/Button';

interface LanguageToggleProps {
  currentLanguage: LanguageCode;
  onLanguageChange: (language: LanguageCode) => void;
}

const LanguageToggle: React.FC<LanguageToggleProps> = ({ 
  currentLanguage, 
  onLanguageChange 
}) => {
  return (
    <div className="flex items-center space-x-2">
      <Button
        variant={currentLanguage === 'pt' ? 'primary' : 'secondary'}
        size="sm"
        onClick={() => onLanguageChange('pt')}
      >
        <Globe2 className="w-4 h-4 mr-1" /> PT
      </Button>
      <Button
        variant={currentLanguage === 'en' ? 'primary' : 'secondary'}
        size="sm"
        onClick={() => onLanguageChange('en')}
      >
        <Globe2 className="w-4 h-4 mr-1" /> EN
      </Button>
      <Button
        variant={currentLanguage === 'es' ? 'primary' : 'secondary'}
        size="sm"
        onClick={() => onLanguageChange('es')}
      >
        <Globe2 className="w-4 h-4 mr-1" /> ES
      </Button>
    </div>
  );
};

export default LanguageToggle;
