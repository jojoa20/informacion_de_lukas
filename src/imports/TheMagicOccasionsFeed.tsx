import { motion } from "motion/react";
import { useNavigate } from "react-router";
import { ArrowLeft, Sparkles, ChefHat, Heart, Sun, UtensilsCrossed, Coffee, PartyPopper } from "lucide-react";
import { useState } from "react";
import svgPaths from "./svg-max3vc2ay8";
import { VoiceAssistant3D } from "../app/components/VoiceAssistant3D";

// Mock occasions data
const occasions = [
  {
    id: "asado",
    title: "Asado Familiar",
    emoji: "🥩",
    description: "Todo para el asado perfecto",
    color: "from-[#f36e53] to-[#d14d34]",
    bgGradient: "from-[#f36e53]/20 to-[#d14d34]/20",
    icon: ChefHat,
    estimatedCost: 185000,
    people: "6-8 personas",
    items: [
      { name: "Carne de res", quantity: "2kg", price: 58000 },
      { name: "Chorizo", quantity: "1kg", price: 28000 },
      { name: "Chimichurri", quantity: "1 frasco", price: 8500 },
      { name: "Pan para arepa", quantity: "2 paq", price: 12000 },
      { name: "Gaseosas 3L", quantity: "3 und", price: 24000 },
      { name: "Ensalada", quantity: "ingredientes", price: 18500 },
      { name: "Carbón", quantity: "1 bolsa", price: 15000 },
      { name: "Salsas variadas", quantity: "set", price: 21000 },
    ],
  },
  {
    id: "cita",
    title: "Cena Romántica",
    emoji: "🍷",
    description: "Ingredientes para una velada especial",
    color: "from-[#a898c9] to-[#6b4de6]",
    bgGradient: "from-[#a898c9]/20 to-[#6b4de6]/20",
    icon: Heart,
    estimatedCost: 95000,
    people: "2 personas",
    items: [
      { name: "Vino tinto", quantity: "1 botella", price: 42000 },
      { name: "Salmón fresco", quantity: "400g", price: 28000 },
      { name: "Espárragos", quantity: "1 atado", price: 8500 },
      { name: "Pasta fresca", quantity: "250g", price: 6500 },
      { name: "Queso parmesano", quantity: "100g", price: 7000 },
      { name: "Fresas", quantity: "250g", price: 9500 },
      { name: "Chocolate", quantity: "1 tableta", price: 12500 },
      { name: "Velas aromáticas", quantity: "3 und", price: 15000 },
    ],
  },
  {
    id: "picnic",
    title: "Picnic Familiar",
    emoji: "🧺",
    description: "Pack completo para un día al aire libre",
    color: "from-[#d8a93f] to-[#b8892f]",
    bgGradient: "from-[#d8a93f]/20 to-[#b8892f]/20",
    icon: Sun,
    estimatedCost: 78000,
    people: "4-5 personas",
    items: [
      { name: "Sandwiches ingredientes", quantity: "set", price: 32000 },
      { name: "Frutas frescas", quantity: "mix", price: 18000 },
      { name: "Jugos naturales", quantity: "4 und", price: 12000 },
      { name: "Snacks variados", quantity: "pack", price: 16000 },
    ],
  },
  {
    id: "brunch",
    title: "Brunch Dominguero",
    emoji: "🥞",
    description: "Desayuno-almuerzo espectacular",
    color: "from-[#397dc1] to-[#21428d]",
    bgGradient: "from-[#397dc1]/20 to-[#21428d]/20",
    icon: Coffee,
    estimatedCost: 65000,
    people: "4 personas",
    items: [
      { name: "Huevos", quantity: "12 und", price: 8500 },
      { name: "Tocino", quantity: "250g", price: 14000 },
      { name: "Pan brioche", quantity: "1 und", price: 9500 },
      { name: "Frutas variadas", quantity: "mix", price: 15000 },
      { name: "Café premium", quantity: "250g", price: 18000 },
    ],
  },
  {
    id: "cumpleaños",
    title: "Fiesta de Cumpleaños",
    emoji: "🎂",
    description: "Todo para celebrar en grande",
    color: "from-[#6b4de6] to-[#a898c9]",
    bgGradient: "from-[#6b4de6]/20 to-[#a898c9]/20",
    icon: PartyPopper,
    estimatedCost: 235000,
    people: "12-15 personas",
    items: [
      { name: "Torta personalizada", quantity: "1 und", price: 85000 },
      { name: "Snacks variados", quantity: "pack grande", price: 45000 },
      { name: "Bebidas", quantity: "set", price: 38000 },
      { name: "Decoración", quantity: "kit", price: 35000 },
      { name: "Platos desechables", quantity: "set", price: 18000 },
      { name: "Velas y piñata", quantity: "set", price: 24000 },
    ],
  },
  {
    id: "parrilla",
    title: "Parrillada Premium",
    emoji: "🍖",
    description: "Cortes selectos para parrilla",
    color: "from-[#f36e53] to-[#d14d34]",
    bgGradient: "from-[#f36e53]/20 to-[#d14d34]/20",
    icon: UtensilsCrossed,
    estimatedCost: 285000,
    people: "8-10 personas",
    items: [
      { name: "Chuletas de cerdo", quantity: "2kg", price: 68000 },
      { name: "Costillas", quantity: "1.5kg", price: 52000 },
      { name: "Pollo marinado", quantity: "2kg", price: 42000 },
      { name: "Vegetales asados", quantity: "set", price: 28000 },
      { name: "Salsas gourmet", quantity: "pack", price: 35000 },
      { name: "Arepas", quantity: "20 und", price: 22000 },
      { name: "Cerveza artesanal", quantity: "12 und", price: 78000 },
    ],
  },
];

export default function TheMagicOccasionsFeed() {
  const navigate = useNavigate();
  const [selectedOccasion, setSelectedOccasion] = useState<string | null>(null);

  const handleVoiceCommand = () => {
    console.log("Voice command activated in The Magic!");
    // Aquí se podría activar búsqueda por voz de ocasiones
  };

  const occasion = selectedOccasion ? occasions.find(o => o.id === selectedOccasion) : null;

  return (
    <div className="min-h-screen w-full relative overflow-hidden">
      {/* Dynamic background based on selected occasion */}
      <div className="absolute inset-0 opacity-30 transition-all duration-700">
        {occasion ? (
          <motion.div
            key={occasion.id}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 0.4, scale: 1 }}
            transition={{ duration: 0.8 }}
            className={`absolute top-0 right-0 w-[600px] h-[600px] bg-gradient-radial ${occasion.color} to-transparent blur-3xl animate-pulse-glow`}
          />
        ) : (
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-gradient-radial from-[#6b4de6]/30 to-transparent blur-3xl animate-pulse-glow" />
        )}
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-gradient-radial from-[#397dc1]/30 to-transparent blur-3xl animate-pulse-glow" style={{ animationDelay: '2s' }} />
      </div>

      {/* Main content */}
      <div className="relative z-10 min-h-screen pb-8">
        
        {/* Header */}
        <div className="px-6 pt-12 pb-6">
          <div className="flex items-center justify-between mb-6">
            <button
              onClick={() => {
                if (selectedOccasion) {
                  setSelectedOccasion(null);
                } else {
                  navigate("/");
                }
              }}
              className="w-10 h-10 rounded-full glass-card glow-hover flex items-center justify-center transition-premium"
            >
              <ArrowLeft className="w-5 h-5 text-white" />
            </button>

            {/* Asistente de Voz 3D */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3, duration: 0.5 }}
            >
              <VoiceAssistant3D onVoiceCommand={handleVoiceCommand} />
            </motion.div>

            {/* Lukas orb - magic state */}
            <motion.div
              className="relative"
              animate={{
                rotate: [0, 5, -5, 0],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              {/* Sparkle particles */}
              {[...Array(3)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute w-2 h-2 rounded-full bg-[#6b4de6]"
                  style={{
                    left: `${20 + i * 15}px`,
                    top: `${5 + i * 10}px`,
                    boxShadow: '0 0 10px rgba(107, 77, 230, 0.6)'
                  }}
                  animate={{
                    opacity: [0, 1, 0],
                    scale: [0, 1.5, 0],
                    y: [-10, -20, -30],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    delay: i * 0.4,
                  }}
                />
              ))}

              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#6b4de6] via-[#a898c9] to-[#6b4de6] shadow-lg glow-primary-strong flex items-center justify-center relative overflow-hidden">
                <div className="absolute inset-0 bg-white/10" />
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" className="relative z-10">
                  {svgPaths.paths.map((d, i) => (
                    <path key={i} d={d} fill="white" opacity="0.9" />
                  ))}
                </svg>
              </div>
            </motion.div>

            <div className="w-10" />
          </div>

          <div>
            <h1 className="text-3xl font-bold text-white mb-2 tracking-tight">
              {selectedOccasion ? occasion?.title : <><span className="text-gradient-lukas">Ocasiones</span> Mágicas</>}
            </h1>
            <p className="text-white/70">
              {selectedOccasion ? occasion?.description : "Kits perfectos para cada momento especial"}
            </p>
          </div>
        </div>

        {/* Content area */}
        {!selectedOccasion ? (
          // Occasions grid
          <div className="px-6 space-y-4">
            {occasions.map((occ, index) => (
              <motion.button
                key={occ.id}
                onClick={() => setSelectedOccasion(occ.id)}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.08, duration: 0.5 }}
                whileHover={{ scale: 1.02, y: -2 }}
                whileTap={{ scale: 0.98 }}
                className="w-full p-6 rounded-3xl glass-card hover:border-white/30 transition-premium text-left group relative overflow-hidden"
              >
                {/* Background gradient on hover */}
                <motion.div
                  className={`absolute inset-0 bg-gradient-to-br ${occ.bgGradient} opacity-0 group-hover:opacity-100 transition-opacity duration-300`}
                />

                <div className="relative z-10">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-4">
                      <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${occ.color} flex items-center justify-center text-3xl shadow-lg`}>
                        {occ.emoji}
                      </div>
                      <div>
                        <h3 className="text-white font-bold text-lg mb-1 tracking-tight">{occ.title}</h3>
                        <p className="text-white/60 text-sm mb-1">{occ.description}</p>
                        <p className="text-white/40 text-xs">{occ.people}</p>
                      </div>
                    </div>
                    <Sparkles className="w-5 h-5 text-[#6b4de6] opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>

                  <div className="flex items-center justify-between pt-4 border-t border-white/10">
                    <div className="flex items-center gap-2">
                      <occ.icon className="w-4 h-4 text-[#397dc1]" />
                      <span className="text-white/60 text-sm">{occ.items.length} productos</span>
                    </div>
                    <div className="text-right">
                      <p className="text-white/50 text-xs mb-0.5">Costo estimado</p>
                      <p className="text-white font-bold text-lg tracking-tight">${occ.estimatedCost.toLocaleString()}</p>
                    </div>
                  </div>
                </div>
              </motion.button>
            ))}
          </div>
        ) : (
          // Selected occasion detail
          <div className="px-6">
            {occasion && (
              <>
                {/* Occasion header card */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5 }}
                  className={`p-6 rounded-3xl glass-card-strong animate-float relative overflow-hidden`}
                  style={{
                    borderColor: 'rgba(107, 77, 230, 0.3)',
                    boxShadow: '0 0 30px rgba(107, 77, 230, 0.2)'
                  }}
                >
                  <div className="absolute top-0 right-0 text-9xl opacity-10">
                    {occasion.emoji}
                  </div>
                  <div className="relative z-10">
                    <div className="flex items-center gap-3 mb-4">
                      <div className={`w-20 h-20 rounded-2xl bg-gradient-to-br ${occasion.color} flex items-center justify-center text-4xl shadow-lg`}>
                        {occasion.emoji}
                      </div>
                      <div>
                        <h2 className="text-white font-bold text-xl mb-1 tracking-tight">{occasion.title}</h2>
                        <p className="text-white/70 text-sm">{occasion.people}</p>
                      </div>
                    </div>
                    <div className="flex items-end justify-between">
                      <div>
                        <p className="text-white/60 text-sm mb-1">Costo total estimado</p>
                        <p className="text-3xl font-bold text-white tracking-tight">${occasion.estimatedCost.toLocaleString()}</p>
                      </div>
                      <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm">
                        <Sparkles className="w-4 h-4 text-[#6b4de6]" />
                        <span className="text-white text-sm font-bold">{occasion.items.length} items</span>
                      </div>
                    </div>
                  </div>
                </motion.div>

                {/* Items list */}
                <div className="space-y-3 mb-6">
                  <h3 className="text-white font-bold mb-4 flex items-center gap-2 tracking-tight">
                    <UtensilsCrossed className="w-5 h-5 text-[#397dc1]" />
                    Kit Completo
                  </h3>

                  {occasion.items.map((item, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.05, duration: 0.3 }}
                      className="p-4 rounded-2xl glass-card hover:border-white/20 transition-premium"
                    >
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-white font-bold tracking-tight mb-1">{item.name}</p>
                          <p className="text-white/50 text-sm">{item.quantity}</p>
                        </div>
                        <p className="text-white font-bold tracking-tight">${item.price.toLocaleString()}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>

                {/* CTA Button */}
                <motion.button
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full py-4 rounded-2xl font-bold text-white shadow-xl btn-primary flex items-center justify-center gap-2 transition-premium"
                >
                  <Sparkles className="w-5 h-5" />
                  Agregar a Mi Lista
                </motion.button>
              </>
            )}
          </div>
        )}

      </div>
    </div>
  );
}