Backend scaffold for gerador-curriculos

This folder contains a minimal Express + TypeScript scaffold for handling paid PDF generation.

Getting started (development):

1. cd backend
2. npm install
3. copy .env.example to .env and fill values
4. npm run dev

Endpoints (stubs)

- GET /health
- POST /api/create-order -> create order (returns order stub)
- GET /api/order/:orderId -> fetch order status
- POST /api/webhook -> receive payment webhooks
- GET /api/download/:orderId -> redirect to signed URL (not implemented)

Notes

- This is a scaffold. Replace TODOs with real Firestore/AbacatePay logic before using in production.

Firebase notes

- Place your service account JSON somewhere on disk and set FIREBASE_SERVICE_ACCOUNT to its absolute path in `.env`.
- The server will initialize firebase-admin and expect Firestore and Storage access.

Storage notes / fallback

- If you don't have Cloud Storage enabled, the `/api/download/:orderId` endpoint will return a 503 explaining storage is unavailable.
- You can still use Firestore to store orders and test the payment flow without Storage. Implement a local fallback (save PDFs to disk) or enable Storage later.

Quick test (after npm install and .env):

1. Start server: `npm run dev`
2. Health: GET http://localhost:8080/health
3. Create test order (curl):

```bash
curl -X POST http://localhost:8080/api/create-order -H "Content-Type: application/json" -d '{"name":"Test"}'
```
