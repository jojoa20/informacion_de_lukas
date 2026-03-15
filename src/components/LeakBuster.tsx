"use client";

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';

const CATEGORIES = [
    { id: 'cafes', label: 'Cafés', color: '#a898c9' },
    { id: 'streaming', label: 'Streaming', color: '#a898c9' },
    { id: 'domicilios', label: 'Domicilios', color: '#f36e53' }, // The Leak
    { id: 'transporte', label: 'Transporte', color: '#397dc1' },
    { id: 'compras', label: 'Compras impulsivas', color: '#d8a93f' },
    { id: 'suscripciones', label: 'Suscripciones', color: '#397dc1' }
];

export default function LeakBuster() {
    const containerRef = useRef(null);
    const isInView = useInView(containerRef, { once: true, amount: 0.3 });
    const [phase, setPhase] = useState(0); // 0: Idle, 1: Flow, 2: Detection, 3: Analysis/Final

    useEffect(() => {
        if (isInView && phase === 0) {
            setPhase(1);
            
            const p1Timer = setTimeout(() => {
                setPhase(2);
                const p2Timer = setTimeout(() => {
                    setPhase(3);
                }, 2000);
                return () => clearTimeout(p2Timer);
            }, 3000);
            
            return () => clearTimeout(p1Timer);
        }
    }, [isInView, phase]);

    // Positions for categories in a clean circular layout
    const radius = 220;
    const centerX = 450;
    const centerY = 350;

    const categoryPositions = CATEGORIES.map((cat, i) => {
        const angle = (i * (360 / CATEGORIES.length) - 90) * (Math.PI / 180);
        return {
            ...cat,
            x: centerX + Math.cos(angle) * (radius * (cat.id === 'domicilios' && phase >= 2 ? 1.1 : 1)),
            y: centerY + Math.sin(angle) * (radius * (cat.id === 'domicilios' && phase >= 2 ? 1.1 : 1))
        };
    });

    return (
        <section className="relative py-32 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto overflow-hidden">
            
            <div className="text-center mb-16 max-w-4xl mx-auto h-32">
                <h2 className="text-5xl font-black mb-4 tracking-tighter text-white">
                    Lukas Leak Buster
                </h2>
                <p className="text-white/60 text-lg md:text-xl font-medium max-w-[640px] mx-auto">
                    Lukas analiza automáticamente tus patrones de gasto y encuentra fugas de dinero.
                </p>
            </div>

            {/* Cinematic Container */}
            <div 
                ref={containerRef}
                className="relative w-full max-w-5xl mx-auto rounded-[24px] p-10 bg-gradient-to-b from-[#1e1b4b] to-[#0f172a] border border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.5)] overflow-hidden"
                style={{ 
                    backgroundImage: 'radial-gradient(circle at center, #21428d 0%, #120c2c 100%)',
                    boxShadow: 'inset 0 0 100px rgba(57, 125, 193, 0.1), 0 20px 50px rgba(0,0,0,0.5)'
                }}
            >
                {/* Status Messages */}
                <div className="absolute top-10 left-10 z-20">
                    <AnimatePresence mode="wait">
                        {phase === 3 && (
                            <motion.div
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                className="flex flex-col gap-1"
                            >
                                <span className="text-[#397dc1] font-mono text-xs font-black tracking-[0.2em] uppercase">Lukas está analizando tus patrones de gasto...</span>
                                <div className="flex gap-4 items-center">
                                    <span className="px-3 py-1 bg-[#f36e53]/20 border border-[#f36e53]/40 rounded text-[#f36e53] text-[10px] font-black uppercase tracking-widest">Fuga detectada</span>
                                    <span className="text-white font-black text-sm">Ahorro potencial identificado</span>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>

                <svg className="w-full h-full" viewBox="0 0 900 700">
                    <defs>
                        <filter id="node-glow">
                            <feGaussianBlur stdDeviation="3" result="blur" />
                            <feComposite in="SourceGraphic" in2="blur" operator="over" />
                        </filter>
                        <filter id="leak-pulse-glow">
                            <feGaussianBlur stdDeviation="10" result="blur" />
                            <feComposite in="SourceGraphic" in2="blur" operator="over" />
                        </filter>
                    </defs>

                    {/* Central Node: INGRESOS */}
                    <g transform={`translate(${centerX}, ${centerY})`}>
                        <motion.circle
                            r={65}
                            fill="#1e1b4b"
                            stroke="#397dc1"
                            strokeWidth="1.5"
                            initial={{ scale: 0 }}
                            animate={{ scale: phase >= 1 ? 1 : 0 }}
                            transition={{ duration: 1, type: "spring" }}
                        />
                        <text textAnchor="middle" dy="5" className="fill-white font-black text-[11px] tracking-[0.2em] pointer-events-none uppercase">Ingresos</text>
                    </g>

                    {/* Category Connections and Particles */}
                    {categoryPositions.map((cat) => {
                        const isLeak = cat.id === 'domicilios';
                        const isDimmed = phase === 2 && !isLeak;

                        return (
                            <g key={cat.id}>
                                {/* Connection Line */}
                                <motion.line
                                    x1={centerX} y1={centerY}
                                    x2={cat.x} y2={cat.y}
                                    stroke={cat.color}
                                    strokeWidth="1"
                                    initial={{ pathLength: 0, opacity: 0 }}
                                    animate={{ 
                                        pathLength: phase >= 1 ? 1 : 0,
                                        opacity: phase >= 1 ? (isDimmed ? 0.05 : 0.15) : 0
                                    }}
                                    transition={{ duration: 1.5, delay: 0.2 }}
                                />

                                {/* Flowing Particles */}
                                {phase >= 1 && phase < 3 && !isDimmed && (
                                    <g>
                                        {[0, 1, 2, 3].map((i) => (
                                            <motion.circle
                                                key={i}
                                                r="2"
                                                fill={cat.color}
                                                filter="url(#node-glow)"
                                                initial={{ offsetDistance: "0%", opacity: 0 }}
                                                animate={{ 
                                                    offsetDistance: "100%",
                                                    opacity: [0, 1, 0]
                                                }}
                                                transition={{ 
                                                    duration: isLeak && phase === 2 ? 1.2 : 3, 
                                                    repeat: Infinity, 
                                                    delay: i * 0.8,
                                                    ease: "linear"
                                                }}
                                                style={{ 
                                                    offsetPath: `path('M ${centerX} ${centerY} L ${cat.x} ${cat.y}')`,
                                                }}
                                            />
                                        ))}
                                    </g>
                                )}

                                {/* Category Node */}
                                <motion.g
                                    initial={{ scale: 0, opacity: 0 }}
                                    animate={{ 
                                        scale: phase >= 1 ? (isLeak && phase === 2 ? 1.3 : 1) : 0,
                                        opacity: phase >= 1 ? (isDimmed ? 0.2 : 1) : 0
                                    }}
                                    transition={{ duration: 0.8, type: "spring" }}
                                >
                                    <circle
                                        cx={cat.x} cy={cat.y} r={isLeak && phase === 2 ? 40 : 35}
                                        fill="#0f172a"
                                        stroke={isLeak && phase >= 2 ? '#f36e53' : cat.color}
                                        strokeWidth="1.5"
                                        className={isLeak && phase === 2 ? "animate-pulse" : ""}
                                        style={{ filter: isLeak && phase === 2 ? "url(#leak-pulse-glow)" : "url(#node-glow)" }}
                                    />
                                    <text
                                        x={cat.x} y={cat.y}
                                        textAnchor="middle" dy="5"
                                        className="fill-white font-bold text-[9px] tracking-tight pointer-events-none uppercase"
                                    >
                                        {cat.label}
                                    </text>

                                    {/* Alert Label in Phase 2 */}
                                    {isLeak && phase === 2 && (
                                        <motion.g
                                            initial={{ opacity: 0, y: 10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                        >
                                            <text x={cat.x} y={cat.y - 50} textAnchor="middle" className="fill-[#f36e53] font-black text-[10px] tracking-widest uppercase">Cluster detectado</text>
                                            <text x={cat.x} y={cat.y - 35} textAnchor="middle" className="fill-white/70 font-bold text-[9px] uppercase">$150.000 en 30 transacciones</text>
                                        </motion.g>
                                    )}
                                </motion.g>

                                {/* Lukas Analysis Scanning Ring in Phase 3 */}
                                {isLeak && phase === 3 && (
                                    <g>
                                        <motion.circle
                                            cx={cat.x} cy={cat.y} r={60}
                                            fill="none"
                                            stroke="#397dc1"
                                            strokeWidth="1"
                                            strokeDasharray="4 4"
                                            animate={{ rotate: 360 }}
                                            transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                                        />
                                        <motion.circle
                                            cx={cat.x} cy={cat.y}
                                            initial={{ r: 35, opacity: 0 }}
                                            animate={{ r: [35, 80], opacity: [0.5, 0] }}
                                            transition={{ duration: 2, repeat: Infinity }}
                                            fill="none"
                                            stroke="#397dc1"
                                            strokeWidth="2"
                                        />
                                    </g>
                                )}
                            </g>
                        );
                    })}

                    {/* Global Scanning Ring */}
                    {phase === 3 && (
                        <motion.circle
                            cx={centerX} cy={centerY}
                            initial={{ r: 0, opacity: 0 }}
                            animate={{ r: [0, 500], opacity: [0.4, 0] }}
                            transition={{ duration: 3, repeat: Infinity }}
                            fill="none"
                            stroke="#06b6d4"
                            strokeWidth="1"
                        />
                    )}
                </svg>

                {/* Technical Caption */}
                <div className="absolute bottom-10 left-1/2 -translate-x-1/2 text-[10px] font-mono font-black text-white/30 tracking-[0.3em] uppercase">
                    Análisis financiero en tiempo real con Lukas AI
                </div>
            </div>
        </section>
    );
}
