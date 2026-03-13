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
        { id: "root", group: 1, radius: 70, label: "Ingresos / Quincena" } as GraphNode,
        // Clusters
        { id: "cafes", group: 2, radius: 45, label: "Cafés", isAlert: true, amount: "$150.000 COP", transactions: 30 } as GraphNode,
        { id: "streaming", group: 3, radius: 35, label: "Streaming", amount: "$45.000 COP", transactions: 2 } as GraphNode,
        { id: "domicilios", group: 2, radius: 50, label: "Domicilios", isAlert: true, amount: "$210.000 COP", transactions: 7 } as GraphNode,
        { id: "transporte", group: 4, radius: 45, label: "Transporte", amount: "$80.000 COP", transactions: 15 } as GraphNode,
        { id: "suscripciones", group: 3, radius: 30, label: "Suscripciones", amount: "$35.000 COP", transactions: 3 } as GraphNode,
        { id: "ahorro", group: 5, radius: 55, label: "Ahorro programado", amount: "$500.000 COP", transactions: 1 } as GraphNode,
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
        data.nodes.push({ id: childId, group, radius: Math.random() * 4 + 3, label: "", isAlert } as GraphNode);
        data.links.push({ source: parentId, target: childId });
    }
};

// Generate exactly the requested transaction nodes
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
        const height = 650;

        const svg = d3.select(svgRef.current)
            .attr("width", width)
            .attr("height", height)
            .attr("viewBox", [0, 0, width, height]);

        svg.selectAll("*").remove(); // Clear previous render

        // Color definitions matching the visual identity
        const colors = {
            root: "#a898c9", // violet
            alert: "#f36e53", // coral red / warning
            normal: "#397dc1", // primary blue
            healthy: "#d8a93f" // gold
        };

        const getNodeColor = (d: GraphNode) => {
            if (d.id === "root") return colors.root;
            if (d.isAlert) return colors.alert;
            if (d.group === 5) return colors.healthy;
            return colors.normal;
        };

        const simulation = d3.forceSimulation<GraphNode>(data.nodes as GraphNode[])
            .force("link", d3.forceLink<GraphNode, GraphLink>(data.links).id(d => d.id).distance(d => {
                // Distance depends on if it's linking to a cluster parent or a tiny transaction child
                return (d.source as GraphNode).id === "root" ? 200 : 35;
            }))
            .force("charge", d3.forceManyBody<GraphNode>().strength((d) => d.id === "root" ? -1200 : (d.label ? -400 : -40)))
            .force("center", d3.forceCenter(width / 2, height / 2))
            .force("collide", d3.forceCollide<GraphNode>().radius((d) => d.radius + 6).iterations(3));

        // Links
        const link = svg.append("g")
            .attr("stroke", "rgba(255,255,255,0.15)")
            .attr("stroke-opacity", 0.6)
            .selectAll("line")
            .data(data.links)
            .join("line")
            .attr("stroke-width", d => Math.sqrt(d.source === "root" ? 3 : 1));

        // Nodes group
        const nodeGroup = svg.append("g");

        // Defs for glow filter
        const defs = svg.append("defs");
        const filter = defs.append("filter").attr("id", "glow");
        filter.append("feGaussianBlur").attr("stdDeviation", "6").attr("result", "coloredBlur");
        const feMerge = filter.append("feMerge");
        feMerge.append("feMergeNode").attr("in", "coloredBlur");
        feMerge.append("feMergeNode").attr("in", "SourceGraphic");

        // Actual nodes
        const node = nodeGroup.selectAll<SVGCircleElement, GraphNode>("circle")
            .data(data.nodes)
            .join("circle")
            .attr("r", d => d.radius)
            .attr("fill", d => getNodeColor(d))
            .attr("stroke", d => d.id === "root" ? "rgba(168,152,201,0.5)" : "none")
            .attr("stroke-width", 4)
            .attr("class", d => d.isAlert && d.label ? "animate-[pulse_2s_cubic-bezier(0.4,0,0.6,1)_infinite]" : "transition-transform duration-500 hover:scale-[1.15]")
            .style("filter", d => d.isAlert && d.label ? "url(#glow)" : "url(#glow)") // Soft glow to all, intense to alert
            .style("cursor", d => d.label ? "pointer" : "default")
            .on("mouseover", (event, d) => {
                if (!d.label) return;
                setTooltip({
                    visible: true,
                    x: event.pageX,
                    y: event.pageY,
                    node: d
                });
                d3.select(event.currentTarget).attr("stroke", "rgba(255,255,255,0.6)").attr("stroke-width", 5);
            })
            .on("mousemove", (event) => {
                setTooltip(prev => ({ ...prev, x: event.pageX, y: event.pageY }));
            })
            .on("mouseout", (event, d) => {
                setTooltip(prev => ({ ...prev, visible: false }));
                d3.select(event.currentTarget).attr("stroke", d.id === "root" ? "rgba(168,152,201,0.5)" : "none").attr("stroke-width", 4);
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
                    if (!event.active) simulation.alphaTarget(0);
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
            .attr("dy", d => d.id === "root" ? 5 : d.radius + 18)
            .attr("fill", d => d.id === "root" ? "#1e1b4b" : "rgba(255,255,255,0.9)")
            .attr("font-size", d => d.id === "root" ? "14px" : "13px")
            .attr("font-weight", d => d.id === "root" ? "800" : "600")
            .style("text-shadow", "0px 2px 4px rgba(0,0,0,0.8)")
            .style("pointer-events", "none");

        // Small inner icon for the root source node
        const rootIcon = svg.append("text")
            .datum(data.nodes[0])
            .text("💰")
            .attr("text-anchor", "middle")
            .attr("dy", -10)
            .attr("font-size", "28px")
            .style("pointer-events", "none");

        // Animation slow drift
        simulation.on("tick", () => {
            // Apply a very slight continuous gentle rotation/drift if needed, but force layout handles the organic feeling well
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

        return () => {
            simulation.stop();
        };
    }, []);

    return (
        <section className="relative py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-white/5 mt-12 bg-transparent">
            <div className="text-center mb-10 max-w-3xl mx-auto">
                <h2 className="text-4xl md:text-5xl lg:text-6xl font-black mb-6 tracking-tight">
                    Lukas AI Leak Buster
                </h2>
                <p className="text-white/70 text-lg md:text-xl leading-relaxed">
                    Visualiza cómo Lukas detecta las fugas y gastos hormiga en tiempo real, agrupando cada transacción.
                </p>
            </div>

            <div className="relative w-full rounded-[2.5rem] border border-white/10 bg-gradient-to-b from-[#0f172a]/80 to-[#1e1b4b]/80 backdrop-blur-2xl overflow-hidden shadow-[0_0_60px_rgba(33,66,141,0.2)]" ref={containerRef}>
                
                {/* D3 SVG Container */}
                <svg ref={svgRef} className="w-full min-h-[650px] cursor-grab active:cursor-grabbing" />

                {/* Custom React Tooltip Exactly Matching Requirements */}
                {tooltip.visible && tooltip.node && (
                    <div
                        className="fixed z-50 pointer-events-none transform -translate-x-1/2 -translate-y-[120%]"
                        style={{ left: tooltip.x, top: tooltip.y }}
                    >
                        <div className={`backdrop-blur-2xl border ${tooltip.node.isAlert ? 'border-[#f36e53] bg-black/90 shadow-[0_0_30px_rgba(243,110,83,0.4)]' : 'border-white/20 bg-black/80 shadow-2xl'} rounded-2xl p-5 min-w-[240px]`}>
                            {tooltip.node.isAlert && (
                                <div className="text-sm font-black text-[#f36e53] tracking-wide mb-3 flex items-center gap-2">
                                    <span className="w-3 h-3 rounded-full bg-[#f36e53] animate-pulse" />
                                    Cluster alerta: Gastos hormiga
                                </div>
                            )}
                            
                            {tooltip.node.id === "root" ? (
                                <>
                                    <h4 className="text-xl font-bold text-white mb-2">{tooltip.node.label}</h4>
                                    <p className="text-sm text-[#a898c9] font-medium">Origen de los fondos auditados</p>
                                </>
                            ) : (
                                <>
                                    {!tooltip.node.isAlert && (
                                        <h4 className="text-xl font-bold text-white mb-3">{tooltip.node.label}</h4>
                                    )}
                                    <div className="flex flex-col gap-2">
                                        <div className="flex justify-between items-center text-sm">
                                            <span className="text-white/70">Monto:</span>
                                            <span className="text-white font-bold">{tooltip.node.amount}</span>
                                        </div>
                                        <div className="flex justify-between items-center text-sm">
                                            <span className="text-white/70">Transacciones:</span>
                                            <span className="text-white font-bold">{tooltip.node.transactions} {tooltip.node.transactions === 1 ? 'transacción' : 'transacciones'}</span>
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
