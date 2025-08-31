import express, { Request, Response } from 'express';
// load .env when running locally
import dotenv from 'dotenv';
dotenv.config();
import bodyParser from 'body-parser';
import cors from 'cors';
import { OrderRecord } from './types';
import { createOrderRecord, getOrderRecord, getSignedUrl } from './firestore';

const app = express();
app.use(cors());
app.use(bodyParser.json({ limit: '1mb' }));

// Health
app.get('/health', (_req: Request, res: Response) => res.json({ ok: true }));

// Create order (placeholder)
app.post('/api/create-order', async (req: Request, res: Response) => {
  const payload = req.body as unknown;
  try {
    const id = 'order_' + Date.now();
    const order: OrderRecord = {
      id,
      status: 'pending',
      amountCents: 1000,
      currency: 'BRL',
      templateKey: 'optimized',
      resumeData: payload,
      createdAt: new Date().toISOString(),
    };

    await createOrderRecord(order);

  res.status(201).json({ order });
  } catch (err) {
    console.error('create-order error', err);
    res.status(500).json({ error: 'internal' });
  }
});

// Order status
app.get('/api/order/:orderId', async (req: Request, res: Response) => {
  const { orderId } = req.params;
  try {
    const order = await getOrderRecord(orderId);
    if (!order) return res.status(404).json({ error: 'not found' });
    res.json(order);
  } catch (err) {
    console.error('get-order error', err);
    res.status(500).json({ error: 'internal' });
  }
});

// Debug endpoint: create a test order quickly via GET (useful for browser testing)
app.get('/api/create-order-test', async (_req: Request, res: Response) => {
  try {
    const id = 'order_test_' + Date.now();
    const order: OrderRecord = {
      id,
      status: 'pending',
      amountCents: 1000,
      currency: 'BRL',
      templateKey: 'optimized',
      resumeData: { test: true },
      createdAt: new Date().toISOString(),
    };

  await createOrderRecord(order);
  res.status(201).json({ order });
  } catch (err) {
    console.error('create-order-test error', err);
    res.status(500).json({ error: 'internal', message: err instanceof Error ? err.message : String(err) });
  }
});

// Download (signed URL redirect)
app.get('/api/download/:orderId', async (req: Request, res: Response) => {
  const { orderId } = req.params;
  try {
  const url = await getSignedUrl(orderId);
  res.redirect(url);
  } catch (err) {
  console.error('download error', err);
  res.status(503).json({ error: 'storage_unavailable', message: err instanceof Error ? err.message : 'storage unavailable' });
  }
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => console.log(`backend listening on ${PORT}`));

export default app;
