"use client";

import React, { useCallback } from "react";
import { useConversation } from "@elevenlabs/react";
import { motion, AnimatePresence } from "framer-motion";
import { Mic, MicOff, PhoneOff, Loader2 } from "lucide-react";

export function LukasAgent() {
  const conversation = useConversation();
  const { status, isSpeaking } = conversation;

  const toggleConversation = useCallback(async () => {
    if (status === "connected") {
      await conversation.endSession();
    } else {
      try {
        // Request microphone access
        await navigator.mediaDevices.getUserMedia({ audio: true });
        
        // Start conversation with WebRTC
        await conversation.startSession({
          agentId: "agent_5301kmrk6fnkfax8c8csz823ej51",
          connectionType: "webrtc",
        });
      } catch (error) {
        console.error("Error al iniciar la conversación:", error);
        alert("¡Pana! No pudimos conectar con el micrófono o el agente. Revisa los permisos.");
      }
    }
  }, [status, conversation]);

  return (
    <div className="flex flex-col items-center justify-center space-y-10 w-full max-w-lg mx-auto p-8 rounded-3xl bg-[#0B0F1A]/80 border border-white/5 backdrop-blur-xl shadow-2xl">
      
      {/* Visualización del Agente */}
      <div className="relative flex items-center justify-center h-64 w-full">
        
        {/* Onda de choque de neón cuando habla */}
        <AnimatePresence>
          {isSpeaking && (
            <>
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: [1, 2.2, 1], opacity: [0.1, 0.4, 0.1] }}
                exit={{ opacity: 0 }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                className="absolute w-40 h-40 rounded-full bg-[#D8A93F] blur-3xl"
              />
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: [1, 1.8, 1], opacity: [0.2, 0.5, 0.2] }}
                exit={{ opacity: 0 }}
                transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut", delay: 0.3 }}
                className="absolute w-32 h-32 rounded-full bg-[#F36E53] blur-2xl"
              />
            </>
          )}
        </AnimatePresence>

        {/* Círculo Central Reactivo */}
        <motion.div
          animate={status === "connected" ? { 
            scale: isSpeaking ? [1, 1.1, 1] : 1,
            boxShadow: isSpeaking 
              ? [
                  "0 0 20px rgba(243,110,83,0.5)", 
                  "0 0 60px rgba(243,110,83,0.8)", 
                  "0 0 20px rgba(243,110,83,0.5)"
                ] 
              : "0 0 20px rgba(243,110,83,0.3)" 
          } : {}}
          transition={{ duration: 0.4, repeat: isSpeaking ? Infinity : 0 }}
          className={`relative z-20 w-36 h-36 rounded-full flex items-center justify-center border-4 transition-all duration-700 ${
            status === "connected" 
              ? "border-[#F36E53] bg-[#0F172A] shadow-[0_0_40px_rgba(243,110,83,0.4)]" 
              : "border-white/10 bg-white/5"
          }`}
        >
          <button
            onClick={toggleConversation}
            className="w-full h-full rounded-full flex items-center justify-center focus:outline-none group transition-transform active:scale-90"
            disabled={status === "connecting"}
          >
            {status === "connecting" ? (
              <Loader2 className="w-12 h-12 text-white/50 animate-spin" />
            ) : status === "connected" ? (
              <PhoneOff className="w-12 h-12 text-[#F36E53] group-hover:scale-110 transition-transform" />
            ) : (
              <Mic className="w-12 h-12 text-white/80 group-hover:text-[#D8A93F] group-hover:scale-110 transition-transform" />
            )}
          </button>
        </motion.div>
      </div>

      {/* Etiquetas de Estado */}
      <div className="text-center space-y-4">
        <div className="flex flex-col items-center gap-1">
          <h3 className={`text-2xl font-black tracking-tight uppercase transition-colors duration-500 ${
            status === "connected" ? "text-white" : "text-white/40"
          }`}>
            {status === "connected" ? "Lukas en línea" : "Lukas está offline"}
          </h3>
          <div className="flex items-center gap-2">
            <span className={`w-2 h-2 rounded-full ${
              status === "connected" ? "bg-green-500 animate-pulse" : "bg-red-500"
            }`} />
            <p className="text-sm font-medium text-white/50 tracking-widest uppercase">
              {status === "connected" 
                ? isSpeaking ? "Lukas está hablando..." : "Escuchando, parcerito..." 
                : status === "connecting" 
                  ? "Conectando WebRTC..." 
                  : "Listo para charlar"}
            </p>
          </div>
        </div>

        <p className="text-white/30 text-xs italic font-medium max-w-[250px] mx-auto leading-relaxed">
          {status === "connected" 
            ? "El pana Lukas está analizando tus finanzas en tiempo real. ¡Pregúntale lo que sea!" 
            : "Toca el botón para conectar con tu robo-advisor favorito de la Gen Z colombiana."}
        </p>
      </div>

      {/* Visualizer de Voz (Footer) */}
      <div className="flex items-center gap-1 h-8">
        {status === "connected" && isSpeaking && [0, 1, 2, 3, 4, 1, 0].map((h, i) => (
          <motion.div
            key={i}
            animate={{ height: ["20%", "100%", "20%"] }}
            transition={{ duration: 0.5, repeat: Infinity, delay: i * 0.1 }}
            className="w-1.5 bg-gradient-to-t from-[#F36E53] to-[#D8A93F] rounded-full"
          />
        ))}
      </div>
    </div>
  );
}
