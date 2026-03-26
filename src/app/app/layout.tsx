import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Lukas APP MVP",
  description: "Wireframe Interactivo Lukas",
};

export default function MobileLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="min-h-screen bg-[#1a1525] flex justify-center items-center p-0 sm:p-4">
      <div className="relative w-full h-[100dvh] sm:w-[390px] sm:h-[844px] sm:rounded-[50px] bg-gradient-to-br from-[#17112c] via-[#1c153b] to-[#2a164d] sm:box-shadow-mobile overflow-hidden text-white flex flex-col sm:border-[8px] border-[#333]">
        
        {/* Mock Dynamic Island (Desktop only) */}
        <div className="hidden sm:block absolute top-3 left-1/2 -translate-x-1/2 w-[120px] h-[35px] bg-black rounded-[20px] z-50"></div>
        
        {/* Status Bar */}
        <div className="flex justify-between px-6 pt-4 sm:pt-6 pb-2 text-[13px] font-semibold opacity-90 z-40 relative">
          <span>01:17</span>
          <div className="flex items-center space-x-2">
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 15h-2v-2h2v2zm0-4h-2V7h2v6z"/></svg>
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor"><path d="M15.67 4H14V2h-4v2H8.33C7.6 4 7 4.6 7 5.33v15.33C7 21.4 7.6 22 8.33 22h7.33c.74 0 1.34-.6 1.34-1.33V5.33C17 4.6 16.4 4 15.67 4z"/></svg>
          </div>
        </div>

        {/* Scrollable Content Area */}
        {children}

      </div>
    </div>
  );
}
