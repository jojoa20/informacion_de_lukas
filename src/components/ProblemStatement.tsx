import React from 'react';

export default function ProblemStatement() {
    const leaks = [
        { name: "Cafés", icon: "☕", color: "text-[#d8a93f]", borderColor: "border-[#d8a93f]/30", bg: "bg-[#d8a93f]/10", angle: "rotate-[60deg]", delay: "0s" },
        { name: "Streaming", icon: "📺", color: "text-[#a898c9]", borderColor: "border-[#a898c9]/30", bg: "bg-[#a898c9]/10", angle: "rotate-[30deg]", delay: "0.5s" },
        { name: "Domicilios", icon: "🍔", color: "text-[#f36e53]", borderColor: "border-[#f36e53]/30", bg: "bg-[#f36e53]/10", angle: "rotate-[0deg]", delay: "1s" },
        { name: "Transporte", icon: "🚕", color: "text-[#f36e53]", borderColor: "border-[#f36e53]/30", bg: "bg-[#f36e53]/10", angle: "-rotate-[30deg]", delay: "1.5s" },
        { name: "Compras Imp", icon: "🛍️", color: "text-[#397dc1]", borderColor: "border-[#397dc1]/30", bg: "bg-[#397dc1]/10", angle: "-rotate-[60deg]", delay: "2s" },
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
                    Pequeños gastos que parecen inofensivos terminan destruyendo tu presupuesto mensual.
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

                {/* Lukas AI Floating Warning near wallet */}
                <div className="absolute top-[30px] md:top-[60px] ml-[200px] md:ml-[340px] z-30 pointer-events-none">
                    <div className="bg-black/80 border border-[#f36e53]/50 backdrop-blur-xl rounded-xl p-3 shadow-2xl animate-[float_6s_ease-in-out_infinite_0.5s]">
                        <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-full bg-[#f36e53]/20 flex items-center justify-center text-[#f36e53] flex-shrink-0">
                                ⚠️
                            </div>
                            <div>
                                <p className="text-white text-[10px] uppercase font-bold tracking-wider opacity-70">Lukas AI</p>
                                <p className="text-[#f36e53] text-sm font-bold leading-tight">Ojo… este mes estás gastando<br />más de lo normal.</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* The Leaking SVG Particles & Paths */}
                <div className="absolute top-[80px] md:top-[120px] left-0 right-0 bottom-0 z-10 pointer-events-none overflow-visible">
                    
                    {/* CSS-based particle system for animated coins dropping */}
                    <div className="relative w-full h-full">
                        {leaks.map((leak, idx) => (
                            <React.Fragment key={idx}>
                                <div className={`absolute top-0 left-1/2 origin-top ${leak.angle} -translate-x-1/2`}>
                                    {/* Path Line */}
                                    <div className="w-0.5 h-[180px] md:h-[260px] bg-gradient-to-b from-white/20 to-transparent" />
                                    
                                    {/* Animated Coin Drop */}
                                    <div 
                                        className={`absolute top-0 -left-1.5 md:-left-2 w-3 h-3 md:w-4 md:h-4 rounded-full bg-[#d8a93f] border border-[#f36e53] shadow-[0_0_15px_rgba(216,169,63,0.8)] z-10`}
                                        style={{
                                            animation: `leak-drop 2.5s ease-in infinite ${leak.delay}`
                                        }}
                                    >
                                        <div className="w-full h-full border border-yellow-700/30 rounded-full" />
                                    </div>
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
