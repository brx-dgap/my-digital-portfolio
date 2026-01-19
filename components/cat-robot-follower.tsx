"use client";

import { useEffect, useState } from "react";

export function CatRobotFollower() {
  const [eyePosition, setEyePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      // Calculate eye movement based on mouse position relative to viewport center
      const centerX = window.innerWidth / 2;
      const centerY = window.innerHeight / 2;
      
      const deltaX = e.clientX - centerX;
      const deltaY = e.clientY - centerY;
      const angle = Math.atan2(deltaY, deltaX);
      
      // Limit eye movement
      const maxMove = 6;
      const eyeX = Math.cos(angle) * maxMove;
      const eyeY = Math.sin(angle) * maxMove;
      
      setEyePosition({ x: eyeX, y: eyeY });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <div className="relative w-full h-full flex items-center justify-center">
      {/* 3D Robot Cat SVG - Hero Style */}
      <svg
        viewBox="0 0 400 500"
        className="w-full h-full drop-shadow-2xl"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id="bodyGradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" style={{ stopColor: "#F5F5F5", stopOpacity: 1 }} />
            <stop offset="100%" style={{ stopColor: "#D0D0D0", stopOpacity: 1 }} />
          </linearGradient>
          <linearGradient id="darkGradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" style={{ stopColor: "#4A4A4A", stopOpacity: 1 }} />
            <stop offset="100%" style={{ stopColor: "#2A2A2A", stopOpacity: 1 }} />
          </linearGradient>
          <radialGradient id="eyeGlow">
            <stop offset="0%" style={{ stopColor: "#00D4FF", stopOpacity: 1 }} />
            <stop offset="50%" style={{ stopColor: "#0088FF", stopOpacity: 0.8 }} />
            <stop offset="100%" style={{ stopColor: "#0044AA", stopOpacity: 0.6 }} />
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
        <ellipse cx="200" cy="480" rx="120" ry="20" fill="#000" opacity="0.3" />
        
        {/* Tail */}
        <path
          d="M 280 380 Q 340 360 360 320 Q 370 290 360 260"
          stroke="url(#darkGradient)"
          strokeWidth="18"
          fill="none"
          strokeLinecap="round"
          opacity="0.8"
        />
        
        {/* Back legs */}
        <rect x="150" y="380" width="35" height="80" rx="17" fill="url(#darkGradient)" />
        <rect x="215" y="380" width="35" height="80" rx="17" fill="url(#darkGradient)" />
        <ellipse cx="167" cy="465" rx="22" ry="12" fill="#2A2A2A" />
        <ellipse cx="232" cy="465" rx="22" ry="12" fill="#2A2A2A" />
        
        {/* Robot body (torso) */}
        <path
          d="M 130 280 L 130 380 Q 130 400 150 400 L 250 400 Q 270 400 270 380 L 270 280 Q 270 260 250 260 L 150 260 Q 130 260 130 280 Z"
          fill="url(#bodyGradient)"
          stroke="#888"
          strokeWidth="3"
        />
        
        {/* Chest panel details */}
        <rect x="160" y="290" width="80" height="90" rx="8" fill="#E0E0E0" stroke="#999" strokeWidth="2" />
        <circle cx="200" cy="335" r="15" fill="#00D4FF" opacity="0.3" filter="url(#glow)" />
        <line x1="170" y1="310" x2="230" y2="310" stroke="#AAA" strokeWidth="2" />
        <line x1="170" y1="325" x2="230" y2="325" stroke="#AAA" strokeWidth="2" />
        <line x1="170" y1="360" x2="230" y2="360" stroke="#AAA" strokeWidth="2" />
        
        {/* Robot joints/segments */}
        <circle cx="130" cy="350" r="12" fill="#666" stroke="#333" strokeWidth="2" />
        <circle cx="270" cy="350" r="12" fill="#666" stroke="#333" strokeWidth="2" />
        
        {/* Robot neck */}
        <rect x="175" y="220" width="50" height="40" rx="8" fill="#C0C0C0" stroke="#888" strokeWidth="2" />
        <circle cx="190" cy="240" r="4" fill="#555" />
        <circle cx="210" cy="240" r="4" fill="#555" />
        
        {/* Head */}
        <ellipse cx="200" cy="150" rx="85" ry="80" fill="url(#bodyGradient)" stroke="#888" strokeWidth="3" />
        
        {/* Ears (robotic) */}
        <path d="M 140 110 L 110 50 L 160 100 Z" fill="url(#darkGradient)" stroke="#555" strokeWidth="2" />
        <path d="M 260 110 L 290 50 L 240 100 Z" fill="url(#darkGradient)" stroke="#555" strokeWidth="2" />
        {/* Ear panels */}
        <path d="M 140 105 L 125 70 L 152 98 Z" fill="#FF6B9D" opacity="0.6" />
        <path d="M 260 105 L 275 70 L 248 98 Z" fill="#FF6B9D" opacity="0.6" />
        
        {/* Face mask (darker) */}
        <ellipse cx="200" cy="160" rx="60" ry="48" fill="url(#darkGradient)" opacity="0.7" />
        
        {/* Robotic eyes (glowing blue) */}
        <ellipse 
          cx={165 + eyePosition.x} 
          cy={145 + eyePosition.y} 
          rx="20" 
          ry="28" 
          fill="url(#eyeGlow)" 
          filter="url(#glow)"
        />
        <ellipse 
          cx={235 + eyePosition.x} 
          cy={145 + eyePosition.y} 
          rx="20" 
          ry="28" 
          fill="url(#eyeGlow)" 
          filter="url(#glow)"
        />
        
        {/* Eye frames */}
        <ellipse cx={165 + eyePosition.x} cy={145 + eyePosition.y} rx="20" ry="28" stroke="#333" strokeWidth="2" fill="none" />
        <ellipse cx={235 + eyePosition.x} cy={145 + eyePosition.y} rx="20" ry="28" stroke="#333" strokeWidth="2" fill="none" />
        
        {/* Pupils (vertical slits) */}
        <ellipse 
          cx={165 + eyePosition.x} 
          cy={147 + eyePosition.y} 
          rx="4" 
          ry="18" 
          fill="#000"
        />
        <ellipse 
          cx={235 + eyePosition.x} 
          cy={147 + eyePosition.y} 
          rx="4" 
          ry="18" 
          fill="#000"
        />
        
        {/* Eye shine */}
        <ellipse cx={162 + eyePosition.x} cy={138 + eyePosition.y} rx="5" ry="8" fill="#FFF" opacity="0.9" />
        <ellipse cx={232 + eyePosition.x} cy={138 + eyePosition.y} rx="5" ry="8" fill="#FFF" opacity="0.9" />
        
        {/* Nose (small triangle sensor) */}
        <path d="M 200 175 L 195 182 L 205 182 Z" fill="#FF6B9D" stroke="#CC5578" strokeWidth="1.5" />
        
        {/* Whiskers (metallic) */}
        <line x1="140" y1="160" x2="90" y2="155" stroke="#999" strokeWidth="2" opacity="0.7" />
        <line x1="140" y1="170" x2="90" y2="175" stroke="#999" strokeWidth="2" opacity="0.7" />
        <line x1="260" y1="160" x2="310" y2="155" stroke="#999" strokeWidth="2" opacity="0.7" />
        <line x1="260" y1="170" x2="310" y2="175" stroke="#999" strokeWidth="2" opacity="0.7" />
        
        {/* Whisker tips (sensors) */}
        <circle cx="90" cy="155" r="3" fill="#00D4FF" filter="url(#glow)" />
        <circle cx="90" cy="175" r="3" fill="#00D4FF" filter="url(#glow)" />
        <circle cx="310" cy="155" r="3" fill="#00D4FF" filter="url(#glow)" />
        <circle cx="310" cy="175" r="3" fill="#00D4FF" filter="url(#glow)" />
        
        {/* Mouth line */}
        <path
          d="M 190 190 Q 200 195 210 190"
          stroke="#555"
          strokeWidth="2"
          fill="none"
          strokeLinecap="round"
        />
      </svg>
    </div>
  );
}
