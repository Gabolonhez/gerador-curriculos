# Templates — Como adicionar um novo template

Este projeto renderiza templates de currículo em React. Para facilitar a adição de novos templates e suportar carregamento dinâmico, siga este contrato simples.

Contrato do componente de template

- Local: `src/components/templates/` (recomendado)
- Assinatura: o componente deve ser o export default de um arquivo .tsx e aceitar props:

```ts
interface TemplateProps {
  data: ResumeData; // ver `src/types/resume.ts`
  language: LanguageCode; // 'pt' | 'en' | 'es' (ver `src/translations/formTranslations.ts`)
}

export default function MyTemplate({ data, language }: TemplateProps) { ... }
```

- O componente deve renderizar dentro do contêiner `#resume-preview` (o `ResumePreview` já faz a seleção e renderiza o componente).

Registro automático (proposta)

- Os templates são importados atualmente de forma estática em `src/components/ResumePreview.tsx`.
- Para suportar templates dinâmicos, criamos uma convenção: todos os componentes em `src/components/templates` que exportem default serão registrados automaticamente por uma rotina que lê o diretório e constrói um objeto `Record<string, React.ComponentType<TemplateProps>>`.

Boas práticas

- Mantenha estilos acessíveis e use classes CSS (Tailwind) para facilitar a consistência.
- Evite imagens externas e mantenha o HTML limpo para melhor compatibilidade com geradores de PDF.
- Use `resumeTranslations` para obter labels localizados.

Exemplo rápido

- `src/components/templates/MyCustom.tsx`

```tsx
import React from "react";
import { ResumeData } from "../../types/resume";
import { LanguageCode } from "../../translations/formTranslations";
import resumeTranslations from "../../translations/resumeTranslations";

export default function MyCustom({
  data,
  language,
}: {
  data: ResumeData;
  language: LanguageCode;
}) {
  const t = resumeTranslations[language as keyof typeof resumeTranslations];
  return <div className="ats-resume">{/* ... */}</div>;
}
```

Depois de criar o arquivo, reinicie o servidor Vite e o novo template estará disponível no seletor (se `ResumePreview` for ajustado para descoberta automática).
