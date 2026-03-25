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
  const [showFinScoreModal, setShowFinScoreModal] = useState(false);
  const [showProfileModal, setShowProfileModal] = useState(false);
  const [tipIndex, setTipIndex] = useState(0);
  const [challengeIndex, setChallengeIndex] = useState(0);
  const [tipRevealed, setTipRevealed] = useState(false);
  const [challengeRevealed, setChallengeRevealed] = useState(false);

  const tipsData = [
    { title: "El Tip del Pana", text: "Pana, si reducimos los Ubers de esta semana, podemos inyectarle esos $40k a tu meta de Ahorro Viaje. ¿Aguanta?", icon: "💡" },
    { title: "Tip del Maestro", text: "Usa la regla 50/30/20: 50% necesidades, 30% gustos y 20% ahorro. ¡Tu FinScore subirá!", icon: "💸" },
    { title: "Hack de Ahorro", text: "Cancela esa suscripción que no usas hace 3 meses. Son $35k que vuelven a tu bolsillo.", icon: "🎯" }
  ];

  const challengesData = [
    { title: "Reto: No Domicilios 🍔", sub: "Con Andrés y Sofía • Quedan 3 días", avatars: ["A", "S", "Tú"] },
    { title: "Reto: Ahorro 10k 💰", sub: "Individual • Meta: 7 días", avatars: ["Tú"] },
    { title: "Reto: Cero Hormiga 🐜", sub: "Global • Queda 1 día", avatars: ["L", "M", "Tú"] }
  ];

  // Racha Logic
  const streakDays = 14; 
  const isMidStreak = streakDays >= 2;
  const isHighStreak = streakDays >= 7;

  const streakHistory = [
    { day: "Lun", score: 8420 },
    { day: "Mar", score: 8500 },
    { day: "Mié", score: 8350 },
    { day: "Jue", score: 8600 },
    { day: "Vie", score: 8750 },
    { day: "Sáb", score: 8810 },
    { day: "Dom", score: 8850 }
  ];

  // Nodes for dense graph (coordinates based on 400x350)
  const centerNode = { x: 200, y: 175, label: "Cuenta Principal" };
  const categories = [
    { x: 100, y: 100, label: "Fijos", color: "#397DC1" },
    { x: 300, y: 100, label: "Salidas", color: "#397DC1" },
    { x: 100, y: 250, label: "Ahorro", color: "#397DC1" },
    { x: 300, y: 250, label: "Susc.", color: "#397DC1" },
  ];

  const subNodes = [
    { cx: 100, cy: 100, x: 50, y: 50, label: "Arriendo" },
    { cx: 100, cy: 100, x: 140, y: 40, label: "Agua" },
    { cx: 100, cy: 100, x: 30, y: 130, label: "Luz" },
    { cx: 100, cy: 100, x: 80, y: 150, label: "Internet" },
    { cx: 100, cy: 100, x: 150, y: 140, label: "Gas" },
    { cx: 100, cy: 250, x: 50, y: 210, label: "Fondo EM" },
    { cx: 100, cy: 250, x: 140, y: 300, label: "Viaje" },
    { cx: 100, cy: 250, x: 50, y: 300, label: "Crypto" },
    { cx: 300, cy: 250, x: 260, y: 310, label: "Netflix" },
    { cx: 300, cy: 250, x: 350, y: 300, label: "Spotify" },
    { cx: 300, cy: 250, x: 360, y: 230, label: "Gym" },
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

  const getPercent = (val: number, max: number) => `${(val / max) * 100}%`;

  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, scale: 0.95 }} transition={{ duration: 0.4 }} className="flex flex-col p-5 pb-32">
      <div className="flex justify-between items-center mb-6 mt-2">
        <motion.h1 initial={{ y: -20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.2, type: "spring", stiffness: 100 }} className="text-white font-bold text-[28px] leading-tight tracking-tight drop-shadow-md">
          ¡Qué más, Pana,<br/><span className="text-[#D8A93F]">[User Name]!</span>
        </motion.h1>
        <motion.div 
          initial={{ scale: 0 }} 
          animate={{ scale: 1 }} 
          transition={{ delay: 0.3, type: "spring" }} 
          className="flex flex-col items-center ml-4 cursor-pointer active:scale-90 transition-transform"
          onClick={() => setShowProfileModal(true)}
        >
          <div className="w-12 h-12 rounded-full border-2 border-[#D8A93F] shadow-[0_0_15px_rgba(216,169,63,0.4)] overflow-hidden bg-[#111827] flex items-center justify-center">
            <svg className="w-6 h-6 text-[#D8A93F]" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" /></svg>
          </div>
          <span className="text-[10px] text-white/50 mt-1 font-medium tracking-wide">Perfil</span>
        </motion.div>
      </div>

      {/* Racha Badge - EVOLVING INTENSITY */}
      <motion.div 
        initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.4 }}
        onClick={() => setShowFinScoreModal(true)}
        className={`w-full border-l-4 p-4 rounded-r-2xl mb-6 flex items-center justify-between backdrop-blur-md cursor-pointer group shadow-xl transition-all ${
          isHighStreak ? "bg-gradient-to-r from-[#F36E53]/20 to-transparent border-[#F36E53] shadow-[#F36E53]/30" : "bg-[#D8A93F]/20 border-[#D8A93F]"
        }`}
      >
        <div className="flex items-center gap-3">
          <motion.div animate={isHighStreak ? { y: [0, -8, 0], scale: [1, 1.2, 1] } : {}} transition={isHighStreak ? { repeat: Infinity, duration: 1.5 } : {}} className={`text-2xl drop-shadow-md ${isHighStreak ? "drop-shadow-[0_0_10px_#F36E53]" : ""}`}>🔥</motion.div>
          <div>
            <div className={`font-black text-sm tracking-wide ${isHighStreak ? "text-[#F36E53]" : "text-[#D8A93F]"}`}>Racha de Ahorro: {streakDays} Días</div>
            <div className="text-white/40 text-[9px] font-bold uppercase tracking-widest mt-0.5 group-hover:text-white transition-colors">{isHighStreak ? "¡ESTÁS EN LLAMAS! 🔥" : "Toca para ver historial 📈"}</div>
          </div>
        </div>
        <span className="text-white/10 group-hover:text-white group-hover:translate-x-1 transition-all">→</span>
      </motion.div>

      {/* FinScore SVG Gauge */}
      <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ delay: 0.1, duration: 0.5 }} className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-6 flex flex-col items-center justify-center relative shadow-lg shadow-black/20 w-full mb-6 mt-6">
        <div className="relative w-[280px] h-[140px] mb-4 overflow-hidden flex justify-center">
          <svg viewBox="0 0 200 100" className="w-[240px] h-[120px] drop-shadow-[0_0_15px_rgba(216,169,63,0.6)] overflow-visible">
            <defs>
              <linearGradient id="gold-gradient" x1="0%" y1="0%" x2="100%" y2="0%"><stop offset="0%" stopColor="#8A6B29" /><stop offset="50%" stopColor="#D8A93F" /><stop offset="100%" stopColor="#F9D472" /></linearGradient>
              <filter id="glow-gold" x="-50%" y="-50%" width="200%" height="200%"><feGaussianBlur stdDeviation="4" result="blur" /><feComposite in="SourceGraphic" in2="blur" operator="over" /></filter>
            </defs>
            <path d="M 10 90 A 80 80 0 0 1 190 90" fill="none" stroke="#1a2a5e" strokeWidth="12" strokeLinecap="round" />
            <motion.path d="M 10 90 A 80 80 0 0 1 190 90" fill="none" stroke="url(#gold-gradient)" strokeWidth="12" strokeLinecap="round" filter="url(#glow-gold)" strokeDasharray="251.2" initial={{ strokeDashoffset: 251.2 }} animate={{ strokeDashoffset: 30 }} transition={{ duration: 2, ease: "easeOut", delay: 0.3 }} />
            <motion.path d="M 168 34 L 180 18 L 192 34 Z" fill="#D8A93F" filter="url(#glow-gold)" style={{ transformOrigin: "100px 90px" }} initial={{ rotate: -90 }} animate={{ rotate: 15 }} transition={{ duration: 2, ease: "easeOut", delay: 0.3 }} />
          </svg>
          <div className="absolute inset-x-0 bottom-2 flex flex-col items-center">
            <span className="text-white/60 text-sm font-medium mb-1 uppercase tracking-widest leading-none">FinScore</span>
            <span className="text-[#D8A93F] text-[52px] font-black tracking-tighter drop-shadow-[0_0_15px_rgba(216,169,63,0.8)] leading-none"><AnimatedNumber value={8850} /></span>
          </div>
        </div>
        <p className="text-white/80 text-sm font-medium mt-3 bg-[#D8A93F]/10 px-4 py-1.5 rounded-full border border-[#D8A93F]/30 text-[#D8A93F] text-center shadow-[0_0_10px_rgba(216,169,63,0.2)]">¡Tu salud financiera está excelente!</p>
      </motion.div>

      {/* 2-Column Widgets */}
      <div className="grid grid-cols-2 gap-4 mb-6 mt-6">
        <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-4 flex flex-col shadow-lg shadow-black/20">
          <div className="text-[13px] font-bold text-white mb-3">Presupuesto: Mecato</div>
          <div className="h-1.5 w-full bg-[#111827] rounded-full overflow-hidden mb-2"><div className="h-full bg-gradient-to-r from-[#D8A93F] to-[#F36E53]" style={{ width: '80%' }} /></div>
          <div className="text-[10px] text-white/40 font-medium self-end">$80k / $100k</div>
        </div>
        <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-4 shadow-lg flex flex-col shadow-black/20">
          <div className="text-[13px] font-bold text-white mb-3 tracking-tight">Hoy</div>
          <ul className="flex flex-col gap-2 mt-auto text-xs text-white/50">
            <li className="flex justify-between items-center"><span>☕ Tinto</span><span className="font-semibold text-white/90">-$4k</span></li>
            <li className="flex justify-between items-center"><span>🍔 Corral</span><span className="font-semibold text-white/90">-$35k</span></li>
          </ul>
        </div>
      </div>

      <h2 className="text-white/70 text-sm font-medium uppercase tracking-widest mb-4 px-2 mt-6">Lukas AI • Leak Buster</h2>

      {/* INTERACTIVE NODE GRAPH (Premium SVG) */}
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
              <div className="w-10 h-10 bg-[#111827] border-[3px] border-[#D8A93F] rounded-full shadow-[0_0_20px_rgba(216,169,63,0.8)] z-10 flex items-center justify-center">
                <div className="w-4 h-4 bg-[#D8A93F] rounded-full shadow-[0_0_10px_rgba(216,169,63,1)]"></div>
              </div>
              <span className="mt-1 text-[11px] text-white font-bold whitespace-nowrap bg-[#111827]/90 px-2 py-0.5 rounded-md backdrop-blur-sm border border-white/10 z-20">
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
                <div className="w-5 h-5 bg-[#111827] rounded-full shadow-[0_0_15px_rgba(57,125,193,0.6)] border-2 border-[#397DC1] flex items-center justify-center z-10">
                  <div className="w-2 h-2 bg-[#397DC1] rounded-full"></div>
                </div>
                {/* Labels above/below depending on position to avoid overlap */}
                <span className={`absolute text-[9px] text-white/80 font-semibold whitespace-nowrap bg-[#111827]/70 px-1 rounded-md z-20 ${node.y < 175 ? "-top-5" : "top-6"}`}>
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
                <div className="w-2 h-2 bg-[#397DC1]/60 rounded-full border border-[#111827] shadow-[0_0_5px_rgba(57,125,193,0.4)]"></div>
                <span className="absolute top-3 text-[8px] text-white/50 whitespace-nowrap">
                  {node.label}
                </span>
              </motion.div>
            ))}

            {/* Alert Nodos (Gastos Hormiga) + Pulse */}
            <div className="absolute pointer-events-none" style={{ top: '25%', left: '75%', transform: 'translate(-50%, -50%)' }}>
               <motion.div 
                animate={{ y: [0, -4, 0] }} 
                transition={{ repeat: Infinity, duration: 2 }}
                className="absolute -top-10 left-5 w-[100px] bg-[#F36E53]/10 border border-[#F36E53]/50 text-white p-2 rounded-xl backdrop-blur-md shadow-[0_5px_15px_rgba(243,110,83,0.3)] pointer-events-auto cursor-pointer flex flex-col items-center justify-center z-30"
                onClick={() => setShowAlertModal(true)}
               >
                  <div className="text-[#F36E53] font-bold text-[9px] uppercase tracking-widest mb-0.5">! Alerta !</div>
                  <div className="font-semibold text-[10px] text-center leading-tight">Gastos Hormiga</div>
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
                <div className="relative w-3 h-3 flex items-center justify-center">
                  <div className="absolute inset-0 bg-[#F36E53] rounded-full animate-ping opacity-60"></div>
                  <div className="w-2.5 h-2.5 bg-[#F36E53] rounded-full shadow-[0_0_15px_rgba(243,110,83,1)] border border-[#111827]"></div>
                </div>
                <span className="absolute top-4 text-[8px] text-[#F36E53] font-bold whitespace-nowrap drop-shadow-md z-30">
                  {node.label}
                </span>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Lukas Pana Tip - INTERACTIVE */}
      <motion.div 
        layout 
        initial={{ opacity: 0, scale: 0.95 }} 
        animate={{ opacity: 1, scale: 1 }} 
        transition={{ delay: 0.7 }} 
        className="w-full bg-[#21428D]/30 border border-[#397DC1]/30 p-5 rounded-[32px] mb-6 mt-6 flex flex-col gap-4 shadow-xl relative overflow-hidden group cursor-pointer transition-all active:scale-95"
        onClick={() => setTipRevealed(!tipRevealed)}
      >
        <button 
          onClick={(e) => { e.stopPropagation(); setTipIndex((tipIndex + 1) % tipsData.length); }} 
          className="absolute top-4 right-4 text-white/40 hover:text-white transition-colors p-2 hover:bg-white/5 rounded-full z-10"
        >
          🔄
        </button>
        <div className="flex gap-4 items-start pointer-events-none">
          <div className="text-3xl pt-1 bg-[#397DC1]/20 w-12 h-12 rounded-2xl flex items-center justify-center">{tipsData[tipIndex].icon}</div>
          <div className="flex-1">
            <h4 className="text-white font-bold text-sm tracking-wide mb-1">{tipsData[tipIndex].title}</h4>
            <AnimatePresence mode="wait">
              {!tipRevealed ? (
                <motion.div key="hidden" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                  <span className="text-white/30 text-[10px] italic font-medium tracking-tight whitespace-nowrap">Oprimir para mostrar...</span>
                </motion.div>
              ) : (
                <motion.p key="visible" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="text-white/70 text-xs leading-relaxed">
                  {tipsData[tipIndex].text}
                </motion.p>
              )}
            </AnimatePresence>
          </div>
        </div>
      </motion.div>

      {/* Group Challenge - INTERACTIVE */}
      <motion.div 
         layout 
         initial={{ opacity: 0, scale: 0.95 }} 
         animate={{ opacity: 1, scale: 1 }} 
         transition={{ delay: 0.8 }} 
         className="w-full bg-white/5 border border-white/10 p-5 rounded-[32px] mb-10 flex flex-col gap-4 shadow-xl relative overflow-hidden group cursor-pointer transition-all active:scale-95"
         onClick={() => setChallengeRevealed(!challengeRevealed)}
      >
         <button 
           onClick={(e) => { e.stopPropagation(); setChallengeIndex((challengeIndex + 1) % challengesData.length); }} 
           className="absolute top-4 right-4 text-white/40 hover:text-white transition-colors p-2 hover:bg-white/5 rounded-full z-10"
         >
           🔄
         </button>
         <div className="flex items-center justify-between pointer-events-none">
            <div className="flex flex-col flex-1">
               <h4 className="text-white font-bold text-sm mb-1">{challengesData[challengeIndex].title}</h4>
               <AnimatePresence mode="wait">
                  {!challengeRevealed ? (
                    <motion.div key="c-hidden" className="text-white/30 text-[10px] italic font-medium tracking-tight">
                       Oprimir para mostrar...
                    </motion.div>
                  ) : (
                    <motion.p key="c-visible" initial={{ opacity: 0, y: 5 }} animate={{ opacity: 1, y: 0 }} className="text-white/50 text-xs">
                       {challengesData[challengeIndex].sub}
                    </motion.p>
                  )}
               </AnimatePresence>
            </div>
            <div className="flex -space-x-2">
               {challengesData[challengeIndex].avatars.map((av, idx) => (
                 <div key={idx} className={`w-9 h-9 rounded-full border-2 border-[#111827] flex items-center justify-center font-black text-xs text-white shadow-lg ${idx === 0 ? "bg-[#F36E53]" : idx === 1 ? "bg-[#397DC1]" : "bg-[#D8A93F] !text-[#111827]"}`}>{av}</div>
               ))}
            </div>
         </div>
      </motion.div>

      <AnimatePresence>
        {showAlertModal && <AlertModal onClose={() => setShowAlertModal(false)} />}
        {showFinScoreModal && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[200] flex items-center justify-center p-6 backdrop-blur-xl bg-black/60" onClick={() => setShowFinScoreModal(false)}>
            <motion.div initial={{ scale: 0.9, y: 30 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.9, y: 30 }} className="bg-[#111827] border border-white/10 rounded-[45px] p-10 w-full max-w-md shadow-2xl relative overflow-hidden" onClick={(e) => e.stopPropagation()}>
              <button onClick={() => setShowFinScoreModal(false)} className="absolute top-8 right-8 text-white/30 text-xl font-black transition-colors hover:text-white">✕</button>
              <div className="flex flex-col items-center mb-10 text-center">
                 <div className="w-16 h-16 bg-[#D8A93F]/10 rounded-3xl flex items-center justify-center text-3xl mb-4 border border-[#D8A93F]/20 shadow-lg">📈</div>
                 <h2 className="text-white font-black text-2xl tracking-tight italic uppercase">Historial de Racha</h2>
                 <p className="text-white/30 text-[10px] font-black uppercase tracking-[0.2em] mt-2 italic">Día {streakDays} • Tu FinScore Actual</p>
              </div>
              <div className="flex flex-col gap-3 mb-10 overflow-y-auto max-h-[40vh] pr-2">
                 {[...streakHistory].reverse().map((h, i) => (
                   <motion.div key={i} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.05 }} className={`flex items-center justify-between p-4 rounded-3xl border ${i === 0 ? "bg-[#D8A93F]/10 border-[#D8A93F]/30" : "bg-white/5 border-white/5"}`}>
                      <div className="flex items-center gap-4">
                         <div className={`w-10 h-10 rounded-2xl flex items-center justify-center font-black text-xs ${i === 0 ? "bg-[#D8A93F] text-[#111827]" : "bg-white/5 text-white/30"}`}>{h.day.substring(0, 1)}</div>
                         <div className="flex flex-col"><span className={`text-[10px] font-black uppercase tracking-widest ${i === 0 ? "text-[#D8A93F]" : "text-white/20"}`}>{h.day}</span><span className="text-white/40 text-[9px] font-medium leading-none mt-0.5">FinScore del día</span></div>
                      </div>
                      <div className={`text-xl font-black italic tracking-tighter ${i === 0 ? "text-white drop-shadow-[0_0_10px_#D8A93F]" : "text-white/40"}`}>{h.score.toLocaleString()}</div>
                   </motion.div>
                 ))}
              </div>
              <div className="p-6 rounded-[35px] bg-white/5 border border-white/10 text-center relative overflow-hidden"><p className="text-[#D8A93F] text-xs font-black italic">"¡Pana, tu disciplina está pagando! Cada día de racha sube tu salud financiera."</p></div>
            </motion.div>
          </motion.div>
        )}

        {showProfileModal && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[200] flex items-center justify-center p-6 backdrop-blur-xl bg-black/60" onClick={() => setShowProfileModal(false)}>
            <motion.div initial={{ scale: 0.9, y: 30 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.9, y: 30 }} className="bg-[#111827] border border-white/10 rounded-[45px] p-8 w-full max-w-sm shadow-2xl relative overflow-hidden" onClick={(e) => e.stopPropagation()}>
              <button onClick={() => setShowProfileModal(false)} className="absolute top-6 right-6 text-white/30 text-xl font-black transition-colors hover:text-white">✕</button>
              
              <div className="flex flex-col items-center mb-8 border-b border-white/5 pb-8">
                <div className="w-20 h-20 rounded-full border-2 border-[#D8A93F] p-1 shadow-[0_0_20px_rgba(216,169,63,0.3)] mb-4">
                  <div className="w-full h-full rounded-full bg-[#111827] flex items-center justify-center">
                    <svg className="w-10 h-10 text-[#D8A93F]" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" /></svg>
                  </div>
                </div>
                <h3 className="text-white font-black text-xl italic uppercase tracking-tight">[User Name]</h3>
                <p className="text-white/40 text-[10px] font-black uppercase tracking-[0.2em] mt-1">Suscripción Premium 🚀</p>
              </div>

              <div className="flex flex-col gap-2 mb-8 text-white/70 text-xs font-bold italic">
                <div className="p-4 rounded-2xl bg-white/5 hover:bg-white/10 transition-colors cursor-pointer flex items-center justify-between">
                  <div className="flex items-center gap-3"><span>👤</span> Mi Perfil</div>
                  <span className="text-white/20">→</span>
                </div>
                <div className="p-4 rounded-2xl bg-white/5 hover:bg-white/10 transition-colors cursor-pointer flex items-center justify-between">
                  <div className="flex items-center gap-3"><span>🛡️</span> Seguridad</div>
                  <span className="text-white/20">→</span>
                </div>
                <div className="p-4 rounded-2xl bg-white/5 hover:bg-white/10 transition-colors cursor-pointer flex items-center justify-between">
                  <div className="flex items-center gap-3"><span>🔔</span> Notificaciones</div>
                  <span className="text-white/20">→</span>
                </div>
              </div>

              <button 
                onClick={() => { alert("Sesión cerrada, Pana. ¡Vuelve pronto!"); setShowProfileModal(false); }}
                className="w-full p-4 rounded-2xl bg-[#F36E53]/10 border border-[#F36E53]/30 text-[#F36E53] font-black uppercase italic tracking-widest text-xs hover:bg-[#F36E53]/20 transition-all shadow-[0_0_15px_rgba(243,110,83,0.2)]"
              >
                Cerrar Sesión 🚪
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
