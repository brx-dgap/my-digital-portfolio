import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import Navbar from "@/components/navbar";
import { Footer } from "@/components/footer";
import { Toaster } from "@/components/ui/sonner";
import { ClerkProvider } from "@clerk/nextjs";
import { AuthSync } from "@/components/auth-sync";
import PageProtection from "@/components/page-protection";
import { SimpleChatbot } from "@/components/simple-chatbot";
// import {
//   SignInButton,
//   SignUpButton,
//   SignedIn,
//   SignedOut,
//   UserButton,
// } from "@clerk/nextjs"; // Removed unused imports

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "CyberShield | Cybersecurity Portfolio",
  description: "Professional portfolio showcasing expertise in cybersecurity",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <ClerkProvider>
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        {/* Page Protection - Prevent right-click and inspect element */}
        <PageProtection />
        {/* Include AuthSync component for auto user role assignment */}
        <AuthSync />
        <ThemeProvider attribute="class" defaultTheme="cyber" enableSystem={false} disableTransitionOnChange>
          <div className="flex min-h-screen flex-col">
            <Navbar />
            <main className="flex-1">{children}</main>
            <SimpleChatbot />
            <Footer />
            <Toaster />
          </div>
        </ThemeProvider>
      </body>
    </html>
    </ClerkProvider>
  )
}
