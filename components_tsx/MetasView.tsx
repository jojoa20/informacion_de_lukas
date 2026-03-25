import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function MetasView() {
  const [sortByPriority, setSortByPriority] = useState(false);
  const [goals, setGoals] = useState([
    {
      id: 1,
      title: "MacBook Pro",
      icon: "💻",
      current: 3500000,
      total: 6000000,
      color: "#D8A93F",
      priority: 1, // 1: Alta, 2: Media, 3: Baja
      tip: "Si ahorras $300.000 al mes, podrías comprar tu MacBook Pro en 8 meses de forma realista. ¡De una, Pana!",
      quote: "Persevera y alcanzarás el resultado"
    },
    {
      id: 2,
      title: "Viaje a Estados Unidos",
      icon: "✈️",
      current: 500000,
      total: 8000000,
      color: "#397DC1",
      priority: 2,
      tip: "Lukas ya está calculando las mejores fechas para tu vuelo. ¡Pana, no desfallezcas!",
      quote: "El éxito es la suma de pequeños esfuerzos diarios"
    }
  ]);

  const addGoal = () => {
    const priorities = [1, 2, 3];
    const newGoal = {
      id: Date.now(),
      title: "Nueva Meta, Pana",
      icon: "🎯",
      current: 0,
      total: 1000000,
      color: goals.length % 2 === 0 ? "#D8A93F" : "#397DC1",
      priority: priorities[Math.floor(Math.random() * priorities.length)],
      tip: "Lukas está analizando tu capacidad de ahorro para esta nueva meta...",
      quote: "Cada peso cuenta para tus sueños"
    };
    setGoals([newGoal, ...goals]);
  };

  const removeGoal = (id: number) => {
    setGoals(goals.filter(g => g.id !== id));
  };

  const changePriority = (id: number) => {
    setGoals(goals.map(g => {
      if (g.id === id) {
        // Ciclo: 1 (Alta) -> 2 (Media) -> 3 (Baja) -> 1 ...
        const nextPriority = g.priority === 3 ? 1 : g.priority + 1;
        return { ...g, priority: nextPriority };
      }
      return g;
    }));
  };

  const sortedGoals = sortByPriority 
    ? [...goals].sort((a, b) => a.priority - b.priority)
    : goals;

  const getPriorityLabel = (p: number) => {
    switch(p) {
      case 1: return { label: "Prioridad Alta", color: "#F36E53", icon: "🔥" };
      case 2: return { label: "Prioridad Media", color: "#D8A93F", icon: "⚡" };
      case 3: return { label: "Prioridad Baja", color: "#397DC1", icon: "🧊" };
      default: return { label: "Prioridad", color: "#fff", icon: "🎯" };
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.4 }}
      className="flex flex-col h-full pt-5 pb-32 px-4 relative"
    >
      <div className="flex justify-between items-end mb-4">
        <div>
          <motion.h1 
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.1, type: "spring", stiffness: 100 }}
            className="text-white font-bold text-[28px] tracking-tight drop-shadow-md leading-none mb-1"
          >
            Tus metas, Pana
          </motion.h1>
          <span className="text-white/40 text-[10px] font-bold uppercase tracking-widest pl-0.5">
            {sortByPriority ? "Ordenado por: Importancia" : "Ordenado por: Creación"}
          </span>
        </div>

        <div className="flex flex-col gap-2">
           <motion.button 
             initial={{ scale: 0 }}
             animate={{ scale: 1 }}
             onClick={() => setSortByPriority(!sortByPriority)}
             className={`text-[9px] font-black uppercase tracking-widest border-2 py-1.5 px-3 rounded-xl transition-all shadow-md ${sortByPriority ? "bg-[#D8A93F] border-[#111827] text-[#111827] shadow-[0_0_15px_rgba(216,169,63,0.3)]" : "bg-white/5 border-white/20 text-white/50"}`}
           >
             {sortByPriority ? "Prioridad Activa ✅" : "Ordenar por Prioridad"}
           </motion.button>
           <motion.button 
             initial={{ scale: 0 }}
             animate={{ scale: 1 }}
             transition={{ delay: 0.2, type: "spring" }}
             onClick={addGoal}
             className="bg-gradient-to-r from-[#D8A93F] to-[#F36E53] text-[#111827] font-black text-[10px] uppercase tracking-tighter px-4 py-2 rounded-full shadow-lg border-2 border-[#111827] active:scale-95 transition-transform"
           >
             + Crear nueva meta
           </motion.button>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto no-scrollbar flex flex-col gap-4 mt-2">
        <AnimatePresence mode="popLayout">
          {sortedGoals.map((goal, index) => {
            const priority = getPriorityLabel(goal.priority);
            return (
              <motion.div 
                key={goal.id}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, x: 50 }}
                transition={{ 
                   layout: { type: "spring", stiffness: 300, damping: 30 },
                   opacity: { duration: 0.4 },
                   y: { duration: 0.4 }
                }}
                className="bg-white/5 backdrop-blur-md border border-white/10 rounded-3xl pt-5 px-5 pb-12 relative shadow-lg shadow-black/20 group hover:bg-white/10 transition-colors overflow-hidden"
              >
                {/* Interactive Priority Badge */}
                <motion.button 
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => changePriority(goal.id)}
                  className="absolute top-0 left-0 bg-[#111827] border-b border-r border-white/10 px-4 py-1.5 rounded-br-2xl flex items-center gap-1.5 z-20 shadow-sm hover:bg-white/5 transition-colors group/badge"
                >
                   <span className="text-[12px] group-hover/badge:scale-125 transition-transform">{priority.icon}</span>
                   <span className="text-[9px] font-black uppercase tracking-widest" style={{ color: priority.color }}>{priority.label}</span>
                   <span className="text-white/20 text-[8px] ml-1 opacity-0 group-hover/badge:opacity-100 transition-opacity">🔄</span>
                </motion.button>

                {/* Delete Button */}
                <button 
                  onClick={() => removeGoal(goal.id)}
                  className="absolute top-3 right-3 w-6 h-6 rounded-full bg-red-500/10 text-red-500/40 hover:bg-red-500/20 hover:text-red-500 flex items-center justify-center text-xs font-black border border-red-500/20 transition-all z-20"
                >
                  ✕
                </button>

                <div className="flex justify-between items-center mb-4 mt-4">
                  <div className="flex items-center gap-3">
                    <div 
                      className="w-10 h-10 rounded-xl bg-gradient-to-tr from-[#111827] to-white/10 border flex items-center justify-center text-xl shadow-inner"
                      style={{ borderColor: `${goal.color}4D` }}
                    >
                      {goal.icon}
                    </div>
                    <h3 className="text-white font-bold text-lg">{goal.title}</h3>
                  </div>
                  <div className="text-right pr-6">
                    <span className="text-xs text-white/50 block uppercase tracking-widest font-bold">Progreso</span>
                    <span className="font-black text-sm" style={{ color: goal.color }}>
                      ${(goal.current / 1000000).toFixed(1)}M / <span className="text-white/40 text-xs">${(goal.total / 1000000).toFixed(1)}M</span>
                    </span>
                  </div>
                </div>
                
                <div className="h-2 w-full bg-[#111827] rounded-full overflow-hidden border border-white/5 relative mb-4">
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: `${(goal.current / goal.total) * 100}%` }}
                    transition={{ duration: 1.5, delay: 0.5, ease: "easeOut" }}
                    className="absolute top-0 left-0 h-full rounded-full"
                    style={{ backgroundColor: goal.color, boxShadow: `0 0 10px ${goal.color}CC` }}
                  />
                </div>
                
                <div className="bg-white/5 border border-white/10 rounded-xl p-3 mb-3" style={{ borderColor: `${goal.color}1A` }}>
                   <p className="text-[10px] font-medium leading-relaxed" style={{ color: goal.color }}>
                     💡 <span className="font-bold uppercase tracking-tighter">Tip de meta:</span> {goal.tip}
                   </p>
                </div>

                {/* New Motivational Advice Box */}
                <div className="bg-white/10 border border-white/20 rounded-2xl p-4 mb-4 backdrop-blur-sm shadow-md">
                   <p className="text-white font-bold text-[11px] leading-relaxed italic text-center drop-shadow-sm">
                     "{goal.quote}"
                   </p>
                </div>

                <div className="flex flex-col items-center opacity-60">
                   <p className="text-[9px] font-black uppercase tracking-[0.3em] leading-none" style={{ color: goal.color }}>Recuerda por qué empezaste</p>
                </div>
              </motion.div>
            );
          })}
        </AnimatePresence>
        {/* Spacer for bottom nav visibility */}
        <div className="h-20" />
      </div>
    </motion.div>
  );
}
