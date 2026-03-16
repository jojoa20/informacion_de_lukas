"use client";

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const CHAT_SEQUENCE = [
  { id: 1, type: 'user', text: 'Lukas, ¿cómo voy este mes?', delay: 1000 },
  { id: 2, type: 'lukas', text: 'Parce… vas regular.', delay: 3000 },
  { id: 3, type: 'lukas', text: 'Llevas $180.000 en domicilios esta semana.', delay: 5000 },
  { id: 4, type: 'lukas', text: 'Si sigues así no llegas a fin de mes.', delay: 7000 },
  { id: 5, type: 'lukas', text: 'Te recomiendo bajar domicilios 30%.', delay: 9000 },
];

export default function AIPersonality() {
  const [visibleMessages, setVisibleMessages] = useState<number[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const startSequence = () => {
      setVisibleMessages([]);
      setIsTyping(false);

      CHAT_SEQUENCE.forEach((msg, index) => {
        setTimeout(() => {
          if (msg.type === 'lukas') {
            setIsTyping(true);
            setTimeout(() => {
              setIsTyping(false);
              setVisibleMessages(prev => [...prev, msg.id]);
            }, 1000);
          } else {
            setVisibleMessages(prev => [...prev, msg.id]);
          }
        }, msg.delay);
      });

      // Restart loop after 12 seconds
      setTimeout(startSequence, 12000);
    };

    startSequence();
  }, []);

  return (
    <section className="relative py-32 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-white/5 bg-[#020617] overflow-hidden">
      
      {/* Background Glow */}
      <div className="absolute inset-0 z-0 pointer-events-none opacity-20">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[#397dc1]/10 blur-[120px] rounded-full" />
      </div>

      <div className="relative z-10 text-center mb-16">
        <h2 className="text-4xl md:text-5xl lg:text-6xl font-black mb-6 tracking-tight text-white">
          Habla con Lukas como <span className="text-[#397dc1]">con un pana.</span>
        </h2>
        <p className="text-white/70 text-lg md:text-xl font-medium max-w-[640px] mx-auto">
          Lukas analiza tus gastos y te dice la verdad, sin rodeos.
        </p>
      </div>

      <div className="relative z-10 max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        
        {/* Chat Interface */}
        <div className="bg-black/40 border border-white/5 rounded-[32px] p-6 md:p-10 backdrop-blur-xl shadow-2xl min-h-[500px] flex flex-col">
          <div className="flex-1 space-y-4">
            <AnimatePresence>
              {CHAT_SEQUENCE.map((msg) => visibleMessages.includes(msg.id) && (
                <motion.div
                  key={msg.id}
                  initial={{ opacity: 0, y: 10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  className={`flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div className="flex items-end gap-3 max-w-[80%]">
                    {msg.type === 'lukas' && (
                      <div className="w-8 h-8 rounded-full bg-[#397dc1] flex items-center justify-center text-xs shadow-[0_0_15px_rgba(57,125,193,0.4)]">
                        🤖
                      </div>
                    )}
                    <div className={`p-4 rounded-2xl text-sm font-medium leading-relaxed shadow-lg ${
                      msg.type === 'user' 
                        ? 'bg-gradient-to-br from-[#397dc1] to-[#21428d] text-white rounded-br-none' 
                        : 'bg-white/5 border border-white/10 text-white/90 rounded-bl-none'
                    }`}>
                      {msg.text}
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>

            {/* Typing Indicator */}
            {isTyping && (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex justify-start"
              >
                <div className="flex items-center gap-3 bg-white/5 border border-white/10 p-3 rounded-2xl rounded-bl-none">
                  <div className="w-6 h-6 rounded-full bg-[#397dc1]/20 flex items-center justify-center text-[10px]">🤖</div>
                  <div className="flex gap-1">
                    <motion.div animate={{ opacity: [0.2, 1, 0.2] }} transition={{ repeat: Infinity, duration: 1 }} className="w-1.5 h-1.5 bg-white/40 rounded-full" />
                    <motion.div animate={{ opacity: [0.2, 1, 0.2] }} transition={{ repeat: Infinity, duration: 1, delay: 0.2 }} className="w-1.5 h-1.5 bg-white/40 rounded-full" />
                    <motion.div animate={{ opacity: [0.2, 1, 0.2] }} transition={{ repeat: Infinity, duration: 1, delay: 0.4 }} className="w-1.5 h-1.5 bg-white/40 rounded-full" />
                  </div>
                </div>
              </motion.div>
            )}
          </div>
        </div>

        {/* Visual Data Companion */}
        <div className="bg-black/40 border border-white/5 rounded-[32px] p-10 backdrop-blur-xl shadow-2xl relative overflow-hidden group">
          <h4 className="text-white/40 text-xs font-black uppercase tracking-[0.3em] mb-10">Análisis en tiempo real</h4>
          
          <div className="space-y-8">
            {[
              { label: 'Transporte', value: 45, color: '#397dc1' },
              { label: 'Domicilios', value: 90, color: '#f36e53', highlight: true },
              { label: 'Cafés', value: 30, color: '#a898c9' },
              { label: 'Streaming', value: 20, color: '#397dc1' }
            ].map((item, i) => (
              <div key={i} className="space-y-2">
                <div className="flex justify-between text-[10px] font-bold uppercase tracking-widest">
                  <span className={item.highlight ? 'text-[#f36e53]' : 'text-white/40'}>{item.label}</span>
                  <span className="text-white/60">${item.label === 'Domicilios' ? '180k' : '45k'}</span>
                </div>
                <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden">
                  <motion.div 
                    initial={{ width: 0 }}
                    whileInView={{ width: `${item.value}%` }}
                    transition={{ duration: 1.5, delay: i * 0.2 }}
                    className="h-full rounded-full relative"
                    style={{ backgroundColor: item.color }}
                  >
                    {item.highlight && (
                      <div className="absolute inset-0 bg-white/20 animate-pulse" />
                    )}
                  </motion.div>
                </div>
              </div>
            ))}
          </div>

          {/* AI Alert Decoration */}
          <div className="mt-12 p-4 rounded-xl bg-[#f36e53]/10 border border-[#f36e53]/20 flex items-center justify-between">
            <span className="text-[#f36e53] text-[10px] font-black uppercase tracking-widest animate-pulse">Patrón identificado</span>
            <span className="text-white/60 text-[10px] font-medium">Gasto crítico detectado en Domicilios</span>
          </div>
        </div>

      </div>

      {/* Footer Branding */}
      <div className="mt-20 text-center">
        <p className="text-[10px] font-mono font-black text-white/20 tracking-[0.5em] uppercase">
          Lukas AI Personality Core v1.0
        </p>
      </div>
    </section>
  );
}
