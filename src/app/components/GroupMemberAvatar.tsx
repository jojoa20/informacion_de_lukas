import { motion } from "motion/react";
import { useState } from "react";
import { useApp } from "../context/AppContext";

interface GroupMemberAvatarProps {
  memberId: string;
  name: string;
  active: boolean;
  avatarUrl?: string;
  size?: "sm" | "md" | "lg";
}

export function GroupMemberAvatar({
  memberId,
  name,
  active,
  avatarUrl,
  size = "md",
}: GroupMemberAvatarProps) {
  const [showTooltip, setShowTooltip] = useState(false);
  const { toggleMemberActive } = useApp();

  const sizes = {
    sm: "w-12 h-12",
    md: "w-14 h-14",
    lg: "w-16 h-16",
  };

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map(n => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <div className="relative inline-flex flex-col items-center gap-2">
      {/* Avatar */}
      <motion.button
        onClick={() => toggleMemberActive(memberId)}
        onMouseEnter={() => setShowTooltip(true)}
        onMouseLeave={() => setShowTooltip(false)}
        className={`relative ${sizes[size]} rounded-full overflow-hidden`}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
      >
        {/* Background */}
        <div className="absolute inset-0 bg-[#1e293b]" />

        {/* Avatar image or initials */}
        {avatarUrl ? (
          <img src={avatarUrl} alt={name} className="w-full h-full object-cover" />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-[#f1f5f9] font-['Manrope:Bold',sans-serif] text-sm">
              {getInitials(name)}
            </span>
          </div>
        )}

        {/* Active border and glow */}
        {active && (
          <>
            <motion.div
              className="absolute inset-0 border-2 border-[#2ecc71] rounded-full"
              animate={{
                boxShadow: [
                  "0 0 15px rgba(46, 204, 113, 0.5)",
                  "0 0 25px rgba(46, 204, 113, 0.7)",
                  "0 0 15px rgba(46, 204, 113, 0.5)",
                ],
              }}
              transition={{ duration: 2, repeat: Infinity }}
            />
            <motion.div
              className="absolute top-0 right-0 w-3 h-3 bg-[#2ecc71] rounded-full border-2 border-[#1e293b]"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 500, damping: 15 }}
            />
          </>
        )}

        {/* Inactive state */}
        {!active && (
          <div className="absolute inset-0 border-2 border-[#334155] rounded-full" />
        )}

        {/* Opacity overlay for inactive */}
        {!active && <div className="absolute inset-0 bg-black/30" />}
      </motion.button>

      {/* Name */}
      <motion.span
        className={`text-xs font-['Manrope:Medium',sans-serif] ${
          active ? "text-[#2ecc71]" : "text-[#94a3b8]"
        }`}
        animate={{ opacity: active ? 1 : 0.6 }}
      >
        {name}
      </motion.span>

      {/* Tooltip */}
      {showTooltip && (
        <motion.div
          className="absolute -top-12 left-1/2 -translate-x-1/2 bg-[#1e293b] border border-[#334155] px-3 py-2 rounded-lg whitespace-nowrap z-10"
          initial={{ opacity: 0, y: 5 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 5 }}
        >
          <p className="text-[#f1f5f9] text-xs font-['Manrope:Medium',sans-serif]">
            {active ? "Activo" : "Inactivo"}
          </p>
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 rotate-45 w-2 h-2 bg-[#1e293b] border-r border-b border-[#334155]" />
        </motion.div>
      )}

      {/* Activity indicator - pulse when active */}
      {active && (
        <motion.div
          className="absolute -top-1 -right-1 w-4 h-4 bg-[#2ecc71] rounded-full"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.5, 1, 0.5],
          }}
          transition={{ duration: 2, repeat: Infinity }}
        />
      )}
    </div>
  );
}
