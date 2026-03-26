"use client";

import React, { useState, useEffect } from 'react';

export default function FinScore() {
    const [score, setScore] = useState(200);
    const [logs, setLogs] = useState<{ id: number, text: string, type: 'pos' | 'neg', value: number }[]>([]);

    // Function to calculate color and text based on score
    const getScoreData = (currentScore: number) => {
        if (currentScore < 400) {
            return {
                color: "#ff7a59", // Red/Orange alert
                colorClass: "text-[#ff7a59]",
                glowClass: "shadow-[0_0_30px_rgba(255,122,89,0.3)]",
                text: "Estás en modo supervivencia.",
                gradient: "from-[#ff7a59] to-[#ff4b4b]"
            };
        } else if (currentScore < 700) {
            return {
                color: "#f59e0b", // Orange/Yellow
                colorClass: "text-[#f59e0b]",
                glowClass: "shadow-[0_0_30px_rgba(245,158,11,0.3)]",
                text: "Vas mejorando, pero todavía hay fugas.",
                gradient: "from-[#f59e0b] to-[#fbbf24]"
            };
        } else {
            return {
                color: "#6ee7b7", // Success Green
                colorClass: "text-[#6ee7b7]",
                glowClass: "shadow-[0_0_30px_rgba(110,231,183,0.3)]",
                text: "Finanzas nivel rey.",
                gradient: "from-[#6ee7b7] to-[#10b981]"
            };
        }
    };

    const { color, colorClass, text, glowClass, gradient } = getScoreData(score);

    // SVG Speedometer Math
    const radius = 130;
    const circumference = Math.PI * radius; // Half circle
    // Mapping 0-1000 to the stroke dashoffset
    const fillPercentage = Math.max(0, Math.min(1000, score)) / 1000;
    const dashoffset = circumference - (fillPercentage * circumference);

    const applyAction = (actionText: string, value: number) => {
        const newScore = Math.max(0, Math.min(1000, score + value));
        setScore(newScore);
        const newLog = {
            id: Date.now(),
            text: actionText,
            type: value >= 0 ? 'pos' : 'neg' as 'pos' | 'neg',
            value: value
        };
        setLogs(prev => [newLog, ...prev].slice(0, 3)); // keep last 3
    };

    // Demo sequence effect
    useEffect(() => {
        // Initial sequence to show the gauge animating up
        const timers = [
            setTimeout(() => applyAction("Ahorro programado detectado", 300), 1000), // -> 500
            setTimeout(() => applyAction("Gasto hormiga: Domicilio extra", -40), 3000), // -> 460
            setTimeout(() => applyAction("Racha de ahorro (7 días seca)", 150), 5000), // -> 610
            setTimeout(() => applyAction("Ahorro programado + Inversión", 250), 7000), // -> 860
        ];
        return () => timers.forEach(clearTimeout);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <section className="relative py-32 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-white/5 bg-[#0a0618]">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

                {/* Text Content */}
                <div className="order-2 lg:order-1">
                    <h2 className="text-4xl md:text-5xl lg:text-6xl font-black mb-6 tracking-tight">
                        <span className="text-white">Tu salud financiera ahora tiene </span>
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#6ee7b7] to-[#4cc9f0]">
                            puntaje.
                        </span>
                    </h2>
                    <p className="text-white/70 text-lg md:text-xl leading-relaxed mb-10">
                        Deja atrás la adivinanza. Lukas evalúa cada movimiento de tus cuentas y te asigna un FinScore de 0 a 1000.
                        Mejóralo optimizando tu gasto y desbloquea recompensas reales.
                    </p>

                    {/* Interactive Simulation Panel */}
                    <div className="bg-white/5 border border-white/10 rounded-3xl p-6 backdrop-blur-md">
                        <h3 className="text-white text-sm font-bold uppercase tracking-wider mb-4 opacity-80">Simulador Web</h3>
                        <div className="flex flex-wrap gap-3">
                            <button
                                onClick={() => applyAction("Ahorro programado detectado", 30)}
                                className="text-xs font-semibold px-4 py-2 rounded-xl bg-[#6ee7b7]/10 text-[#6ee7b7] border border-[#6ee7b7]/30 hover:bg-[#6ee7b7]/20 transition-colors"
                            >
                                + Ahorro programado (+30)
                            </button>
                            <button
                                onClick={() => applyAction("Racha de ahorro (7 días)", 15)}
                                className="text-xs font-semibold px-4 py-2 rounded-xl bg-[#4cc9f0]/10 text-[#4cc9f0] border border-[#4cc9f0]/30 hover:bg-[#4cc9f0]/20 transition-colors"
                            >
                                + Racha de ahorro (+15)
                            </button>
                            <button
                                onClick={() => applyAction("Gasto hormiga recurrente", -20)}
                                className="text-xs font-semibold px-4 py-2 rounded-xl bg-[#ff7a59]/10 text-[#ff7a59] border border-[#ff7a59]/30 hover:bg-[#ff7a59]/20 transition-colors"
                            >
                                - Gasto hormiga (-20)
                            </button>
                        </div>

                        {/* Event Logs */}
                        <div className="mt-6 space-y-2 relative h-32 overflow-hidden">
                            {logs.map((log, i) => (
                                <div
                                    key={log.id}
                                    className="flex items-center justify-between p-3 rounded-lg bg-black/40 border border-white/5 animate-[fade-in-up_0.3s_ease-out_forwards]"
                                    style={{ opacity: 1 - i * 0.3 }}
                                >
                                    <span className="text-white/80 text-sm font-medium">{log.text}</span>
                                    <span className={`text-sm font-bold ${log.type === 'pos' ? 'text-[#6ee7b7]' : 'text-[#ff7a59]'}`}>
                                        {log.type === 'pos' ? '+' : ''}{log.value}
                                    </span>
                                </div>
                            ))}
                            {logs.length === 0 && (
                                <div className="text-white/30 text-sm italic text-center mt-8">Esperando eventos financieros...</div>
                            )}
                        </div>
                    </div>
                </div>

                {/* Speedometer Visualization */}
                <div className="order-1 lg:order-2 relative flex flex-col items-center">

                    {/* Background Ambient Glow */}
                    <div
                        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] h-[350px] rounded-full blur-[100px] transition-colors duration-1000 -z-10 opacity-40"
                        style={{ backgroundColor: color }}
                    />

                    <div className={`relative w-full max-w-sm aspect-square flex flex-col items-center justify-center bg-black/40 backdrop-blur-xl border border-white/10 rounded-full ${glowClass} transition-shadow duration-1000 p-8`}>

                        {/* SVG Speedometer Gauge */}
                        <div className="absolute inset-0 flex items-center justify-center">
                            <svg
                                className="w-[90%] h-[90%] transform rotate-180"
                                viewBox="0 0 300 300"
                                preserveAspectRatio="xMidYMid meet"
                            >
                                {/* Defs for Glow Filter */}
                                <defs>
                                    <filter id="gaugeGlow" x="-20%" y="-20%" width="140%" height="140%">
                                        <feGaussianBlur stdDeviation="8" result="blur" />
                                        <feComposite in="SourceGraphic" in2="blur" operator="over" />
                                    </filter>
                                    <linearGradient id="gaugeGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                                        <stop offset="0%" stopColor="#ff7a59" />
                                        <stop offset="50%" stopColor="#f59e0b" />
                                        <stop offset="100%" stopColor="#6ee7b7" />
                                    </linearGradient>
                                </defs>

                                {/* Track Background (Half Circle) */}
                                <path
                                    d="M 20 150 A 130 130 0 0 1 280 150"
                                    fill="none"
                                    stroke="rgba(255,255,255,0.05)"
                                    strokeWidth="24"
                                    strokeLinecap="round"
                                />

                                {/* Active Colored Track */}
                                <path
                                    d="M 20 150 A 130 130 0 0 1 280 150"
                                    fill="none"
                                    stroke="url(#gaugeGradient)"
                                    strokeWidth="24"
                                    strokeLinecap="round"
                                    strokeDasharray={circumference}
                                    strokeDashoffset={dashoffset}
                                    className="transition-all duration-[1200ms] ease-out"
                                    filter="url(#gaugeGlow)"
                                />
                            </svg>
                        </div>

                        {/* Score Numbers */}
                        <div className="relative z-10 flex flex-col items-center mt-12">
                            <span className="text-white/40 font-bold uppercase tracking-widest text-xs mb-1">
                                FinScore Global
                            </span>
                            <span className="text-7xl font-black text-white tabular-nums tracking-tighter drop-shadow-2xl">
                                {score}
                            </span>
                            <span className="text-white/30 text-xs font-semibold mt-1">
                                / 1000 MAX
                            </span>
                        </div>

                    </div>

                    {/* Dynamic Status Text */}
                    <div className="mt-8 text-center animate-[fade-in-up_0.5s_ease-out]">
                        <div className={`px-6 py-3 rounded-2xl bg-gradient-to-b ${gradient} bg-opacity-10 border border-white/10 shadow-2xl`}>
                            <p className={`text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r ${gradient}`}>
                                {text}
                            </p>
                        </div>
                    </div>

                </div>

            </div>
        </section>
    );
}
