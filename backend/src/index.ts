import express, { Request, Response } from 'express';
// load .env when running locally
import dotenv from 'dotenv';
dotenv.config();
import bodyParser from 'body-parser';
import cors from 'cors';
import { OrderRecord } from './types';
import { createOrderRecord, getOrderRecord, getSignedUrl } from './firestore';
import { generatePdfFromResume } from './worker/generatePdf';
import path from 'path';

const app = express();
app.use(cors());
app.use(bodyParser.json({ limit: '1mb' }));

// Health
app.get('/health', (_req: Request, res: Response) => {
  res.json({ ok: true, env: process.env.NODE_ENV || 'development', uptime: process.uptime() });
});

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
    // Sandbox: return a fake paymentUrl that front-end can open. In real mode this would come from Abacate.
    const fakePaymentUrl = `${req.protocol}://${req.get('host')}/pay/${id}`;
    res.status(201).json({ order, paymentUrl: fakePaymentUrl });

    // Auto-simulate payment in development or when AUTO_SIMULATE_PAY=1 is set
    const autoSim = process.env.AUTO_SIMULATE_PAY === '1' || process.env.NODE_ENV !== 'production';
    if (autoSim) {
      setTimeout(async () => {
        try {
          const paidAt = new Date().toISOString();
          const paidOrder = { ...order, status: 'paid', paidAt } as OrderRecord;
          await createOrderRecord(paidOrder);
          const storagePath = await generatePdfFromResume(id, order.resumeData);
          const readyOrder = { ...paidOrder, status: 'ready', pdfStoragePath: storagePath } as OrderRecord;
          await createOrderRecord(readyOrder);
        } catch (err) {
          console.error('auto-simulate error', err);
          const failedOrder = { ...order, status: 'failed' } as OrderRecord;
          await createOrderRecord(failedOrder);
        }
      }, 1500);
    }
  } catch (err) {
    console.error('create-order error', err);
    res.status(500).json({ error: 'internal' });
  }
});

// Sandbox: simulate the user completing payment. This endpoint would be called by the provider webhook in production.
app.post('/api/simulate-pay/:orderId', async (req: Request, res: Response) => {
  const { orderId } = req.params;
  try {
    const order = await getOrderRecord(orderId);
    if (!order) return res.status(404).json({ error: 'not found' });

    // mark as paid (we'll update Firestore directly)
    const paidAt = new Date().toISOString();
    const paidOrder = { ...order, status: 'paid', paidAt } as OrderRecord;
    await createOrderRecord(paidOrder);

    // Enqueue/generate PDF immediately in sandbox (no real queue)
    try {
      const storagePath = await generatePdfFromResume(orderId, order.resumeData);
      const readyOrder = { ...paidOrder, status: 'ready', pdfStoragePath: storagePath } as OrderRecord;
      await createOrderRecord(readyOrder);
    } catch (err) {
      console.error('pdf generation failed', err);
      const failedOrder = { ...paidOrder, status: 'failed' } as OrderRecord;
      await createOrderRecord(failedOrder);
    }

    res.json({ ok: true });
  } catch (err) {
    console.error('simulate-pay error', err);
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
    if (typeof url === 'string' && url.startsWith('file://')) {
      // converter URL file:// para caminho local (Windows-aware)
      const u = new URL(url);
      let filePath = u.pathname;
      // em Windows o pathname pode começar com '/C:/...'; remover barra inicial
      if (/^\/[A-Za-z]:\//.test(filePath)) filePath = filePath.slice(1);
      // resolve caminho absoluto
      filePath = path.resolve(filePath);
      return res.sendFile(filePath, (err) => {
        if (err) {
          console.error('sendFile error', err);
          res.status(500).json({ error: 'sendfile_failed', message: String(err) });
        }
      });
    }
    // caso normal (signed url HTTP) - redireciona
    return res.redirect(url);
  } catch (err) {
    console.error('download error', err);
    res.status(503).json({ error: 'storage_unavailable', message: err instanceof Error ? err.message : 'storage unavailable' });
  }
});

const PORT = Number(process.env.PORT || 8080);
// bind to localhost by default in development to avoid IPv6/firewall issues;
// allow override with HOST env var for container/prod deployments
const HOST = process.env.HOST || (process.env.NODE_ENV === 'production' ? '0.0.0.0' : '127.0.0.1');

// global error handlers to help debugging in dev
process.on('uncaughtException', (err) => {
  console.error('uncaughtException', err);
});
process.on('unhandledRejection', (reason) => {
  console.error('unhandledRejection', reason);
});

const server = app.listen(PORT, HOST, () => {
  console.log(`backend listening on http://${HOST}:${PORT}`);
  try {
    console.log('server.address()', server.address());
  } catch (err) {
    console.error('error reading server.address()', err);
  }
});

server.on('error', (err) => {
  console.error('server error', err);
  process.exit(1);
});

// internal self-check: attempt to call /health from the same process and log result
setTimeout(async () => {
  try {
    // use global fetch (node 18+)
    const res = await fetch(`http://127.0.0.1:${PORT}/health`);
    const body = await res.text();
    console.log('self-check /health response:', body);
  } catch (err) {
    console.error('self-check failed', err);
  }
}, 300);

export default app;
