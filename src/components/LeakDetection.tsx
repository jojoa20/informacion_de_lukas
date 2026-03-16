export default function LeakDetection() {
    const expenses = [
        { label: "Viajes en Uber", amount: "$320.000", alert: true, width: "75%" },
        { label: "Restaurantes", amount: "$450.000", alert: true, width: "85%" },
        { label: "Suscripciones", amount: "$125.000", alert: false, width: "30%" },
        { label: "Mercado", amount: "$600.000", alert: false, width: "50%" },
    ];

    return (
        <section className="relative py-24 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

                {/* Text Content */}
                <div>
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-lukas-alert/10 border border-lukas-alert/20 mb-6 text-lukas-alert text-sm font-semibold">
                        <span className="w-2 h-2 rounded-full bg-current animate-pulse" />
                        Vigilancia activa
                    </div>
                    <h2 className="text-3xl md:text-5xl font-bold mb-6 text-white leading-tight">
                        Detecta las <span className="text-transparent bg-clip-text bg-gradient-to-r from-lukas-alert to-orange-400">fugas</span> antes de que termine el mes
                    </h2>
                    <p className="text-white/60 text-lg mb-8 leading-relaxed">
                        Lukas monitorea constantemente tus transacciones para identificar anomalías. Si estás gastando de más en transporte o restaurantes, sabrás exactamente cuándo frenar.
                    </p>
                    <ul className="space-y-4">
                        <li className="flex items-center gap-3 text-white/80">
                            <svg className="w-6 h-6 text-lukas-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                            Detección de anomalías en tiempo real
                        </li>
                        <li className="flex items-center gap-3 text-white/80">
                            <svg className="w-6 h-6 text-lukas-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                            Alertas predictivas de consumo
                        </li>
                        <li className="flex items-center gap-3 text-white/80">
                            <svg className="w-6 h-6 text-lukas-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                            Rastreador de suscripciones
                        </li>
                    </ul>
                </div>

                {/* Data Visualization */}
                <div className="relative p-8 rounded-3xl bg-black/40 border border-white/10 backdrop-blur-md">
                    <div className="absolute -inset-0.5 bg-gradient-to-br from-lukas-primary/20 via-lukas-alert/20 to-transparent rounded-3xl blur opacity-50 z-[-1]" />

                    <h3 className="text-xl font-semibold text-white mb-6">Tasa de consumo actual</h3>

                    <div className="space-y-6">
                        {expenses.map((exp, i) => (
                            <div key={i}>
                                <div className="flex justify-between text-sm mb-2">
                                    <span className="text-white/80">{exp.label}</span>
                                    <span className={`font-mono ${exp.alert ? 'text-lukas-alert' : 'text-white'}`}>{exp.amount}</span>
                                </div>
                                <div className="w-full h-2 bg-white/5 rounded-full overflow-hidden relative">
                                    <div
                                        className={`absolute top-0 left-0 h-full rounded-full transition-all duration-1000 ease-out ${exp.alert ? 'bg-gradient-to-r from-orange-500 to-lukas-alert shadow-[0_0_10px_rgba(243,110,83,0.8)]' : 'bg-lukas-primary'
                                            }`}
                                        style={{ width: exp.width }}
                                    />
                                </div>
                                {exp.alert && (
                                    <p className="text-xs text-lukas-alert mt-2 flex items-center gap-1">
                                        <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path></svg>
                                        Tendencia +40% vs mes anterior
                                    </p>
                                )}
                            </div>
                        ))}
                    </div>
                </div>

            </div>
        </section>
    );
}
