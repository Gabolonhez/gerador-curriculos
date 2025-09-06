/**
 * Firestore helpers (placeholder).
 * Replace with firebase-admin initialization and actual reads/writes.
 */
import admin from 'firebase-admin';
import { OrderRecord } from './types';
import fs from 'fs';
import path from 'path';

function initFirebase() {
  if (admin.apps.length > 0) return admin.app();
  // Priority:
  // 1) FIREBASE_SERVICE_ACCOUNT_JSON (full JSON content in env) - good for CI / secrets
  // 2) FIREBASE_SERVICE_ACCOUNT (path to local JSON file) - dev local
  // 3) applicationDefault() (ADC via gcloud or platform) - fallback

  const saJson = process.env.FIREBASE_SERVICE_ACCOUNT_JSON || '';
  const saPath = process.env.FIREBASE_SERVICE_ACCOUNT || '';

  if (saJson) {
    const serviceAccount = JSON.parse(saJson);
    return admin.initializeApp({
      credential: admin.credential.cert(serviceAccount),
      storageBucket: process.env.PDF_BUCKET || `${serviceAccount.project_id}.appspot.com`,
    });
  }

  if (saPath && fs.existsSync(saPath)) {
    const serviceAccount = JSON.parse(fs.readFileSync(saPath, 'utf-8'));
    return admin.initializeApp({
      credential: admin.credential.cert(serviceAccount),
      storageBucket: process.env.PDF_BUCKET || `${serviceAccount.project_id}.appspot.com`,
    });
  }

  // No explicit service account found — use Application Default Credentials (gcloud auth application-default login,
  // or platform-provided credentials when running on GCP). Storage bucket may be undefined in this mode.
  return admin.initializeApp({
    credential: admin.credential.applicationDefault(),
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
  const saJson = process.env.FIREBASE_SERVICE_ACCOUNT_JSON || '';
  const saPath = process.env.FIREBASE_SERVICE_ACCOUNT || '';
  const hasServiceAccount = Boolean(saJson) || (saPath && fs.existsSync(saPath));

  if (!hasServiceAccount) {
    // Local fallback: write to backend_storage/orders/{orderId}.pdf and return file:// path
    const storageDir = path.resolve(__dirname, '../../backend_storage/orders');
    fs.mkdirSync(storageDir, { recursive: true });
    const filePath = path.join(storageDir, `${orderId}.pdf`);
    fs.writeFileSync(filePath, buffer);
    return `file://${filePath}`;
  }

  const app = initFirebase();
  const bucket = app.storage().bucket();
  const filePath = `orders/${orderId}.pdf`;
  const file = bucket.file(filePath);
  await file.save(buffer, { resumable: false, contentType: 'application/pdf' });
  // Make file private; return gs path
  return `gs://${bucket.name}/${filePath}`;
}

export async function getSignedUrl(orderId: string, expiresSeconds = 3600): Promise<string> {
  const saJson = process.env.FIREBASE_SERVICE_ACCOUNT_JSON || '';
  const saPath = process.env.FIREBASE_SERVICE_ACCOUNT || '';
  const hasServiceAccount = Boolean(saJson) || (saPath && fs.existsSync(saPath));

  if (!hasServiceAccount) {
    // Local fallback: return file:// path if the file exists
    const filePath = path.resolve(__dirname, '../../backend_storage/orders', `${orderId}.pdf`);
    if (!fs.existsSync(filePath)) throw new Error('PDF not found locally');
    return `file://${filePath}`;
  }

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
