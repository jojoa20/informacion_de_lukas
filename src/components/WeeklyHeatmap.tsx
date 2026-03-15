"use client";

import React, { useState, useEffect, useRef } from 'react';

// Time blocks and Days
const DAYS = ['Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb', 'Dom'];
const TIME_BLOCKS = [
    { label: 'Mañana (06:00 - 12:00)', short: 'Mañana' },
    { label: 'Tarde (12:00 - 18:00)', short: 'Tarde' },
    { label: 'Noche (18:00 - 24:00)', short: 'Noche' },
    { label: 'Madrugada (00:00 - 06:00)', short: 'Madrugada' }
];

// Color mapping based on intensity
const getColorClass = (intensity: number) => {
    if (intensity === 0) return 'bg-white/5 border-white/5';
    if (intensity < 3) return 'bg-[#10b981]/80 border-[#10b981] shadow-[0_0_10px_rgba(16,185,129,0.3)] text-[#10b981]'; // Green - Low
    if (intensity < 6) return 'bg-[#f97316]/80 border-[#f97316] shadow-[0_0_15px_rgba(249,115,22,0.4)] text-[#f97316]'; // Orange - Moderate
    return 'bg-[#f36e53] border-[#f36e53] shadow-[0_0_20px_rgba(243,110,83,0.6)] text-white'; // Red - High
};

// Simulation scenario (simulating a few weeks of aggregated data)
const targetData = [
    // Lun, Mar, Mié, Jue, Vie, Sáb, Dom
    [1, 2, 1, 1, 3, 1, 0], // Mañana
    [2, 3, 2, 3, 4, 5, 4], // Tarde
    [1, 1, 2, 4, 8, 9, 3], // Noche
    [0, 0, 0, 1, 3, 5, 2]  // Madrugada
];

export default function WeeklyHeatmap() {
    // 4 rows (time blocks), 7 cols (days)
    const [grid, setGrid] = useState<number[][]>(
        Array.from({ length: 4 }, () => Array(7).fill(0))
    );
    const [hoveredCell, setHoveredCell] = useState<{ row: number, col: number } | null>(null);
    const [isAnimating, setIsAnimating] = useState(false);
    
    // Animate the heatmap appearing
    useEffect(() => {
        setIsAnimating(true);
        let timeouts: NodeJS.Timeout[] = [];
        
        // Flatten the target data to animate randomly or sequentially
        const events: { row: number, col: number }[] = [];
        targetData.forEach((row, rowIndex) => {
            row.forEach((val, colIndex) => {
                for(let i = 0; i < val; i++) {
                    events.push({ row: rowIndex, col: colIndex });
                }
            });
        });

        // Shuffle events for random appearance
        for (let i = events.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [events[i], events[j]] = [events[j], events[i]];
        }

        // Apply events over time
        events.forEach((event, index) => {
            const timer = setTimeout(() => {
                setGrid(prev => {
                    const newGrid = prev.map(row => [...row]);
                    newGrid[event.row][event.col] += 1;
                    return newGrid;
                });
            }, 100 + (index * 40)); // 40ms per transaction tick
            timeouts.push(timer);
        });

        return () => {
            timeouts.forEach(clearTimeout);
        };
    }, []);

    const resetAnimation = () => {
        if (!isAnimating) return;
        setGrid(Array.from({ length: 4 }, () => Array(7).fill(0)));
        
        const events: { row: number, col: number }[] = [];
        targetData.forEach((row, rowIndex) => {
            row.forEach((val, colIndex) => {
                for(let i = 0; i < val; i++) {
                    events.push({ row: rowIndex, col: colIndex });
                }
            });
        });

        for (let i = events.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [events[i], events[j]] = [events[j], events[i]];
        }

        events.forEach((event, index) => {
            setTimeout(() => {
                setGrid(prev => {
                    const newGrid = prev.map(row => [...row]);
                    newGrid[event.row][event.col] += 1;
                    return newGrid;
                });
            }, 100 + (index * 40));
        });
    }

    return (
        <section className="relative py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-white/5 bg-[#0f172a] overflow-hidden">
            
            {/* Background Glow */}
            <div className="absolute inset-0 pt-24 -z-10 pointer-events-none">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[500px] bg-gradient-to-r from-[#10b981]/10 via-transparent to-[#f36e53]/10 blur-[120px] rounded-[100%]"></div>
            </div>

            <div className="text-center mb-16 max-w-4xl mx-auto">
                <h2 className="text-4xl md:text-5xl lg:text-6xl font-black mb-6 tracking-tight text-white drop-shadow-lg">
                    Descubre tus <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#f36e53] to-[#f97316]">zonas de calor</span>
                </h2>
                <p className="text-white/70 text-lg md:text-xl leading-relaxed">
                    Lukas mapea la intensidad de tus gastos a lo largo de la semana. Visualiza exactamente cuándo ocurren tus mayores fugas de dinero (spoiler: casi siempre son los fines de semana en la noche).
                </p>
            </div>

            <div className="bg-[#1e1b4b]/40 border border-white/10 rounded-3xl p-6 md:p-10 backdrop-blur-xl max-w-5xl mx-auto shadow-[0_0_40px_rgba(12,6,24,0.5)] relative overflow-hidden group">
                
                {/* Decorative inner gradient */}
                <div className="absolute inset-0 bg-gradient-to-br from-white/[0.02] to-transparent pointer-events-none" />

                <div className="flex flex-col lg:flex-row items-start gap-12">
                    
                    {/* Y-Axis Labels (Hidden on Mobile) */}
                    <div className="hidden lg:flex flex-col justify-around h-[300px] mt-10 pr-4 border-r border-white/10 shrink-0">
                        {TIME_BLOCKS.map((block, i) => (
                            <div key={i} className="text-right text-sm font-semibold text-white/50 w-32 tracking-wider">
                                {block.label}
                            </div>
                        ))}
                    </div>

                    {/* Matrix Grid */}
                    <div className="flex-1 w-full relative">
                        
                        {/* X-Axis Labels (Days) */}
                        <div className="grid grid-cols-7 gap-2 md:gap-4 mb-4">
                            {DAYS.map((day, i) => (
                                <div key={i} className="text-center font-bold text-white/50 text-xs md:text-sm uppercase tracking-widest pl-2">
                                    {day}
                                </div>
                            ))}
                        </div>

                        {/* Grid Cells */}
                        <div className="grid grid-rows-4 gap-2 md:gap-4 h-[300px]">
                            {grid.map((row, rowIndex) => (
                                <div key={rowIndex} className="grid grid-cols-7 gap-2 md:gap-4">
                                    
                                    {/* Mobile Y-Axis overlay (absolute in cells if needed, or visually inferred) */}
                                    {row.map((intensity, colIndex) => (
                                        <div 
                                            key={`${rowIndex}-${colIndex}`}
                                            className="relative flex items-center justify-center cursor-pointer group/cell"
                                            onMouseEnter={() => setHoveredCell({ row: rowIndex, col: colIndex })}
                                            onMouseLeave={() => setHoveredCell(null)}
                                        >
                                            {/* Cell background logic based on intensity */}
                                            <div className={`w-full h-full rounded-xl border border-white/10 transition-all duration-700 ease-in-out hover:scale-105 ${getColorClass(intensity)}`} />
                                            
                                            {/* Tooltip Hover State */}
                                            {hoveredCell?.row === rowIndex && hoveredCell?.col === colIndex && (
                                                <div className="absolute -top-14 left-1/2 -translate-x-1/2 bg-black/90 border border-white/20 text-white text-xs px-3 py-2 rounded-lg whitespace-nowrap z-20 shadow-xl animate-[fade-in-up_0.2s_ease-out]">
                                                    <p className="font-bold text-[#397dc1]">{DAYS[colIndex]} - {TIME_BLOCKS[rowIndex].short}</p>
                                                    <p><span className="text-white/70">Intensidad:</span> {intensity} txns</p>
                                                </div>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Legend & Controls */}
                <div className="mt-12 pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-6 relative z-10">
                    <div className="flex items-center gap-4 md:gap-8">
                        <div className="flex items-center gap-2">
                            <div className="w-4 h-4 rounded-md bg-white/5 border border-white/10"></div>
                            <span className="text-xs text-white/50 uppercase tracking-wider font-semibold">Sin Gastos</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <div className="w-4 h-4 rounded-md bg-[#10b981]/80 border border-[#10b981] shadow-[0_0_5px_rgba(16,185,129,0.3)]"></div>
                            <span className="text-xs text-[#10b981] uppercase tracking-wider font-semibold">Bajo</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <div className="w-4 h-4 rounded-md bg-[#f97316]/80 border border-[#f97316] shadow-[0_0_5px_rgba(249,115,22,0.4)]"></div>
                            <span className="text-xs text-[#f97316] uppercase tracking-wider font-semibold">Medio</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <div className="w-4 h-4 rounded-md bg-[#f36e53] border border-[#f36e53] shadow-[0_0_8px_rgba(243,110,83,0.6)]"></div>
                            <span className="text-xs text-[#f36e53] uppercase tracking-wider font-bold">Alto</span>
                        </div>
                    </div>

                    <button 
                        onClick={resetAnimation}
                        className="text-[#397dc1] hover:text-white border border-[#397dc1]/30 hover:bg-[#397dc1]/20 px-4 py-2 rounded-full text-sm font-semibold transition-all shadow-[0_0_15px_rgba(57,125,193,0.2)] hover:shadow-[0_0_20px_rgba(57,125,193,0.4)]"
                    >
                        Re-simular actividad
                    </button>
                </div>

            </div>
        </section>
    );
}
