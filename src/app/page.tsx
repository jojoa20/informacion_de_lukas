"use client";

import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import SplashScreen from "@/components/demo/SplashScreen";

export default function RootPage() {
  const router = useRouter();

  return (
    <SplashScreen onFinishLoading={() => router.replace("/home")} />
  );
}
