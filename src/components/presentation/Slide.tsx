'use client';

import React, { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import type { Slide as SlideType } from '@/data/research/types';
import { capitalizeKeywords } from '@/utils/keywordCapitalization';
import ComparisonCard from '@/components/research/ComparisonCard';
import ComparisonChart from '@/components/research/ComparisonChart';
import ResearchSource from '@/components/research/ResearchSource';
import MicroAnimation from './MicroAnimation';

interface SlideProps {
  slide: SlideType;
  isActive: boolean;
  onAnimationComplete?: () => void;
}

/**
 * Individual slide component
 * Displays single slide, full viewport, dark theme, rounded corners
 * Includes smooth transitions using Framer Motion
 */
export default function Slide({ slide, isActive, onAnimationComplete }: SlideProps) {
  const [isAnimating, setIsAnimating] = useState(false);

  // Animation queue handling - prevent rapid navigation conflicts
  const handleAnimationStart = () => {
    setIsAnimating(true);
  };

  const handleAnimationComplete = () => {
    setIsAnimating(false);
    onAnimationComplete?.();
  };

  // Capitalize keywords in text content
  const processedText = capitalizeKeywords(slide.content.text, slide.keywords);

  // Animation variants for slide transitions
  const slideVariants = {
    hidden: {
      opacity: 0,
      x: 100,
    },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.3,
        ease: 'easeOut',
      },
    },
    exit: {
      opacity: 0,
      x: -100,
      transition: {
        duration: 0.3,
        ease: 'easeIn',
      },
    },
  };

  if (!isActive && !isAnimating) {
    return null;
  }

  return (
    <AnimatePresence mode="wait" onExitComplete={handleAnimationComplete}>
      {isActive && (
        <motion.div
          key={slide.id}
          variants={slideVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          onAnimationStart={handleAnimationStart}
          onAnimationComplete={handleAnimationComplete}
          className="w-full h-screen bg-gradient-to-br from-black via-gray-900 to-black text-white overflow-y-auto"
        >
          <div className="min-h-screen flex flex-col">
            {/* Slide Content */}
            <main className="flex-1 px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
              <div className="max-w-6xl mx-auto">
                {/* Slide Title */}
                <motion.h1
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  className="text-3xl sm:text-4xl md:text-5xl font-bold mb-8 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-400 to-purple-400"
                >
                  {capitalizeKeywords(slide.title, slide.keywords)}
                </motion.h1>

                {/* Main Text Content */}
                {processedText && (
                  <p className="text-lg sm:text-xl text-gray-300 mb-8 leading-relaxed">
                    {processedText}
                  </p>
                )}

                {/* Content Sections with Micro Animations */}
                {slide.content.sections && slide.content.sections.length > 0 && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                    {slide.content.sections.map((section, index) => (
                      <MicroAnimation
                        key={section.id}
                        config={{
                          type: 'bounce',
                          duration: 250,
                          trigger: 'hover',
                          easing: 'ease-out',
                        }}
                      >
                        <motion.div
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.4, delay: index * 0.1 }}
                          className={`
                            p-6 rounded-bento-lg bg-gradient-to-br from-gray-900/80 to-dark-surface
                            border-2 backdrop-blur-sm
                            ${section.highlight 
                              ? 'border-purple-500/50 shadow-lg shadow-purple-500/20' 
                              : 'border-gray-700/50 hover:border-purple-500/30'
                            }
                            transition-all duration-300
                          `}
                        >
                          {section.icon && (
                            <div className="mb-3 text-purple-400">
                              {/* Icon would be rendered here using Heroicons */}
                            </div>
                          )}
                          <h2 className="text-xl font-semibold mb-3 text-transparent bg-clip-text bg-gradient-to-r from-purple-300 to-pink-300">
                            {capitalizeKeywords(section.title, slide.keywords)}
                          </h2>
                          <p className="text-gray-300 leading-relaxed">
                            {capitalizeKeywords(section.content, slide.keywords)}
                          </p>
                        </motion.div>
                      </MicroAnimation>
                    ))}
                  </div>
                )}

                {/* Research Data Comparison Card with Chart */}
                {slide.researchData && slide.researchData.verificationStatus === 'verified' && (
                  <div className="mb-8 space-y-6">
                    <MicroAnimation
                      config={{
                        type: 'scale',
                        duration: 200,
                        trigger: 'hover',
                      }}
                    >
                      <ComparisonCard 
                        researchData={slide.researchData}
                        additionalStats={slide.researchData.additionalStats}
                      />
                    </MicroAnimation>
                    
                    {/* Chart for Visual Overview */}
                    <MicroAnimation
                      config={{
                        type: 'fade',
                        duration: 300,
                        trigger: 'hover',
                      }}
                    >
                      <ComparisonChart researchData={slide.researchData} />
                    </MicroAnimation>
                    
                    <ResearchSource sources={slide.researchData.sources} />
                  </div>
                )}

                {/* CTA Link (if present) */}
                {slide.content.cta && (
                  <div className="mt-8">
                    <a
                      href={slide.content.cta.url}
                      target={slide.content.cta.external ? '_blank' : undefined}
                      rel={slide.content.cta.external ? 'noopener noreferrer' : undefined}
                      className="inline-flex items-center px-6 py-3 rounded-lg bg-gray-800 hover:bg-gray-700 text-white font-semibold transition-colors duration-200"
                    >
                      {slide.content.cta.text}
                    </a>
                  </div>
                )}
              </div>
            </main>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
