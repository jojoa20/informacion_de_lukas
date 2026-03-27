"use client";
import React, { useState } from "react";
import { AnimatePresence } from "framer-motion";
import SplashScreen from "./SplashScreen";
import HomeView from "./HomeView";
import ChatView from "./ChatView";
import AnalyticsView from "./AnalyticsView";
import MetasView from "./MetasView";
import HistorialView from "./HistorialView";
import BottomNav from "./BottomNav";

export default function DemoContainer() {
  const [activeTab, setActiveTab] = useState("home"); // home, chat, analytics
  const [showAlert, setShowAlert] = useState(false);
  const [showSplash, setShowSplash] = useState(true);

  return (
    <div className="flex flex-col h-full w-full relative">
      {showSplash && <SplashScreen onFinishLoading={() => setShowSplash(false)} />}
      
      {/* Scrollable Content Area */}
      <div className="flex-1 overflow-y-auto no-scrollbar pb-24 relative z-10">
        <AnimatePresence mode="wait">
          {activeTab === "home" && <HomeView key="home" onOpenAlert={() => setShowAlert(true)} />}
          {activeTab === "chat" && <ChatView key="chat" />}
          {activeTab === "analytics" && <AnalyticsView key="analytics" />}
          {activeTab === "metas" && <MetasView key="metas" />}
          {activeTab === "historial" && <HistorialView key="historial" />}
        </AnimatePresence>
      </div>

      {/* Bottom Navigation */}
      <BottomNav activeTab={activeTab} onChangeTab={setActiveTab} />
    </div>
  );
}
