'use client';

import React from 'react';
import Slide from '@/components/presentation/Slide';
import BottomNav from '@/components/presentation/BottomNav';
import { useNavigationState } from '@/hooks/useNavigationState';
import { hingeTinderSlides } from '@/data/research/hinge-tinder-comparison';

/**
 * Main presentation page component
 * Full-page layout, dark black theme, viewport height
 * Integrates NavigationState hook, handles slide transitions
 * Responsive layout (mobile-first, adapts 320px-1920px)
 */
export default function DatingComparisonPage() {
  const slideIds = hingeTinderSlides.map((slide) => slide.id);
  const { navigationState, goToSlide, goToNext, goToPrevious } = useNavigationState(slideIds);

  const currentSlide = hingeTinderSlides[navigationState.currentSlideIndex];

  return (
    <div className="min-h-screen bg-dark-black text-white">
      {/* Slide Container */}
      <div className="relative w-full h-screen overflow-hidden">
        <Slide
          key={currentSlide.id}
          slide={currentSlide}
          isActive={true}
        />
      </div>

      {/* Bottom Navigation */}
      <BottomNav
        navigationState={navigationState}
        onNavigate={goToSlide}
        onNext={goToNext}
        onPrevious={goToPrevious}
      />
    </div>
  );
}
