import { motion } from "motion/react";
import { useState } from "react";

interface PriceComparisonCardProps {
  productName: string;
  category: string;
  prices: {
    store: string;
    price: number;
    isLowest?: boolean;
  }[];
}

export function PriceComparisonCard({ productName, category, prices }: PriceComparisonCardProps) {
  const [expanded, setExpanded] = useState(false);
  const lowestPrice = Math.min(...prices.map(p => p.price));
  const highestPrice = Math.max(...prices.map(p => p.price));
  const savings = highestPrice - lowestPrice;

  return (
    <motion.div
      className="glass-card neon-border glow-hover overflow-hidden"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.3 }}
    >
      <div className="p-5">
        {/* Header */}
        <div className="flex items-start gap-3 mb-4">
          {/* Icon */}
          <div className="bg-white/5 w-12 h-12 rounded-xl flex items-center justify-center shrink-0">
            <svg width="20" height="20" viewBox="0 0 20 20" fill="#00D4FF">
              <path d="M4 6h12M4 10h12M4 14h8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            </svg>
          </div>

          {/* Product info */}
          <div className="flex-1 min-w-0">
            <h4 className="text-white font-['Outfit',sans-serif] font-bold text-base mb-1 truncate">
              {productName}
            </h4>
            <p className="text-white/40 font-['Outfit',sans-serif] text-xs">
              Categoría: {category}
            </p>
          </div>

          {/* Expand button */}
          <motion.button
            onClick={() => setExpanded(!expanded)}
            className="text-white/60 hover:text-white transition-colors"
            animate={{ rotate: expanded ? 180 : 0 }}
          >
            <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
              <path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" />
            </svg>
          </motion.button>
        </div>

        {/* Price grid */}
        <div className="grid grid-cols-3 gap-2">
          {prices.map((item, index) => {
            const isLowest = item.price === lowestPrice;
            return (
              <motion.div
                key={item.store}
                className={`rounded-xl p-3 border ${
                  isLowest
                    ? "bg-[#00D4FF]/10 border-[#00D4FF]/30 glow-cyan"
                    : "bg-white/5 border-white/5"
                }`}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1 }}
              >
                <p
                  className={`text-[10px] font-['Outfit',sans-serif] font-bold uppercase tracking-wider mb-2 ${
                    isLowest ? "text-[#00D4FF]" : "text-white/40"
                  }`}
                >
                  {item.store}
                </p>
                <p
                  className={`text-sm font-['Outfit',sans-serif] font-bold ${
                    isLowest ? "text-white" : "text-white/70"
                  }`}
                >
                  ${item.price.toLocaleString()}
                </p>
                {isLowest && (
                  <motion.p
                    className="text-[8px] text-[#00D4FF] font-['Outfit',sans-serif] mt-1"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5 }}
                  >
                    Más barato
                  </motion.p>
                )}
              </motion.div>
            );
          })}
        </div>

        {/* Savings badge */}
        {savings > 0 && (
          <motion.div
            className="mt-4 pt-4 border-t border-white/5 flex items-center justify-between"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            <span className="text-white/40 text-xs font-['Outfit',sans-serif]">
              Ahorro potencial
            </span>
            <div className="flex items-center gap-2">
              <motion.div
                className="bg-[#00FF88] w-2 h-2 rounded-full animate-pulse-glow"
                animate={{ scale: [1, 1.3, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
              <span className="text-[#00FF88] text-sm font-['Outfit',sans-serif] font-bold">
                ${savings.toLocaleString()}
              </span>
            </div>
          </motion.div>
        )}

        {/* Expanded details */}
        <motion.div
          initial={false}
          animate={{ height: expanded ? "auto" : 0, opacity: expanded ? 1 : 0 }}
          transition={{ duration: 0.3 }}
          className="overflow-hidden"
        >
          <div className="mt-4 pt-4 border-t border-white/5 space-y-2">
            <p className="text-white/60 text-xs font-['Outfit',sans-serif] font-medium">
              💡 Sugerencia de Lukas
            </p>
            <p className="text-white/80 text-xs font-['Outfit',sans-serif] leading-relaxed">
              Compra este producto en <span className="text-[#00D4FF] font-['Outfit',sans-serif] font-bold">
                {prices.find(p => p.price === lowestPrice)?.store}
              </span> para maximizar tu ahorro.
            </p>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}