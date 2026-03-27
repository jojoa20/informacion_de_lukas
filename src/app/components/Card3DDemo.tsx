import { motion } from "motion/react";
import { InteractiveCard3D } from "./InteractiveCard3D";
import mascotImage from "../../assets/86b201e409c024d9f483186b36efc4ffc06326a7.png";

export function Card3DDemo() {
  return (
    <div className="min-h-screen bg-poly-grid flex flex-col items-center justify-center p-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-12"
      >
        <h1 className="text-4xl font-bold text-white mb-3">
          Tarjeta 3D Interactiva
        </h1>
        <p className="text-blue-200/70 max-w-md">
          Mueve el cursor sobre la tarjeta para ver el efecto 3D (como las fotos de perfil de iPhone)
        </p>
      </motion.div>

      <InteractiveCard3D 
        mascotImage={mascotImage}
        title="Estado Neutral"
        subtitle="Presupuesto sincronizado y estable"
        onTap={() => console.log("Card tapped!")}
      />

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="mt-24 text-center"
      >
        <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6 max-w-md">
          <h3 className="text-white font-semibold mb-4">Características</h3>
          <ul className="space-y-3 text-left text-blue-200/70 text-sm">
            <li className="flex items-start gap-2">
              <span className="text-cyan-400">•</span>
              <span>Gira en 3D siguiendo el movimiento del cursor/touch</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-cyan-400">•</span>
              <span>Efecto de brillo dinámico que sigue tu cursor</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-cyan-400">•</span>
              <span>El mascota tiene efecto parallax independiente</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-cyan-400">•</span>
              <span>Diseño de tarjeta de crédito con chip y NFC</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-cyan-400">•</span>
              <span>Animaciones suaves con spring physics</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-cyan-400">•</span>
              <span>Glassmorphism y efectos visuales premium</span>
            </li>
          </ul>
        </div>
      </motion.div>
    </div>
  );
}