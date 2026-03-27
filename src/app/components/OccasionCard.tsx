import { motion } from "motion/react";
import { useNavigate } from "react-router";
import { useApp } from "../context/AppContext";

interface OccasionCardProps {
  title: string;
  description: string;
  tag: string;
  tagColor: string;
  imageUrl: string;
  ingredients?: string[];
}

export function OccasionCard({
  title,
  description,
  tag,
  tagColor,
  imageUrl,
  ingredients = [],
}: OccasionCardProps) {
  const navigate = useNavigate();
  const { setSelectedOccasion, setLukasState } = useApp();

  const handleExplore = () => {
    setSelectedOccasion(title);
    setLukasState("scanner");
    
    // Simulate loading
    setTimeout(() => {
      setLukasState("success");
      navigate("/brain");
    }, 1500);
  };

  return (
    <motion.div
      className="relative h-[420px] rounded-2xl overflow-hidden shadow-2xl cursor-pointer"
      whileHover={{ scale: 1.02, y: -5 }}
      transition={{ duration: 0.3 }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
    >
      {/* Background image */}
      <div className="absolute inset-0">
        <img
          src={imageUrl}
          alt={title}
          className="w-full h-full object-cover"
          style={{ objectPosition: "center" }}
        />
      </div>

      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[rgba(16,25,34,0.4)] to-[rgba(16,25,34,0.95)]" />

      {/* Content */}
      <div className="absolute bottom-0 left-0 right-0 p-6 space-y-3">
        {/* Tag */}
        <motion.div
          className="inline-block px-4 py-1 rounded-full"
          style={{ backgroundColor: tagColor }}
          whileHover={{ scale: 1.05 }}
        >
          <span className="text-white text-[10px] font-['Manrope:Bold',sans-serif] uppercase tracking-[2px]">
            {tag}
          </span>
        </motion.div>

        {/* Title */}
        <h3 className="text-white text-3xl font-['Manrope:Light',sans-serif] leading-tight">
          {title}
        </h3>

        {/* Description */}
        <p className="text-[#cbd5e1] text-sm font-['Manrope:Light',sans-serif] leading-relaxed max-w-[280px]">
          {description}
        </p>

        {/* Ingredients preview */}
        {ingredients.length > 0 && (
          <motion.div
            className="flex flex-wrap gap-2 mt-3"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            {ingredients.slice(0, 3).map((ingredient, index) => (
              <span
                key={index}
                className="text-[10px] text-[#94a3b8] bg-[rgba(255,255,255,0.1)] backdrop-blur-sm px-2 py-1 rounded-full font-['Manrope:Medium',sans-serif]"
              >
                {ingredient}
              </span>
            ))}
            {ingredients.length > 3 && (
              <span className="text-[10px] text-[#64748b] px-2 py-1 font-['Manrope:Medium',sans-serif]">
                +{ingredients.length - 3} más
              </span>
            )}
          </motion.div>
        )}

        {/* Action button */}
        <motion.button
          onClick={handleExplore}
          className="backdrop-blur-md bg-[rgba(255,255,255,0.1)] border border-[rgba(255,255,255,0.2)] text-white px-8 py-3 rounded-full mt-4"
          whileHover={{ scale: 1.05, backgroundColor: "rgba(255,255,255,0.15)" }}
          whileTap={{ scale: 0.95 }}
        >
          <span className="text-xs font-['Manrope:Bold',sans-serif] uppercase tracking-[1.2px]">
            Explorar Magia
          </span>
        </motion.button>
      </div>

      {/* Hover overlay */}
      <motion.div
        className="absolute inset-0 bg-[rgba(37,140,244,0.1)] pointer-events-none"
        initial={{ opacity: 0 }}
        whileHover={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
      />
    </motion.div>
  );
}
