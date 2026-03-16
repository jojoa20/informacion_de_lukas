"use client";

import React, { useEffect, useState } from 'react';

export default function CTA() {
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    return (
        <section className="relative py-40 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto text-center mt-12 mb-20 overflow-hidden border-t border-white/5 bg-[#0f172a] rounded-[3rem]">

            {/* Background Animation: Nodes Converging to Central AI Node */}
            <div className="absolute inset-0 flex items-center justify-center opacity-80 pointer-events-none z-0">

                {/* Central AI Core Glow */}
                <div className="absolute w-[400px] h-[400px] bg-gradient-to-tr from-[#397dc1]/30 to-[#a898c9]/20 rounded-full blur-[100px] animate-[pulse_4s_cubic-bezier(0.4,0,0.6,1)_infinite]" />

                {mounted && (
                    <svg className="absolute w-full h-[600px] max-w-4xl opacity-60" viewBox="0 0 800 600">
                        <defs>
                            <radialGradient id="aiCore" cx="50%" cy="50%" r="50%">
                                <stop offset="0%" stopColor="#397dc1" stopOpacity="1" />
                                <stop offset="100%" stopColor="#21428d" stopOpacity="0" />
                            </radialGradient>
                            <filter id="glow">
                                <feGaussianBlur stdDeviation="4" result="coloredBlur" />
                                <feMerge>
                                    <feMergeNode in="coloredBlur" />
                                    <feMergeNode in="SourceGraphic" />
                                </feMerge>
                            </filter>
                        </defs>

                        {/* Central AI Node */}
                        <circle cx="400" cy="300" r="16" fill="#397dc1" filter="url(#glow)" className="animate-[pulse_2s_ease-in-out_infinite]" />
                        <circle cx="400" cy="300" r="60" fill="url(#aiCore)" className="animate-[pulse_3s_ease-in-out_infinite]" />
                        
                        {/* Orbiting rings */}
                        <circle cx="400" cy="300" r="100" fill="none" stroke="#397dc1" strokeWidth="1" strokeOpacity="0.3" className="animate-[spin_12s_linear_infinite]" strokeDasharray="15 10" />
                        <circle cx="400" cy="300" r="150" fill="none" stroke="#a898c9" strokeWidth="1" strokeOpacity="0.2" className="animate-[spin_20s_linear_infinite_reverse]" strokeDasharray="8 20" />
                        <circle cx="400" cy="300" r="220" fill="none" stroke="#21428d" strokeWidth="1" strokeOpacity="0.4" className="animate-[spin_30s_linear_infinite]" strokeDasharray="4 30" />

                        {/* Converging Lines & Nodes */}
                        {/* Top Left -> Center */}
                        <line x1="100" y1="100" x2="400" y2="300" stroke="#397dc1" strokeWidth="1" strokeOpacity="0.2" />
                        <circle cx="100" cy="100" r="4" fill="#d8a93f" filter="url(#glow)">
                            <animate attributeName="cx" values="100;400;100" dur="6s" repeatCount="indefinite" />
                            <animate attributeName="cy" values="100;300;100" dur="6s" repeatCount="indefinite" />
                            <animate attributeName="opacity" values="0;1;0" dur="6s" repeatCount="indefinite" />
                        </circle>

                        {/* Top Right -> Center */}
                        <line x1="700" y1="150" x2="400" y2="300" stroke="#a898c9" strokeWidth="1" strokeOpacity="0.2" />
                        <circle cx="700" cy="150" r="4" fill="#f36e53" filter="url(#glow)">
                            <animate attributeName="cx" values="700;400;700" dur="5s" begin="1s" repeatCount="indefinite" />
                            <animate attributeName="cy" values="150;300;150" dur="5s" begin="1s" repeatCount="indefinite" />
                            <animate attributeName="opacity" values="0;1;0" dur="5s" begin="1s" repeatCount="indefinite" />
                        </circle>

                        {/* Bottom Left -> Center */}
                        <line x1="150" y1="500" x2="400" y2="300" stroke="#f36e53" strokeWidth="1" strokeOpacity="0.1" />
                        <circle cx="150" cy="500" r="5" fill="#a898c9" filter="url(#glow)">
                            <animate attributeName="cx" values="150;400;150" dur="7s" begin="2s" repeatCount="indefinite" />
                            <animate attributeName="cy" values="500;300;500" dur="7s" begin="2s" repeatCount="indefinite" />
                            <animate attributeName="opacity" values="0;1;0" dur="7s" begin="2s" repeatCount="indefinite" />
                        </circle>

                        {/* Bottom Right -> Center */}
                        <line x1="650" y1="450" x2="400" y2="300" stroke="#d8a93f" strokeWidth="1" strokeOpacity="0.15" />
                        <circle cx="650" cy="450" r="4" fill="#397dc1" filter="url(#glow)">
                            <animate attributeName="cx" values="650;400;650" dur="5.5s" begin="0.5s" repeatCount="indefinite" />
                            <animate attributeName="cy" values="450;300;450" dur="5.5s" begin="0.5s" repeatCount="indefinite" />
                            <animate attributeName="opacity" values="0;1;0" dur="5.5s" begin="0.5s" repeatCount="indefinite" />
                        </circle>

                        {/* Far Left -> Center */}
                        <line x1="0" y1="300" x2="400" y2="300" stroke="#21428d" strokeWidth="1" strokeOpacity="0.3" />
                        <circle cx="0" cy="300" r="3" fill="#f36e53" filter="url(#glow)">
                            <animate attributeName="cx" values="0;400;0" dur="8s" begin="3s" repeatCount="indefinite" />
                            <animate attributeName="opacity" values="0;1;0" dur="8s" begin="3s" repeatCount="indefinite" />
                        </circle>

                        {/* Far Right -> Center */}
                        <line x1="800" y1="200" x2="400" y2="300" stroke="#397dc1" strokeWidth="1" strokeOpacity="0.2" />
                        <circle cx="800" cy="200" r="4" fill="#d8a93f" filter="url(#glow)">
                            <animate attributeName="cx" values="800;400;800" dur="6.5s" begin="1.5s" repeatCount="indefinite" />
                            <animate attributeName="cy" values="200;300;200" dur="6.5s" begin="1.5s" repeatCount="indefinite" />
                            <animate attributeName="opacity" values="0;1;0" dur="6.5s" begin="1.5s" repeatCount="indefinite" />
                        </circle>
                    </svg>
                )}
            </div>

            <div className="relative z-10 p-12 md:p-16 rounded-3xl bg-[#1e1b4b]/60 border border-white/10 backdrop-blur-2xl shadow-[0_0_50px_rgba(33,66,141,0.2)] overflow-hidden max-w-4xl mx-auto">
                
                {/* Decorative inner gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#397dc1]/10 to-transparent pointer-events-none" />

                <h2 className="text-5xl md:text-7xl lg:text-8xl font-black mb-8 text-white tracking-tighter drop-shadow-2xl relative z-10 leading-[0.9]">
                    Empieza a entender tu dinero.
                </h2>

                <p className="text-xl md:text-2xl font-medium text-white/80 mb-12 max-w-2xl mx-auto relative z-10">
                    Conecta tus cuentas o registra tus gastos y deja que Lukas haga el resto.
                </p>

                <button
                    className="relative group px-12 md:px-16 py-5 md:py-6 rounded-full bg-white text-black font-black text-xl md:text-2xl transition-all duration-300 hover:scale-105 hover:shadow-[0_0_60px_rgba(255,255,255,0.4)] active:scale-95 overflow-hidden z-20"
                >
                    <span className="relative z-10">Empezar gratis</span>
                    <div className="absolute inset-0 bg-gradient-to-r from-lukas-primary/20 via-transparent to-lukas-primary/20 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
                </button>

            </div>
        </section>
    );
}
