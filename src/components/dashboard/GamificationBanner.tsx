"use client";
import React from "react";

export default function GamificationBanner() {
  return (
    <div className="bg-[#18264A]/80 border border-blue-800/30 rounded-2xl p-4 flex flex-col items-center justify-center relative shadow-lg shadow-blue-900/10 w-full mb-6">
      <div className="border border-[#F59E0B]/40 bg-gradient-to-r from-[#78350F]/40 to-[#B45309]/20 px-6 py-2.5 rounded-full flex items-center shadow-[0_0_15px_rgba(245,158,11,0.15)] hover:shadow-[0_0_20px_rgba(245,158,11,0.3)] transition-shadow">
        <span className="mr-2.5 text-[18px]">🥇</span>
        <span className="text-[#FDE047] font-semibold text-[13px] tracking-wide drop-shadow-[0_0_5px_rgba(253,224,71,0.4)]">
          Racha de Ahorro: 7 días seguidos 🎯
        </span>
      </div>
    </div>
  );
}
