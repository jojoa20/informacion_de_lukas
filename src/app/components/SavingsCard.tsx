import { motion } from "motion/react";
import { useApp } from "../context/AppContext";

export function SavingsCard() {
  const { getTotalSavings } = useApp();
  const savings = getTotalSavings();

  return (
    <motion.div
      className="glass-card-strong bg-gradient-to-br from-[#00FF88]/10 to-[#00FF88]/5 rounded-2xl p-6 neon-border glow-hover animate-float"
      style={{ borderColor: 'rgba(0, 255, 136, 0.3)' }}
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 0.2 }}
      whileHover={{ scale: 1.02 }}
    >
      {/* Icon */}
      <div className="bg-[#00FF88]/20 w-12 h-12 rounded-xl flex items-center justify-center mb-4 glow-green">
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="#00FF88"
          strokeWidth="2.5"
        >
          <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
        </svg>
      </div>

      {/* Label */}
      <p className="text-white/60 text-xs font-['Outfit',sans-serif] uppercase tracking-[1.5px] mb-2">
        Ahorro del Mes
      </p>

      {/* Amount */}
      <div className="flex items-baseline gap-2 mb-3">
        <h3 className="text-white text-3xl font-['Outfit',sans-serif] font-bold">
          ${savings.toLocaleString()}
        </h3>
        <motion.span
          className="text-[#00FF88] text-sm font-['Outfit',sans-serif] font-medium"
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4 }}
        >
          ↑ 12%
        </motion.span>
      </div>

      {/* Progress indicator */}
      <div className="space-y-2">
        <div className="flex justify-between text-xs">
          <span className="text-white/40 font-['Outfit',sans-serif]">
            Meta: $2.000
          </span>
          <span className="text-[#00FF88] font-['Outfit',sans-serif] font-medium">
            {Math.round((savings / 2000) * 100)}%
          </span>
        </div>
        <div className="h-2 bg-white/10 rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-gradient-to-r from-[#00FF88] to-[#00D4FF] rounded-full glow-green"
            initial={{ width: 0 }}
            animate={{ width: `${Math.min((savings / 2000) * 100, 100)}%` }}
            transition={{ duration: 1, delay: 0.5, ease: "easeOut" }}
          />
        </div>
      </div>

      {/* Animated particles */}
      {savings > 1000 && (
        <>
          <motion.div
            className="absolute top-4 right-4 w-2 h-2 bg-[#00FF88] rounded-full animate-pulse-glow"
            animate={{
              scale: [1, 1.5, 1],
              opacity: [0.5, 1, 0.5],
            }}
            transition={{ duration: 2, repeat: Infinity }}
          />
          <motion.div
            className="absolute bottom-8 left-6 w-1.5 h-1.5 bg-[#00D4FF] rounded-full animate-pulse-glow"
            animate={{
              scale: [1, 1.3, 1],
              opacity: [0.3, 0.8, 0.3],
            }}
            transition={{ duration: 2.5, repeat: Infinity, delay: 0.5 }}
          />
        </>
      )}
    </motion.div>
  );
}