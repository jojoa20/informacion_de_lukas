"use client";

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function InputMethods() {
  const [activeStep, setActiveStep] = useState(0); // 0: Chat, 1: Voice, 2: OCR

  useEffect(() => {
    const cycle = setInterval(() => {
      setActiveStep((prev) => (prev + 1) % 3);
    }, 6000);
    return () => clearInterval(cycle);
  }, []);

  return (
    <section className="relative py-32 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-white/5 bg-[#020617] overflow-hidden">
      
      {/* Background Decor */}
      <div className="absolute top-0 inset-x-0 h-px w-full bg-gradient-to-r from-transparent via-[#397dc1]/20 to-transparent" />

      <div className="text-center mb-20 max-w-4xl mx-auto">
        <h2 className="text-4xl md:text-5xl lg:text-7xl font-black mb-6 tracking-tight text-white">
          Cero formularios. <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#397dc1] to-[#a898c9]">Solo habla con Lukas.</span>
        </h2>
        <p className="text-white/70 text-lg md:text-2xl font-medium max-w-[720px] mx-auto leading-relaxed">
          Ingresar tus gastos debería ser tan fácil como enviar un mensaje. Sin planillas, sin registros manuales.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch max-w-6xl mx-auto">
        
        {/* CARD 1 — CHAT INPUT */}
        <div className={`relative bg-black/40 border transition-all duration-700 rounded-[32px] p-8 backdrop-blur-xl overflow-hidden flex flex-col ${activeStep === 0 ? 'border-[#397dc1]/50 shadow-[0_0_40px_rgba(57,125,193,0.15)] scale-[1.02]' : 'border-white/5 opacity-40 scale-[0.98]'}`}>
          <div className="flex items-center gap-3 mb-10">
            <div className="w-10 h-10 rounded-xl bg-[#397dc1]/10 flex items-center justify-center border border-[#397dc1]/30 text-[#397dc1]">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" /></svg>
            </div>
            <h3 className="text-lg font-bold text-white">Chat Intelligente</h3>
          </div>

          <div className="flex-1 flex flex-col justify-end space-y-6">
            <AnimatePresence>
              {activeStep === 0 && (
                <>
                  <motion.div 
                    initial={{ x: -20, opacity: 0 }} animate={{ x: 0, opacity: 1 }}
                    className="bg-[#397dc1] text-white p-4 rounded-2xl rounded-bl-sm self-start max-w-[90%] shadow-lg text-sm"
                  >
                    "Lukas, gasté 15 lucas en empanadas."
                  </motion.div>
                  
                  <motion.div 
                    initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ delay: 1.5 }}
                    className="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-3 relative overflow-hidden"
                  >
                    {/* Processing Glow */}
                    <div className="absolute inset-x-0 bottom-0 h-1 bg-gradient-to-r from-transparent via-[#397dc1] to-transparent animate-pulse" />
                    
                    <div className="flex justify-between items-center text-[10px] font-black uppercase tracking-widest">
                      <span className="text-[#397dc1]">Extrayendo Datos...</span>
                      <span className="text-white/40">AI Engine active</span>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-white/40 text-[9px] uppercase font-bold tracking-tighter">Categoría</p>
                        <p className="text-white text-xs font-bold">🍕 Comida</p>
                      </div>
                      <div>
                        <p className="text-white/40 text-[9px] uppercase font-bold tracking-tighter">Monto</p>
                        <p className="text-white text-xs font-bold">$15.000</p>
                      </div>
                    </div>
                    <div className="pt-2 border-t border-white/5">
                      <p className="text-[#10b981] text-[10px] font-black uppercase tracking-widest flex items-center gap-1">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#10b981] animate-ping" />
                        FinScore Actualizado
                      </p>
                    </div>
                  </motion.div>
                </>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* CARD 2 — VOICE INPUT */}
        <div className={`relative bg-black/40 border transition-all duration-700 rounded-[32px] p-8 backdrop-blur-xl overflow-hidden flex flex-col ${activeStep === 1 ? 'border-[#a898c9]/50 shadow-[0_0_40px_rgba(168,152,201,0.15)] scale-[1.02]' : 'border-white/5 opacity-40 scale-[0.98]'}`}>
          <div className="flex items-center gap-3 mb-10">
            <div className="w-10 h-10 rounded-xl bg-[#a898c9]/10 flex items-center justify-center border border-[#a898c9]/30 text-[#a898c9]">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" /></svg>
            </div>
            <h3 className="text-lg font-bold text-white">Voz Pana</h3>
          </div>

          <div className="flex-1 flex flex-col items-center justify-center space-y-8">
            <div className="flex items-end gap-1.5 h-16 w-full justify-center">
              {Array.from({ length: 15 }).map((_, i) => (
                <motion.div 
                  key={i}
                  animate={{ height: activeStep === 1 ? [15, 60, 20] : 15 }}
                  transition={{ repeat: Infinity, duration: 0.6, delay: i * 0.05 }}
                  className="w-1.5 bg-gradient-to-t from-[#a898c9] to-[#397dc1] rounded-full"
                />
              ))}
            </div>

            <AnimatePresence>
              {activeStep === 1 && (
                <motion.div 
                  initial={{ y: 10, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 1 }}
                  className="text-center space-y-4"
                >
                  <p className="text-white/60 italic text-sm">"gasté 20 mil en transporte"</p>
                  <div className="p-3 rounded-2xl bg-[#06b6d4]/10 border border-[#06b6d4]/20">
                    <div className="flex items-center justify-center gap-4">
                      <div className="text-center">
                        <p className="text-white/40 text-[8px] uppercase font-black">AI Match</p>
                        <p className="text-[#06b6d4] text-xs font-black">Transporte • $20k</p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* CARD 3 — SCREENSHOT OCR */}
        <div className={`relative bg-black/40 border transition-all duration-700 rounded-[32px] p-8 backdrop-blur-xl overflow-hidden flex flex-col ${activeStep === 2 ? 'border-[#f36e53]/50 shadow-[0_0_40px_rgba(243,110,83,0.15)] scale-[1.02]' : 'border-white/5 opacity-40 scale-[0.98]'}`}>
          <div className="flex items-center gap-3 mb-10">
            <div className="w-10 h-10 rounded-xl bg-[#f36e53]/10 flex items-center justify-center border border-[#f36e53]/30 text-[#f36e53]">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" /></svg>
            </div>
            <h3 className="text-lg font-bold text-white">OCR Pantallazo</h3>
          </div>

          <div className="flex-1 flex flex-col items-center justify-center space-y-6">
            <div className="relative w-28 h-40 bg-white/5 border border-white/10 rounded-xl overflow-hidden shadow-2xl">
              {/* Receipt Dummy Content */}
              <div className="p-3 space-y-2 opacity-20">
                <div className="h-6 w-12 bg-[#397dc1]/30 rounded mx-auto" />
                <div className="h-1.5 w-full bg-white/40 rounded" />
                <div className="h-1.5 w-3/4 bg-white/40 rounded" />
                <div className="h-1.5 w-full bg-white/40 rounded" />
                <div className="h-4 w-16 bg-white/60 rounded mx-auto mt-4" />
              </div>
              
              {/* Laser Scanning Animation */}
              {activeStep === 2 && (
                <>
                  <motion.div 
                    animate={{ top: ['0%', '95%', '0%'] }}
                    transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                    className="absolute inset-x-0 h-0.5 bg-[#f36e53] shadow-[0_0_15px_#f36e53] z-20"
                  />
                  <motion.div 
                    animate={{ top: ['-20%', '80%', '-20%'] }}
                    transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                    className="absolute inset-x-0 h-12 bg-gradient-to-b from-[#f36e53]/20 to-transparent z-10"
                  />
                </>
              )}
            </div>

            <AnimatePresence>
              {activeStep === 2 && (
                <motion.div 
                  initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ delay: 1 }}
                  className="w-full space-y-2 px-2"
                >
                  <div className="flex justify-between items-center text-[9px] font-black uppercase text-white/40">
                    <span>Field</span>
                    <span>Confidence</span>
                  </div>
                  {[
                    { l: 'Monto', v: '$15.000', c: '98%' },
                    { l: 'Store', v: 'Empanadas', c: '95%' }
                  ].map((f, i) => (
                    <div key={i} className="flex justify-between items-center p-2 rounded-lg bg-white/5 border border-white/5">
                      <div>
                        <p className="text-[8px] uppercase text-white/30 font-bold">{f.l}</p>
                        <p className="text-[10px] text-white font-black">{f.v}</p>
                      </div>
                      <span className="text-[8px] font-black text-[#10b981]">{f.c}</span>
                    </div>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

      </div>

      {/* Progress Indicators */}
      <div className="mt-16 flex justify-center gap-3">
        {[0, 1, 2].map(i => (
          <div 
            key={i} 
            className={`h-1 rounded-full transition-all duration-700 ${activeStep === i ? 'w-12 bg-[#397dc1]' : 'w-4 bg-white/10'}`} 
          />
        ))}
      </div>

      <p className="text-center mt-8 text-[10px] font-mono font-black text-white/10 tracking-[0.5em] uppercase">
        Lukas AI: Multimodal Input Engine Active
      </p>
    </section>
  );
}
