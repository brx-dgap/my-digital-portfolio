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
      {/* Realistic AI Robot Head */}
      <svg
        viewBox="0 0 320 320"
        className="w-full h-full drop-shadow-2xl"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          {/* Realistic Gradients */}
          <linearGradient id="metalBody" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" style={{ stopColor: "#E8EAF6", stopOpacity: 1 }} />
            <stop offset="50%" style={{ stopColor: "#C5CAE9", stopOpacity: 1 }} />
            <stop offset="100%" style={{ stopColor: "#9FA8DA", stopOpacity: 1 }} />
          </linearGradient>
          
          <linearGradient id="metalDark" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" style={{ stopColor: "#78909C", stopOpacity: 1 }} />
            <stop offset="100%" style={{ stopColor: "#546E7A", stopOpacity: 1 }} />
          </linearGradient>
          
          <linearGradient id="visorGradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" style={{ stopColor: "#1A237E", stopOpacity: 0.9 }} />
            <stop offset="100%" style={{ stopColor: "#0D47A1", stopOpacity: 0.95 }} />
          </linearGradient>
          
          <radialGradient id="eyeLight">
            <stop offset="0%" style={{ stopColor: "#64B5F6", stopOpacity: 1 }} />
            <stop offset="50%" style={{ stopColor: "#42A5F5", stopOpacity: 0.9 }} />
            <stop offset="100%" style={{ stopColor: "#2196F3", stopOpacity: 0.7 }} />
          </radialGradient>
          
          <radialGradient id="pupilGlow">
            <stop offset="0%" style={{ stopColor: "#FFFFFF", stopOpacity: 1 }} />
            <stop offset="50%" style={{ stopColor: "#E3F2FD", stopOpacity: 0.8 }} />
            <stop offset="100%" style={{ stopColor: "#90CAF9", stopOpacity: 0.5 }} />
          </radialGradient>
          
          <linearGradient id="shine" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" style={{ stopColor: "#FFFFFF", stopOpacity: 0.4 }} />
            <stop offset="100%" style={{ stopColor: "#FFFFFF", stopOpacity: 0 }} />
          </linearGradient>
          
          {/* Realistic Filters */}
          <filter id="softGlow">
            <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
            <feMerge>
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
          
          <filter id="metalShine">
            <feGaussianBlur in="SourceAlpha" stdDeviation="1"/>
            <feOffset dx="1" dy="1" result="offsetblur"/>
            <feFlood floodColor="#FFFFFF" floodOpacity="0.3"/>
            <feComposite in2="offsetblur" operator="in"/>
            <feMerge>
              <feMergeNode/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
        </defs>
        
        {/* Base Shadow */}
        <ellipse cx="160" cy="295" rx="90" ry="10" fill="#000000" opacity="0.25" />
        
        {/* Neck Connector */}
        <rect x="140" y="240" width="40" height="35" rx="5" fill="url(#metalDark)" stroke="#607D8B" strokeWidth="2" />
        <circle cx="160" cy="257" r="6" fill="#546E7A" stroke="#37474F" strokeWidth="1.5" />
        <line x1="150" y1="250" x2="170" y2="250" stroke="#90A4AE" strokeWidth="1" opacity="0.6" />
        
        {/* Main Head Structure */}
        <path
          d="M 80 160 Q 80 80 160 75 Q 240 80 240 160 Q 240 200 220 225 L 100 225 Q 80 200 80 160 Z"
          fill="url(#metalBody)"
          stroke="#90A4AE"
          strokeWidth="2.5"
          filter="url(#metalShine)"
        />
        
        {/* Head Highlights */}
        <path
          d="M 95 100 Q 160 90 225 100"
          fill="none"
          stroke="url(#shine)"
          strokeWidth="15"
          opacity="0.4"
        />
        
        {/* Top Panel */}
        <path
          d="M 110 85 Q 160 80 210 85 L 205 105 Q 160 100 115 105 Z"
          fill="url(#metalDark)"
          stroke="#546E7A"
          strokeWidth="1.5"
        />
        
        {/* Side Vents */}
        <g opacity="0.7">
          <line x1="85" y1="130" x2="85" y2="150" stroke="#546E7A" strokeWidth="2" />
          <line x1="90" y1="135" x2="90" y2="155" stroke="#546E7A" strokeWidth="2" />
          <line x1="95" y1="140" x2="95" y2="160" stroke="#546E7A" strokeWidth="2" />
          
          <line x1="235" y1="130" x2="235" y2="150" stroke="#546E7A" strokeWidth="2" />
          <line x1="230" y1="135" x2="230" y2="155" stroke="#546E7A" strokeWidth="2" />
          <line x1="225" y1="140" x2="225" y2="160" stroke="#546E7A" strokeWidth="2" />
        </g>
        
        {/* Visor Housing */}
        <rect x="100" y="130" width="120" height="70" rx="15" fill="url(#visorGradient)" stroke="#1565C0" strokeWidth="2" />
        
        {/* Visor Reflection */}
        <path
          d="M 105 135 Q 160 132 215 135 L 210 145 Q 160 142 110 145 Z"
          fill="#FFFFFF"
          opacity="0.15"
        />
        
        {/* Eye Sockets - Stationary */}
        <ellipse cx="130" cy="165" rx="22" ry="24" fill="url(#eyeLight)" stroke="#1976D2" strokeWidth="1.5" />
        <ellipse cx="190" cy="165" rx="22" ry="24" fill="url(#eyeLight)" stroke="#1976D2" strokeWidth="1.5" />
        
        {/* Eye Inner Glow */}
        <ellipse cx="130" cy="165" rx="18" ry="20" fill="#42A5F5" opacity="0.6" />
        <ellipse cx="190" cy="165" rx="18" ry="20" fill="#42A5F5" opacity="0.6" />
        
        {/* Pupils - Only these move */}
        <circle 
          cx={130 + eyePosition.x * 0.5} 
          cy={165 + eyePosition.y * 0.5} 
          r="8" 
          fill="url(#pupilGlow)" 
          filter="url(#softGlow)"
        />
        <circle 
          cx={190 + eyePosition.x * 0.5} 
          cy={165 + eyePosition.y * 0.5} 
          r="8" 
          fill="url(#pupilGlow)" 
          filter="url(#softGlow)"
        />
        
        {/* Pupil Centers */}
        <circle cx={130 + eyePosition.x * 0.5} cy={165 + eyePosition.y * 0.5} r="4" fill="#1565C0" />
        <circle cx={190 + eyePosition.x * 0.5} cy={165 + eyePosition.y * 0.5} r="4" fill="#1565C0" />
        
        {/* Eye Highlights */}
        <circle cx="125" cy="160" r="3" fill="#FFFFFF" opacity="0.8" />
        <circle cx="185" cy="160" r="3" fill="#FFFFFF" opacity="0.8" />
        
        {/* Forehead Details */}
        <circle cx="160" cy="95" r="5" fill="#42A5F5" filter="url(#softGlow)" opacity={glowIntensity} />
        <circle cx="160" cy="95" r="5" fill="none" stroke="#1976D2" strokeWidth="1" />
        
        {/* Status LEDs */}
        <circle cx="110" cy="115" r="3" fill="#4CAF50" filter="url(#softGlow)" />
        <circle cx="210" cy="115" r="3" fill="#4CAF50" filter="url(#softGlow)" />
        
        {/* Bottom Sensor Bar */}
        <rect x="120" y="210" width="80" height="4" rx="2" fill="#1976D2" opacity="0.6" />
        <rect x="135" y="210" width="50" height="4" rx="2" fill="#42A5F5" opacity={glowIntensity} filter="url(#softGlow)" />
      </svg>
    </div>
  );
}
