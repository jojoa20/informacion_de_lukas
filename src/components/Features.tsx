export default function Features() {
    const features = [
        {
            title: "Déficit Predictivo",
            description: "Lukas te avisa días antes de que tu saldo baje del monto necesario para tus pagos automáticos.",
            span: "col-span-1 md:col-span-2",
            icon: "⚡"
        },
        {
            title: "Optimización de Impuestos",
            description: "Gastos categorizados automáticamente para tus declaraciones anuales.",
            span: "col-span-1",
            icon: "📊"
        },
        {
            title: "Bóvedas Inteligentes",
            description: "Desvía micro-ahorros automáticamente a bolsillos digitales de alto rendimiento.",
            span: "col-span-1",
            icon: "🏦"
        },
        {
            title: "Comandos de Voz",
            description: "Solo di 'Lukas, ¿puedo comprar esto?' y obtén un análisis instantáneo del impacto en tu presupuesto.",
            span: "col-span-1 md:col-span-2",
            icon: "🎙️"
        }
    ];

    return (
        <section className="relative py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-white/5 mt-12">
            <div className="text-center mb-16">
                <h2 className="text-3xl md:text-5xl font-bold mb-4">
                    <span className="text-white">Un cerebro financiero </span>
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-lukas-primary">
                        integral
                    </span>
                </h2>
                <p className="text-white/60 text-lg max-w-2xl mx-auto">
                    Diseñado para automatizar las partes difíciles de la gestión de dinero para que te enfoques en construir tu patrimonio.
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {features.map((feature, i) => (
                    <div
                        key={i}
                        className={`relative p-8 rounded-3xl bg-[#1e1b4b]/60 border border-white/5 hover:border-[#397dc1]/30 transition-all group overflow-hidden spotlight-card ${feature.span}`}
                    >

                        <div className="relative z-10">
                            <div className="text-4xl mb-6">
                                {feature.icon}
                            </div>
                            <h3 className="text-xl font-semibold text-white mb-3">
                                {feature.title}
                            </h3>
                            <p className="text-white/60 leading-relaxed text-sm">
                                {feature.description}
                            </p>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}
