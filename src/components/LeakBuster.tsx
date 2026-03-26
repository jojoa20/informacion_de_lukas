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
        { id: "root", group: 1, radius: 60, label: "Ingresos / Quincena" } as GraphNode,
        // Clusters
        { id: "cafes", group: 2, radius: 40, label: "Cafés", isAlert: true, amount: "$45.000", transactions: 9 } as GraphNode,
        { id: "streaming", group: 3, radius: 35, label: "Streaming", amount: "$80.000", transactions: 4 } as GraphNode,
        { id: "domicilio", group: 2, radius: 50, label: "Comida domicilio", isAlert: true, amount: "$210.000", transactions: 7 } as GraphNode,
        { id: "transporte", group: 4, radius: 45, label: "Transporte", amount: "$120.000", transactions: 15 } as GraphNode,
        { id: "suscripciones", group: 3, radius: 30, label: "Suscripciones", amount: "$35.000", transactions: 2 } as GraphNode,
        { id: "compras", group: 2, radius: 45, label: "Compras impulsivas", isAlert: true, amount: "$150.000", transactions: 5 } as GraphNode,
        { id: "ahorro", group: 5, radius: 55, label: "Ahorro programado", amount: "$500.000", transactions: 1 } as GraphNode,
    ],
    links: [
        { source: "root", target: "cafes" },
        { source: "root", target: "streaming" },
        { source: "root", target: "domicilio" },
        { source: "root", target: "transporte" },
        { source: "root", target: "suscripciones" },
        { source: "root", target: "compras" },
        { source: "root", target: "ahorro" }
    ] as GraphLink[]
};

// Add scattered transaction child nodes
const generateChildren = (parentId: string, count: number, group: number, isAlert: boolean = false) => {
    for (let i = 0; i < count; i++) {
        const childId = `${parentId}_child_${i}`;
        data.nodes.push({ id: childId, group, radius: Math.random() * 5 + 3, label: "", isAlert } as GraphNode);
        data.links.push({ source: parentId, target: childId });
    }
};

generateChildren("cafes", 9, 2, true);
generateChildren("streaming", 4, 3);
generateChildren("domicilio", 7, 2, true);
generateChildren("transporte", 15, 4);
generateChildren("suscripciones", 2, 3);
generateChildren("compras", 5, 2, true);
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
        const height = 600;

        const svg = d3.select(svgRef.current)
            .attr("width", width)
            .attr("height", height)
            .attr("viewBox", [0, 0, width, height]);

        svg.selectAll("*").remove(); // Clear previous render

        // Color definitions
        const colors = {
            root: "#4cc9f0", // cyan
            alert: "#ff7a59", // warning orange/red for hormiga
            normal: "#7c5cff", // standard purple
            healthy: "#6ee7b7" // success green
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
                return (d.source as GraphNode).id === "root" ? 180 : 30;
            }))
            .force("charge", d3.forceManyBody<GraphNode>().strength((d) => d.id === "root" ? -1000 : (d.label ? -300 : -30)))
            .force("center", d3.forceCenter(width / 2, height / 2))
            .force("collide", d3.forceCollide<GraphNode>().radius((d) => d.radius + 5).iterations(2));

        // Links
        const link = svg.append("g")
            .attr("stroke", "rgba(255,255,255,0.1)")
            .attr("stroke-opacity", 0.6)
            .selectAll("line")
            .data(data.links)
            .join("line")
            .attr("stroke-width", d => Math.sqrt(d.source === "root" ? 3 : 1));

        // Nodes group
        const nodeGroup = svg.append("g");

        // Defs for glow filter on alerts
        const defs = svg.append("defs");
        const filter = defs.append("filter").attr("id", "glow");
        filter.append("feGaussianBlur").attr("stdDeviation", "8").attr("result", "coloredBlur");
        const feMerge = filter.append("feMerge");
        feMerge.append("feMergeNode").attr("in", "coloredBlur");
        feMerge.append("feMergeNode").attr("in", "SourceGraphic");

        // Actual nodes
        const node = nodeGroup.selectAll<SVGCircleElement, GraphNode>("circle")
            .data(data.nodes)
            .join("circle")
            .attr("r", d => d.radius)
            .attr("fill", d => getNodeColor(d))
            .attr("stroke", d => d.id === "root" ? "rgba(76,201,240,0.5)" : "none")
            .attr("stroke-width", 4)
            .attr("class", d => d.isAlert && d.label ? "animate-pulse" : "transition-transform duration-300 hover:scale-110")
            .style("filter", d => d.isAlert && d.label ? "url(#glow)" : "none")
            .style("cursor", d => d.label ? "pointer" : "default")
            .on("mouseover", (event, d) => {
                if (!d.label) return;
                setTooltip({
                    visible: true,
                    x: event.pageX,
                    y: event.pageY,
                    node: d
                });
                // Highlight logic
                d3.select(event.currentTarget).attr("stroke", "rgba(255,255,255,0.5)").attr("stroke-width", 4);
            })
            .on("mousemove", (event) => {
                setTooltip(prev => ({ ...prev, x: event.pageX, y: event.pageY }));
            })
            .on("mouseout", (event, d) => {
                setTooltip(prev => ({ ...prev, visible: false }));
                d3.select(event.currentTarget).attr("stroke", d.id === "root" ? "rgba(76,201,240,0.5)" : "none");
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
            .attr("dy", d => d.id === "root" ? 5 : d.radius + 15)
            .attr("fill", d => d.id === "root" ? "#120c2c" : "rgba(255,255,255,0.8)")
            .attr("font-size", d => d.id === "root" ? "12px" : "11px")
            .attr("font-weight", d => d.id === "root" ? "bold" : "600")
            .style("pointer-events", "none");

        const rootIcon = svg.append("text")
            .datum(data.nodes[0])
            .text("💰")
            .attr("text-anchor", "middle")
            .attr("dy", -10)
            .attr("font-size", "24px")
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

        return () => {
            simulation.stop();
        };
    }, []);

    return (
        <section className="relative py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-white/5 mt-12 bg-black/20">
            <div className="text-center mb-10 max-w-3xl mx-auto">
                <h2 className="text-4xl md:text-5xl font-black mb-4 tracking-tight">
                    <span className="text-white">Lukas AI </span>
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#4cc9f0] to-[#7c5cff]">
                        Leak Buster
                    </span>
                </h2>
                <p className="text-white/60 text-lg">
                    Explora la red de inteligencia artificial que visualiza, clasifica y audita cada transacción de tu sistema financiero en tiempo real.
                    Interactúa con los nodos para analizar tus hábitos.
                </p>
            </div>

            <div className="relative w-full rounded-3xl border border-white/10 bg-[#0a0618] overflow-hidden shadow-2xl" ref={containerRef}>
                <div className="absolute top-6 left-6 flex items-center gap-4 z-10 bg-black/50 backdrop-blur-md px-4 py-3 rounded-xl border border-white/10">
                    <div className="flex items-center gap-2">
                        <span className="w-3 h-3 rounded-full bg-[#ff7a59] animate-pulse"></span>
                        <span className="text-xs text-white/80 font-medium tracking-wide">Gastos Hormiga (Riesgo)</span>
                    </div>
                    <div className="w-px h-4 bg-white/20" />
                    <div className="flex items-center gap-2">
                        <span className="w-3 h-3 rounded-full bg-[#6ee7b7]"></span>
                        <span className="text-xs text-white/80 font-medium tracking-wide">Saludable / Ahorro</span>
                    </div>
                </div>

                {/* D3 SVG Container */}
                <svg ref={svgRef} className="w-full min-h-[600px] cursor-grab active:cursor-grabbing" />

                {/* Custom React Tooltip */}
                {tooltip.visible && tooltip.node && (
                    <div
                        className="fixed z-50 pointer-events-none transform -translate-x-1/2 -translate-y-full pb-4"
                        style={{ left: tooltip.x, top: tooltip.y }}
                    >
                        <div className={`backdrop-blur-xl border ${tooltip.node.isAlert ? 'border-[#ff7a59]/50 bg-black/80 shadow-[0_0_20px_rgba(255,122,89,0.3)]' : 'border-white/20 bg-black/80'} rounded-xl p-4 min-w-[200px]`}>
                            {tooltip.node.isAlert && (
                                <div className="text-xs font-bold text-[#ff7a59] uppercase tracking-wider mb-2 flex items-center gap-2">
                                    <span className="w-2 h-2 rounded-full bg-[#ff7a59] animate-pulse" />
                                    Cluster alerta: Gastos hormiga
                                </div>
                            )}
                            {tooltip.node.id === "root" ? (
                                <>
                                    <h4 className="text-lg font-bold text-white mb-1">{tooltip.node.label}</h4>
                                    <p className="text-sm text-lukas-success font-medium">Motor de análisis activo</p>
                                </>
                            ) : (
                                <>
                                    <h4 className="text-lg font-bold text-white mb-1">{tooltip.node.label}</h4>
                                    <div className="flex justify-between items-center text-sm mb-1">
                                        <span className="text-white/60">Monto:</span>
                                        <span className="text-white font-medium">{tooltip.node.amount}</span>
                                    </div>
                                    <div className="flex justify-between items-center text-sm">
                                        <span className="text-white/60">Transacciones:</span>
                                        <span className="text-white font-medium">{tooltip.node.transactions}</span>
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
