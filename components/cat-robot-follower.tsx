"use client";

import { useEffect, useState } from "react";

export function CatRobotFollower() {
  const [pulseIntensity, setPulseIntensity] = useState(1);

  useEffect(() => {
    const interval = setInterval(() => {
      setPulseIntensity(prev => prev === 1 ? 0.7 : 1);
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative w-full h-full flex items-center justify-center">
      {/* Security Terminal */}
      <svg
        viewBox="0 0 400 400"
        className="w-full h-full drop-shadow-2xl"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id="screenGradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" style={{ stopColor: "#1A237E", stopOpacity: 1 }} />
            <stop offset="100%" style={{ stopColor: "#0D47A1", stopOpacity: 1 }} />
          </linearGradient>
          
          <linearGradient id="frameGradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" style={{ stopColor: "#424242", stopOpacity: 1 }} />
            <stop offset="100%" style={{ stopColor: "#212121", stopOpacity: 1 }} />
          </linearGradient>
          
          <radialGradient id="lockGlow">
            <stop offset="0%" style={{ stopColor: "#00E5FF", stopOpacity: 1 }} />
            <stop offset="100%" style={{ stopColor: "#00B8D4", stopOpacity: 0.5 }} />
          </radialGradient>
          
          <filter id="glow">
            <feGaussianBlur stdDeviation="5" result="coloredBlur"/>
            <feMerge>
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
        </defs>
        
        {/* Monitor Stand */}
        <rect x="170" y="320" width="60" height="15" rx="3" fill="#37474F" />
        <rect x="150" y="335" width="100" height="8" rx="4" fill="#263238" />
        
        {/* Monitor Frame */}
        <rect x="80" y="80" width="240" height="240" rx="12" fill="url(#frameGradient)" stroke="#616161" strokeWidth="3" />
        
        {/* Screen */}
        <rect x="95" y="95" width="210" height="210" rx="8" fill="url(#screenGradient)" />
        
        {/* Screen Reflection */}
        <rect x="100" y="100" width="180" height="80" rx="6" fill="#FFFFFF" opacity="0.1" />
        
        {/* Large Shield Icon */}
        <path
          d="M 200 140 L 240 160 L 240 210 Q 240 230 220 240 Q 200 248 200 248 Q 200 248 180 240 Q 160 230 160 210 L 160 160 Z"
          fill="none"
          stroke="#00E5FF"
          strokeWidth="4"
          strokeLinecap="round"
          strokeLinejoin="round"
          filter="url(#glow)"
          opacity={pulseIntensity}
        />
        
        {/* Lock Icon in Shield */}
        <rect x="188" y="200" width="24" height="28" rx="3" fill="none" stroke="#00E5FF" strokeWidth="3" opacity={pulseIntensity} />
        <path
          d="M 193 200 L 193 190 Q 193 180 200 180 Q 207 180 207 190 L 207 200"
          fill="none"
          stroke="#00E5FF"
          strokeWidth="3"
          strokeLinecap="round"
          opacity={pulseIntensity}
        />
        <circle cx="200" cy="215" r="3" fill="#00E5FF" opacity={pulseIntensity} />
        
        {/* Status Indicators */}
        <circle cx="110" cy="285" r="4" fill="#4CAF50" filter="url(#glow)" />
        <circle cx="125" cy="285" r="4" fill="#4CAF50" filter="url(#glow)" />
        <circle cx="140" cy="285" r="4" fill="#2196F3" filter="url(#glow)" opacity={pulseIntensity} />
        
        {/* Text Lines */}
        <line x1="160" y1="275" x2="280" y2="275" stroke="#00E5FF" strokeWidth="2" opacity="0.6" />
        <line x1="160" y1="285" x2="260" y2="285" stroke="#00E5FF" strokeWidth="2" opacity="0.4" />
        <line x1="160" y1="295" x2="270" y2="295" stroke="#00E5FF" strokeWidth="2" opacity="0.5" />
      </svg>
    </div>
  );
}
