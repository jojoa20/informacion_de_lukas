"use client";

import React, { useState, useEffect } from 'react';

export default function InteractiveDemo() {
    // 0 = Initial state, 1 = User message sent, 2 = AI processing, 3 = Result generated.
    const [step, setStep] = useState(0);
    const [displayScore, setDisplayScore] = useState(850);

    // Smoothly animate score from 850 down to 845 when step reaches 3
    useEffect(() => {
        if (step === 3) {
            let current = 850;
            const target = 845;
            const interval = setInterval(() => {
                current -= 1;
                setDisplayScore(current);
                if (current <= target) clearInterval(interval);
            }, 100);
            return () => clearInterval(interval);
        } else if (step === 0) {
            setDisplayScore(850);
        }
    }, [step]);

    const handleSend = () => {
        if (step !== 0) return;
        setStep(1);
        
        setTimeout(() => {
            setStep(2);
        }, 600);

        setTimeout(() => {
            setStep(3);
        }, 2500);
    };

    const resetDemo = () => {
        setStep(0);
    };

    // Gauge calculation
    const radius = 60;
    const strokeWidth = 10;
    const circumference = Math.PI * radius; // Half circle
    const offset = circumference - (displayScore / 1000) * circumference;

    return (
        <section className="relative py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-white/5 bg-[#0f172a] overflow-hidden">
            
            <div className="absolute inset-0 pt-24 -z-10 pointer-events-none">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-gradient-to-r from-[#397dc1]/10 via-transparent to-[#f36e53]/10 blur-[120px] rounded-[100%]"></div>
            </div>

            <div className="text-center mb-16 max-w-3xl mx-auto">
                <h2 className="text-4xl md:text-5xl lg:text-5xl font-black mb-4 tracking-tight text-white drop-shadow-lg">
                    Prueba Lukas ahora
                </h2>
                <p className="text-white/70 text-lg md:text-xl leading-relaxed">
                    Experimenta cómo Lukas entiende tus gastos al instante y calcula el impacto en tu salud financiera en tiempo real.
                </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-start max-w-5xl mx-auto">
                
                {/* Chat Interface */}
                <div className="bg-[#1e1b4b]/50 border border-white/10 rounded-3xl p-6 backdrop-blur-xl flex flex-col h-[450px] shadow-[0_0_30px_rgba(33,66,141,0.2)]">
                    
                    <div className="flex-1 overflow-y-auto space-y-4 pr-2 flex flex-col pointer-events-none">
                        
                        {/* AI Initial Greeting */}
                        <div className="flex items-start gap-3">
                            <div className="w-8 h-8 shrink-0 rounded-full bg-gradient-to-br from-[#397dc1] to-[#a898c9] flex items-center justify-center shadow-lg text-sm">
                                🤖
                            </div>
                            <div className="bg-[#21428d] text-white p-3 rounded-2xl rounded-tl-sm self-start max-w-[85%] shadow-md">
                                <p className="text-sm">¡Hola! Dime qué gastaste hoy y yo lo registro por ti.</p>
                            </div>
                        </div>

                        {/* User Message */}
                        {step >= 1 && (
                            <div className="bg-[#397dc1]/20 text-white p-3 rounded-2xl rounded-tr-sm self-end max-w-[85%] border border-[#397dc1]/30 shadow-md animate-[fade-in-up_0.3s_ease-out_forwards]">
                                <p className="text-sm">Lukas gasté 15 lucas en empanadas</p>
                            </div>
                        )}

                        {/* AI Typing Indicator */}
                        {step === 2 && (
                            <div className="flex items-start gap-3 animate-[fade-in-up_0.3s_ease-out_forwards]">
                                <div className="w-8 h-8 shrink-0 rounded-full bg-gradient-to-br from-[#397dc1] to-[#a898c9] flex items-center justify-center shadow-lg text-sm">
                                    🤖
                                </div>
                                <div className="bg-[#21428d] text-white p-3 px-4 rounded-2xl rounded-tl-sm self-start flex gap-1 items-center h-11">
                                    <div className="w-2 h-2 bg-white/60 rounded-full animate-bounce [animation-delay:-0.3s]"></div>
                                    <div className="w-2 h-2 bg-white/60 rounded-full animate-bounce [animation-delay:-0.15s]"></div>
                                    <div className="w-2 h-2 bg-white/60 rounded-full animate-bounce"></div>
                                </div>
                            </div>
                        )}

                        {/* AI Response */}
                        {step === 3 && (
                            <div className="flex items-start gap-3 animate-[fade-in-up_0.3s_ease-out_forwards]">
                                <div className="w-8 h-8 shrink-0 rounded-full bg-gradient-to-br from-[#397dc1] to-[#a898c9] flex items-center justify-center shadow-lg text-sm">
                                    🤖
                                </div>
                                <div className="bg-[#21428d] text-white p-3 rounded-2xl rounded-tl-sm self-start max-w-[85%] shadow-[0_4px_15px_rgba(33,66,141,0.4)]">
                                    <p className="text-sm">¡Anotado! 15 lucas en empanadas. Ojo que eso baja un poquito tu FinScore. Acuérdate de la meta. 🥟</p>
                                </div>
                            </div>
                        )}

                    </div>

                    {/* Chat Input Area */}
                    <div className="mt-4 pt-4 border-t border-white/10 shrink-0">
                        {step === 0 ? (
                            <button 
                                onClick={handleSend}
                                className="w-full flex items-center justify-between bg-white/5 border border-white/10 hover:bg-white/10 hover:border-[#397dc1]/50 transition-all rounded-xl p-3 text-left group"
                            >
                                <span className="text-white/60 text-sm group-hover:text-white transition-colors">Enviar: "Lukas gasté 15 lucas en empanadas"</span>
                                <div className="bg-[#397dc1] p-1.5 rounded-lg group-hover:scale-110 transition-transform">
                                    <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"></path></svg>
                                </div>
                            </button>
                        ) : (
                            <button 
                                onClick={resetDemo}
                                className="w-full text-center text-[#a898c9] hover:text-white text-sm transition-colors py-2"
                            >
                                Reiniciar Demo
                            </button>
                        )}
                    </div>

                </div>


                {/* AI Interpretation & FinScore Output */}
                <div className="bg-[#1e1b4b]/30 border border-white/10 rounded-3xl p-6 md:p-8 backdrop-blur-xl flex flex-col items-center justify-center h-[450px] relative overflow-hidden transition-colors duration-500 hover:border-white/20">
                    
                    {/* Background Grid */}
                    <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:20px_20px] [mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,#000_30%,transparent_100%)] pointer-events-none opacity-50"></div>

                    {step === 0 && (
                        <div className="text-center opacity-50 text-white/50 animate-pulse">
                            <div className="w-16 h-16 mx-auto mb-4 border-2 border-dashed border-white/20 rounded-full flex items-center justify-center">
                                <span className="text-2xl">⚡️</span>
                            </div>
                            <p className="text-sm uppercase tracking-widest font-semibold">Esperando Datos</p>
                        </div>
                    )}

                    {step === 1 && (
                        <div className="text-center text-[#397dc1] animate-pulse">
                            <div className="w-16 h-16 mx-auto mb-4 rounded-full border-[3px] border-[#397dc1]/30 border-t-[#397dc1] animate-spin"></div>
                            <p className="text-sm uppercase tracking-widest font-bold">Iniciando Análisis...</p>
                        </div>
                    )}

                    {(step === 2 || step === 3) && (
                        <div className="w-full h-full flex flex-col items-center justify-between text-center z-10 animate-[fade-in-up_0.4s_ease-out_forwards]">
                            
                            {/* Receipt Data */}
                            <div className="bg-black/40 border border-[#f36e53]/30 rounded-xl p-4 w-full text-left shadow-[0_0_20px_rgba(243,110,83,0.1)] transition-all duration-500">
                                <div className="flex items-center gap-2 mb-3">
                                    <div className="w-2 h-2 rounded-full bg-[#f36e53] animate-pulse"></div>
                                    <span className="text-[#f36e53] text-xs font-bold uppercase tracking-wider">Transacción detectada</span>
                                </div>
                                <div className="space-y-2 border-t border-white/10 pt-3">
                                    <div className="flex justify-between">
                                        <span className="text-white/50 text-sm">Monto:</span>
                                        <span className="text-white font-mono font-bold">$15.000 COP</span>
                                    </div>
                                    <div className="flex justify-between items-center">
                                        <span className="text-white/50 text-sm">Categoría:</span>
                                        <span className="bg-[#f36e53]/20 text-[#f36e53] text-xs px-2 py-0.5 rounded-md font-semibold">Comida</span>
                                    </div>
                                    <div className="flex justify-between items-center">
                                        <span className="text-white/50 text-sm">Impacto en FinScore:</span>
                                        <span className={`text-xs px-2 py-0.5 rounded-md font-bold transition-all duration-300 ${step === 3 ? 'text-[#f36e53] drop-shadow-[0_0_8px_rgba(243,110,83,0.8)]' : 'text-white/30'}`}>-5 Pts</span>
                                    </div>
                                </div>
                            </div>

                            {/* Mini FinScore Gauge */}
                            <div className="mt-8 relative w-[160px] h-[100px] flex items-end justify-center">
                                <svg width="160" height="90" viewBox="0 0 160 90" className="overflow-visible">
                                    {/* Track */}
                                    <path
                                        d="M 10 80 A 70 70 0 0 1 150 80"
                                        fill="none"
                                        stroke="rgba(255,255,255,0.05)"
                                        strokeWidth={strokeWidth}
                                        strokeLinecap="round"
                                    />
                                    {/* Gradient fill */}
                                    <path
                                        d="M 10 80 A 70 70 0 0 1 150 80"
                                        fill="none"
                                        stroke="url(#miniGradient)"
                                        strokeWidth={strokeWidth}
                                        strokeLinecap="round"
                                        strokeDasharray={circumference}
                                        strokeDashoffset={step === 3 ? offset : circumference - (850 / 1000) * circumference}
                                        className="transition-all duration-1000 ease-in-out"
                                    />
                                    <defs>
                                        <linearGradient id="miniGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                                            <stop offset="0%" stopColor="#f36e53" />
                                            <stop offset="30%" stopColor="#f97316" />
                                            <stop offset="60%" stopColor="#d8a93f" />
                                            <stop offset="100%" stopColor="#10b981" />
                                        </linearGradient>
                                    </defs>
                                </svg>
                                <div className="absolute -bottom-2 flex flex-col items-center">
                                    <span className="text-3xl font-black font-mono tracking-tighter text-white drop-shadow-[0_0_10px_rgba(255,255,255,0.3)]">
                                        {displayScore}
                                    </span>
                                    <span className="text-[10px] text-white/40 uppercase font-bold tracking-widest mt-1">Tu Puntaje</span>
                                </div>

                                {/* Event Impact Bubble */}
                                {step === 3 && (
                                    <div className="absolute top-0 right-0 animate-[fade-in-up_0.5s_ease-out_forwards_bounce]">
                                        <span className="bg-[#f36e53] text-white text-xs font-bold px-2 py-1 rounded-full shadow-[0_4px_10px_rgba(243,110,83,0.5)]">
                                            -5
                                        </span>
                                    </div>
                                )}
                            </div>

                        </div>
                    )}
                </div>
            </div>
        </section>
    );
}
