import { motion } from "motion/react";
import { useNavigate, useLocation } from "react-router";
import { Home, Brain, Heart, Sparkles } from "lucide-react";

export function BottomNavigation() {
  const navigate = useNavigate();
  const location = useLocation();

  const tabs = [
    { id: "home", label: "Inicio", icon: Home, path: "/" },
    { id: "brain", label: "Comparar", icon: Brain, path: "/brain" },
    { id: "heart", label: "Presupuesto", icon: Heart, path: "/heart" },
    { id: "magic", label: "Ocasiones", icon: Sparkles, path: "/magic" },
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 pb-safe">
      <div className="relative mx-4 mb-4 rounded-3xl glass-card-strong overflow-hidden">
        {/* Background gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#00D4FF]/5 to-transparent" />
        
        <div className="relative flex items-center justify-around px-2 py-3">
          {tabs.map((tab) => {
            const isActive = location.pathname === tab.path;
            const Icon = tab.icon;

            return (
              <button
                key={tab.id}
                onClick={() => navigate(tab.path)}
                className="relative flex flex-col items-center justify-center gap-1 px-4 py-2 rounded-2xl transition-all duration-300 min-w-[72px]"
              >
                {/* Active background */}
                {isActive && (
                  <motion.div
                    layoutId="activeTab"
                    className="absolute inset-0 bg-gradient-to-r from-[#00D4FF]/20 to-[#00FF88]/20 rounded-2xl neon-border glow-cyan"
                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                  />
                )}

                {/* Icon */}
                <div className="relative z-10">
                  <Icon
                    className={`w-5 h-5 transition-all duration-300 ${
                      isActive ? "text-[#00D4FF] scale-110" : "text-white/50"
                    }`}
                  />
                </div>

                {/* Label */}
                <span
                  className={`relative z-10 text-xs font-medium transition-all duration-300 ${
                    isActive ? "text-white" : "text-white/40"
                  }`}
                >
                  {tab.label}
                </span>

                {/* Active dot */}
                {isActive && (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="absolute -top-1 w-1.5 h-1.5 rounded-full bg-[#00D4FF] glow-cyan"
                  />
                )}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}