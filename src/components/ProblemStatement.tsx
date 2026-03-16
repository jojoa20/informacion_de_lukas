"use client";

import React from 'react';
import { motion } from 'framer-motion';

export default function ProblemStatement() {
    return (
        <section className="relative pt-20 pb-0 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto overflow-hidden bg-transparent">
            {/* Minimal background elements */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-[#397dc1]/5 blur-[120px] rounded-full -z-10" />

            <div className="max-w-4xl mx-auto text-center">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    viewport={{ once: true, amount: 0.5 }}
                >
                    <h2 className="text-4xl md:text-5xl lg:text-6xl font-black mb-6 tracking-tight text-white leading-tight">
                        La mayoría de los problemas <br className="hidden md:block" />
                        <span className="text-white/40">financieros empiezan así.</span>
                    </h2>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    viewport={{ once: true, amount: 0.5 }}
                    className="space-y-4"
                >
                    <p className="text-2xl md:text-3xl font-medium text-white/80 tracking-tight">
                        No con compras grandes.
                    </p>
                    <p className="text-2xl md:text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-[#f36e53] to-[#d8a93f] tracking-tight">
                        Sino con pequeños gastos diarios que pasan desapercibidos.
                    </p>
                </motion.div>
            </div>

        </section>
    );
}
