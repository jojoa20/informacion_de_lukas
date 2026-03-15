"use client";

import React, { useState, useEffect } from 'react';

export default function FinScore() {
    const [score, setScore] = useState(400);
    const [logs, setLogs] = useState<{ id: number, text: string, type: 'pos' | 'neg', value: number }[]>([]);
    const [isImproving, setIsImproving] = useState(false);

    // Determine gauge styling and text based on specific thresholds requested
    const getScoreData = (currentScore: number) => {
        if (currentScore < 500) {
            return {
                tier: "Financial chaos",
                color: "#f36e53", // Coral Red
                glowClass: "shadow-[0_0_50px_rgba(243,110,83,0.4)]",
                text: "Estás en modo supervivencia.",
                gradientClass: "from-[#f36e53] to-[#f97316]"
            };
        } else if (currentScore < 700) {
            return {
                tier: "Stabilizing",
                color: "#d8a93f", // Gold
                glowClass: "shadow-[0_0_50px_rgba(216,169,63,0.4)]",
                text: "Vas por buen camino.",
                gradientClass: "from-[#f97316] to-[#d8a93f]"
            };
        } else if (currentScore < 850) {
            return {
                tier: "Good control",
                color: "#10b981", // Emerald Green
                glowClass: "shadow-[0_0_50px_rgba(16,185,129,0.4)]",
                text: "Dominando el control.",
                gradientClass: "from-[#d8a93f] to-[#10b981]"
            };
        } else {
            return {
                tier: "Financial pro",
                color: "#397dc1", // Cyan/Blue
                glowClass: "shadow-[0_0_60px_rgba(57,125,193,0.6)]",
                text: "Finanzas nivel leyenda.",
                gradientClass: "from-[#10b981] to-[#397dc1]"
            };
        }
    };

    const { tier, color, text, glowClass, gradientClass } = getScoreData(score);

    // SVG Speedometer Arc Math
    const radius = 130;
    const circumference = Math.PI * radius; 
    
    const fillPercentage = Math.max(0, Math.min(1000, score)) / 1000;
    const dashoffset = circumference - (fillPercentage * circumference);

    const applyAction = (actionText: string, value: number) => {
        if (value > 0) {
            setIsImproving(true);
            setTimeout(() => setIsImproving(false), 1500);
        }

        setScore(prev => {
            const newScore = Math.max(0, Math.min(1000, prev + value));
            return newScore;
        });
        
        const newLog = {
            id: Date.now(),
            text: actionText,
            type: value >= 0 ? 'pos' : 'neg' as 'pos' | 'neg',
            value: value
        };
        setLogs(prev => [newLog, ...prev].slice(0, 3));
    };

    // Automated Demo Loop
    useEffect(() => {
        let isMounted = true;
        
        const runDemoSequence = async () => {
            while (isMounted) {
                // Phase 1: Chaos
                setLogs([]);
                setScore(350); 
                await new Promise(r => setTimeout(r, 3000));
                if (!isMounted) break;

                // Phase 2: Stabilizing
                applyAction("Gasto hormiga controlado", 200); // 550
                await new Promise(r => setTimeout(r, 3000));
                if (!isMounted) break;

                // Phase 3: Good Control
                applyAction("Ahorro programado activado", 200); // 750
                await new Promise(r => setTimeout(r, 3000));
                if (!isMounted) break;

                // Phase 4: Pro
                applyAction("Inversión inteligente", 150); // 900
                await new Promise(r => setTimeout(r, 4000));
                if (!isMounted) break;

                // Transition back
                setScore(350);
                await new Promise(r => setTimeout(r, 2000));
            }
        };

        runDemoSequence();

        return () => {
            isMounted = false;
        };
    }, []);

    return (
        <section className="relative py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-white/5 bg-[#0f172a]">
            
            <div className="text-center mb-16 max-w-3xl mx-auto">
                <h2 className="text-4xl md:text-5xl lg:text-6xl font-black mb-6 tracking-tight">
                    <span className="text-white">Tu salud financiera ahora tiene </span>
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#d8a93f] to-[#f36e53]">
                        puntaje.
                    </span>
                </h2>
                <p className="text-white/70 text-lg md:text-xl leading-relaxed">
                    Lukas evalúa cada movimiento y te asigna un FinScore dinámico de 0 a 1000. 
                    Mejóralo optimizando tu gasto y desbloquea beneficios reales.
                </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                
                {/* Speedometer Visualization (Left Side) */}
                <div className="order-1 relative flex flex-col items-center">
                    
                    {/* Background Ambient Glow */}
                    <div
                        className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] rounded-full blur-[120px] transition-all duration-1000 -z-10 ${isImproving ? 'opacity-60 scale-110' : 'opacity-30 scale-100'}`}
                        style={{ backgroundColor: color }}
                    />

                    <div className={`relative w-full max-w-sm aspect-square flex flex-col items-center justify-center bg-[#1e1b4b]/40 backdrop-blur-2xl border ${isImproving ? 'border-white/40' : 'border-white/10'} rounded-full ${glowClass} transition-all duration-700 p-8`}>
                        
                        {/* Improvement Flash Element */}
                        <div className={`absolute inset-0 rounded-full bg-white transition-opacity duration-300 pointer-events-none ${isImproving ? 'opacity-5' : 'opacity-0'}`} />

                        {/* SVG Speedometer Gauge */}
                        <div className="absolute inset-0 flex items-center justify-center">
                            <svg
                                className="w-[90%] h-[90%]"
                                viewBox="0 0 300 300"
                                preserveAspectRatio="xMidYMid meet"
                            >
                                <defs>
                                    <filter id="gaugeGlow">
                                        <feGaussianBlur stdDeviation="6" result="blur" />
                                        <feComposite in="SourceGraphic" in2="blur" operator="over" />
                                    </filter>
                                    
                                    <linearGradient id="multiColorGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                                        <stop offset="0%" stopColor="#f36e53" />     {/* Chaos */}
                                        <stop offset="33%" stopColor="#f97316" />    {/* Stabilizing */}
                                        <stop offset="66%" stopColor="#10b981" />    {/* Control */}
                                        <stop offset="100%" stopColor="#397dc1" />   {/* Pro */}
                                    </linearGradient>
                                </defs>

                                {/* Track Background */}
                                <path
                                    d="M 20 200 A 130 130 0 0 1 280 200"
                                    fill="none"
                                    stroke="rgba(255,255,255,0.05)"
                                    strokeWidth="28"
                                    strokeLinecap="round"
                                />

                                {/* Active Track */}
                                <path
                                    d="M 20 200 A 130 130 0 0 1 280 200"
                                    fill="none"
                                    stroke="url(#multiColorGradient)"
                                    strokeWidth="28"
                                    strokeLinecap="round"
                                    strokeDasharray={circumference}
                                    strokeDashoffset={dashoffset}
                                    className="transition-all duration-[1200ms] ease-out"
                                    filter="url(#gaugeGlow)"
                                />
                            </svg>
                        </div>

                        {/* Text Inside Gauge */}
                        <div className="relative z-10 flex flex-col items-center mt-12">
                            <span className={`text-[10px] font-black uppercase tracking-[0.3em] mb-2 transition-colors duration-500 ${isImproving ? 'text-white' : 'text-white/50'}`}>
                                {tier}
                            </span>
                            <span className={`text-7xl font-black text-white tabular-nums tracking-tighter drop-shadow-2xl transition-transform duration-300 ${isImproving ? 'scale-110' : 'scale-100'}`}>
                                {score}
                            </span>
                        </div>
                    </div>

                    {/* Dynamic Status Text Bubble */}
                    <div className="mt-8 text-center">
                        <div className={`px-6 py-3 rounded-2xl bg-black/80 border backdrop-blur-md transition-colors duration-500 ${score < 500 ? 'border-[#f36e53]' : score < 700 ? 'border-[#d8a93f]' : score < 850 ? 'border-[#10b981]' : 'border-[#397dc1]'} shadow-[0_0_30px_rgba(0,0,0,0.5)]`}>
                            <p className="text-xl md:text-2xl font-black tracking-tight text-white drop-shadow-sm flex items-center gap-3">
                                <span className={`w-3 h-3 rounded-full animate-pulse transition-colors duration-500 ${score < 500 ? 'bg-[#f36e53]' : score < 700 ? 'bg-[#d8a93f]' : score < 850 ? 'bg-[#10b981]' : 'bg-[#397dc1]'}`}></span>
                                {text}
                            </p>
                        </div>
                    </div>
                </div>

                {/* Event Logs / UI Panel (Right Side) */}
                <div className="order-2 w-full max-w-md mx-auto">
                    <div className="bg-[#1e1b4b]/30 border border-white/5 rounded-3xl p-8 backdrop-blur-xl shadow-2xl relative overflow-hidden">
                        
                        {/* Decorative Top Highlight */}
                        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#397dc1] via-[#d8a93f] to-[#f36e53] opacity-50" />

                        <div className="flex items-center gap-3 mb-6">
                            <div className="w-10 h-10 rounded-full bg-[#f36e53]/20 flex items-center justify-center border border-[#f36e53]/30 text-xl shadow-[0_0_15px_rgba(243,110,83,0.3)]">
                                🤖
                            </div>
                            <div>
                                <h3 className="text-white font-bold text-lg">Reporte de Lukas</h3>
                                <p className="text-white/50 text-xs">Monitoreo en tiempo real</p>
                            </div>
                        </div>
                        
                        {/* Live Feed Event Logs */}
                        <div className="space-y-3 relative min-h-[160px] flex flex-col justify-end">
                            {logs.map((log, i) => (
                                <div
                                    key={log.id}
                                    className="flex items-center justify-between p-4 rounded-xl bg-[#0f172a]/80 border border-white/5 animate-[fade-in-up_0.4s_ease-out_forwards]"
                                >
                                    <div className="flex items-center gap-3">
                                        <span className="text-xl">
                                            {log.type === 'pos' ? '⬆️' : '⚠️'}
                                        </span>
                                        <span className="text-white/90 text-sm font-semibold">{log.text}</span>
                                    </div>
                                    <div className={`text-sm font-black px-3 py-1 rounded-lg ${
                                        log.type === 'pos' 
                                            ? 'bg-[#10b981]/10 text-[#10b981] border border-[#10b981]/20' 
                                            : 'bg-[#f36e53]/10 text-[#f36e53] border border-[#f36e53]/20'
                                    }`}>
                                        {log.type === 'pos' ? '+' : ''}{log.value}
                                    </div>
                                </div>
                            ))}
                            
                            {logs.length === 0 && (
                                <div className="text-white/40 text-sm font-medium flex flex-col items-center justify-center h-full pb-8">
                                    <div className="w-8 h-8 rounded-full border-2 border-white/20 border-t-white/80 animate-spin mb-3" />
                                    Analizando transacciones...
                                </div>
                            )}
                        </div>
                    </div>
                </div>

            </div>
        </section>
    );
}
