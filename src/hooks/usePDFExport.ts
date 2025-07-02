import { useCallback } from 'react';
import { LanguageCode } from '../translations/formTranslations';

// Função para detectar se é iOS
const isIOS = (): boolean => {
  return /iPad|iPhone|iPod/.test(navigator.userAgent) || 
         (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1);
};

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

    // Se for iOS, usar uma abordagem diferente
    if (isIOS()) {
      handleIOSPrint(resumePreview, language);
      return;
    }

    // Comportamento padrão para outros dispositivos
    handleStandardPrint(language);
  }, [language]);

  const handleIOSPrint = (resumePreview: HTMLElement, language: LanguageCode) => {
    // Criar uma nova janela com apenas o conteúdo do currículo
    const printWindow = window.open('', '_blank', 'width=800,height=600');
    
    if (!printWindow) {
      const errorMessage = language === 'pt' 
        ? 'Não foi possível abrir a janela de impressão. Por favor, verifique se os pop-ups estão permitidos.'
        : 'Could not open the print window. Please check if pop-ups are allowed.';
      alert(errorMessage);
      return;
    }

    // Obter todos os estilos CSS da página atual
    const styles = Array.from(document.styleSheets)
      .map(styleSheet => {
        try {
          return Array.from(styleSheet.cssRules)
            .map(rule => rule.cssText)
            .join('\n');
        } catch (e) {
          // Ignorar erros de CORS
          return '';
        }
      })
      .join('\n');

    // Criar HTML completo para a nova janela
    const htmlContent = `
      <!DOCTYPE html>
      <html lang="${language}">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Currículo</title>
        <style>
          ${styles}
          
          /* Estilos específicos para impressão */
          @media print {
            @page {
              margin: 1cm;
              size: A4;
            }
            
            body {
              margin: 0 !important;
              padding: 0 !important;
              background: white !important;
            }
            
            .resume-container {
              width: 100% !important;
              max-width: none !important;
              margin: 0 !important;
              padding: 20px !important;
              box-shadow: none !important;
              border-radius: 0 !important;
            }
          }
          
          /* Estilos para visualização na tela */
          @media screen {
            body {
              font-family: Arial, sans-serif;
              background-color: #f5f5f5;
              margin: 0;
              padding: 20px;
            }
            
            .resume-container {
              background: white;
              max-width: 800px;
              margin: 0 auto;
              padding: 40px;
              border-radius: 8px;
              box-shadow: 0 2px 10px rgba(0,0,0,0.1);
            }
            
            .print-button {
              position: fixed;
              top: 20px;
              right: 20px;
              background: #007AFF;
              color: white;
              border: none;
              padding: 12px 24px;
              border-radius: 8px;
              font-size: 16px;
              cursor: pointer;
              z-index: 1000;
              box-shadow: 0 2px 8px rgba(0,122,255,0.3);
            }
            
            .print-button:hover {
              background: #0056CC;
            }
          }
        </style>
      </head>
      <body>
        <button class="print-button" onclick="window.print()">${language === 'pt' ? 'Imprimir/Salvar PDF' : 'Print/Save PDF'}</button>
        <div class="resume-container">
          ${resumePreview.innerHTML}
        </div>
        <script>
          // Remover elementos desnecessários que podem ter vindo do DOM original
          document.querySelectorAll('[class*="overflow-auto"], [class*="border"], [class*="rounded-lg"]').forEach(el => {
            el.style.overflow = 'visible';
            el.style.border = 'none';
            el.style.borderRadius = '0';
          });
        </script>
      </body>
      </html>
    `;

    printWindow.document.write(htmlContent);
    printWindow.document.close();
  };
  const handleStandardPrint = (lang: LanguageCode) => {
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
      const errorMessage = lang === 'pt' 
        ? 'Erro ao abrir janela de impressão. Verifique se pop-ups estão permitidos.'
        : 'Error opening print window. Please check if pop-ups are allowed.';
      alert(errorMessage);
    } finally {
      // Remover classe de impressão após um pequeno delay
      setTimeout(() => {
        document.body.classList.remove('printing');
      }, 1500);
    }
  };

  return {
    exportToPDF
  };
};
