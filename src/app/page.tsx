"use client";

import React, { useEffect } from "react";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import ProblemStatement from "@/components/ProblemStatement";
import InputMethods from "@/components/InputMethods";
import LeakBuster from "@/components/LeakBuster";
import ProductDemo from "@/components/ProductDemo";
import LeakDetection from "@/components/LeakDetection";
import FinScore from "@/components/FinScore";
import AIPersonality from "@/components/AIPersonality";
import OCRSection from "@/components/OCRSection";
import Features from "@/components/Features";
import WeeklyHeatmap from "@/components/WeeklyHeatmap";
import InteractiveDemo from "@/components/InteractiveDemo";
import Storytelling from "@/components/Storytelling";
import Gamification from "@/components/Gamification";
import Comparison from "@/components/Comparison";
import FinancialProjection from "@/components/FinancialProjection";
import CTA from "@/components/CTA";
import BeforeAfter from "@/components/BeforeAfter";
import BackgroundNetwork from "@/components/BackgroundNetwork";

export default function Home() {
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const cards = document.getElementsByClassName("spotlight-card");
      for (const card of cards as any) {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        card.style.setProperty("--mouse-x", `${x}px`);
        card.style.setProperty("--mouse-y", `${y}px`);
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <main className="min-h-screen bg-transparent text-white selection:bg-lukas-primary selection:text-white pb-20 overflow-hidden relative">
      <Navbar />
      <BackgroundNetwork />
      <Hero />
      <ProblemStatement />
      <InputMethods />
      <LeakBuster />
      <ProductDemo />
      <LeakDetection />
      <FinScore />
      <OCRSection />
      <AIPersonality />
      <Features />
      <WeeklyHeatmap />
      <InteractiveDemo />
      <Storytelling />
      <Gamification />
      <Comparison />
      <BeforeAfter />
      <FinancialProjection />
      <CTA />
    </main>
  );
}

