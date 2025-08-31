export type OrderStatus = 'pending' | 'paid' | 'processing' | 'ready' | 'failed';

export interface OrderRecord {
  id: string;
  status: OrderStatus;
  amountCents: number;
  currency: string;
  templateKey: string;
  resumeData: unknown;
  buyerEmail?: string;
  providerInfo?: Record<string, unknown>;
  downloadPath?: string;
  createdAt: string;
  updatedAt?: string;
}
