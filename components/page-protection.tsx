"use client";

import { useEffect } from "react";

/**
 * Page Protection Component
 * Prevents:
 * - Right-click context menu
 * - Inspect element (F12, Ctrl+Shift+I, Ctrl+Shift+C)
 * - View page source (Ctrl+U)
 * - Developer tools
 * 
 * Note: Only active in production to allow development tools during development
 */
export default function PageProtection() {
  useEffect(() => {
    // Only enable protection in production
    if (process.env.NODE_ENV !== 'production') {
      return;
    }
    // Disable right-click
    const handleContextMenu = (e: MouseEvent) => {
      e.preventDefault();
      return false;
    };

    // Disable keyboard shortcuts for developer tools
    const handleKeyDown = (e: KeyboardEvent) => {
      // F12 - DevTools
      if (e.key === "F12") {
        e.preventDefault();
        return false;
      }
      
      // Ctrl/Cmd + Shift + I - Inspect
      if ((e.ctrlKey || e.metaKey) && e.shiftKey && e.key === "I") {
        e.preventDefault();
        return false;
      }
      
      // Ctrl/Cmd + Shift + C - Inspect element
      if ((e.ctrlKey || e.metaKey) && e.shiftKey && e.key === "C") {
        e.preventDefault();
        return false;
      }
      
      // Ctrl/Cmd + Shift + J - Console
      if ((e.ctrlKey || e.metaKey) && e.shiftKey && e.key === "J") {
        e.preventDefault();
        return false;
      }
      
      // Ctrl/Cmd + U - View page source
      if ((e.ctrlKey || e.metaKey) && e.key === "u") {
        e.preventDefault();
        return false;
      }
      
      // Ctrl/Cmd + Shift + K - Console (Firefox)
      if ((e.ctrlKey || e.metaKey) && e.shiftKey && e.key === "K") {
        e.preventDefault();
        return false;
      }
    };

    // Add event listeners
    document.addEventListener("contextmenu", handleContextMenu);
    document.addEventListener("keydown", handleKeyDown);

    // Cleanup
    return () => {
      document.removeEventListener("contextmenu", handleContextMenu);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  return null;
}
