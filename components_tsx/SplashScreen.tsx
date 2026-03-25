import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface SplashScreenProps {
  onFinishLoading: () => void;
}

export default function SplashScreen({ onFinishLoading }: SplashScreenProps) {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
      setTimeout(onFinishLoading, 800); // give time for fade out
    }, 3000);
    return () => clearTimeout(timer);
  }, [onFinishLoading]);

  // SVG Nodes coordinates
  const nodes = [
    { cx: 50, cy: 50 },
    { cx: 150, cy: 30 },
    { cx: 100, cy: 100 },
    { cx: 40, cy: 150 },
    { cx: 160, cy: 140 },
  ];

  const lines = [
    { x1: 50, y1: 50, x2: 100, y2: 100 },
    { x1: 150, y1: 30, x2: 100, y2: 100 },
    { x1: 40, y1: 150, x2: 100, y2: 100 },
    { x1: 160, y1: 140, x2: 100, y2: 100 },
    { x1: 50, y1: 50, x2: 40, y2: 150 },
  ];

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.05 }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
          className="bg-[#21428D] fixed inset-0 z-[100] flex flex-col items-center justify-center"
        >
          {/* Central Logo Node Network Animation */}
          <div className="relative w-[200px] h-[200px] flex items-center justify-center mb-8">
            <svg width="200" height="200" viewBox="0 0 200 200" className="overflow-visible drop-shadow-[0_0_15px_rgba(216,169,63,0.5)]">
              {/* Lines Drawing */}
              {lines.map((line, i) => (
                <motion.line
                  key={`line-${i}`}
                  x1={line.x1}
                  y1={line.y1}
                  x2={line.x2}
                  y2={line.y2}
                  stroke="#D8A93F"
                  strokeWidth="2"
                  strokeLinecap="round"
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={{ pathLength: 1, opacity: 0.6 }}
                  transition={{ duration: 1.5, ease: "easeInOut", delay: 0.2 }}
                />
              ))}

              {/* Nodes Popping */}
              {nodes.map((node, i) => (
                <motion.circle
                  key={`node-${i}`}
                  cx={node.cx}
                  cy={node.cy}
                  r="6"
                  fill={i === 2 ? "#D8A93F" : "#F36E53"} // Center node gold, others coral
                  stroke="#111827"
                  strokeWidth="2"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{
                    type: "spring",
                    stiffness: 300,
                    damping: 15,
                    delay: 1.2 + i * 0.1, // Appear after lines start
                  }}
                  className="drop-shadow-[0_0_8px_rgba(243,110,83,0.8)]"
                />
              ))}
              
              {/* Pulse effect on center node */}
              <motion.circle
                  cx={100}
                  cy={100}
                  r="12"
                  fill="none"
                  stroke="#D8A93F"
                  strokeWidth="2"
                  initial={{ scale: 0, opacity: 1 }}
                  animate={{ scale: 2.5, opacity: 0 }}
                  transition={{
                    duration: 1.5,
                    repeat: Infinity,
                    delay: 1.8,
                  }}
              />
            </svg>
          </div>

          {/* Lukas AI Text */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="text-[#D8A93F] text-4xl font-black tracking-tighter drop-shadow-[0_0_20px_rgba(216,169,63,0.8)]"
          >
            Lukas AI
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 1.2 }}
            className="text-white/60 text-sm mt-2 tracking-widest uppercase font-medium"
          >
            Iniciando
          </motion.p>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
