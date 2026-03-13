import { motion } from "motion/react";
import { useNavigate } from "react-router";
import { Sparkles, Brain, Heart, Wand2 } from "lucide-react";
import svgPaths from "./svg-6cs6w81yxh";
import { VoiceAssistant3D } from "../app/components/VoiceAssistant3D";
import { InteractiveCard3D } from "../app/components/InteractiveCard3D";
import mascotImage from "../assets/86b201e409c024d9f483186b36efc4ffc06326a7.png";

export default function LukasHomeMascotAvatarIntegration() {
  const navigate = useNavigate();

  const handleVoiceCommand = () => {
    console.log("Voice command activated!");
    // Aquí se integraría la API de reconocimiento de voz
  };

  const handleCardTap = () => {
    console.log("Card tapped!");
    // Puede abrir un modal o navegar a una vista de presupuesto
  };

  return (
    <div className="min-h-screen w-full relative overflow-hidden">
      {/* Background neon mesh gradient effects */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-gradient-radial from-[#397dc1]/40 to-transparent blur-3xl animate-pulse-glow" />
        <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-gradient-radial from-[#6b4de6]/30 to-transparent blur-3xl animate-pulse-glow" style={{ animationDelay: '2s' }} />
        <div className="absolute top-1/2 left-1/2 w-[400px] h-[400px] -translate-x-1/2 -translate-y-1/2 bg-gradient-radial from-[#d8a93f]/20 to-transparent blur-3xl animate-pulse-glow" style={{ animationDelay: '4s' }} />
      </div>

      {/* Main Content Container */}
      <div className="relative z-10 flex flex-col items-center justify-between min-h-screen p-6 pt-20 pb-8">
        
        {/* Asistente de Voz 3D Flotante - Top Right */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.5, duration: 0.6 }}
          className="absolute top-6 right-6 z-50"
        >
          <VoiceAssistant3D onVoiceCommand={handleVoiceCommand} />
        </motion.div>

        {/* Interactive 3D Card - Reemplaza el orbe */}
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
          className="relative mb-32 animate-float"
        >
          <InteractiveCard3D 
            mascotImage={mascotImage}
            title="Estado Neutral"
            subtitle="Presupuesto sincronizado y estable"
            onTap={handleCardTap}
          />
        </motion.div>

        {/* Navigation Cards Grid */}
        <div className="w-full max-w-md space-y-4 mb-8">
          
          {/* The Brain Card */}
          <motion.button
            onClick={() => navigate("/brain")}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.6, duration: 0.5 }}
            whileHover={{ scale: 1.02, y: -2 }}
            whileTap={{ scale: 0.98 }}
            className="w-full p-6 rounded-3xl glass-card glow-hover neon-border text-left group transition-premium"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#397dc1] to-[#21428d] flex items-center justify-center shadow-lg glow-primary">
                  <Brain className="w-7 h-7 text-white" />
                </div>
                <div>
                  <h3 className="text-white font-bold text-lg mb-1 tracking-tight">El Comparador</h3>
                  <p className="text-white/70 text-sm">Encuentra los mejores precios</p>
                </div>
              </div>
              <Sparkles className="w-5 h-5 text-[#397dc1] opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
          </motion.button>

          {/* The Heart Card */}
          <motion.button
            onClick={() => navigate("/heart")}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.7, duration: 0.5 }}
            whileHover={{ scale: 1.02, y: -2 }}
            whileTap={{ scale: 0.98 }}
            className="w-full p-6 rounded-3xl glass-card glow-hover neon-border text-left group transition-premium"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#d8a93f] to-[#b8892f] flex items-center justify-center shadow-lg glow-success">
                  <Heart className="w-7 h-7 text-white" />
                </div>
                <div>
                  <h3 className="text-white font-bold text-lg mb-1 tracking-tight">Tu Presupuesto</h3>
                  <p className="text-white/70 text-sm">Gestiona gastos compartidos</p>
                </div>
              </div>
              <Sparkles className="w-5 h-5 text-[#d8a93f] opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
          </motion.button>

          {/* The Magic Card */}
          <motion.button
            onClick={() => navigate("/magic")}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.8, duration: 0.5 }}
            whileHover={{ scale: 1.02, y: -2 }}
            whileTap={{ scale: 0.98 }}
            className="w-full p-6 rounded-3xl glass-card glow-hover neon-border text-left group transition-premium"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#6b4de6] to-[#a898c9] flex items-center justify-center shadow-lg" style={{ boxShadow: '0 0 20px rgba(107, 77, 230, 0.3), 0 0 40px rgba(107, 77, 230, 0.1)' }}>
                  <Wand2 className="w-7 h-7 text-white" />
                </div>
                <div>
                  <h3 className="text-white font-bold text-lg mb-1 tracking-tight">Ocasiones Mágicas</h3>
                  <p className="text-white/70 text-sm">Kits perfectos para cada momento</p>
                </div>
              </div>
              <Sparkles className="w-5 h-5 text-[#a898c9] opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
          </motion.button>

        </div>

        {/* Bottom indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 0.5 }}
          className="flex gap-2"
        >
          <div className="w-8 h-1 rounded-full bg-[#397dc1] glow-primary" />
          <div className="w-1 h-1 rounded-full bg-white/30" />
          <div className="w-1 h-1 rounded-full bg-white/30" />
          <div className="w-1 h-1 rounded-full bg-white/30" />
        </motion.div>

      </div>
    </div>
  );
}