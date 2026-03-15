import Hero from "@/components/Hero";
import ProblemStatement from "@/components/ProblemStatement";
import InputMethods from "@/components/InputMethods";
import LeakBuster from "@/components/LeakBuster";
import ProductDemo from "@/components/ProductDemo";
import LeakDetection from "@/components/LeakDetection";
import FinScore from "@/components/FinScore";
import AIPersonality from "@/components/AIPersonality";
import Features from "@/components/Features";
import WeeklyHeatmap from "@/components/WeeklyHeatmap";
import InteractiveDemo from "@/components/InteractiveDemo";
import Storytelling from "@/components/Storytelling";
import Gamification from "@/components/Gamification";
import FinancialProjection from "@/components/FinancialProjection";
import CTA from "@/components/CTA";

export default function Home() {
  return (
    <main className="min-h-screen bg-transparent text-white selection:bg-lukas-primary selection:text-white pb-20 overflow-hidden">
      <Hero />
      <ProblemStatement />
      <InputMethods />
      <LeakBuster />
      <ProductDemo />
      <LeakDetection />
      <FinScore />
      <AIPersonality />
      <Features />
      <WeeklyHeatmap />
      <InteractiveDemo />
      <Storytelling />
      <Gamification />
      <FinancialProjection />
      <CTA />
    </main>
  );
}
