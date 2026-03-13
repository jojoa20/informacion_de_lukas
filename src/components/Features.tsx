export default function Features() {
    const features = [
        {
            title: "Predictive Shortfalls",
            description: "Lukas warns you days before your account balance drops below your upcoming auto-pays.",
            span: "col-span-1 md:col-span-2",
            icon: "⚡"
        },
        {
            title: "Tax Optimization",
            description: "Automatically categorized expenses for annual declarations.",
            span: "col-span-1",
            icon: "📊"
        },
        {
            title: "Smart Vaults",
            description: "Auto-divert micro-savings into high-yield digital wallets securely.",
            span: "col-span-1",
            icon: "🏦"
        },
        {
            title: "Voice Commands",
            description: "Just say 'Lukas, can I buy this?' and get an instant AI analysis of the impact.",
            span: "col-span-1 md:col-span-2",
            icon: "🎙️"
        }
    ];

    return (
        <section className="relative py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-white/5 mt-12">
            <div className="text-center mb-16">
                <h2 className="text-3xl md:text-5xl font-bold mb-4">
                    <span className="text-white">A full-stack </span>
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-lukas-primary">
                        financial brain
                    </span>
                </h2>
                <p className="text-white/60 text-lg max-w-2xl mx-auto">
                    Built precisely to automate the hard parts of money management so you can focus on building wealth.
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {features.map((feature, i) => (
                    <div
                        key={i}
                        className={`relative p-8 rounded-3xl bg-[#1e1b4b] border border-white/5 hover:border-lukas-primary/50 transition-colors group overflow-hidden ${feature.span}`}
                    >
                        {/* Background glowing orb on hover */}
                        <div className="absolute -inset-20 bg-lukas-primary/20 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

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
