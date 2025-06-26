import { useCallback } from 'react';
import { LanguageCode } from '../translations/formTranslations';

export const usePDFExport = ({ language }: { language: LanguageCode }) => {
  const exportToPDF = useCallback((): void => {
    const resumePreview = document.getElementById('resume-preview');
    if (!resumePreview) {
      const errorMessage = language === 'pt' 
        ? 'Erro ao encontrar o conteúdo para impressão.'
        : 'Error finding content for printing.';
      alert(errorMessage);
      return;
    }

    // Adicionar classe de impressão temporariamente
    document.body.classList.add('printing');
    
    // Criar estilos específicos para impressão se não existirem
    let printStyles = document.getElementById('print-styles');
    if (!printStyles) {
      printStyles = document.createElement('style');
      printStyles.id = 'print-styles';
      printStyles.innerHTML = `
        @media print {
          @page {
            margin: 1cm;
            size: A4;
            /* Remove cabeçalho e rodapé do navegador */
            @top-left { content: ""; }
            @top-center { content: ""; }
            @top-right { content: ""; }
            @bottom-left { content: ""; }
            @bottom-center { content: ""; }
            @bottom-right { content: ""; }
          }
          
          /* Remove cabeçalhos e rodapés do navegador */
          html {
            margin: 0 !important;
            padding: 0 !important;
          }
          
          /* Ocultar tudo exceto o preview durante impressão */
          body.printing * {
            visibility: hidden !important;
          }
          
          body.printing #resume-preview,
          body.printing #resume-preview * {
            visibility: visible !important;
          }
          
          body.printing #resume-preview {
            position: absolute !important;
            left: 0 !important;
            top: 0 !important;
            width: 100% !important;
            height: auto !important;
            margin: 0 !important;
            padding: 0 !important;
            border: none !important;
            box-shadow: none !important;
            border-radius: 0 !important;
            background: white !important;
            overflow: visible !important;
          }

          /* Remove barras de rolagem */
          body.printing,
          body.printing * {
            overflow: visible !important;
            overflow-x: visible !important;
            overflow-y: visible !important;
          }

          /* Remove containers com scroll */
          .resume-preview {
            overflow: visible !important;
            height: auto !important;
            max-height: none !important;
          }

          /* Remove bordas e containers que podem causar scroll */
          .border,
          .rounded-lg,
          .overflow-auto {
            border: none !important;
            border-radius: 0 !important;
            overflow: visible !important;
          }
          /* Remove bordas e containers que podem causar scroll */
          .border,
          .rounded-lg,
          .overflow-auto {
            border: none !important;
            border-radius: 0 !important;
            overflow: visible !important;
          }

          /* Estilos específicos para o currículo */
          .ats-resume {
            font-family: Arial, Helvetica, sans-serif !important;
            font-size: 11pt !important;
            line-height: 1.4 !important;
            color: #000000 !important;
            background-color: #ffffff !important;
            max-width: none !important;
            margin: 0 !important;
            padding: 20px !important;
            box-sizing: border-box !important;
            overflow: visible !important;
            height: auto !important;
          }

          .ats-skills-grid {
            display: grid !important;
            grid-template-columns: repeat(auto-fit, minmax(180px, 1fr)) !important;
            gap: 0.5em !important;
            margin-bottom: 1em !important;
          }

          .ats-skill-item {
            display: flex !important;
            justify-content: space-between !important;
            align-items: center !important;
            padding: 0.4em 0.8em !important;
            background-color: #f8f9fa !important;
            border: 1px solid #e9ecef !important;
            border-radius: 4px !important;
            min-height: 2em !important;
            white-space: nowrap !important;
            overflow: hidden !important;
          }

          .ats-skill-name {
            font-weight: bold !important;
            color: #000000 !important;
            font-size: 10pt !important;
            flex: 1 !important;
            margin-right: 0.5em !important;
            text-overflow: ellipsis !important;
            overflow: hidden !important;
          }

          .ats-skill-level {
            font-size: 9pt !important;
            color: #666666 !important;
            font-weight: normal !important;
            flex-shrink: 0 !important;
          }

          /* Links clicáveis */
          .ats-link {
            color: #0066cc !important;
            text-decoration: none !important;
          }

          .ats-link:visited {
            color: #0066cc !important;
          }

          /* Evitar quebras de página inadequadas */
          .ats-section,
          .ats-experience-item,
          .ats-education-item,
          .ats-certification-item {
            page-break-inside: avoid !important;
          }

          /* Layout dos idiomas */
          .ats-languages {
            display: grid !important;
            grid-template-columns: repeat(auto-fit, minmax(150px, 1fr)) !important;
            gap: 0.5em !important;
          }

          .ats-language-item {
            display: flex !important;
            justify-content: space-between !important;
            align-items: center !important;
            padding: 0.3em 0.8em !important;
            background-color: #f8f9fa !important;
            border: 1px solid #e9ecef !important;
            border-radius: 4px !important;
          }
        }
      `;
      document.head.appendChild(printStyles);
    }

    // Executar impressão
    try {
      // Temporariamente alterar o título da página para algo mais limpo
      const originalTitle = document.title;
      document.title = 'Curriculo';
      
      // Usar setTimeout para garantir que o título seja alterado antes da impressão
      setTimeout(() => {
        window.print();
        
        // Restaurar título original após impressão
        setTimeout(() => {
          document.title = originalTitle;
        }, 100);
      }, 100);
      
    } catch (error) {
      console.error('Erro ao imprimir:', error);
      const errorMessage = language === 'pt' 
        ? 'Erro ao abrir janela de impressão. Verifique se pop-ups estão permitidos.'
        : 'Error opening print window. Please check if pop-ups are allowed.';
      alert(errorMessage);
    } finally {
      // Remover classe de impressão após um pequeno delay
      setTimeout(() => {
        document.body.classList.remove('printing');
      }, 1500);
    }
  }, [language]);

  return {
    exportToPDF
  };
};
