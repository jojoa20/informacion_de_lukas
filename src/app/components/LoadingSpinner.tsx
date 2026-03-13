import { motion } from "motion/react";

export function LoadingSpinner() {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-[#050D1A] z-50">
      <motion.div
        className="relative w-32 h-32"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
      >
        {/* Outer ring */}
        <motion.div
          className="absolute inset-0 rounded-full border-4 border-[#00D4FF]/20"
          animate={{ rotate: 360 }}
          transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
        />
        
        {/* Inner animated ring */}
        <motion.div
          className="absolute inset-0 rounded-full border-4 border-transparent border-t-[#00D4FF] glow-cyan"
          animate={{ rotate: 360 }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
        />

        {/* Center pulse */}
        <motion.div
          className="absolute inset-4 rounded-full bg-[#00D4FF] glow-cyan"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.5, 0.8, 0.5],
          }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        />

        {/* Center dot */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-4 h-4 rounded-full bg-white" />
        </div>
      </motion.div>
      
      <motion.p
        className="absolute bottom-32 text-white/60 font-['Outfit',sans-serif] text-sm tracking-[2px] uppercase"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        Cargando Lukas...
      </motion.p>
    </div>
  );
}