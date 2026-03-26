'use client';

import React, { useState, useRef } from "react";
import { motion } from "framer-motion";
import { useConversation } from '@elevenlabs/react';

export default function ChatView() {
  const [status, setStatus] = useState<'idle' | 'in_progress'>('idle');
  const [messages, setMessages] = useState<any[]>([]);
  const [input, setInput] = useState('');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };
  
  // Voice Integration: ElevenLabs Conversational WebSockets
  const conversation = useConversation();
  const [isVoiceActive, setIsVoiceActive] = useState(false);

  const startVoiceSession = async () => {
    try {
      // @ts-ignore
      await conversation.startSession({
        agentId: process.env.NEXT_PUBLIC_ELEVENLABS_AGENT_ID,
      });
      setIsVoiceActive(true);
    } catch (error) {
       console.error("ElevenLabs Connection Error:", error);
    }
  };

  const endVoiceSession = async () => {
    await conversation.endSession();
    setIsVoiceActive(false);
  };

  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleCustomSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!input && !selectedImage) return;

    const currentInput = input || "Mira este comprobante:";
    const currentImage = selectedImage;

    setMessages((prev: any[]) => [...prev, { id: Date.now().toString(), role: 'user', content: currentInput, data: currentImage }]);
    setSelectedImage(null);
    setInput('');
    setStatus('in_progress');

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: currentInput,
          imageUrl: currentImage,
          threadId: messages.length > 0 ? (messages[0] as any).threadId : null, 
        }),
      });

      if (!res.body) return;

      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      let assistantMsg = '';
      setMessages(prev => [...prev, { id: 'ast-' + Date.now(), role: 'assistant', content: '' }]);

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        const chunk = decoder.decode(value, { stream: true });
        const lines = chunk.split('\n');
        for (const line of lines) {
          if (line.startsWith('0:')) {
            try {
              const textPiece = JSON.parse(line.slice(2));
              assistantMsg += textPiece;
              setMessages((prev: any[]) => {
                const newArr = [...prev];
                newArr[newArr.length - 1].content = assistantMsg;
                return newArr;
              });
            } catch (e) {}
          }
        }
      }
    } catch (err) {
      console.error(err);
    } finally {
      setStatus('idle');
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.4 }}
      className="flex flex-col h-full pt-5 pb-32 px-4 relative"
    >
      <motion.h1 
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.1, type: "spring" }}
        className="text-white font-bold text-2xl mb-6 tracking-tight drop-shadow-md text-center"
      >
        Lukas AI
        <span className="block text-[11px] font-medium text-green-400 mt-1 flex items-center justify-center gap-1">
          <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse"></span>
          En línea {status === 'in_progress' ? '(Pensando...)' : (conversation.status === 'connected' ? '(Voz Activa)' : '')}
        </span>
      </motion.h1>

      <div className="flex-1 overflow-y-auto no-scrollbar flex flex-col gap-6">
        
        {messages.map((m: any, idx: number) => (
          <motion.div 
            key={m.id || idx}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className={`flex flex-col gap-1 ${m.role === 'user' ? 'items-end' : 'items-start'}`}
          >
            {m.role === 'assistant' && (
              <div className="flex items-end gap-2">
                <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-[#1a2a5e] to-[#397DC1] border border-white/20 shadow-lg flex items-center justify-center mb-1 flex-shrink-0">
                  <span className="text-white text-xs font-bold font-serif">L</span>
                </div>
                <div className="bg-[#1a2a5e] border border-white/10 text-white rounded-2xl rounded-tl-sm p-4 max-w-[85%] shadow-[0_5px_20px_rgba(0,0,0,0.3)]">
                  <p className="text-sm leading-relaxed whitespace-pre-wrap flex flex-col gap-2">
                    {m.content}
                  </p>
                </div>
              </div>
            )}

            {m.role === 'user' && (
              <div className="bg-[#397DC1] text-white rounded-2xl rounded-tr-sm p-3 max-w-[85%] shadow-[0_5px_15px_rgba(57,125,193,0.3)] border border-[#397DC1]/50">
                {m.data && (
                  <div className="w-full bg-[#111827]/60 rounded-xl p-2 mb-2 border border-white/20 flex flex-col items-center justify-center relative overflow-hidden group">
                    <img src={m.data} alt="Upload" className="relative z-10 w-full object-cover max-h-32 rounded" />
                  </div>
                )}
                <p className="text-sm">{m.content}</p>
              </div>
            )}
            <span className="text-[10px] text-white/40 mx-1">{m.role === 'user' ? 'Tú' : 'Lukas'}</span>
          </motion.div>
        ))}

        {selectedImage && (
          <div className="flex flex-col items-end gap-1 opacity-70">
             <div className="bg-[#397DC1] text-white rounded-2xl p-2 max-w-[50%]">
               <img src={selectedImage} alt="Preview" className="rounded w-full" />
             </div>
          </div>
        )}
      </div>

      <motion.div 
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.5, type: "spring", stiffness: 200 }}
        className="absolute bottom-6 left-4 right-4 z-40"
      >
        <form onSubmit={handleCustomSubmit} className="bg-[#111827]/90 backdrop-blur-xl border border-white/10 rounded-full p-1.5 pl-4 flex items-center shadow-[0_15px_40px_rgba(0,0,0,0.6)]">
          <input 
            type="file" 
            accept="image/*" 
            className="hidden" 
            ref={fileInputRef} 
            onChange={handleImageUpload} 
          />
          <button type="button" onClick={() => fileInputRef.current?.click()} className="p-2.5 text-[#397DC1] hover:text-white transition-colors rounded-full hover:bg-white/5" aria-label="Sube un comprobante">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
          </button>

          <input 
            type="text" 
            value={input}
            onChange={handleInputChange}
            placeholder={isVoiceActive ? "Escuchando... (Vuelve a tocar el micro para parar)" : "Dime un gasto o sube un comprobante..."} 
            className="flex-1 bg-transparent text-white placeholder-white/40 border-none outline-none text-[13px] px-2 disabled:opacity-50"
            disabled={isVoiceActive}
          />

          <button 
             type="button" 
             onClick={isVoiceActive ? endVoiceSession : startVoiceSession}
             className={`p-2.5 rounded-full transition-all ${isVoiceActive ? 'bg-red-500 animate-pulse text-white' : 'text-[#397DC1] hover:bg-white/5'}`}
             aria-label="Hablar con Lukas"
          >
             <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
               {isVoiceActive ? (
                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z M9 10h6v4H9z" />
               ) : (
                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z M12 4a3 3 0 00-3 3v4a3 3 0 006 0V7a3 3 0 00-3-3z" />
               )}
             </svg>
          </button>

          <button type="submit" disabled={status === 'in_progress' || isVoiceActive} className="bg-gradient-to-r from-[#D8A93F] to-[#F36E53] text-[#111827] p-2.5 rounded-full shadow-[0_0_15px_rgba(243,110,83,0.4)] transition-transform hover:scale-105 ml-1 disabled:opacity-50">
            <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </button>
        </form>
      </motion.div>
    </motion.div>
  );
}
