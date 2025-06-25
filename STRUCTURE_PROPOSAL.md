# Estrutura Proposta para o Projeto Gerador de Currículos

## Nova Organização de Pastas:

```
src/
├── main.tsx                          # Ponto de entrada principal
├── App.tsx                           # Componente raiz
├── vite-env.d.ts                     # Tipos do Vite
│
├── assets/                           # Recursos estáticos
│   ├── images/
│   ├── icons/
│   └── fonts/
│
├── components/                       # Componentes reutilizáveis
│   ├── ui/                          # Componentes de interface básica
│   │   ├── Button/
│   │   │   ├── Button.tsx
│   │   │   ├── Button.module.css
│   │   │   └── index.ts
│   │   ├── Input/
│   │   ├── Select/
│   │   ├── Textarea/
│   │   ├── Modal/
│   │   └── Card/
│   │
│   ├── form/                        # Componentes específicos de formulário
│   │   ├── FormField/
│   │   ├── FormSection/
│   │   └── ValidationMessage/
│   │
│   └── common/                      # Componentes comuns
│       ├── Header/
│       ├── Footer/
│       ├── Navigation/
│       └── LanguageToggle/
│
├── features/                        # Funcionalidades principais
│   ├── personal-info/
│   │   ├── components/
│   │   │   ├── PersonalInfoForm.tsx
│   │   │   └── PersonalInfoPreview.tsx
│   │   ├── hooks/
│   │   │   └── usePersonalInfo.ts
│   │   └── types.ts
│   │
│   ├── professional-summary/
│   │   ├── components/
│   │   ├── hooks/
│   │   └── types.ts
│   │
│   ├── experience/
│   │   ├── components/
│   │   │   ├── ExperienceForm.tsx
│   │   │   ├── ExperienceItem.tsx
│   │   │   └── ExperiencePreview.tsx
│   │   ├── hooks/
│   │   │   └── useExperience.ts
│   │   └── types.ts
│   │
│   ├── education/
│   ├── skills/
│   ├── languages/
│   ├── certifications/
│   │
│   └── resume-builder/
│       ├── components/
│       │   ├── ResumeBuilder.tsx
│       │   ├── ResumePreview.tsx
│       │   ├── TabNavigation.tsx
│       │   └── PDFGenerator.tsx
│       ├── hooks/
│       │   ├── useResumeData.ts
│       │   ├── useTabNavigation.ts
│       │   └── usePDFExport.ts
│       └── types.ts
│
├── hooks/                           # Hooks globais
│   ├── useLocalStorage.ts
│   ├── useValidation.ts
│   ├── useDebounce.ts
│   └── useMediaQuery.ts
│
├── services/                        # Serviços e APIs
│   ├── api/
│   │   ├── resume.ts
│   │   └── export.ts
│   ├── storage/
│   │   └── localStorage.ts
│   └── validation/
│       └── resumeValidation.ts
│
├── utils/                          # Utilitários
│   ├── formatters/
│   │   ├── dateFormatter.ts
│   │   ├── phoneFormatter.ts
│   │   └── urlFormatter.ts
│   ├── validators/
│   │   ├── emailValidator.ts
│   │   └── urlValidator.ts
│   ├── constants/
│   │   ├── tabs.ts
│   │   ├── skillLevels.ts
│   │   └── degreeOptions.ts
│   └── helpers/
│       ├── arrayHelpers.ts
│       └── objectHelpers.ts
│
├── styles/                         # Estilos
│   ├── globals.css                 # Estilos globais
│   ├── variables.css               # Variáveis CSS
│   ├── components/                 # Estilos de componentes
│   │   ├── resume.css
│   │   ├── forms.css
│   │   └── navigation.css
│   ├── themes/                     # Temas
│   │   ├── light.css
│   │   └── dark.css
│   └── utilities/                  # Classes utilitárias
│       └── spacing.css
│
├── translations/                   # Internacionalização
│   ├── i18n.ts                    # Configuração do i18n
│   ├── locales/
│   │   ├── pt/
│   │   │   ├── common.json
│   │   │   ├── forms.json
│   │   │   └── validation.json
│   │   └── en/
│   │       ├── common.json
│   │       ├── forms.json
│   │       └── validation.json
│   └── types.ts
│
├── types/                          # Tipos TypeScript
│   ├── global.ts                   # Tipos globais
│   ├── api.ts                      # Tipos da API
│   └── index.ts                    # Re-exportações
│
├── context/                        # Contextos React
│   ├── ResumeContext.tsx
│   ├── LanguageContext.tsx
│   └── ThemeContext.tsx
│
├── lib/                           # Configurações de bibliotecas
│   ├── tailwind.ts
│   └── lucide.ts
│
└── pages/                         # Páginas (se usar roteamento)
    ├── Home/
    ├── Builder/
    └── NotFound/
```

## Principais Melhorias:

### 1. **Organização por Funcionalidades (Feature-Based)**

- Cada funcionalidade principal tem sua própria pasta
- Componentes, hooks e tipos relacionados ficam juntos
- Facilita manutenção e escalabilidade

### 2. **Separação de Responsabilidades**

- **components/ui**: Componentes reutilizáveis básicos
- **features**: Funcionalidades específicas do domínio
- **hooks**: Lógica reutilizável
- **services**: Integração com APIs e serviços externos
- **utils**: Funções utilitárias puras

### 3. **Melhor Gestão de Estilos**

- Separação por contexto (globais, componentes, temas)
- Suporte a temas (claro/escuro)
- Variáveis CSS centralizadas

### 4. **Internacionalização Estruturada**

- Arquivos JSON separados por contexto
- Configuração centralizada do i18n
- Tipos TypeScript para traduções

### 5. **Context API para Estado Global**

- ResumeContext para dados do currículo
- LanguageContext para idioma
- ThemeContext para temas

### 6. **Hooks Customizados**

- Lógica reutilizável extraída
- Melhor testabilidade
- Separação de concerns

### 7. **Utilitários e Constantes**

- Formatadores centralizados
- Validadores reutilizáveis
- Constantes organizadas

## Benefícios da Nova Estrutura:

1. **Escalabilidade**: Fácil adicionar novas funcionalidades
2. **Manutenibilidade**: Código organizado e fácil de encontrar
3. **Reutilização**: Componentes e hooks reutilizáveis
4. **Testabilidade**: Estrutura que facilita testes
5. **Performance**: Lazy loading por funcionalidades
6. **Colaboração**: Estrutura clara para equipes

## Próximos Passos Sugeridos:

1. Implementar Context API para estado global
2. Extrair hooks customizados
3. Criar componentes UI reutilizáveis
4. Estruturar melhor as traduções
5. Adicionar validações robustas
6. Implementar temas
7. Adicionar testes unitários
8. Configurar ESLint/Prettier mais robusto
