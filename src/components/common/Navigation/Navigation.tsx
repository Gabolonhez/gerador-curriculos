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
  projects: string;
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
    <nav className="bg-white dark:bg-gray-800 border-b dark:border-gray-700 overflow-x-auto w-full transition-colors duration-200">

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex space-x-8 whitespace-nowrap">
          {TAB_CONFIG.map((tab) => (
            <button
              key={tab.id}
              className={`py-4 text-sm font-medium border-b-2 transition-colors flex-shrink-0 ${activeTab === tab.id
                  ? 'text-blue-600 dark:text-blue-400 border-blue-600 dark:border-blue-400'
                  : 'text-gray-500 dark:text-gray-400 border-transparent hover:text-gray-700 dark:hover:text-gray-200 hover:border-gray-300 dark:hover:border-gray-600'
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
