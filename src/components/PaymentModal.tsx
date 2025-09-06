import React from 'react';

interface Props {
  open: boolean;
  onClose: () => void;
  paymentUrl: string | null;
  onOpenPayment: () => void;
}

const PaymentModal: React.FC<Props> = ({ open, onClose, paymentUrl, onOpenPayment }) => {
  if (!open) return null;
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded p-6 w-full max-w-md">
        <h3 className="text-lg font-bold mb-4">Pagamento necessário</h3>
        <p className="mb-4">Para baixar o PDF é necessário efetuar o pagamento.</p>
        <div className="flex justify-end gap-2">
          <button className="px-4 py-2 bg-gray-200 rounded" onClick={onClose}>Cancelar</button>
          <button className="px-4 py-2 bg-blue-600 text-white rounded" onClick={onOpenPayment} disabled={!paymentUrl}>{paymentUrl ? 'Ir para pagamento' : 'Aguardar'}</button>
        </div>
      </div>
    </div>
  );
};

export default PaymentModal;
