import arcjet, { shield, detectBot, tokenBucket } from "@arcjet/next";

/**
 * Arcjet configuration for API route protection
 * 
 * Use this in your API routes instead of middleware to avoid bundle size limits.
 * 
 * Example usage in an API route:
 * 
 * import { aj } from "@/lib/arcjet-config";
 * 
 * export async function POST(req: Request) {
 *   const decision = await aj.protect(req);
 *   if (decision.isDenied()) {
 *     return NextResponse.json({ error: "Forbidden" }, { status: 403 });
 *   }
 *   // ... your API logic
 * }
 */
export const aj = arcjet({
  key: process.env.ARCJET_KEY!,
  characteristics: ["ip.src"],
  rules: [
    // Shield protects against common attacks (SQLi, XSS, etc.)
    shield({
      mode: "LIVE",
    }),
    // Detect and block automated clients/bots
    detectBot({
      mode: "LIVE",
      allow: ["CATEGORY:SEARCH_ENGINE"],
    }),
    // Rate limiting: 60 requests per minute
    tokenBucket({
      mode: "LIVE",
      refillRate: 60,
      interval: 60,
      capacity: 60,
    }),
  ],
});
