"use client";

import React from 'react';

const MESSAGES = [
    {
        id: "good",
        status: "Good score",
        text: "¡Excelente, pana! Este mes vas volando.",
        sub: "Sigue así y el FinScore llegará al máximo.",
        icon: "🚀",
        color: "#10b981", // Success Green
        bg: "bg-[#10b981]/10",
        border: "border-[#10b981]/20",
        glow: "shadow-[0_0_30px_rgba(16,185,129,0.15)]"
    },
    {
        id: "bad",
        status: "Bad spending",
        text: "Ojo… estás mecateando mucha plata en domicilios.",
        sub: "Lukas detectó un aumento anormal en apps de comida.",
        icon: "🍔",
        color: "#f97316", // Warning Orange
        bg: "bg-[#f97316]/10",
        border: "border-[#f97316]/20",
        glow: "shadow-[0_0_30px_rgba(249,115,22,0.15)]"
    },
    {
        id: "critical",
        status: "Critical",
        text: "Este mes ya no puedes gastar más.",
        sub: "Has alcanzado tu límite de seguridad financiera.",
        icon: "🚨",
        color: "#f36e53", // Alert Coral
        bg: "bg-[#f36e53]/10",
        border: "border-[#f36e53]/20",
        glow: "shadow-[0_0_30px_rgba(243,110,83,0.15)]"
    }
];

export default function AIPersonality() {
    return (
        <section className="relative py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-white/5 bg-[#0f172a] overflow-hidden">
            
            {/* Background Ambient Glow */}
            <div className="absolute inset-0 pt-24 -z-10 pointer-events-none">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[600px] bg-gradient-to-tr from-[#397dc1]/5 via-[#a898c9]/5 to-[#f36e53]/5 blur-[150px] rounded-[100%]"></div>
            </div>

            <div className="text-center mb-16 max-w-4xl mx-auto">
                <h2 className="text-4xl md:text-5xl lg:text-6xl font-black mb-6 tracking-tight text-white">
                    Lukas habla <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#397dc1] to-[#a898c9]">como tu pana.</span>
                </h2>
                <p className="text-white/70 text-lg md:text-xl leading-relaxed">
                    Olvídate de las notificaciones frías y bancarias. <br className="hidden md:block"/>
                    Lukas te dice las cosas como son, con el tono de alguien que de verdad te cuida.
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 items-stretch max-w-6xl mx-auto relative z-10">
                {MESSAGES.map((msg) => (
                    <div 
                        key={msg.id}
                        className={`group relative ${msg.bg} border ${msg.border} rounded-3xl p-8 backdrop-blur-xl flex flex-col transition-all duration-500 hover:scale-[1.03] ${msg.glow}`}
                    >
                        {/* Status Label */}
                        <div className="mb-6">
                            <span 
                                className="text-xs uppercase tracking-[0.2em] font-bold px-3 py-1 rounded-full border border-white/10 bg-white/5 bg-opacity-50"
                                style={{ color: msg.color }}
                            >
                                {msg.status}
                            </span>
                        </div>

                        {/* Chat Interface Simulation */}
                        <div className="flex-1 flex flex-col space-y-4">
                            <div className="flex items-start gap-4">
                                <div 
                                    className="w-10 h-10 shrink-0 rounded-xl flex items-center justify-center text-xl shadow-lg relative group-hover:rotate-6 transition-transform duration-300"
                                    style={{ backgroundColor: msg.color }}
                                >
                                    <span className="relative z-10">🤖</span>
                                    <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-20 rounded-xl transition-opacity"></div>
                                </div>
                                <div className="bg-white/5 border border-white/10 p-5 rounded-2xl rounded-tl-sm shadow-xl backdrop-blur-md">
                                    <p className="text-white font-semibold text-lg leading-snug mb-2">
                                        {msg.text}
                                    </p>
                                    <p className="text-white/40 text-xs font-medium">
                                        {msg.sub}
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Decorative Icon in the Corner */}
                        <div className="absolute -bottom-2 -right-2 text-6xl opacity-10 grayscale group-hover:grayscale-0 group-hover:opacity-30 transition-all duration-700 pointer-events-none transform group-hover:-translate-y-2 group-hover:-translate-x-2">
                            {msg.icon}
                        </div>
                    </div>
                ))}
            </div>

            {/* Bottom highlight line */}
            <div className="mt-20 w-32 h-1 bg-gradient-to-r from-transparent via-white/10 to-transparent mx-auto"></div>
        </section>
    );
}

