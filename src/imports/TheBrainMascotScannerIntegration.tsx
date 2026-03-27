import { motion, AnimatePresence } from "motion/react";
import { useNavigate } from "react-router";
import { ArrowLeft, Sparkles, TrendingDown, ShoppingCart, Zap, Plus } from "lucide-react";
import { useState } from "react";
import svgPaths from "./svg-m8kfzs2u7b";
import { VoiceAssistant3D } from "../app/components/VoiceAssistant3D";

// Mock data for stores in Colombia
const stores = [
  { id: "d1", name: "D1", color: "from-red-500 to-red-600", logo: "🏪" },
  { id: "ara", name: "Ara", color: "from-orange-500 to-orange-600", logo: "🏬" },
  { id: "exito", name: "Éxito", color: "from-red-600 to-red-700", logo: "🛒" },
  { id: "carulla", name: "Carulla", color: "from-green-500 to-green-600", logo: "🏪" },
  { id: "jumbo", name: "Jumbo", color: "from-yellow-500 to-yellow-600", logo: "🐘" },
  { id: "olimpica", name: "Olímpica", color: "from-blue-500 to-blue-600", logo: "🏅" },
];

const mockProducts = [
  {
    id: 1,
    name: "Leche Entera 1L",
    category: "Lácteos",
    prices: {
      d1: 3200,
      ara: 3500,
      exito: 3800,
      carulla: 4200,
      jumbo: 3900,
      olimpica: 3400,
    },
  },
  {
    id: 2,
    name: "Arroz 500g",
    category: "Granos",
    prices: {
      d1: 2800,
      ara: 2600,
      exito: 3200,
      carulla: 3500,
      jumbo: 3100,
      olimpica: 2900,
    },
  },
  {
    id: 3,
    name: "Huevos x12",
    category: "Proteínas",
    prices: {
      d1: 8500,
      ara: 8200,
      exito: 9000,
      carulla: 9500,
      jumbo: 8800,
      olimpica: 8300,
    },
  },
  {
    id: 4,
    name: "Aceite 1L",
    category: "Aceites",
    prices: {
      d1: 12000,
      ara: 11500,
      exito: 13000,
      carulla: 14000,
      jumbo: 12800,
      olimpica: 11800,
    },
  },
  {
    id: 5,
    name: "Pan Tajado",
    category: "Panadería",
    prices: {
      d1: 4200,
      ara: 4000,
      exito: 4500,
      carulla: 5000,
      jumbo: 4600,
      olimpica: 4100,
    },
  },
];

export default function TheBrainMascotScannerIntegration() {
  const navigate = useNavigate();
  const [isScanning, setIsScanning] = useState(false);
  const [showOptimizer, setShowOptimizer] = useState(false);

  const handleVoiceCommand = () => {
    console.log("Voice command activated in The Brain!");
    handleScan();
  };

  const handleScan = () => {
    setIsScanning(true);
    setTimeout(() => {
      setIsScanning(false);
      setShowOptimizer(true);
    }, 2500);
  };

  // Calculate best prices and savings
  const calculateSavings = () => {
    let totalLowest = 0;
    let totalHighest = 0;

    mockProducts.forEach(product => {
      const prices = Object.values(product.prices);
      totalLowest += Math.min(...prices);
      totalHighest += Math.max(...prices);
    });

    return {
      savings: totalHighest - totalLowest,
      percentage: Math.round(((totalHighest - totalLowest) / totalHighest) * 100),
    };
  };

  const savings = calculateSavings();

  return (
    <div className="min-h-screen w-full relative overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-20 left-0 w-[400px] h-[400px] bg-gradient-radial from-[#397dc1]/40 to-transparent blur-3xl animate-pulse-glow" />
        <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-gradient-radial from-[#d8a93f]/30 to-transparent blur-3xl animate-pulse-glow" style={{ animationDelay: '3s' }} />
      </div>

      {/* Main content */}
      <div className="relative z-10 min-h-screen pb-24">
        
        {/* Header with mascot */}
        <div className="px-6 pt-12 pb-6">
          <div className="flex items-center justify-between mb-6">
            <button
              onClick={() => navigate("/")}
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

            {/* Scanning Lukas Orb */}
            <motion.div
              className="relative"
              animate={isScanning ? { scale: [1, 1.1, 1] } : {}}
              transition={isScanning ? { duration: 1, repeat: Infinity } : {}}
            >
              {/* Scanning rings */}
              {isScanning && (
                <>
                  <motion.div
                    className="absolute inset-0 rounded-full border-2 border-[#397dc1]/40"
                    style={{ width: "80px", height: "80px", left: "-10px", top: "-10px" }}
                    animate={{ scale: [1, 1.5, 1], opacity: [0.5, 0, 0.5] }}
                    transition={{ duration: 1.5, repeat: Infinity, ease: "easeOut" }}
                  />
                  <motion.div
                    className="absolute rounded-full"
                    style={{
                      width: "4px",
                      height: "4px",
                      backgroundColor: "#397dc1",
                      boxShadow: "0 0 10px #397dc1",
                    }}
                    animate={{
                      rotate: 360,
                      x: [30, 30],
                      y: [-30, -30],
                    }}
                    transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                  />
                </>
              )}

              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#397dc1] via-[#21428d] to-[#1e1b4b] flex items-center justify-center relative overflow-hidden glow-primary-strong">
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
              El <span className="text-gradient-lukas">Comparador</span>
            </h1>
            <p className="text-white/70">
              Encuentra los mejores precios en tiempo real
            </p>
          </div>
        </div>

        {/* Savings Summary Card */}
        {showOptimizer && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mx-6 mb-6 p-6 rounded-3xl glass-card-strong neon-border relative overflow-hidden animate-float"
            style={{ 
              borderColor: 'rgba(216, 169, 63, 0.4)',
              boxShadow: '0 0 30px rgba(216, 169, 63, 0.25), 0 0 50px rgba(216, 169, 63, 0.1)'
            }}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-[#d8a93f]/0 via-[#d8a93f]/10 to-[#d8a93f]/0" />
            <div className="relative z-10">
              <div className="flex items-center gap-2 mb-3">
                <Sparkles className="w-5 h-5 text-[#d8a93f]" />
                <span className="text-[#d8a93f] font-bold text-sm tracking-tight">IA Optimizer Activado</span>
              </div>
              <div className="flex items-end justify-between">
                <div>
                  <p className="text-white/70 text-sm mb-1">Ahorro potencial</p>
                  <p className="text-4xl font-bold text-white tracking-tight">${savings.savings.toLocaleString()}</p>
                </div>
                <div className="text-right">
                  <div className="flex items-center gap-1 text-[#d8a93f] mb-1">
                    <TrendingDown className="w-4 h-4" />
                    <span className="font-bold text-lg">{savings.percentage}%</span>
                  </div>
                  <p className="text-white/60 text-xs">vs tienda más cara</p>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* Product comparison grid */}
        <div className="px-6 space-y-3 mb-6">
          {mockProducts.map((product, index) => {
            const bestPrice = Math.min(...Object.values(product.prices));
            const bestStore = Object.entries(product.prices).find(([_, price]) => price === bestPrice)?.[0];

            return (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.4 }}
                className="p-5 rounded-2xl glass-card hover:border-white/20 transition-premium"
              >
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-white font-bold mb-1 tracking-tight">{product.name}</h3>
                    <p className="text-white/50 text-sm">{product.category}</p>
                  </div>
                  <ShoppingCart className="w-5 h-5 text-[#397dc1]/60" />
                </div>

                {/* Price comparison mini-grid */}
                <div className="grid grid-cols-3 gap-2">
                  {Object.entries(product.prices).slice(0, 6).map(([storeId, price]) => {
                    const store = stores.find(s => s.id === storeId);
                    const isBest = price === bestPrice;
                    
                    return (
                      <div
                        key={storeId}
                        className={`p-3 rounded-xl transition-premium ${
                          isBest
                            ? "bg-gradient-to-br from-[#d8a93f]/20 to-[#b8892f]/20 border border-[#d8a93f]/40 glow-success"
                            : "bg-white/5 border border-white/5"
                        }`}
                      >
                        <div className="flex items-center gap-1.5 mb-1.5">
                          <span className="text-sm">{store?.logo}</span>
                          <span className="text-white/70 text-xs font-medium">{store?.name}</span>
                        </div>
                        <p className={`font-bold text-sm tracking-tight ${isBest ? "text-[#d8a93f]" : "text-white/90"}`}>
                          ${price.toLocaleString()}
                        </p>
                      </div>
                    );
                  })}
                </div>

                {/* Best price indicator */}
                {bestStore && (
                  <div className="mt-3 flex items-center gap-2 text-[#d8a93f] text-sm">
                    <Zap className="w-4 h-4" />
                    <span className="font-bold tracking-tight">
                      Mejor en {stores.find(s => s.id === bestStore)?.name}
                    </span>
                  </div>
                )}
              </motion.div>
            );
          })}
        </div>

        {/* Bottom CTA */}
        <div className="fixed bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-[#0f172a] via-[#0f172a]/95 to-transparent pb-safe">
          <motion.button
            onClick={handleScan}
            disabled={isScanning}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className={`w-full py-4 rounded-2xl font-bold text-white shadow-xl transition-premium btn-primary ${
              isScanning ? "animate-pulse" : ""
            }`}
          >
            {isScanning ? (
              <span className="flex items-center justify-center gap-2">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                >
                  <Sparkles className="w-5 h-5" />
                </motion.div>
                Escaneando precios...
              </span>
            ) : showOptimizer ? (
              "Actualizar Comparación"
            ) : (
              "Activar IA Optimizer"
            )}
          </motion.button>
        </div>

      </div>
    </div>
  );
}