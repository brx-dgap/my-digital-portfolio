# Vercel Storage Configuration Guide

## Overview
This guide explains how to configure Vercel Storage (Postgres or KV) for the Digital Portfolio project.

## Postgres Configuration

### Step 1: Create Vercel Postgres Database
1. Go to [Vercel Dashboard](https://vercel.com/dashboard)
2. Navigate to your project
3. Go to "Storage" tab
4. Click "Create Database" → "Postgres"
5. Choose your preferred region (closest to your users)
6. Name it (e.g., "digital-portfolio-db")

### Step 2: Connection String
After creation, Vercel will provide:
- `POSTGRES_PRISMA_URL` - Connection string with connection pooling
- `POSTGRES_URL` - Direct connection string
- `POSTGRES_URL_NON_POOLING` - For migrations

### Step 3: Update Environment Variables
```bash
# Copy your connection strings to .env.local
DATABASE_URL=<your-postgres-url>
```

### Step 4: Test Connection
```bash
# Test the database connection
npm run db-test

# Run migrations
npm run db:migrate
```

## Vercel KV Configuration

### Step 1: Create Vercel KV Database
1. Go to Vercel Dashboard → Storage
2. Click "Create Database" → "KV"
3. Choose region
4. Name it (e.g., "digital-portfolio-cache")

### Step 2: Connection Strings
Vercel will provide:
- `KV_URL` - Redis connection URL
- `KV_REST_API_URL` - REST API endpoint
- `KV_REST_API_TOKEN` - REST API token

### Step 3: Update Environment Variables
```bash
# Copy to .env.local
KV_URL=<your-kv-url>
KV_REST_API_URL=<your-rest-url>
KV_REST_API_TOKEN=<your-token>
```

## Environment Setup

### For Local Development
1. Copy `.env.example` to `.env.local`
2. Fill in your actual values
3. Never commit `.env.local` to git

### For Production (Vercel)
1. Go to Project Settings → Environment Variables
2. Add each variable from `.env.example`
3. Vercel will automatically inject them during builds

### Sensitive Variables
These are production-only and should be set in Vercel:
- `CLERK_SECRET_KEY` - Clerk webhook secret
- `DATABASE_URL` - Production database URL
- `KV_REST_API_TOKEN` - KV authentication token

## Connection Pooling

### Recommended Settings
- **Vercel Postgres**: Use `POSTGRES_PRISMA_URL` for pooling (recommended)
- **For raw SQL**: Can use `POSTGRES_URL_NON_POOLING` for migrations

### Drizzle Configuration
The project is configured to use Neon's serverless driver, but can be switched to Vercel Postgres:

```typescript
// Update lib/db.ts for Vercel Postgres
import { sql } from '@vercel/postgres';
import { drizzle } from 'drizzle-orm/vercel-postgres';

export const db = drizzle(sql);
```

## Database Migrations

### Running Migrations Locally
```bash
# Generate migration files
npm run db:generate

# Apply migrations to local database
npm run db:migrate
```

### Running Migrations in Production
Vercel automatically runs migrations if using Vercel Postgres:
1. Push changes to main branch
2. Vercel builds and deploys
3. Migrations run automatically during build

For manual migration:
```bash
# Use non-pooling connection for migrations
POSTGRES_URL=<non-pooling-url> npm run db:migrate
```

## Security Best Practices

1. **Never share connection strings** - Only store in Vercel/local .env
2. **Use environment variables** - Never hardcode database URLs
3. **Rotate credentials regularly** - If leaked, regenerate immediately
4. **Monitor usage** - Check Vercel dashboard for unusual activity
5. **Enable SSL** - All connections should use SSL (enforced by default)

## Troubleshooting

### Connection Refused
- Verify DATABASE_URL is correct
- Check if database is active in Vercel
- Ensure IP is whitelisted (Vercel handles this)

### Slow Queries
- Check if using pooling connection
- Monitor database metrics in Vercel dashboard
- Consider adding indexes for frequently queried columns

### Migration Failures
- Check migration file syntax
- Ensure previous migrations completed
- Check available disk space in database

## Next Steps
- [Vercel Postgres Documentation](https://vercel.com/docs/storage/vercel-postgres)
- [Vercel KV Documentation](https://vercel.com/docs/storage/vercel-kv)
- [Drizzle ORM Documentation](https://orm.drizzle.team)
