"use client";

import React from 'react';
import InteractiveHeroDemo from './InteractiveHeroDemo';
import { motion } from 'framer-motion';

export default function Hero() {
    return (
        <section className="relative min-h-[100vh] flex flex-col items-center justify-center overflow-hidden px-4 sm:px-6 lg:px-8 pt-24 sm:pt-28 lg:pt-32 pb-16 lg:pb-20">
            {/* Deep Dark Gradient Background */}
            <div className="absolute inset-0 bg-gradient-to-b from-[#020617] via-[#0f172a] to-[#020617] pointer-events-none z-[-2]" />

            {/* Animated Network Background */}
            <div className="absolute inset-0 z-[-1] opacity-40 overflow-hidden pointer-events-none">
                {/* Glow behind center */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[#397dc1]/10 rounded-full blur-[120px]" />

                {/* SVG Network Lines and Nodes */}
                <svg className="absolute w-full h-full" xmlns="http://www.w3.org/2000/svg">
                    <g stroke="rgba(255,255,255,0.03)" strokeWidth="1">
                        <path d="M100,0 L100,2000 M300,0 L300,2000 M500,0 L500,2000 M700,0 L700,2000 M900,0 L900,2000 M1100,0 L1100,2000 M1300,0 L1300,2000" />
                        <path d="M0,200 L2000,200 M0,400 L2000,400 M0,600 L2000,600 M0,800 L2000,800 M0,1000 L2000,1000" />
                    </g>
                </svg>
            </div>

            {/* Content Area */}
            <div className="relative z-10 text-center max-w-5xl mx-auto mb-16 px-4">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                >
                    <h1 className="text-[2rem] sm:text-5xl md:text-7xl lg:text-[9rem] font-black tracking-tighter mb-6 sm:mb-10 leading-[0.9] sm:leading-[0.85] text-white max-w-7xl mx-auto">
                        Tu dinero se está escapando. <br className="hidden sm:block" />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#397dc1] to-[#a898c9]">Lukas te muestra dónde.</span>
                    </h1>
                    
                    <p className="text-base sm:text-xl md:text-2xl font-medium text-white/70 mb-8 sm:mb-14 max-w-3xl mx-auto leading-relaxed">
                        Lukas analiza tus gastos automáticamente y detecta fugas de dinero antes de que destruyan tu presupuesto.
                    </p>

                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6 mb-12 sm:mb-20 w-full sm:w-auto">
                        <button className="group relative w-full sm:w-auto min-h-[48px] px-8 sm:px-10 py-4 sm:py-5 rounded-2xl bg-gradient-to-r from-[#397dc1] to-[#6b4de6] font-black text-white transition-all duration-300 shadow-[0_0_30px_rgba(57,125,193,0.3)] hover:shadow-[0_0_50px_rgba(57,125,193,0.5)] hover:-translate-y-1 hover:scale-105 active:scale-95 overflow-hidden">
                            <span className="relative z-10 text-base sm:text-lg">Probar Lukas</span>
                            <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
                            <div className="absolute -inset-1 bg-gradient-to-r from-[#397dc1] to-[#a898c9] rounded-2xl blur-xl opacity-20 group-hover:opacity-40 animate-pulse pointer-events-none z-0" />
                        </button>
                        
                        <button className="w-full sm:w-auto min-h-[48px] px-8 sm:px-10 py-4 sm:py-5 rounded-2xl bg-white/5 hover:bg-white/10 text-white font-bold border border-white/10 transition-all duration-300 hover:-translate-y-1 hover:scale-105 backdrop-blur-md active:scale-95 text-base sm:text-lg">
                            Ver cómo funciona
                        </button>
                    </div>
                </motion.div>

                {/* Feature Pills */}
                <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5, duration: 1 }}
                    className="flex flex-wrap items-center justify-center gap-4 max-w-4xl mx-auto"
                >
                    {[
                        { icon: "🕵️", text: "Gastos hormiga" },
                        { icon: "📱", text: "Pantallazos Nequi" },
                        { icon: "📈", text: "FinScore Real-time" }
                    ].map((bullet, i) => (
                        <div key={i} className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/5 border border-white/10 backdrop-blur-md hover:border-[#397dc1]/40 transition-colors">
                            <span className="text-xl">{bullet.icon}</span>
                            <span className="text-white/70 text-sm font-bold tracking-tight uppercase">{bullet.text}</span>
                        </div>
                    ))}
                </motion.div>
            </div>

            {/* Hero Visual: Floating Mockup and UI Elements */}
            <div className="relative w-full max-w-[280px] sm:max-w-lg mx-auto h-[380px] sm:h-[500px] mt-6 sm:mt-10 perspective-1000">

                {/* Soft glow behind the phone mockup */}
                <div className="absolute inset-0 bg-gradient-to-tr from-[#397dc1]/20 to-[#a898c9]/20 rounded-3xl blur-[100px]" />

                {/* Phone Mockup Placeholder */}
                <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[min(240px,75vw)] sm:w-[300px] h-[min(480px,70vh)] sm:h-[600px] rounded-[40px] sm:rounded-[48px] border-[6px] border-white/10 bg-[#020617] backdrop-blur-3xl shadow-[0_0_80px_rgba(0,0,0,0.5)] animate-[float_8s_ease-in-out_infinite] overflow-hidden flex flex-col items-center">
                    {/* Top notch */}
                    <div className="w-[120px] h-7 bg-black rounded-b-2xl absolute top-0 left-1/2 -translate-x-1/2 z-20" />

                    {/* App UI Body - Interactive Demo */}
                    <div className="w-full h-full pt-10 px-0">
                        <InteractiveHeroDemo />
                    </div>
                </div>

                {/* Floating UI Elements */}
                <div className="absolute top-1/4 -left-32 bg-[#0f172a]/80 border border-[#f36e53]/30 backdrop-blur-xl rounded-2xl p-4 shadow-2xl animate-[float_6s_ease-in-out_infinite] hidden lg:block">
                    <p className="text-[10px] font-black text-[#f36e53] uppercase tracking-widest mb-1">Fuga detectada</p>
                    <p className="text-white font-bold leading-tight">$15.000 en Empanadas</p>
                </div>

                <div className="absolute bottom-1/4 -right-32 bg-[#0f172a]/80 border border-[#397dc1]/30 backdrop-blur-xl rounded-2xl p-4 shadow-2xl animate-[float_7s_ease-in-out_infinite_1s] hidden lg:block">
                    <p className="text-[10px] font-black text-[#397dc1] uppercase tracking-widest mb-1">Optimización</p>
                    <p className="text-white font-bold leading-tight">FinScore +42 pts</p>
                </div>

            </div>

            {/* Optional fade at bottom */}
            <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-[#020617] to-transparent pointer-events-none" />
        </section>
    );
}
