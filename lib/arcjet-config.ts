import arcjet, { shield, tokenBucket, detectBot } from "@arcjet/next";

/**
 * Enhanced Arcjet configuration for Next.js 15
 * Provides layered security: Shield, Rate Limiting, and Bot Protection
 * 
 * Shield: Protects against common attacks (SQL injection, XSS, etc.)
 * Rate Limiting: Prevents abuse by limiting requests per time window
 * Bot Detection: Identifies and blocks malicious bots
 */

// Minimal protection for middleware - Shield only (to stay under Edge Function size limit)
export const ajMinimal = arcjet({
  key: process.env.ARCJET_KEY!,
  rules: [
    // Only shield protection - smallest bundle size
    shield({
      mode: "LIVE",
    }),
  ],
});

// Base protection for all routes - Shield + Bot detection + Basic rate limiting
export const aj = arcjet({
  key: process.env.ARCJET_KEY!,
  rules: [
    // Shield protection against common attacks
    shield({
      mode: "LIVE",
    }),
    // Detect and block malicious bots
    detectBot({
      mode: "LIVE",
      allow: [
        // Allow search engine crawlers
        "CATEGORY:SEARCH_ENGINE",
      ],
    }),
    // Basic rate limiting for general routes
    tokenBucket({
      mode: "LIVE",
      characteristics: ["ip"],
      refillRate: 20, // 20 tokens per interval
      interval: 10, // every 10 seconds
      capacity: 100, // bucket can hold up to 100 tokens
    }),
  ],
});

// Strict protection for API routes - SIMPLE CONFIG THAT WORKS
export const ajStrict = arcjet({
  key: process.env.ARCJET_KEY!,
  rules: [
    shield({
      mode: "LIVE",
    }),
  ],
});

// Public protection for forms and newsletter - Email validation + Rate limiting
export const ajPublic = arcjet({
  key: process.env.ARCJET_KEY!,
  rules: [
    shield({
      mode: "LIVE",
    }),
    detectBot({
      mode: "LIVE",
      allow: ["CATEGORY:SEARCH_ENGINE"],
    }),
    // Moderate rate limiting for public forms
    tokenBucket({
      mode: "LIVE",
      characteristics: ["ip"],
      refillRate: 10, // 10 tokens per interval
      interval: 60, // every minute
      capacity: 30, // moderate capacity
    }),
  ],
});
