"use client";

import React, { useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

// Export the interface so it can be used in ChatView
export interface Message {
  id: string;
  sender: "user" | "bot";
  text?: string | React.ReactNode;
  image?: string;
  timestamp: string;
}

interface ChatMessageListProps {
  messages: Message[];
}

export default function ChatMessageList({ messages }: ChatMessageListProps) {
  const scrollRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom on new messages
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  return (
    <div 
      ref={scrollRef}
      className="flex-1 overflow-y-auto w-full p-4 flex flex-col gap-6 scroll-smooth scrollbar-hide"
    >
      <AnimatePresence initial={false}>
        {messages.map((msg, idx) => {
          const isUser = msg.sender === "user";

          return (
            <motion.div 
              key={msg.id} 
              initial={{ opacity: 0, y: 15, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              className={`flex flex-col w-full ${isUser ? "items-end" : "items-start"}`}
            >
              
              {/* Headers (TÚ vs LUKAS AI) */}
              <div className={`flex items-center gap-2 mb-1.5 ${isUser ? "flex-row-reverse" : "flex-row"}`}>
                {isUser ? (
                  <>
                    <div className="w-6 h-6 bg-[#21428D] rounded-full flex items-center justify-center text-white border border-white/10 shadow-lg">
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" /></svg>
                    </div>
                    <span className="text-[10px] font-bold text-white/40 uppercase tracking-widest">Tú</span>
                  </>
                ) : (
                  <>
                    <div className="w-6 h-6 bg-gradient-to-br from-[#D8A93F] to-[#F36E53] rounded-full flex items-center justify-center text-white shadow-[0_0_12px_rgba(216,169,63,0.4)] border border-white/10">
                       {/* Robot icon */}
                      <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="11" width="18" height="10" rx="2"></rect><circle cx="12" cy="5" r="2"></circle><path d="M12 7v4"></path><line x1="8" y1="16" x2="8" y2="16"></line><line x1="16" y1="16" x2="16" y2="16"></line></svg>
                    </div>
                    <span className="text-[10px] font-bold text-[#D8A93F] uppercase tracking-widest">Lukas AI</span>
                  </>
                )}
              </div>

              {/* Bubble */}
              <div 
                className={`max-w-[85%] rounded-2xl p-4 shadow-xl backdrop-blur-md border ${
                  isUser 
                    ? "bg-[#21428D]/30 border-white/10 rounded-tr-sm text-white/90" 
                    : "bg-white/10 border-white/20 text-white/90 rounded-tl-sm shadow-[0_4px_30px_rgba(0,0,0,0.3)]"
                }`}
              >
                {msg.text && <div className="text-[14px] leading-relaxed font-medium tracking-wide">{msg.text}</div>}
                
                {msg.image && (
                  <div className="mt-3 w-full bg-black/40 rounded-xl overflow-hidden relative border border-white/10 aspect-video flex items-center justify-center">
                    <div className="text-white/20 flex flex-col items-center">
                        <svg className="w-10 h-10 mb-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path></svg>
                        <span className="text-[10px] font-bold uppercase tracking-widest">Recibo adjunto</span>
                    </div>
                  </div>
                )}
              </div>

              {/* Timestamp */}
              <span className="text-[9px] text-white/30 font-bold mt-2 px-1 uppercase tracking-tighter">{msg.timestamp}</span>

            </motion.div>
          );
        })}
      </AnimatePresence>
    </div>
  );
}
