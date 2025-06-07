import React from 'react';

type TabType = 'informacoes-pessoais' | 'resumo-profissional' | 'experiencia-profissional' | 
               'formacao-academica' | 'habilidades-tecnicas' | 'idiomas' | 'certificacoes-cursos';

interface Tab {
  id: TabType;
  label: string;
}

interface TabNavigationProps {
  activeTab: TabType;
  setActiveTab: (tab: TabType) => void;
}

const tabs: Tab[] = [
  {
    id: 'informacoes-pessoais',
    label: 'Informações Pessoais'
  },
  {
    id: 'resumo-profissional',
    label: 'Resumo Profissional'
  },
  {
    id: 'experiencia-profissional',
    label: 'Experiência Profissional'
  },
  {
    id: 'formacao-academica',
    label: 'Formação Acadêmica'
  },
  {
    id: 'habilidades-tecnicas',
    label: 'Habilidades'
  },
  {
    id: 'idiomas',
    label: 'Idiomas'
  },
  {
    id: 'certificacoes-cursos',
    label: 'Certificações/Cursos'
  }
];

const TabNavigation: React.FC<TabNavigationProps> = ({ activeTab, setActiveTab }) => {
  return (
    <div className="border-b border-gray-200 overflow-x-auto">
      <nav className="-mb-px flex">
        {tabs.map(tab => (
          <button
            key={tab.id}
            className={`whitespace-nowrap py-4 px-3 border-b-2 font-medium text-sm ${
              activeTab === tab.id
                ? 'border-blue-500 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
            onClick={() => setActiveTab(tab.id)}
          >
            {tab.label}
          </button>
        ))}
      </nav>
    </div>
  );
};

export default TabNavigation;