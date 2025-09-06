import React, { useState } from 'react';
import { LanguageCode } from '../translations/formTranslations';
import { ResumeData } from '../types/resume';
import templates from './templates';
import { TemplateKey } from './TemplateTypes';
import '../styles/ats-resume.css';
import { usePDFPayment } from '../hooks/usePDFPayment';
import PaymentModal from './PaymentModal';

interface ResumePreviewProps {
  data: ResumeData;
  language: LanguageCode;
  templateKey?: TemplateKey;
}

const ResumePreview: React.FC<ResumePreviewProps> = ({ data, language, templateKey = 'optimized' }) => {
  const Comp = templates[templateKey];
  const [modalOpen, setModalOpen] = useState(false);
  const { createOrder, paymentUrl, orderId, pollStatus, download } = usePDFPayment();

  const onDownloadClick = async () => {
    // create order
    await createOrder(data);
    setModalOpen(true);
  };

  const onOpenPayment = () => {
    if (!paymentUrl || !orderId) return;
    // open payment in new tab
    window.open(paymentUrl, '_blank');
    // start polling
    pollStatus(orderId).then((json) => {
      if (json.status === 'ready') download(orderId);
      setModalOpen(false);
    }).catch((err) => { console.error(err); setModalOpen(false); });
  };

  return (
    <div>
      <div id="resume-preview"><Comp data={data} language={language} /></div>
      <div className="mt-4">
        <button className="px-4 py-2 bg-blue-600 text-white rounded" onClick={onDownloadClick}>Baixar PDF</button>
      </div>
      <PaymentModal open={modalOpen} onClose={() => setModalOpen(false)} paymentUrl={paymentUrl} onOpenPayment={onOpenPayment} />
    </div>
  );
};

export default ResumePreview;
