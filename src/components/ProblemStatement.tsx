import React from 'react';

export default function ProblemStatement() {
    const leaks = [
        { name: "Cafés", icon: "☕", color: "text-[#6ee7b7]", borderColor: "border-[#6ee7b7]/30", bg: "bg-[#6ee7b7]/10", angle: "rotate-[60deg]", delay: "0s" },
        { name: "Domicilios", icon: "🍔", color: "text-[#ff7a59]", borderColor: "border-[#ff7a59]/30", bg: "bg-[#ff7a59]/10", angle: "rotate-[30deg]", delay: "0.5s" },
        { name: "Streaming", icon: "📺", color: "text-[#4cc9f0]", borderColor: "border-[#4cc9f0]/30", bg: "bg-[#4cc9f0]/10", angle: "rotate-[0deg]", delay: "1s" },
        { name: "Compras Imp", icon: "🛍️", color: "text-[#7c5cff]", borderColor: "border-[#7c5cff]/30", bg: "bg-[#7c5cff]/10", angle: "-rotate-[30deg]", delay: "1.5s" },
        { name: "Transporte", icon: "🚕", color: "text-[#f59e0b]", borderColor: "border-[#f59e0b]/30", bg: "bg-[#f59e0b]/10", angle: "-rotate-[60deg]", delay: "2s" },
    ];

    return (
        <section className="relative py-32 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-white/5 mt-12 overflow-hidden">
            <div className="text-center mb-20 max-w-3xl mx-auto">
                <h2 className="text-4xl md:text-5xl lg:text-6xl font-black mb-6 tracking-tight leading-tight">
                    <span className="text-white">La mayoría de la gente no sabe en qué se le va la </span>
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-lukas-alert to-orange-400">
                        plata.
                    </span>
                </h2>
                <p className="text-white/70 text-lg md:text-xl leading-relaxed">
                    Pequeños gastos que parecen inofensivos terminan destruyendo tu presupuesto mensual. Lukas AI detecta automáticamente estas fugas.
                </p>
            </div>

            {/* Visual Metaphor: The Leaking Wallet */}
            <div className="relative max-w-5xl mx-auto h-[400px] md:h-[500px] flex flex-col items-center justify-start mt-10">

                {/* The Wallet Source */}
                <div className="relative z-20 w-32 h-32 md:w-40 md:h-40 bg-black/50 border-2 border-white/10 rounded-3xl backdrop-blur-xl shadow-[0_0_50px_rgba(255,255,255,0.05)] flex items-center justify-center animate-[float_4s_ease-in-out_infinite]">
                    <div className="absolute inset-0 bg-gradient-to-b from-white/10 to-transparent rounded-3xl pointer-events-none" />
                    <span className="text-6xl md:text-7xl drop-shadow-[0_0_15px_rgba(255,255,255,0.3)]">👛</span>

                    {/* Subtle glow behind wallet */}
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-white/5 rounded-full blur-[30px] -z-10" />
                </div>

                {/* The Leaking SVG Particles & Paths */}
                <div className="absolute top-[80px] md:top-[120px] left-0 right-0 bottom-0 z-10 pointer-events-none overflow-visible">
                    
                    {/* CSS-based particle system for animated coins dropping */}
                    <div className="relative w-full h-full">
                        {leaks.map((leak, idx) => (
                            <React.Fragment key={idx}>
                                {/* Path Line */}
                                <div className={`absolute top-0 left-1/2 w-0.5 h-[180px] md:h-[260px] bg-gradient-to-b from-white/20 to-transparent origin-top ${leak.angle} -translate-x-1/2`} />
                                
                                {/* Animated Coin Drop */}
                                {/* Using emoji or a gold coin style element for the particle */}
                                <div 
                                    className={`absolute top-0 left-1/2 w-3 h-3 md:w-4 md:h-4 rounded-full bg-[#fcd34d] border border-[#f59e0b] shadow-[0_0_10px_rgba(245,158,11,0.8)] origin-top ${leak.angle} -translate-x-1/2`}
                                    style={{
                                        animation: `leak-drop 3s ease-in infinite ${leak.delay}`
                                    }}
                                >
                                    {/* inner coin detail */ }
                                    <div className="w-full h-full border border-yellow-700/30 rounded-full" />
                                </div>
                            </React.Fragment>
                        ))}
                    </div>
                </div>

                {/* The Expense Categories (The sinks) */}
                <div className="absolute bottom-10 left-0 right-0 w-full flex justify-between items-end px-2 md:px-0 z-20">
                    {leaks.map((leak, idx) => (
                        <div key={idx} className="flex flex-col items-center gap-3 w-1/5">
                            <div className={`w-14 h-14 md:w-20 md:h-20 rounded-2xl ${leak.bg} border ${leak.borderColor} backdrop-blur-md flex items-center justify-center text-2xl md:text-4xl shadow-lg transition-transform hover:scale-110 animate-pulse`}>
                                <span className="drop-shadow-lg">{leak.icon}</span>
                            </div>
                            <span className={`text-[10px] md:text-sm font-semibold tracking-wide ${leak.color} text-center`}>
                                {leak.name}
                            </span>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
