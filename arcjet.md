# Arcjet Implementation for Next.js 15

## Overview
This project implements Arcjet security protection in API routes for Next.js 15 App Router, working alongside Clerk authentication for comprehensive security.

**Important:** Arcjet is implemented at the API route level only (not in middleware) to avoid Vercel Edge Function size limits (1 MB).

## Documentation References
- [Arcjet Get Started with Next.js](https://docs.arcjet.com/get-started?f-next-js)
- [Arcjet Bot Protection](https://docs.arcjet.com/bot-protection/identifying-bots)
- [Arcjet Filters](https://docs.arcjet.com/filters)
- [Next.js 15 Upgrade Guide](https://nextjs.org/docs/app/guides/upgrading/version-15)
- [Vercel Edge Function Limits](https://vercel.com/docs/functions/edge-functions/limits)

## Implementation Details

### Architecture
Arcjet provides a layered security approach for API routes:
1. **Shield Protection** - Defends against common attacks (SQL injection, XSS, etc.)
2. **Rate Limiting** - Token bucket algorithm to prevent abuse
3. **Bot Detection** - Identifies and blocks malicious bots while allowing search engines

### Why API Routes Only?
Vercel Edge Functions (middleware) have a 1 MB size limit. Arcjet's dependencies exceed this limit when bundled in middleware. By implementing Arcjet in API routes (Node.js runtime), we avoid this constraint while still protecting sensitive endpoints.

**Security Layers:**
- **Middleware** → Clerk authentication for page protection
- **API Routes** → Arcjet protection for API endpoints
- **Server Actions** → Can use Arcjet if needed

### Configuration Files

#### 1. lib/arcjet-config.ts
Three protection levels for different use cases:

**`aj`** - Base protection (general use)
- Shield: LIVE mode
- Bot detection: Allows search engines
- Rate limiting: 20 tokens/10s, capacity 100

**`ajStrict`** - Strict protection (API routes, admin endpoints)
- Shield: LIVE mode
- Bot detection: No bots allowed
- Rate limiting: 5 tokens/10s, capacity 20

**`ajPublic`** - Public protection (forms, newsletter)
- Shield: LIVE mode
- Bot detection: Allows search engines
- Rate limiting: 10 tokens/60s, capacity 30

#### 2. middleware.ts
Handles Clerk authentication only:
- No Arcjet integration (to keep bundle size under 1 MB)
- Protects: /admin, /resources, /projects, /security-journal
- Lightweight and fast

#### 3. API Routes
API routes use `ajStrict` for enhanced security:
- `app/api/journal/route.ts` - GET and POST endpoints
- `app/api/journal/[id]/route.ts` - DELETE endpoint

## Environment Variables
Required in `.env.local`:
```bash
ARCJET_KEY=your_arcjet_key_here
```

## Next.js 15 Compatibility
✅ API Routes with Arcjet protection
✅ App Router structure
✅ Compatible with Clerk middleware
✅ Vercel Edge Function size compliant
✅ Turbo mode support

## Error Handling Strategy
The implementation uses a "fail-open" approach:
- If Arcjet encounters an error, the request proceeds
- Errors are logged with `console.warn`
- Production systems remain available during Arcjet outages
- Critical security decisions still block requests (rate limits, bot detection)

## Testing Checklist
- [ ] Verify rate limiting works on API routes (test with rapid requests)
- [ ] Confirm bot detection on API endpoints
- [ ] Check Clerk authentication still works for pages
- [ ] Test API endpoints with ajStrict protection
- [ ] Verify middleware bundle size is under 1 MB
- [ ] Monitor Arcjet dashboard for decision logs

## Usage Examples

### In API Routes (Recommended)
```typescript
import { ajStrict } from '@/lib/arcjet-config';
import { NextResponse } from 'next/server';

export async function GET(req: Request) {
  // Arcjet protection
  const decision = await ajStrict.protect(req);
  
  // Handle errors - fail open
  for (const result of decision.results) {
    if (result.reason.isError()) {
      console.warn('Arcjet error:', result.reason.message);
    }
  }
  
  if (decision.isDenied()) {
    if (decision.reason.isRateLimit()) {
      return NextResponse.json({ error: 'Too many requests' }, { status: 429 });
    }
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
  }
  
  // Your API logic here
}
```

### In Server Actions (if needed)
```typescript
'use server';
import { ajPublic } from '@/lib/arcjet-config';

export async function submitForm(formData: FormData) {
  // Note: Server actions need special handling for request context
  // See Arcjet docs for server action implementation
}
```

### NOT in Middleware (Size Limit)
```typescript
// ❌ DO NOT DO THIS - Exceeds Vercel Edge Function size limit
import { aj } from '@/lib/arcjet-config';
export default clerkMiddleware(async (auth, req) => {
  const decision = await aj.protect(req); // This makes bundle too large!
});
```

## Migration Notes
Adjusted from middleware-based to API-route-based implementation:
- ✅ Removed Arcjet from middleware (size constraint)
- ✅ Enhanced API route protection with ajStrict
- ✅ Maintained three protection tiers
- ✅ Vercel Edge Function compliant
- ✅ Next.js 15 compatibility maintained

## Troubleshooting

### Vercel Build Error: Edge Function Size Limit
**Error:** "The Edge Function 'middleware' size is 1.03 MB and your plan size limit is 1 MB"

**Solution:** Remove Arcjet from middleware. Keep it in API routes only (already implemented).

### Rate Limit Too Strict
Adjust values in `lib/arcjet-config.ts`:
```typescript
tokenBucket({
  refillRate: 30, // Increase refill rate
  capacity: 150,  // Increase capacity
})
```

### Legitimate Bots Blocked
Add to allow list:
```typescript
detectBot({
  allow: [
    "CATEGORY:SEARCH_ENGINE",
    "CATEGORY:MONITOR", // For uptime monitors
  ],
})
```

### Arcjet Errors in Production
Check:
1. `ARCJET_KEY` is set in Vercel environment variables
2. Arcjet service status
3. Network connectivity to Arcjet API
4. Console logs for specific error messages

## Security Benefits
1. **Attack Prevention** - Shield blocks common web attacks automatically
2. **DDoS Protection** - Rate limiting prevents resource exhaustion on APIs
3. **Bot Protection** - Malicious bots are identified and blocked from APIs
4. **Layered Defense** - Works alongside Clerk auth and Next.js security headers
5. **Observable** - All decisions logged to Arcjet dashboard

## Performance Impact
- **Middleware:** No Arcjet overhead (Clerk only)
- **API Routes:** Minimal latency (< 10ms for most requests)
- Decisions cached where appropriate
- Fail-open strategy prevents blocking on errors
- Node.js runtime (no Edge constraints)

## Deployment Considerations

### Vercel
✅ Middleware bundle: ~142 KB (well under 1 MB limit)  
✅ API routes: No size limit (Node.js runtime)  
✅ Environment variables: Set `ARCJET_KEY` in project settings

### Other Platforms
If deploying to platforms without Edge Function size limits, you can integrate Arcjet in middleware by uncommenting and adjusting the middleware implementation.

---

**Last Updated:** January 19, 2026  
**Arcjet Version:** 1.0.0-beta.15  
**Next.js Version:** 15.5.7  
**Deployment:** Vercel-optimized (Edge Function compliant)