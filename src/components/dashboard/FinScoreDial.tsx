"use client";
import React from "react";

export default function FinScoreDial() {
  return (
    <div className="bg-[#18264A]/80 border border-blue-800/30 rounded-[20px] p-6 flex flex-col items-center justify-center relative shadow-lg shadow-blue-900/10 w-full mb-4 mt-2">
      {/* 180deg semi-circle gradient SVG */}
      <div className="relative w-[220px] h-[110px] mb-4">
        <svg viewBox="0 0 200 100" className="w-full h-full drop-shadow-lg overflow-visible">
          <defs>
            <linearGradient id="score-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#60A5FA" />
              <stop offset="60%" stopColor="#93C5FD" />
              <stop offset="80%" stopColor="#FDE047" />
              <stop offset="100%" stopColor="#FBBF24" />
            </linearGradient>
            <filter id="glow-gauge" x="-30%" y="-30%" width="160%" height="160%">
              <feGaussianBlur stdDeviation="3" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
            <filter id="glow-gold" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur stdDeviation="2" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
          </defs>
          
          {/* Background track */}
          <path
            d="M 10 90 A 80 80 0 0 1 190 90"
            fill="none"
            stroke="#1E2A4F"
            strokeWidth="10"
            strokeLinecap="round"
          />
          
          {/* Active track - ~88% full */}
          <path
            d="M 10 90 A 80 80 0 0 1 190 90"
            fill="none"
            stroke="url(#score-gradient)"
            strokeWidth="10"
            strokeLinecap="round"
            filter="url(#glow-gauge)"
            strokeDasharray="251.2"
            strokeDashoffset="30"
          />
          
          {/* Needle / Separator */}
          <line
            x1="172" y1="28" x2="188" y2="12"
            stroke="#FDE047"
            strokeWidth="3"
            strokeLinecap="round"
            filter="url(#glow-gold)"
          />
        </svg>

        {/* Text Inside Gauge */}
        <div className="absolute inset-x-0 bottom-0 flex flex-col items-center">
          <span className="text-blue-200/80 text-sm font-medium mb-0">FinScore</span>
          <span className="text-[#FBBF24] text-[42px] font-bold tracking-tight drop-shadow-[0_0_10px_rgba(251,191,36,0.3)] leading-none">8850</span>
        </div>
        
        {/* Trend Indicator */}
        <div className="absolute top-2 right-[-5px] text-[#4ADE80] text-sm font-semibold flex items-center">
          <span className="mr-0.5 font-bold">↑</span> (+25)
        </div>
      </div>

      <p className="text-[#93A5C9] text-sm font-medium mt-2">
        Tu salud financiera: ¡Excelente, pana!
      </p>
    </div>
  );
}
