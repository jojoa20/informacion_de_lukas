export default function CTA() {
    return (
        <section className="relative py-40 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto text-center mt-12 mb-20 overflow-hidden">

            {/* Background Animation: Nodes Converging to Central AI Node */}
            <div className="absolute inset-0 flex items-center justify-center opacity-60 pointer-events-none z-0">

                {/* Central AI Node Glow */}
                <div className="absolute w-[300px] h-[300px] bg-lukas-primary/20 rounded-full blur-[80px] animate-pulse" />

                <svg className="absolute w-full h-[600px] max-w-4xl" viewBox="0 0 800 600">
                    <defs>
                        <radialGradient id="aiCore" cx="50%" cy="50%" r="50%">
                            <stop offset="0%" stopColor="#7c5cff" stopOpacity="1" />
                            <stop offset="100%" stopColor="#7c5cff" stopOpacity="0" />
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
                    <circle cx="400" cy="300" r="15" fill="#7c5cff" filter="url(#glow)" className="animate-pulse" />
                    <circle cx="400" cy="300" r="40" fill="url(#aiCore)" />
                    <circle cx="400" cy="300" r="80" fill="none" stroke="#7c5cff" strokeWidth="1" strokeOpacity="0.2" className="animate-[spin_10s_linear_infinite]" strokeDasharray="10 5" />
                    <circle cx="400" cy="300" r="120" fill="none" stroke="#4cc9f0" strokeWidth="1" strokeOpacity="0.1" className="animate-[spin_15s_linear_infinite_reverse]" strokeDasharray="5 15" />

                    {/* Converging Lines & Nodes */}
                    {/* Top Left */}
                    <line x1="100" y1="100" x2="400" y2="300" stroke="rgba(124,92,255,0.2)" strokeWidth="1" />
                    <circle cx="100" cy="100" r="4" fill="#6ee7b7" filter="url(#glow)" className="origin-[400px_300px] animate-[converge_4s_ease-in-out_infinite]" />

                    {/* Top Right */}
                    <line x1="700" y1="150" x2="400" y2="300" stroke="rgba(124,92,255,0.2)" strokeWidth="1" />
                    <circle cx="700" cy="150" r="3" fill="#ff7a59" filter="url(#glow)" className="origin-[400px_300px] animate-[converge_5s_ease-in-out_infinite_1s]" />

                    {/* Bottom Left */}
                    <line x1="150" y1="500" x2="400" y2="300" stroke="rgba(124,92,255,0.2)" strokeWidth="1" />
                    <circle cx="150" cy="500" r="5" fill="#4cc9f0" filter="url(#glow)" className="origin-[400px_300px] animate-[converge_6s_ease-in-out_infinite_2s]" />

                    {/* Bottom Right */}
                    <line x1="650" y1="450" x2="400" y2="300" stroke="rgba(124,92,255,0.2)" strokeWidth="1" />
                    <circle cx="650" cy="450" r="4" fill="#6ee7b7" filter="url(#glow)" className="origin-[400px_300px] animate-[converge_4.5s_ease-in-out_infinite_0.5s]" />

                    {/* Far Left */}
                    <line x1="0" y1="300" x2="400" y2="300" stroke="rgba(124,92,255,0.1)" strokeWidth="1" />
                    <circle cx="0" cy="300" r="3" fill="#ff7a59" filter="url(#glow)" className="origin-[400px_300px] animate-[converge_7s_ease-in-out_infinite_3s]" />

                    {/* Far Right */}
                    <line x1="800" y1="200" x2="400" y2="300" stroke="rgba(124,92,255,0.1)" strokeWidth="1" />
                    <circle cx="800" cy="200" r="4" fill="#7c5cff" filter="url(#glow)" className="origin-[400px_300px] animate-[converge_5.5s_ease-in-out_infinite_1.5s]" />
                </svg>

            </div>

            <div className="relative z-10 p-12 md:p-16 rounded-3xl bg-black/40 border border-white/10 backdrop-blur-2xl shadow-[0_0_50px_rgba(12,6,24,0.8)] overflow-hidden animate-[fade-in-up_1s_ease-out]">

                {/* Decorative inner gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-lukas-primary/10 to-transparent pointer-events-none" />

                <h2 className="text-4xl md:text-6xl font-black mb-4 text-white tracking-tight drop-shadow-xl">
                    Deja de preguntarte dónde se fue tu plata.
                </h2>

                <p className="text-2xl md:text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-lukas-primary to-[#4cc9f0] mb-12 drop-shadow-md">
                    Lukas te lo muestra.
                </p>

                <button
                    className="relative group px-8 md:px-12 py-4 md:py-5 rounded-full bg-white text-black font-extrabold text-lg md:text-xl transition-all duration-300 hover:scale-105 hover:shadow-[0_0_40px_rgba(255,255,255,0.3)] overflow-hidden"
                >
                    <span className="relative z-10">Empieza a usar Lukas</span>
                    <div className="absolute inset-0 bg-gradient-to-r from-lukas-primary/20 via-[#4cc9f0]/20 to-lukas-primary/20 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
                </button>

            </div>
        </section>
    );
}
