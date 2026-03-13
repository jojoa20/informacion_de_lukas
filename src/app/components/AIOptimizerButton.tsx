import { motion } from "motion/react";
import { useState } from "react";
import { useApp } from "../context/AppContext";

export function AIOptimizerButton() {
  const [isOptimizing, setIsOptimizing] = useState(false);
  const { getTotalSavings, setLukasState } = useApp();

  const handleOptimize = async () => {
    setIsOptimizing(true);
    setLukasState("scanner");

    // Simulate AI processing
    await new Promise(resolve => setTimeout(resolve, 2000));

    setLukasState("success");
    setIsOptimizing(false);

    // Reset to neutral after celebration
    setTimeout(() => {
      setLukasState("neutral");
    }, 3000);
  };

  const savings = getTotalSavings();

  return (
    <motion.button
      onClick={handleOptimize}
      disabled={isOptimizing}
      className="relative bg-gradient-to-r from-[#258cf4] to-[#9333ea] text-white rounded-2xl px-8 py-4 shadow-2xl overflow-hidden"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3 }}
    >
      {/* Animated gradient background */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-[#9333ea] to-[#258cf4]"
        animate={{
          x: isOptimizing ? ["-100%", "100%"] : "0%",
        }}
        transition={{
          duration: 1.5,
          repeat: isOptimizing ? Infinity : 0,
          ease: "linear",
        }}
      />

      {/* Content */}
      <div className="relative z-10 flex items-center gap-3">
        <motion.div
          animate={{ rotate: isOptimizing ? 360 : 0 }}
          transition={{ duration: 1, repeat: isOptimizing ? Infinity : 0, ease: "linear" }}
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M12 2L2 7l10 5 10-5-10-5z" />
            <path d="M2 17l10 5 10-5M2 12l10 5 10-5" />
          </svg>
        </motion.div>

        <div className="flex flex-col items-start">
          <span className="font-['Manrope:Bold',sans-serif] text-sm tracking-[1.2px] uppercase">
            {isOptimizing ? "Optimizando..." : "IA Optimizer"}
          </span>
          {!isOptimizing && savings > 0 && (
            <span className="font-['Manrope:Medium',sans-serif] text-xs opacity-80">
              Ahorra hasta ${savings.toLocaleString()}
            </span>
          )}
        </div>

        {isOptimizing && (
          <motion.div
            className="ml-auto flex gap-1"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            {[0, 1, 2].map(i => (
              <motion.div
                key={i}
                className="w-2 h-2 bg-white rounded-full"
                animate={{ y: [0, -8, 0] }}
                transition={{
                  duration: 0.6,
                  repeat: Infinity,
                  delay: i * 0.2,
                }}
              />
            ))}
          </motion.div>
        )}
      </div>
    </motion.button>
  );
}
