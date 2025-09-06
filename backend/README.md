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

- Do NOT commit your Firebase service account JSON to the repository. If you already committed one, rotate the key immediately in the Firebase Console and remove it from the repo history.

- Supported ways to provide credentials (priority order used by the backend):

  1.  `FIREBASE_SERVICE_ACCOUNT_JSON` — put the full JSON contents in this env var (recommended for CI / secrets managers)
  2.  `FIREBASE_SERVICE_ACCOUNT` — absolute path to a local JSON file (development)
  3.  Application Default Credentials — `gcloud auth application-default login` or platform-provided credentials (preferred on GCP)

- The server will initialize `firebase-admin` using the first available method above and will attempt to access Firestore and Storage.

Storage notes / fallback

- If you don't have Cloud Storage enabled or credentials available, the server saves generated PDFs to `backend_storage/orders/{orderId}.pdf` and `GET /api/download/:orderId` returns the local file path (served by the server) when available.

Quick test (after npm install and .env):

1. Start server: `npm run dev`
2. Health: GET http://localhost:8080/health
3. Create test order (curl):

```bash
curl -X POST http://localhost:8080/api/create-order -H "Content-Type: application/json" -d '{"name":"Test"}'
```
