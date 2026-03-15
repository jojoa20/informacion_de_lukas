"use client";

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';

const CATEGORIES = [
    { id: 'cafes', label: 'Cafés', color: '#397dc1', x_off: -320, y_off: -180 },
    { id: 'streaming', label: 'Streaming', color: '#a898c9', x_off: 320, y_off: -180 },
    { id: 'transporte', label: 'Transporte', color: '#397dc1', x_off: -320, y_off: 180 },
    { id: 'domicilios', label: 'Domicilios', color: '#f36e53', x_off: 320, y_off: 180, isAnomaly: true },
];

const STATES = [
    { id: 1, message: "Buscando origen de fondos..." },
    { id: 2, message: "Mapeando categorías de gasto..." },
    { id: 3, message: "Anomalía en Domicilios..." },
    { id: 4, message: "Lukas AI Detector activo" },
    { id: 5, message: "Análisis completado" }
];

export default function LeakBuster() {
    const containerRef = useRef(null);
    const isInView = useInView(containerRef, { amount: 0.3 });
    const [state, setState] = useState(1);
    const timersRef = useRef<NodeJS.Timeout[]>([]);

    const centerX = 500;
    const centerY = 400;

    const clearAllTimers = () => {
        timersRef.current.forEach(clearTimeout);
        timersRef.current = [];
    };

    useEffect(() => {
        if (!isInView) {
            clearAllTimers();
            return;
        }

        const runCycle = () => {
            clearAllTimers();
            
            setState(1);
            timersRef.current.push(setTimeout(() => setState(2), 2000));
            timersRef.current.push(setTimeout(() => setState(3), 4000));
            timersRef.current.push(setTimeout(() => setState(4), 6000));
            timersRef.current.push(setTimeout(() => setState(5), 8000));
            
            // Cycle 10s + 2s rest
            timersRef.current.push(setTimeout(runCycle, 12000));
        };

        runCycle();

        return () => clearAllTimers();
    }, [isInView]);

    return (
        <section className="relative py-32 px-4 sm:px-6 lg:px-8 max-w-[1400px] mx-auto border-t border-white/5 bg-transparent overflow-hidden">
            
            <div className="text-center mb-16 max-w-4xl mx-auto">
                <h2 className="text-5xl md:text-6xl font-black mb-4 tracking-tighter text-white">
                    Lukas Leak Buster
                </h2>
                <h3 className="text-white/60 text-lg md:text-xl font-medium max-w-[640px] mx-auto">
                    Lukas analiza tus gastos paso a paso para identificar fugas de dinero invisibles.
                </h3>
            </div>

            {/* AI Engine Container - Expanded Size (+40% approx) */}
            <div 
                ref={containerRef}
                className="relative w-full max-w-7xl mx-auto rounded-[40px] p-0 bg-black border border-white/5 overflow-hidden min-h-[900px] shadow-[0_0_100px_rgba(33,66,141,0.15)] flex flex-col items-center"
                style={{ 
                    backgroundImage: 'radial-gradient(circle at center, #100e2b 0%, #000 100%)',
                }}
            >
                {/* Background Tech Grid */}
                <div className="absolute inset-0 opacity-10 pointer-events-none" 
                    style={{ 
                        backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.05) 1px, transparent 1px)', 
                        backgroundSize: '30px 30px' 
                    }} 
                />

                {/* Status Message Header */}
                <div className="absolute top-12 left-0 right-0 z-20 text-center">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={state}
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 1.05 }}
                            transition={{ duration: 0.5 }}
                            className="flex flex-col items-center gap-1.5"
                        >
                            <span className="text-[11px] font-black text-[#397dc1] uppercase tracking-[0.5em] opacity-50">Leak Detection Engine</span>
                            <span className={`text-3xl font-black tracking-tight ${state >= 3 ? 'text-[#f36e53]' : 'text-white'}`}>
                                {STATES.find(s => s.id === state)?.message}
                            </span>
                        </motion.div>
                    </AnimatePresence>
                </div>

                {/* GRAPH VISUALIZATION */}
                <div className="w-full h-[700px] mt-16 relative">
                    <svg className="w-full h-full relative z-10" viewBox="0 0 1000 800">
                        <defs>
                            <filter id="glow">
                                <feGaussianBlur stdDeviation="3" result="blur" />
                                <feComposite in="SourceGraphic" in2="blur" operator="over" />
                            </filter>
                            <filter id="anomaly-glow">
                                <feGaussianBlur stdDeviation="20" result="blur" />
                                <feComposite in="SourceGraphic" in2="blur" operator="over" />
                            </filter>
                        </defs>

                        {/* Step 1 Connections: Outward from source */}
                        {state === 1 && (
                            <g>
                                {[0, 45, 90, 135, 180, 225, 270, 315].map((angle, i) => (
                                    <g key={i}>
                                        {Array.from({ length: 4 }).map((_, j) => (
                                            <motion.circle
                                                key={j}
                                                r="2"
                                                fill="#397dc1"
                                                filter="url(#glow)"
                                                animate={{ 
                                                    cx: [centerX, centerX + Math.cos(angle * Math.PI/180) * 500],
                                                    cy: [centerY, centerY + Math.sin(angle * Math.PI/180) * 500],
                                                    opacity: [0, 1, 0]
                                                }}
                                                transition={{ 
                                                    duration: 3, 
                                                    repeat: Infinity, 
                                                    delay: j * 0.75,
                                                    ease: "linear"
                                                }}
                                            />
                                        ))}
                                    </g>
                                ))}
                            </g>
                        )}

                        {/* Step 2-5: Structured Connections */}
                        {state >= 2 && (
                            <g>
                                {CATEGORIES.map((cat) => {
                                    const targetX = centerX + cat.x_off;
                                    const targetY = centerY + cat.y_off;
                                    const isAnomaly = cat.isAnomaly;
                                    const isDimmed = state >= 4 && !isAnomaly;
                                    
                                    return (
                                        <g key={cat.id}>
                                            <motion.line
                                                initial={{ opacity: 0 }}
                                                animate={{ 
                                                    opacity: isDimmed ? 0.05 : 0.2,
                                                    stroke: isAnomaly && state >= 3 ? "#f36e53" : "#397dc1"
                                                }}
                                                x1={centerX} y1={centerY}
                                                x2={targetX} y2={targetY}
                                                strokeWidth="1"
                                            />
                                            
                                            {/* Particles */}
                                            {Array.from({ length: isAnomaly && state >= 3 ? 10 : 4 }).map((_, i) => (
                                                <motion.circle
                                                    key={i}
                                                    r="2.5"
                                                    fill={isAnomaly && state >= 3 ? "#f36e53" : "#06b6d4"}
                                                    filter="url(#glow)"
                                                    initial={{ offsetDistance: "0%", opacity: 0 }}
                                                    animate={{ 
                                                        offsetDistance: "100%",
                                                        opacity: isDimmed ? 0 : [0, 1, 0]
                                                    }}
                                                    transition={{ 
                                                        duration: isAnomaly && state >= 3 ? 1.2 : 3, 
                                                        repeat: Infinity, 
                                                        delay: i * (isAnomaly && state >= 3 ? 0.3 : 1),
                                                        ease: "linear"
                                                    }}
                                                    style={{ 
                                                        offsetPath: `path('M ${centerX} ${centerY} L ${targetX} ${targetY}')`,
                                                    }}
                                                />
                                            ))}

                                            {/* Category Node */}
                                            <motion.g
                                                initial={{ opacity: 0, scale: 0 }}
                                                animate={{ 
                                                    opacity: isDimmed ? 0.15 : 1,
                                                    scale: isAnomaly && state >= 3 ? 1.4 : 1,
                                                    x: targetX,
                                                    y: targetY
                                                }}
                                                transition={{ duration: 0.8, type: "spring" }}
                                            >
                                                <circle
                                                    r={55}
                                                    fill="#020617"
                                                    stroke={isAnomaly && state >= 3 ? "#f36e53" : cat.color}
                                                    strokeWidth="2.5"
                                                    style={{ 
                                                        filter: isAnomaly && state >= 3 ? "url(#anomaly-glow)" : "url(#glow)" 
                                                    }}
                                                    className={isAnomaly && state === 3 ? "animate-pulse" : ""}
                                                />
                                                <text
                                                    textAnchor="middle" dy="5"
                                                    className="fill-white font-black text-[11px] uppercase tracking-widest pointer-events-none"
                                                >
                                                    {cat.label}
                                                </text>
                                            </motion.g>
                                        </g>
                                    );
                                })}
                            </g>
                        )}

                        {/* Central Core: INGRESOS */}
                        <g transform={`translate(${centerX}, ${centerY})`}>
                            <motion.circle
                                r={80}
                                fill="#020617"
                                stroke="#397dc1"
                                strokeWidth="2.5"
                                animate={{ 
                                    opacity: state >= 4 ? 0.1 : 1,
                                    scale: [1, 1.05, 1] 
                                }}
                                transition={{ duration: 4, repeat: Infinity }}
                            />
                            <text textAnchor="middle" dy="6" className="fill-white font-black text-[13px] tracking-[0.4em] uppercase pointer-events-none">Ingresos</text>
                        </g>
                    </svg>
                </div>

                {/* LUKAS AI ALERT CARD - MOVED BELOW GRAPH FIGURATIVELY (Absolute at bottom with space) */}
                <div className="absolute bottom-16 left-0 right-0 z-30 flex justify-center px-12">
                    <AnimatePresence>
                        {state >= 4 && (
                            <motion.div 
                                initial={{ y: 50, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                exit={{ y: 30, opacity: 0 }}
                                transition={{ duration: 0.6, ease: "easeOut" }}
                                className="w-full max-w-2xl bg-[#0a0a0f]/95 border border-[#f36e53]/40 backdrop-blur-3xl rounded-[32px] p-10 shadow-[0_-20px_100px_rgba(243,110,83,0.12)] border-t-[#f36e53]"
                            >
                                <div className="flex flex-col items-center text-center space-y-6">
                                    <div className="flex items-center gap-4">
                                        <div className="w-px h-6 bg-[#f36e53]/30" />
                                        <p className="text-[#f36e53] text-[12px] font-black uppercase tracking-[0.6em]">Lukas AI Alert</p>
                                        <div className="w-px h-6 bg-[#f36e53]/30" />
                                    </div>

                                    <div className="space-y-4">
                                        <p className="text-white/60 text-xl font-medium tracking-tight">Este mes llevas</p>
                                        <p className="text-white text-7xl md:text-8xl font-black tracking-tighter shadow-sm">
                                            $180.000
                                        </p>
                                        <p className="text-white/60 text-2xl font-bold tracking-tight">en <span className="text-[#f36e53] underline decoration-[#f36e53]/30 underline-offset-8">domicilios.</span></p>
                                    </div>

                                    <div className="w-full max-w-md pt-6">
                                        <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden">
                                            <motion.div 
                                                initial={{ width: 0 }}
                                                animate={{ width: "85%" }}
                                                transition={{ duration: 1.5, delay: 0.5 }}
                                                className="h-full bg-gradient-to-r from-[#f36e53] to-[#ff8c7a]"
                                            />
                                        </div>
                                        <div className="flex justify-between mt-3 text-[10px] font-black uppercase tracking-[0.2em] text-[#f36e53]/60">
                                            <span>Analizando fuga</span>
                                            <span className="animate-pulse">Crítico • +42% vs Media</span>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>

                {/* Progress Indicators (Left side to avoid alert overlap) */}
                <div className="absolute left-12 bottom-12 flex flex-col gap-3 z-20">
                    {[1, 2, 3, 4, 5].map(idx => (
                        <div key={idx} className={`w-8 h-1 transition-all duration-700 ${state === idx ? 'w-16 bg-[#397dc1]' : 'bg-white/10'}`} />
                    ))}
                </div>

            </div>

            {/* Technical Metadata Footer */}
            <div className="mt-12 flex justify-center">
                <p className="text-[10px] font-mono font-black text-white/5 tracking-[1em] py-4 border-y border-white/5 w-full text-center uppercase">
                    Storytelling Engine v3.0 • Cascaded Layout Active • Zero Overlap Mode
                </p>
            </div>
        </section>
    );
}
