import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Lukas AI Chat",
  description: "Interfaz de chat nativa para Lukas AI",
};

export default function ChatLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="h-[100dvh] w-full bg-gradient-to-b from-[#1a2a5e] to-[#111827] flex flex-col overflow-hidden font-sans text-white">
      <div className="w-full h-full max-w-[600px] mx-auto flex flex-col relative shadow-[0_0_50px_rgba(0,0,0,0.5)] bg-gradient-to-b from-[#1a2a5e] to-[#111827]">
        {children}
      </div>
    </div>
  );
}
