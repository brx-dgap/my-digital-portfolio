import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import arcjet, { shield } from "@arcjet/next";
import { NextResponse } from "next/server";

/**
 * Arcjet security configuration
 * Lightweight middleware with just shield protection
 * Rate limiting is handled in individual API routes
 */
const aj = arcjet({
  key: process.env.ARCJET_KEY!,
  rules: [
    // Shield protects against common attacks (SQLi, XSS, etc.)
    shield({
      mode: "LIVE",
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
  // Run Arcjet shield protection
  const decision = await aj.protect(req);
  
  // Check for errors and fail open
  if (decision.reason && decision.reason.isError && decision.reason.isError()) {
    console.warn("Arcjet error:", decision.reason.message);
  }
  
  // Block if shield detects an attack
  if (decision.isDenied()) {
    console.log("Arcjet blocked request:", decision.reason);
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