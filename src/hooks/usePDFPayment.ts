import { useCallback, useState } from 'react';

type OrderStatus = 'pending' | 'paid' | 'processing' | 'ready' | 'failed';

export function usePDFPayment() {
  const [loading, setLoading] = useState(false);
  const [orderId, setOrderId] = useState<string | null>(null);
  const [paymentUrl, setPaymentUrl] = useState<string | null>(null);
  const [status, setStatus] = useState<OrderStatus | null>(null);

  const createOrder = useCallback(async (resumeData: unknown) => {
    setLoading(true);
    try {
      const res = await fetch('/api/create-order', { method: 'POST', body: JSON.stringify(resumeData), headers: { 'Content-Type': 'application/json' } });
      const json = await res.json();
      setOrderId(json.order.id);
      setPaymentUrl(json.paymentUrl || null);
      setStatus(json.order.status || 'pending');
      return json;
    } finally {
      setLoading(false);
    }
  }, []);

  const pollStatus = useCallback(async (id: string) => {
    let delay = 1000;
    const start = Date.now();
    while (true) {
      const res = await fetch(`/api/order/${id}`);
      if (res.ok) {
        const json = await res.json();
        setStatus(json.status);
        if (json.status === 'ready' || json.status === 'failed') return json;
      }
      await new Promise((r) => setTimeout(r, delay));
      delay = Math.min(5000, delay * 2);
      if (Date.now() - start > 1000 * 60 * 3) throw new Error('poll timeout');
    }
  }, []);

  const download = useCallback(async (id: string) => {
    const res = await fetch(`/api/download/${id}`);
    if (!res.ok) throw new Error('download failed');
    // If backend redirected, the browser handles it. For file:// the response url will be file://
    const url = res.url || (await res.json()).url;
    window.open(url, '_blank');
  }, []);

  return { loading, orderId, paymentUrl, status, createOrder, pollStatus, download };
}
