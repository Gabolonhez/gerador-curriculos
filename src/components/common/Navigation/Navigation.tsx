import React from 'react';
import { TabType } from '../../../types/resume';
import { TAB_CONFIG } from '../../../hooks/useTabNavigation';

interface TranslationStrings {
  personalInfo: string;
  summary: string;
  experience: string;
  education: string;
  skills: string;
  languages: string;
  certifications: string;
}

interface NavigationProps {
  activeTab: TabType;
  onTabChange: (tab: TabType) => void;
  translations: TranslationStrings;
}

const Navigation: React.FC<NavigationProps> = ({ 
  activeTab, 
  onTabChange, 
  translations 
}) => {
  return (
    <nav className="bg-white border-b overflow-x-auto w-full">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex space-x-8 whitespace-nowrap">
          {TAB_CONFIG.map((tab) => (
            <button
              key={tab.id}
              className={`py-4 text-sm font-medium border-b-2 transition-colors flex-shrink-0 ${
                activeTab === tab.id
                  ? 'text-blue-600 border-blue-600'
                  : 'text-gray-500 border-transparent hover:text-gray-700 hover:border-gray-300'
              }`}
              onClick={() => onTabChange(tab.id)}
            >
              {translations[tab.key as keyof TranslationStrings]}
            </button>
          ))}
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
