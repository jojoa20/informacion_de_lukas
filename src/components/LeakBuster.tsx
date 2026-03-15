"use client";

import React, { useEffect, useRef, useState } from 'react';
import * as d3 from 'd3';

interface GraphNode extends d3.SimulationNodeDatum {
    id: string;
    group: number;
    radius: number;
    label: string;
    isAlert?: boolean;
    amount?: string;
    transactions?: number;
}

interface GraphLink extends d3.SimulationLinkDatum<GraphNode> {
    source: string | GraphNode;
    target: string | GraphNode;
}

const data = {
    nodes: [
        { id: "root", group: 1, radius: 75, label: "Ingresos / Quincena" } as GraphNode,
        // Clusters
        { id: "cafes", group: 2, radius: 48, label: "Cafés", isAlert: true, amount: "$150.000 COP", transactions: 30 } as GraphNode,
        { id: "streaming", group: 3, radius: 38, label: "Streaming", amount: "$45.000 COP", transactions: 2 } as GraphNode,
        { id: "domicilios", group: 2, radius: 55, label: "Domicilios", isAlert: true, amount: "$210.000 COP", transactions: 7 } as GraphNode,
        { id: "transporte", group: 4, radius: 48, label: "Transporte", amount: "$80.000 COP", transactions: 15 } as GraphNode,
        { id: "suscripciones", group: 3, radius: 32, label: "Suscripciones", amount: "$35.000 COP", transactions: 3 } as GraphNode,
        { id: "ahorro", group: 5, radius: 60, label: "Ahorro programado", amount: "$500.000 COP", transactions: 1 } as GraphNode,
    ],
    links: [
        { source: "root", target: "cafes" },
        { source: "root", target: "streaming" },
        { source: "root", target: "domicilios" },
        { source: "root", target: "transporte" },
        { source: "root", target: "suscripciones" },
        { source: "root", target: "ahorro" }
    ] as GraphLink[]
};

// Add scattered transaction child nodes
const generateChildren = (parentId: string, count: number, group: number, isAlert: boolean = false) => {
    for (let i = 0; i < count; i++) {
        const childId = `${parentId}_child_${i}`;
        data.nodes.push({ id: childId, group, radius: Math.random() * 4 + 4, label: "", isAlert } as GraphNode);
        data.links.push({ source: parentId, target: childId });
    }
};

// Generate transaction nodes
generateChildren("cafes", 30, 2, true);
generateChildren("streaming", 2, 3);
generateChildren("domicilios", 7, 2, true);
generateChildren("transporte", 15, 4);
generateChildren("suscripciones", 3, 3);
generateChildren("ahorro", 1, 5);

export default function LeakBuster() {
    const svgRef = useRef<SVGSVGElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const [tooltip, setTooltip] = useState<{ visible: boolean, x: number, y: number, node: GraphNode | null }>({
        visible: false,
        x: 0,
        y: 0,
        node: null
    });

    useEffect(() => {
        if (!svgRef.current || !containerRef.current) return;

        const width = containerRef.current.clientWidth;
        const height = 750;

        const svg = d3.select(svgRef.current)
            .attr("width", width)
            .attr("height", height)
            .attr("viewBox", [0, 0, width, height]);

        svg.selectAll("*").remove(); 

        const colors = {
            root: "#a898c9", 
            alert: "#f36e53", 
            normal: "#397dc1", 
            healthy: "#d8a93f" 
        };

        const getNodeColor = (d: GraphNode) => {
            if (d.id === "root") return colors.root;
            if (d.isAlert) return colors.alert;
            if (d.group === 5) return colors.healthy;
            return colors.normal;
        };

        // Enhanced force simulation for "life"
        const simulation = d3.forceSimulation<GraphNode>(data.nodes as GraphNode[])
            .force("link", d3.forceLink<GraphNode, GraphLink>(data.links).id(d => d.id).distance(d => {
                return (d.source as GraphNode).id === "root" ? 220 : 45;
            }))
            .force("charge", d3.forceManyBody<GraphNode>().strength((d) => d.id === "root" ? -1500 : (d.label ? -600 : -50)))
            .force("center", d3.forceCenter(width / 2, height / 2))
            .force("collide", d3.forceCollide<GraphNode>().radius((d) => d.radius + 10).iterations(3))
            // Force aimed at making nodes move gently even without user input
            .alphaDecay(0.01) // Slower decay to keep it moving longer
            .alphaTarget(0.02); // Target slightly above 0 for continuous gentle vibe

        // Links
        const link = svg.append("g")
            .attr("stroke", "rgba(255,255,255,0.1)")
            .attr("stroke-opacity", 0.4)
            .selectAll("line")
            .data(data.links)
            .join("line")
            .attr("stroke-width", d => Math.sqrt(d.source === "root" ? 4 : 1.5));

        const nodeGroup = svg.append("g");

        const defs = svg.append("defs");
        
        // Regular glow
        const glowFilter = defs.append("filter").attr("id", "glow");
        glowFilter.append("feGaussianBlur").attr("stdDeviation", "4").attr("result", "coloredBlur");
        const feMerge = glowFilter.append("feMerge");
        feMerge.append("feMergeNode").attr("in", "coloredBlur");
        feMerge.append("feMergeNode").attr("in", "SourceGraphic");

        // Intense Alert Pulse Filter
        const alertFilter = defs.append("filter").attr("id", "alertPulse");
        alertFilter.append("feGaussianBlur").attr("stdDeviation", "8").attr("result", "blur");
        const feMergeAlert = alertFilter.append("feMerge");
        feMergeAlert.append("feMergeNode").attr("in", "blur");
        feMergeAlert.append("feMergeNode").attr("in", "SourceGraphic");

        // Nodes
        const node = nodeGroup.selectAll<SVGCircleElement, GraphNode>("circle")
            .data(data.nodes)
            .join("circle")
            .attr("r", d => d.radius)
            .attr("fill", d => getNodeColor(d))
            .attr("stroke", d => d.id === "root" ? "rgba(168,152,201,0.6)" : "none")
            .attr("stroke-width", 5)
            .attr("class", d => d.isAlert && d.label ? "animate-[pulse_1.5s_ease-in-out_infinite] cursor-pointer" : "transition-transform duration-500 hover:scale-[1.2] cursor-pointer")
            .style("filter", d => d.isAlert && d.label ? "url(#alertPulse)" : "url(#glow)") 
            .on("mouseover", (event, d) => {
                if (!d.label) return;
                setTooltip({
                    visible: true,
                    x: event.pageX,
                    y: event.pageY,
                    node: d
                });
                d3.select(event.currentTarget).attr("stroke", "rgba(255,255,255,0.8)").attr("stroke-width", 6);
            })
            .on("mousemove", (event) => {
                setTooltip(prev => ({ ...prev, x: event.pageX, y: event.pageY }));
            })
            .on("mouseout", (event, d) => {
                setTooltip(prev => ({ ...prev, visible: false }));
                d3.select(event.currentTarget).attr("stroke", d.id === "root" ? "rgba(168,152,201,0.6)" : "none").attr("stroke-width", 5);
            })
            .call(d3.drag<SVGCircleElement, GraphNode>()
                .on("start", (event, d) => {
                    if (!event.active) simulation.alphaTarget(0.3).restart();
                    d.fx = d.x;
                    d.fy = d.y;
                })
                .on("drag", (event, d) => {
                    d.fx = event.x;
                    d.fy = event.y;
                })
                .on("end", (event, d) => {
                    if (!event.active) simulation.alphaTarget(0.02); // Return to steady vibe
                    d.fx = null;
                    d.fy = null;
                })
            );

        // Labels for parent nodes
        const labels = svg.append("g")
            .selectAll("text")
            .data(data.nodes.filter(d => d.label))
            .join("text")
            .text(d => d.label)
            .attr("text-anchor", "middle")
            .attr("dy", d => d.id === "root" ? 8 : d.radius + 24)
            .attr("fill", d => d.id === "root" ? "#1e1b4b" : "white")
            .attr("font-size", d => d.id === "root" ? "16px" : "14px")
            .attr("font-weight", "900")
            .style("text-shadow", "0px 2px 10px rgba(0,0,0,0.9)")
            .style("pointer-events", "none")
            .style("letter-spacing", "0.025em");

        // Small inner icon for the root source node
        const rootIcon = svg.append("text")
            .datum(data.nodes[0])
            .text("💰")
            .attr("text-anchor", "middle")
            .attr("dy", -12)
            .attr("font-size", "32px")
            .style("pointer-events", "none");

        simulation.on("tick", () => {
            link
                .attr("x1", d => (d.source as GraphNode).x!)
                .attr("y1", d => (d.source as GraphNode).y!)
                .attr("x2", d => (d.target as GraphNode).x!)
                .attr("y2", d => (d.target as GraphNode).y!);

            node
                .attr("cx", d => d.x!)
                .attr("cy", d => d.y!);

            labels
                .attr("x", d => d.x!)
                .attr("y", d => d.y!);

            rootIcon
                .attr("x", d => d.x!)
                .attr("y", d => d.y!);
        });

        // Autonomous Movement: Inject subtle velocity randomly
        const moveTimer = setInterval(() => {
            data.nodes.forEach(node => {
                if (!node.fx) {
                    node.vx = (node.vx || 0) + (Math.random() - 0.5) * 0.2;
                    node.vy = (node.vy || 0) + (Math.random() - 0.5) * 0.2;
                }
            });
        }, 2000);

        return () => {
            simulation.stop();
            clearInterval(moveTimer);
        };
    }, []);

    return (
        <section className="relative py-32 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-white/5 bg-transparent overflow-hidden">
            
            {/* Focal Point Background Glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[700px] bg-[#397dc1]/5 blur-[200px] rounded-[100%] pointer-events-none -z-10" />

            <div className="text-center mb-16 max-w-4xl mx-auto">
                <span className="text-xs uppercase tracking-[0.4em] font-black text-[#397dc1] mb-6 block drop-shadow-sm">ANÁLISIS DE FLUJO</span>
                <h2 className="text-5xl md:text-7xl lg:text-8xl font-black mb-8 tracking-tighter text-white">
                    Lukas <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#f36e53] to-[#d8a93f]">Leak Buster</span>
                </h2>
                <p className="text-white/60 text-xl md:text-2xl leading-relaxed max-w-3xl mx-auto">
                    Visualización avanzada de clústeres donde Lukas identifica y aísla las fugas de capital en tiempo real.
                </p>
            </div>

            <div className="relative w-full max-w-6xl mx-auto rounded-[3.5rem] border border-white/10 bg-gradient-to-b from-[#1e1b4b]/40 to-black/40 backdrop-blur-3xl overflow-hidden shadow-[0_0_100px_rgba(33,66,141,0.3)] group" ref={containerRef}>
                
                {/* Visual Grid Background */}
                <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '40px 40px' }} />

                {/* D3 SVG Container */}
                <svg ref={svgRef} className="w-full min-h-[750px] cursor-grab active:cursor-grabbing relative z-10" />

                {/* Legend */}
                <div className="absolute bottom-10 left-10 z-20 hidden md:flex flex-col gap-3 glass p-6 rounded-3xl border border-white/10">
                    <div className="flex items-center gap-3">
                        <div className="w-3 h-3 rounded-full bg-[#f36e53] shadow-[0_0_10px_#f36e53]" />
                        <span className="text-xs font-bold text-white/70 uppercase tracking-widest">Fuga Detectada</span>
                    </div>
                    <div className="flex items-center gap-3">
                        <div className="w-3 h-3 rounded-full bg-[#397dc1]" />
                        <span className="text-xs font-bold text-white/70 uppercase tracking-widest">Gasto Normal</span>
                    </div>
                </div>

                {/* Custom Tooltip */}
                {tooltip.visible && tooltip.node && (
                    <div
                        className="fixed z-50 pointer-events-none transform -translate-x-1/2 -translate-y-[120%] animate-in fade-in zoom-in duration-200"
                        style={{ left: tooltip.x, top: tooltip.y }}
                    >
                        <div className={`backdrop-blur-3xl border-2 ${tooltip.node.isAlert ? 'border-[#f36e53] bg-black/95 shadow-[0_0_40px_rgba(243,110,83,0.5)]' : 'border-white/20 bg-black/90 shadow-3xl'} rounded-[2rem] p-6 min-w-[280px]`}>
                            {tooltip.node.isAlert && (
                                <div className="text-xs font-black text-[#f36e53] tracking-[0.2em] uppercase mb-4 flex items-center gap-3">
                                    <span className="w-3 h-3 rounded-full bg-[#f36e53] animate-ping" />
                                    ALERTA DE FUGA
                                </div>
                            )}
                            
                            {tooltip.node.id === "root" ? (
                                <>
                                    <h4 className="text-2xl font-black text-white mb-2">{tooltip.node.label}</h4>
                                    <p className="text-sm text-[#a898c9] font-bold tracking-wide uppercase">Source Alpha One</p>
                                </>
                            ) : (
                                <>
                                    <h4 className="text-2xl font-black text-white mb-4 tracking-tight">{tooltip.node.label}</h4>
                                    <div className="space-y-3">
                                        <div className="flex justify-between items-center py-2 border-b border-white/5">
                                            <span className="text-white/40 text-[10px] font-black uppercase tracking-widest">TOTAL GASTADO</span>
                                            <span className="text-white font-black text-lg">{tooltip.node.amount}</span>
                                        </div>
                                        <div className="flex justify-between items-center py-2">
                                            <span className="text-white/40 text-[10px] font-black uppercase tracking-widest">TRANSACCIONES</span>
                                            <span className="text-white font-black text-lg">{tooltip.node.transactions}</span>
                                        </div>
                                    </div>
                                </>
                            )}
                        </div>
                    </div>
                )}
            </div>
        </section>
    );
}
