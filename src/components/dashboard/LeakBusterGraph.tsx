"use client";
import React, { useState } from "react";

export default function LeakBusterGraph() {
  const [hoverAlert, setHoverAlert] = useState(false);

  return (
    <div className="bg-[#18264A]/80 border border-blue-800/30 rounded-[20px] p-5 flex flex-col relative shadow-lg shadow-blue-900/10 w-full mb-4 min-h-[300px]">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-[#93A5C9] text-sm font-medium">Lukas AI - Leak Buster / Identificador de fugas</h3>
      </div>
      
      {/* Node Graph Mockup */}
      <div className="flex-1 relative w-full h-full flex items-center justify-center isolate">
        
        {/* Lines Layer */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ zIndex: -1 }}>
          <g stroke="#3B82F6" strokeWidth="1.5" opacity="0.4">
            {/* Center to Top Left */}
            <line x1="50%" y1="50%" x2="25%" y2="25%" />
            <line x1="50%" y1="50%" x2="45%" y2="15%" />
            {/* Center to Top Right */}
            <line x1="50%" y1="50%" x2="65%" y2="20%" />
            <line x1="50%" y1="50%" x2="75%" y2="40%" stroke="#EF4444" strokeWidth="2" opacity="0.8" />
            {/* Center to Bottom Left */}
            <line x1="50%" y1="50%" x2="25%" y2="70%" />
            {/* Center to Bottom Right */}
            <line x1="50%" y1="50%" x2="60%" y2="85%" />
          </g>

          {/* Red Alert Cluster Connections */}
          <g stroke="#EF4444" strokeWidth="2" opacity="0.6">
             <line x1="75%" y1="40%" x2="88%" y2="25%" />
             <line x1="75%" y1="40%" x2="98%" y2="45%" />
             <line x1="75%" y1="40%" x2="92%" y2="65%" />
             <line x1="75%" y1="40%" x2="68%" y2="58%" />
          </g>
        </svg>

        {/* Nodes Layer */}

        {/* Central Hub Node */}
        <div className="absolute w-6 h-6 bg-[#3B82F6] border-[3px] border-[#1E3A8A] rounded-full shadow-[0_0_20px_rgba(59,130,246,0.6)] z-10"></div>
        
        {/* Active Blue Nodes */}
        <div className="absolute top-[25%] left-[25%] -translate-x-1/2 -translate-y-1/2 w-4 h-4 bg-blue-400 rounded-full shadow-[0_0_12px_rgba(96,165,250,0.5)]">
           <span className="absolute -top-6 left-1/2 -translate-x-1/2 text-[11px] text-blue-200/80 font-medium">Percosa</span>
        </div>
        <div className="absolute top-[15%] left-[45%] -translate-x-1/2 -translate-y-1/2 w-4 h-4 bg-blue-400 rounded-full shadow-[0_0_12px_rgba(96,165,250,0.5)]">
           <span className="absolute -top-6 left-1/2 -translate-x-1/2 text-[11px] text-blue-200/80 font-medium">Tinto</span>
        </div>
        <div className="absolute top-[20%] left-[65%] -translate-x-1/2 -translate-y-1/2 w-4 h-4 bg-blue-400 rounded-full shadow-[0_0_12px_rgba(96,165,250,0.5)]">
           <span className="absolute -top-6 left-1/2 -translate-x-1/2 text-[11px] text-blue-200/80 font-medium">Empanadas</span>
        </div>
        <div className="absolute top-[70%] left-[25%] -translate-x-1/2 -translate-y-1/2 w-4 h-4 bg-blue-400 rounded-full shadow-[0_0_12px_rgba(96,165,250,0.5)]">
           <span className="absolute top-5 left-1/2 -translate-x-1/2 text-[11px] text-blue-200/80 font-medium">Pas</span>
        </div>
        <div className="absolute top-[85%] left-[60%] -translate-x-1/2 -translate-y-1/2 w-4 h-4 bg-blue-400 rounded-full shadow-[0_0_12px_rgba(96,165,250,0.5)]">
           <span className="absolute top-5 left-1/2 -translate-x-1/2 text-[11px] text-blue-200/80 font-medium">Streaming</span>
        </div>

        {/* Red Alert Main Node */}
        <div 
          className="absolute top-[40%] left-[75%] -translate-x-1/2 -translate-y-1/2 w-6 h-6 bg-red-500 rounded-full shadow-[0_0_25px_rgba(239,68,68,0.9)] z-20 cursor-pointer transition-transform hover:scale-110"
          onMouseEnter={() => setHoverAlert(true)}
          onMouseLeave={() => setHoverAlert(false)}
        >
          {hoverAlert && (
            <div className="absolute bottom-full mb-3 right-1/2 translate-x-1/2 md:translate-x-0 w-[180px] bg-[#222222] text-white text-xs p-3 rounded-lg shadow-2xl border border-red-500/40 z-50">
              <div className="text-red-400 font-bold mb-1 uppercase text-[10px] tracking-wider">Cluster Alerta:</div>
              <div className="font-medium">Gastos Hormiga detected ($150k)</div>
            </div>
          )}
        </div>
        
        {/* Red Cluster Sub-nodes */}
        <div className="absolute top-[25%] left-[88%] -translate-x-1/2 -translate-y-1/2 w-4 h-4 bg-[#F87171] rounded-full shadow-[0_0_15px_rgba(248,113,113,0.6)]"></div>
        <div className="absolute top-[45%] left-[98%] -translate-x-1/2 -translate-y-1/2 w-4 h-4 bg-[#F87171] rounded-full shadow-[0_0_15px_rgba(248,113,113,0.6)]"></div>
        <div className="absolute top-[65%] left-[92%] -translate-x-1/2 -translate-y-1/2 w-4 h-4 bg-[#F87171] rounded-full shadow-[0_0_15px_rgba(248,113,113,0.6)]"></div>
        <div className="absolute top-[58%] left-[68%] -translate-x-1/2 -translate-y-1/2 w-4 h-4 bg-[#F87171] rounded-full shadow-[0_0_15px_rgba(248,113,113,0.6)]"></div>

      </div>
    </div>
  );
}
