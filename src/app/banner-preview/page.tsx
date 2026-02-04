import DownloadBanner from '../../components/DownloadBanner';

export default function BannerPreviewPage() {
  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white flex flex-col">
      {/* Header */}
      <header className="flex items-center justify-between p-4 border-b border-gray-800">
        <h1 className="text-xl font-bold">GodGPT</h1>
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-purple-500/20 flex items-center justify-center border border-purple-500/30">
            <span className="text-purple-400 text-sm">🧭</span>
            <span className="text-white text-xs ml-1">70</span>
          </div>
          <div className="w-10 h-10 rounded-full bg-gray-800 border border-gray-700"></div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col items-center justify-center px-4 py-12 relative">
        {/* Badge */}
        <div className="mb-6 px-4 py-2 rounded-full bg-gradient-to-r from-purple-500/20 to-pink-500/20 border border-purple-500/30 flex items-center gap-2">
          <span className="text-yellow-400">⭐</span>
          <span className="text-sm font-semibold">10</span>
        </div>

        {/* Main Prompt */}
        <h2 className="text-3xl md:text-4xl font-bold mb-8 text-center">What can I help with?</h2>

        {/* Input Field */}
        <div className="w-full max-w-2xl mb-8">
          <div className="rounded-2xl bg-gray-900/50 border border-gray-700 p-4 flex items-center gap-3">
            <button className="w-8 h-8 rounded-lg bg-gray-800 flex items-center justify-center text-gray-400 hover:text-white transition-colors">
              <span className="text-xl">+</span>
            </button>
            <input 
              type="text" 
              placeholder="Ask anything" 
              className="flex-1 bg-transparent text-white placeholder-gray-500 outline-none"
            />
            <button className="w-8 h-8 rounded-lg bg-gray-800 flex items-center justify-center text-gray-400 hover:text-white transition-colors">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 14.5v-9l6 4.5-6 4.5z"/>
              </svg>
            </button>
          </div>
        </div>

        {/* Suggested Actions */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full max-w-4xl">
          <button className="p-4 rounded-xl bg-gray-900/50 border border-gray-700 hover:border-purple-500/50 transition-all text-left">
            <div className="font-semibold mb-1">Review My 2025 Ψ Structure</div>
          </button>
          <button className="p-4 rounded-xl bg-gray-900/50 border border-gray-700 hover:border-purple-500/50 transition-all text-left">
            <div className="font-semibold mb-1">Design My 2026 Persona Structure</div>
          </button>
          <button className="p-4 rounded-xl bg-gray-900/50 border border-purple-500/50 hover:border-purple-500 transition-all text-left relative overflow-hidden">
            <div className="absolute top-2 right-2 px-2 py-1 rounded-full bg-red-500 text-white text-xs font-bold">Hot</div>
            <div className="font-semibold mb-1">Unlock Your Path</div>
            <div className="text-sm text-gray-400">Tap to begin</div>
          </button>
          <button className="p-4 rounded-xl bg-gray-900/50 border border-gray-700 hover:border-purple-500/50 transition-all text-left">
            <div className="font-semibold mb-1">Feeling Lost? Talk it through</div>
          </button>
        </div>
      </main>

      {/* Download Banner - THE FOCUS */}
      <DownloadBanner />

      {/* Spacer for banner */}
      <div className="h-32"></div>
    </div>
  );
}
