# Backend Payment System

## Struktur Direktori
```
backend/
├── src/
│   ├── config/         # Konfigurasi
│   ├── controllers/    # Logic bisnis
│   ├── models/         # Model database
│   ├── routes/         # Definisi routes
│   ├── middleware/     # Custom middleware
│   ├── utils/          # Helper functions
│   └── app.js         # File utama aplikasi
├── .env               # Environment variables
└── package.json
```

## Cara Menjalankan
1. Install dependencies:
```bash
npm install
```

2. Buat file .env dan isi dengan:
```
PORT=3000
NODE_ENV=development
JWT_SECRET=your_jwt_secret_key_here
```

3. Jalankan server:
```bash
# Development mode
npm run dev

# Production mode
npm start
```

## API Endpoints

### Payments
- POST /api/payments/bayar
  - Body: { name: string, amount: number }
- GET /api/payments/history

### Authentication
- POST /api/auth/login
- POST /api/auth/register 