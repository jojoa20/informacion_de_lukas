import { motion } from "motion/react";
import { useEffect, useState } from "react";

interface BudgetProgressCircleProps {
  total: number;
  spent: number;
  percentage: number;
  status: "healthy" | "warning" | "alert";
  size?: number;
  strokeWidth?: number;
}

export function BudgetProgressCircle({
  total,
  spent,
  percentage,
  status,
  size = 192,
  strokeWidth = 8,
}: BudgetProgressCircleProps) {
  const [mounted, setMounted] = useState(false);
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (percentage / 100) * circumference;

  useEffect(() => {
    setMounted(true);
  }, []);

  const getStatusColor = () => {
    switch (status) {
      case "healthy":
        return "#2ECC71";
      case "warning":
        return "#FB923C";
      case "alert":
        return "#FF5757";
    }
  };

  const getStatusText = () => {
    switch (status) {
      case "healthy":
        return "Saludable";
      case "warning":
        return "Atención";
      case "alert":
        return "Límite";
    }
  };

  const statusColor = getStatusColor();

  return (
    <div className="relative inline-flex items-center justify-center" style={{ width: size, height: size }}>
      {/* Background circle */}
      <svg className="absolute" width={size} height={size} style={{ transform: "rotate(-90deg)" }}>
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="#1E293B"
          strokeWidth={strokeWidth}
          fill="none"
        />
        
        {/* Progress circle */}
        <motion.circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke={statusColor}
          strokeWidth={strokeWidth}
          fill="none"
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={mounted ? offset : circumference}
          initial={{ strokeDashoffset: circumference }}
          animate={{ strokeDashoffset: offset }}
          transition={{ duration: 1.5, ease: "easeOut" }}
        />
      </svg>

      {/* Center content */}
      <div className="flex flex-col items-center justify-center z-10">
        {/* Label */}
        <motion.p
          className="text-[#94a3b8] text-xs font-['Manrope:Semi_Bold',sans-serif] uppercase tracking-[1.2px] mb-2"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          Restante
        </motion.p>

        {/* Amount */}
        <motion.h2
          className="text-[#f1f5f9] text-4xl font-['Manrope:Extra_Bold',sans-serif] mb-1"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.7, type: "spring", stiffness: 200 }}
        >
          ${(total - spent).toLocaleString()}
        </motion.h2>

        {/* Total */}
        <motion.p
          className="text-sm font-['Manrope:Medium',sans-serif]"
          style={{ color: statusColor }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.9 }}
        >
          de ${total.toLocaleString()}
        </motion.p>

        {/* Percentage badge */}
        <motion.div
          className="mt-3 px-3 py-1 rounded-full backdrop-blur-sm"
          style={{ backgroundColor: `${statusColor}20`, border: `1px solid ${statusColor}40` }}
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1.1, type: "spring" }}
        >
          <span
            className="text-xs font-['Manrope:Bold',sans-serif]"
            style={{ color: statusColor }}
          >
            {percentage}% usado
          </span>
        </motion.div>
      </div>

      {/* Pulse effect for alert state */}
      {status === "alert" && (
        <motion.div
          className="absolute inset-0 rounded-full border-2"
          style={{ borderColor: statusColor }}
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0, 0.3],
          }}
          transition={{ duration: 2, repeat: Infinity }}
        />
      )}

      {/* Rotating particles for healthy state */}
      {status === "healthy" && percentage > 50 && (
        <>
          {[0, 1, 2].map(i => (
            <motion.div
              key={i}
              className="absolute w-2 h-2 rounded-full"
              style={{
                backgroundColor: statusColor,
                top: "50%",
                left: "50%",
              }}
              animate={{
                rotate: 360,
                x: Math.cos((i * 2 * Math.PI) / 3) * (size / 2 - 10),
                y: Math.sin((i * 2 * Math.PI) / 3) * (size / 2 - 10),
              }}
              transition={{
                rotate: { duration: 8, repeat: Infinity, ease: "linear" },
                delay: i * 0.3,
              }}
            />
          ))}
        </>
      )}
    </div>
  );
}
