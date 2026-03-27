import { motion } from "motion/react";
import { useEffect, useState } from "react";

interface SplashScreenProps {
  onComplete: () => void;
}

export function SplashScreen({ onComplete }: SplashScreenProps) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(onComplete, 500);
          return 100;
        }
        return prev + 2;
      });
    }, 30);

    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="fixed inset-0 z-50 bg-[#050D1A] flex flex-col items-center justify-center"
    >
      {/* Background effects */}
      <div className="absolute inset-0 opacity-30">
        <motion.div
          className="absolute top-1/4 left-1/4 w-[400px] h-[400px] bg-gradient-radial from-[#00D4FF]/40 to-transparent blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute bottom-1/4 right-1/4 w-[350px] h-[350px] bg-gradient-radial from-[#00FF88]/30 to-transparent blur-3xl"
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1.5,
          }}
        />
      </div>

      {/* Logo/Orb */}
      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
        className="relative mb-8"
      >
        {/* Pulse rings */}
        <motion.div
          className="absolute inset-0 rounded-full border-2 border-[#00D4FF]/40"
          style={{
            width: "200px",
            height: "200px",
            left: "50%",
            top: "50%",
            transform: "translate(-50%, -50%)",
          }}
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.5, 0, 0.5],
          }}
          transition={{
            duration: 2.5,
            repeat: Infinity,
            ease: "easeOut",
          }}
        />

        {/* Main orb */}
        <div className="relative w-32 h-32 rounded-full bg-gradient-to-br from-[#00D4FF] via-[#00B8D4] to-[#0088CC] flex items-center justify-center overflow-hidden glow-cyan-strong">
          <div className="absolute inset-0 bg-white/10" />
          <div
            className="absolute rounded-full opacity-40"
            style={{
              width: "60%",
              height: "60%",
              top: "15%",
              left: "15%",
              background: "radial-gradient(circle at 30% 30%, rgba(255, 255, 255, 0.6), transparent 70%)",
            }}
          />
          
          {/* Simple smiley face */}
          <div className="relative z-10 text-white">
            <svg width="60" height="60" viewBox="0 0 24 24" fill="none">
              <circle cx="12" cy="12" r="10" fill="white" opacity="0.9" />
              <circle cx="9" cy="10" r="1.5" fill="#0088CC" />
              <circle cx="15" cy="10" r="1.5" fill="#0088CC" />
              <path
                d="M8 14c0 2.21 1.79 4 4 4s4-1.79 4-4"
                stroke="#0088CC"
                strokeWidth="1.5"
                strokeLinecap="round"
                fill="none"
              />
            </svg>
          </div>
        </div>
      </motion.div>

      {/* Text */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.6 }}
        className="text-center mb-12"
      >
        <h1 className="text-4xl font-bold text-white mb-2 text-gradient-cyan">Lukas</h1>
        <p className="text-white/60 text-sm">Smart Shopping Copilot</p>
      </motion.div>

      {/* Progress bar */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
        className="w-64 h-1.5 bg-white/10 rounded-full overflow-hidden"
      >
        <motion.div
          className="h-full bg-gradient-to-r from-[#00D4FF] to-[#00FF88] rounded-full glow-cyan"
          style={{ width: `${progress}%` }}
          transition={{ duration: 0.1 }}
        />
      </motion.div>

      {/* Loading text */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
        className="text-white/50 text-xs mt-4"
      >
        Cargando tu asistente inteligente...
      </motion.p>
    </motion.div>
  );
}