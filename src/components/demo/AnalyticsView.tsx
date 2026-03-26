import React from "react";
import { motion } from "framer-motion";

export default function AnalyticsView() {
  return (
    <motion.div 
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.4 }}
      className="flex flex-col p-5 pb-28"
    >
      <motion.h1 
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.1, type: "spring", stiffness: 100 }}
        className="text-white font-bold text-[28px] mb-6 tracking-tight drop-shadow-md"
      >
        Análisis y Grupos
      </motion.h1>

      {/* SVG Donut Chart (Mecato y Rumba limit) */}
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.2, duration: 0.4 }}
        className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-6 flex flex-col items-center justify-center relative shadow-lg shadow-black/20 w-full mb-6"
      >
        <h3 className="text-white/70 text-sm font-medium uppercase tracking-widest mb-4 w-full text-left">Presupuesto: Mecato y Rumba</h3>
        
        <div className="relative w-[200px] h-[200px] mb-2 flex justify-center items-center">
          {/* Background Glow */}
          <div className="absolute inset-0 bg-[#F36E53]/20 blur-[50px] rounded-full"></div>
          
          <svg viewBox="0 0 100 100" className="w-[180px] h-[180px] drop-shadow-[0_0_15px_rgba(243,110,83,0.5)] transform -rotate-90">
            <defs>
              <linearGradient id="coral-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#F9D472" />
                <stop offset="50%" stopColor="#F36E53" />
                <stop offset="100%" stopColor="#D9381E" />
              </linearGradient>
            </defs>
            {/* Background Circle */}
            <circle 
              cx="50" cy="50" r="40" 
              fill="none" 
              stroke="#1a2a5e" 
              strokeWidth="14" 
            />
            {/* Progress Circle (90% full) */}
            <motion.circle 
              cx="50" cy="50" r="40" 
              fill="none" 
              stroke="url(#coral-gradient)" 
              strokeWidth="14" 
              strokeLinecap="round"
              strokeDasharray="251.2"
              initial={{ strokeDashoffset: 251.2 }}
              animate={{ strokeDashoffset: 25.12 }} 
              transition={{ duration: 1.5, delay: 0.4, ease: "easeOut" }}
            />
          </svg>
          
          {/* Inner Text */}
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="text-white/60 text-[10px] font-bold uppercase tracking-wider">Gastado</span>
            <span className="text-white text-3xl font-black drop-shadow-md">90%</span>
          </div>
        </div>
        
        <div className="flex justify-between w-full mt-4 text-sm font-medium px-2">
          <span className="text-[#F36E53]">$450.000</span>
          <span className="text-white/40">de $500.000</span>
        </div>
      </motion.div>

      {/* Gasto de Panas (Sankey Diagram Placeholder) */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.4 }}
        className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-6 relative shadow-lg shadow-black/20 w-full mb-6 max-w-[600px] mx-auto"
      >
        <h3 className="text-white/70 text-sm font-medium uppercase tracking-widest mb-4">Gasto Grupal (Flujo)</h3>
        
        <div className="w-full relative h-[180px] overflow-hidden flex items-center justify-center bg-[#111827]/30 rounded-xl border border-white/5">
          {/* Sankey Flow Paths */}
          <svg viewBox="0 0 300 150" className="w-full h-full absolute inset-0">
             <defs>
               <linearGradient id="flow1" x1="0%" y1="0%" x2="100%" y2="0%">
                 <stop offset="0%" stopColor="#1a2a5e" />
                 <stop offset="100%" stopColor="#D8A93F" />
               </linearGradient>
               <linearGradient id="flow2" x1="0%" y1="0%" x2="100%" y2="0%">
                 <stop offset="0%" stopColor="#1a2a5e" />
                 <stop offset="100%" stopColor="#397DC1" />
               </linearGradient>
               <linearGradient id="flow3" x1="0%" y1="0%" x2="100%" y2="0%">
                 <stop offset="0%" stopColor="#1a2a5e" />
                 <stop offset="100%" stopColor="#F36E53" />
               </linearGradient>
             </defs>
             
             {/* Main Pool to Users paths via simple bezier curves */}
             <motion.path 
               d="M 50,75 C 100,75 150,30 220,30" 
               fill="none" stroke="url(#flow1)" strokeWidth="15" strokeLinecap="round" opacity="0.6"
               className="animate-pulse"
             />
             <motion.path 
               d="M 50,75 C 100,75 150,75 220,75" 
               fill="none" stroke="url(#flow2)" strokeWidth="20" strokeLinecap="round" opacity="0.4"
             />
             <motion.path 
               d="M 50,75 C 100,75 150,120 220,120" 
               fill="none" stroke="url(#flow3)" strokeWidth="35" strokeLinecap="round" opacity="0.8"
             />
          </svg>

          {/* Source Node */}
          <div className="absolute left-2 top-1/2 -translate-y-1/2 bg-[#21428D] px-2 py-3 rounded-lg border border-white/20 text-center shadow-md">
            <div className="text-[10px] text-white/50 uppercase font-black tracking-widest leading-none">Total</div>
            <div className="text-white font-bold text-sm mt-1">$450k</div>
          </div>

          {/* Destination Nodes */}
          <div className="absolute right-4 top-4 flex bg-[#111827] px-2 py-1 rounded shadow-lg border border-[#D8A93F]/50 items-center justify-between w-[90px]">
            <span className="text-[10px] text-white">Tú</span>
            <span className="text-[10px] text-[#D8A93F] font-bold">100k</span>
          </div>

          <div className="absolute right-4 top-[60px] flex bg-[#111827] px-2 py-1 rounded shadow-lg border border-[#397DC1]/50 items-center justify-between w-[90px]">
            <span className="text-[10px] text-white">Sofía</span>
            <span className="text-[10px] text-[#397DC1] font-bold">140k</span>
          </div>

          <div className="absolute right-4 bottom-4 flex bg-[#111827] px-2 py-1 rounded shadow-lg border border-[#F36E53]/50 items-center justify-between w-[90px]">
            <span className="text-[10px] text-white flex items-center gap-1">
               <span className="bg-[#F36E53] w-1.5 h-1.5 rounded-full animate-ping"></span>
               Andrés
            </span>
            <span className="text-[10px] text-[#F36E53] font-bold">210k</span>
          </div>
        </div>
      </motion.div>

      {/* Últimos Movimientos */}
      <motion.h3 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
        className="text-white/70 text-sm font-medium uppercase tracking-widest mb-4 px-2 mt-2"
      >
        Últimos Movimientos
      </motion.h3>
      <div className="flex flex-col gap-3">
        {[
          { icon: "🛍️", title: "Zara Premium", cat: "Ropa", amount: "-$120.000", color: "#397DC1" },
          { icon: "🍔", title: "El Corral", cat: "Mecato", amount: "-$35.000", color: "#F36E53" },
          { icon: "💸", title: "Transferencia de mamá", cat: "Ingresos", amount: "+$250.000", color: "#D8A93F", isPos: true },
          { icon: "🎬", title: "Netflix", cat: "Suscripciones", amount: "-$22.000", color: "#397DC1" },
        ].map((item, i) => (
          <motion.div 
            key={i} 
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.9 + i * 0.1 }}
            className={`bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-4 flex items-center justify-between shadow-sm hover:bg-white/10 transition-colors`}
          >
            <div className="flex items-center gap-4">
              <div 
                className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl bg-gradient-to-tr shadow-inner"
                style={{ 
                  background: `linear-gradient(to top right, #111827, ${item.color}33)`, 
                  borderColor: `${item.color}4D`, 
                  borderWidth: '1px' 
                }}
              >
                {item.icon}
              </div>
              <div>
                <h4 className="text-white font-bold">{item.title}</h4>
                <p className="text-white/50 text-xs mt-0.5">{item.cat}</p>
              </div>
            </div>
            <span className={`font-black tracking-tight ${item.isPos ? 'text-[#D8A93F]' : 'text-white'}`}>
              {item.amount}
            </span>
          </motion.div>
        ))}
      </div>

    </motion.div>
  );
}
