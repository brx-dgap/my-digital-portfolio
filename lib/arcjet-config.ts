import arcjet, { shield } from "@arcjet/next";

/**
 * Simplified Arcjet configuration - just shield protection
 * This minimal config helps avoid errors while still protecting against attacks
 */

// Minimal protection - just shield (attack prevention)
export const aj = arcjet({
  key: process.env.ARCJET_KEY!,
  rules: [
    shield({
      mode: "LIVE",
    }),
  ],
});

// Same as aj for now - we can expand later once it's working
export const ajStrict = aj;
export const ajPublic = aj;
