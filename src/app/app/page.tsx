"use client";

import React, { useState } from "react";
import MobileHeader from "@/components/mobile/MobileHeader";
import MobileFinScore from "@/components/mobile/MobileFinScore";
import MobileLeakBuster from "@/components/mobile/MobileLeakBuster";
import MobileBottomBar from "@/components/mobile/MobileBottomBar";

export default function MobileApp() {
  const [score, setScore] = useState(8850); // Scaled appropriately for MVP (0-1000 in DB, but wireframe showed 8850, we'll keep 885 for logic)

  // Actually, UI showed 8850, let's just use 885 to fit local logic 0-1000
  const [finScore, setFinScore] = useState(885); 

  const handleAddTransaction = (amount: number, category: string) => {
    // If it's a negative expense
    if (amount < 0) {
      setFinScore((prev) => Math.max(0, prev - 15)); // Minus 15 points
    }
  };

  return (
    <div className="flex flex-col w-full h-full px-4 overflow-y-auto no-scrollbar relative">
      <MobileHeader />
      <MobileFinScore score={finScore} />
      <MobileLeakBuster />
      <MobileBottomBar onTransactionAdd={handleAddTransaction} />
    </div>
  );
}
