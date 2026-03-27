import { RouterProvider } from "react-router";
import { router } from "./routes";
import { useState, useEffect } from "react";
import { SplashScreen } from "./components/SplashScreen";

export default function App() {
  const [showSplash, setShowSplash] = useState(true);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    // Simulate initial loading
    const timer = setTimeout(() => {
      setIsReady(true);
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  if (!isReady || showSplash) {
    return <SplashScreen onComplete={() => setShowSplash(false)} />;
  }

  return <RouterProvider router={router} />;
}