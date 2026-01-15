'use client';

import { useEffect, useState } from 'react';

// Helper to get correct image path with basePath support
const getImagePath = (imageName: string) => {
  // URL encode spaces in filename
  const encodedName = imageName.replace(/ /g, '%20');
  
  if (typeof window === 'undefined') {
    // Server-side: use basePath from Next.js config
    return `/GodGPT-Marketing/influencer-brief/${encodedName}`;
  }
  
  // Client-side: detect basePath from current URL
  const pathname = window.location.pathname;
  const basePath = pathname.startsWith('/GodGPT-Marketing') ? '/GodGPT-Marketing' : '';
  return `${basePath}/influencer-brief/${encodedName}`;
};

export default function InfluencerBriefPage() {
  const [currentSlide, setCurrentSlide] = useState(1);
  const totalSlides = 6;
  const [thumbnails, setThumbnails] = useState<Record<string, string>>({});

  // Fetch video thumbnails using platform APIs
  useEffect(() => {
    const fetchThumbnails = async () => {
      const videoUrls = [
        'https://www.tiktok.com/@godgpt_/video/7584702619336051980',
        'https://www.tiktok.com/@godgpt_/video/7582135504154397970',
        'https://www.facebook.com/reel/1638065824272188'
      ];

      const thumbnailPromises = videoUrls.map(async (url) => {
        try {
          if (url.includes('tiktok.com')) {
            // TikTok oEmbed API - works without CORS issues
            const oembedUrl = `https://www.tiktok.com/oembed?url=${encodeURIComponent(url)}`;
            const response = await fetch(oembedUrl);
            if (response.ok) {
              const data = await response.json();
              return { url, thumbnail: data.thumbnail_url || '' };
            }
          } else if (url.includes('facebook.com')) {
            // Facebook - use public oEmbed endpoint
            try {
              // Try Facebook's public oEmbed endpoint first
              const oembedUrl = `https://www.facebook.com/plugins/video/oembed.json/?url=${encodeURIComponent(url)}`;
              const proxyUrl = `https://api.allorigins.win/get?url=${encodeURIComponent(oembedUrl)}`;
              
              const response = await fetch(proxyUrl);
              if (response.ok) {
                const proxyData = await response.json();
                const data = JSON.parse(proxyData.contents);
                if (data.thumbnail_url) {
                  return { url, thumbnail: data.thumbnail_url };
                }
              }
            } catch (e) {
              console.log('Facebook oEmbed failed, trying fallback:', e);
            }
            
            // Fallback: extract video ID and use Graph API pattern
            const videoId = url.match(/reel\/(\d+)/)?.[1];
            if (videoId) {
              // Try Graph API pattern (may require authentication, but worth trying)
              return { url, thumbnail: `https://graph.facebook.com/${videoId}/picture?type=large` };
            }
          }
        } catch (error) {
          console.log(`Failed to fetch thumbnail for ${url}:`, error);
        }
        return { url, thumbnail: '' };
      });

      const results = await Promise.all(thumbnailPromises);
      const thumbnailMap: Record<string, string> = {};
      results.forEach(({ url, thumbnail }) => {
        if (thumbnail) {
          thumbnailMap[url] = thumbnail;
        }
      });
      setThumbnails(thumbnailMap);
    };

    fetchThumbnails();
  }, []);

  useEffect(() => {
    // Initialize stars
    const starsContainer = document.getElementById('stars');
    if (starsContainer) {
      for (let i = 0; i < 50; i++) {
        const star = document.createElement('div');
        star.className = 'star';
        star.style.left = Math.random() * 100 + '%';
        star.style.top = Math.random() * 100 + '%';
        star.style.animationDelay = Math.random() * 3 + 's';
        star.style.animationDuration = (Math.random() * 2 + 2) + 's';
        starsContainer.appendChild(star);
      }
    }

    // Keyboard navigation
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') changeSlide(-1);
      if (e.key === 'ArrowRight') changeSlide(1);
    };

    // Touch/swipe support
    let touchStartX = 0;
    let touchEndX = 0;

    const handleTouchStart = (e: TouchEvent) => {
      touchStartX = e.changedTouches[0].screenX;
    };

    const handleTouchEnd = (e: TouchEvent) => {
      touchEndX = e.changedTouches[0].screenX;
      if (touchEndX < touchStartX - 50) changeSlide(1);
      if (touchEndX > touchStartX + 50) changeSlide(-1);
    };

    document.addEventListener('keydown', handleKeyDown);
    document.addEventListener('touchstart', handleTouchStart);
    document.addEventListener('touchend', handleTouchEnd);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('touchstart', handleTouchStart);
      document.removeEventListener('touchend', handleTouchEnd);
    };
  }, []);

  const changeSlide = (direction: number) => {
    setCurrentSlide((prev) => {
      const newSlide = prev + direction;
      if (newSlide > totalSlides) return 1;
      if (newSlide < 1) return totalSlides;
      return newSlide;
    });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const goToSlide = (n: number) => {
    setCurrentSlide(n);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="influencer-brief-container">
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap');
        
        * {
          font-family: 'Inter', sans-serif;
        }
        
        body {
          overflow-x: hidden;
        }
        
        .influencer-brief-container {
          min-height: 100vh;
          background: linear-gradient(to bottom, #0a0a0a 0%, #1a0a2e 50%, #0a0a0a 100%);
          position: relative;
          color: white;
        }
        
        .gradient-overlay {
          position: fixed;
          inset: 0;
          z-index: -1;
          background: radial-gradient(circle at 20% 50%, rgba(168, 85, 247, 0.15) 0%, transparent 50%),
                      radial-gradient(circle at 80% 50%, rgba(236, 72, 153, 0.15) 0%, transparent 50%);
          pointer-events: none;
        }
        
        .grid-pattern {
          position: fixed;
          inset: 0;
          z-index: -1;
          pointer-events: none;
          opacity: 0.03;
          background-image: 
            linear-gradient(rgba(168, 85, 247, 0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(168, 85, 247, 0.1) 1px, transparent 1px);
          background-size: 50px 50px;
        }
        
        .floating-orbs {
          position: fixed;
          inset: 0;
          z-index: -1;
          pointer-events: none;
        }
        
        .orb {
          position: absolute;
          border-radius: 50%;
          filter: blur(100px);
          animation: pulse 4s ease-in-out infinite;
        }
        
        .orb-1 {
          top: 20%;
          left: 10%;
          width: 288px;
          height: 288px;
          background: rgba(168, 85, 247, 0.1);
          animation-duration: 4s;
        }
        
        .orb-2 {
          top: 40%;
          right: 20%;
          width: 384px;
          height: 384px;
          background: rgba(236, 72, 153, 0.1);
          animation-duration: 6s;
          animation-delay: 1s;
        }
        
        .orb-3 {
          bottom: 20%;
          left: 25%;
          width: 320px;
          height: 320px;
          background: rgba(59, 130, 246, 0.1);
          animation-duration: 5s;
          animation-delay: 2s;
        }
        
        @keyframes pulse {
          0%, 100% { opacity: 0.5; }
          50% { opacity: 0.8; }
        }
        
        .stars {
          position: fixed;
          inset: 0;
          z-index: -1;
          pointer-events: none;
        }
        
        .star {
          position: absolute;
          width: 2px;
          height: 2px;
          background: white;
          border-radius: 50%;
          animation: twinkle 3s infinite;
        }
        
        @keyframes twinkle {
          0%, 100% { opacity: 0.3; }
          50% { opacity: 1; }
        }
        
        .slide {
          min-height: 100vh;
          display: none;
          padding: 2rem;
          padding-bottom: 5rem;
          position: relative;
          overflow-y: auto;
        }
        
        .slide.active {
          display: flex;
          flex-direction: column;
        }
        
        .slide-container {
          max-width: 1200px;
          margin: 0 auto;
          width: 100%;
          flex: 1;
          display: flex;
          flex-direction: column;
          justify-content: center;
        }
        
        .content-card {
          background: rgba(26, 26, 26, 0.4);
          backdrop-filter: blur(20px);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 1rem;
          padding: 2rem;
          margin-bottom: 1.5rem;
          box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
          transition: all 0.3s ease;
        }
        
        .content-card:hover {
          border-color: rgba(168, 85, 247, 0.3);
          box-shadow: 0 8px 32px rgba(168, 85, 247, 0.2);
        }
        
        .pillar-card {
          background: rgba(168, 85, 247, 0.1);
          border: 1px solid rgba(168, 85, 247, 0.3);
        }
        
        .do-card {
          background: rgba(168, 85, 247, 0.1);
          border: 1px solid rgba(168, 85, 247, 0.3);
        }
        
        .dont-card {
          background: rgba(236, 72, 153, 0.1);
          border: 1px solid rgba(236, 72, 153, 0.3);
        }
        
        .visual-placeholder {
          width: 100%;
          height: 100%;
          background: linear-gradient(135deg, rgba(168, 85, 247, 0.15) 0%, rgba(236, 72, 153, 0.15) 50%, rgba(59, 130, 246, 0.15) 100%);
          border-radius: 0.75rem;
          display: flex;
          align-items: center;
          justify-content: center;
          position: relative;
          overflow: hidden;
          border: 1px solid rgba(255, 255, 255, 0.1);
          background-size: cover;
          background-position: center;
        }
        
        .visual-placeholder img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
        
        .visual-overlay {
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          padding: 1.5rem;
          background: linear-gradient(to top, rgba(0, 0, 0, 0.85) 0%, rgba(0, 0, 0, 0.4) 50%, transparent 100%);
          border-radius: 0 0 0.75rem 0.75rem;
        }
        
        .video-hover-info {
          position: absolute;
          inset: 0;
          background: rgba(0, 0, 0, 0.9);
          backdrop-filter: blur(10px);
          padding: 1.5rem;
          display: flex;
          flex-direction: column;
          justify-content: center;
          opacity: 0;
          transition: opacity 0.3s ease;
          border-radius: 0.75rem;
          z-index: 20;
        }
        
        .group:hover .video-hover-info {
          opacity: 1;
        }
        
        .video-hover-info h4 {
          font-size: 1rem;
          font-weight: 700;
          color: #c084fc;
          margin-bottom: 0.75rem;
        }
        
        .video-hover-info ul {
          list-style: none;
          padding: 0;
          margin: 0;
        }
        
        .video-hover-info li {
          font-size: 0.875rem;
          color: #e5e7eb;
          margin-bottom: 0.5rem;
          padding-left: 1rem;
          position: relative;
        }
        
        .video-hover-info li:before {
          content: "•";
          position: absolute;
          left: 0;
          color: #c084fc;
        }
        
        .nav-dots {
          position: fixed;
          right: 2rem;
          top: 50%;
          transform: translateY(-50%);
          z-index: 100;
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }
        
        .nav-dot {
          width: 12px;
          height: 12px;
          border-radius: 50%;
          background: rgba(255, 255, 255, 0.3);
          border: 2px solid rgba(255, 255, 255, 0.5);
          cursor: pointer;
          transition: all 0.3s ease;
        }
        
        .nav-dot.active {
          background: rgba(168, 85, 247, 1);
          border-color: rgba(168, 85, 247, 1);
          transform: scale(1.3);
        }
        
        .nav-buttons {
          position: fixed;
          bottom: 1rem;
          left: 50%;
          transform: translateX(-50%);
          display: flex;
          gap: 0.5rem;
          z-index: 100;
          opacity: 0.7;
          transition: opacity 0.3s ease;
        }
        
        .nav-buttons:hover {
          opacity: 1;
        }
        
        .nav-btn {
          padding: 0.5rem 1.25rem;
          background: rgba(168, 85, 247, 0.6);
          backdrop-filter: blur(10px);
          border: 1px solid rgba(168, 85, 247, 0.4);
          border-radius: 0.5rem;
          color: white;
          font-weight: 500;
          font-size: 0.875rem;
          cursor: pointer;
          transition: all 0.3s ease;
        }
        
        .nav-btn:hover {
          background: rgba(168, 85, 247, 0.9);
          transform: translateY(-2px);
        }
        
        .nav-btn:disabled {
          opacity: 0.2;
          cursor: not-allowed;
        }
        
        .slide-counter {
          position: fixed;
          top: 2rem;
          right: 2rem;
          z-index: 100;
          color: rgba(255, 255, 255, 0.7);
          font-size: 0.875rem;
          font-weight: 500;
        }
        
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .slide {
          animation: fadeIn 0.5s ease-in-out;
        }
        
        @keyframes gradient-shift {
          0%, 100% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
        }
        
        .animate-gradient-text {
          background-size: 200% auto;
          animation: gradient-shift 3s ease infinite;
        }
        
        @media (max-width: 768px) {
          .nav-dots {
            display: none;
          }
          
          .nav-buttons {
            bottom: 0.5rem;
            flex-direction: row;
            width: auto;
            gap: 0.25rem;
          }
          
          .nav-btn {
            width: auto;
            padding: 0.4rem 1rem;
            font-size: 0.75rem;
          }
          
          .slide {
            padding-bottom: 4rem;
          }
        }
      `}</style>

      {/* Background Elements */}
      <div className="gradient-overlay"></div>
      <div className="grid-pattern"></div>
      <div className="floating-orbs">
        <div className="orb orb-1"></div>
        <div className="orb orb-2"></div>
        <div className="orb orb-3"></div>
      </div>
      <div className="stars" id="stars"></div>
      
      {/* Slide Counter */}
      <div className="slide-counter">
        <span>{currentSlide}</span> / <span>{totalSlides}</span>
      </div>
      
      {/* Navigation Dots */}
      <div className="nav-dots">
        {Array.from({ length: totalSlides }).map((_, i) => (
          <div
            key={i + 1}
            className={`nav-dot ${currentSlide === i + 1 ? 'active' : ''}`}
            onClick={() => goToSlide(i + 1)}
          />
        ))}
      </div>
      
      {/* Slide 1: Welcome/Intro */}
      <div className={`slide ${currentSlide === 1 ? 'active' : ''}`}>
        <div className="slide-container">
          <div className="grid md:grid-cols-2 gap-8 items-center max-w-6xl mx-auto">
            <div className="flex justify-center md:justify-start">
              <img 
                src={getImagePath('SM_Phone_1080 x 1920_2.png')}
                alt="GodGPT Phone" 
                className="max-w-full h-auto rounded-lg shadow-2xl" 
                style={{ maxHeight: '75vh', maxWidth: '450px' }}
              />
            </div>
            <div className="text-center md:text-left">
              <div className="mb-8">
                <div className="text-6xl md:text-7xl mb-4">Ψ</div>
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 bg-gradient-to-r from-purple-300 via-pink-300 to-purple-300 bg-clip-text text-transparent drop-shadow-[0_0_30px_rgba(168,85,247,0.8)]">
                  GodGPT
                </h1>
                <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-8 text-white drop-shadow-[0_0_20px_rgba(255,255,255,0.3)]">
                  Creator Content Brief
                </h2>
              </div>
              <p className="text-xs text-gray-500 opacity-50">Jan 2026</p>
            </div>
          </div>
        </div>
      </div>
      
      {/* Slide 2: What is GodGPT + You've Been Handpicked */}
      <div className={`slide ${currentSlide === 2 ? 'active' : ''}`}>
        <div className="slide-container">
          <div className="grid md:grid-cols-2 gap-8 items-center max-w-6xl mx-auto mb-8">
            <div className="flex justify-center md:justify-start items-start">
              <div className="aspect-square w-full max-w-md overflow-hidden rounded-xl shadow-2xl" style={{ height: 'fit-content' }}>
                <img 
                  src={getImagePath('SM_Ethereal_1080 x 1920_5.png')}
                  alt="Beyond Your Belief" 
                  className="w-full h-full object-cover" 
                  style={{ objectPosition: 'center 70%' }}
                />
              </div>
            </div>
            <div className="space-y-8">
              <div>
                <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-purple-300 via-pink-300 to-purple-300 bg-clip-text text-transparent drop-shadow-[0_0_30px_rgba(168,85,247,0.8)]">
                  What is GodGPT?
                </h1>
                <p className="text-lg md:text-xl text-gray-300 leading-relaxed">
                  GodGPT is a spiritual wellness app that helps you reflect deeply and uncover inner truth.
                </p>
              </div>
              <div className="content-card bg-gradient-to-r from-purple-500/20 to-pink-500/20 border-purple-500/40">
                <div className="text-center">
                  <div className="text-4xl mb-4">✨</div>
                  <h2 className="text-3xl md:text-4xl font-bold mb-4 text-purple-300">You've Been Handpicked</h2>
                  <p className="text-lg text-gray-300 leading-relaxed">
                    You're not just another creator to us. You've been carefully selected because your unique voice, authentic content, and connection with your audience align perfectly with GodGPT's mission. We believe in your ability to inspire others on their spiritual journey.
                  </p>
                </div>
              </div>
            </div>
          </div>
          <p className="text-xs text-gray-500 opacity-30 text-center mt-8">
            For further enquiries, kindly contact <a href="mailto:dionne.ng@aelf.io" className="hover:text-purple-300 transition-colors">dionne.ng@aelf.io</a>
          </p>
        </div>
      </div>
      
      {/* Slide 3: Content Strategy */}
      <div className={`slide ${currentSlide === 3 ? 'active' : ''}`}>
        <div className="slide-container">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-center text-white">
            Content Strategy
          </h2>
          
          <div className="grid md:grid-cols-2 gap-4 mb-8">
            <div className="content-card pillar-card">
              <h3 className="text-xl font-bold mb-3 text-purple-300">Possible Content Pillars</h3>
              <ul className="space-y-2 text-sm text-gray-300">
                <li>• <strong>Personal Stories</strong> - Dating life, struggles, awakening</li>
                <li>• <strong>Reviews</strong> - Share experiences and feedback</li>
                <li>• <strong>How To Use</strong> - Tutorials, user journey, app functions</li>
              </ul>
            </div>
            
            <div className="content-card bg-purple-500/10">
              <h3 className="text-xl font-bold mb-3 text-purple-300">What Makes Content Successful</h3>
              <div className="space-y-3 text-sm">
                <div>
                  <p className="font-semibold text-white mb-1">🎣 Strong Hook</p>
                  <p className="text-gray-300 text-xs">First 3 seconds capture attention</p>
                </div>
                <div>
                  <p className="font-semibold text-white mb-1">🖼️ Click-Baity Thumbnail</p>
                  <p className="text-gray-300 text-xs">High contrast, bold text overlay</p>
                </div>
              </div>
            </div>
          </div>
          
          <h3 className="text-3xl md:text-4xl font-bold mb-6 text-center text-purple-300">Top Performing Content</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <a href="https://www.tiktok.com/@godgpt_/video/7584702619336051980" target="_blank" rel="noopener noreferrer" className="visual-placeholder aspect-[9/16] rounded-xl relative group cursor-pointer overflow-hidden" style={{ backgroundImage: thumbnails['https://www.tiktok.com/@godgpt_/video/7584702619336051980'] ? `url(${thumbnails['https://www.tiktok.com/@godgpt_/video/7584702619336051980']})` : 'linear-gradient(135deg, rgba(168, 85, 247, 0.15) 0%, rgba(236, 72, 153, 0.15) 50%, rgba(59, 130, 246, 0.15) 100%)', backgroundSize: 'cover', backgroundPosition: 'center' }}>
              <div className="absolute inset-0 bg-gradient-to-br from-purple-900/30 to-pink-900/30 group-hover:from-purple-900/10 group-hover:to-pink-900/10 transition-all" />
              <div className="absolute inset-0 flex items-center justify-center z-10 opacity-50 group-hover:opacity-0 transition-opacity pointer-events-none">
                <div className="text-3xl mb-2">▶</div>
              </div>
              <div className="visual-overlay group-hover:opacity-0 transition-opacity">
                <p className="text-xs text-white font-semibold">Top Performer #1</p>
              </div>
              <div className="video-hover-info">
                <h4>Why It Performed</h4>
                <ul>
                  <li>Strong hook in first 3 seconds</li>
                  <li>High engagement rate</li>
                  <li>Click-bait thumbnail</li>
                  <li>High completion rate</li>
                </ul>
              </div>
            </a>
            <a href="https://www.tiktok.com/@godgpt_/video/7582135504154397970" target="_blank" rel="noopener noreferrer" className="visual-placeholder aspect-[9/16] rounded-xl relative group cursor-pointer overflow-hidden" style={{ backgroundImage: thumbnails['https://www.tiktok.com/@godgpt_/video/7582135504154397970'] ? `url(${thumbnails['https://www.tiktok.com/@godgpt_/video/7582135504154397970']})` : 'linear-gradient(135deg, rgba(168, 85, 247, 0.15) 0%, rgba(236, 72, 153, 0.15) 50%, rgba(59, 130, 246, 0.15) 100%)', backgroundSize: 'cover', backgroundPosition: 'center' }}>
              <div className="absolute inset-0 bg-gradient-to-br from-purple-900/30 to-pink-900/30 group-hover:from-purple-900/10 group-hover:to-pink-900/10 transition-all" />
              <div className="absolute inset-0 flex items-center justify-center z-10 opacity-50 group-hover:opacity-0 transition-opacity pointer-events-none">
                <div className="text-3xl mb-2">▶</div>
              </div>
              <div className="visual-overlay group-hover:opacity-0 transition-opacity">
                <p className="text-xs text-white font-semibold">Top Performer #2</p>
              </div>
              <div className="video-hover-info">
                <h4>Why It Performed</h4>
                <ul>
                  <li>Effective hook strategy</li>
                  <li>High share rate</li>
                  <li>Relatable content</li>
                  <li>Strong watch time</li>
                </ul>
              </div>
            </a>
            <a href="https://www.facebook.com/reel/1638065824272188" target="_blank" rel="noopener noreferrer" className="visual-placeholder aspect-[9/16] rounded-xl relative group cursor-pointer overflow-hidden" style={{ backgroundImage: thumbnails['https://www.facebook.com/reel/1638065824272188'] ? `url(${thumbnails['https://www.facebook.com/reel/1638065824272188']})` : 'linear-gradient(135deg, rgba(168, 85, 247, 0.15) 0%, rgba(236, 72, 153, 0.15) 50%, rgba(59, 130, 246, 0.15) 100%)', backgroundSize: 'cover', backgroundPosition: 'center' }}>
              <div className="absolute inset-0 bg-gradient-to-br from-purple-900/30 to-pink-900/30 group-hover:from-purple-900/10 group-hover:to-pink-900/10 transition-all" />
              <div className="absolute inset-0 flex items-center justify-center z-10 opacity-50 group-hover:opacity-0 transition-opacity pointer-events-none">
                <div className="text-3xl mb-2">▶</div>
              </div>
              <div className="visual-overlay group-hover:opacity-0 transition-opacity">
                <p className="text-xs text-white font-semibold">Top Performer #3</p>
              </div>
              <div className="video-hover-info">
                <h4>Why It Performed</h4>
                <ul>
                  <li>Cross-platform success</li>
                  <li>High engagement</li>
                  <li>Platform optimization</li>
                  <li>Strong performance metrics</li>
                </ul>
              </div>
            </a>
          </div>
          <p className="text-xs text-gray-500 opacity-30 text-center mt-8">
            For further enquiries, kindly contact <a href="mailto:dionne.ng@aelf.io" className="hover:text-purple-300 transition-colors">dionne.ng@aelf.io</a>
          </p>
        </div>
      </div>
      
      {/* Slide 4: Content Instructions & Requirements */}
      <div className={`slide ${currentSlide === 4 ? 'active' : ''}`}>
        <div className="slide-container">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-center text-white">
            Content Instructions & Requirements
          </h2>
          
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="content-card">
                <h3 className="text-xl font-bold mb-4 text-purple-300">Mandatory Tags</h3>
                <div className="space-y-2 text-sm">
                  <p className="flex items-center gap-2">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                    </svg>
                    <a href="https://www.instagram.com/godgpt._/" target="_blank" rel="noopener noreferrer" className="text-white hover:text-purple-300 underline">@godgpt._</a>
                  </p>
                  <p className="flex items-center gap-2">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"/>
                    </svg>
                    <a href="https://www.tiktok.com/@godgpt_" target="_blank" rel="noopener noreferrer" className="text-white hover:text-purple-300 underline">@godgpt_.</a>
                  </p>
                  <p className="flex items-center gap-2">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                    </svg>
                    <a href="https://www.youtube.com/@godgptofficial" target="_blank" rel="noopener noreferrer" className="text-white hover:text-purple-300 underline">@godgptofficial</a>
                  </p>
                </div>
              </div>
              
              <div className="content-card">
                <h3 className="text-xl font-bold mb-4 text-purple-300">Hashtags</h3>
                <div className="space-y-4">
                  <div>
                    <p className="text-sm font-semibold text-white mb-2">Mandatory:</p>
                    <span className="px-4 py-2 bg-purple-500/20 border border-purple-500/40 rounded-full text-purple-300 font-semibold text-sm">
                      #GodGPT
                    </span>
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-white mb-2">Secondary:</p>
                    <p className="text-xs text-gray-400 mb-3 italic">Recommended: Write in a separate comment rather than the post caption.</p>
                    <div className="flex flex-wrap gap-2">
                      <span className="px-3 py-1.5 bg-gray-700/50 border border-gray-600/50 rounded-full text-gray-300 text-sm">#SpiritualWellness</span>
                      <span className="px-3 py-1.5 bg-gray-700/50 border border-gray-600/50 rounded-full text-gray-300 text-sm">#AISpiritualGuidance</span>
                      <span className="px-3 py-1.5 bg-gray-700/50 border border-gray-600/50 rounded-full text-gray-300 text-sm">#SelfDiscovery</span>
                      <span className="px-3 py-1.5 bg-gray-700/50 border border-gray-600/50 rounded-full text-gray-300 text-sm">#InnerClarity</span>
                      <span className="px-3 py-1.5 bg-gray-700/50 border border-gray-600/50 rounded-full text-gray-300 text-sm">#PersonalReflection</span>
                      <span className="px-3 py-1.5 bg-gray-700/50 border border-gray-600/50 rounded-full text-gray-300 text-sm">#ProfessionalMindfulness</span>
                      <span className="px-3 py-1.5 bg-gray-700/50 border border-gray-600/50 rounded-full text-gray-300 text-sm">#ExecutiveWellness</span>
                      <span className="px-3 py-1.5 bg-gray-700/50 border border-gray-600/50 rounded-full text-gray-300 text-sm">#Mindfulness</span>
                      <span className="px-3 py-1.5 bg-gray-700/50 border border-gray-600/50 rounded-full text-gray-300 text-sm">#Wellness</span>
                      <span className="px-3 py-1.5 bg-gray-700/50 border border-gray-600/50 rounded-full text-gray-300 text-sm">#SelfCare</span>
                      <span className="px-3 py-1.5 bg-gray-700/50 border border-gray-600/50 rounded-full text-gray-300 text-sm">#PersonalGrowth</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="space-y-4">
              <div className="content-card">
                <h3 className="text-xl font-bold mb-4 text-purple-300">Video Requirements</h3>
                <ul className="space-y-2 text-sm text-gray-300">
                  <li>⏱️ <strong>Duration:</strong> Min 30 to 60 secs</li>
                  <li>📐 <strong>Format:</strong> 9:16 vertical</li>
                  <li>📹 <strong>File Format:</strong> Quicktime.mov with a minimum 4K or 1080p</li>
                  <li>🎵 <strong>Music:</strong> Copyright free music and sounds</li>
                </ul>
                <div className="mt-4 pt-4 border-t border-gray-700">
                  <p className="text-xs font-semibold text-purple-300 mb-2">Important for review before posting:</p>
                  <ul className="space-y-1 text-xs text-gray-300">
                    <li>✅ Always send high-res versions</li>
                    <li>✅ Always include cover image/thumbnail</li>
                  </ul>
                </div>
              </div>
              
              <div className="content-card">
                <h3 className="text-xl font-bold mb-3 text-purple-300">Platforms</h3>
                <div className="flex gap-4 text-lg">
                  <a href="https://www.instagram.com/godgpt._/" target="_blank" rel="noopener noreferrer" className="text-white hover:text-purple-300 underline">Instagram</a>
                  <span>•</span>
                  <a href="https://www.tiktok.com/@godgpt_" target="_blank" rel="noopener noreferrer" className="text-white hover:text-purple-300 underline">TikTok</a>
                  <span>•</span>
                  <a href="https://www.youtube.com/@godgptofficial" target="_blank" rel="noopener noreferrer" className="text-white hover:text-purple-300 underline">YouTube Shorts</a>
                </div>
              </div>
            </div>
          </div>
          <p className="text-xs text-gray-500 opacity-30 text-center mt-8">
            For further enquiries, kindly contact <a href="mailto:dionne.ng@aelf.io" className="hover:text-purple-300 transition-colors">dionne.ng@aelf.io</a>
          </p>
        </div>
      </div>
      
      {/* Slide 5: DO's and DON'Ts */}
      <div className={`slide ${currentSlide === 5 ? 'active' : ''}`}>
        <div className="slide-container">
          <h2 className="text-4xl md:text-5xl font-bold mb-8 text-center">
            <span className="text-purple-300">DO's</span>
            <span className="mx-4 text-gray-500">|</span>
            <span className="text-pink-300">DON'Ts</span>
          </h2>
          
          <div className="grid md:grid-cols-2 gap-6 max-w-6xl mx-auto">
            <div className="space-y-3">
              <div className="content-card do-card">
                <p className="text-gray-300 text-sm">Always write <span className="font-bold text-white">GodGPT</span> not GODGPT or godgpt</p>
              </div>
              <div className="content-card do-card">
                <p className="text-gray-300 text-sm">#GodGPT in all captions</p>
              </div>
              <div className="content-card do-card">
                <p className="text-gray-300 text-sm">Be your authentic self and share your passion for Spirituality</p>
              </div>
              <div className="content-card do-card">
                <p className="text-gray-300 text-sm">Share script before shooting</p>
              </div>
              <div className="content-card do-card">
                <p className="text-gray-300 text-sm">Send previews for review</p>
              </div>
              <div className="content-card do-card">
                <p className="text-gray-300 text-sm">Show GodGPT in thumbnail and video</p>
              </div>
              <div className="content-card do-card">
                <p className="text-gray-300 text-sm">Shoot in 4K resolution</p>
              </div>
              <div className="content-card do-card">
                <p className="text-gray-300 text-sm">Use royalty-free music</p>
              </div>
            </div>
            
            <div className="space-y-3">
              <div className="content-card dont-card">
                <p className="text-gray-300 text-sm">Don't compare with religion, use profane language, or make political statements</p>
              </div>
              <div className="content-card dont-card">
                <p className="text-gray-300 text-sm">Don't wear/mention/tag other brands</p>
              </div>
              <div className="content-card dont-card">
                <p className="text-gray-300 text-sm">Don't shoot in black & white</p>
              </div>
              <div className="content-card dont-card">
                <p className="text-gray-300 text-sm">Don't show other branded items</p>
              </div>
              <div className="content-card dont-card">
                <p className="text-gray-300 text-sm">Don't shoot in poor light quality</p>
              </div>
              <div className="content-card dont-card">
                <p className="text-gray-300 text-sm">Don't show alcohol, nudity, cigarettes, or sensitive content</p>
              </div>
              <div className="content-card dont-card">
                <p className="text-gray-300 text-sm">Don't overuse face filters that change product colors. Show your authentic self.</p>
              </div>
            </div>
          </div>
          <p className="text-xs text-gray-500 opacity-30 text-center mt-8">
            For further enquiries, kindly contact <a href="mailto:dionne.ng@aelf.io" className="hover:text-purple-300 transition-colors">dionne.ng@aelf.io</a>
          </p>
        </div>
      </div>
      
      {/* Slide 6: Contact */}
      <div className={`slide ${currentSlide === 6 ? 'active' : ''}`}>
        <div className="slide-container">
          <div className="text-center max-w-3xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-purple-300 via-pink-300 to-purple-300 bg-clip-text text-transparent animate-gradient-text drop-shadow-[0_0_30px_rgba(168,85,247,0.6)]">
              Ready to Amplify Your Influence?
            </h2>
            <p className="text-2xl md:text-3xl font-semibold mb-8 text-white">
              Let's Get Started
            </p>
            <div className="content-card max-w-2xl mx-auto">
              <p className="text-lg text-gray-300 mb-4">For further enquiries, kindly contact:</p>
              <a href="mailto:dionne.ng@aelf.io" className="text-2xl md:text-3xl font-bold text-purple-300 hover:text-pink-300 transition-colors underline">
                dionne.ng@aelf.io
              </a>
            </div>
            <div className="mt-12 text-gray-400">
              <p className="text-lg">Thank you for being part of the GodGPT community!</p>
            </div>
          </div>
        </div>
      </div>
      
      {/* Navigation Buttons */}
      <div className="nav-buttons">
        <button 
          className="nav-btn" 
          onClick={() => changeSlide(-1)}
          disabled={currentSlide === 1}
        >
          ← Previous
        </button>
        <button 
          className="nav-btn" 
          onClick={() => changeSlide(1)}
          disabled={currentSlide === totalSlides}
        >
          Next →
        </button>
      </div>
    </div>
  );
}