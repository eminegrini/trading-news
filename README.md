
# Next Trading Bot — EMA + RSI (Spot) + Supabase + Auth + Daily PDF + Pro UI

> **Educativo. No es consejo financiero. Úsalo bajo tu propio riesgo.**

## Stack
- Next.js 14 (App Router), Tailwind, Dark Mode (next-themes)
- ccxt (Spot) LIVE/Paper
- Supabase (DB + Auth)
- Nodemailer + PDFKit + Luxon (reporte diario PDF)
- Cron endpoints: `/api/cron`, `/api/daily-report`

## Setup
```bash
npm i
cp .env.local.example .env.local
# completa Supabase, SMTP y claves del exchange si LIVE
npm run dev
# tick manual:
open http://localhost:3000/api/cron
```

## Producción (Vercel)
- Variables de entorno: ver `.env.local.example`
- Cron Jobs:
  - `*/5 * * * *` → `/api/cron`
  - `0 1 * * *` → `/api/daily-report` (22:00 AR)
- `NEXT_PUBLIC_BASE_URL=https://tu-app.vercel.app`

## Notas
- `LIVE=true` habilita órdenes reales de mercado.
- Bot pausado desde el panel (`bot_config.paused`).
- PDF diario por email con trades del día y PnL.
