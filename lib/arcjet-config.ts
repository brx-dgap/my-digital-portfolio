import arcjet, { shield, detectBot, tokenBucket } from "@arcjet/next";

/**
 * Arcjet configuration for API route protection
 * 
 * Use this in your API routes instead of middleware to avoid bundle size limits.
 * 
 * Example usage in an API route:
 * 
 * import { aj, ajStrict } from "@/lib/arcjet-config";
 * 
 * export async function POST(req: Request) {
 *   const decision = await aj.protect(req);
 *   if (decision.isDenied()) {
 *     if (decision.reason.isRateLimit()) {
 *       return NextResponse.json({ error: "Too many requests" }, { status: 429 });
 *     }
 *     return NextResponse.json({ error: "Forbidden" }, { status: 403 });
 *   }
 *   // ... your API logic
 * }
 */

// Standard protection for most API routes
export const aj = arcjet({
  key: process.env.ARCJET_KEY!,
  characteristics: ["ip.src"], // Track by IP address
  rules: [
    // Shield protects against common attacks (SQLi, XSS, path traversal, etc.)
    shield({
      mode: "LIVE",
    }),
    // Detect and block automated clients/bots
    detectBot({
      mode: "LIVE",
      // Allow legitimate bots
      allow: [
        "CATEGORY:SEARCH_ENGINE", // Google, Bing, DuckDuckGo, etc.
        "CATEGORY:MONITOR",        // Uptime monitors like UptimeRobot
        "CATEGORY:PREVIEW",        // Link previews (Slack, Discord, Twitter)
      ],
    }),
    // Rate limiting: 100 requests per minute per IP
    tokenBucket({
      mode: "LIVE",
      refillRate: 100,
      interval: 60,
      capacity: 100,
    }),
  ],
});

// Stricter protection for sensitive endpoints (e.g., admin, auth)
export const ajStrict = arcjet({
  key: process.env.ARCJET_KEY!,
  characteristics: ["ip.src"],
  rules: [
    shield({
      mode: "LIVE",
    }),
    detectBot({
      mode: "LIVE",
      allow: [], // Block all bots on sensitive routes
    }),
    // Stricter rate limit: 20 requests per minute
    tokenBucket({
      mode: "LIVE",
      refillRate: 20,
      interval: 60,
      capacity: 20,
    }),
  ],
});

// Lenient protection for public read-only endpoints
export const ajPublic = arcjet({
  key: process.env.ARCJET_KEY!,
  characteristics: ["ip.src"],
  rules: [
    shield({
      mode: "LIVE",
    }),
    // More generous rate limit: 200 requests per minute
    tokenBucket({
      mode: "LIVE",
      refillRate: 200,
      interval: 60,
      capacity: 200,
    }),
  ],
});
