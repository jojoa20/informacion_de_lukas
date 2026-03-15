"use client";

import React from 'react';

const ACHIEVEMENTS = [
    {
        id: 1,
        title: "7 días limpio",
        description: "Sin gastos hormiga por una semana completa.",
        icon: "🔥",
        color: "#f97316", // Orange
        glowClass: "group-hover:shadow-[0_0_30px_rgba(249,115,22,0.4)]",
        borderClass: "group-hover:border-[#f97316]/50",
        textClass: "text-[#f97316]"
    },
    {
        id: 2,
        title: "Piloto Automático",
        description: "Ahorro automático activado y configurado.",
        icon: "🤖",
        color: "#397dc1", // Primary/Blue
        glowClass: "group-hover:shadow-[0_0_30px_rgba(57,125,193,0.4)]",
        borderClass: "group-hover:border-[#397dc1]/50",
        textClass: "text-[#397dc1]"
    },
    {
        id: 3,
        title: "Meta Cumplida",
        description: "Alcanzaste tu objetivo de ahorro mensual.",
        icon: "🏆",
        color: "#d8a93f", // Accent Gold
        glowClass: "group-hover:shadow-[0_0_30px_rgba(216,169,63,0.4)]",
        borderClass: "group-hover:border-[#d8a93f]/50",
        textClass: "text-[#d8a93f]"
    }
];

export default function Gamification() {
    return (
        <section className="relative py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-white/5 bg-[#0f172a] overflow-hidden">
            
            {/* Ambient Background Glow */}
            <div className="absolute inset-0 pt-24 -z-10 pointer-events-none">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] bg-gradient-to-tr from-[#397dc1]/10 via-transparent to-[#d8a93f]/10 blur-[150px] rounded-[100%]"></div>
            </div>

            <div className="text-center mb-16 max-w-3xl mx-auto">
                <h2 className="text-4xl md:text-5xl lg:text-6xl font-black mb-6 tracking-tight text-white drop-shadow-lg">
                    Cada buena decisión <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#d8a93f] to-[#f97316]">suma.</span>
                </h2>
                <p className="text-white/70 text-lg md:text-xl leading-relaxed">
                    Mantener finanzas saludables no debería ser aburrido. Lukas premia tus buenos hábitos y te ayuda a mantener la motivación en alto con medallas por tus logros.
                </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-5xl mx-auto relative z-10">
                {ACHIEVEMENTS.map((badge) => (
                    <div 
                        key={badge.id}
                        className={`group relative bg-[#1e1b4b]/40 backdrop-blur-xl border border-white/10 rounded-3xl p-8 flex flex-col items-center text-center transition-all duration-500 ease-out cursor-default hover:-translate-y-2 ${badge.borderClass} ${badge.glowClass}`}
                    >
                        {/* Decorative background flare on hover */}
                        <div className="absolute inset-0 bg-gradient-to-b from-white/[0.03] to-transparent rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                        
                        {/* Icon Container */}
                        <div className="w-20 h-20 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-4xl mb-6 relative transition-transform duration-500 group-hover:scale-110 group-hover:-rotate-3">
                            <span className="relative z-10">{badge.icon}</span>
                            
                            {/* Inner icon glow */}
                            <div 
                                className="absolute inset-0 rounded-2xl blur-xl opacity-0 group-hover:opacity-60 transition-opacity duration-500"
                                style={{ backgroundColor: badge.color }}
                            ></div>
                        </div>

                        {/* Text Content */}
                        <div className="relative z-10">
                            <h3 className={`text-xl font-bold mb-3 tracking-wide transition-colors ${badge.textClass}`}>
                                {badge.title}
                            </h3>
                            <p className="text-white/60 text-sm leading-relaxed">
                                {badge.description}
                            </p>
                        </div>
                    </div>
                ))}
            </div>
            
        </section>
    );
}
