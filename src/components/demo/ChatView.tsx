'use client';

import React, { useState, useCallback } from "react";
import { motion } from "framer-motion";
import ChatMessageList, { Message } from "../chat/ChatMessageList";
import ChatInputBar from "../chat/ChatInputBar";

export default function ChatView() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      sender: "bot",
      text: "¡Qué más, Pana! Soy Lukas, tu inteligencia financiera. ¿En qué te puedo ayudar hoy? Di algo como 'gasté 30 mil en pizza' o pregúntame por tus ahorros.",
      timestamp: "17:15",
    }
  ]);

  const [isTyping, setIsTyping] = useState(false);

  const saveMessageToDB = async (sender: "user" | "bot", content: string) => {
    try {
      await fetch("/api/chat/save", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 
          sender, 
          content,
          user_id: "00000000-0000-0000-0000-000000000001" 
        }),
      });
    } catch (error) {
      console.error("Error persistiendo mensaje:", error);
    }
  };

  const handleSendMessage = useCallback((text: string) => {
    // 1. Add User Message (State & DB)
    const userMsg: Message = {
      id: Date.now().toString(),
      sender: "user",
      text,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };
    
    setMessages(prev => [...prev, userMsg]);
    saveMessageToDB("user", text);

    // 2. Simulate Bot Typing
    setIsTyping(true);
    
    // 3. Simulate Bot Response after 1.5s
    setTimeout(() => {
      let responseText = "¡Listo, parcero! Lo tengo anotado. ¿Necesitas algo más?";
      
      const lowerText = text.toLowerCase();
      if (lowerText.includes("gasté") || lowerText.includes("pagué") || lowerText.includes("compre")) {
        responseText = "¡De una! He registrado ese gasto. Tu presupuesto se ha actualizado automáticamente. 💸";
      } else if (lowerText.includes("hola") || lowerText.includes("qué más")) {
        responseText = "¡Habla, Pana! Aquí firme para cuidar tus lucas. ¿Qué cuentas?";
      }

      const botMsg: Message = {
        id: (Date.now() + 1).toString(),
        sender: "bot",
        text: responseText,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };

      setMessages(prev => [...prev, botMsg]);
      saveMessageToDB("bot", responseText);
      setIsTyping(false);
    }, 1500);
  }, []);

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="flex flex-col h-full absolute inset-0 pt-4 pb-2 relative overflow-hidden bg-[#0A101D]"
    >
      {/* Header Minimalista */}
      <motion.div 
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="px-6 py-4 flex items-center justify-between border-b border-white/5 bg-[#0B1221]/50 backdrop-blur-md z-20"
      >
        <div className="flex flex-col">
          <h1 className="text-white font-black text-xl tracking-tighter">
            Lukas AI
          </h1>
          <div className="flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse shadow-[0_0_8px_rgba(34,197,94,0.6)]"></span>
            <span className="text-[9px] font-bold text-white/40 tracking-widest uppercase">
              Modo Transcripción Activo
            </span>
          </div>
        </div>

        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#D8A93F] to-[#F36E53] p-[1px]">
          <div className="w-full h-full rounded-full bg-[#0B1221] flex items-center justify-center">
            <span className="text-[10px] font-bold text-[#D8A93F]">LA</span>
          </div>
        </div>
      </motion.div>

      {/* Contenedor de Mensajes */}
      <div className="flex-1 overflow-hidden relative z-10 flex flex-col pt-2">
        <ChatMessageList messages={messages} />
        
        {/* Typing Indicator */}
        {isTyping && (
          <motion.div 
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
            className="px-6 py-2 flex items-center gap-2"
          >
            <div className="flex gap-1">
              <div className="w-1 h-1 bg-[#D8A93F] rounded-full animate-bounce [animation-delay:-0.3s]" />
              <div className="w-1 h-1 bg-[#D8A93F] rounded-full animate-bounce [animation-delay:-0.15s]" />
              <div className="w-1 h-1 bg-[#D8A93F] rounded-full animate-bounce" />
            </div>
            <span className="text-[10px] text-white/30 font-bold uppercase tracking-widest">Lukas está pensando...</span>
          </motion.div>
        )}
      </div>

      {/* Barra de Entrada (Transcription-enabled) */}
      <div className="relative z-20">
        <ChatInputBar onSendMessage={handleSendMessage} />
      </div>

      {/* Decoración de Fondo (Efecto Glassmorphism Profundo) */}
      <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-[#D8A93F]/5 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-[#F36E53]/5 blur-[120px] rounded-full pointer-events-none" />
    </motion.div>
  );
}
