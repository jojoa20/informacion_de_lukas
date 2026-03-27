import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function AnalyticsView() {
  const [viewMode, setViewMode] = useState<"groups" | "compare">("groups");
  const [selectedMonth, setSelectedMonth] = useState("Febrero");

  const [members, setMembers] = useState([
    { id: 1, name: "Tú", val: 400000, color: "#D8A93F", hidden: false },
    { id: 2, name: "Sofía", val: 500000, color: "#397DC1", hidden: false },
    { id: 3, name: "Andrés", val: 650000, color: "#F36E53", hidden: false }
  ]);

  const months = ["Marzo", "Febrero", "Enero", "Diciembre", "Noviembre"];

  const comparisonData = {
    Febrero: {
      score: 8100,
      spent: 1540000,
      categories: [
        { name: "Comida", current: 420000, prev: 580000 },
        { name: "Suscrip.", current: 150000, prev: 140000 },
        { name: "Transp.", current: 280000, prev: 350000 },
        { name: "Rumba", current: 350000, prev: 500000 }
      ]
    },
    Enero: {
      score: 7800,
      spent: 1900000,
      categories: [
        { name: "Comida", current: 420000, prev: 700000 },
        { name: "Suscrip.", current: 150000, prev: 200000 },
        { name: "Transp.", current: 280000, prev: 400000 },
        { name: "Rumba", current: 350000, prev: 600000 }
      ]
    }
  };

  const getComparison = () => (comparisonData as any)[selectedMonth] || (comparisonData as any)["Febrero"];

  const toggleHide = (id: number) => {
    setMembers(members.map(m => m.id === id ? { ...m, hidden: !m.hidden } : m));
  };

  const addMember = () => {
    const names = ["Cami", "Juan", "Mafe", "Mateo", "Vale"];
    const colors = ["#10B981", "#8B5CF6", "#EC4899", "#F59E0B", "#3B82F6"];
    const randomName = names[Math.floor(Math.random() * names.length)];
    const randomColor = colors[Math.floor(Math.random() * colors.length)];
    
    const newMember = {
      id: Date.now(),
      name: `${randomName} 🆕`,
      val: Math.floor(Math.random() * 500000) + 100000,
      color: randomColor,
      hidden: false
    };
    setMembers([...members, newMember]);
  };

  const removeMember = (id: number) => {
    setMembers(members.filter(m => m.id !== id));
  };

  const visibleMembers = members.filter(m => !m.hidden);
  const totalVisibleSpent = visibleMembers.length > 0 ? visibleMembers.reduce((acc, m) => acc + m.val, 0) : 1;

  const getMovements = () => {
    const moveTemplates = [
      { icon: "🛍️", title: "Zara Premium", val: "$120k", cat: "Ropa" },
      { icon: "🍔", title: "El Corral", val: "$35k", cat: "Comida" },
      { icon: "☕", title: "Starbucks", val: "$18k", cat: "Café" },
      { icon: "📺", title: "Netflix", val: "$45k", cat: "Suscrip." },
      { icon: "🚕", title: "Uber Cab", val: "$22k", cat: "Transp." }
    ];

    return members.slice(0, 5).map((m, i) => {
        const template = moveTemplates[i % moveTemplates.length];
        return {
            ...template,
            user: m.name,
            day: "Hoy",
            time: `${14 + i}:${10 + (i * 5)}`,
            color: m.color
        };
    });
  };

  const currentMovements = getMovements();

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="flex flex-col h-full pt-5 pb-32 px-4 overflow-y-auto no-scrollbar"
    >
      <div className="flex flex-col mb-6">
        <h1 className="text-white font-bold text-[28px] leading-tight mb-4 tracking-tighter shadow-sm">Análisis del Pana</h1>
        
        {/* TAB SELECTOR */}
        <div className="flex bg-white/5 p-1 rounded-2xl border border-white/10 mb-4 shadow-inner">
           <button 
             onClick={() => setViewMode("groups")}
             className={`flex-1 py-3 px-4 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${viewMode === "groups" ? "bg-[#D8A93F] text-[#111827] shadow-lg shadow-[#D8A93F]/20" : "text-white/40 hover:text-white"}`}
           >
             🤝 Grupos
           </button>
           <button 
             onClick={() => setViewMode("compare")}
             className={`flex-1 py-3 px-4 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${viewMode === "compare" ? "bg-[#D8A93F] text-[#111827] shadow-lg shadow-[#D8A93F]/20" : "text-white/40 hover:text-white"}`}
           >
             📊 Histórico
           </button>
        </div>
      </div>

      <AnimatePresence mode="wait">
        {viewMode === "groups" ? (
          <motion.div 
            key="groups"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="flex flex-col"
          >
            <div className="flex justify-between items-center mb-6 px-1">
              <h3 className="text-white text-xs font-bold uppercase tracking-widest opacity-60">Gestión de Grupos</h3>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={addMember}
                className="bg-white/5 border border-white/20 p-2 rounded-xl text-[#D8A93F] flex items-center gap-2 hover:bg-white/10 transition-colors shadow-sm"
              >
                <span className="text-lg font-black">+</span>
                <span className="text-[10px] uppercase font-black tracking-widest">Añadir Pana</span>
              </motion.button>
            </div>

            {/* Shared Budget Bar */}
            <div className="bg-white/5 border border-white/10 rounded-3xl p-6 mb-6 shadow-lg shadow-black/20">
                <h3 className="text-white/70 text-[10px] font-black uppercase tracking-[0.2em] mb-4">Presupuesto Grupal</h3>
                <div className="h-6 w-full bg-[#111827] rounded-full overflow-hidden flex shadow-inner border border-white/5">
                   {members.map((m) => (
                     <motion.div 
                       key={m.id}
                       initial={{ width: 0 }}
                       animate={{ 
                          width: m.hidden ? "0%" : `${(m.val / totalVisibleSpent) * 100}%` 
                       }}
                       className="h-full border-r border-black/10"
                       style={{ backgroundColor: m.color }}
                       transition={{ type: "spring", stiffness: 100, damping: 20 }}
                     />
                   ))}
                </div>
                <div className="flex justify-between mt-4 text-xs font-black">
                   <div className="flex flex-col">
                      <span className="text-white/30 text-[9px] uppercase tracking-widest">Invisible</span>
                      <span className="text-[#397DC1] italic">Pana Privado</span>
                   </div>
                   <div className="flex flex-col items-end">
                      <span className="text-white/30 text-[9px] uppercase tracking-widest">Total Gastado</span>
                      <span className="text-white text-lg font-black tracking-tighter">${(totalVisibleSpent/1000).toLocaleString()}k</span>
                   </div>
                </div>
            </div>

            {/* Members List */}
            <div className="bg-white/5 border border-white/10 rounded-[32px] p-6 mb-10 shadow-lg shadow-black/20 overflow-hidden relative">
               <div className="absolute top-0 right-0 w-24 h-24 bg-white/5 blur-3xl rounded-full" />
               <div className="flex flex-col gap-6 relative z-10">
                  {members.map((m) => (
                    <div key={m.id} className={`flex flex-col gap-2 transition-all ${m.hidden ? "opacity-30 scale-[0.98]" : "opacity-100 scale-100"}`}>
                      <div className="flex justify-between items-center">
                        <div className="flex items-center gap-2">
                           <div className={`w-2 h-2 rounded-full transition-colors ${m.hidden ? "bg-white/20" : ""}`} style={{ backgroundColor: m.hidden ? undefined : m.color }} />
                           <span className={`text-white font-black text-[13px] tracking-tight flex items-center gap-2 transition-all ${m.hidden ? "text-white/30 line-through" : ""}`}>
                             {m.name}
                           </span>
                        </div>
                        <div className="flex items-center gap-3">
                          <span className={`font-black text-sm tracking-tighter transition-colors ${m.hidden ? "text-white/20" : "text-white/80"}`}>
                            ${m.val/1000}k
                          </span>
                          <button 
                            onClick={() => toggleHide(m.id)}
                            className={`w-8 h-8 rounded-xl flex items-center justify-center text-xs transition-all border-2 ${
                              m.hidden 
                                ? "bg-[#F36E53] border-[#F36E53] text-white shadow-[0_0_10px_rgba(243,110,83,0.5)]" 
                                : "bg-white/5 border-white/10 text-white/30 hover:border-white/30"
                            }`}
                          >
                            {m.hidden ? "🔓" : "🔒"}
                          </button>
                          {m.name !== "Tú" && !m.hidden && (
                            <button 
                              onClick={() => removeMember(m.id)}
                              className="w-8 h-8 rounded-xl bg-white/5 text-white/20 flex items-center justify-center text-[10px] font-black border border-white/10 hover:bg-red-500/20 hover:text-red-500 hover:border-red-500/30 transition-all"
                            >
                              ✕
                            </button>
                          )}
                        </div>
                      </div>
                      <div className="h-2.5 w-full bg-black/40 rounded-full overflow-hidden border border-white/5">
                         <motion.div 
                           initial={{ width: 0 }}
                           animate={{ width: `${(m.val / 800000) * 100}%` }}
                           className="h-full rounded-full"
                           style={{ backgroundColor: m.color, boxShadow: `0 0 10px ${m.color}66` }}
                         />
                      </div>
                    </div>
                  ))}
               </div>
            </div>

            <div className="flex flex-col gap-3">
              <h3 className="text-white/40 text-[10px] uppercase font-black px-2 mb-1 tracking-[0.3em]">Movimientos del Grupo</h3>
              {currentMovements.map((move, i) => (
                <motion.div key={i} layout className="bg-white/5 border border-white/10 rounded-2xl p-4 flex items-center justify-between shadow-sm">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-xl bg-[#111827] flex items-center justify-center text-xl border-l-4" style={{ borderColor: move.color }}>{move.icon}</div>
                    <div className="flex flex-col text-left">
                      <h4 className="text-white font-bold text-sm tracking-tight">{move.title}</h4>
                      <div className="text-[9px] font-bold uppercase text-white/30 mt-0.5"><span style={{ color: move.color }}>{move.user}</span> • {move.day} • {move.time}</div>
                    </div>
                  </div>
                  <span className="font-black text-[#F36E53] text-[15px] tracking-tighter drop-shadow-[0_0_8px_rgba(243,110,83,0.2)]">-{move.val}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        ) : (
          <motion.div 
            key="compare"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            className="flex flex-col"
          >
             <p className="text-white/40 text-[10px] font-black uppercase tracking-[0.2em] mb-4 px-1">Elige Mes para comparar</p>
             {/* Month Selector Carrusel */}
             <div className="flex gap-3 overflow-x-auto no-scrollbar py-2 mb-8">
                {months.map((m) => (
                  <button 
                    key={m}
                    onClick={() => setSelectedMonth(m)}
                    className={`flex-shrink-0 px-6 py-2.5 rounded-2xl text-[11px] font-black uppercase tracking-widest transition-all border-2 ${selectedMonth === m ? "bg-[#D8A93F] border-[#111827] text-[#111827] shadow-lg shadow-[#D8A93F]/20 scale-105" : "bg-white/5 border-white/10 text-white/40"}`}
                  >
                    {m}
                  </button>
                ))}
             </div>

             <div className="grid grid-cols-2 gap-4 mb-4">
                <div className="bg-white/5 border border-white/10 rounded-[32px] p-5 relative overflow-hidden shadow-lg shadow-black/20">
                   <div className="absolute top-0 right-0 w-16 h-16 bg-green-500/10 blur-[25px] rounded-full" />
                   <h4 className="text-white/40 text-[9px] font-bold uppercase tracking-[0.2em] mb-3 leading-none">FinScore Change</h4>
                   <div className="flex flex-col">
                      <span className="text-white font-black text-3xl tracking-tighter">8850</span>
                      <span className="text-green-500 text-[10px] font-black mt-1 uppercase tracking-widest">+{((8850 - getComparison().score)/getComparison().score * 100).toFixed(1)}% ▲ vs {selectedMonth}</span>
                   </div>
                </div>
                <div className="bg-white/5 border border-white/10 rounded-[32px] p-5 relative overflow-hidden shadow-lg shadow-black/20">
                   <div className="absolute top-0 right-0 w-16 h-16 bg-[#F36E53]/10 blur-[25px] rounded-full" />
                   <h4 className="text-white/40 text-[9px] font-bold uppercase tracking-[0.2em] mb-3 leading-none">Gasto Total</h4>
                   <div className="flex flex-col">
                      <span className="text-white font-black text-3xl tracking-tighter">$1.2M</span>
                      <span className="text-green-500 text-[10px] font-black mt-1 uppercase tracking-widest">-{((getComparison().spent - 1200000)/getComparison().spent * 100).toFixed(0)}% ▼ vs {selectedMonth}</span>
                   </div>
                </div>
             </div>

             <div className="grid grid-cols-2 gap-4 mb-8">
                {/* Nueva tarjeta: Ahorro/Exceso Neto */}
                <div className="bg-white/5 border border-white/10 rounded-[32px] p-5 relative overflow-hidden shadow-lg shadow-black/20">
                   <div className={`absolute top-0 right-0 w-16 h-16 blur-[25px] rounded-full ${1200000 < getComparison().spent ? "bg-green-500/10" : "bg-red-500/10"}`} />
                   <h4 className="text-white/40 text-[9px] font-bold uppercase tracking-[0.2em] mb-3 leading-none">
                      {1200000 < getComparison().spent ? "Superavit Ahorro" : "Exceso de Gasto"}
                   </h4>
                   <div className="flex flex-col">
                      <span className="text-white font-black text-3xl tracking-tighter">
                         ${Math.abs((getComparison().spent - 1200000)/1000).toLocaleString()}k
                      </span>
                      <span className={`text-[9px] font-black mt-1 uppercase tracking-widest italic ${1200000 < getComparison().spent ? "text-green-500" : "text-red-500"}`}>
                         {1200000 < getComparison().spent ? "¡Ahorraste más! 🔥" : "Ojo con el exceso 🚨"}
                      </span>
                   </div>
                </div>

                {/* Nueva tarjeta: Puntos Score */}
                <div className="bg-white/5 border border-white/10 rounded-[32px] p-5 relative overflow-hidden shadow-lg shadow-black/20">
                   <div className={`absolute top-0 right-0 w-16 h-16 blur-[25px] rounded-full ${8850 > getComparison().score ? "bg-green-500/10" : "bg-red-500/10"}`} />
                   <h4 className="text-white/40 text-[9px] font-bold uppercase tracking-[0.2em] mb-3 leading-none">Cambios de Score</h4>
                   <div className="flex flex-col">
                      <span className="text-white font-black text-3xl tracking-tighter">
                         {8850 >= getComparison().score ? "+" : ""}{8850 - getComparison().score} pts
                      </span>
                      <span className={`text-[9px] font-black mt-1 uppercase tracking-widest italic tracking-tight ${8850 >= getComparison().score ? "text-green-500" : "text-red-500"}`}>
                         {8850 >= getComparison().score ? "Salud Subiendo 💎" : "Salud Bajando 📉"}
                      </span>
                   </div>
                </div>
             </div>

             {/* Comparison Chart */}
             <div className="bg-white/5 border border-white/10 rounded-[40px] p-8 mb-8 shadow-2xl relative overflow-hidden">
                <div className="absolute -top-10 -left-10 w-40 h-40 bg-[#D8A93F]/5 blur-3xl rounded-full" />
                
                <div className="flex justify-between items-center mb-6 border-b border-white/10 pb-4">
                   <h3 className="text-white font-black text-xs tracking-[0.2em] uppercase italic opacity-70">Categorías vs {selectedMonth}</h3>
                   {/* CHART LEGEND */}
                   <div className="flex gap-4">
                      <div className="flex items-center gap-1.5">
                         <div className="w-2.5 h-2.5 rounded-sm bg-[#D8A93F] shadow-[0_0_5px_rgba(216,169,63,0.5)]" />
                         <span className="text-[8px] font-black text-white/60 uppercase tracking-widest">Este Mes</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                         <div className="w-2.5 h-2.5 rounded-sm bg-white/10" />
                         <span className="text-[8px] font-black text-white/30 uppercase tracking-widest">{selectedMonth}</span>
                      </div>
                   </div>
                </div>

                <div className="flex flex-col gap-9 relative z-10">
                   {getComparison().categories.map((cat: any, i: number) => (
                     <div key={i} className="flex flex-col gap-3">
                        <div className="flex justify-between items-end">
                           <span className="text-white font-black text-[11px] uppercase tracking-widest">{cat.name}</span>
                           <div className="flex gap-4 text-[9px] font-bold uppercase tracking-tighter">
                              <span className="text-[#D8A93F]">Ahorro: +$120k</span>
                           </div>
                        </div>
                        <div className="relative h-6 flex flex-col gap-1.5 pt-1">
                           {/* Mes Actual */}
                           <div className="flex items-center gap-2">
                             <motion.div initial={{ width: 0 }} animate={{ width: `${(cat.current / 700000) * 100}%` }} className="h-2.5 bg-[#D8A93F] rounded-full shadow-[0_0_12px_rgba(216,169,63,0.3)] shadow-inner" />
                             <span className="text-[9px] font-black text-white/50">${cat.current/1000}k</span>
                           </div>
                           {/* Mes Comparado */}
                           <div className="flex items-center gap-2">
                              <motion.div initial={{ width: 0 }} animate={{ width: `${(cat.prev / 700000) * 100}%` }} className="h-1.5 bg-white/10 rounded-full" />
                              <span className="text-[8px] font-bold text-white/20 italic">${cat.prev/1000}k</span>
                           </div>
                        </div>
                     </div>
                   ))}
                </div>
                
                <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }} className="mt-12 p-5 rounded-3xl bg-[#D8A93F]/10 border border-[#D8A93F]/20 shadow-inner">
                   <div className="flex items-center gap-3 mb-2">
                      <span className="text-xl">💡</span>
                      <span className="text-[#D8A93F] font-black text-[10px] uppercase tracking-widest">Lukas AI Inside</span>
                   </div>
                   <p className="text-white/70 text-[11px] font-medium leading-[1.6] italic">
                     Pana, en <strong className="text-white">Comida</strong> te luciste vs {selectedMonth}. Nos sobran unos pesos que podríamos inyectar al viaje. ¿Qué dices?
                   </p>
                </motion.div>
             </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
