"use client";

import React from "react";

// Mock Data Structure
interface Message {
  id: string;
  sender: "user" | "bot";
  text?: string | React.ReactNode;
  image?: string;
  timestamp: string;
}

const MOCK_MESSAGES: Message[] = [
  {
    id: "1",
    sender: "user",
    text: "Hoy me gasté esto",
    image: "/mock-receipt.jpg", // We'll simulate this with a styled div if image path fails
    timestamp: "14:02",
  },
  {
    id: "2",
    sender: "bot",
    text: (
      <>
        ¡Listo! Registré <span className="text-blue-700 font-bold">$50.000 COP</span> en <em>&quot;Comida / Restaurantes&quot;</em> (El Corral).
        <br/><br/>
        <div className="w-full h-[1px] bg-gray-100 my-2"></div>
        Pana, tu <span className="text-blue-700 font-bold">FinScore</span> bajó 15 puntos. Ya superaste tu presupuesto de comida chatarra esta semana. 📉
      </>
    ),
    timestamp: "14:03",
  }
];

export default function ChatMessageList() {
  return (
    <div className="flex-1 overflow-y-auto w-full p-4 flex flex-col gap-6 scroll-smooth bg-gray-200">
      
      {MOCK_MESSAGES.map((msg) => {
        const isUser = msg.sender === "user";

        return (
          <div key={msg.id} className={`flex flex-col w-full ${isUser ? "items-end" : "items-start"}`}>
            
            {/* Headers (TÚ vs LUKAS AI) */}
            <div className={`flex items-center gap-2 mb-1.5 ${isUser ? "flex-row-reverse" : "flex-row"}`}>
              {isUser ? (
                <>
                  <div className="w-6 h-6 bg-slate-400 rounded-full flex items-center justify-center text-white">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" /></svg>
                  </div>
                  <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wide">Tú</span>
                </>
              ) : (
                <>
                  <div className="w-6 h-6 bg-blue-700 rounded-full flex items-center justify-center text-white">
                     {/* Robot icon */}
                    <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="11" width="18" height="10" rx="2"></rect><circle cx="12" cy="5" r="2"></circle><path d="M12 7v4"></path><line x1="8" y1="16" x2="8" y2="16"></line><line x1="16" y1="16" x2="16" y2="16"></line></svg>
                  </div>
                  <span className="text-[11px] font-bold text-blue-700 uppercase tracking-wide">Lukas AI</span>
                </>
              )}
            </div>

            {/* Bubble */}
            <div 
              className={`max-w-[85%] rounded-2xl p-3 shadow-sm ${
                isUser 
                  ? "bg-[#eef2f6] border border-gray-300/50 rounded-tr-sm text-gray-800" 
                  : "bg-white border text-gray-800 rounded-tl-sm"
              }`}
            >
              {msg.text && <div className="text-[14px] leading-relaxed">{msg.text}</div>}
              
              {msg.image && (
                <div className="mt-2 w-full bg-gray-300 rounded-xl overflow-hidden relative border border-gray-200">
                  {/* Aspect ratio trick for the receipt image */}
                  <div className="pb-[56.25%]"></div> 
                  <div className="absolute inset-0 flex items-center justify-center bg-gray-200">
                    <div className="text-gray-400 flex flex-col items-center">
                       <svg className="w-10 h-10 mb-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path></svg>
                       <span className="text-xs font-semibold">Recibo adjunto</span>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Timestamp */}
            <span className="text-[10px] text-gray-500 mt-1.5 px-1">{msg.timestamp}</span>

          </div>
        );
      })}

    </div>
  );
}
