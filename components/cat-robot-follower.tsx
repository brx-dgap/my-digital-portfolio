"use client";

import { useEffect, useState } from "react";

export function CatRobotFollower() {
  const [eyePosition, setEyePosition] = useState({ x: 0, y: 0 });
  const [glowIntensity, setGlowIntensity] = useState(1);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const centerX = window.innerWidth / 2;
      const centerY = window.innerHeight / 2;
      
      const deltaX = e.clientX - centerX;
      const deltaY = e.clientY - centerY;
      const angle = Math.atan2(deltaY, deltaX);
      const distance = Math.min(Math.sqrt(deltaX * deltaX + deltaY * deltaY), 500);
      
      // Eye tracking
      const maxMove = 8;
      const eyeX = Math.cos(angle) * maxMove;
      const eyeY = Math.sin(angle) * maxMove;
      
      setEyePosition({ x: eyeX, y: eyeY });
      setGlowIntensity(0.8 + (distance / 500) * 0.4);
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <div className="relative w-full h-full flex items-center justify-center">
      {/* Cat Robot Head */}
      <svg
        viewBox="0 0 340 340"
        className="w-full h-full drop-shadow-2xl"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id="helmetGradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" style={{ stopColor: "#F5F5F5", stopOpacity: 1 }} />
            <stop offset="50%" style={{ stopColor: "#E0E0E0", stopOpacity: 1 }} />
            <stop offset="100%" style={{ stopColor: "#BDBDBD", stopOpacity: 1 }} />
          </linearGradient>
          
          <linearGradient id="earGradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" style={{ stopColor: "#424242", stopOpacity: 1 }} />
            <stop offset="100%" style={{ stopColor: "#212121", stopOpacity: 1 }} />
          </linearGradient>
          
          <linearGradient id="visorDark" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" style={{ stopColor: "#1A1A1A", stopOpacity: 1 }} />
            <stop offset="100%" style={{ stopColor: "#000000", stopOpacity: 1 }} />
          </linearGradient>
          
          <radialGradient id="pupilGlow">
            <stop offset="0%" style={{ stopColor: "#00E5FF", stopOpacity: 1 }} />
            <stop offset="50%" style={{ stopColor: "#00B8D4", stopOpacity: 0.9 }} />
            <stop offset="100%" style={{ stopColor: "#0097A7", stopOpacity: 0.6 }} />
          </radialGradient>
          
          <filter id="glow">
            <feGaussianBlur stdDeviation="4" result="coloredBlur"/>
            <feMerge>
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
        </defs>
        
        {/* Shadow */}
        <ellipse cx="170" cy="310" rx="100" ry="12" fill="#000000" opacity="0.3" />
        
        {/* Neck */}
        <rect x="145" y="250" width="50" height="40" rx="8" fill="#9E9E9E" stroke="#757575" strokeWidth="2" />
        <circle cx="170" cy="270" r="8" fill="#757575" stroke="#616161" strokeWidth="1.5" />
        
        {/* Left Ear */}
        <path
          d="M 90 80 Q 70 50 80 30 Q 90 40 100 60 Q 95 75 90 80 Z"
          fill="url(#earGradient)"
          stroke="#000000"
          strokeWidth="2.5"
        />
        <path
          d="M 85 70 Q 78 55 82 45 Q 88 52 92 65 Z"
          fill="#2C2C2C"
          opacity="0.6"
        />
        
        {/* Right Ear */}
        <path
          d="M 250 80 Q 270 50 260 30 Q 250 40 240 60 Q 245 75 250 80 Z"
          fill="url(#earGradient)"
          stroke="#000000"
          strokeWidth="2.5"
        />
        <path
          d="M 255 70 Q 262 55 258 45 Q 252 52 248 65 Z"
          fill="#2C2C2C"
          opacity="0.6"
        />
        
        {/* Main Helmet */}
        <path
          d="M 85 160 Q 85 75 170 70 Q 255 75 255 160 Q 255 210 230 240 L 110 240 Q 85 210 85 160 Z"
          fill="url(#helmetGradient)"
          stroke="#9E9E9E"
          strokeWidth="3"
        />
        
        {/* Helmet Shine */}
        <ellipse cx="170" cy="120" rx="60" ry="40" fill="#FFFFFF" opacity="0.2" />
        
        {/* Top Sensor */}
        <circle cx="170" cy="85" r="4" fill="#424242" stroke="#212121" strokeWidth="1" />
        
        {/* Side Details */}
        <circle cx="80" cy="150" r="6" fill="#757575" stroke="#616161" strokeWidth="1.5" />
        <circle cx="260" cy="150" r="6" fill="#757575" stroke="#616161" strokeWidth="1.5" />
        
        {/* Visor - Large Dark Area */}
        <path
          d="M 100 130 Q 100 180 120 215 L 220 215 Q 240 180 240 130 Q 230 120 170 115 Q 110 120 100 130 Z"
          fill="url(#visorDark)"
          stroke="#000000"
          strokeWidth="2"
        />
        
        {/* Visor Reflection */}
        <path
          d="M 110 135 Q 170 128 230 135 Q 225 145 170 140 Q 115 145 110 135 Z"
          fill="#FFFFFF"
          opacity="0.08"
        />
        
        {/* Three Cyan Pupils (Moving) */}
        {/* Left Pupil - Arc shape */}
        <ellipse
          cx={115 + eyePosition.x * 0.4}
          cy={160 + eyePosition.y * 0.4}
          rx="18"
          ry="22"
          fill="url(#pupilGlow)"
          filter="url(#glow)"
        />
        
        {/* Center Pupil - Arc shape */}
        <ellipse
          cx={170 + eyePosition.x * 0.4}
          cy={165 + eyePosition.y * 0.4}
          rx="18"
          ry="22"
          fill="url(#pupilGlow)"
          filter="url(#glow)"
        />
        
        {/* Right Pupil - Arc shape */}
        <ellipse
          cx={225 + eyePosition.x * 0.4}
          cy={160 + eyePosition.y * 0.4}
          rx="18"
          ry="22"
          fill="url(#pupilGlow)"
          filter="url(#glow)"
        />
        
        {/* Bottom Chin Detail */}
        <path
          d="M 125 225 Q 170 228 215 225"
          fill="none"
          stroke="#9E9E9E"
          strokeWidth="2"
        />
      </svg>
    </div>
  );
}
