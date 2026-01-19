"use client";

import { useEffect, useState } from "react";

export function CatRobotFollower() {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
      setIsVisible(true);
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  if (!isVisible) return null;

  return (
    <div
      className="fixed pointer-events-none z-50 transition-all duration-200 ease-out"
      style={{
        left: `${position.x}px`,
        top: `${position.y}px`,
        transform: "translate(-50%, -50%)",
      }}
    >
      {/* Cat Robot SVG */}
      <div className="relative w-12 h-12 animate-bounce">
        <svg
          viewBox="0 0 100 100"
          className="w-full h-full drop-shadow-lg"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Cat ears */}
          <path
            d="M20 30 L30 10 L35 30 Z"
            fill="#4F46E5"
            stroke="#312E81"
            strokeWidth="2"
          />
          <path
            d="M80 30 L70 10 L65 30 Z"
            fill="#4F46E5"
            stroke="#312E81"
            strokeWidth="2"
          />
          {/* Head */}
          <circle cx="50" cy="50" r="30" fill="#6366F1" stroke="#312E81" strokeWidth="2" />
          {/* Eyes */}
          <circle cx="40" cy="45" r="5" fill="#FFF" />
          <circle cx="60" cy="45" r="5" fill="#FFF" />
          <circle cx="41" cy="45" r="3" fill="#000" />
          <circle cx="61" cy="45" r="3" fill="#000" />
          {/* Nose */}
          <path d="M50 55 L47 58 L53 58 Z" fill="#EC4899" />
          {/* Whiskers */}
          <line x1="30" y1="50" x2="20" y2="48" stroke="#312E81" strokeWidth="1.5" />
          <line x1="30" y1="54" x2="20" y2="56" stroke="#312E81" strokeWidth="1.5" />
          <line x1="70" y1="50" x2="80" y2="48" stroke="#312E81" strokeWidth="1.5" />
          <line x1="70" y1="54" x2="80" y2="56" stroke="#312E81" strokeWidth="1.5" />
          {/* Robot antenna */}
          <line x1="50" y1="20" x2="50" y2="15" stroke="#312E81" strokeWidth="2" />
          <circle cx="50" cy="13" r="3" fill="#EC4899" />
          {/* Mouth */}
          <path
            d="M45 60 Q50 63 55 60"
            stroke="#312E81"
            strokeWidth="2"
            fill="none"
          />
        </svg>
      </div>
    </div>
  );
}
