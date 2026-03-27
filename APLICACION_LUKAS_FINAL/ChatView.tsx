import React from "react";
import { motion } from "framer-motion";

export default function ChatView() {
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
          En línea
        </span>
      </motion.h1>

      <div className="flex-1 overflow-y-auto no-scrollbar flex flex-col gap-6">
        
        {/* User Message (Nequi/Daviplata Receipt Upload) */}
        <motion.div 
          initial={{ opacity: 0, y: 40, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ type: "spring", stiffness: 300, damping: 25, delay: 0.2 }}
          className="flex flex-col items-end gap-1"
        >
          <div className="bg-[#397DC1] text-white rounded-2xl rounded-tr-sm p-3 max-w-[85%] shadow-[0_5px_15px_rgba(57,125,193,0.3)] border border-[#397DC1]/50">
            {/* Image Placeholder representing the Screenshot */}
            <div className="w-full bg-[#111827]/60 rounded-xl p-2 mb-2 border border-white/20 flex flex-col items-center justify-center relative overflow-hidden group">
              <div className="absolute inset-0 bg-gradient-to-t from-[#111827] to-transparent opacity-80"></div>
              {/* Fake Image Content */}
              <div className="relative z-10 w-full h-32 bg-purple-900/40 rounded flex flex-col items-center justify-center border border-purple-500/30">
                 <span className="text-xl font-bold text-purple-200">Nequi</span>
                 <span className="text-xs text-purple-300/70">Comprobante.jpg</span>
              </div>
              
              {/* OCR Scanning Overlay Indicator */}
              <motion.div 
                 initial={{ top: 0 }}
                 animate={{ top: "100%" }}
                 transition={{ duration: 1.5, repeat: Infinity, repeatType: "reverse", ease: "linear" }}
                 className="absolute left-0 right-0 h-0.5 bg-[#4ADE80] shadow-[0_0_10px_#4ADE80] z-20"
              />
              <div className="absolute bottom-2 left-1/2 -translate-x-1/2 bg-[#111827]/80 px-2 py-0.5 rounded text-[8px] text-[#4ADE80] font-bold tracking-widest uppercase flex items-center gap-1 z-20">
                <span className="w-1 h-1 bg-[#4ADE80] rounded-full animate-ping"></span>
                OCR Activo
              </div>
            </div>
            
            <p className="text-sm">Sube este comprobante y anótalo como gasto compartido. ☝🏽</p>
          </div>
          <span className="text-[10px] text-white/40 mr-1">Tú • 08:15 PM</span>
        </motion.div>

        {/* Lukas AI Message (OCR Analysis & Gamification) */}
        <motion.div 
          initial={{ opacity: 0, y: 40, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ type: "spring", stiffness: 300, damping: 25, delay: 1.5 }}
          className="flex flex-col items-start gap-1"
        >
           <div className="flex items-end gap-2">
             <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-[#1a2a5e] to-[#397DC1] border border-white/20 shadow-lg flex items-center justify-center mb-1 flex-shrink-0">
               <span className="text-white text-xs font-bold font-serif">L</span>
             </div>
             
             <div className="bg-[#1a2a5e] border border-white/10 text-white rounded-2xl rounded-tl-sm p-4 max-w-[85%] shadow-[0_5px_20px_rgba(0,0,0,0.3)]">
               
               {/* Analysis Result Box */}
               <div className="w-full bg-black/30 border border-white/5 rounded-lg p-3 mb-3">
                 <div className="flex justify-between items-center mb-2">
                    <span className="text-[10px] text-white/50 uppercase tracking-widest font-bold">Resumen de OCR</span>
                    <span className="text-[#4ADE80] text-[10px] font-bold flex items-center gap-1">✓ Verificado</span>
                 </div>
                 <div className="flex justify-between items-end">
                    <div>
                      <div className="text-xs text-white/70">Monto Extraído:</div>
                      <div className="font-bold text-lg text-white">-$120.000</div>
                    </div>
                    <div className="text-right">
                      <div className="text-[10px] text-white/70">Concepto:</div>
                      <div className="text-xs font-semibold text-[#D8A93F]">Cena El Corral</div>
                    </div>
                 </div>
               </div>

               <p className="text-sm leading-relaxed mb-3">
                 ¡Listo el pollo! Extraje los $120.000 del Nequi. Lo clasifiqué en <span className="font-semibold text-[#F36E53]">Salidas (Mecato)</span>.
               </p>
               
               {/* Impact Alert */}
               <div className="bg-[#F36E53]/10 border border-[#F36E53]/40 rounded-xl p-3 flex items-start gap-3 shadow-[0_0_15px_rgba(243,110,83,0.15)]">
                 <div className="w-6 h-6 rounded-full bg-[#F36E53] flex items-center justify-center text-white flex-shrink-0 font-bold text-xs mt-0.5">!</div>
                 <div>
                   <h5 className="text-[#F36E53] font-bold text-xs uppercase tracking-wide mb-1">Impacto FinScore</h5>
                   <p className="text-[12px] text-white/90 leading-snug">
                     Tu presupuesto de 'Mecato y Rumba' llegó al <strong>90%</strong>. Te restamos <strong className="text-[#F36E53]">-5 pts</strong>.
                   </p>
                 </div>
               </div>
             </div>
           </div>
           <span className="text-[10px] text-white/40 ml-11">Lukas • 08:16 PM</span>
        </motion.div>

      </div>

      {/* Floating Chat Input Bar (Conversational UI) */}
      <motion.div 
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.5, type: "spring", stiffness: 200 }}
        className="absolute bottom-6 left-4 right-4 z-40"
      >
        <div className="bg-[#111827]/90 backdrop-blur-xl border border-white/10 rounded-full p-1.5 pl-4 flex items-center shadow-[0_15px_40px_rgba(0,0,0,0.6)]">
          {/* Camera Icon */}
          <button className="p-2.5 text-[#397DC1] hover:text-white transition-colors rounded-full hover:bg-white/5" aria-label="Sube un comprobante">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
          </button>

          {/* Input */}
          <input 
            type="text" 
            placeholder="Dime un gasto o sube un comprobante..." 
            className="flex-1 bg-transparent text-white placeholder-white/40 border-none outline-none text-[13px] px-2"
          />

          {/* Mic / Send Button */}
          <button className="bg-gradient-to-r from-[#D8A93F] to-[#F36E53] text-[#111827] p-2.5 rounded-full shadow-[0_0_15px_rgba(243,110,83,0.4)] transition-transform hover:scale-105 ml-1">
            <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4a3 3 0 00-3 3v4a3 3 0 006 0V7a3 3 0 00-3-3z" />
            </svg>
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
}
