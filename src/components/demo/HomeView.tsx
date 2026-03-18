"use client";
import React, { useState, useEffect } from "react";
import AlertModal from "./AlertModal";
import { motion, animate, AnimatePresence } from "framer-motion";

interface HomeViewProps {
  onOpenAlert?: () => void;
}

function AnimatedNumber({ value }: { value: number }) {
  const [displayValue, setDisplayValue] = useState(0);
  useEffect(() => {
    const controls = animate(0, value, {
      duration: 2,
      ease: "easeOut",
      onUpdate: (v) => setDisplayValue(Math.round(v))
    });
    return controls.stop;
  }, [value]);
  return <>{displayValue}</>;
}

export default function HomeView({ onOpenAlert }: HomeViewProps) {
  const [showAlertModal, setShowAlertModal] = useState(false);

  // Nodes for dense graph (coordinates based on 400x350)
  const centerNode = { x: 200, y: 175, label: "Cuenta Principal" };
  const categories = [
    { x: 100, y: 100, label: "Fijos", color: "#397DC1" },
    { x: 300, y: 100, label: "Salidas", color: "#397DC1" },
    { x: 100, y: 250, label: "Ahorro", color: "#397DC1" },
    { x: 300, y: 250, label: "Susc.", color: "#397DC1" },
  ];

  const subNodes = [
    // Fijos (5)
    { cx: 100, cy: 100, x: 50, y: 50, label: "Arriendo" },
    { cx: 100, cy: 100, x: 140, y: 40, label: "Agua" },
    { cx: 100, cy: 100, x: 30, y: 130, label: "Luz" },
    { cx: 100, cy: 100, x: 80, y: 150, label: "Internet" },
    { cx: 100, cy: 100, x: 150, y: 140, label: "Gas" },
    
    // Ahorro (3)
    { cx: 100, cy: 250, x: 50, y: 210, label: "Fondo EM" },
    { cx: 100, cy: 250, x: 140, y: 300, label: "Viaje" },
    { cx: 100, cy: 250, x: 50, y: 300, label: "Crypto" },

    // Suscripciones (3)
    { cx: 300, cy: 250, x: 260, y: 310, label: "Netflix" },
    { cx: 300, cy: 250, x: 350, y: 300, label: "Spotify" },
    { cx: 300, cy: 250, x: 360, y: 230, label: "Gym" },

    // Salidas (2)
    { cx: 300, cy: 100, x: 250, y: 40, label: "Bar" },
    { cx: 300, cy: 100, x: 360, y: 40, label: "Cine" },
  ];

  const alertNodes = [
    { cx: 300, cy: 100, x: 350, y: 140, label: "Tinto", color: "#F36E53" },
    { cx: 300, cy: 100, x: 380, y: 160, label: "Empanada", color: "#F36E53" },
    { cx: 300, cy: 100, x: 350, y: 200, label: "Snacks", color: "#F36E53" },
    { cx: 300, cy: 100, x: 310, y: 165, label: "Uber", color: "#F36E53" },
    { cx: 300, cy: 100, x: 390, y: 120, label: "Helado", color: "#F36E53" },
  ];

  // Helper for responsive positioning
  const getPercent = (val: number, max: number) => `${(val / max) * 100}%`;

  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.4 }}
      className="flex flex-col p-5 pb-32"
    >
      <div className="flex justify-between items-center mb-6 mt-2">
        <motion.h1 
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2, type: "spring", stiffness: 100 }}
          className="text-white font-bold text-[28px] leading-tight tracking-tight drop-shadow-md"
        >
          ¡Qué más, Pana,<br/><span className="text-[#D8A93F]">[User Name]!</span>
        </motion.h1>

        {/* User Profile */}
        <motion.div 
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.3, type: "spring" }}
          className="flex flex-col items-center ml-4"
        >
          <div className="w-12 h-12 rounded-full border-2 border-[#D8A93F] shadow-[0_0_15px_rgba(216,169,63,0.4)] overflow-hidden bg-[#111827] flex items-center justify-center">
            <svg className="w-6 h-6 text-[#D8A93F]" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
            </svg>
          </div>
          <span className="text-[10px] text-white/50 mt-1 font-medium tracking-wide">[User Name]</span>
        </motion.div>
      </div>

      {/* Racha Badge */}
      <motion.div 
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.4 }}
        className="w-full bg-gradient-to-r from-[#D8A93F]/20 to-transparent border-l-4 border-[#D8A93F] p-4 rounded-r-2xl mb-6 flex items-center gap-3 backdrop-blur-md"
      >
        <div className="text-2xl drop-shadow-md">🔥</div>
        <div>
          <div className="text-[#D8A93F] font-bold text-sm tracking-wide">Racha de Ahorro: 14 Días</div>
          <div className="text-white/70 text-xs">Mantén el ritmo para ganar el badge de Oro.</div>
        </div>
      </motion.div>

      {/* FinScore SVG Gauge Component */}
      <motion.div 
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.1, duration: 0.5 }}
        className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-6 flex flex-col items-center justify-center relative shadow-lg shadow-black/20 w-full mb-6 mt-6"
      >
        <div className="relative w-[280px] h-[140px] mb-4 overflow-hidden flex justify-center">
          <svg viewBox="0 0 200 100" className="w-[240px] h-[120px] drop-shadow-[0_0_15px_rgba(216,169,63,0.6)] overflow-visible">
            <defs>
              <linearGradient id="gold-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#8A6B29" />
                <stop offset="50%" stopColor="#D8A93F" />
                <stop offset="100%" stopColor="#F9D472" />
              </linearGradient>
              <filter id="glow-gold" x="-50%" y="-50%" width="200%" height="200%">
                <feGaussianBlur stdDeviation="4" result="blur" />
                <feComposite in="SourceGraphic" in2="blur" operator="over" />
              </filter>
            </defs>
            
            <path
              d="M 10 90 A 80 80 0 0 1 190 90"
              fill="none"
              stroke="#1a2a5e"
              strokeWidth="12"
              strokeLinecap="round"
            />
            <motion.path
              d="M 10 90 A 80 80 0 0 1 190 90"
              fill="none"
              stroke="url(#gold-gradient)"
              strokeWidth="12"
              strokeLinecap="round"
              filter="url(#glow-gold)"
              strokeDasharray="251.2"
              initial={{ strokeDashoffset: 251.2 }}
              animate={{ strokeDashoffset: 30 }}
              transition={{ duration: 2, ease: "easeOut", delay: 0.3 }}
            />
            <motion.path 
              d="M 168 34 L 180 18 L 192 34 Z" 
              fill="#D8A93F" 
              filter="url(#glow-gold)" 
              style={{ transformOrigin: "100px 90px" }}
              initial={{ rotate: -90 }}
              animate={{ rotate: 15 }}
              transition={{ duration: 2, ease: "easeOut", delay: 0.3 }}
            />
          </svg>

          <div className="absolute inset-x-0 bottom-2 flex flex-col items-center">
            <span className="text-white/60 text-sm font-medium mb-1 uppercase tracking-widest">FinScore</span>
            <span className="text-[#D8A93F] text-[52px] font-black tracking-tighter drop-shadow-[0_0_15px_rgba(216,169,63,0.8)] leading-none">
              <AnimatedNumber value={8850} />
            </span>
          </div>
        </div>
        <motion.p 
          initial={{ opacity: 0, y: 5 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2.2 }}
          className="text-white/80 text-sm font-medium mt-3 bg-[#D8A93F]/10 px-4 py-1.5 rounded-full border border-[#D8A93F]/30 text-[#D8A93F] shadow-[0_0_10px_rgba(216,169,63,0.2)] text-center"
        >
          ¡Tu salud financiera está excelente!
        </motion.p>
      </motion.div>

      {/* 2-Column Widgets */}
      <div className="grid grid-cols-2 gap-4 mb-6 mt-6">
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4 }}
          whileHover={{ scale: 1.02, y: -2 }}
          className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-4 flex flex-col shadow-lg"
        >
          <div className="text-[13px] font-bold text-white mb-3">Presupuesto: Mecato</div>
          <div className="h-1.5 w-full bg-[#111827] rounded-full overflow-hidden mb-2">
            <motion.div 
              initial={{ width: 0 }}
              animate={{ width: "80%" }}
              transition={{ duration: 1.5, delay: 0.8, ease: "easeOut" }}
              className="h-full bg-gradient-to-r from-[#D8A93F] to-[#F36E53]" 
            />
          </div>
          <div className="text-[10px] text-[#A898C9] font-medium self-end">$80k / $100k</div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.5 }}
          whileHover={{ scale: 1.02, y: -2 }}
          className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-4 shadow-lg flex flex-col"
        >
          <div className="text-[13px] font-bold text-white mb-3">Hoy</div>
          <ul className="flex flex-col gap-2 mt-auto">
            <li className="flex justify-between items-center text-xs text-[#A898C9]">
              <span>☕ Tinto</span>
              <span className="font-semibold text-white/90">-$4k</span>
            </li>
            <li className="flex justify-between items-center text-xs text-[#A898C9]">
              <span>🍔 Corral</span>
              <span className="font-semibold text-white/90">-$35k</span>
            </li>
          </ul>
        </motion.div>
      </div>

      <h2 className="text-white/70 text-sm font-medium uppercase tracking-widest mb-4 px-2 mt-6">Lukas AI • Leak Buster</h2>

      {/* INTERACTIVE NODE GRAPH (Premium SVG) */}
      {/* Aspect-ratio box to keep layout consistent and avoid overflow */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="w-full relative bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-4 mb-6 mt-6 shadow-[0_4px_30px_rgba(0,0,0,0.3)] bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-[#21428D]/30 to-transparent flex items-center justify-center overflow-hidden"
      >
        <div className="w-full relative" style={{ paddingBottom: '87.5%' /* 350 / 400 */ }}>
          
          {/* Glow behind graph */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60%] h-[60%] bg-[#21428D]/50 rounded-full blur-[50px] pointer-events-none"></div>
          <div className="absolute top-[35%] left-[75%] -translate-x-1/2 -translate-y-1/2 w-[40%] h-[40%] bg-[#F36E53]/20 rounded-full blur-[50px] pointer-events-none animate-pulse"></div>

          <svg viewBox="0 0 400 350" className="absolute inset-0 w-full h-full overflow-visible">
            <defs>
              <filter id="glow-coral-2" x="-50%" y="-50%" width="200%" height="200%">
                <feGaussianBlur stdDeviation="6" result="blur" />
                <feComposite in="SourceGraphic" in2="blur" operator="over" />
              </filter>
            </defs>

            {/* Lines to Categories */}
            <g stroke="#397DC1" strokeWidth="2" opacity="0.4" strokeLinecap="round">
              {categories.map((cat, i) => (
                <line key={`line-cat-${i}`} x1={centerNode.x} y1={centerNode.y} x2={cat.x} y2={cat.y} />
              ))}
            </g>

            {/* Lines to SubNodes */}
            <g stroke="#397DC1" strokeWidth="1" opacity="0.25" strokeLinecap="round">
              {subNodes.map((sub, i) => (
                <line key={`line-sub-${i}`} x1={sub.cx} y1={sub.cy} x2={sub.x} y2={sub.y} />
              ))}
            </g>

            {/* Lines to Alert Nodes */}
            <g stroke="#F36E53" strokeWidth="2" opacity="0.6" strokeLinecap="round" className="animate-pulse">
              {alertNodes.map((an, i) => (
                <line key={`line-alert-${i}`} x1={an.cx} y1={an.cy} x2={an.x} y2={an.y} />
              ))}
            </g>
          </svg>

          {/* HTML Overlay with percentage positioning based on SVG viewBox (400x350) */}
          <div className="absolute inset-0 w-full h-full pointer-events-none">
            
            {/* Central Hub Node */}
            <motion.div 
              whileHover={{ scale: 1.1 }}
              className="absolute -translate-x-1/2 -translate-y-1/2 pointer-events-auto flex flex-col items-center"
              style={{ top: getPercent(centerNode.y, 350), left: getPercent(centerNode.x, 400) }}
            >
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-[#111827] border-[3px] border-[#D8A93F] rounded-full shadow-[0_0_20px_rgba(216,169,63,0.8)] z-10 flex items-center justify-center">
                <div className="w-4 h-4 sm:w-5 sm:h-5 bg-[#D8A93F] rounded-full shadow-[0_0_10px_rgba(216,169,63,1)]"></div>
              </div>
              <span className="mt-1 text-[10px] sm:text-[12px] text-white/90 font-bold tracking-wide whitespace-nowrap bg-[#111827]/90 px-2 py-0.5 rounded-md backdrop-blur-sm border border-white/10 z-20">
                {centerNode.label}
              </span>
            </motion.div>

            {/* Category Nodes */}
            {categories.map((node, i) => (
              <motion.div 
                key={`cat-${i}`} 
                whileHover={{ scale: 1.2 }}
                className="absolute -translate-x-1/2 -translate-y-1/2 pointer-events-auto flex flex-col items-center" 
                style={{ top: getPercent(node.y, 350), left: getPercent(node.x, 400) }}
              >
                <div className="w-5 h-5 sm:w-6 sm:h-6 bg-[#111827] rounded-full shadow-[0_0_15px_rgba(57,125,193,0.6)] border-2 border-[#397DC1] flex items-center justify-center z-10">
                  <div className="w-2 h-2 sm:w-2.5 sm:h-2.5 bg-[#397DC1] rounded-full"></div>
                </div>
                {/* Labels above/below depending on position to avoid overlap */}
                <span className={`absolute text-[9px] sm:text-[11px] text-white/80 font-semibold whitespace-nowrap bg-[#111827]/70 px-1 rounded-md z-20 ${node.y < 175 ? "-top-5" : "top-6"}`}>
                  {node.label}
                </span>
              </motion.div>
            ))}

            {/* Normal Sub Nodes */}
            {subNodes.map((node, i) => (
              <motion.div 
                key={`sub-${i}`} 
                whileHover={{ scale: 1.5 }}
                className="absolute -translate-x-1/2 -translate-y-1/2 pointer-events-auto flex flex-col items-center" 
                style={{ top: getPercent(node.y, 350), left: getPercent(node.x, 400) }}
              >
                <div className="w-2 h-2 sm:w-3 sm:h-3 bg-[#397DC1]/60 rounded-full border border-[#111827] shadow-[0_0_5px_rgba(57,125,193,0.4)]"></div>
                <span className="absolute top-3 text-[8px] sm:text-[9px] text-white/50 whitespace-nowrap">
                  {node.label}
                </span>
              </motion.div>
            ))}

            {/* Alert Nodos (Gastos Hormiga) + Pulse */}
            <div className="absolute pointer-events-none" style={{ top: '25%', left: '75%', transform: 'translate(-50%, -50%)' }}>
               <motion.div 
                animate={{ y: [0, -4, 0] }} 
                transition={{ repeat: Infinity, duration: 2 }}
                className="absolute -top-10 left-5 sm:left-10 w-[90px] sm:w-[110px] bg-[#F36E53]/10 border border-[#F36E53]/50 text-white p-1.5 sm:p-2 rounded-xl backdrop-blur-md shadow-[0_5px_15px_rgba(243,110,83,0.3)] pointer-events-auto cursor-pointer flex flex-col items-center justify-center z-30"
                onClick={() => setShowAlertModal(true)}
               >
                  <div className="text-[#F36E53] font-bold text-[8px] sm:text-[9px] uppercase tracking-widest mb-0.5">! Alerta !</div>
                  <div className="font-semibold text-[10px] sm:text-[11px] text-center leading-tight">Gastos Hormiga</div>
               </motion.div>
            </div>

            {alertNodes.map((node, i) => (
              <motion.div 
                key={`alert-${i}`} 
                whileHover={{ scale: 1.5 }}
                className="absolute -translate-x-1/2 -translate-y-1/2 pointer-events-auto cursor-pointer flex flex-col items-center" 
                style={{ top: getPercent(node.y, 350), left: getPercent(node.x, 400) }}
                onClick={() => setShowAlertModal(true)}
              >
                <div className="relative w-3 h-3 sm:w-4 sm:h-4 flex items-center justify-center">
                  <div className="absolute inset-0 bg-[#F36E53] rounded-full animate-ping opacity-60"></div>
                  <div className="w-2.5 h-2.5 sm:w-3.5 sm:h-3.5 bg-[#F36E53] rounded-full shadow-[0_0_15px_rgba(243,110,83,1)] border border-[#111827]"></div>
                </div>
                <span className="absolute top-4 text-[8px] sm:text-[9px] text-[#F36E53] font-bold whitespace-nowrap drop-shadow-md z-30">
                  {node.label}
                </span>
              </motion.div>
            ))}

          </div>
        </div>
      </motion.div>

      {/* Lukas Pana Tip */}
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.7 }}
        className="w-full bg-[#21428D]/30 border border-[#397DC1]/30 p-4 rounded-2xl mb-6 mt-6 flex gap-4 items-start shadow-md"
      >
        <div className="text-2xl pt-1">💡</div>
        <div>
          <h4 className="text-white font-bold text-sm tracking-wide mb-1">El Tip del Pana</h4>
          <p className="text-white/70 text-xs leading-relaxed">Pana, si reducimos los Ubers de esta semana, podemos inyectarle esos $40k a tu meta de <strong>Ahorro Viaje</strong>. ¿Aguanta?</p>
        </div>
      </motion.div>

      {/* Group Challenge */}
      <motion.div 
         initial={{ opacity: 0, scale: 0.95 }}
         animate={{ opacity: 1, scale: 1 }}
         transition={{ delay: 0.8 }}
         className="w-full bg-white/5 border border-white/10 p-4 rounded-2xl mb-10 flex items-center justify-between shadow-md"
      >
         <div className="flex flex-col">
            <h4 className="text-white font-bold text-sm">Reto: No Domicilios 🍔</h4>
            <p className="text-white/50 text-xs">Con Andrés y Sofía • Quedan 3 días</p>
         </div>
         <div className="flex -space-x-2">
            <div className="w-8 h-8 rounded-full border-2 border-[#111827] bg-[#F36E53] flex items-center justify-center font-bold text-xs text-white">A</div>
            <div className="w-8 h-8 rounded-full border-2 border-[#111827] bg-[#397DC1] flex items-center justify-center font-bold text-xs text-white">S</div>
            <div className="w-8 h-8 rounded-full border-2 border-[#111827] bg-[#D8A93F] flex items-center justify-center font-bold text-xs text-[#111827]">Tú</div>
         </div>
      </motion.div>

      <AnimatePresence>
        {showAlertModal && <AlertModal onClose={() => setShowAlertModal(false)} />}
      </AnimatePresence>
    </motion.div>
  );
}
