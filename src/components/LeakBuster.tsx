"use client";

import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence, useInView, useSpring, useTransform } from 'framer-motion';

const CATEGORIES = [
    { id: 'cafes', label: 'Cafés', amount: 85000, color: '#397dc1' },
    { id: 'streaming', label: 'Streaming', amount: 45000, color: '#a898c9' },
    { id: 'transporte', label: 'Transporte', amount: 120000, color: '#397dc1' },
    { id: 'domicilios', label: 'Domicilios', amount: 180000, color: '#f36e53', isAnomaly: true },
];

function Counter({ value, duration = 2 }: { value: number; duration?: number }) {
    const spring = useSpring(0, { bounce: 0, duration: duration * 1000 });
    const [display, setDisplay] = useState(0);

    useEffect(() => {
        spring.set(value);
    }, [value, spring]);

    useEffect(() => {
        return spring.on("change", (latest) => {
            setDisplay(Math.round(latest));
        });
    }, [spring]);

    return <span>${display.toLocaleString('es-CO')}</span>;
}

export default function LeakBuster() {
    const containerRef = useRef(null);
    const isInView = useInView(containerRef, { amount: 0.3 });
    const [state, setState] = useState(1);
    const timersRef = useRef<NodeJS.Timeout[]>([]);

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
            timersRef.current.push(setTimeout(() => setState(2), 2500));
            timersRef.current.push(setTimeout(() => setState(3), 5000));
            timersRef.current.push(setTimeout(() => setState(4), 8500));
            timersRef.current.push(setTimeout(() => setState(5), 11500));
            
            timersRef.current.push(setTimeout(runCycle, 15000));
        };

        runCycle();

        return () => clearAllTimers();
    }, [isInView]);

    return (
        <section className="relative pt-10 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-white/5 bg-[#020617] overflow-hidden">
            
            <div className="text-center mb-8 max-w-5xl mx-auto space-y-6">
                <motion.h2 
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    className="text-6xl md:text-8xl lg:text-9xl font-black tracking-tighter text-white"
                >
                    LeakBuster
                </motion.h2>
                <motion.h3
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="text-2xl md:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#397dc1] to-[#f36e53] tracking-tight"
                >
                    La IA que detecta fugas de dinero.
                </motion.h3>
                <motion.p 
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="text-white/60 text-lg md:text-xl font-medium max-w-3xl mx-auto leading-relaxed"
                >
                    Lukas analiza automáticamente tus patrones de gasto y detecta comportamientos financieros anormales.
                </motion.p>
            </div>

            <div 
                ref={containerRef}
                className="relative w-full max-w-5xl mx-auto min-h-[600px] flex items-center justify-center pt-10"
            >
                <AnimatePresence mode="wait">
                    {/* STEP 1: INCOME CARD */}
                    {state === 1 && (
                        <motion.div
                            key="step1"
                            initial={{ scale: 0.8, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 1.1, opacity: 0 }}
                            className="bg-black/40 border border-[#397dc1]/30 backdrop-blur-2xl rounded-[40px] p-16 text-center shadow-[0_0_100px_rgba(57,125,193,0.15)] relative overflow-hidden group"
                        >
                            {/* Ambient Glow */}
                            <div className="absolute inset-0 bg-gradient-to-br from-[#397dc1]/10 to-transparent pointer-events-none" />
                            
                            <p className="text-[#397dc1] text-xs font-black uppercase tracking-[0.5em] mb-6">Resumen de Ingresos</p>
                            <h3 className="text-white/60 text-2xl font-medium mb-2">Ingresos del mes</h3>
                            <div className="text-white text-7xl md:text-8xl font-black tracking-tighter">
                                $2.400.000
                            </div>
                            
                            {/* Scanning line effect */}
                            <motion.div 
                                animate={{ top: ['-10%', '110%'] }}
                                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                                className="absolute left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#397dc1] to-transparent z-10 opacity-30"
                            />
                        </motion.div>
                    )}

                    {/* STEP 2/3/4/5: CATEGORY HUB */}
                    {state >= 2 && (
                        <motion.div 
                            key="step2plus"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 px-4"
                        >
                            {CATEGORIES.map((cat, idx) => {
                                const isAnomaly = cat.isAnomaly;
                                const isFocused = state >= 4 && isAnomaly;
                                const isDimmed = state >= 5 && !isAnomaly;

                                return (
                                    <motion.div
                                        key={cat.id}
                                        initial={{ y: 30, opacity: 0 }}
                                        animate={{ 
                                            y: 0, 
                                            opacity: isDimmed ? 0.2 : 1,
                                            scale: isFocused && state === 3 ? 1.05 : 1,
                                            borderColor: isAnomaly && state >= 3 ? 'rgba(243,110,83,0.5)' : 'rgba(255,255,255,0.05)',
                                        }}
                                        transition={{ delay: idx * 0.1 }}
                                        className={`bg-[#0a0a0f] border rounded-[32px] p-8 flex flex-col justify-between transition-shadow duration-700 ${isAnomaly && state >= 3 ? 'shadow-[0_0_40px_rgba(243,110,83,0.1)]' : 'shadow-2xl'}`}
                                    >
                                        <div>
                                            <p className="text-[10px] font-black uppercase tracking-[0.3em] text-white/40 mb-3">{cat.label}</p>
                                            <div className={`text-3xl font-black tracking-tight ${isAnomaly && state >= 3 ? 'text-[#f36e53]' : 'text-white'}`}>
                                                {isAnomaly && state >= 3 ? (
                                                    <Counter value={state >= 4 ? 180000 : 40000} duration={state === 3 ? 2.5 : 0.1} />
                                                ) : (
                                                    `$${cat.amount.toLocaleString('es-CO')}`
                                                )}
                                            </div>
                                        </div>

                                        <div className="mt-8">
                                            <div className="h-1 w-full bg-white/5 rounded-full overflow-hidden">
                                                <motion.div 
                                                    initial={{ width: 0 }}
                                                    animate={{ width: isAnomaly && state >= 3 ? (state >= 4 ? "85%" : "25%") : "35%" }}
                                                    transition={{ duration: 2 }}
                                                    className={`h-full ${isAnomaly && state >= 3 ? 'bg-[#f36e53]' : 'bg-[#397dc1]'}`}
                                                />
                                            </div>
                                        </div>
                                    </motion.div>
                                );
                            })}
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* STEP 4/5: OVERLAY ALERT + MASCOT */}
                <AnimatePresence>
                    {state >= 4 && (
                        <motion.div 
                            initial={{ y: 100, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            exit={{ y: 50, opacity: 0 }}
                            transition={{ type: "spring", damping: 20, stiffness: 100 }}
                            className="absolute -bottom-20 z-50 w-full flex justify-center px-4"
                        >
                            <div className="relative flex items-end gap-4 w-full max-w-3xl">
                                {/* Alert Card */}
                                <div className="flex-1 bg-[#141419] border-t-2 border-t-[#f36e53] border-x border-b border-white/10 backdrop-blur-3xl rounded-[40px] p-10 md:p-12 shadow-[0_-20px_100px_rgba(243,110,83,0.15)]">
                                    <div className="flex flex-col md:flex-row items-center gap-10">
                                        <div className="w-20 h-20 rounded-3xl bg-[#f36e53]/10 flex items-center justify-center text-[#f36e53] text-4xl shadow-[0_0_30px_rgba(243,110,83,0.2)] animate-pulse">
                                            ⚠️
                                        </div>
                                        <div className="text-center md:text-left space-y-4">
                                            <p className="text-[#f36e53] text-sm font-black uppercase tracking-[0.5em]">Detección Lukas AI</p>
                                            <h4 className="text-white text-3xl md:text-4xl font-black tracking-tight leading-tight">
                                                Lukas detectó una <span className="underline decoration-[#f36e53]/30 underline-offset-8">fuga de dinero</span>
                                            </h4>
                                            <p className="text-white/60 text-xl font-medium">
                                                Este mes llevas <span className="text-white font-black text-2xl">$180.000</span> en domicilios.
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                {/* Lukas Estricto Mascot */}
                                <motion.div
                                    initial={{ opacity: 0, y: 30, scale: 0.8 }}
                                    animate={{ opacity: 1, y: 0, scale: 1 }}
                                    transition={{ type: "spring", damping: 12, stiffness: 200, delay: 0.15 }}
                                    className="hidden md:flex flex-col items-center flex-shrink-0"
                                >
                                    <div className="drop-shadow-[0_0_20px_rgba(243,110,83,0.5)]">
                                        <Image
                                            src="/mascots/lukas_estricto.png"
                                            alt="Lukas estricto"
                                            width={110}
                                            height={110}
                                            className="object-contain"
                                            style={{ maxHeight: 110 }}
                                            loading="lazy"
                                        />
                                    </div>
                                </motion.div>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>

            {/* Step Indicators */}
            <div className="mt-40 flex justify-center gap-4">
                {[1, 2, 3, 4, 5].map(idx => (
                    <div 
                        key={idx} 
                        className={`h-1 rounded-full transition-all duration-700 ${state === idx ? 'w-16 bg-[#397dc1]' : 'w-4 bg-white/10'}`} 
                    />
                ))}
            </div>

            <p className="text-center mt-12 text-[10px] font-mono font-black text-white/5 tracking-[1em] uppercase py-8 border-y border-white/5">
                Motor de Storytelling v4.0 • Modo Sin Distracciones
            </p>
        </section>
    );
}
