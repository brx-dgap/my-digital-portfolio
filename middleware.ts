import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import { ajMinimal } from "@/lib/arcjet-config";

/**
 * Protected routes that require user authentication
 * Users must be signed in with Clerk to access these routes
 * 
 * Arcjet minimal protection (shield only) applied to all routes.
 * Full protection (shield + rate limiting + bot detection) in API routes.
 */
const isProtectedRoute = createRouteMatcher([
  '/admin(.*)',
  '/resources(.*)',
  '/projects(.*)',
  '/security-journal(.*)',
]);

export default clerkMiddleware(async (auth, req) => {
  // Apply minimal Arcjet protection (shield only - keeps bundle small)
  const decision = await ajMinimal.protect(req);
  
  // Handle Arcjet errors gracefully - fail open
  for (const result of decision.results) {
    if (result.reason.isError()) {
      console.warn('Arcjet middleware error:', result.reason.message);
      // Continue processing even if Arcjet has an error
    }
  }
  
  // Block if Arcjet denies the request
  if (decision.isDenied()) {
    return NextResponse.json(
      { error: 'Access denied. Request blocked by security protection.' },
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