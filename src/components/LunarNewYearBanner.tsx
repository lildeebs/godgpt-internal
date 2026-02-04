'use client';

import React, { useState } from 'react';

interface LunarNewYearBannerProps {
  onGetReading?: () => void;
  onDismiss?: () => void;
  compact?: boolean;
}

export default function LunarNewYearBanner({ 
  onGetReading, 
  onDismiss,
  compact = false 
}: LunarNewYearBannerProps) {
  const [isDismissed, setIsDismissed] = useState(false);

  const handleDismiss = () => {
    setIsDismissed(true);
    if (onDismiss) {
      onDismiss();
    }
  };

  const handleGetReading = () => {
    if (onGetReading) {
      onGetReading();
    }
  };

  if (isDismissed) return null;

  if (compact) {
    // Compact version for chat interface
    return (
      <div className="bg-gradient-to-r from-[#1a0a2e] via-[#2d1b4e] to-[#1a0a2e] border border-purple-500/30 rounded-2xl shadow-[0_4px_20px_rgba(168,85,247,0.3)] p-4 mb-4">
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-3 flex-shrink-0">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center">
              <span className="text-white font-bold text-sm">Ψ</span>
            </div>
            <div className="flex flex-col">
              <span className="text-white font-semibold text-xs">Get your Lunar New Year Reading</span>
              <span className="text-gray-400 text-[10px]">Personalized January theme</span>
            </div>
          </div>

          <button
            onClick={handleGetReading}
            className="px-4 py-2 rounded-xl bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold text-sm transition-all duration-200 hover:shadow-[0_0_20px_rgba(168,85,247,0.6)] shadow-[0_2px_10px_rgba(168,85,247,0.4)] flex items-center gap-2 hover:scale-105"
          >
            <span className="text-xs">✨</span>
            <span>Get Started</span>
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </button>

          <button
            onClick={handleDismiss}
            className="w-7 h-7 rounded-full bg-gray-800/50 hover:bg-gray-700/50 flex items-center justify-center text-gray-400 hover:text-white transition-colors flex-shrink-0"
            aria-label="Dismiss banner"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      </div>
    );
  }

  // Full banner version
  return (
    <div className="bg-gradient-to-r from-[#1a0a2e] via-[#2d1b4e] to-[#1a0a2e] border border-purple-500/30 rounded-2xl shadow-[0_4px_20px_rgba(168,85,247,0.3)] p-4 mb-4">
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-3 flex-1">
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center">
            <span className="text-white font-bold text-lg">Ψ</span>
          </div>
          <div className="flex flex-col">
            <span className="text-white font-bold text-lg">Get your Lunar New Year Reading</span>
            <span className="text-gray-400 text-sm">Personalized January theme based on your 2025 wrap</span>
          </div>
        </div>

        <button
          onClick={handleGetReading}
          className="px-6 py-3 rounded-xl bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold text-base transition-all duration-200 hover:shadow-[0_0_30px_rgba(168,85,247,0.6)] shadow-[0_4px_15px_rgba(168,85,247,0.4)] flex items-center gap-2 hover:scale-105"
        >
          <span className="text-sm">✨</span>
          <span>Get Started</span>
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
          </svg>
        </button>

        <button
          onClick={handleDismiss}
          className="w-8 h-8 rounded-full bg-gray-800/50 hover:bg-gray-700/50 flex items-center justify-center text-gray-400 hover:text-white transition-colors flex-shrink-0"
          aria-label="Dismiss banner"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
    </div>
  );
}
