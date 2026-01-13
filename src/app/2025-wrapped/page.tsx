import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: '2025 Wrapped - Lunar New Year Reading | GodGPT',
  description: 'Get your personalized Lunar New Year reading based on your 2025 wrap. Discover your January theme and 2026 roadmap.',
};

export default function Wrapped2025Page() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0a0a0a] via-[#1a0a2e] to-[#0a0a0a] text-white">
      <div className="max-w-4xl mx-auto px-4 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
            2025 Wrapped Campaign
          </h1>
          <p className="text-xl text-gray-300">
            Lunar New Year Reading Integration
          </p>
        </div>

        {/* Quick Links */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          <Link
            href="/2025-wrapped/mobile"
            className="p-6 rounded-2xl bg-gradient-to-br from-purple-900/40 to-pink-900/40 border border-purple-500/30 hover:border-purple-500/50 transition-all group"
          >
            <div className="flex items-center gap-3 mb-3">
              <span className="text-2xl">📱</span>
              <h2 className="text-xl font-bold">Mobile App Mockup</h2>
            </div>
            <p className="text-gray-300 text-sm mb-4">
              Interactive mobile interface with scrollable cards and integrated form
            </p>
            <span className="text-purple-400 group-hover:text-purple-300 text-sm font-semibold">
              View Mockup →
            </span>
          </Link>

          <Link
            href="/2025-wrapped/desktop"
            className="p-6 rounded-2xl bg-gradient-to-br from-purple-900/40 to-pink-900/40 border border-purple-500/30 hover:border-purple-500/50 transition-all group"
          >
            <div className="flex items-center gap-3 mb-3">
              <span className="text-2xl">💻</span>
              <h2 className="text-xl font-bold">Desktop Mockup</h2>
            </div>
            <p className="text-gray-300 text-sm mb-4">
              Desktop version with banner at bottom and integrated form
            </p>
            <span className="text-purple-400 group-hover:text-purple-300 text-sm font-semibold">
              View Mockup →
            </span>
          </Link>
        </div>

        {/* Documentation Links */}
        <div className="bg-gray-900/50 rounded-2xl p-6 border border-gray-800">
          <h2 className="text-2xl font-bold mb-4">Documentation</h2>
          <div className="space-y-3">
            <div>
              <h3 className="font-semibold text-purple-400 mb-1">Integration Guide</h3>
              <p className="text-sm text-gray-400">
                Step-by-step guide for integrating the Lunar New Year reading form into your chatbot interface
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-purple-400 mb-1">Component Documentation</h3>
              <p className="text-sm text-gray-400">
                React components: LunarNewYearBanner, ChatbotJanuaryForm, and integration examples
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-purple-400 mb-1">Campaign Overview</h3>
              <p className="text-sm text-gray-400">
                Full campaign details, timeline, and strategy documentation
              </p>
            </div>
          </div>
        </div>

        {/* Direct HTML File Links */}
        <div className="mt-8 bg-gray-900/30 rounded-2xl p-6 border border-gray-800">
          <h2 className="text-xl font-bold mb-4">Direct HTML Files</h2>
          <div className="space-y-2 text-sm">
            <a
              href="/2025-wrapped/godgpt-mobile-with-form.html"
              target="_blank"
              rel="noopener noreferrer"
              className="block text-purple-400 hover:text-purple-300"
            >
              📱 godgpt-mobile-with-form.html
            </a>
            <a
              href="/2025-wrapped/godgpt-banner-screenshot-ready.html"
              target="_blank"
              rel="noopener noreferrer"
              className="block text-purple-400 hover:text-purple-300"
            >
              💻 godgpt-banner-screenshot-ready.html
            </a>
            <a
              href="/2025-wrapped/godgpt-app-with-banner.html"
              target="_blank"
              rel="noopener noreferrer"
              className="block text-purple-400 hover:text-purple-300"
            >
              🎨 godgpt-app-with-banner.html
            </a>
            <a
              href="/2025-wrapped/download-banner-mockup.html"
              target="_blank"
              rel="noopener noreferrer"
              className="block text-purple-400 hover:text-purple-300"
            >
              📄 download-banner-mockup.html
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
