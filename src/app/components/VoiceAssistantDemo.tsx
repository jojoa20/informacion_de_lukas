import { motion } from "motion/react";
import { VoiceAssistant3D } from "./VoiceAssistant3D";

export function VoiceAssistantDemo() {
  return (
    <div className="min-h-screen bg-circuit flex flex-col items-center justify-center p-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-12"
      >
        <h1 className="text-4xl font-bold text-white mb-3">
          Asistente Virtual Lukas
        </h1>
        <p className="text-blue-200/70 max-w-md">
          Un avatar 3D interactivo que gira constantemente y cambia de expresión al tocarlo
        </p>
      </motion.div>

      <VoiceAssistant3D onVoiceCommand={() => console.log("Voice activated!")} />

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="mt-12 text-center"
      >
        <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6 max-w-md">
          <h3 className="text-white font-semibold mb-4">Instrucciones</h3>
          <ul className="space-y-3 text-left text-blue-200/70 text-sm">
            <li className="flex items-start gap-2">
              <span className="text-cyan-400">•</span>
              <span>Toca el avatar para cambiar entre expresiones: Neutral → Feliz → Pensando → Escuchando</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-cyan-400">•</span>
              <span>El avatar gira constantemente en 3D (efecto similar a Memoji de iPhone)</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-cyan-400">•</span>
              <span>En estado "Escuchando" aparecen ondas de sonido y un mensaje</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-cyan-400">•</span>
              <span>Cada expresión tiene su propio color y animaciones únicas</span>
            </li>
          </ul>
        </div>
      </motion.div>
    </div>
  );
}