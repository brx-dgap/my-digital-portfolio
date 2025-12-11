import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

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

/**
 * Admin-only routes that require admin role
 * These routes check both authentication and admin status
 */
const isAdminRoute = createRouteMatcher([
  '/admin(.*)',
]);

export default clerkMiddleware(async (auth, req) => {
  // Protect routes that require authentication
  if (isProtectedRoute(req)) {
    await auth.protect();
  }
  
  // Note: Admin role checking is done at the page/component level using isAdmin()
  // This keeps the middleware focused on authentication
});

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    // Always run for API routes
    '/(api|trpc)(.*)',
  ],
};