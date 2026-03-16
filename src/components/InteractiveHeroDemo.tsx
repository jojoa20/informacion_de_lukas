"use client";

import React, { useState, useEffect } from 'react';

export default function InteractiveHeroDemo() {
    const [step, setStep] = useState(0);
    const [score, setScore] = useState(740);

    useEffect(() => {
        const timer = setInterval(() => {
            setStep((prev) => (prev + 1) % 5);
        }, 3000);

        return () => clearInterval(timer);
    }, []);

    useEffect(() => {
        if (step === 4) {
            setScore(735); // Impact -5
        } else if (step === 0) {
            setScore(740); // Reset
        }
    }, [step]);

    return (
        <div className="flex-1 p-4 flex flex-col gap-4 relative h-full">
            
            {/* FinScore Mini Widget Reacting */}
            <div className={`w-full bg-white/5 border border-white/10 rounded-2xl p-3 flex flex-col items-center transition-all duration-500 ${step === 4 ? 'ring-2 ring-[#f36e53]/50 bg-[#f36e53]/5 scale-[1.02]' : ''}`}>
                <h3 className="text-white/50 text-[10px] font-bold uppercase tracking-widest mb-1">FinScore</h3>
                <div className="relative w-20 h-10 overflow-hidden flex justify-center mt-1">
                    <div 
                        className={`absolute top-0 w-20 h-20 rounded-full border-4 border-white/10 transition-all duration-1000 ease-out`}
                        style={{ 
                            borderColor: 'transparent',
                            borderTopColor: step >= 4 ? '#f36e53' : '#d8a93f',
                            borderRightColor: step >= 4 ? '#f36e53' : '#d8a93f',
                            transform: `rotate(${step >= 4 ? -60 : -45}deg)` 
                        }}
                    />
                    <div className={`absolute bottom-0 text-xl font-black text-white transition-all duration-500 ${step === 4 ? 'text-[#f36e53]' : ''}`}>
                        {score}
                    </div>
                </div>
                <div className="flex items-center gap-1 mt-1">
                    <span className={`text-[9px] font-bold px-1.5 py-0.5 rounded ${step === 4 ? 'bg-[#f36e53]/20 text-[#f36e53]' : 'bg-[#d8a93f]/20 text-[#d8a93f]'}`}>
                        {step === 4 ? 'Impacto -5' : 'Nivel Rey'}
                    </span>
                </div>
            </div>

            {/* Chat Area */}
            <div className="flex-1 flex flex-col gap-3 overflow-hidden justify-end pb-2">
                
                {/* User Message */}
                {step >= 1 && (
                    <div className="flex justify-end animate-[fade-in-up_0.4s_ease-out]">
                        <div className="bg-[#397dc1] text-white text-[11px] font-medium px-3 py-2 rounded-2xl rounded-tr-none max-w-[80%] shadow-lg">
                            Lukas gasté 15 lucas en empanadas
                        </div>
                    </div>
                )}

                {/* Lukas Typing Animation */}
                {step === 2 && (
                    <div className="flex justify-start animate-fade-in">
                        <div className="bg-white/10 text-white px-3 py-2 rounded-2xl rounded-tl-none flex gap-1">
                            <span className="w-1 h-1 bg-white/40 rounded-full animate-bounce" />
                            <span className="w-1 h-1 bg-white/40 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }} />
                            <span className="w-1 h-1 bg-white/40 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }} />
                        </div>
                    </div>
                )}

                {/* Lukas Analysis Result */}
                {step >= 3 && (
                    <div className="flex justify-start animate-[fade-in-up_0.4s_ease-out]">
                        <div className="bg-white/5 border border-white/10 backdrop-blur-md p-3 rounded-2xl rounded-tl-none max-w-[90%] shadow-xl">
                            <div className="flex items-center gap-2 mb-2">
                                <div className="w-5 h-5 rounded-full bg-[#f36e53]/20 flex items-center justify-center text-[10px] text-[#f36e53]">💸</div>
                                <span className="text-white text-[11px] font-bold">Gasto Detectado</span>
                            </div>
                            <div className="space-y-1.5 border-l border-white/10 pl-2">
                                <p className="text-white/60 text-[10px]">Categoría: <span className="text-white font-semibold">Comida</span></p>
                                <p className="text-white/60 text-[10px]">Monto: <span className="text-white font-semibold">$15.000</span></p>
                                <p className="text-[#f36e53] text-[10px] font-bold animate-pulse">Impacto en FinScore: -5</p>
                            </div>
                        </div>
                    </div>
                )}
            </div>

            {/* Decorative bottom element */}
            <div className="absolute top-[280px] left-1/2 -translate-x-1/2 opacity-20 pointer-events-none">
                <div className="w-32 h-32 bg-[#397dc1] rounded-full blur-[40px]" />
            </div>

        </div>
    );
}
