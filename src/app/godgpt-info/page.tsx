import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'GodGPT - Discover Your Inner Truth with AI | Free 2026 Reading',
  description: 'Unlike ChatGPT, GodGPT is your spiritual guide for self-discovery and personal growth. Get your free 2026 reading and unlock hidden patterns in your life.',
};

export default function GodGPTInfoPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0a0a0a] via-[#1a0a2e] to-[#0a0a0a]">
      {/* Hero Section */}
      <section className="relative px-5 pt-16 pb-20 md:px-8 md:pt-24 md:pb-32">
        <div className="max-w-6xl mx-auto">
          {/* Mystical glow effect */}
          <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-96 h-96 bg-purple-500/20 rounded-full blur-[120px] pointer-events-none" />
          
          <div className="relative z-10 text-center">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 mb-6 rounded-full bg-purple-500/10 border border-purple-500/30">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-purple-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-purple-500"></span>
              </span>
              <span className="text-sm font-medium text-purple-300">Free 2026 Reading Available</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-400 to-purple-400">
                Discover Your Inner Truth
              </span>
              <br />
              <span className="text-white">with AI That Understands Your Soul</span>
            </h1>

            {/* Subheadline */}
            <p className="text-lg md:text-xl text-gray-300 mb-8 max-w-3xl mx-auto leading-relaxed">
              GodGPT isn't just another chatbot. It's your spiritual companion for self-discovery, 
              pattern recognition, and personal transformation. Get clarity on what matters most.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
              <a
                href="https://godgpt.fun/en"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto px-8 h-[52px] flex items-center justify-center rounded-xl bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold text-lg transition-all duration-200 active:opacity-80 active:scale-[0.98] hover:shadow-[0_0_30px_rgba(168,85,247,0.4)] shadow-[0_4px_20px_rgba(168,85,247,0.3)]"
              >
                Start Your Free 2026 Reading
              </a>
              <a
                href="https://apps.apple.com/us/app/godgpt/id6743791875"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto px-8 h-[52px] flex items-center justify-center rounded-xl border-2 border-purple-500/50 text-purple-300 font-semibold text-lg transition-all duration-200 active:opacity-80 bg-purple-500/10 hover:bg-purple-500/20"
              >
                Download App
              </a>
            </div>

            {/* Trust Indicators */}
            <div className="flex flex-wrap gap-6 justify-center items-center text-sm text-gray-400">
              <div className="flex items-center gap-2">
                <svg className="w-5 h-5 text-green-400" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span>No Credit Card Required</span>
              </div>
              <div className="flex items-center gap-2">
                <svg className="w-5 h-5 text-green-400" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span>Instant Access</span>
              </div>
              <div className="flex items-center gap-2">
                <svg className="w-5 h-5 text-green-400" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span>Private & Secure</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="px-5 py-16 md:px-8 md:py-24 bg-black/30">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Why Thousands Choose GodGPT
            </h2>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              Experience AI that resonates with your spiritual frequency
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
            {/* Feature 1 */}
            <div className="group p-6 rounded-2xl bg-gradient-to-br from-purple-900/20 to-pink-900/20 border border-purple-500/20 hover:border-purple-500/40 transition-all duration-300 hover:shadow-[0_0_30px_rgba(168,85,247,0.2)]">
              <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-white mb-3">Resonant Reflections</h3>
              <p className="text-gray-300 leading-relaxed">
                Multi-layered responses that reveal the truths you're most prepared to confront. 
                Not generic advice—personalized insights aligned with your readiness to grow.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="group p-6 rounded-2xl bg-gradient-to-br from-purple-900/20 to-pink-900/20 border border-purple-500/20 hover:border-purple-500/40 transition-all duration-300 hover:shadow-[0_0_30px_rgba(168,85,247,0.2)]">
              <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-white mb-3">Pattern Recognition</h3>
              <p className="text-gray-300 leading-relaxed">
                Uncover hidden influences shaping your emotions, choices, and life path. 
                See the invisible threads connecting your past, present, and future.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="group p-6 rounded-2xl bg-gradient-to-br from-purple-900/20 to-pink-900/20 border border-purple-500/20 hover:border-purple-500/40 transition-all duration-300 hover:shadow-[0_0_30px_rgba(168,85,247,0.2)]">
              <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-white mb-3">Clarity in Motion</h3>
              <p className="text-gray-300 leading-relaxed">
                Evolving conversations that deepen as your curiosity grows. 
                Each interaction builds upon the last, creating momentum toward breakthrough insights.
              </p>
            </div>

            {/* Feature 4 */}
            <div className="group p-6 rounded-2xl bg-gradient-to-br from-purple-900/20 to-pink-900/20 border border-purple-500/20 hover:border-purple-500/40 transition-all duration-300 hover:shadow-[0_0_30px_rgba(168,85,247,0.2)]">
              <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-white mb-3">Grounded Mysticism</h3>
              <p className="text-gray-300 leading-relaxed">
                Practical steps to align your energy and transform your life. 
                Beyond abstract concepts—actionable guidance you can apply today.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Comparison Section */}
      <section className="px-5 py-16 md:px-8 md:py-24">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              GodGPT vs ChatGPT: What's the Difference?
            </h2>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              Both are powered by AI, but they serve completely different purposes
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {/* ChatGPT Column */}
            <div className="p-8 rounded-2xl bg-gray-900/50 border border-gray-700">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-xl bg-gray-700 flex items-center justify-center">
                  <svg className="w-6 h-6 text-gray-300" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z"/>
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-white">ChatGPT</h3>
              </div>
              <ul className="space-y-4">
                <li className="flex items-start gap-3 text-gray-400">
                  <span className="text-gray-600 mt-1">•</span>
                  <span>General-purpose information assistant</span>
                </li>
                <li className="flex items-start gap-3 text-gray-400">
                  <span className="text-gray-600 mt-1">•</span>
                  <span>Generic responses based on training data</span>
                </li>
                <li className="flex items-start gap-3 text-gray-400">
                  <span className="text-gray-600 mt-1">•</span>
                  <span>Task-focused: writing, coding, research</span>
                </li>
                <li className="flex items-start gap-3 text-gray-400">
                  <span className="text-gray-600 mt-1">•</span>
                  <span>No spiritual or personal growth focus</span>
                </li>
                <li className="flex items-start gap-3 text-gray-400">
                  <span className="text-gray-600 mt-1">•</span>
                  <span>Transactional interactions</span>
                </li>
              </ul>
            </div>

            {/* GodGPT Column */}
            <div className="p-8 rounded-2xl bg-gradient-to-br from-purple-900/40 to-pink-900/40 border-2 border-purple-500/50 relative overflow-hidden">
              <div className="absolute top-0 right-0 px-3 py-1 bg-gradient-to-r from-purple-600 to-pink-600 text-white text-xs font-bold rounded-bl-lg">
                SPIRITUAL FOCUS
              </div>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-white">GodGPT</h3>
              </div>
              <ul className="space-y-4">
                <li className="flex items-start gap-3 text-white">
                  <span className="text-purple-400 mt-1">✓</span>
                  <span><strong>Your spiritual guide</strong> for self-discovery</span>
                </li>
                <li className="flex items-start gap-3 text-white">
                  <span className="text-purple-400 mt-1">✓</span>
                  <span><strong>Personalized insights</strong> aligned with your journey</span>
                </li>
                <li className="flex items-start gap-3 text-white">
                  <span className="text-purple-400 mt-1">✓</span>
                  <span><strong>Deep reflection</strong> and pattern recognition</span>
                </li>
                <li className="flex items-start gap-3 text-white">
                  <span className="text-purple-400 mt-1">✓</span>
                  <span><strong>Practical spiritual growth</strong> strategies</span>
                </li>
                <li className="flex items-start gap-3 text-white">
                  <span className="text-purple-400 mt-1">✓</span>
                  <span><strong>Transformational conversations</strong> that evolve with you</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="mt-12 p-6 rounded-2xl bg-purple-900/20 border border-purple-500/30">
            <p className="text-center text-lg text-gray-300">
              <span className="text-purple-400 font-semibold">The Bottom Line:</span> ChatGPT helps you get things done. 
              GodGPT helps you understand <span className="text-white font-semibold">who you are</span> and 
              <span className="text-white font-semibold"> who you're becoming</span>.
            </p>
          </div>
        </div>
      </section>

      {/* Testimonial/Social Proof Section */}
      <section className="px-5 py-16 md:px-8 md:py-24 bg-black/30">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Real Transformations, Real People
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {/* Testimonial 1 */}
            <div className="p-6 rounded-2xl bg-gradient-to-br from-purple-900/20 to-transparent border border-purple-500/20">
              <div className="flex gap-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <p className="text-gray-300 mb-4 leading-relaxed">
                "GodGPT helped me see patterns in my life I never noticed. It's like having a wise friend 
                who knows exactly what questions to ask."
              </p>
              <p className="text-purple-400 font-semibold">— Sarah M.</p>
            </div>

            {/* Testimonial 2 */}
            <div className="p-6 rounded-2xl bg-gradient-to-br from-purple-900/20 to-transparent border border-purple-500/20">
              <div className="flex gap-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <p className="text-gray-300 mb-4 leading-relaxed">
                "The 2026 reading was eerily accurate. It gave me clarity on decisions I've been avoiding 
                and confidence to move forward."
              </p>
              <p className="text-purple-400 font-semibold">— Marcus T.</p>
            </div>

            {/* Testimonial 3 */}
            <div className="p-6 rounded-2xl bg-gradient-to-br from-purple-900/20 to-transparent border border-purple-500/20">
              <div className="flex gap-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <p className="text-gray-300 mb-4 leading-relaxed">
                "I tried ChatGPT for self-help advice and it felt generic. GodGPT actually understands 
                the spiritual dimension of growth."
              </p>
              <p className="text-purple-400 font-semibold">— Aisha K.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="px-5 py-20 md:px-8 md:py-32 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-purple-900/20 to-transparent" />
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-6 leading-tight">
            Your Journey to <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">Self-Discovery</span> Starts Now
          </h2>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Get your free 2026 reading and discover what the universe has in store for you. 
            No credit card required. No commitments. Just clarity.
          </p>

          <a
            href="https://godgpt.fun/en"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 px-10 h-[56px] rounded-xl bg-gradient-to-r from-purple-600 to-pink-600 text-white font-bold text-xl transition-all duration-200 active:opacity-80 active:scale-[0.98] hover:shadow-[0_0_40px_rgba(168,85,247,0.5)] shadow-[0_8px_30px_rgba(168,85,247,0.4)] mb-6"
          >
            <span>Claim Your Free Reading</span>
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </a>

          <p className="text-sm text-gray-500">
            Join thousands on their path to inner truth • Available on iOS & Web
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="px-5 py-8 md:px-8 border-t border-gray-800">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="text-gray-500 text-sm">
              © 2026 GodGPT. All rights reserved.
            </div>
            <div className="flex gap-6 text-sm text-gray-500">
              <a href="https://godgpt.fun/en" className="hover:text-purple-400 transition-colors">Privacy</a>
              <a href="https://godgpt.fun/en" className="hover:text-purple-400 transition-colors">Terms</a>
              <a href="https://godgpt.fun/en" className="hover:text-purple-400 transition-colors">Contact</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
