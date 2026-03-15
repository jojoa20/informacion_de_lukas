"use client";

import React, { useState, useEffect, useRef, useMemo } from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';

const CATEGORIES = [
    { id: 'cafes', label: 'Cafés', color: '#397dc1', x_off: -280, y_off: -150 },
    { id: 'streaming', label: 'Streaming', color: '#a898c9', x_off: 280, y_off: -150 },
    { id: 'transporte', label: 'Transporte', color: '#397dc1', x_off: -280, y_off: 150 },
    { id: 'domicilios', label: 'Domicilios', color: '#f36e53', x_off: 280, y_off: 150, isAnomaly: true },
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

    const centerX = 450;
    const centerY = 350;

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
            
            // Full cycle 10s + 2s rest
            timersRef.current.push(setTimeout(runCycle, 12000));
        };

        runCycle();

        return () => clearAllTimers();
    }, [isInView]);

    return (
        <section className="relative py-32 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-white/5 bg-transparent overflow-hidden">
            
            <div className="text-center mb-16 max-w-4xl mx-auto">
                <h2 className="text-5xl font-black mb-4 tracking-tighter text-white">
                    Lukas Leak Buster
                </h2>
                <h3 className="text-white/60 text-lg md:text-xl font-medium max-w-[640px] mx-auto">
                    Lukas analiza tus gastos paso a paso para identificar fugas de dinero invisibles.
                </h3>
            </div>

            {/* AI Engine Container */}
            <div 
                ref={containerRef}
                className="relative w-full max-w-5xl mx-auto rounded-[32px] p-0 bg-black border border-white/5 overflow-hidden min-h-[750px] shadow-[0_0_100px_rgba(33,66,141,0.2)]"
                style={{ 
                    backgroundImage: 'radial-gradient(circle at center, #1e1b4b 0%, #000 100%)',
                }}
            >
                {/* Background Tech Grid */}
                <div className="absolute inset-0 opacity-5 pointer-events-none" 
                    style={{ 
                        backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.1) 1px, transparent 1px)', 
                        backgroundSize: '40px 40px' 
                    }} 
                />

                {/* Status Message */}
                <div className="absolute top-12 left-0 right-0 z-20 text-center">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={state}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            transition={{ duration: 0.5 }}
                            className="flex flex-col items-center gap-2"
                        >
                            <span className="text-[10px] font-black text-[#397dc1] uppercase tracking-[0.4em]">System Status</span>
                            <span className={`text-2xl font-bold tracking-tight ${state >= 3 ? 'text-[#f36e53]' : 'text-white'}`}>
                                {STATES.find(s => s.id === state)?.message}
                            </span>
                        </motion.div>
                    </AnimatePresence>
                </div>

                <svg className="w-full h-full relative z-10" viewBox="0 0 900 700">
                    <defs>
                        <filter id="glow">
                            <feGaussianBlur stdDeviation="3" result="blur" />
                            <feComposite in="SourceGraphic" in2="blur" operator="over" />
                        </filter>
                        <filter id="anomaly-glow">
                            <feGaussianBlur stdDeviation="15" result="blur" />
                            <feComposite in="SourceGraphic" in2="blur" operator="over" />
                        </filter>
                    </defs>

                    {/* Step 1 Connections: Outward from source */}
                    {state === 1 && (
                        <g>
                            {[0, 45, 90, 135, 180, 225, 270, 315].map((angle, i) => (
                                <g key={i}>
                                    {Array.from({ length: 3 }).map((_, j) => (
                                        <motion.circle
                                            key={j}
                                            r="1.5"
                                            fill="#397dc1"
                                            filter="url(#glow)"
                                            animate={{ 
                                                cx: [centerX, centerX + Math.cos(angle * Math.PI/180) * 400],
                                                cy: [centerY, centerY + Math.sin(angle * Math.PI/180) * 400],
                                                opacity: [0, 1, 0]
                                            }}
                                            transition={{ 
                                                duration: 3, 
                                                repeat: Infinity, 
                                                delay: j * 1,
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
                                
                                return (
                                    <g key={cat.id}>
                                        <motion.line
                                            initial={{ opacity: 0 }}
                                            animate={{ 
                                                opacity: state === 5 && !isAnomaly ? 0.05 : 0.15,
                                                stroke: isAnomaly && state >= 3 ? "#f36e53" : "#397dc1"
                                            }}
                                            x1={centerX} y1={centerY}
                                            x2={targetX} y2={targetY}
                                            strokeWidth="1"
                                        />
                                        
                                        {/* Particles */}
                                        {Array.from({ length: isAnomaly && state >= 3 ? 8 : 4 }).map((_, i) => (
                                            <motion.circle
                                                key={i}
                                                r="2"
                                                fill={isAnomaly && state >= 3 ? "#f36e53" : "#06b6d4"}
                                                filter="url(#glow)"
                                                initial={{ offsetDistance: "0%", opacity: 0 }}
                                                animate={{ 
                                                    offsetDistance: "100%",
                                                    opacity: [0, 1, 0]
                                                }}
                                                transition={{ 
                                                    duration: isAnomaly && state >= 3 ? 1 : 3, 
                                                    repeat: Infinity, 
                                                    delay: i * (isAnomaly && state >= 3 ? 0.3 : 1),
                                                    ease: "linear"
                                                }}
                                                style={{ 
                                                    offsetPath: `path('M ${centerX} ${centerY} L ${targetX} ${targetY}')`,
                                                }}
                                            />
                                        ))}

                                        {/* Node */}
                                        <motion.g
                                            initial={{ opacity: 0, scale: 0 }}
                                            animate={{ 
                                                opacity: state === 5 && !isAnomaly ? 0.1 : 1,
                                                scale: isAnomaly && state >= 3 ? 1.3 : 1,
                                                x: targetX,
                                                y: targetY
                                            }}
                                            transition={{ duration: 0.8, type: "spring" }}
                                        >
                                            <circle
                                                r={45}
                                                fill="#020617"
                                                stroke={isAnomaly && state >= 3 ? "#f36e53" : cat.color}
                                                strokeWidth="2"
                                                style={{ 
                                                    filter: isAnomaly && state >= 3 ? "url(#anomaly-glow)" : "url(#glow)" 
                                                }}
                                                className={isAnomaly && state >= 3 ? "animate-pulse" : ""}
                                            />
                                            <text
                                                textAnchor="middle" dy="4"
                                                className="fill-white font-black text-[10px] uppercase tracking-wider pointer-events-none"
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
                            r={state === 5 ? 50 : 70}
                            fill="#020617"
                            stroke="#397dc1"
                            strokeWidth="2"
                            animate={{ 
                                opacity: state === 5 ? 0.1 : 1,
                                scale: [1, 1.05, 1] 
                            }}
                            transition={{ duration: 4, repeat: Infinity }}
                        />
                        <text textAnchor="middle" dy="5" className="fill-white font-black text-[11px] tracking-[0.3em] uppercase pointer-events-none">Ingresos</text>
                    </g>
                </svg>

                {/* STEP 4/5: AI Alert Card */}
                <AnimatePresence>
                    {state >= 4 && (
                        <motion.div 
                            initial={{ x: 40, opacity: 0 }}
                            animate={{ x: 0, opacity: 1 }}
                            exit={{ x: 40, opacity: 0 }}
                            transition={{ duration: 0.4, ease: "easeOut" }}
                            className="absolute right-12 top-1/2 -translate-y-1/2 z-30"
                        >
                            <div className="bg-[#141419]/98 border border-[#f36e53] backdrop-blur-3xl rounded-[24px] p-8 shadow-[0_0_50px_rgba(243,110,83,0.15)] w-[320px]">
                                <div className="flex items-start gap-5">
                                    <div className="w-12 h-12 rounded-2xl bg-[#f36e53]/10 flex items-center justify-center text-[#f36e53] flex-shrink-0 animate-bounce">
                                        ⚠️
                                    </div>
                                    <div className="space-y-3">
                                        <p className="text-white/40 text-[11px] font-black uppercase tracking-[3px]">Lukas AI Detection</p>
                                        <p className="text-white text-[20px] font-bold leading-[1.3] tracking-tight">
                                            Ojo… este mes llevas <span className="text-[#f36e53] font-black">$180.000</span> en domicilios.
                                        </p>
                                        <div className="pt-2">
                                            <div className="h-1 w-full bg-white/5 rounded-full overflow-hidden">
                                                <motion.div 
                                                    initial={{ width: 0 }}
                                                    animate={{ width: "85%" }}
                                                    className="h-full bg-[#f36e53]"
                                                />
                                            </div>
                                            <div className="flex justify-between mt-1.5 text-[9px] font-black uppercase tracking-widest text-[#f36e53]">
                                                <span>Run-rate alert</span>
                                                <span>+42% vs avg</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* Progress Indicators */}
                <div className="absolute left-1/2 -translate-x-1/2 bottom-12 flex gap-3 z-20">
                    {[1, 2, 3, 4, 5].map(idx => (
                        <div key={idx} className={`h-1.5 rounded-full transition-all duration-700 ${state === idx ? 'w-10 bg-[#397dc1]' : 'w-4 bg-white/10'}`} />
                    ))}
                </div>

            </div>

            {/* Bottom Technical Label */}
            <p className="text-center mt-12 text-[10px] font-mono font-black text-white/10 tracking-[1em] py-4 border-y border-white/5 max-w-lg mx-auto uppercase">
                Storytelling Engine v2.0 • Data Clustering Active
            </p>
        </section>
    );
}
