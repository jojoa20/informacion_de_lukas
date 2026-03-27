import { motion } from "motion/react";
import { Plus, X } from "lucide-react";
import { useState } from "react";

interface FloatingActionButtonProps {
  icon?: React.ReactNode;
  onClick?: () => void;
  color?: "blue" | "pink" | "amber" | "green";
  position?: "bottom-right" | "bottom-center";
}

export function FloatingActionButton({ 
  icon, 
  onClick,
  color = "blue",
  position = "bottom-right"
}: FloatingActionButtonProps) {
  const [isPressed, setIsPressed] = useState(false);

  const colorClasses = {
    blue: "from-blue-500 to-cyan-500 shadow-blue-500/50",
    pink: "from-pink-500 to-rose-500 shadow-pink-500/50",
    amber: "from-amber-500 to-orange-500 shadow-amber-500/50",
    green: "from-green-500 to-emerald-500 shadow-green-500/50",
  };

  const positionClasses = {
    "bottom-right": "bottom-24 right-6",
    "bottom-center": "bottom-24 left-1/2 -translate-x-1/2",
  };

  return (
    <motion.button
      onClick={onClick}
      onTapStart={() => setIsPressed(true)}
      onTap={() => setIsPressed(false)}
      onTapCancel={() => setIsPressed(false)}
      className={`fixed ${positionClasses[position]} z-30 w-14 h-14 rounded-full bg-gradient-to-r ${colorClasses[color]} shadow-lg flex items-center justify-center transition-shadow`}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      animate={isPressed ? { rotate: 90 } : { rotate: 0 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
    >
      {/* Ripple effect */}
      <motion.div
        className="absolute inset-0 rounded-full bg-white"
        initial={{ scale: 0, opacity: 0.5 }}
        animate={isPressed ? { scale: 2, opacity: 0 } : { scale: 0, opacity: 0.5 }}
        transition={{ duration: 0.6 }}
      />

      {/* Icon */}
      <div className="relative z-10 text-white">
        {icon || <Plus className="w-6 h-6" strokeWidth={2.5} />}
      </div>
    </motion.button>
  );
}
