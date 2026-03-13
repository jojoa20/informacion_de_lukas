import { motion, AnimatePresence } from "motion/react";
import { useEffect } from "react";

interface ToastProps {
  message: string;
  type?: "success" | "error" | "info";
  visible: boolean;
  onClose: () => void;
  duration?: number;
}

export function Toast({ message, type = "info", visible, onClose, duration = 3000 }: ToastProps) {
  useEffect(() => {
    if (visible && duration > 0) {
      const timer = setTimeout(() => {
        onClose();
      }, duration);
      return () => clearTimeout(timer);
    }
  }, [visible, duration, onClose]);

  const getColors = () => {
    switch (type) {
      case "success":
        return {
          bg: "rgba(46, 204, 113, 0.1)",
          border: "rgba(46, 204, 113, 0.3)",
          icon: "🎉",
        };
      case "error":
        return {
          bg: "rgba(255, 127, 127, 0.1)",
          border: "rgba(255, 127, 127, 0.3)",
          icon: "⚠️",
        };
      default:
        return {
          bg: "rgba(37, 140, 244, 0.1)",
          border: "rgba(37, 140, 244, 0.3)",
          icon: "ℹ️",
        };
    }
  };

  const colors = getColors();

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="fixed bottom-24 left-4 right-4 z-50 max-w-md mx-auto"
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ type: "spring", damping: 25, stiffness: 300 }}
        >
          <div
            className="backdrop-blur-md rounded-2xl px-6 py-4 shadow-2xl"
            style={{
              backgroundColor: colors.bg,
              borderWidth: 1,
              borderStyle: "solid",
              borderColor: colors.border,
            }}
          >
            <div className="flex items-center gap-3">
              <span className="text-2xl">{colors.icon}</span>
              <p className="flex-1 text-[#f1f5f9] font-['Manrope:Medium',sans-serif] text-sm">
                {message}
              </p>
              <button
                onClick={onClose}
                className="text-[#94a3b8] hover:text-[#f1f5f9] transition-colors"
              >
                ✕
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
