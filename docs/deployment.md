# Deployment Guide

## Prerequisites

- Node.js 18+
- PostgreSQL database
- Environment variables configured

## Environment Variables

Copy `.env.example` to `.env.local` and configure:

```bash
DATABASE_URL="postgresql://username:password@localhost:5432/iseav_aru_db"
NEXTAUTH_URL="https://your-domain.com"
NEXTAUTH_SECRET="your-production-secret"
```

## Build and Deploy

### Development
```bash
npm install
npm run dev
```

### Production
```bash
npm install
npm run build
npm start
```

### Database Setup
```bash
# Run migrations
npx prisma migrate deploy

# Seed database
node scripts/seed-database.js
```

## Vercel Deployment

1. Connect your GitHub repository to Vercel
2. Configure environment variables in Vercel dashboard
3. Deploy automatically on git push

## Manual Server Deployment

1. Clone repository
2. Install dependencies
3. Build application
4. Configure reverse proxy (nginx)
5. Set up PM2 for process management