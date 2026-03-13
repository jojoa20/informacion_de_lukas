import { motion, AnimatePresence } from "motion/react";
import { useState, useEffect } from "react";
import { Mic, Volume2, Sparkles } from "lucide-react";

type Expression = "neutral" | "happy" | "thinking" | "listening";

interface VoiceAssistant3DProps {
  onVoiceCommand?: () => void;
}

export function VoiceAssistant3D({ onVoiceCommand }: VoiceAssistant3DProps) {
  const [expression, setExpression] = useState<Expression>("neutral");
  const [isPressed, setIsPressed] = useState(false);

  // Cambiar expresión automáticamente cada 5 segundos si está en neutral
  useEffect(() => {
    if (expression === "neutral") {
      const timeout = setTimeout(() => {
        // Ocasionalmente cambiar a happy
        if (Math.random() > 0.7) {
          setExpression("happy");
          setTimeout(() => setExpression("neutral"), 2000);
        }
      }, 5000);
      return () => clearTimeout(timeout);
    }
  }, [expression]);

  const handleTap = () => {
    setIsPressed(true);
    
    // Ciclar por las expresiones
    const expressions: Expression[] = ["neutral", "happy", "thinking", "listening"];
    const currentIndex = expressions.indexOf(expression);
    const nextExpression = expressions[(currentIndex + 1) % expressions.length];
    
    setExpression(nextExpression);
    
    if (nextExpression === "listening") {
      onVoiceCommand?.();
      // Volver a neutral después de 3 segundos
      setTimeout(() => setExpression("neutral"), 3000);
    }
    
    setTimeout(() => setIsPressed(false), 200);
  };

  const getExpressionColors = () => {
    switch (expression) {
      case "neutral":
        return {
          gradient: "from-[#4FACFE] via-[#3A9CF9] to-[#258CF4]",
          shadow: "rgba(79, 172, 254, 0.6)",
          glow: "#4FACFE",
        };
      case "happy":
        return {
          gradient: "from-[#FFD700] via-[#FFC700] to-[#FFB700]",
          shadow: "rgba(255, 215, 0, 0.6)",
          glow: "#FFD700",
        };
      case "thinking":
        return {
          gradient: "from-[#B47EFF] via-[#9F5FFF] to-[#8A3FFF]",
          shadow: "rgba(180, 126, 255, 0.6)",
          glow: "#B47EFF",
        };
      case "listening":
        return {
          gradient: "from-[#00F5FF] via-[#3DD6E8] to-[#00D4E4]",
          shadow: "rgba(0, 245, 255, 0.8)",
          glow: "#00F5FF",
        };
    }
  };

  const colors = getExpressionColors();

  // Renderizar cara según expresión
  const renderFace = () => {
    switch (expression) {
      case "neutral":
        return (
          <div className="relative w-full h-full flex flex-col items-center justify-center">
            {/* Ojos */}
            <div className="flex gap-4 mb-2">
              <motion.div
                className="w-3 h-3 bg-white rounded-full"
                animate={{ scaleY: [1, 0.1, 1] }}
                transition={{ duration: 3, repeat: Infinity, repeatDelay: 2 }}
              />
              <motion.div
                className="w-3 h-3 bg-white rounded-full"
                animate={{ scaleY: [1, 0.1, 1] }}
                transition={{ duration: 3, repeat: Infinity, repeatDelay: 2 }}
              />
            </div>
            {/* Boca */}
            <div className="w-6 h-1 bg-white rounded-full opacity-80" />
          </div>
        );

      case "happy":
        return (
          <div className="relative w-full h-full flex flex-col items-center justify-center">
            {/* Ojos felices */}
            <div className="flex gap-4 mb-2">
              <motion.div
                className="w-3 h-3 bg-white rounded-full"
                initial={{ scale: 1 }}
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 0.5, repeat: Infinity, repeatDelay: 1 }}
              />
              <motion.div
                className="w-3 h-3 bg-white rounded-full"
                initial={{ scale: 1 }}
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 0.5, repeat: Infinity, repeatDelay: 1 }}
              />
            </div>
            {/* Sonrisa */}
            <svg width="24" height="12" viewBox="0 0 24 12">
              <motion.path
                d="M 4 2 Q 12 10 20 2"
                stroke="white"
                strokeWidth="2"
                fill="none"
                strokeLinecap="round"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 0.5 }}
              />
            </svg>
            {/* Partículas de felicidad */}
            {[...Array(3)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute"
                style={{
                  top: `${20 + i * 10}%`,
                  left: `${80 - i * 15}%`,
                }}
                animate={{
                  y: [-5, -15, -5],
                  opacity: [0, 1, 0],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  delay: i * 0.3,
                }}
              >
                <Sparkles className="w-2 h-2 text-white" />
              </motion.div>
            ))}
          </div>
        );

      case "thinking":
        return (
          <div className="relative w-full h-full flex flex-col items-center justify-center">
            {/* Ojos pensando */}
            <div className="flex gap-4 mb-2">
              <motion.div
                className="w-2 h-3 bg-white rounded-full"
                animate={{ x: [-1, 1, -1] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              />
              <motion.div
                className="w-2 h-3 bg-white rounded-full"
                animate={{ x: [-1, 1, -1] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              />
            </div>
            {/* Boca pensativa */}
            <div className="w-5 h-1 bg-white rounded-full opacity-70" />
            {/* Puntos de pensamiento */}
            <div className="absolute top-2 right-3 flex gap-1">
              {[0, 1, 2].map((i) => (
                <motion.div
                  key={i}
                  className="w-1.5 h-1.5 bg-white rounded-full"
                  animate={{
                    y: [-2, -6, -2],
                    opacity: [0.4, 1, 0.4],
                  }}
                  transition={{
                    duration: 1.5,
                    repeat: Infinity,
                    delay: i * 0.2,
                  }}
                />
              ))}
            </div>
          </div>
        );

      case "listening":
        return (
          <div className="relative w-full h-full flex flex-col items-center justify-center">
            {/* Ojos atentos */}
            <div className="flex gap-4 mb-2">
              <motion.div
                className="w-3 h-4 bg-white rounded-full"
                animate={{ scaleY: [1, 1.1, 1] }}
                transition={{ duration: 0.8, repeat: Infinity }}
              />
              <motion.div
                className="w-3 h-4 bg-white rounded-full"
                animate={{ scaleY: [1, 1.1, 1] }}
                transition={{ duration: 0.8, repeat: Infinity }}
              />
            </div>
            {/* Boca O */}
            <motion.div
              className="w-4 h-4 border-2 border-white rounded-full"
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ duration: 0.5, repeat: Infinity }}
            />
            {/* Icono de micrófono */}
            <motion.div
              className="absolute -bottom-2"
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 0.5, repeat: Infinity }}
            >
              <Mic className="w-3 h-3 text-white" />
            </motion.div>
          </div>
        );
    }
  };

  return (
    <motion.button
      onClick={handleTap}
      className="relative focus:outline-none"
      whileTap={{ scale: 0.9 }}
      style={{
        perspective: "1000px",
      }}
    >
      {/* Contenedor con giro 3D constante */}
      <motion.div
        className="relative"
        animate={{
          rotateY: [0, 360],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "linear",
        }}
        style={{
          transformStyle: "preserve-3d",
        }}
      >
        {/* Glow exterior */}
        <motion.div
          className="absolute inset-0 rounded-full blur-2xl"
          style={{
            background: `radial-gradient(circle, ${colors.glow}, transparent 70%)`,
            width: "100px",
            height: "100px",
            left: "50%",
            top: "50%",
            transform: "translate(-50%, -50%)",
          }}
          animate={{
            scale: expression === "listening" ? [1, 1.3, 1] : [1, 1.1, 1],
            opacity: [0.4, 0.7, 0.4],
          }}
          transition={{
            duration: expression === "listening" ? 0.8 : 2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />

        {/* Ondas de sonido cuando está escuchando */}
        <AnimatePresence>
          {expression === "listening" && (
            <>
              {[0, 1, 2].map((i) => (
                <motion.div
                  key={`wave-${i}`}
                  className="absolute inset-0 rounded-full border-2"
                  style={{
                    borderColor: colors.glow,
                    width: "70px",
                    height: "70px",
                    left: "50%",
                    top: "50%",
                    transform: "translate(-50%, -50%)",
                  }}
                  initial={{ scale: 1, opacity: 0.6 }}
                  animate={{
                    scale: [1, 1.8],
                    opacity: [0.6, 0],
                  }}
                  exit={{ opacity: 0 }}
                  transition={{
                    duration: 1.5,
                    repeat: Infinity,
                    delay: i * 0.3,
                    ease: "easeOut",
                  }}
                />
              ))}
            </>
          )}
        </AnimatePresence>

        {/* Avatar principal */}
        <motion.div
          className={`relative w-[70px] h-[70px] rounded-full bg-gradient-to-br ${colors.gradient} shadow-2xl flex items-center justify-center overflow-hidden`}
          style={{
            boxShadow: `0 0 30px 5px ${colors.shadow}`,
          }}
          animate={{
            boxShadow: isPressed
              ? `0 0 40px 10px ${colors.shadow}`
              : `0 0 30px 5px ${colors.shadow}`,
          }}
          transition={{ duration: 0.2 }}
        >
          {/* Glassmorphism overlay */}
          <div className="absolute inset-0 bg-white/10 backdrop-blur-sm" />

          {/* Highlight */}
          <div
            className="absolute rounded-full"
            style={{
              width: "50%",
              height: "50%",
              top: "10%",
              left: "15%",
              background:
                "radial-gradient(circle at 30% 30%, rgba(255, 255, 255, 0.5), transparent 70%)",
            }}
          />

          {/* Cara animada */}
          <motion.div
            className="relative z-10 w-full h-full"
            key={expression}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
          >
            {renderFace()}
          </motion.div>

          {/* Indicador de voz en el borde */}
          {expression === "listening" && (
            <motion.div
              className="absolute inset-0 rounded-full border-2 border-white/50"
              animate={{
                scale: [1, 1.1, 1],
                opacity: [0.5, 1, 0.5],
              }}
              transition={{
                duration: 0.8,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
          )}
        </motion.div>

        {/* Sombra 3D */}
        <div
          className="absolute rounded-full bg-black/20 blur-md"
          style={{
            width: "60px",
            height: "10px",
            left: "50%",
            bottom: "-15px",
            transform: "translateX(-50%)",
          }}
        />
      </motion.div>

      {/* Tooltip flotante */}
      <AnimatePresence>
        {expression === "listening" && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            className="absolute -bottom-12 left-1/2 transform -translate-x-1/2 whitespace-nowrap"
          >
            <div className="px-3 py-1.5 rounded-full bg-white/10 backdrop-blur-xl border border-white/20">
              <p className="text-xs text-white font-medium">
                Te escucho...
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Indicador de estado */}
      <motion.div
        className="absolute -top-1 -right-1 w-3 h-3 rounded-full"
        style={{
          backgroundColor: expression === "listening" ? "#00F5FF" : colors.glow,
          boxShadow: `0 0 10px ${expression === "listening" ? "#00F5FF" : colors.glow}`,
        }}
        animate={{
          scale: expression === "listening" ? [1, 1.3, 1] : 1,
        }}
        transition={{
          duration: 0.6,
          repeat: expression === "listening" ? Infinity : 0,
        }}
      />
    </motion.button>
  );
}
