import React from "react";
import BottomNav from "@/components/demo/BottomNav";

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="h-[100dvh] w-full bg-gradient-to-b from-[#1a2a5e] to-[#111827] flex flex-col overflow-hidden font-sans text-white">
      <div className="w-full h-full max-w-[600px] mx-auto flex flex-col relative shadow-[0_0_50px_rgba(0,0,0,0.5)] bg-gradient-to-b from-[#1a2a5e] to-[#111827]">
        {/* Scrollable Content Area */}
        <div className="flex-1 overflow-y-auto no-scrollbar pb-24 relative z-10">
          {children}
        </div>

        {/* Persistent Bottom Navigation */}
        <BottomNav />
      </div>
    </div>
  );
}
