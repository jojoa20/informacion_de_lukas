"use client";

import React, { useState, useEffect } from 'react';
import Image from 'next/image';

export default function Navbar() {
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const navLinks = [
        { name: "LeakBuster", href: "#leakbuster" },
        { name: "FinScore", href: "#finscore" },
        { name: "IA Pana", href: "#iapana" },
        { name: "Mapa de gastos", href: "#heatmap" },
        { name: "Proyección", href: "#proyeccion" },
    ];

    return (
        <nav className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-500 ${
            scrolled ? 'py-4 bg-[#0f172a]/80 backdrop-blur-xl border-b border-white/5 shadow-2xl' : 'py-8 bg-transparent'
        }`}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
                
                {/* Logo */}
                <div className="flex items-center gap-[10px] pl-0 group cursor-pointer transition-all duration-200 ease-out hover:scale-[1.03]">
                    {/* Mascot */}
                    <div className="relative flex-shrink-0 transition-all duration-200 ease-out group-hover:[filter:drop-shadow(0_0_8px_rgba(80,120,255,0.65))] [filter:drop-shadow(0_2px_6px_rgba(0,0,0,0.25))]">
                        <Image
                            src="/mascots/lukas_amigable.png"
                            alt="Lukas"
                            width={42}
                            height={42}
                            className="h-[42px] w-auto object-contain md:h-[42px] sm:h-[34px]"
                            priority
                        />
                    </div>
                    {/* Brand text — always one line */}
                    <span className="whitespace-nowrap text-[22px] sm:text-[18px] font-bold leading-none tracking-tight text-white">
                        Lukas{' '}
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#4F8BFF] to-[#7AA2FF]">
                            AI
                        </span>
                    </span>
                </div>

                {/* Desktop Menu */}
                <div className="hidden md:flex items-center gap-8">
                    {navLinks.map((link) => (
                        <a 
                            key={link.name}
                            href={link.href}
                            className="text-white/70 hover:text-white font-medium text-sm tracking-wide transition-colors nav-underline"
                        >
                            {link.name}
                        </a>
                    ))}
                </div>

                {/* CTA Button */}
                <div className="flex items-center gap-4">
                    <button className="px-5 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-white text-sm font-bold border border-white/10 transition-all hover:scale-105 active:scale-95">
                        Iniciar sesión
                    </button>
                    <button className="px-5 py-2.5 rounded-xl bg-[#397dc1] hover:bg-[#397dc1]/90 text-white text-sm font-bold shadow-lg shadow-[#397dc1]/20 transition-all hover:scale-105 btn-glow-hover active:scale-95">
                        Empezar
                    </button>
                </div>

            </div>
        </nav>
    );
}
