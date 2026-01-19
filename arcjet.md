# Arcjet Implementation for Next.js 15

## Overview
This project implements Arcjet security protection for **API routes only** in Next.js 15 App Router:
- **Middleware:** Clerk authentication only (optimized for Vercel Edge Function 1 MB limit)
- **API Routes:** Full Arcjet protection (shield + rate limiting + bot detection)

**Note:** Even minimal Arcjet configuration (shield-only) exceeds Vercel's free tier 1 MB Edge Function limit. API-route protection is the optimal solution for this constraint.

## Documentation References
- [Arcjet Get Started with Next.js](https://docs.arcjet.com/get-started?f-next-js)
- [Arcjet Bot Protection](https://docs.arcjet.com/bot-protection/identifying-bots)
- [Arcjet Filters](https://docs.arcjet.com/filters)
- [Next.js 15 Upgrade Guide](https://nextjs.org/docs/app/guides/upgrading/version-15)
- [Vercel Edge Function Limits](https://vercel.com/docs/functions/edge-functions/limits)

## Implementation Details

### API-Only Architecture (Vercel Optimized)

**Middleware Layer (All Routes):**
- ✅ Clerk authentication for protected pages
- ⚠️ No Arcjet (even shield-only is 1.03 MB, exceeds 1 MB limit)
- Bundle size: ~142 KB (well under 1 MB limit)
- ✅ Deploys successfully on Vercel free tier

**API Route Layer:**
- ✅ Full Arcjet protection with `ajStrict`
- ✅ Shield protection (SQL injection, XSS, etc.)
- ✅ Rate limiting (5 requests per 10 seconds)
- ✅ Bot detection (blocks malicious bots)
- ✅ No size constraints (Node.js runtime)
- ✅ Complete dashboard visibility

### Why API-Only?
**Tested approaches:**
1. ❌ Full Arcjet in middleware → 1.03 MB (exceeds limit)
2. ❌ Shield-only in middleware → 1.03 MB (still exceeds limit)
3. ✅ **API routes only** → Deploys successfully

Arcjet's core libraries are inherently too large for Vercel free tier Edge Functions, even with minimal configuration. API-route protection ensures:

1. **Critical endpoints protected** (where data changes happen)
2. **Vercel deployment success** (no bundle size errors)
3. **Full security features** (shield + rate limiting + bot detection)
4. **Dashboard visibility** (all API activity tracked)

### Configuration Files

#### 1. lib/arcjet-config.ts
Three protection levels (ajMinimal exists but unused due to size constraints):

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
Clerk authentication only:
- No Arcjet integration (size constraint)
- Protects: /admin, /resources, /projects, /security-journal
- Lightweight: ~142 KB bundle
- Vercel Edge Function compliantPOST
- `app/api/journal/[id]/route.ts` - DELETE

## Security Coverage

### What's Protected (API Routes)
✅ **Shield protection** - SQL injection, XSS, path traversal, command injection  
✅ **Rate limiting** - 5 requests per 10 seconds (prevents abuse)  
✅ **Bot detection** - Blocks malicious bots from API endpoints  
✅ **Dashboard tracking** - All API activity logged and visible  

### What Clerk Protects (Pages)
✅ **Authentication** - /admin, /resources, /projects, /security-journal  
✅ **User session management**  
✅ **Protected route access control**  

### What's Not Protected
⚠️ **Page-level Arcjet protection** (Vercel size limit)  
⚠️ **Rate limiting on page loads** (pages can be refreshed unlimited)  
⚠️ **Bot detection on static pages** (bots can crawl public content)  

**Security Philosophy:** Protect where it matters most - **APIs handle data mutations** and are the primary attack surface. Pages are mostly static content and protected by Clerk where authentication is needed.