# Arcjet Implementation for Next.js 15

## Overview
This project implements Arcjet security protection with a **hybrid approach** for Next.js 15 App Router:
- **Middleware:** Minimal protection (shield only) to stay under Vercel's 1 MB Edge Function limit
- **API Routes:** Full protection (shield + rate limiting + bot detection)

## Documentation References
- [Arcjet Get Started with Next.js](https://docs.arcjet.com/get-started?f-next-js)
- [Arcjet Bot Protection](https://docs.arcjet.com/bot-protection/identifying-bots)
- [Arcjet Filters](https://docs.arcjet.com/filters)
- [Next.js 15 Upgrade Guide](https://nextjs.org/docs/app/guides/upgrading/version-15)
- [Vercel Edge Function Limits](https://vercel.com/docs/functions/edge-functions/limits)

## Implementation Details

### Hybrid Architecture (Best of Both Worlds)

**Middleware Layer (All Routes):**
- ✅ Shield protection against attacks (SQL injection, XSS, etc.)
- ⚠️ No rate limiting (keeps bundle small)
- ⚠️ No bot detection (keeps bundle small)
- Bundle size: Optimized to stay under 1 MB

**API Route Layer:**
- ✅ Shield protection
- ✅ Rate limiting (prevents abuse)
- ✅ Bot detection
- No size constraints (Node.js runtime)

### Why This Approach?
Vercel Edge Functions (middleware) have a 1 MB size limit. Full Arcjet config (shield + rate limiting + bot detection) exceeds this. By using **shield-only** in middleware, we get:

1. **Attack protection on all routes** (middleware)
2. **Full security on critical endpoints** (API routes)
3. **Vercel deployment compliance** (under size limit)
4. **Dashboard visibility** for both layers

### Configuration Files

#### 1. lib/arcjet-config.ts
Four protection levels:

**`ajMinimal`** - Middleware (shield only)
- Shield: LIVE mode
- Purpose: Keep Edge Function bundle small while blocking attacks

**`aj`** - Base protection
- Shield: LIVE mode
- Bot detection: Allows search engines
- Rate limiting: 20 tokens/10s, capacity 100

**`ajStrict`** - API routes & admin
- Shield: LIVE mode
- Bot detection: No bots allowed
- Rate limiting: 5 tokens/10s, capacity 20

**`ajPublic`** - Forms & newsletter
- Shield: LIVE mode
- Bot detection: Allows search engines
- Rate limiting: 10 tokens/60s, capacity 30

#### 2. middleware.ts
Uses `ajMinimal` for attack protection:
- Shield blocks SQL injection, XSS, etc. on all routes
- Graceful error handling (fail-open strategy)
- Clerk authentication for protected routes
- Optimized bundle size for Vercel Edge

#### 3. API Routes
Use `ajStrict` for comprehensive protection:
- `app/api/journal/route.ts` - GET and POST
- `app/api/journal/[id]/route.ts` - DELETE

## Security Coverage

### What's Protected Everywhere (Middleware)
✅ SQL injection attacks  
✅ Cross-site scripting (XSS)  
✅ Path traversal  
✅ Command injection  
✅ Other common web attacks  

### What's Protected on APIs Only
✅ Rate limiting (prevents abuse)  
✅ Bot detection (blocks malicious bots)  
✅ All shield protections (double layer)  

### What's Not Protected
⚠️ Page route rate limiting (pages can be refreshed unlimited times)  
⚠️ Bot detection on pages (bots can crawl public pages)  

**Note:** Clerk still protects authenticated routes regardless of Arcjet.