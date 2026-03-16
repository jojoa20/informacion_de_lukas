"use client";

import React, { useState, useEffect } from 'react';
import Image from 'next/image';

export default function Navbar() {
    const [scrolled, setScrolled] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Close menu on route-ish link click
    const handleLinkClick = () => setMenuOpen(false);

    const navLinks = [
        { name: "LeakBuster", href: "#leakbuster" },
        { name: "FinScore", href: "#finscore" },
        { name: "IA Pana", href: "#iapana" },
        { name: "Mapa de gastos", href: "#heatmap" },
        { name: "Proyección", href: "#proyeccion" },
    ];

    return (
        <nav className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-500 ${
            scrolled ? 'py-3 bg-[#0f172a]/90 backdrop-blur-xl border-b border-white/5 shadow-2xl' : 'py-6 bg-transparent'
        }`}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
                
                {/* Logo */}
                <div className="flex items-center gap-[10px] group cursor-pointer transition-all duration-200 ease-out hover:scale-[1.03]">
                    <div className="relative flex-shrink-0 transition-all duration-200 ease-out group-hover:[filter:drop-shadow(0_0_8px_rgba(80,120,255,0.65))] [filter:drop-shadow(0_2px_6px_rgba(0,0,0,0.25))]">
                        <Image
                            src="/mascots/lukas_amigable.png"
                            alt="Lukas"
                            width={42}
                            height={42}
                            className="h-[34px] w-auto sm:h-[42px] object-contain"
                            priority
                        />
                    </div>
                    <span className="whitespace-nowrap text-[18px] sm:text-[22px] font-bold leading-none tracking-tight text-white">
                        Lukas{' '}
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#4F8BFF] to-[#7AA2FF]">
                            AI
                        </span>
                    </span>
                </div>

                {/* Desktop Menu */}
                <div className="hidden md:flex items-center gap-6 lg:gap-8">
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

                {/* Desktop CTA Buttons */}
                <div className="hidden md:flex items-center gap-3">
                    <button className="min-h-[44px] px-5 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-white text-sm font-bold border border-white/10 transition-all hover:scale-105 active:scale-95">
                        Iniciar sesión
                    </button>
                    <button className="min-h-[44px] px-5 py-2.5 rounded-xl bg-[#397dc1] hover:bg-[#397dc1]/90 text-white text-sm font-bold shadow-lg shadow-[#397dc1]/20 transition-all hover:scale-105 btn-glow-hover active:scale-95">
                        Empezar
                    </button>
                </div>

                {/* Hamburger Button (mobile only) */}
                <button
                    onClick={() => setMenuOpen(!menuOpen)}
                    className="md:hidden flex flex-col items-center justify-center w-10 h-10 gap-[5px] rounded-lg bg-white/5 border border-white/10 transition-all active:scale-95"
                    aria-label="Abrir menú"
                >
                    <span className={`w-5 h-0.5 bg-white rounded-full transition-all duration-300 ${menuOpen ? 'rotate-45 translate-y-[7px]' : ''}`} />
                    <span className={`w-5 h-0.5 bg-white rounded-full transition-all duration-300 ${menuOpen ? 'opacity-0 scale-x-0' : ''}`} />
                    <span className={`w-5 h-0.5 bg-white rounded-full transition-all duration-300 ${menuOpen ? '-rotate-45 -translate-y-[7px]' : ''}`} />
                </button>
            </div>

            {/* Mobile Dropdown Menu */}
            <div className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${
                menuOpen ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'
            }`}>
                <div className="bg-[#0f172a]/95 backdrop-blur-xl border-b border-white/5 px-4 pb-6 pt-4">
                    <div className="flex flex-col gap-1 mb-5">
                        {navLinks.map((link) => (
                            <a
                                key={link.name}
                                href={link.href}
                                onClick={handleLinkClick}
                                className="text-white/80 hover:text-white font-medium text-base py-3 px-3 rounded-xl hover:bg-white/5 transition-all"
                            >
                                {link.name}
                            </a>
                        ))}
                    </div>
                    <div className="flex flex-col gap-3">
                        <button className="w-full min-h-[48px] px-5 py-3 rounded-xl bg-white/5 hover:bg-white/10 text-white text-sm font-bold border border-white/10 transition-all active:scale-95">
                            Iniciar sesión
                        </button>
                        <button className="w-full min-h-[48px] px-5 py-3 rounded-xl bg-[#397dc1] hover:bg-[#4F8BFF] text-white text-sm font-bold shadow-lg shadow-[#397dc1]/20 transition-all active:scale-95">
                            Empezar gratis
                        </button>
                    </div>
                </div>
            </div>
        </nav>
    );
}
