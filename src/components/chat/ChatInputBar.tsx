"use client";

import React, { useState } from "react";

export default function ChatInputBar() {
  const [inputText, setInputText] = useState("");

  const handleSend = () => {
    if (inputText.trim()) {
      // In a real app, send message here
      setInputText("");
    }
  };

  return (
    <div className="w-full bg-[#0A101D] px-6 pb-8 pt-4 shrink-0 relative z-30">
      
      {/* Main Input Container */}
      <div className="w-full bg-[#18264A]/80 border border-blue-800/40 rounded-full p-2 pl-6 flex items-center shadow-lg transition-all focus-within:ring-2 focus-within:ring-blue-500/50">
        
        {/* Text Input */}
        <input 
          type="text" 
          placeholder="Dime un gasto o sube un recibo..."
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSend()}
          className="flex-1 bg-transparent text-white placeholder-[#93A5C9] border-none outline-none py-1.5 text-sm"
        />

        {/* Action Icons (Right) */}
        <div className="flex items-center gap-2 mr-1">
          {/* Microphone Icon */}
          <button className="text-blue-300 hover:text-white p-2 rounded-full transition-colors flex items-center justify-center">
             <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
             </svg>
          </button>
          
          {/* Camera Icon - Floating Circle Wrapper */}
          <button 
            onClick={handleSend}
            className="bg-[#3B82F6] hover:bg-blue-400 text-white p-2.5 rounded-full aspect-square flex items-center justify-center transition-transform hover:scale-105 shadow-[0_0_15px_rgba(59,130,246,0.5)]"
          >
             <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
             </svg>
          </button>
        </div>
      </div>
    </div>
  );
}
