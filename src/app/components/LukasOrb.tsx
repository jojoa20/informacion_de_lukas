import { motion } from "motion/react";
import { useEffect, useState } from "react";

interface LukasOrbProps {
  state: "neutral" | "scanner" | "success" | "alert";
  size?: number;
}

export function LukasOrb({ state, size = 192 }: LukasOrbProps) {
  const [pulseKey, setPulseKey] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setPulseKey(prev => prev + 1);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  const getStateColors = () => {
    switch (state) {
      case "neutral":
        return {
          from: "#4FACFE",
          via: "#3A9CF9",
          to: "#258CF4",
          shadow: "rgba(37, 140, 244, 0.3)",
        };
      case "scanner":
        return {
          from: "#00F5FF",
          via: "#3DD6E8",
          to: "#258CF4",
          shadow: "rgba(0, 245, 255, 0.4)",
        };
      case "success":
        return {
          from: "#FFD700",
          via: "#FFC700",
          to: "#FFB700",
          shadow: "rgba(255, 215, 0, 0.4)",
        };
      case "alert":
        return {
          from: "#FF7F7F",
          via: "#FF6B6B",
          to: "#FF5757",
          shadow: "rgba(255, 127, 127, 0.3)",
        };
    }
  };

  const colors = getStateColors();

  return (
    <motion.div
      className="relative flex items-center justify-center"
      style={{ width: size, height: size }}
      initial={{ scale: 0.95, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      {/* Outer pulse rings */}
      {state === "neutral" && (
        <>
          <motion.div
            key={`pulse-1-${pulseKey}`}
            className="absolute rounded-full border-2 opacity-50"
            style={{
              borderColor: colors.to,
              width: size * 1.25,
              height: size * 1.25,
            }}
            initial={{ scale: 1, opacity: 0.5 }}
            animate={{ scale: 1.3, opacity: 0 }}
            transition={{ duration: 2, ease: "easeOut" }}
          />
          <motion.div
            key={`pulse-2-${pulseKey}`}
            className="absolute rounded-full border opacity-20"
            style={{
              borderColor: colors.to,
              width: size * 1.5,
              height: size * 1.5,
            }}
            initial={{ scale: 1, opacity: 0.2 }}
            animate={{ scale: 1.6, opacity: 0 }}
            transition={{ duration: 2, ease: "easeOut", delay: 0.3 }}
          />
        </>
      )}

      {/* Scanning rings */}
      {state === "scanner" && (
        <>
          <motion.div
            className="absolute rounded-full border-2"
            style={{
              borderColor: "rgba(0, 245, 255, 0.2)",
              width: size * 1.1,
              height: size * 1.1,
            }}
            animate={{ rotate: 360 }}
            transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
          />
          <motion.div
            className="absolute rounded-full border-2"
            style={{
              borderColor: "#00F5FF",
              width: size * 1.25,
              height: size * 1.25,
            }}
            animate={{ rotate: -360 }}
            transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
          />
          
          {/* Orbiting data points */}
          <motion.div
            className="absolute rounded-full shadow-lg"
            style={{
              width: 12,
              height: 12,
              backgroundColor: "#00F5FF",
              boxShadow: "0 0 10px #00F5FF",
              top: 0,
              right: size * 0.1,
            }}
            animate={{ rotate: 360 }}
            transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
          />
          <motion.div
            className="absolute bg-white rounded-full"
            style={{
              width: 8,
              height: 8,
              bottom: size * 0.1,
              left: 0,
            }}
            animate={{ rotate: -360 }}
            transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
          />
        </>
      )}

      {/* Success particles */}
      {state === "success" && (
        <>
          {[...Array(8)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute rounded-full"
              style={{
                width: 6,
                height: 6,
                backgroundColor: colors.from,
              }}
              initial={{
                x: 0,
                y: 0,
                opacity: 1,
              }}
              animate={{
                x: Math.cos((i * Math.PI * 2) / 8) * size * 0.8,
                y: Math.sin((i * Math.PI * 2) / 8) * size * 0.8,
                opacity: 0,
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                repeatDelay: 0.5,
                ease: "easeOut",
              }}
            />
          ))}
        </>
      )}

      {/* Main orb */}
      <motion.div
        className="relative rounded-full overflow-hidden flex items-center justify-center"
        style={{
          width: size * 0.67,
          height: size * 0.67,
          background: `radial-gradient(circle at 30% 30%, ${colors.from}, ${colors.via} 50%, ${colors.to})`,
          boxShadow: `0 0 60px 10px ${colors.shadow}`,
        }}
        animate={
          state === "alert"
            ? { scale: [1, 1.05, 1], boxShadow: [`0 0 60px 10px ${colors.shadow}`, `0 0 80px 15px ${colors.shadow}`, `0 0 60px 10px ${colors.shadow}`] }
            : {}
        }
        transition={
          state === "alert"
            ? { duration: 0.5, repeat: Infinity, repeatDelay: 1 }
            : {}
        }
      >
        {/* Highlight */}
        <div
          className="absolute rounded-full opacity-40"
          style={{
            width: "100%",
            height: "100%",
            background: "radial-gradient(circle at 70% 70%, rgba(255, 255, 255, 0.2), transparent)",
          }}
        />

        {/* Mascot placeholder - would contain actual mascot image */}
        <div className="relative z-10">
          {/* This would be where the actual mascot character goes */}
        </div>
      </motion.div>
    </motion.div>
  );
}
