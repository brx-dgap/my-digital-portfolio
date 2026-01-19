import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import { aj } from "@/lib/arcjet-config";

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
  // Apply Arcjet protection first (shield, rate limiting, bot detection)
  const decision = await aj.protect(req);
  
  // Handle Arcjet errors gracefully - fail open
  for (const result of decision.results) {
    if (result.reason.isError()) {
      console.warn('Arcjet middleware error:', result.reason.message);
      // Continue processing even if Arcjet has an error
    }
  }
  
  // Block if Arcjet denies the request
  if (decision.isDenied()) {
    if (decision.reason.isRateLimit()) {
      return NextResponse.json(
        { error: 'Too many requests. Please try again later.' },
        { status: 429 }
      );
    }
    if (decision.reason.isBot()) {
      return NextResponse.json(
        { error: 'Bot detected. Access denied.' },
        { status: 403 }
      );
    }
    return NextResponse.json(
      { error: 'Access denied.' },
      { status: 403 }
    );
  }
  
  // Then protect routes that require authentication
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