import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import arcjet, { shield, detectBot, tokenBucket } from "@arcjet/next";
import { NextResponse } from "next/server";

/**
 * Arcjet security configuration
 * Provides bot detection, rate limiting, and shield protection
 */
const aj = arcjet({
  key: process.env.ARCJET_KEY!,
  characteristics: ["ip.src"], // Track requests by IP
  rules: [
    // Shield protects against common attacks (SQLi, XSS, etc.)
    shield({
      mode: "LIVE", // Use "DRY_RUN" for testing without blocking
    }),
    // Detect and block automated clients/bots
    detectBot({
      mode: "LIVE",
      allow: ["CATEGORY:SEARCH_ENGINE"], // Allow search engine crawlers
    }),
    // Rate limiting: 60 requests per 60 seconds per IP
    tokenBucket({
      mode: "LIVE",
      refillRate: 60,
      interval: 60,
      capacity: 60,
    }),
  ],
});

/**
 * Protected routes that require user authentication
 * Users must be signed in with Clerk to access these routes
 */
const isProtectedRoute = createRouteMatcher([
  '/admin(.*)',
  '/resources(.*)',
  '/projects(.*)',
  '/security-journal(.*)',
]);

export default clerkMiddleware(async (auth, req) => {
  // Run Arcjet security checks first
  const decision = await aj.protect(req);
  
  // Check for errors and fail open (allow request through)
  for (const result of decision.results) {
    if (result.reason.isError()) {
      // Log the error but continue processing
      console.warn("Arcjet error:", result.reason.message);
      // The request will be allowed to continue
    }
  }
  
  // Block denied requests
  if (decision.isDenied()) {
    console.log("Arcjet blocked request:", decision.reason);
    
    // Return 429 for rate limit, 403 for other blocks
    if (decision.reason.isRateLimit()) {
      return NextResponse.json(
        { error: "Too many requests" },
        { status: 429 }
      );
    }
    
    return NextResponse.json(
      { error: "Forbidden" },
      { status: 403 }
    );
  }
  
  // Protect routes that require authentication
  if (isProtectedRoute(req)) {
    await auth.protect();
  }
});

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    // Always run for API routes
    '/(api|trpc)(.*)',
  ],
};