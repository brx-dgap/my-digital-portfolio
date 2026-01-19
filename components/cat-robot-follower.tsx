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
      {/* Advanced Security Bot SVG */}
      <svg
        viewBox="0 0 400 450"
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
        <ellipse cx="200" cy="430" rx="100" ry="15" fill="#000000" opacity="0.4" />
        
        {/* Main Body - Sleek Torso */}
        <path
          d="M 120 200 L 110 340 Q 110 360 130 365 L 270 365 Q 290 360 290 340 L 280 200 Q 280 180 260 175 L 140 175 Q 120 180 120 200 Z"
          fill="url(#mainBody)"
          stroke="#4A5568"
          strokeWidth="2"
        />
        
        {/* Body Highlight */}
        <path
          d="M 145 180 L 140 320 Q 140 335 155 338 L 200 338"
          fill="none"
          stroke="url(#highlight)"
          strokeWidth="3"
          opacity="0.6"
        />
        
        {/* Shoulder Joints */}
        <circle cx="110" cy="210" r="18" fill="#2D3748" stroke="#4A5568" strokeWidth="2" />
        <circle cx="290" cy="210" r="18" fill="#2D3748" stroke="#4A5568" strokeWidth="2" />
        <circle cx="110" cy="210" r="8" fill="#667EEA" filter="url(#glow)" />
        <circle cx="290" cy="210" r="8" fill="#667EEA" filter="url(#glow)" />
        
        {/* Arms */}
        <rect x="80" y="210" width="25" height="120" rx="12" fill="url(#darkPanel)" stroke="#4A5568" strokeWidth="2" />
        <rect x="295" y="210" width="25" height="120" rx="12" fill="url(#darkPanel)" stroke="#4A5568" strokeWidth="2" />
        
        {/* Arm Details */}
        <line x1="90" y1="240" x2="97" y2="240" stroke="#667EEA" strokeWidth="2" opacity="0.6" />
        <line x1="90" y1="260" x2="97" y2="260" stroke="#667EEA" strokeWidth="2" opacity="0.6" />
        <line x1="303" y1="240" x2="310" y2="240" stroke="#667EEA" strokeWidth="2" opacity="0.6" />
        <line x1="303" y1="260" x2="310" y2="260" stroke="#667EEA" strokeWidth="2" opacity="0.6" />
        
        {/* Legs */}
        <rect x="140" y="365" width="40" height="55" rx="8" fill="url(#darkPanel)" stroke="#4A5568" strokeWidth="2" />
        <rect x="220" y="365" width="40" height="55" rx="8" fill="url(#darkPanel)" stroke="#4A5568" strokeWidth="2" />
        
        {/* Feet */}
        <ellipse cx="160" cy="425" rx="28" ry="12" fill="#1A202C" stroke="#4A5568" strokeWidth="2" />
        <ellipse cx="240" cy="425" rx="28" ry="12" fill="#1A202C" stroke="#4A5568" strokeWidth="2" />
        
        {/* Central Chest Panel */}
        <rect x="155" y="220" width="90" height="110" rx="12" fill="url(#darkPanel)" stroke="#667EEA" strokeWidth="2" opacity="0.9" />
        
        {/* Power Core */}
        <circle cx="200" cy="275" r="28" fill="url(#coreGlow)" filter="url(#strongGlow)" opacity={glowIntensity} />
        <circle cx="200" cy="275" r="28" fill="none" stroke="#A78BFA" strokeWidth="2" />
        <circle cx="200" cy="275" r="18" fill="none" stroke="#C4B5FD" strokeWidth="1" opacity="0.6" />
        <circle cx="200" cy="275" r="10" fill="#E9D5FF" opacity="0.8" />
        
        {/* Tech Details on Chest */}
        <line x1="165" y1="235" x2="235" y2="235" stroke="#667EEA" strokeWidth="2" opacity="0.5" />
        <line x1="165" y1="315" x2="235" y2="315" stroke="#667EEA" strokeWidth="2" opacity="0.5" />
        <rect x="165" y="245" width="15" height="3" rx="1.5" fill="#60F6FF" opacity="0.7" />
        <rect x="220" y="245" width="15" height="3" rx="1.5" fill="#60F6FF" opacity="0.7" />
        
        {/* Neck */}
        <path
          d="M 175 175 L 170 195 L 230 195 L 225 175 Z"
          fill="url(#darkPanel)"
          stroke="#4A5568"
          strokeWidth="2"
        />
        
        {/* Head - Helmet Design */}
        <ellipse cx="200" cy="110" rx="75" ry="70" fill="url(#mainBody)" stroke="#4A5568" strokeWidth="3" />
        
        {/* Helmet Top Accent */}
        <path
          d="M 140 80 Q 200 50 260 80"
          fill="none"
          stroke="#667EEA"
          strokeWidth="3"
          opacity="0.7"
        />
        <circle cx="200" cy="60" r="6" fill="#60F6FF" filter="url(#glow)" />
        
        {/* Visor Area */}
        <ellipse cx="200" cy="115" rx="60" ry="45" fill="#1A202C" opacity="0.8" />
        
        {/* Eyes - Tracking */}
        <ellipse 
          cx={170 + eyePosition.x} 
          cy={110 + eyePosition.y} 
          rx="18" 
          ry="22" 
          fill="url(#eyeGlow)" 
          filter="url(#glow)"
        />
        <ellipse 
          cx={230 + eyePosition.x} 
          cy={110 + eyePosition.y} 
          rx="18" 
          ry="22" 
          fill="url(#eyeGlow)" 
          filter="url(#glow)"
        />
        
        {/* Eye Details */}
        <ellipse cx={170 + eyePosition.x} cy={110 + eyePosition.y} rx="18" ry="22" stroke="#00D4FF" strokeWidth="1.5" fill="none" />
        <ellipse cx={230 + eyePosition.x} cy={110 + eyePosition.y} rx="18" ry="22" stroke="#00D4FF" strokeWidth="1.5" fill="none" />
        
        {/* Pupils */}
        <circle cx={170 + eyePosition.x} cy={112 + eyePosition.y} r="6" fill="#0A0E27" />
        <circle cx={230 + eyePosition.x} cy={112 + eyePosition.y} r="6" fill="#0A0E27" />
        
        {/* Eye Shine */}
        <circle cx={167 + eyePosition.x} cy={106 + eyePosition.y} r="4" fill="#FFFFFF" opacity="0.9" />
        <circle cx={227 + eyePosition.x} cy={106 + eyePosition.y} r="4" fill="#FFFFFF" opacity="0.9" />
        
        {/* Antenna/Sensors */}
        <line x1="140" y1="75" x2="130" y2="50" stroke="#667EEA" strokeWidth="3" strokeLinecap="round" />
        <line x1="260" y1="75" x2="270" y2="50" stroke="#667EEA" strokeWidth="3" strokeLinecap="round" />
        <circle cx="130" cy="50" r="5" fill="#60F6FF" filter="url(#glow)" />
        <circle cx="270" cy="50" r="5" fill="#60F6FF" filter="url(#glow)" />
        
        {/* Facial Scanner Lines */}
        <line x1="150" y1="140" x2="180" y2="140" stroke="#60F6FF" strokeWidth="1" opacity="0.4" />
        <line x1="220" y1="140" x2="250" y2="140" stroke="#60F6FF" strokeWidth="1" opacity="0.4" />
        
        {/* Status Indicators */}
        <circle cx="125" cy="115" r="3" fill="#10B981" filter="url(#glow)" />
        <circle cx="275" cy="115" r="3" fill="#10B981" filter="url(#glow)" />
      </svg>
    </div>
  );
}
