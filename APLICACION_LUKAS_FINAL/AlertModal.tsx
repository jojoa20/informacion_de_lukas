"use client";
import React from "react";

interface AlertModalProps {
  onClose: () => void;
}

export default function AlertModal({ onClose }: AlertModalProps) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center px-4 bg-[#111827]/80 backdrop-blur-md animate-in fade-in duration-300">
      
      <div className="bg-[#1a2a5e] border-2 border-[#F36E53]/40 w-full max-w-sm rounded-[32px] p-6 shadow-[0_20px_60px_rgba(243,110,83,0.25)] relative overflow-hidden animate-in slide-in-from-bottom-10 zoom-in-95 duration-400">
        
        {/* Glow effect inside modal */}
        <div className="absolute -top-20 -right-20 w-[150px] h-[150px] bg-[#F36E53] rounded-full blur-[80px] opacity-40"></div>

        <div className="flex justify-between items-start mb-6 relative z-10">
          <div className="flex items-center gap-3">
             <div className="w-10 h-10 rounded-full bg-[#F36E53]/10 border border-[#F36E53]/30 flex items-center justify-center text-[#F36E53] shadow-[0_0_15px_rgba(243,110,83,0.5)]">
               <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>
             </div>
             <div>
               <h3 className="text-white font-bold text-lg leading-tight">Gasto Hormiga</h3>
               <p className="text-[#F36E53] font-medium text-sm">Cluster Detectado</p>
             </div>
          </div>
          <button onClick={onClose} className="p-2 text-white/50 hover:text-white transition-colors bg-white/5 rounded-full">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M6 18L18 6M6 6l12 12" /></svg>
          </button>
        </div>

        <div className="mb-6 relative z-10">
           <div className="text-[42px] font-black text-white tracking-tighter drop-shadow-md">
             $150.000 <span className="text-xl text-white/50 font-medium">COP</span>
           </div>
           <p className="text-white/70 text-sm mt-1">Acumulado en los últimos 7 días</p>
        </div>

        {/* Desglose */}
        <div className="bg-[#111827]/50 rounded-2xl p-4 mb-6 border border-white/5 relative z-10">
          <h4 className="text-white/60 uppercase tracking-wider text-[11px] font-bold mb-3">Desglose de fugas</h4>
          <ul className="space-y-3">
             {[
               { icon: "☕️", name: "Tinto diario (x7)", amount: "$21.000" },
               { icon: "🥟", name: "Empanadas y Pan", amount: "$35.000" },
               { icon: "🚕", name: "Uber cortos (x3)", amount: "$45.000" },
               { icon: "🍫", name: "Máquina Snacks", amount: "$49.000" },
             ].map((item, i) => (
                <li key={i} className="flex justify-between items-center text-sm">
                  <div className="flex items-center gap-2">
                     <span className="bg-white/10 w-8 h-8 rounded-full flex items-center justify-center text-base">{item.icon}</span>
                     <span className="text-white font-medium">{item.name}</span>
                  </div>
                  <span className="text-white/80 font-bold">{item.amount}</span>
                </li>
             ))}
          </ul>
        </div>

        {/* Botones de acción grandes */}
        <div className="space-y-3 relative z-10">
          <button 
            className="w-full bg-gradient-to-r from-[#D8A93F] to-[#E5B951] text-[#111827] font-bold text-base py-4 rounded-full shadow-[0_0_20px_rgba(216,169,63,0.5)] active:scale-95 transition-transform"
            onClick={onClose}
          >
            Crear Alerta Estricta
          </button>
          
          <button 
            className="w-full bg-transparent border-2 border-white/20 text-white hover:bg-white/5 font-bold text-base py-3.5 rounded-full active:scale-95 transition-all"
            onClick={onClose}
          >
            Ignorar por ahora
          </button>
        </div>

      </div>
    </div>
  );
}
