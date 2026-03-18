"use client";

import React from "react";

interface MobileFinScoreProps {
  score: number;
}

export default function MobileFinScore({ score }: MobileFinScoreProps) {
  const getScoreData = (currentScore: number) => {
    if (currentScore < 400) {
      return {
        color: "#ff7a59",
        text: "¡Peligro, pana!",
        delta: "↓ (-10)",
        deltaColor: "text-red-500",
      };
    } else if (currentScore < 700) {
      return {
        color: "#f59e0b",
        text: "Ponte las pilas...",
        delta: "↑ (+5)",
        deltaColor: "text-yellow-500",
      };
    } else {
      return {
        color: "#6ee7b7", // Success Green
        text: "¡Excelente, pana!",
        delta: "↑ (+25)",
        deltaColor: "text-[#2dd4bf]",
      };
    }
  };

  const { color, text, delta, deltaColor } = getScoreData(score);

  // Math for SVG
  const radius = 100;
  const circumference = Math.PI * radius;
  const fillPercentage = Math.max(0, Math.min(1000, score)) / 1000;
  const dashoffset = circumference - fillPercentage * circumference;

  return (
    <div className="text-center mb-6">
      <div className="relative w-[220px] h-[110px] mx-auto overflow-hidden mb-2">
        {/* SVG Speedometer Gauge */}
        <div className="absolute inset-0 flex justify-center items-end">
          <svg
            className="w-[200px] h-[200px] transform rotate-180"
            viewBox="0 0 240 240"
            preserveAspectRatio="xMidYMid meet"
          >
            <defs>
              <linearGradient id="gaugeGradientMobile" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#ff7a59" />
                <stop offset="50%" stopColor="#f59e0b" />
                <stop offset="100%" stopColor={color} />
              </linearGradient>
            </defs>

            {/* Background Arch */}
            <path
              d="M 20 120 A 100 100 0 0 1 220 120"
              fill="none"
              stroke="rgba(255,255,255,0.1)"
              strokeWidth="20"
              strokeLinecap="round"
            />

            {/* Active Colored Arch */}
            <path
              d="M 20 120 A 100 100 0 0 1 220 120"
              fill="none"
              stroke="url(#gaugeGradientMobile)"
              strokeWidth="20"
              strokeLinecap="round"
              strokeDasharray={circumference}
              strokeDashoffset={dashoffset}
              className="transition-all duration-[1200ms] ease-out"
            />
          </svg>
        </div>

        {/* Text inside gauge */}
        <div className="absolute bottom-0 left-0 right-0 text-center">
          <p className="text-[11px] uppercase tracking-wider text-white/70 mb-1">
            Finscore:
          </p>
          <div className="flex justify-center items-end gap-2">
            <span className="text-5xl font-black leading-none">{score}</span>
            <span className={`text-sm font-bold mb-1 ${deltaColor}`}>
              {delta}
            </span>
          </div>
        </div>
      </div>
      <p className="text-sm text-white/80 mt-2">
        Tu salud financiera: {text}
      </p>
    </div>
  );
}
