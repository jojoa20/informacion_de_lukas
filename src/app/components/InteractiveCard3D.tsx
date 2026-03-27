import { motion, useMotionValue, useSpring, useTransform } from "motion/react";
import { useState, useRef, useEffect } from "react";

interface InteractiveCard3DProps {
  mascotImage: any;
  title?: string;
  subtitle?: string;
  onTap?: () => void;
}

export function InteractiveCard3D({ 
  mascotImage, 
  title = "Estado Neutral", 
  subtitle = "Presupuesto sincronizado y estable",
  onTap 
}: InteractiveCard3DProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isHovering, setIsHovering] = useState(false);

  // Motion values para el mouse/touch
  const mouseX = useMotionValue(0.5);
  const mouseY = useMotionValue(0.5);

  // Spring para suavizar el movimiento
  const rotateX = useSpring(useTransform(mouseY, [0, 1], [15, -15]), {
    stiffness: 300,
    damping: 30,
  });
  const rotateY = useSpring(useTransform(mouseX, [0, 1], [-15, 15]), {
    stiffness: 300,
    damping: 30,
  });

  // Shine effect
  const shineX = useTransform(mouseX, [0, 1], ["0%", "100%"]);
  const shineY = useTransform(mouseY, [0, 1], ["0%", "100%"]);

  // Parallax para el mascota
  const mascotX = useSpring(useTransform(mouseX, [0, 1], [-10, 10]), {
    stiffness: 400,
    damping: 30,
  });
  const mascotY = useSpring(useTransform(mouseY, [0, 1], [-10, 10]), {
    stiffness: 400,
    damping: 30,
  });

  // Handle mouse move
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    
    const rect = cardRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;
    
    mouseX.set(x);
    mouseY.set(y);
  };

  // Handle touch move
  const handleTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
    if (!cardRef.current || e.touches.length === 0) return;
    
    const touch = e.touches[0];
    const rect = cardRef.current.getBoundingClientRect();
    const x = (touch.clientX - rect.left) / rect.width;
    const y = (touch.clientY - rect.top) / rect.height;
    
    mouseX.set(x);
    mouseY.set(y);
  };

  // Reset position
  const handleMouseLeave = () => {
    setIsHovering(false);
    mouseX.set(0.5);
    mouseY.set(0.5);
  };

  return (
    <div 
      className="relative flex items-center justify-center"
      style={{ perspective: "1000px" }}
    >
      {/* Outer glow ring */}
      <motion.div
        className="absolute inset-0 rounded-[32px]"
        style={{
          background: "radial-gradient(circle, rgba(79, 172, 254, 0.3), transparent 70%)",
          filter: "blur(40px)",
          width: "280px",
          height: "360px",
          left: "50%",
          top: "50%",
          x: "-50%",
          y: "-50%",
        }}
        animate={{
          scale: [1, 1.1, 1],
          opacity: [0.4, 0.6, 0.4],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* Pulse rings */}
      <motion.div
        className="absolute inset-0 rounded-[32px] border-2 border-blue-400/30"
        style={{
          width: "280px",
          height: "360px",
          left: "50%",
          top: "50%",
          x: "-50%",
          y: "-50%",
        }}
        animate={{
          scale: [1, 1.08, 1],
          opacity: [0.3, 0, 0.3],
        }}
        transition={{
          duration: 2.5,
          repeat: Infinity,
          ease: "easeOut",
        }}
      />

      {/* Card container with 3D transform */}
      <motion.div
        ref={cardRef}
        className="relative w-[240px] h-[320px] cursor-pointer"
        style={{
          transformStyle: "preserve-3d",
          rotateX,
          rotateY,
        }}
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={handleMouseLeave}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleMouseLeave}
        onClick={onTap}
        whileTap={{ scale: 0.98 }}
        animate={{
          z: isHovering ? 50 : 0,
        }}
        transition={{
          z: { duration: 0.3 },
        }}
      >
        {/* Card face */}
        <motion.div
          className="relative w-full h-full rounded-[32px] overflow-hidden shadow-2xl"
          style={{
            background: "linear-gradient(135deg, rgba(79, 172, 254, 1) 0%, rgba(58, 156, 249, 1) 50%, rgba(37, 140, 244, 1) 100%)",
            boxShadow: "0 25px 50px -12px rgba(37, 140, 244, 0.5)",
            transformStyle: "preserve-3d",
          }}
        >
          {/* Glassmorphism overlay */}
          <div className="absolute inset-0 bg-white/10 backdrop-blur-sm" />

          {/* Shine effect */}
          <motion.div
            className="absolute inset-0 opacity-0 pointer-events-none"
            style={{
              background: `radial-gradient(circle at ${shineX.get()} ${shineY.get()}, rgba(255, 255, 255, 0.4), transparent 40%)`,
              x: shineX,
              y: shineY,
            }}
            animate={{
              opacity: isHovering ? 1 : 0,
            }}
            transition={{ duration: 0.3 }}
          />

          {/* Gradient highlight */}
          <div
            className="absolute rounded-[32px]"
            style={{
              width: "60%",
              height: "60%",
              top: "10%",
              left: "15%",
              background: "radial-gradient(circle at 30% 30%, rgba(255, 255, 255, 0.4), transparent 70%)",
            }}
          />

          {/* Card pattern/texture */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-8 left-8 w-12 h-12 rounded-full bg-white/30" />
            <div className="absolute top-12 right-12 w-8 h-8 rounded-full bg-white/20" />
            <div className="absolute bottom-12 left-12 w-16 h-16 rounded-full bg-white/20" />
          </div>

          {/* Chip simulation (like credit card) */}
          <motion.div
            className="absolute top-6 left-6 w-12 h-10 rounded-lg bg-gradient-to-br from-amber-200/80 to-amber-400/80 shadow-lg"
            style={{
              transformStyle: "preserve-3d",
              z: 20,
            }}
            animate={{
              rotateZ: isHovering ? [0, -2, 2, 0] : 0,
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
            }}
          >
            <div className="absolute inset-1 border border-amber-600/30 rounded-md" />
            <div className="absolute inset-2 flex flex-col gap-0.5">
              <div className="h-0.5 bg-amber-600/40 rounded" />
              <div className="h-0.5 bg-amber-600/40 rounded" />
              <div className="h-0.5 bg-amber-600/40 rounded" />
            </div>
          </motion.div>

          {/* Mascot 3D with parallax */}
          <motion.div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
            style={{
              transformStyle: "preserve-3d",
              x: mascotX,
              y: mascotY,
              z: 40,
            }}
          >
            <motion.div
              className="relative w-[160px] h-[160px] drop-shadow-2xl"
              animate={{
                rotateZ: isHovering ? [0, -3, 3, -3, 3, 0] : 0,
                scale: isHovering ? 1.05 : 1,
              }}
              transition={{
                rotateZ: {
                  duration: 0.5,
                  ease: "easeInOut",
                },
                scale: {
                  duration: 0.3,
                },
              }}
            >
              <img 
                src={mascotImage} 
                alt="Lukas Mascot" 
                className="w-full h-full object-contain"
                style={{
                  filter: "drop-shadow(0 10px 20px rgba(0, 0, 0, 0.3))",
                }}
              />
            </motion.div>
          </motion.div>

          {/* Card wave decoration at bottom */}
          <motion.div
            className="absolute bottom-0 left-0 right-0 h-20 opacity-20"
            style={{
              background: "linear-gradient(to top, rgba(255, 255, 255, 0.3), transparent)",
              clipPath: "ellipse(100% 100% at 50% 100%)",
            }}
          />

          {/* Contactless payment icon */}
          <motion.div
            className="absolute bottom-6 right-6"
            style={{
              transformStyle: "preserve-3d",
              z: 20,
            }}
            animate={{
              opacity: isHovering ? 1 : 0.6,
              scale: isHovering ? 1.1 : 1,
            }}
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path
                d="M6 9C6 7.34315 7.34315 6 9 6C10.6569 6 12 7.34315 12 9"
                stroke="white"
                strokeWidth="2"
                strokeLinecap="round"
                opacity="0.8"
              />
              <path
                d="M6 13C6 10.2386 8.23858 8 11 8C13.7614 8 16 10.2386 16 13"
                stroke="white"
                strokeWidth="2"
                strokeLinecap="round"
                opacity="0.6"
              />
              <path
                d="M6 17C6 13.134 9.13401 10 13 10C16.866 10 20 13.134 20 17"
                stroke="white"
                strokeWidth="2"
                strokeLinecap="round"
                opacity="0.4"
              />
            </svg>
          </motion.div>
        </motion.div>

        {/* Card shadow */}
        <motion.div
          className="absolute -bottom-8 left-1/2 -translate-x-1/2 w-[80%] h-8 rounded-full bg-black/30 blur-2xl"
          style={{
            transformStyle: "preserve-3d",
            z: -10,
          }}
          animate={{
            scale: isHovering ? 1.2 : 1,
            opacity: isHovering ? 0.5 : 0.3,
          }}
        />
      </motion.div>

      {/* Title and subtitle below card */}
      <motion.div
        className="absolute -bottom-24 left-1/2 -translate-x-1/2 text-center w-[280px]"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        <h2 className="text-2xl font-bold text-white mb-2">
          {title}
        </h2>
        <p className="text-blue-200/70 text-sm">
          {subtitle}
        </p>
      </motion.div>
    </div>
  );
}
