import React from 'react';

export default function Hero() {
    return (
        <section className="relative min-h-[100vh] flex flex-col items-center justify-center overflow-hidden px-4 sm:px-6 lg:px-8 pt-32 pb-20">
            {/* Deep Dark Gradient Background */}
            <div className="absolute inset-0 bg-gradient-to-b from-[#0f172a] via-[#1e1b4b] to-[#0f172a] pointer-events-none z-[-2]" />

            {/* Animated Network Background */}
            <div className="absolute inset-0 z-[-1] opacity-40 overflow-hidden pointer-events-none">
                {/* Glow behind center */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-lukas-primary/20 rounded-full blur-[120px]" />

                {/* SVG Network Lines and Nodes */}
                <svg className="absolute w-full h-full" xmlns="http://www.w3.org/2000/svg">
                    {/* Vertical and horizontal grid paths */}
                    <g stroke="rgba(255,255,255,0.03)" strokeWidth="1">
                        <path d="M100,0 L100,2000 M300,0 L300,2000 M500,0 L500,2000 M700,0 L700,2000 M900,0 L900,2000 M1100,0 L1100,2000 M1300,0 L1300,2000" />
                        <path d="M0,200 L2000,200 M0,400 L2000,400 M0,600 L2000,600 M0,800 L2000,800 M0,1000 L2000,1000" />
                        {/* Diagonal connections */}
                        <path d="M300,400 L500,600 M700,200 L900,400 M100,800 L300,1000" />
                    </g>

                    {/* Pulsing Nodes */}
                    <circle cx="300" cy="400" r="3" fill="#397dc1" className="animate-pulse" />
                    <circle cx="500" cy="600" r="4" fill="#d8a93f" className="animate-pulse" style={{ animationDelay: '1s' }} />
                    <circle cx="700" cy="200" r="3" fill="#f36e53" className="animate-pulse" style={{ animationDelay: '0.5s' }} />
                    <circle cx="900" cy="400" r="5" fill="#a898c9" className="animate-pulse" style={{ animationDelay: '1.5s' }} />

                    {/* Flowing Data Particles using CSS animations */}
                    <rect x="298" y="0" width="4" height="20" fill="#397dc1" className="animate-[data-flow-y_3s_linear_infinite]" />
                    <rect x="498" y="200" width="4" height="20" fill="#d8a93f" className="animate-[data-flow-y_4s_linear_infinite_1s]" />
                    <rect x="0" y="398" width="20" height="4" fill="#a898c9" className="animate-[data-flow-x_5s_linear_infinite]" />
                    <rect x="200" y="598" width="20" height="4" fill="#f36e53" className="animate-[data-flow-x_3.5s_linear_infinite_0.5s]" />
                </svg>
            </div>

            {/* Content Area */}
            <div className="relative z-10 text-center max-w-4xl mx-auto mb-16">
                <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-4 leading-tight">
                    <span className="block text-white mb-2">¿Por dónde se está</span>
                    <span className="block text-transparent bg-clip-text bg-gradient-to-r from-[#397dc1] to-[#a898c9]">
                        fugando tu plata?
                    </span>
                </h1>

                <h2 className="text-xl md:text-2xl font-semibold text-white/90 mb-6">
                    Lukas AI detecta tus gastos hormiga automáticamente.
                </h2>

                <p className="text-lg md:text-xl text-white/70 mb-10 max-w-2xl mx-auto leading-relaxed">
                    Háblale a Lukas, mándale un pantallazo de Nequi o dile cuánto gastaste. Él analiza tus finanzas y encuentra las fugas que están destruyendo tu presupuesto.
                </p>

                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                    <button className="px-8 py-4 rounded-xl bg-gradient-to-r from-[#397dc1] to-[#6b4de6] font-bold text-white transition-all duration-300 shadow-[0_0_20px_rgba(57,125,193,0.4)] hover:shadow-[0_0_30px_rgba(57,125,193,0.6)] hover:-translate-y-1">
                        Probar Lukas
                    </button>
                    <button className="px-8 py-4 rounded-xl bg-white/5 hover:bg-white/10 text-white font-semibold border border-white/10 transition-all duration-300 hover:-translate-y-1 backdrop-blur-md">
                        Ver demo
                    </button>
                </div>
            </div>

            {/* Hero Visual: Floating Mockup and UI Elements */}
            <div className="relative w-full max-w-lg mx-auto h-[500px] mt-10 perspective-1000">

                {/* Soft glow behind the phone mockup */}
                <div className="absolute inset-0 bg-gradient-to-tr from-lukas-primary/30 to-[#a898c9]/30 rounded-3xl blur-[80px]" />

                {/* Phone Mockup Placeholder */}
                <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[280px] h-[580px] rounded-[40px] border-4 border-white/20 bg-black/80 backdrop-blur-xl shadow-2xl animate-[float_6s_ease-in-out_infinite] transform rotate-y-[-10deg] rotate-x-[5deg] overflow-hidden flex flex-col">
                    {/* Top notch */}
                    <div className="w-[100px] h-[25px] bg-black rounded-b-xl mx-auto absolute top-0 left-1/2 -translate-x-1/2 z-20" />

                    {/* App UI Header */}
                    <div className="h-16 border-b border-white/10 flex items-end pb-3 px-6 bg-gradient-to-b from-[#1e1b4b] to-transparent">
                        <span className="text-white font-semibold text-lg flex items-center gap-2">
                            <span className="w-2 h-2 rounded-full bg-[#d8a93f] animate-pulse" />
                            Lukas AI
                        </span>
                    </div>

                    {/* App UI Body - FinScore & LeakBuster */}
                    <div className="flex-1 p-5 flex flex-col items-center gap-4 relative">
                        
                        {/* FinScore Mini Widget */}
                        <div className="w-full bg-white/5 border border-white/10 rounded-2xl p-4 flex flex-col items-center">
                            <h3 className="text-white/50 text-[10px] font-bold uppercase tracking-widest mb-2">FinScore Actual</h3>
                            <div className="relative w-24 h-12 overflow-hidden flex justify-center mt-2">
                                <div className="absolute top-0 w-24 h-24 rounded-full border-4 border-white/10 border-t-[#d8a93f] border-r-[#d8a93f] transform -rotate-45" />
                                <div className="absolute bottom-0 text-2xl font-black text-white drop-shadow-lg">740</div>
                            </div>
                            <span className="text-[#d8a93f] text-[10px] font-bold mt-2 bg-[#d8a93f]/10 px-2 py-1 rounded">Nivel Rey</span>
                        </div>

                        {/* Leak Buster Mini Widget */}
                        <div className="w-full flex-1 bg-white/5 border border-white/10 rounded-2xl p-4 flex flex-col items-center relative overflow-hidden">
                            <h3 className="text-white/50 text-[10px] font-bold uppercase tracking-widest mb-2">Leak Buster</h3>
                            <div className="relative w-full h-full flex items-center justify-center">
                                {/* Nodes */}
                                <div className="absolute w-4 h-4 bg-[#a898c9] rounded-full shadow-[0_0_15px_rgba(168,152,201,0.5)] z-10" />
                                <div className="absolute top-[20%] left-[20%] w-2 h-2 bg-[#d8a93f] rounded-full" />
                                <div className="absolute top-[30%] right-[15%] w-5 h-5 bg-[#f36e53] rounded-full animate-pulse shadow-[0_0_20px_rgba(243,110,83,0.5)] z-10" />
                                <div className="absolute bottom-[20%] left-[30%] w-3 h-3 bg-[#397dc1] rounded-full shadow-[0_0_10px_rgba(57,125,193,0.5)]" />
                                
                                {/* Lines */}
                                <svg className="absolute inset-0 w-full h-full opacity-40">
                                    <line x1="50%" y1="50%" x2="25%" y2="25%" stroke="#d8a93f" strokeWidth="1" />
                                    <line x1="50%" y1="50%" x2="80%" y2="35%" stroke="#f36e53" strokeWidth="2" strokeDasharray="2 2" className="animate-[spin_3s_linear_infinite]" />
                                    <line x1="50%" y1="50%" x2="35%" y2="75%" stroke="#397dc1" strokeWidth="1" />
                                </svg>
                            </div>
                            <div className="absolute bottom-3 text-[10px] text-[#f36e53] font-bold bg-[#f36e53]/10 px-2 py-1 rounded-full border border-[#f36e53]/20">
                                1 Fuga Detectada
                            </div>
                        </div>

                    </div>
                </div>

                {/* Floating UI Element 1: Gasto Detectado */}
                <div className="absolute top-[15%] -left-[10%] sm:-left-[20%] bg-black/60 border border-[#f36e53]/50 backdrop-blur-xl rounded-xl p-3 shadow-2xl animate-[float_5s_ease-in-out_infinite_0.5s]">
                    <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-[#f36e53]/20 flex items-center justify-center text-[#f36e53]">
                            💸
                        </div>
                        <div>
                            <p className="text-white text-[10px] uppercase font-bold tracking-wider opacity-70">Gasto detectado</p>
                            <p className="text-[#f36e53] text-sm font-bold">$15.000 en empanadas</p>
                        </div>
                    </div>
                </div>

                {/* Floating UI Element 2: Cluster alerta */}
                <div className="absolute top-[50%] -right-[5%] sm:-right-[15%] bg-black/60 border border-[#f36e53]/50 backdrop-blur-xl rounded-xl p-3 shadow-[0_0_30px_rgba(243,110,83,0.2)] animate-[float_7s_ease-in-out_infinite_1s]">
                    <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-[#f36e53]/20 flex items-center justify-center text-[#f36e53]">
                            ⚠️
                        </div>
                        <div>
                            <p className="text-white text-[10px] uppercase font-bold tracking-wider opacity-70">Cluster alerta</p>
                            <p className="text-[#f36e53] text-sm font-bold">Gastos hormiga</p>
                        </div>
                    </div>
                </div>

                {/* Floating UI Element 3: FinScore */}
                <div className="absolute bottom-[20%] -left-[5%] sm:-left-[15%] bg-black/60 border border-[#d8a93f]/50 backdrop-blur-xl rounded-xl p-3 shadow-[0_0_30px_rgba(216,169,63,0.15)] animate-[float_6s_ease-in-out_infinite_1.5s]">
                    <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-[#d8a93f]/20 flex items-center justify-center text-[#d8a93f]">
                            🏆
                        </div>
                        <div>
                            <p className="text-white text-[10px] uppercase font-bold tracking-wider opacity-70">FinScore</p>
                            <p className="text-[#d8a93f] text-sm font-bold">+25 pts</p>
                        </div>
                    </div>
                </div>

            </div>

            {/* Optional fade at bottom */}
            <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-[#0f172a] to-transparent pointer-events-none" />
        </section>
    );
}
