"use client";

import React from "react";

export default function MobileLeakBuster() {
  return (
    <div className="bg-white/5 border border-white/10 rounded-[20px] backdrop-blur-md flex-1 flex flex-col p-4 mb-4 relative z-10 w-full">
      <div className="text-center mb-4">
        <h3 className="text-lg font-bold">Lukas AI - Leak Buster</h3>
        <p className="text-xs text-white/60">
          Identificador de fugas &quot;Gastos Hormiga&quot;
        </p>
      </div>

      {/* Network Graph Simulation Wrapper */}
      <div className="relative h-[250px] w-full flex justify-center items-center bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.05)_0%,transparent_70%)] overflow-hidden">
        
        {/* CSS-based Graph Mock */}
        {/* Center Node */}
        <div className="absolute w-[80px] h-[80px] bg-[#2E2659] rounded-full flex justify-center items-center text-center text-[10px] leading-tight z-10 border-2 border-[#554499] shadow-[0_0_20px_rgba(85,68,153,0.5)]">
          Ingresos /<br />
          Quincena
        </div>

        {/* Edges */}
        <div className="absolute w-[100px] h-[2px] bg-gradient-to-r from-[#554499]/80 to-transparent left-1/2 top-1/2 origin-left rotate-[190deg] z-0" />
        <div className="absolute w-[80px] h-[2px] bg-gradient-to-r from-[#554499]/80 to-transparent left-1/2 top-1/2 origin-left rotate-[230deg] z-0" />
        <div className="absolute w-[90px] h-[2px] bg-gradient-to-r from-[#554499]/80 to-transparent left-1/2 top-1/2 origin-left rotate-[270deg] z-0" />
        <div className="absolute w-[110px] h-[2px] bg-gradient-to-r from-[#554499]/80 to-transparent left-1/2 top-1/2 origin-left rotate-[340deg] z-0" />
        <div className="absolute w-[100px] h-[2px] bg-gradient-to-r from-[#554499]/80 to-transparent left-1/2 top-1/2 origin-left rotate-[90deg] z-0" />
        <div className="absolute w-[120px] h-[2px] bg-gradient-to-r from-[#554499]/80 to-[#F15A42]/80 left-1/2 top-1/2 origin-left rotate-[45deg] z-0" />

        {/* Nodes */}
        {/* Yellow Nodes (Gastos normales) */}
        <div className="absolute rounded-full z-10 w-[30px] h-[30px] top-[40px] left-[30px] bg-[#EBB33E] shadow-[0_0_15px_rgba(235,179,62,0.3)]"></div>
        <div className="absolute text-[9px] text-white/70 whitespace-nowrap top-[75px] left-[15px]">Streaming</div>

        <div className="absolute rounded-full z-10 w-[25px] h-[25px] top-[10px] left-[80px] bg-[#EBB33E] shadow-[0_0_15px_rgba(235,179,62,0.3)]"></div>
        <div className="absolute text-[9px] text-white/70 whitespace-nowrap top-[0px] left-[65px]">Automoto</div>

        <div className="absolute rounded-full z-10 w-[25px] h-[25px] top-[140px] left-[40px] bg-[#EBB33E] shadow-[0_0_15px_rgba(235,179,62,0.3)]"></div>
        <div className="absolute text-[9px] text-white/70 whitespace-nowrap top-[135px] left-[10px]">Cafés</div>

        {/* Blue Nodes (Ahorros / Fijos) */}
        <div className="absolute rounded-full z-10 w-[15px] h-[15px] top-[10px] left-[160px] bg-[#3B3877] shadow-[0_0_15px_rgba(59,56,119,0.3)]"></div>
        <div className="absolute text-[9px] text-white/70 whitespace-nowrap top-[0px] left-[150px]">Alquiler</div>

        <div className="absolute rounded-full z-10 w-[35px] h-[35px] top-[50px] right-[40px] bg-[#3B3877] shadow-[0_0_15px_rgba(59,56,119,0.3)]"></div>
        <div className="absolute text-[9px] text-white/70 whitespace-nowrap top-[35px] right-[40px]">Ahorro<br/>Prog.</div>

        {/* Red Node (ALERTA FUGA) */}
        <div className="absolute rounded-full z-10 w-[45px] h-[45px] bottom-[40px] right-[40px] bg-[#F15A42] animate-pulse shadow-[0_0_20px_rgba(241,90,66,0.6)]">
          {/* Scatter dots */}
          <div className="absolute w-2 h-2 bg-[#F15A42] rounded-full top-[-10px] left-[10px]"></div>
          <div className="absolute w-2 h-2 bg-[#F15A42] rounded-full top-[-5px] right-[-5px]"></div>
          <div className="absolute w-2 h-2 bg-[#F15A42] rounded-full bottom-[5px] right-[-10px]"></div>
        </div>

        {/* Tooltip for Red Node */}
        <div className="absolute bottom-[20px] left-[20px] bg-[#1a1525]/90 border border-[#F15A42]/50 rounded-lg p-2 z-20 w-[130px] shadow-xl backdrop-blur-md">
          <p className="text-[9px] font-bold text-[#F15A42] mb-[2px] uppercase">Cluster Alerta:</p>
          <p className="text-[10px] text-white font-semibold">Gastos Hormiga</p>
          <p className="text-[9px] text-white/70 mt-1">Acum.: $150,000</p>
          <p className="text-[9px] text-white/70">30 Trans.</p>
        </div>
      </div>

      {/* Stats Footer */}
      <div className="grid grid-cols-2 gap-4 border-t border-white/10 pt-4 mt-2">
        <div>
          <p className="text-[11px] text-white/70">Suscripciones</p>
          <p className="text-sm font-bold">
            activas: <span className="text-[#EBB33E]">6</span>
          </p>
        </div>
        <div>
          <p className="text-[11px] text-white/70">Micro-recompensas:</p>
          <p className="text-sm font-bold text-[#EBB33E]">3 pendientes</p>
        </div>
      </div>
    </div>
  );
}
