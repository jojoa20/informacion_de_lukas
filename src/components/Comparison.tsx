"use client";

import React from 'react';

const TRADITIONAL_ITEMS = [
    "Registro de gastos manual",
    "Formularios y hojas de cálculo",
    "Sin inteligencia"
];

export default function Comparison() {
    return (
        <section className="relative py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-white/5 bg-[#0f172a] overflow-hidden">
            
            {/* Background Glows */}
            <div className="absolute inset-0 pt-24 -z-10 pointer-events-none flex justify-between">
                <div className="w-[400px] h-[400px] bg-red-500/5 blur-[120px] rounded-[100%] translate-y-20 -translate-x-20"></div>
                <div className="w-[400px] h-[400px] bg-[#397dc1]/10 blur-[120px] rounded-[100%] translate-y-20 translate-x-20"></div>
            </div>

            <div className="text-center mb-16 max-w-3xl mx-auto relative z-10">
                <h2 className="text-4xl md:text-5xl lg:text-5xl font-black mb-6 tracking-tight text-white drop-shadow-lg">
                    Apps de presupuesto tradicionales <br/>
                    <span className="text-white/40 font-light text-3xl">vs</span> <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#397dc1] to-[#6ee7b7]">Lukas AI</span>
                </h2>
                <p className="text-white/70 text-lg md:text-xl leading-relaxed">
                    Deja las hojas de cálculo en el pasado. Descubre la diferencia de tener una Inteligencia Artificial trabajando para ti 24/7.
                </p>
            </div>

            <div className="flex flex-col lg:flex-row items-stretch justify-center gap-6 max-w-5xl mx-auto relative z-10">
                
                {/* Column 1: Traditional */}
                <div className="flex-1 bg-white/5 border border-white/10 rounded-3xl p-8 lg:p-10 opacity-70 flex flex-col transition-all duration-300 hover:opacity-100 spotlight-card">
                    <div className="flex items-center gap-3 mb-8 pb-6 border-b border-white/10">
                        <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center text-xl grayscale">
                            📊
                        </div>
                        <h3 className="text-2xl font-bold text-white/50 tracking-wide">
                            Apps Tradicionales
                        </h3>
                    </div>
                    
                    <ul className="space-y-6 flex-1">
                        <li className="flex items-center gap-4 text-white/50">
                            <span className="text-red-400/50 flex-shrink-0">
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
                            </span>
                            <span className="text-lg">Registro de gastos manual</span>
                        </li>
                        <li className="flex items-center gap-4 text-white/50">
                            <span className="text-red-400/50 flex-shrink-0">
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
                            </span>
                            <span className="text-lg">Formularios y hojas de cálculo</span>
                        </li>
                        <li className="flex items-center gap-4 text-white/50">
                            <span className="text-red-400/50 flex-shrink-0">
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
                            </span>
                            <span className="text-lg">Sin inteligencia</span>
                        </li>
                    </ul>
                </div>

                {/* Column 2: Lukas AI */}
                <div className="flex-1 bg-[#1e1b4b]/60 border-2 border-[#397dc1]/30 rounded-3xl p-8 lg:p-10 shadow-[0_0_50px_rgba(57,125,193,0.15)] flex flex-col relative transform lg:-translate-y-4 transition-transform duration-500 hover:-translate-y-6 spotlight-card">
                    
                    {/* Glowing highlight edge */}
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-[2px] bg-gradient-to-r from-transparent via-[#397dc1] to-transparent"></div>

                    <div className="flex items-center gap-3 mb-8 pb-6 border-b border-white/10">
                        <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-[#397dc1] to-[#a898c9] flex items-center justify-center text-xl shadow-[0_0_15px_rgba(57,125,193,0.5)]">
                            🤖
                        </div>
                        <h3 className="text-2xl font-bold text-white tracking-wide">
                            Lukas AI
                        </h3>
                    </div>
                    
                    <ul className="space-y-6 flex-1">
                        <li className="flex items-start gap-4 text-white">
                            <span className="text-[#10b981] flex-shrink-0 mt-0.5">
                                <svg className="w-6 h-6 drop-shadow-[0_0_5px_rgba(16,185,129,0.5)]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"></path></svg>
                            </span>
                            <div>
                                <span className="text-lg font-semibold block">Registro por chat</span>
                                <span className="text-white/50 text-sm">Háblale como a un amigo, cero formularios.</span>
                            </div>
                        </li>
                        <li className="flex items-start gap-4 text-white">
                            <span className="text-[#10b981] flex-shrink-0 mt-0.5">
                                <svg className="w-6 h-6 drop-shadow-[0_0_5px_rgba(16,185,129,0.5)]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"></path></svg>
                            </span>
                            <div>
                                <span className="text-lg font-semibold block">OCR de pantallazos</span>
                                <span className="text-white/50 text-sm">Extrae datos al instante de tus transferencias.</span>
                            </div>
                        </li>
                        <li className="flex items-start gap-4 text-white">
                            <span className="text-[#10b981] flex-shrink-0 mt-0.5">
                                <svg className="w-6 h-6 drop-shadow-[0_0_5px_rgba(16,185,129,0.5)]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"></path></svg>
                            </span>
                            <div>
                                <span className="text-lg font-semibold block">Detección automática de fugas</span>
                                <span className="text-white/50 text-sm">Identifica y alerta sobre gastos hormiga.</span>
                            </div>
                        </li>
                        <li className="flex items-start gap-4 text-white">
                            <span className="text-[#10b981] flex-shrink-0 mt-0.5">
                                <svg className="w-6 h-6 drop-shadow-[0_0_5px_rgba(16,185,129,0.5)]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"></path></svg>
                            </span>
                            <div>
                                <span className="text-lg font-semibold block">FinScore gamificado</span>
                                <span className="text-white/50 text-sm">Mide tu progreso de forma divertida e interactiva.</span>
                            </div>
                        </li>
                    </ul>
                </div>

            </div>
            
        </section>
    );
}
