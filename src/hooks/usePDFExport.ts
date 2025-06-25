import { useCallback } from 'react';
import { LanguageCode } from '../translations/formTranslations';

export const usePDFExport = ({ language }: { language: LanguageCode }) => {
  const exportToPDF = useCallback((): void => {
    const printWindow = window.open('', '_blank');
    if (!printWindow) {
      return;
    }

    const resumePreview = document.getElementById('resume-preview');
    if (!resumePreview) {
      const errorMessage = language === 'pt'
        ? 'Erro ao encontrar o conteúdo para impressão.'
        : 'Error finding content for printing.';
      alert(errorMessage);
      return;
    }

    // Obter todos os estilos CSS da página atual
    const styleSheets = Array.from(document.styleSheets);
    let allStyles = '';

    styleSheets.forEach(styleSheet => {
      try {
        if (styleSheet.cssRules) {
          Array.from(styleSheet.cssRules).forEach(rule => {
            allStyles += rule.cssText + '\n';
          });
        }
      } catch (e) {
        // Ignorar estilos de domínios externos
        console.log('Could not access external stylesheet');
      }
    });

    // Estilos específicos para impressão ATS
    const atsStyles = `
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
      
      @media print {
        /* Remove cabeçalho e rodapé */
        @page {
          margin: 1cm;
          size: A4;
        }
        
        /* Remove qualquer cabeçalho/rodapé */
        html, body {
          margin: 0 !important;
          padding: 0 !important;
        }
      }
      
      body {
        margin: 0;
        padding: 0;
        font-family: Arial, Helvetica, sans-serif;
        font-size: 11pt;
        line-height: 1.4;
        color: #000000;
        background-color: #ffffff;
        -webkit-print-color-adjust: exact;
        print-color-adjust: exact;
      }

      /* FORÇA layout das informações de contato */
      .ats-contact-info {
        display: flex !important;
        flex-direction: column !important;
        gap: 0.5em !important;
        margin-top: 0.5em !important;
      }

      .ats-contact-row {
        display: flex !important;
        flex-wrap: wrap !important;
        justify-content: center !important;
        gap: 1.5em !important;
      }

      .ats-contact-item {
        display: inline-flex !important;
        align-items: center !important;
        gap: 0.3em !important;
        font-size: 10pt !important;
        white-space: nowrap !important;
      }
      
      /* FORÇA grid das skills */
      .ats-skills-grid {
        display: grid !important;
        grid-template-columns: repeat(4, 1fr) !important;
        gap: 0.5em !important;
        margin-top: 0.8em !important;
      }

      .ats-skill-item {
        display: flex !important;
        flex-direction: column !important;
        align-items: center !important;
        padding: 0.4em 0.5em !important;
        background-color: #f8f9fa !important;
        border: 1px solid #e9ecef !important;
        border-radius: 4px !important;
        text-align: center !important;
        min-height: 2.5em !important;
        page-break-inside: avoid !important;
      }

      .ats-skill-name {
        font-weight: bold !important;
        color: #000000 !important;
        font-size: 10pt !important;
        margin-bottom: 0.2em !important;
      }

      .ats-skill-level {
        font-size: 8pt !important;
        color: #666666 !important;
        font-style: italic !important;
      }

      /* Outros elementos ATS */
      .ats-resume {
        font-family: Arial, Helvetica, sans-serif !important;
        font-size: 11pt !important;
        line-height: 1.4 !important;
        color: #000000 !important;
        background-color: #ffffff !important;
        max-width: none !important;
        margin: 0 !important;
        padding: 0 !important;
        box-sizing: border-box !important;
      }

      .ats-name {
        font-size: 18pt !important;
        font-weight: bold !important;
        color: #000000 !important;
        margin: 0 0 0.5em 0 !important;
        text-align: center !important;
        text-transform: uppercase !important;
        letter-spacing: 1px !important;
      }

      .ats-section {
        margin-bottom: 1.5em !important;
        page-break-inside: avoid !important;
      }

      .ats-section-title {
        font-size: 14pt !important;
        font-weight: bold !important;
        color: #000000 !important;
        margin: 0 0 0.8em 0 !important;
        text-transform: uppercase !important;
        border-bottom: 2px solid #000000 !important;
        padding-bottom: 0.3em !important;
      }

      /* Evitar quebras de página inadequadas */
      .ats-experience-item,
      .ats-education-item,
      .ats-certification-item {
        page-break-inside: avoid !important;
        margin-bottom: 1.5em !important;
      }
    `;

    printWindow.document.write(`
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <title>Currículo</title>
          <style>${allStyles}</style>
          <style>${atsStyles}</style>
        </head>
        <body>
          ${resumePreview.innerHTML}
        </body>
      </html>
    `);
    
    printWindow.document.close();
    
    // Aguardar carregamento e abrir impressão
    setTimeout(() => {
      printWindow.focus();
      printWindow.print();
      printWindow.close();
    }, 1000);
  }, [language]);

  return {
    exportToPDF
  };
};
