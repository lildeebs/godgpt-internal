'use client';

import React, { useState } from 'react';

export default function DownloadBanner() {
  const [isDismissed, setIsDismissed] = useState(false);

  if (isDismissed) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-gradient-to-r from-[#1a0a2e] via-[#2d1b4e] to-[#1a0a2e] border-t border-purple-500/30 shadow-[0_-8px_30px_rgba(168,85,247,0.3)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-4">
          {/* Left Section: Download Now + Logo */}
          <div className="flex items-center gap-4 flex-1">
            <div className="flex flex-col">
              <h3 className="text-white font-bold text-lg sm:text-xl mb-1">
                Download now
              </h3>
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center">
                  <span className="text-white font-bold text-lg">Ψ</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-white font-semibold text-sm">GodGPT</span>
                  <span className="text-gray-400 text-xs">Your cosmic AI guide</span>
                </div>
              </div>
            </div>

            {/* Marketing Landing Page CTA - Prominent Button */}
            <a
              href="https://lildeebs.github.io/GodGPT-Marketing/2025-wrapped/"
              target="_blank"
              rel="noopener noreferrer"
              className="ml-4 px-6 py-3 rounded-xl bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold text-sm sm:text-base transition-all duration-200 active:opacity-80 active:scale-[0.98] hover:shadow-[0_0_30px_rgba(168,85,247,0.6)] shadow-[0_4px_15px_rgba(168,85,247,0.4)] flex items-center gap-2 group"
            >
              <span className="text-xs sm:text-sm">✨</span>
              <span>Get your Lunar New Year Reading</span>
              <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </a>
          </div>

          {/* Center Section: Phone Mockups */}
          <div className="hidden md:flex items-center gap-2 flex-shrink-0">
            <div className="w-24 h-48 rounded-2xl bg-gray-900 border-2 border-purple-500/30 shadow-lg overflow-hidden relative">
              <div className="absolute top-2 left-1/2 -translate-x-1/2 w-16 h-1 bg-gray-700 rounded-full"></div>
              <div className="h-full bg-gradient-to-b from-[#0a0a0a] to-[#1a0a2e] flex items-center justify-center">
                <div className="text-center px-2">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center mx-auto mb-2">
                    <span className="text-white font-bold text-sm">Ψ</span>
                  </div>
                  <p className="text-white text-xs font-semibold">GodGPT</p>
                </div>
              </div>
            </div>
            <div className="w-24 h-48 rounded-2xl bg-gray-900 border-2 border-purple-500/30 shadow-lg overflow-hidden relative">
              <div className="absolute top-2 left-1/2 -translate-x-1/2 w-16 h-1 bg-gray-700 rounded-full"></div>
              <div className="h-full bg-gradient-to-b from-[#0a0a0a] to-[#1a0a2e] p-2">
                <div className="text-white text-xs font-semibold mb-1">GodGPT</div>
                <div className="flex items-center gap-1 mb-2">
                  <div className="w-4 h-4 rounded-full bg-purple-500/20 flex items-center justify-center">
                    <span className="text-purple-400 text-[8px]">🧭</span>
                  </div>
                  <span className="text-gray-400 text-[8px]">320</span>
                </div>
                <p className="text-gray-300 text-[8px] leading-tight mb-1">
                  Start the ripple. Let meaning unfold.
                </p>
                <div className="flex items-center gap-1">
                  <span className="text-yellow-400 text-[8px]">⭐</span>
                  <span className="text-gray-400 text-[8px]">36</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Section: QR Code + Close Button */}
          <div className="flex items-center gap-4 flex-shrink-0">
            {/* QR Code Placeholder */}
            <div className="hidden sm:block w-16 h-16 rounded-lg bg-white p-1 relative">
              <div className="w-full h-full bg-white flex items-center justify-center">
                <div className="w-12 h-12 border-2 border-gray-900 relative">
                  {/* QR Code Pattern */}
                  <div className="absolute inset-0 grid grid-cols-3 grid-rows-3 gap-0.5">
                    {[...Array(9)].map((_, i) => (
                      <div
                        key={i}
                        className={`${i % 3 === 0 || i === 4 ? 'bg-gray-900' : 'bg-white'}`}
                      />
                    ))}
                  </div>
                  {/* Center Ψ Symbol */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-gray-900 font-bold text-xs">Ψ</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Close Button */}
            <button
              onClick={() => setIsDismissed(true)}
              className="w-8 h-8 rounded-full bg-gray-800/50 hover:bg-gray-700/50 flex items-center justify-center text-gray-400 hover:text-white transition-colors"
              aria-label="Dismiss banner"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile: Additional Marketing CTA */}
        <div className="md:hidden mt-3 pt-3 border-t border-purple-500/20">
          <a
            href="https://lildeebs.github.io/GodGPT-Marketing/2025-wrapped/"
            target="_blank"
            rel="noopener noreferrer"
            className="w-full block text-center px-4 py-3 rounded-xl bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold text-sm transition-all duration-200 active:opacity-80 active:scale-[0.98] hover:shadow-[0_0_30px_rgba(168,85,247,0.6)] shadow-[0_4px_15px_rgba(168,85,247,0.4)]"
          >
            ✨ Get your Lunar New Year Reading →
          </a>
        </div>
      </div>
    </div>
  );
}
