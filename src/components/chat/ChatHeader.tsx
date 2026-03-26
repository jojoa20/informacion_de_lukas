"use client";

import React from "react";
import Link from "next/link";

export default function ChatHeader() {
  return (
    <div className="w-full bg-white h-14 flex items-center justify-between px-4 sticky top-0 z-50 border-b border-gray-200 shadow-sm flex-shrink-0">
      
      {/* Back Arrow & Title */}
      <div className="flex items-center gap-3">
        <Link href="/" className="text-blue-600 hover:bg-blue-50 p-1.5 rounded-full transition-colors">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
        </Link>
        <h1 className="text-blue-700 font-bold text-lg tracking-tight">Lukas AI - Chat</h1>
      </div>

      {/* Options Menu Menu (Three Dots) */}
      <button className="text-gray-500 hover:bg-gray-100 p-1.5 rounded-full transition-colors">
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
        </svg>
      </button>
      
    </div>
  );
}
