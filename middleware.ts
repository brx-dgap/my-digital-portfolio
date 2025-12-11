import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

/**
 * Minimal middleware - Clerk authentication temporarily disabled
 * This is a debug version to test if Clerk is causing redirect loops
 */
export function middleware(request: NextRequest) {
  // Just pass through for now - no authentication required
  return NextResponse.next();
}

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    // Always run for API routes
    '/(api|trpc)(.*)',
  ],
};