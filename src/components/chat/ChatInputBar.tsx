"use client";

import React, { useState, useCallback } from "react";
import { Mic, Send, Camera, Square } from "lucide-react";
import { useSpeechRecognition } from "../../hooks/useSpeechRecognition";

interface ChatInputBarProps {
  onSendMessage: (text: string) => void;
}

export default function ChatInputBar({ onSendMessage }: ChatInputBarProps) {
  const [inputText, setInputText] = useState("");

  const onSpeechResult = useCallback((transcript: string) => {
    setInputText((prev) => prev + (prev ? " " : "") + transcript);
  }, []);

  const { isListening, startListening, stopListening, hasSupport } = useSpeechRecognition({
    onResult: onSpeechResult,
  });

  const handleSend = () => {
    if (inputText.trim()) {
      onSendMessage(inputText.trim());
      setInputText("");
      if (isListening) stopListening();
    }
  };

  const toggleMic = () => {
    if (isListening) {
      stopListening();
    } else {
      startListening();
    }
  };

  return (
    <div className="w-full bg-[#0A101D]/90 backdrop-blur-xl px-4 pb-6 pt-3 shrink-0 relative z-30 border-t border-white/5">
      
      {/* Main Input Container */}
      <div className={`w-full bg-[#18264A]/80 border ${isListening ? "border-red-500/50 shadow-[0_0_15px_rgba(239,68,68,0.2)]" : "border-blue-800/40"} rounded-2xl p-2 pl-5 flex items-center transition-all focus-within:ring-2 focus-within:ring-blue-500/30`}>
        
        {/* Text Input */}
        <input 
          type="text" 
          placeholder={isListening ? "Escuchando, parcerito..." : "Dime un gasto o sube un recibo..."}
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSend()}
          className="flex-1 bg-transparent text-white placeholder-[#93A5C9]/60 border-none outline-none py-2 text-sm"
        />

        {/* Action Icons (Right) */}
        <div className="flex items-center gap-1.5 mr-1">
          {/* Microphone Icon */}
          {hasSupport && (
            <button 
              onClick={toggleMic}
              className={`p-2 rounded-xl transition-all flex items-center justify-center ${
                isListening 
                  ? "bg-red-500/20 text-red-500 animate-pulse shadow-[0_0_10px_rgba(239,68,68,0.4)]" 
                  : "text-blue-300 hover:bg-white/5 hover:text-white"
              }`}
            >
              {isListening ? <Square className="w-5 h-5 fill-current" /> : <Mic className="w-5 h-5" />}
            </button>
          )}
          
          {/* Camera / Send Button */}
          <button 
            onClick={inputText.trim() ? handleSend : () => console.log("Abriendo cámara...")}
            className={`p-2.5 rounded-xl flex items-center justify-center transition-all ${
              inputText.trim() 
                ? "bg-[#3B82F6] text-white shadow-[0_4px_12px_rgba(59,130,246,0.4)] hover:scale-105 active:scale-95" 
                : "bg-white/5 text-white/40 hover:text-white"
            }`}
          >
             {inputText.trim() ? <Send className="w-5 h-5" /> : <Camera className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Recording Status Overlay */}
      {isListening && (
        <div className="absolute top-[-20px] left-1/2 -translate-x-1/2 flex items-center gap-2 px-3 py-1 bg-red-500 rounded-full shadow-lg pointer-events-none">
          <div className="w-2 h-2 bg-white rounded-full animate-ping" />
          <span className="text-[10px] font-black text-white uppercase tracking-widest">Grabando Transcripción</span>
        </div>
      )}
    </div>
  );
}
