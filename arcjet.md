# Arcjet Implementation for Next.js 15

## Overview
This project implements Arcjet security protection with Next.js 15 App Router, integrated alongside Clerk authentication for comprehensive security.

## Documentation References
- [Arcjet Get Started with Next.js](https://docs.arcjet.com/get-started?f-next-js)
- [Arcjet Bot Protection](https://docs.arcjet.com/bot-protection/identifying-bots)
- [Arcjet Filters](https://docs.arcjet.com/filters)
- [Next.js 15 Upgrade Guide](https://nextjs.org/docs/app/guides/upgrading/version-15)
- [Next.js Proxy Configuration](https://nextjs.org/docs/app/getting-started/proxy)

## Implementation Details

### Architecture
Arcjet provides a layered security approach:
1. **Shield Protection** - Defends against common attacks (SQL injection, XSS, etc.)
2. **Rate Limiting** - Token bucket algorithm to prevent abuse
3. **Bot Detection** - Identifies and blocks malicious bots while allowing search engines

### Configuration Files

#### 1. lib/arcjet-config.ts
Three protection levels for different use cases:

**`aj`** - Base protection (middleware, general routes)
- Shield: LIVE mode
- Bot detection: Allows search engines
- Rate limiting: 20 tokens/10s, capacity 100

**`ajStrict`** - Strict protection (API routes, admin)
- Shield: LIVE mode
- Bot detection: No bots allowed
- Rate limiting: 5 tokens/10s, capacity 20

**`ajPublic`** - Public protection (forms, newsletter)
- Shield: LIVE mode
- Bot detection: Allows search engines
- Rate limiting: 10 tokens/60s, capacity 30

#### 2. middleware.ts
Integrates Arcjet with Clerk authentication:
- Arcjet runs first for all requests
- Graceful error handling (fail-open strategy)
- Returns appropriate HTTP status codes (429 for rate limit, 403 for bots)
- Clerk authentication applied after Arcjet approval
- Protects: /admin, /resources, /projects, /security-journal

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
✅ Async request handling in middleware
✅ App Router structure
✅ Compatible with Clerk middleware
✅ Turbo mode support

## Error Handling Strategy
The implementation uses a "fail-open" approach:
- If Arcjet encounters an error, the request proceeds
- Errors are logged with `console.warn`
- Production systems remain available during Arcjet outages
- Critical security decisions still block requests (rate limits, bot detection)

## Testing Checklist
- [ ] Verify rate limiting works (test with rapid requests)
- [ ] Confirm bot detection (use curl with bot user-agent)
- [ ] Check Clerk authentication still works
- [ ] Test API endpoints with ajStrict protection
- [ ] Verify search engine crawlers can access public pages
- [ ] Monitor Arcjet dashboard for decision logs

## Usage Examples

### In Middleware (automatic)
```typescript
// Applied automatically to all routes via middleware.ts
// No code changes needed in individual routes
```

### In API Routes
```typescript
import { ajStrict } from '@/lib/arcjet-config';

export async function GET(req: Request) {
  const decision = await ajStrict.protect(req);
  
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
import { ajPublic } from '@/lib/arcjet-config';

export async function submitForm(formData: FormData) {
  const decision = await ajPublic.protect(request);
  
  if (decision.isDenied()) {
    throw new Error('Request denied');
  }
  
  // Process form
}
```

## Migration Notes
Upgraded from minimal shield-only config to comprehensive protection:
- ✅ Added rate limiting with token bucket algorithm
- ✅ Integrated bot detection
- ✅ Created three protection tiers (base, strict, public)
- ✅ Integrated with Clerk middleware
- ✅ Next.js 15 compatibility ensured

## Troubleshooting

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
1. `ARCJET_KEY` is set in environment variables
2. Arcjet service status
3. Network connectivity to Arcjet API
4. Console logs for specific error messages

## Security Benefits
1. **Attack Prevention** - Shield blocks common web attacks automatically
2. **DDoS Protection** - Rate limiting prevents resource exhaustion
3. **Bot Protection** - Malicious bots are identified and blocked
4. **Layered Defense** - Works alongside Clerk auth and Next.js security headers
5. **Observable** - All decisions logged to Arcjet dashboard

## Performance Impact
- Minimal latency (< 10ms for most requests)
- Decisions cached where appropriate
- Fail-open strategy prevents blocking on errors
- Edge-compatible (works with Vercel Edge Runtime)

---

**Last Updated:** January 19, 2026  
**Arcjet Version:** 1.0.0-beta.15  
**Next.js Version:** 15.5.7