import { motion, AnimatePresence } from "motion/react";
import { useState } from "react";
import { LukasOrb } from "./LukasOrb";

interface WelcomeOverlayProps {
  onComplete: () => void;
}

export function WelcomeOverlay({ onComplete }: WelcomeOverlayProps) {
  const [step, setStep] = useState(0);
  const [visible, setVisible] = useState(true);

  const steps = [
    {
      title: "¡Bienvenido a Lukas! 👋",
      description: "Tu copiloto inteligente de compras para ahorrar hasta 30% en supermercados colombianos.",
      state: "neutral" as const,
    },
    {
      title: "Compara Precios 🔍",
      description: "Escanea productos y compara precios entre D1, Ara, Éxito y más tiendas en tiempo real.",
      state: "scanner" as const,
    },
    {
      title: "Ahorra Inteligentemente 💰",
      description: "El IA Optimizer reorganiza tu lista para maximizar tus ahorros automáticamente.",
      state: "success" as const,
    },
    {
      title: "Presupuestos Compartidos 👥",
      description: "Gestiona gastos en familia con anillos de energía y alertas en tiempo real.",
      state: "neutral" as const,
    },
  ];

  const currentStep = steps[step];

  const handleNext = () => {
    if (step < steps.length - 1) {
      setStep(step + 1);
    } else {
      setVisible(false);
      setTimeout(onComplete, 300);
    }
  };

  const handleSkip = () => {
    setVisible(false);
    setTimeout(onComplete, 300);
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="fixed inset-0 bg-[#050D1A] z-[100] flex items-center justify-center p-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          <div className="max-w-md w-full space-y-8">
            {/* Skip button */}
            <div className="flex justify-end">
              <motion.button
                onClick={handleSkip}
                className="text-[#64748b] hover:text-[#94a3b8] text-sm font-['Manrope:Medium',sans-serif] transition-colors"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Saltar
              </motion.button>
            </div>

            {/* Lukas Orb */}
            <motion.div
              className="flex justify-center"
              key={step}
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ type: "spring", stiffness: 200, damping: 20 }}
            >
              <LukasOrb state={currentStep.state} size={160} />
            </motion.div>

            {/* Content */}
            <motion.div
              className="text-center space-y-4"
              key={`content-${step}`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <h2 className="text-[#f1f5f9] text-2xl font-['Manrope:Bold',sans-serif]">
                {currentStep.title}
              </h2>
              <p className="text-[#94a3b8] text-base font-['Manrope:Regular',sans-serif] leading-relaxed">
                {currentStep.description}
              </p>
            </motion.div>

            {/* Progress dots */}
            <div className="flex justify-center gap-2">
              {steps.map((_, index) => (
                <motion.div
                  key={index}
                  className={`h-2 rounded-full transition-all ${
                    index === step
                      ? "w-8 bg-[#258cf4]"
                      : index < step
                      ? "w-2 bg-[#258cf4] opacity-50"
                      : "w-2 bg-[#334155]"
                  }`}
                  initial={false}
                  animate={{
                    scale: index === step ? 1 : 0.8,
                  }}
                />
              ))}
            </div>

            {/* Next button */}
            <motion.button
              onClick={handleNext}
              className="w-full bg-gradient-to-r from-[#258cf4] to-[#9333ea] text-white rounded-2xl py-4 font-['Manrope:Bold',sans-serif] text-base shadow-xl"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              {step < steps.length - 1 ? "Siguiente" : "¡Comenzar!"}
            </motion.button>

            {/* Features preview */}
            <motion.div
              className="grid grid-cols-3 gap-4 pt-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              {[
                { icon: "🧠", label: "The Brain" },
                { icon: "❤️", label: "The Heart" },
                { icon: "✨", label: "The Magic" },
              ].map((feature, index) => (
                <motion.div
                  key={feature.label}
                  className="flex flex-col items-center gap-2 p-3 rounded-xl bg-[rgba(255,255,255,0.03)] border border-[rgba(255,255,255,0.08)]"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 + index * 0.1 }}
                  whileHover={{ scale: 1.05 }}
                >
                  <span className="text-2xl">{feature.icon}</span>
                  <span className="text-[#94a3b8] text-xs font-['Manrope:Medium',sans-serif]">
                    {feature.label}
                  </span>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}