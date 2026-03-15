"use client";

import React, { useState, useEffect } from 'react';
import Image from 'next/image';

export default function OCRSection() {
    const [scanProgress, setScanProgress] = useState(0);
    const [dataVisible, setDataVisible] = useState(false);

    useEffect(() => {
        const interval = setInterval(() => {
            setScanProgress(prev => {
                if (prev >= 100) {
                    setDataVisible(true);
                    return 100;
                }
                return prev + 1;
            });
        }, 30);

        return () => clearInterval(interval);
    }, []);

    const extractedData = [
        { label: "Monto", value: "$15.000", delay: "duration-300" },
        { label: "Comercio", value: "Empanadas", delay: "duration-500" },
        { label: "Categoría", value: "Comida", delay: "duration-700" },
        { label: "Fecha", value: "Hoy", delay: "duration-1000" }
    ];

    return (
        <section className="relative py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-white/5 bg-[#0f172a] overflow-hidden">
            
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-gradient-to-b from-[#397dc1]/5 to-transparent pointer-events-none -z-10" />

            <div className="text-center mb-16 max-w-3xl mx-auto">
                <h2 className="text-4xl md:text-6xl font-black mb-6 tracking-tight text-white">
                    Solo mándale un <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#a898c9] to-[#397dc1]">pantallazo.</span>
                </h2>
                <p className="text-white/60 text-lg md:text-xl leading-relaxed">
                    Lukas lee automáticamente tus comprobantes de Nequi, Daviplata y bancos. Sin registros manuales, sin fricción.
                </p>
            </div>

            <div className="flex flex-col lg:flex-row items-center justify-center gap-12 lg:gap-20">
                
                {/* Visual Phone / Screenshot Container */}
                <div className="relative w-full max-w-[320px] aspect-[9/18] rounded-[2.5rem] border-4 border-white/10 bg-black overflow-hidden shadow-2xl group">
                    <Image 
                        src="/images/nequi_receipt.png" 
                        alt="Nequi Screenshot" 
                        fill
                        className="object-cover opacity-80"
                    />

                    {/* Scanning Line Animation */}
                    <div 
                        className="absolute left-0 right-0 h-1 bg-[#397dc1] shadow-[0_0_20px_#397dc1] z-10 pointer-events-none"
                        style={{ top: `${scanProgress}%`, transition: 'top 0.03s linear' }}
                    />
                    
                    {/* Scanning Overlay */}
                    <div 
                        className="absolute inset-0 bg-[#397dc1]/10 pointer-events-none z-0"
                        style={{ height: `${scanProgress}%`, transition: 'height 0.03s linear' }}
                    />
                </div>

                {/* Extracted Data Reveal */}
                <div className="w-full max-w-md">
                    <div className="space-y-6">
                        {extractedData.map((item, i) => (
                            <div 
                                key={i}
                                className={`flex items-center justify-between p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-xl transition-all ${dataVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'} ${item.delay}`}
                            >
                                <div>
                                    <p className="text-white/40 text-xs font-black uppercase tracking-widest mb-1">{item.label}</p>
                                    <p className="text-white text-2xl font-black tracking-tight">{item.value}</p>
                                </div>
                                <div className="w-10 h-10 rounded-full bg-[#397dc1]/20 flex items-center justify-center text-[#397dc1] border border-[#397dc1]/20">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                                    </svg>
                                </div>
                            </div>
                        ))}

                        {/* Analysis Status */}
                        <div className={`mt-10 p-4 rounded-xl text-center bg-[#397dc1]/10 border border-[#397dc1]/30 transition-all ${dataVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95 duration-1000'}`}>
                            <p className="text-[#397dc1] font-black text-xs uppercase tracking-[0.2em] flex items-center justify-center gap-3">
                                <span className="w-2 h-2 rounded-full bg-[#397dc1] animate-ping" />
                                Análisis de gasto completo
                            </p>
                        </div>
                    </div>
                </div>

            </div>
        </section>
    );
}
