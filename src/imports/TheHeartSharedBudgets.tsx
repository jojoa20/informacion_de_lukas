import { motion } from "motion/react";
import { useNavigate } from "react-router";
import { ArrowLeft, Plus, TrendingUp, TrendingDown, DollarSign, Users } from "lucide-react";
import { useState } from "react";
import svgPaths from "./svg-o76n3yot3d";
import { VoiceAssistant3D } from "../app/components/VoiceAssistant3D";

// Mock data for shared budget
const mockBudgetData = {
  monthlyLimit: 1200000,
  spent: 847500,
  members: [
    { id: 1, name: "María", avatar: "👩", color: "from-pink-400 to-pink-600", lastExpense: 45000, active: true },
    { id: 2, name: "Carlos", avatar: "👨", color: "from-blue-400 to-blue-600", lastExpense: 82000, active: false },
    { id: 3, name: "Ana", avatar: "👧", color: "from-purple-400 to-purple-600", lastExpense: 23000, active: true },
    { id: 4, name: "Pedro", avatar: "🧑", color: "from-green-400 to-green-600", lastExpense: 0, active: false },
  ],
  recentExpenses: [
    { id: 1, member: "María", category: "Supermercado", amount: 125000, store: "Éxito", date: "Hoy, 10:30 AM" },
    { id: 2, member: "Carlos", category: "Frutas", amount: 45000, store: "D1", date: "Hoy, 9:15 AM" },
    { id: 3, member: "Ana", category: "Lácteos", amount: 32000, store: "Ara", date: "Ayer, 6:45 PM" },
    { id: 4, member: "María", category: "Carnes", amount: 87000, store: "Jumbo", date: "Ayer, 5:20 PM" },
  ],
};

export default function TheHeartSharedBudgets() {
  const navigate = useNavigate();
  const [showExpenseModal, setShowExpenseModal] = useState(false);

  const handleVoiceCommand = () => {
    console.log("Voice command activated in The Heart!");
    setShowExpenseModal(true);
  };

  const percentageUsed = (mockBudgetData.spent / mockBudgetData.monthlyLimit) * 100;
  const remaining = mockBudgetData.monthlyLimit - mockBudgetData.spent;

  // Calculate health status
  const getHealthStatus = () => {
    if (percentageUsed < 50) return { color: "from-[#d8a93f] to-[#b8892f]", text: "Excelente", icon: TrendingDown };
    if (percentageUsed < 75) return { color: "from-[#397dc1] to-[#21428d]", text: "Moderado", icon: TrendingUp };
    return { color: "from-[#f36e53] to-[#d14d34]", text: "Alerta", icon: TrendingUp };
  };

  const healthStatus = getHealthStatus();

  return (
    <div className="min-h-screen w-full relative overflow-hidden">
      {/* Dynamic mesh gradient based on budget health */}
      <div className="absolute inset-0 opacity-30 transition-all duration-1000">
        <motion.div
          className={`absolute top-0 right-0 w-[500px] h-[500px] bg-gradient-radial ${healthStatus.color} to-transparent blur-3xl`}
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-gradient-radial from-[#397dc1]/30 to-transparent blur-3xl animate-pulse-glow" />
      </div>

      {/* Main content */}
      <div className="relative z-10 min-h-screen pb-32">
        
        {/* Header */}
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

            {/* Lukas orb - alert state */}
            <motion.div
              className="relative"
              animate={percentageUsed > 90 ? { scale: [1, 1.05, 1] } : {}}
              transition={percentageUsed > 90 ? { duration: 0.8, repeat: Infinity } : {}}
            >
              <div className={`w-16 h-16 rounded-full bg-gradient-to-br ${healthStatus.color} flex items-center justify-center relative overflow-hidden`} 
                style={{ 
                  boxShadow: percentageUsed > 80 
                    ? '0 0 20px rgba(243, 110, 83, 0.4), 0 0 40px rgba(243, 110, 83, 0.2)' 
                    : '0 0 20px rgba(216, 169, 63, 0.3), 0 0 40px rgba(216, 169, 63, 0.1)' 
                }}
              >
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

          <div className="mb-8">
            <h1 className="text-3xl font-bold text-white mb-2 tracking-tight">
              Tu <span className="text-gradient-lukas">Presupuesto</span>
            </h1>
            <p className="text-white/70">
              Gestión compartida con tu familia
            </p>
          </div>

          {/* Budget Energy Ring */}
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="relative w-64 h-64 mx-auto mb-8"
          >
            {/* Outer ring background */}
            <svg className="w-full h-full transform -rotate-90">
              <circle
                cx="128"
                cy="128"
                r="110"
                fill="none"
                stroke="rgba(255, 255, 255, 0.05)"
                strokeWidth="24"
              />
              {/* Progress ring */}
              <motion.circle
                cx="128"
                cy="128"
                r="110"
                fill="none"
                stroke="url(#gradient)"
                strokeWidth="24"
                strokeLinecap="round"
                initial={{ strokeDasharray: `0 ${2 * Math.PI * 110}` }}
                animate={{
                  strokeDasharray: `${(percentageUsed / 100) * (2 * Math.PI * 110)} ${2 * Math.PI * 110}`,
                }}
                transition={{ duration: 1.5, ease: "easeOut" }}
              />
              <defs>
                <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor={percentageUsed < 75 ? "#397dc1" : "#f36e53"} />
                  <stop offset="100%" stopColor={percentageUsed < 75 ? "#d8a93f" : "#d14d34"} />
                </linearGradient>
              </defs>
            </svg>

            {/* Center content */}
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <p className="text-white/60 text-sm mb-1">Gastado</p>
              <p className="text-4xl font-bold text-white mb-2 tracking-tight">
                ${(mockBudgetData.spent / 1000).toFixed(0)}k
              </p>
              <div className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-gradient-to-r ${healthStatus.color} bg-opacity-20`}>
                <healthStatus.icon className="w-4 h-4 text-white" />
                <span className="text-white text-sm font-bold">{Math.round(percentageUsed)}%</span>
              </div>
            </div>

            {/* Remaining amount */}
            <div className="absolute -bottom-6 left-0 right-0 text-center">
              <p className="text-white/50 text-sm">
                Quedan <span className="text-white font-bold">${(remaining / 1000).toFixed(0)}k</span> de ${(mockBudgetData.monthlyLimit / 1000).toFixed(0)}k
              </p>
            </div>
          </motion.div>
        </div>

        {/* Group members avatars */}
        <div className="px-6 mb-8 mt-16">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-white font-bold flex items-center gap-2 tracking-tight">
              <Users className="w-5 h-5 text-[#397dc1]" />
              Miembros del Grupo
            </h2>
            <span className="text-white/60 text-sm">{mockBudgetData.members.length} personas</span>
          </div>

          <div className="flex gap-3 overflow-x-auto pb-2">
            {mockBudgetData.members.map((member) => (
              <motion.div
                key={member.id}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: member.id * 0.1 }}
                className="flex-shrink-0"
              >
                <div className="relative">
                  {/* Active indicator */}
                  {member.active && (
                    <motion.div
                      className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-[#d8a93f] border-2 border-[#0f172a] z-10"
                      animate={{
                        scale: [1, 1.2, 1],
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                      }}
                    />
                  )}

                  {/* Avatar */}
                  <div className={`w-20 h-20 rounded-2xl bg-gradient-to-br ${member.color} flex items-center justify-center text-3xl shadow-lg relative overflow-hidden`}>
                    <div className="absolute inset-0 bg-white/10" />
                    <span className="relative z-10">{member.avatar}</span>
                  </div>
                </div>
                <p className="text-white text-center text-sm mt-2 font-bold tracking-tight">{member.name}</p>
                {member.lastExpense > 0 && (
                  <p className="text-white/50 text-center text-xs mt-0.5">
                    ${(member.lastExpense / 1000).toFixed(0)}k
                  </p>
                )}
              </motion.div>
            ))}

            {/* Add member button */}
            <div className="flex-shrink-0">
              <button className="w-20 h-20 rounded-2xl btn-secondary-glass border-2 border-dashed border-white/20 hover:border-white/40 transition-premium flex items-center justify-center">
                <Plus className="w-8 h-8 text-white/50" />
              </button>
              <p className="text-white/50 text-center text-sm mt-2">Agregar</p>
            </div>
          </div>
        </div>

        {/* Recent expenses */}
        <div className="px-6">
          <h2 className="text-white font-bold mb-4 flex items-center gap-2 tracking-tight">
            <DollarSign className="w-5 h-5 text-[#397dc1]" />
            Gastos Recientes
          </h2>

          <div className="space-y-3">
            {mockBudgetData.recentExpenses.map((expense, index) => (
              <motion.div
                key={expense.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="p-4 rounded-2xl glass-card hover:border-white/20 transition-premium"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#397dc1]/20 to-[#21428d]/20 flex items-center justify-center">
                      <span className="text-xl">
                        {mockBudgetData.members.find(m => m.name === expense.member)?.avatar}
                      </span>
                    </div>
                    <div>
                      <p className="text-white font-bold tracking-tight">{expense.category}</p>
                      <p className="text-white/50 text-sm">{expense.store} • {expense.member}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-white font-bold tracking-tight">-${expense.amount.toLocaleString()}</p>
                    <p className="text-white/40 text-xs">{expense.date}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="fixed bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-[#0f172a] via-[#0f172a]/95 to-transparent pb-safe">
          <motion.button
            onClick={() => setShowExpenseModal(true)}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="w-full py-4 rounded-2xl font-bold text-white shadow-xl btn-primary flex items-center justify-center gap-2 transition-premium"
          >
            <Plus className="w-5 h-5" />
            Registrar Gasto
          </motion.button>
        </div>

      </div>
    </div>
  );
}