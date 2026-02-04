import { useState, useCallback, useMemo } from 'react';
import type { NavigationState } from '@/data/research/types';

/**
 * Custom hook for managing presentation navigation state
 * Manages currentSlideIndex, totalSlides, canGoPrevious, canGoNext, slideIds, navigation handlers
 */
export function useNavigationState(slideIds: string[]): {
  navigationState: NavigationState;
  goToSlide: (index: number) => void;
  goToNext: () => void;
  goToPrevious: () => void;
  goToFirst: () => void;
  goToLast: () => void;
} {
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const totalSlides = slideIds.length;

  // Calculate navigation availability
  const canGoPrevious = useMemo(() => currentSlideIndex > 0, [currentSlideIndex]);
  const canGoNext = useMemo(() => currentSlideIndex < totalSlides - 1, [currentSlideIndex, totalSlides]);

  // Navigation state object
  const navigationState: NavigationState = useMemo(
    () => ({
      currentSlideIndex,
      totalSlides,
      canGoPrevious,
      canGoNext,
      slideIds,
    }),
    [currentSlideIndex, totalSlides, canGoPrevious, canGoNext, slideIds]
  );

  // Navigate to specific slide by index
  const goToSlide = useCallback(
    (index: number) => {
      if (index >= 0 && index < totalSlides) {
        setCurrentSlideIndex(index);
      }
    },
    [totalSlides]
  );

  // Navigate to next slide
  const goToNext = useCallback(() => {
    if (canGoNext) {
      setCurrentSlideIndex((prev) => prev + 1);
    }
  }, [canGoNext]);

  // Navigate to previous slide
  const goToPrevious = useCallback(() => {
    if (canGoPrevious) {
      setCurrentSlideIndex((prev) => prev - 1);
    }
  }, [canGoPrevious]);

  // Navigate to first slide
  const goToFirst = useCallback(() => {
    setCurrentSlideIndex(0);
  }, []);

  // Navigate to last slide
  const goToLast = useCallback(() => {
    setCurrentSlideIndex(totalSlides - 1);
  }, [totalSlides]);

  return {
    navigationState,
    goToSlide,
    goToNext,
    goToPrevious,
    goToFirst,
    goToLast,
  };
}
