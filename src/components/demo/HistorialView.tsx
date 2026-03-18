import React, { useState } from "react";
import { motion } from "framer-motion";

export default function HistorialView() {
  const [activeFilter, setActiveFilter] = useState("Todos");
  const filters = ["Todos", "Ingresos", "Gastos", "🚨 Hormiga"];

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
        className="text-white font-bold text-[28px] mb-4 tracking-tight drop-shadow-md"
      >
        Tus Movimientos 📋
      </motion.h1>

      {/* Filtros (Chips) */}
      <div className="flex gap-2 overflow-x-auto no-scrollbar pb-4 -mx-1 px-1">
        {filters.map((f, i) => {
          const isHormiga = f === "🚨 Hormiga";
          const isActive = f === activeFilter;
          return (
            <motion.button
              key={i}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setActiveFilter(f)}
              className={`whitespace-nowrap px-4 py-2 rounded-full text-xs font-bold transition-colors border shadow-sm ${
                isHormiga 
                  ? isActive 
                    ? "bg-[#F36E53] border-[#F36E53] text-[#111827] shadow-[0_0_15px_rgba(243,110,83,0.4)]"
                    : "bg-[#F36E53]/10 border-[#F36E53]/30 text-[#F36E53]"
                  : isActive
                    ? "bg-[#D8A93F] border-[#D8A93F] text-[#111827] shadow-[0_0_15px_rgba(216,169,63,0.4)]"
                    : "bg-white/5 border-white/10 text-white hover:bg-white/10"
              }`}
            >
              {f}
            </motion.button>
          );
        })}
      </div>

      {/* Lista Agrupada */}
      <div className="flex-1 overflow-y-auto no-scrollbar flex flex-col gap-6 mt-2">
        
        {/* Sección: Hoy */}
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <h3 className="text-white/50 text-[10px] uppercase font-bold tracking-widest mb-3 pl-1">Hoy</h3>
          <div className="flex flex-col gap-3">
            {/* Movimiento 1: Tinto */}
            <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-4 flex items-center justify-between shadow-sm hover:bg-white/10 transition-colors">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-xl flex items-center justify-center text-xl bg-gradient-to-tr from-[#111827] to-[#F36E53]/20 border border-[#F36E53]/30 shadow-inner">
                  ☕
                </div>
                <div>
                  <h4 className="text-white font-bold text-sm">Tinto (Panadería)</h4>
                  <div className="flex items-center gap-2 mt-0.5">
                    <p className="text-white/50 text-[11px]">Cafetería</p>
                    <span className="bg-[#F36E53]/20 text-[#F36E53] text-[8px] font-black uppercase px-2 py-0.5 rounded-full border border-[#F36E53]">
                      Hormiga
                    </span>
                  </div>
                </div>
              </div>
              <span className="font-black tracking-tight text-white/90 text-[15px]">-$4.500</span>
            </div>

            {/* Movimiento 2: Corral */}
            <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-4 flex items-center justify-between shadow-sm hover:bg-white/10 transition-colors">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-xl flex items-center justify-center text-xl bg-gradient-to-tr from-[#111827] to-[#F36E53]/20 border border-[#F36E53]/30 shadow-inner">
                  🍔
                </div>
                <div>
                  <h4 className="text-white font-bold text-sm">El Corral</h4>
                  <p className="text-white/50 text-[11px]">Restaurante</p>
                </div>
              </div>
              <span className="font-black tracking-tight text-white/90 text-[15px]">-$35.000</span>
            </div>
          </div>
        </motion.div>

        {/* Sección: Ayer */}
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <h3 className="text-white/50 text-[10px] uppercase font-bold tracking-widest mb-3 pl-1">Ayer</h3>
          <div className="flex flex-col gap-3">
            {/* Movimiento 3: Ingreso Nequi */}
            <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-4 flex items-center justify-between shadow-sm hover:bg-white/10 transition-colors">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-xl flex items-center justify-center text-xl bg-gradient-to-tr from-[#111827] to-[#D8A93F]/20 border border-[#D8A93F]/30 shadow-inner">
                  💸
                </div>
                <div>
                  <h4 className="text-white font-bold text-sm">Nequi (De: Sofía)</h4>
                  <p className="text-white/50 text-[11px]">Transferencia</p>
                </div>
              </div>
              <span className="font-black tracking-tighter text-[#D8A93F] text-[15px] drop-shadow-[0_0_8px_rgba(216,169,63,0.5)]">+$50.000</span>
            </div>

            {/* Movimiento 4: Streaming */}
            <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-4 flex items-center justify-between shadow-sm hover:bg-white/10 transition-colors">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-xl flex items-center justify-center text-xl bg-gradient-to-tr from-[#111827] to-[#397DC1]/20 border border-[#397DC1]/30 shadow-inner">
                  📺
                </div>
                <div>
                  <h4 className="text-white font-bold text-sm">Streaming Premium</h4>
                  <p className="text-white/50 text-[11px]">Suscripción</p>
                </div>
              </div>
              <span className="font-black tracking-tight text-white/90 text-[15px]">-$45.000</span>
            </div>
          </div>
        </motion.div>

      </div>
    </motion.div>
  );
}
