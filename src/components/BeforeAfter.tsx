"use client";

import React from 'react';

export default function BeforeAfter() {
    const beforePoints = [
        { icon: "❓", text: "No sabes a dónde se va tu plata" },
        { icon: "💸", text: "Muchos gastos hormiga invisibles" },
        { icon: "🌫️", text: "Cero conciencia financiera" }
    ];

    const afterPoints = [
        { icon: "🎯", text: "Fugas detectadas al instante" },
        { icon: "📅", text: "Mejor planeación mensual" },
        { icon: "🚀", text: "FinScore en aumento constante" }
    ];

    return (
        <section className="relative py-32 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-white/5 bg-transparent overflow-hidden">
            
            {/* Background decorative elements */}
            <div className="absolute top-1/2 left-0 w-64 h-64 bg-[#f36e53]/5 blur-[100px] rounded-full -z-10" />
            <div className="absolute top-1/2 right-0 w-64 h-64 bg-[#397dc1]/5 blur-[100px] rounded-full -z-10" />

            <div className="text-center mb-20">
                <h2 className="text-4xl md:text-6xl font-black mb-6 tracking-tight text-white">
                    El cambio que <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#f36e53] via-white to-[#397dc1]">tu billetera</span> necesita.
                </h2>
                <p className="text-white/60 text-lg md:text-xl max-w-2xl mx-auto">
                    De la incertidumbre al control total. Mira cómo Lukas transforma tu relación con el dinero.
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 relative">
                
                {/* VS Badge */}
                <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 rounded-full bg-white/5 border border-white/10 backdrop-blur-xl flex items-center justify-center z-20 hidden md:flex">
                    <span className="text-white font-black text-xl italic">VS</span>
                </div>

                {/* Before Lukas */}
                <div className="space-y-6">
                    <div className="flex items-center gap-4 mb-4 ml-2">
                        <span className="text-xs font-black uppercase tracking-[0.3em] text-[#f36e53]/60">Sin Lukas</span>
                        <div className="h-px flex-1 bg-gradient-to-r from-[#f36e53]/20 to-transparent" />
                    </div>
                    
                    {beforePoints.map((point, i) => (
                        <div key={i} className="group relative p-8 rounded-[2rem] bg-white/5 border border-white/5 backdrop-blur-sm transition-all duration-300 hover:border-[#f36e53]/20 spotlight-card overflow-hidden opacity-70 hover:opacity-100">
                            <div className="flex items-center gap-6 relative z-10">
                                <div className="w-14 h-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-3xl group-hover:scale-110 transition-transform duration-300 grayscale group-hover:grayscale-0">
                                    {point.icon}
                                </div>
                                <p className="text-white/80 text-lg md:text-xl font-bold tracking-tight leading-snug">
                                    {point.text}
                                </p>
                            </div>
                            
                            {/* Subtle chaotic background pattern for "Before" */}
                            <div className="absolute inset-0 opacity-[0.02] pointer-events-none transition-opacity group-hover:opacity-[0.05]" 
                                 style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, #f36e53 1px, transparent 0)', backgroundSize: '15px 15px' }} />
                        </div>
                    ))}
                </div>

                {/* After Lukas */}
                <div className="space-y-6">
                    <div className="flex items-center gap-4 mb-4 ml-2">
                        <span className="text-xs font-black uppercase tracking-[0.3em] text-[#397dc1]/80">Con Lukas</span>
                        <div className="h-px flex-1 bg-gradient-to-r from-[#397dc1]/40 to-transparent" />
                    </div>

                    {afterPoints.map((point, i) => (
                        <div key={i} className="group relative p-8 rounded-[2rem] bg-[#1e1b4b]/40 border border-[#397dc1]/20 shadow-[0_0_30px_rgba(57,125,193,0.05)] backdrop-blur-xl transition-all duration-300 hover:border-[#397dc1]/50 hover:shadow-[0_0_40px_rgba(57,125,193,0.15)] spotlight-card overflow-hidden">
                            <div className="flex items-center gap-6 relative z-10">
                                <div className="w-14 h-14 rounded-2xl bg-[#397dc1]/20 border border-[#397dc1]/30 flex items-center justify-center text-3xl group-hover:scale-110 transition-transform duration-300 shadow-[0_0_20px_rgba(57,125,193,0.2)]">
                                    {point.icon}
                                </div>
                                <p className="text-white text-lg md:text-xl font-black tracking-tight leading-snug">
                                    {point.text}
                                </p>
                            </div>
                            
                            {/* Clean grid background pattern for "After" */}
                            <div className="absolute inset-0 opacity-[0.03] pointer-events-none transition-opacity group-hover:opacity-[0.08]" 
                                 style={{ backgroundImage: 'linear-gradient(#397dc1 1px, transparent 1px), linear-gradient(90deg, #397dc1 1px, transparent 1px)', backgroundSize: '30px 30px' }} />
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
