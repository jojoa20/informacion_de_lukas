"use client";

import React from "react";
import { motion } from "framer-motion";

export default function MetasView() {
  return (
    <motion.div 
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.4 }}
      className="flex flex-col h-full pt-5 pb-32 px-4 relative"
    >
      <motion.h1 
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.1, type: "spring", stiffness: 100 }}
        className="text-white font-bold text-[28px] mb-6 tracking-tight drop-shadow-md"
      >
        Tus Metas, Pana 🎯
      </motion.h1>

      <div className="flex-1 overflow-y-auto no-scrollbar flex flex-col gap-4">
        
        {/* Meta 1: MacBook Pro */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.4 }}
          className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-5 relative shadow-lg shadow-black/20 group hover:bg-white/10 transition-colors"
        >
          <div className="flex justify-between items-center mb-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-[#111827] to-[#D8A93F]/20 border border-[#D8A93F]/30 flex items-center justify-center text-xl shadow-inner">
                💻
              </div>
              <h3 className="text-white font-bold text-lg">MacBook Pro</h3>
            </div>
            <div className="text-right">
              <span className="text-xs text-white/50 block uppercase tracking-widest font-bold">Progreso</span>
              <span className="text-[#D8A93F] font-black text-sm">$3.5M / <span className="text-white/40 text-xs">$6.0M</span></span>
            </div>
          </div>
          
          <div className="h-2 w-full bg-[#111827] rounded-full overflow-hidden border border-white/5 relative">
            <motion.div 
              initial={{ width: 0 }}
              animate={{ width: "58.3%" }} // 3.5 / 6.0 = 58.33%
              transition={{ duration: 1.5, delay: 0.5, ease: "easeOut" }}
              className="absolute top-0 left-0 h-full bg-[#D8A93F] rounded-full shadow-[0_0_10px_rgba(216,169,63,0.8)]"
            />
          </div>
        </motion.div>

        {/* Meta 2: Viaje a San Andrés */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.4 }}
          className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-5 relative shadow-lg shadow-black/20 group hover:bg-white/10 transition-colors"
        >
          <div className="flex justify-between items-center mb-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-[#111827] to-[#397DC1]/20 border border-[#397DC1]/30 flex items-center justify-center text-xl shadow-inner">
                ✈️
              </div>
              <h3 className="text-white font-bold text-lg">Viaje a San Andrés</h3>
            </div>
            <div className="text-right">
              <span className="text-xs text-white/50 block uppercase tracking-widest font-bold">Progreso</span>
              <span className="text-[#397DC1] font-black text-sm">$500k / <span className="text-white/40 text-xs">$2.0M</span></span>
            </div>
          </div>
          
          <div className="h-2 w-full bg-[#111827] rounded-full overflow-hidden border border-white/5 relative">
            <motion.div 
              initial={{ width: 0 }}
              animate={{ width: "25%" }}
              transition={{ duration: 1.5, delay: 0.6, ease: "easeOut" }}
              className="absolute top-0 left-0 h-full bg-gradient-to-r from-[#1a2a5e] to-[#397DC1] rounded-full shadow-[0_0_10px_rgba(57,125,193,0.5)]"
            />
          </div>
        </motion.div>

      </div>

      {/* Floating Action Button (FAB) */}
      <motion.div 
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.6, type: "spring", stiffness: 200 }}
        className="absolute bottom-28 left-0 right-0 flex justify-center pointer-events-none"
      >
        <button className="pointer-events-auto bg-gradient-to-r from-[#D8A93F] to-[#F36E53] text-[#111827] font-black tracking-tight px-6 py-3 rounded-full shadow-[0_10px_20px_rgba(243,110,83,0.4)] transition-transform hover:scale-105 active:scale-95 border-2 border-[#111827] flex items-center gap-2">
          <span>+</span>
          <span>Crear nueva meta</span>
        </button>
      </motion.div>
    </motion.div>
  );
}
