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
      {/* Security Bot Head */}
      <svg
        viewBox="0 0 300 300"
        className="w-full h-full drop-shadow-2xl"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          {/* Premium Gradients */}
          <linearGradient id="mainBody" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" style={{ stopColor: "#667EEA", stopOpacity: 1 }} />
            <stop offset="50%" style={{ stopColor: "#764BA2", stopOpacity: 1 }} />
            <stop offset="100%" style={{ stopColor: "#4A5568", stopOpacity: 1 }} />
          </linearGradient>
          
          <linearGradient id="highlight" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" style={{ stopColor: "#ffffff", stopOpacity: 0.3 }} />
            <stop offset="100%" style={{ stopColor: "#ffffff", stopOpacity: 0 }} />
          </linearGradient>
          
          <linearGradient id="darkPanel" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" style={{ stopColor: "#1A202C", stopOpacity: 1 }} />
            <stop offset="100%" style={{ stopColor: "#2D3748", stopOpacity: 1 }} />
          </linearGradient>
          
          <radialGradient id="eyeGlow">
            <stop offset="0%" style={{ stopColor: "#60F6FF", stopOpacity: 1 }} />
            <stop offset="40%" style={{ stopColor: "#00D4FF", stopOpacity: 1 }} />
            <stop offset="100%" style={{ stopColor: "#0088FF", stopOpacity: 0.6 }} />
          </radialGradient>
          
          <radialGradient id="coreGlow">
            <stop offset="0%" style={{ stopColor: "#A78BFA", stopOpacity: 1 }} />
            <stop offset="50%" style={{ stopColor: "#8B5CF6", stopOpacity: 0.8 }} />
            <stop offset="100%" style={{ stopColor: "#6366F1", stopOpacity: 0.4 }} />
          </radialGradient>
          
          {/* Advanced Filters */}
          <filter id="glow">
            <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
            <feMerge>
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
          
          <filter id="strongGlow">
            <feGaussianBlur stdDeviation="6" result="coloredBlur"/>
            <feMerge>
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
          
          <filter id="innerShadow">
            <feGaussianBlur in="SourceAlpha" stdDeviation="3"/>
            <feOffset dx="0" dy="2" result="offsetblur"/>
            <feComponentTransfer>
              <feFuncA type="linear" slope="0.5"/>
            </feComponentTransfer>
            <feMerge>
              <feMergeNode/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
        </defs>
        
        {/* Base Shadow */}
        <ellipse cx="150" cy="280" rx="80" ry="12" fill="#000000" opacity="0.3" />
        
        {/* Neck */}
        <path
          d="M 130 230 L 125 255 L 175 255 L 170 230 Z"
          fill="url(#darkPanel)"
          stroke="#4A5568"
          strokeWidth="2"
        />
        <line x1="138" y1="240" x2="162" y2="240" stroke="#667EEA" strokeWidth="1" opacity="0.4" />
        
        {/* Head - Helmet Design */}
        <ellipse cx="150" cy="150" rx="90" ry="85" fill="url(#mainBody)" stroke="#4A5568" strokeWidth="3" />
        
        {/* Helmet Top Accent */}
        <path
          d="M 80 115 Q 150 70 220 115"
          fill="none"
          stroke="#667EEA"
          strokeWidth="4"
          opacity="0.7"
        />
        <circle cx="150" cy="75" r="8" fill="#60F6FF" filter="url(#glow)" />
        
        {/* Side Panels */}
        <path d="M 65 140 L 55 150 L 60 165 L 70 155 Z" fill="url(#darkPanel)" stroke="#667EEA" strokeWidth="1.5" />
        <path d="M 235 140 L 245 150 L 240 165 L 230 155 Z" fill="url(#darkPanel)" stroke="#667EEA" strokeWidth="1.5" />
        
        {/* Visor Area */}
        <ellipse cx="150" cy="155" rx="70" ry="55" fill="#1A202C" opacity="0.8" />
        
        {/* Visor Edge Highlight */}
        <path
          d="M 85 130 Q 150 110 215 130"
          fill="none"
          stroke="url(#highlight)"
          strokeWidth="2"
          opacity="0.5"
        />
        
        {/* Eyes - Tracking */}
        <ellipse 
          cx={120 + eyePosition.x} 
          cy={150 + eyePosition.y} 
          rx="20" 
          ry="26" 
          fill="url(#eyeGlow)" 
          filter="url(#glow)"
        />
        <ellipse 
          cx={180 + eyePosition.x} 
          cy={150 + eyePosition.y} 
          rx="20" 
          ry="26" 
          fill="url(#eyeGlow)" 
          filter="url(#glow)"
        />
        
        {/* Eye Details */}
        <ellipse cx={120 + eyePosition.x} cy={150 + eyePosition.y} rx="20" ry="26" stroke="#00D4FF" strokeWidth="2" fill="none" />
        <ellipse cx={180 + eyePosition.x} cy={150 + eyePosition.y} rx="20" ry="26" stroke="#00D4FF" strokeWidth="2" fill="none" />
        
        {/* Pupils */}
        <circle cx={120 + eyePosition.x} cy={153 + eyePosition.y} r="7" fill="#0A0E27" />
        <circle cx={180 + eyePosition.x} cy={153 + eyePosition.y} r="7" fill="#0A0E27" />
        
        {/* Eye Shine */}
        <circle cx={116 + eyePosition.x} cy={145 + eyePosition.y} r="5" fill="#FFFFFF" opacity="0.9" />
        <circle cx={176 + eyePosition.x} cy={145 + eyePosition.y} r="5" fill="#FFFFFF" opacity="0.9" />
        
        {/* Antenna/Sensors */}
        <line x1="85" y1="100" x2="70" y2="65" stroke="#667EEA" strokeWidth="4" strokeLinecap="round" />
        <line x1="215" y1="100" x2="230" y2="65" stroke="#667EEA" strokeWidth="4" strokeLinecap="round" />
        <circle cx="70" cy="65" r="6" fill="#60F6FF" filter="url(#glow)" />
        <circle cx="230" cy="65" r="6" fill="#60F6FF" filter="url(#glow)" />
        
        {/* Facial Scanner Lines */}
        <line x1="90" y1="185" x2="125" y2="185" stroke="#60F6FF" strokeWidth="1.5" opacity="0.5" />
        <line x1="175" y1="185" x2="210" y2="185" stroke="#60F6FF" strokeWidth="1.5" opacity="0.5" />
        
        {/* Status Indicators */}
        <circle cx="75" cy="150" r="4" fill="#10B981" filter="url(#glow)" />
        <circle cx="225" cy="150" r="4" fill="#10B981" filter="url(#glow)" />
        
        {/* Central Power Indicator */}
        <circle cx="150" cy="210" r="8" fill="url(#coreGlow)" filter="url(#glow)" opacity={glowIntensity} />
        <circle cx="150" cy="210" r="8" fill="none" stroke="#A78BFA" strokeWidth="1.5" />
      </svg>
    </div>
  );
}
