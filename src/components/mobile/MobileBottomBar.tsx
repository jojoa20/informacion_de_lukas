"use client";

import React, { useState } from "react";

interface MobileBottomBarProps {
  onTransactionAdd: (amount: number, category: string) => void;
}

export default function MobileBottomBar({ onTransactionAdd }: MobileBottomBarProps) {
  const [isRecording, setIsRecording] = useState(false);

  const handleMicClick = () => {
    setIsRecording(!isRecording);
    if (!isRecording) {
      // Simulate voice input after 2 seconds
      setTimeout(() => {
        setIsRecording(false);
        onTransactionAdd(-15000, "Gasto Hormiga (Café)");
      }, 2000);
    }
  };

  return (
    <div className="mt-auto pb-6 w-full px-4 relative z-20">
      {/* 3-Column Menu */}
      <div className="grid grid-cols-3 gap-2 text-center text-[10px] font-semibold text-white/80 mb-6">
        <div className="flex flex-col justify-center border-r border-white/10 pr-2 cursor-pointer hover:text-white transition">
          Ver mi<br />presupuesto
        </div>
        <div className="flex flex-col justify-center border-r border-white/10 px-2 cursor-pointer hover:text-white transition">
          Metas de<br />ahorro
        </div>
        <div className="flex flex-col justify-center pl-2 cursor-pointer hover:text-white transition">
          Historial de<br />transacciones
        </div>
      </div>

      {/* Voice Input Action Bar */}
      <div 
        onClick={handleMicClick}
        className={`h-[60px] rounded-[30px] flex items-center px-5 cursor-pointer transition-all duration-300 ${
          isRecording 
            ? "bg-[#ff7a59] shadow-[0_0_40px_rgba(255,122,89,0.5)] scale-105" 
            : "bg-[#B3E5D1] shadow-[0_0_30px_rgba(179,229,209,0.3)] hover:scale-[1.02]"
        }`}
      >
        <svg 
          className={`w-6 h-6 mr-3 ${isRecording ? "text-white animate-pulse" : "text-[#1a1525]"}`} 
          fill="none" stroke="currentColor" viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
        </svg>
        
        <span className={`text-lg font-semibold flex-1 ${isRecording ? "text-white" : "text-[#1a1525] opacity-80"}`}>
          {isRecording ? "Escuchando..." : "Dime un gasto..."}
        </span>
        
        {!isRecording && (
          <svg className="w-6 h-6 text-[#1a1525]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
        )}
      </div>
    </div>
  );
}
