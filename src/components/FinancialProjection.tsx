"use client";

import React, { useState, useEffect, useMemo } from 'react';

// Color palette
// Primary: #397dc1
// Deep: #21428d
// Alert: #f36e53
// Accent: #d8a93f
// Soft violet: #a898c9

export default function FinancialProjection() {
    const [dailySpending, setDailySpending] = useState(45000);
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    const INITIAL_FUNDS = 1200000;
    const DAYS = 30;
    const TOTAL_SIMULATIONS = 30; // Number of lines to draw

    // Generate Monte Carlo paths
    const { paths, probabilityOut } = useMemo(() => {
        const generatedPaths = [];
        let outOfMoneyCount = 0;

        for (let i = 0; i < TOTAL_SIMULATIONS; i++) {
            let currentFunds = INITIAL_FUNDS;
            const path = [currentFunds];
            
            for (let day = 1; day <= DAYS; day++) {
                // Add some volatility (random spending between 50% and 150% of the set daily average)
                const volatility = 0.5 + Math.random(); 
                const dailyExpense = dailySpending * volatility;
                
                // Maybe a random unexpected expense on random days (10% chance)
                const unexpectedExpense = Math.random() < 0.10 ? (Math.random() * 80000) : 0;

                currentFunds = currentFunds - dailyExpense - unexpectedExpense;
                if (currentFunds < 0) currentFunds = 0;

                path.push(currentFunds);
            }

            if (path[DAYS] === 0) {
                outOfMoneyCount++;
            }
            generatedPaths.push(path);
        }

        const probabilityOfRuin = Math.round((outOfMoneyCount / TOTAL_SIMULATIONS) * 100);

        return { paths: generatedPaths, probabilityOut: probabilityOfRuin };
    }, [dailySpending]);


    // SVG Rendering Constants
    const chartWidth = 800;
    const chartHeight = 400;
    const padding = { top: 20, right: 30, bottom: 40, left: 80 };
    
    const innerWidth = chartWidth - padding.left - padding.right;
    const innerHeight = chartHeight - padding.top - padding.bottom;
    
    const maxFunds = INITIAL_FUNDS + 100000;
    const xScale = (day: number) => (day / DAYS) * innerWidth;
    const yScale = (funds: number) => innerHeight - (funds / maxFunds) * innerHeight;

    // Generate average line for highlight
    const averagePath = useMemo(() => {
        const avg = [];
        for (let day = 0; day <= DAYS; day++) {
            let sum = 0;
            for (let i = 0; i < TOTAL_SIMULATIONS; i++) {
                sum += paths[i][day];
            }
            avg.push(sum / TOTAL_SIMULATIONS);
        }
        return avg;
    }, [paths]);


    if (!mounted) return null; // Avoid hydration mismatch

    return (
        <section className="relative py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-white/5 bg-[#0f172a] overflow-hidden">
            
            {/* Ambient Background Glow */}
            <div className="absolute inset-0 pt-24 -z-10 pointer-events-none fade-in">
                <div 
                    className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] blur-[150px] rounded-[100%] transition-colors duration-1000 ${
                        probabilityOut > 50 ? 'bg-gradient-to-r from-[#f36e53]/20 via-[#d8a93f]/10 to-transparent' : 'bg-gradient-to-r from-[#397dc1]/20 via-[#10b981]/10 to-transparent'
                    }`}
                ></div>
            </div>

            <div className="text-center mb-16 max-w-4xl mx-auto">
                <h2 className="text-5xl md:text-7xl lg:text-8xl font-black mb-6 tracking-tight text-white drop-shadow-lg">
                    Proyección <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#397dc1] to-[#10b981]">financiera</span>
                </h2>
                <p className="text-white/70 text-lg md:text-xl leading-relaxed max-w-2xl mx-auto">
                    Lukas predice cómo terminará tu mes si sigues gastando al mismo ritmo.
                </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start justify-center">
                
                {/* Control Panel (Sidebar) */}
                <div className="lg:col-span-4 bg-[#1e1b4b]/50 border border-white/10 rounded-3xl p-8 backdrop-blur-xl shadow-[0_0_40px_rgba(33,66,141,0.15)] flex flex-col relative overflow-hidden transition-all duration-500 hover:border-white/20">
                    
                    {/* Probability Indicator */}
                    <div className="mb-10 text-center relative z-10">
                        <p className="text-sm font-bold uppercase tracking-widest text-white/50 mb-2">Probabilidad de quedar en cero</p>
                        <div className="flex items-center justify-center gap-2">
                            <span 
                                className={`text-6xl font-black tracking-tighter transition-all duration-700 ${
                                    probabilityOut > 50 ? 'text-[#f36e53] drop-shadow-[0_0_15px_rgba(243,110,83,0.6)]' :
                                    probabilityOut > 20 ? 'text-[#d8a93f] drop-shadow-[0_0_15px_rgba(216,169,63,0.6)]' :
                                    'text-[#10b981] drop-shadow-[0_0_15px_rgba(16,185,129,0.6)]'
                                }`}
                            >
                                {probabilityOut}%
                            </span>
                        </div>
                        
                        <p className={`mt-3 text-sm font-semibold p-3 rounded-xl transition-colors duration-500 ${
                             probabilityOut > 50 ? 'bg-[#f36e53]/20 text-[#f36e53]' :
                             probabilityOut > 20 ? 'bg-[#d8a93f]/20 text-[#d8a93f]' :
                             'bg-[#10b981]/20 text-[#10b981]'
                        }`}>
                            {probabilityOut > 50 ? '🚨 Alerta Roja: Estás en alto riesgo.' : 
                             probabilityOut > 20 ? '⚠️ Cuidado: Margen muy apretado.' : 
                             '✅ Modo Seguro: Presupuesto sólido.'}
                        </p>
                    </div>

                    {/* Interactive Slider */}
                    <div className="space-y-6 relative z-10 flex-1">
                        <div className="flex justify-between items-end mb-2">
                            <label className="text-sm font-bold text-white/70">Tu gasto diario promedio</label>
                            <span className="text-xl font-mono text-white tracking-widest bg-white/5 py-1 px-3 rounded-lg border border-white/10">
                                ${(dailySpending).toLocaleString('es-CO')}
                            </span>
                        </div>
                        
                        <div className="relative pt-2">
                            <input 
                                type="range" 
                                min="10000" 
                                max="100000" 
                                step="1000"
                                value={dailySpending}
                                onChange={(e) => setDailySpending(Number(e.target.value))}
                                className="w-full h-2 bg-white/10 rounded-lg appearance-none cursor-pointer accent-[#397dc1]"
                            />
                            {/* Decorative marks */}
                            <div className="flex justify-between mt-2 text-xs text-white/30 font-mono">
                                <span>$10k</span>
                                <span>$55k</span>
                                <span>$100k</span>
                            </div>
                        </div>

                        <div className="mt-8 pt-6 border-t border-white/10 space-y-3">
                            <p className="text-sm text-white/40 flex items-center gap-2">
                                <span className="w-2 h-2 rounded-full bg-[#f36e53]"></span> Peligro (quiebra)
                            </p>
                            <p className="text-sm text-white/40 flex items-center gap-2">
                                <span className="w-3 h-1 rounded-full bg-[#397dc1]"></span> Trayectoria media prevista
                            </p>
                            <p className="text-sm text-white/40 flex items-center gap-2">
                                <span className="w-2 h-2 rounded-full bg-white/20"></span> Simulaciones de IA
                            </p>
                        </div>
                    </div>

                </div>

                {/* Monte Carlo Visualizer */}
                <div className="lg:col-span-8 bg-[#1e1b4b]/30 border border-white/10 rounded-3xl p-6 backdrop-blur-xl shrink-0 overflow-x-auto">
                    <div className="min-w-[600px] w-full h-full">
                        
                        <svg width="100%" viewBox={`0 0 ${chartWidth} ${chartHeight}`} className="drop-shadow-xl overflow-visible">
                            
                            {/* Grid lines */}
                            <g stroke="rgba(255,255,255,0.05)" strokeWidth="1">
                                {[0, 0.25, 0.5, 0.75, 1].map((tick) => (
                                    <line key={tick} x1={padding.left} y1={padding.top + innerHeight * tick} x2={chartWidth - padding.right} y2={padding.top + innerHeight * tick} />
                                ))}
                                {/* Vertical Day markers */}
                                {[0, 10, 20, 30].map((day) => (
                                    <line key={day} x1={padding.left + xScale(day)} y1={padding.top} x2={padding.left + xScale(day)} y2={chartHeight - padding.bottom} strokeDasharray="4 4" />
                                ))}
                            </g>

                            {/* Y Axis Labels */}
                            <g className="text-xs fill-white/40 font-mono" textAnchor="end">
                                {[0, 0.25, 0.5, 0.75, 1].map((tick) => (
                                    <text key={tick} x={padding.left - 10} y={padding.top + innerHeight * tick + 4}>
                                        ${((1 - tick) * maxFunds / 1000).toFixed(0)}k
                                    </text>
                                ))}
                            </g>
                            
                            {/* X Axis Labels */}
                            <g className="text-xs fill-white/40 font-mono" textAnchor="middle">
                                {[0, 10, 20, 30].map((day) => (
                                    <text key={day} x={padding.left + xScale(day)} y={chartHeight - 15}>
                                        Día {day === 0 ? 1 : day}
                                    </text>
                                ))}
                            </g>

                            {/* Zero Boundary Line (Ruin Level) */}
                            <line 
                                x1={padding.left} 
                                y1={padding.top + yScale(0)} 
                                x2={chartWidth - padding.right} 
                                y2={padding.top + yScale(0)} 
                                stroke="#f36e53" 
                                strokeWidth="2" 
                                strokeOpacity="0.5" 
                                className="drop-shadow-[0_0_8px_rgba(243,110,83,0.8)]"
                            />

                            {/* Simulation Paths */}
                            <g className="transition-all duration-300 ease-in-out">
                                {paths.map((path, i) => {
                                    const pathD = `M ${path.map((val, day) => `${padding.left + xScale(day)},${padding.top + yScale(val)}`).join(' L ')}`;
                                    
                                    // Highlight in coral if it touches 0
                                    const fails = path[DAYS] === 0;
                                    
                                    return (
                                        <path 
                                            key={i} 
                                            d={pathD} 
                                            fill="none" 
                                            stroke={fails ? 'rgba(243, 110, 83, 0.4)' : 'rgba(255, 255, 255, 0.08)'} 
                                            strokeWidth={fails ? 1.5 : 1}
                                            className="transition-all duration-500 ease-in-out hover:stroke-white/50 hover:stroke-[2px] cursor-crosshair"
                                        />
                                    );
                                })}

                                {/* Average Path Highlight */}
                                {averagePath && (
                                    <path 
                                        d={`M ${averagePath.map((val, day) => `${padding.left + xScale(day)},${padding.top + yScale(val)}`).join(' L ')}`} 
                                        fill="none" 
                                        stroke="#397dc1" 
                                        strokeWidth="4" 
                                        className="drop-shadow-[0_0_12px_rgba(57,125,193,0.8)] transition-all duration-500 ease-in-out"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    />
                                )}
                            </g>

                            {/* UI overlays / Dots on Average end */}
                            <circle 
                                cx={padding.left + xScale(DAYS)} 
                                cy={padding.top + yScale(averagePath[DAYS])} 
                                r="5" 
                                fill="#397dc1" 
                                className="drop-shadow-[0_0_10px_rgba(57,125,193,1)] transition-all duration-500"
                            />

                        </svg>

                    </div>
                </div>

            </div>
        </section>
    );
}
