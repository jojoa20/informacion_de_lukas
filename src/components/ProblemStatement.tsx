"use client";

import React, { useState, useEffect, useRef, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const CLUSTERS = [
    { id: 'cafes', label: 'Cafés', icon: '☕', color: '#397dc1' },
    { id: 'domicilios', label: 'Domicilios', icon: '🍔', color: '#f36e53', isAnomaly: true },
    { id: 'streaming', label: 'Streaming', icon: '📺', color: '#a898c9' },
    { id: 'transporte', label: 'Transporte', icon: '🚕', color: '#397dc1' }
];

export default function ProblemStatement() {
    const [step, setStep] = useState(1); // 1: Flow, 2: Clusters, 3: Anomaly, 4: Alert

    useEffect(() => {
        const cycle = () => {
            setStep(1);
            const t1 = setTimeout(() => setStep(2), 1500);
            const t2 = setTimeout(() => setStep(3), 3000);
            const t3 = setTimeout(() => setStep(4), 4500);
            const t4 = setTimeout(cycle, 8000); // 6s animation + 2s rest
            return () => {
                clearTimeout(t1);
                clearTimeout(t2);
                clearTimeout(t3);
                clearTimeout(t4);
            };
        };
        return cycle();
    }, []);

    return (
        <section className="relative py-32 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-white/5 mt-12 overflow-hidden bg-[#020617]">
            
            {/* Animated Network Background (Internal to section) */}
            <div className="absolute inset-0 z-0 pointer-events-none opacity-20">
                <div className="absolute top-0 left-0 w-full h-full" 
                    style={{ 
                        backgroundImage: 'radial-gradient(circle, rgba(57, 125, 193, 0.1) 1px, transparent 1px)', 
                        backgroundSize: '80px 80px' 
                    }} 
                />
            </div>

            <div className="relative z-10 text-center mb-16 max-w-4xl mx-auto">
                <h2 className="text-4xl md:text-5xl lg:text-7xl font-black mb-6 tracking-tight leading-tight text-white">
                    La mayoría de la gente no sabe en qué se le va la {" "}
                    <span className="text-[#f36e53]">plata.</span>
                </h2>
                <p className="text-white/70 text-lg md:text-2xl font-medium max-w-[720px] mx-auto leading-relaxed">
                    Pequeños gastos que parecen inofensivos terminan destruyendo tu presupuesto mensual.
                </p>
            </div>

            {/* Main Visual Area: Horizontal Flow */}
            <div className="relative z-10 w-full max-w-5xl mx-auto h-[400px] bg-black/40 border border-white/5 rounded-[32px] overflow-hidden backdrop-blur-xl shadow-2xl">
                
                {/* Horizontal Flow Concept: INGRESOS -> GASTOS -> DETECCIÓN */}
                <div className="absolute inset-0 flex items-center justify-between px-20">
                    
                    {/* Left: INGRESOS Node */}
                    <div className="flex flex-col items-center gap-4">
                        <motion.div 
                            className="w-24 h-24 rounded-full bg-[#1e1b4b] border border-[#397dc1]/30 flex items-center justify-center relative shadow-[0_0_30px_rgba(57,125,193,0.2)]"
                            animate={{ scale: [1, 1.05, 1] }}
                            transition={{ duration: 4, repeat: Infinity }}
                        >
                            <span className="text-white font-black text-xs uppercase tracking-[0.2em]">Ingresos</span>
                            <div className="absolute inset-0 bg-[#397dc1]/10 rounded-full animate-ping" />
                        </motion.div>
                    </div>

                    {/* Center: GASTOS Analysis Area */}
                    <div className="flex-1 h-full relative mx-12">
                        <svg className="w-full h-full" viewBox="0 0 400 300">
                            {/* Connection Paths */}
                            {CLUSTERS.map((cl, i) => (
                                <path 
                                    key={cl.id}
                                    d={`M 0 150 C 100 150, 150 ${60 + i * 60}, 400 ${60 + i * 60}`}
                                    fill="none"
                                    stroke={cl.isAnomaly && step >= 3 ? "#f36e53" : "#397dc1"}
                                    strokeWidth="1"
                                    strokeOpacity={cl.isAnomaly && step >= 3 ? "0.3" : "0.1"}
                                />
                            ))}

                            {/* Flowing Particles */}
                            <AnimatePresence>
                                {step >= 1 && (
                                    <g>
                                        {Array.from({ length: 12 }).map((_, i) => (
                                            <motion.circle
                                                key={i}
                                                r="1.5"
                                                fill={i % CLUSTERS.length === 1 && step >= 3 ? "#f36e53" : "#06b6d4"}
                                                initial={{ offsetDistance: "0%", opacity: 0 }}
                                                animate={{ offsetDistance: "100%", opacity: [0, 1, 0] }}
                                                transition={{ 
                                                    duration: i % CLUSTERS.length === 1 && step === 3 ? 1 : 2.5, 
                                                    repeat: Infinity, 
                                                    delay: i * 0.5,
                                                    ease: "linear"
                                                }}
                                                style={{ 
                                                    offsetPath: `path('M 0 150 C 100 150, 150 ${60 + (i % CLUSTERS.length) * 60}, 400 ${60 + (i % CLUSTERS.length) * 60}')`
                                                }}
                                            />
                                        ))}
                                    </g>
                                )}
                            </AnimatePresence>
                        </svg>

                        {/* Clusters (Nodes on the right side of the analysis area) */}
                        <div className="absolute top-0 right-0 h-full flex flex-col justify-around py-10 translate-x-1/2">
                            {CLUSTERS.map((cl) => (
                                <motion.div 
                                    key={cl.id}
                                    initial={{ scale: 0, opacity: 0 }}
                                    animate={{ 
                                        scale: step >= 2 ? (cl.isAnomaly && step >= 3 ? 1.3 : 1) : 0,
                                        opacity: step >= 2 ? 1 : 0
                                    }}
                                    className={`w-14 h-14 rounded-2xl bg-[#0f172a] border ${cl.isAnomaly && step >= 3 ? 'border-[#f36e53] shadow-[0_0_20px_#f36e5366]' : 'border-white/10'} flex items-center justify-center relative transition-colors duration-500`}
                                >
                                    <span className="text-2xl">{cl.icon}</span>
                                    <span className="absolute -bottom-6 text-[10px] font-bold text-white/40 uppercase whitespace-nowrap">{cl.label}</span>
                                    {cl.isAnomaly && step === 3 && (
                                        <div className="absolute inset-0 bg-[#f36e53]/20 rounded-2xl animate-pulse" />
                                    )}
                                </motion.div>
                            ))}
                        </div>
                    </div>

                    {/* Right: DETECCIÓN (Lukas Alert) */}
                    <div className="w-64 h-full flex items-center justify-center">
                        <AnimatePresence>
                            {step === 4 && (
                                <motion.div 
                                    initial={{ x: 10, opacity: 0 }}
                                    animate={{ x: 0, opacity: 1 }}
                                    exit={{ x: 10, opacity: 0 }}
                                    transition={{ duration: 0.4 }}
                                    className="bg-[#141419]/95 border border-[#f36e53] backdrop-blur-2xl rounded-2xl p-[18px] [padding-right:22px] shadow-[0_0_25px_rgba(243,110,83,0.18)] relative w-[280px] -translate-x-10"
                                >
                                    <div className="flex items-start gap-4">
                                        <div className="w-10 h-10 rounded-full bg-[#f36e53]/20 flex items-center justify-center text-[#f36e53] flex-shrink-0">
                                            ⚠️
                                        </div>
                                        <div>
                                            <p className="text-white text-[12px] uppercase font-black tracking-[2px] opacity-70 mb-1.5">Lukas AI Alert</p>
                                            <p className="text-white text-[18px] font-semibold leading-[1.4]">
                                                Ojo… este mes estás gastando más de lo normal en <span className="text-[#ff6b57]">Domicilios</span>.
                                            </p>
                                        </div>
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                </div>

                {/* Vertical Step Indicators */}
                <div className="absolute right-6 top-1/2 -translate-y-1/2 flex flex-col gap-2 z-30">
                    {[1, 2, 3, 4].map(s => (
                        <div 
                            key={s} 
                            className={`w-1 h-8 rounded-full transition-all duration-500 ${step === s ? (s === 3 ? 'bg-[#f36e53] h-12' : 'bg-[#397dc1] h-12') : 'bg-white/10'}`} 
                        />
                    ))}
                </div>
            </div>

            {/* Bottom Caption */}
            <p className="text-center mt-12 text-[10px] font-mono font-black text-white/20 tracking-[0.6em] uppercase">
                Lukas AI: Detectando fugas financieras en tiempo real
            </p>
        </section>
    );
}
