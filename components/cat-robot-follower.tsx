"use client";

import { useEffect, useState } from "react";

export function CatRobotFollower() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [eyePosition, setEyePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
      
      // Calculate eye movement based on mouse position
      // Cat is positioned at bottom-left (100px from left, 100px from bottom)
      const catX = 100;
      const catY = window.innerHeight - 100;
      
      const deltaX = e.clientX - catX;
      const deltaY = e.clientY - catY;
      const angle = Math.atan2(deltaY, deltaX);
      
      // Limit eye movement
      const maxMove = 4;
      const eyeX = Math.cos(angle) * maxMove;
      const eyeY = Math.sin(angle) * maxMove;
      
      setEyePosition({ x: eyeX, y: eyeY });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <div
      className="fixed bottom-8 left-8 z-40 pointer-events-none"
      style={{ width: "120px", height: "120px" }}
    >
      {/* Siamese Cat SVG - sitting position */}
      <svg
        viewBox="0 0 200 200"
        className="w-full h-full drop-shadow-2xl"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Body */}
        <ellipse cx="100" cy="140" rx="45" ry="50" fill="#E5D4C1" stroke="#8B7355" strokeWidth="2" />
        
        {/* Tail */}
        <path
          d="M 140 150 Q 170 140 180 120 Q 185 110 180 100"
          stroke="#8B7355"
          strokeWidth="8"
          fill="none"
          strokeLinecap="round"
        />
        
        {/* Front paws */}
        <ellipse cx="85" cy="175" rx="8" ry="15" fill="#A89080" />
        <ellipse cx="115" cy="175" rx="8" ry="15" fill="#A89080" />
        
        {/* Head */}
        <circle cx="100" cy="90" r="35" fill="#C4B5A0" stroke="#8B7355" strokeWidth="2" />
        
        {/* Ears */}
        <path d="M 75 70 L 65 40 L 85 65 Z" fill="#A89080" stroke="#8B7355" strokeWidth="1.5" />
        <path d="M 125 70 L 135 40 L 115 65 Z" fill="#A89080" stroke="#8B7355" strokeWidth="1.5" />
        
        {/* Inner ears (pink) */}
        <path d="M 75 65 L 70 50 L 80 63 Z" fill="#FFB6C1" />
        <path d="M 125 65 L 130 50 L 120 63 Z" fill="#FFB6C1" />
        
        {/* Face marking (darker gray) */}
        <ellipse cx="100" cy="95" rx="25" ry="20" fill="#8B7D6B" opacity="0.6" />
        
        {/* Eyes (blue like your cat) */}
        <ellipse 
          cx={82 + eyePosition.x} 
          cy={85 + eyePosition.y} 
          rx="8" 
          ry="12" 
          fill="#4A90E2" 
          stroke="#2C5F8D" 
          strokeWidth="1.5"
        />
        <ellipse 
          cx={118 + eyePosition.x} 
          cy={85 + eyePosition.y} 
          rx="8" 
          ry="12" 
          fill="#4A90E2" 
          stroke="#2C5F8D" 
          strokeWidth="1.5"
        />
        
        {/* Pupils */}
        <ellipse 
          cx={82 + eyePosition.x} 
          cy={87 + eyePosition.y} 
          rx="3" 
          ry="6" 
          fill="#000"
        />
        <ellipse 
          cx={118 + eyePosition.x} 
          cy={87 + eyePosition.y} 
          rx="3" 
          ry="6" 
          fill="#000"
        />
        
        {/* Eye shine */}
        <circle cx={81 + eyePosition.x} cy={83 + eyePosition.y} r="2" fill="#FFF" opacity="0.8" />
        <circle cx={117 + eyePosition.x} cy={83 + eyePosition.y} r="2" fill="#FFF" opacity="0.8" />
        
        {/* Nose */}
        <path d="M 100 100 L 97 103 L 103 103 Z" fill="#8B6F5C" />
        
        {/* Mouth */}
        <path
          d="M 100 103 L 95 106 M 100 103 L 105 106"
          stroke="#8B6F5C"
          strokeWidth="1.5"
          fill="none"
          strokeLinecap="round"
        />
        
        {/* Whiskers */}
        <line x1="75" y1="95" x2="50" y2="93" stroke="#8B7355" strokeWidth="1" />
        <line x1="75" y1="100" x2="50" y2="102" stroke="#8B7355" strokeWidth="1" />
        <line x1="125" y1="95" x2="150" y2="93" stroke="#8B7355" strokeWidth="1" />
        <line x1="125" y1="100" x2="150" y2="102" stroke="#8B7355" strokeWidth="1" />
        
        {/* Chest patch (lighter) */}
        <ellipse cx="100" cy="120" rx="15" ry="20" fill="#F5EFE7" opacity="0.7" />
      </svg>
      
      {/* Tooltip */}
      <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-black/80 text-white text-xs px-2 py-1 rounded whitespace-nowrap opacity-0 hover:opacity-100 transition-opacity pointer-events-auto">
        I'm watching you! 👀
      </div>
    </div>
  );
}
