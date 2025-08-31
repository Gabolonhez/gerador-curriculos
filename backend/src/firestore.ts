/**
 * Firestore helpers (placeholder).
 * Replace with firebase-admin initialization and actual reads/writes.
 */
import admin from 'firebase-admin';
import { OrderRecord } from './types';
import fs from 'fs';

function initFirebase() {
  if (admin.apps.length > 0) return admin.app();

  const serviceAccountPath = process.env.FIREBASE_SERVICE_ACCOUNT || '';
  if (!serviceAccountPath || !fs.existsSync(serviceAccountPath)) {
    throw new Error('FIREBASE_SERVICE_ACCOUNT is not set or file not found');
  }

  const serviceAccount = JSON.parse(fs.readFileSync(serviceAccountPath, 'utf-8'));
  return admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    storageBucket: process.env.PDF_BUCKET || `${serviceAccount.project_id}.appspot.com`
  });
}

export async function createOrderRecord(order: OrderRecord): Promise<OrderRecord> {
  const app = initFirebase();
  const db = app.firestore();
  const ref = db.collection('orders').doc(order.id);
  await ref.set(order);
  return order;
}

export async function getOrderRecord(id: string): Promise<OrderRecord | null> {
  const app = initFirebase();
  const db = app.firestore();
  const doc = await db.collection('orders').doc(id).get();
  if (!doc.exists) return null;
  return doc.data() as OrderRecord;
}

export async function uploadPdfBuffer(orderId: string, buffer: Buffer): Promise<string> {
  const app = initFirebase();
  const bucket = app.storage().bucket();
  const filePath = `orders/${orderId}.pdf`;
  const file = bucket.file(filePath);
  await file.save(buffer, { resumable: false, contentType: 'application/pdf' });
  // Make file private; return gs path
  return `gs://${bucket.name}/${filePath}`;
}

export async function getSignedUrl(orderId: string, expiresSeconds = 3600): Promise<string> {
  // If PDF_BUCKET not configured, fail fast with a helpful error.
  const bucketName = process.env.PDF_BUCKET;
  if (!bucketName) throw new Error('Storage not configured (PDF_BUCKET missing)');

  try {
    const app = initFirebase();
    const bucket = app.storage().bucket();
    const file = bucket.file(`orders/${orderId}.pdf`);
    const [url] = await file.getSignedUrl({ action: 'read', expires: Date.now() + expiresSeconds * 1000 });
    return url;
  } catch (err) {
    // Bubble up a clear message for the caller to return an HTTP-friendly error.
    console.error('getSignedUrl error', err);
    throw new Error('Unable to generate signed URL (storage may be unavailable or permissions are missing)');
  }
}
