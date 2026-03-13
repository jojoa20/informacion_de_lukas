export default function ProductDemo() {
    return (
        <section className="relative py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-white/5">
            <div className="text-center mb-16 max-w-3xl mx-auto">
                <h2 className="text-4xl md:text-5xl lg:text-6xl font-black mb-6 tracking-tight">
                    <span className="text-white">Cero formularios. </span>
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-lukas-primary to-[#a898c9]">
                        Solo habla con Lukas.
                    </span>
                </h2>
                <p className="text-white/70 text-lg md:text-xl leading-relaxed">
                    Olvídate de clasificar gastos a mano. Ingresa tus movimientos como lo harías en un chat de WhatsApp con un amigo.
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

                {/* Method 1: Chat Input */}
                <div className="relative rounded-3xl bg-[#0f172a] border border-white/10 p-6 flex flex-col items-center overflow-hidden group hover:border-lukas-primary/50 transition-colors duration-500">
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[150px] h-[150px] bg-lukas-primary/20 blur-[50px] opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                    <h3 className="text-xl font-bold text-white mb-2 z-10 flex items-center gap-2">
                        <span>💬</span> Chat Directo
                    </h3>
                    <p className="text-white/50 text-sm text-center mb-8 z-10">Texto natural e instantáneo</p>

                    <div className="w-full mt-auto relative z-10 flex flex-col gap-3">
                        <div className="self-end bg-lukas-primary text-white text-sm py-2 px-4 rounded-2xl rounded-tr-none shadow-lg transform translate-y-4 opacity-0 animate-[fade-in-up_0.5s_ease-out_1s_forwards]">
                            Lukas, gasté 15 lucas en empanadas
                        </div>
                        <div className="self-start bg-white/10 border border-white/5 text-white/90 text-sm py-2 px-4 rounded-2xl rounded-tl-none shadow-lg transform translate-y-4 opacity-0 animate-[fade-in-up_0.5s_ease-out_2s_forwards]">
                            <span className="flex flex-col gap-1">
                                <span className="flex items-center gap-2 text-[#d8a93f] font-semibold">
                                    <span className="w-2 h-2 rounded-full bg-lukas-success animate-pulse" />
                                    ¡Anotado! 🥟
                                </span>
                                <span className="text-white">Registrados $15.000 en Categoría: Comida.</span>
                            </span>
                        </div>

                        <div className="relative mt-2">
                            <input
                                type="text"
                                placeholder="Escribe un mensaje..."
                                className="w-full bg-black/50 border border-white/10 rounded-xl py-3 px-4 text-xs text-white/50 focus:outline-none pointer-events-none"
                                readOnly
                            />
                            <div className="absolute right-2 top-1/2 -translate-y-1/2 w-6 h-6 rounded-full bg-lukas-primary/80 flex items-center justify-center">
                                <span className="text-white text-[10px]">↑</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Method 2: Audio/Voice Input */}
                <div className="relative rounded-3xl bg-[#0f172a] border border-white/10 p-6 flex flex-col items-center overflow-hidden group hover:border-[#a898c9]/50 transition-colors duration-500">
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[150px] h-[150px] bg-[#a898c9]/20 blur-[50px] opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                    <h3 className="text-xl font-bold text-white mb-2 z-10 flex items-center gap-2">
                        <span>🎙️</span> Nota de Voz
                    </h3>
                    <p className="text-white/50 text-sm text-center mb-8 z-10">Procesamiento de audio a texto</p>

                    <div className="w-full mt-auto relative z-10 flex flex-col items-center gap-6 pb-4">

                        {/* Microphone UI with waveform */}
                        <div className="relative w-20 h-20 bg-[#a898c9]/10 border-2 border-[#a898c9]/30 rounded-full flex items-center justify-center shadow-[0_0_20px_rgba(168,152,201,0.2)]">
                            <div className="absolute inset-0 rounded-full border border-[#a898c9]/50 animate-[ping_2s_cubic-bezier(0,0,0.2,1)_infinite]" />
                            <span className="text-3xl relative z-10 drop-shadow-[0_0_10px_rgba(168,152,201,0.8)]">🎙️</span>
                        </div>

                        {/* Interactive Waveform Display */}
                        <div className="flex items-center gap-1 h-8 px-4 py-2 bg-black/40 rounded-full border border-white/10 backdrop-blur-md">
                            {[...Array(20)].map((_, i) => (
                                <div
                                    key={i}
                                    className="w-1 bg-[#a898c9] rounded-full"
                                    style={{
                                        height: `${Math.max(20, Math.random() * 100)}%`,
                                        animation: `pulse 0.8s ease-in-out infinite alternate`,
                                        animationDelay: `${i * 0.05}s`
                                    }}
                                />
                            ))}
                        </div>

                        <div className="text-xs text-[#a898c9] font-mono animate-pulse text-center">
                            Procesando voz a gasto...
                        </div>

                    </div>
                </div>

                {/* Method 3: Screenshot/OCR Input */}
                <div className="relative rounded-3xl bg-[#0f172a] border border-white/10 p-6 flex flex-col items-center overflow-hidden group hover:border-[#a898c9]/50 transition-colors duration-500">
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[150px] h-[150px] bg-[#a898c9]/20 blur-[50px] opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                    <h3 className="text-xl font-bold text-white mb-2 z-10 flex items-center gap-2">
                        <span>📸</span> Pantallazos
                    </h3>
                    <p className="text-white/50 text-sm text-center mb-6 z-10">Lectura OCR de Nequi/Daviplata</p>

                    <div className="w-full mt-auto relative z-10 flex flex-col items-center">

                        {/* Nequi Receipt/Screenshot Scanning Animation */}
                        <div className="relative w-48 h-44 bg-[#230018] border border-[#a898c9]/40 rounded-xl overflow-hidden shadow-[0_0_30px_rgba(168,152,201,0.15)] flex flex-col items-center justify-start py-4 px-3">
                            
                            {/* Nequi UI Header */}
                            <div className="w-full flex justify-between items-center border-b border-[#a898c9]/20 pb-2 mb-3">
                                <span className="text-[#a898c9] text-[10px] font-bold tracking-widest uppercase">Nequi</span>
                                <span className="text-white/50 text-[8px]">Comprobante</span>
                            </div>

                            {/* Receipt Content */}
                            <div className="w-full space-y-3 opacity-80">
                                <div className="w-full flex flex-col items-center justify-center mb-1">
                                    <span className="text-white/50 text-[10px]">Enviaste a</span>
                                    <span className="text-white font-bold text-xs mt-1">EMPANADAS EL PAISA</span>
                                </div>
                                <div className="w-full bg-[#a898c9]/10 py-2 rounded flex items-center justify-center border border-[#a898c9]/20">
                                    <span className="text-white font-mono font-bold text-lg">$ 15.000</span>
                                </div>
                                <div className="w-full flex justify-between px-2">
                                    <span className="text-white/40 text-[8px]">Motivo</span>
                                    <span className="text-white/80 text-[8px]">Comida</span>
                                </div>
                            </div>

                            {/* Scanning Laser */}
                            <div className="absolute left-0 right-0 h-[2px] bg-white shadow-[0_0_15px_10px_rgba(255,255,255,0.3)] animate-[scan_2.5s_ease-in-out_infinite_alternate] z-20" style={{ top: '10%' }} />

                            {/* Overlay Flash on scan complete */}
                            <div className="absolute inset-0 bg-[#a898c9]/10 animate-[pulse_2.5s_infinite] z-10 pointer-events-none mix-blend-screen" />
                        </div>

                        {/* Extracted Data Tags */}
                        <div className="w-full flex flex-wrap gap-2 mt-4 justify-center items-center">
                            <span className="text-[10px] font-mono font-bold bg-[#a898c9]/20 text-[#ffb6e0] border border-[#a898c9]/40 px-2 py-1 rounded shadow-sm">
                                Amount: $15.000
                            </span>
                            <span className="text-[10px] font-mono font-bold bg-[#397dc1]/20 text-[#d9ccff] border border-[#397dc1]/40 px-2 py-1 rounded shadow-sm">
                                Merchant: Empanadas
                            </span>
                            <span className="text-[10px] font-mono font-bold bg-[#f36e53]/20 text-[#ffdacd] border border-[#f36e53]/40 px-2 py-1 rounded shadow-sm">
                                Category: Comida
                            </span>
                            <span className="text-[10px] font-mono font-bold bg-[#d8a93f]/20 text-[#ccfbf1] border border-[#d8a93f]/40 px-2 py-1 rounded shadow-sm">
                                Date: Hoy
                            </span>
                        </div>

                    </div>
                </div>

            </div>
        </section>
    );
}
