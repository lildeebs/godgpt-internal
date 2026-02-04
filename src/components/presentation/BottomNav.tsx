'use client';

import React, { useEffect } from 'react';
import type { NavigationState } from '@/data/research/types';

interface BottomNavProps {
  navigationState: NavigationState;
  onNavigate: (index: number) => void;
  onNext: () => void;
  onPrevious: () => void;
}

/**
 * Bottom navigation component for slide navigation
 * Fixed bottom position, slide indicators, previous/next buttons, keyboard navigation support
 */
export default function BottomNav({
  navigationState,
  onNavigate,
  onNext,
  onPrevious,
}: BottomNavProps) {
  const { currentSlideIndex, totalSlides, canGoPrevious, canGoNext, slideIds } = navigationState;

  // Keyboard navigation support (arrow keys for previous/next)
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      // Prevent default behavior for arrow keys
      if (event.key === 'ArrowLeft' || event.key === 'ArrowRight') {
        event.preventDefault();
      }

      if (event.key === 'ArrowLeft' && canGoPrevious) {
        onPrevious();
      } else if (event.key === 'ArrowRight' && canGoNext) {
        onNext();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [canGoPrevious, canGoNext, onNext, onPrevious]);

  return (
    <nav
      className="fixed bottom-0 left-0 right-0 z-50 bg-gradient-to-t from-black via-gray-900/95 to-transparent backdrop-blur-md border-t border-purple-500/30"
      aria-label="Slide navigation"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Previous Button */}
          <button
            onClick={onPrevious}
            disabled={!canGoPrevious}
            className={`
              flex items-center justify-center px-4 py-2 rounded-lg
              transition-all duration-200
              ${canGoPrevious
                ? 'bg-gradient-to-r from-purple-600/80 to-pink-600/80 hover:from-purple-600 hover:to-pink-600 text-white active:scale-95 shadow-lg shadow-purple-500/30'
                : 'bg-gray-900 text-gray-600 cursor-not-allowed opacity-50'
              }
              min-w-[44px] min-h-[44px]
            `}
            aria-label="Previous slide"
            aria-disabled={!canGoPrevious}
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
          </button>

          {/* Slide Indicators */}
          <div className="flex items-center gap-2 flex-1 justify-center px-4">
            {slideIds.map((slideId, index) => (
              <button
                key={slideId}
                onClick={() => onNavigate(index)}
                className={`
                  rounded-full transition-all duration-200
                  ${index === currentSlideIndex
                    ? 'w-8 h-2 bg-gradient-to-r from-purple-500 to-pink-500 shadow-lg shadow-purple-500/50'
                    : 'w-2 h-2 bg-gray-600 hover:bg-purple-500/50'
                  }
                  min-w-[8px] min-h-[8px]
                `}
                aria-label={`Go to slide ${index + 1} of ${totalSlides}`}
                aria-current={index === currentSlideIndex ? 'page' : undefined}
              />
            ))}
          </div>

          {/* Next Button */}
          <button
            onClick={onNext}
            disabled={!canGoNext}
            className={`
              flex items-center justify-center px-4 py-2 rounded-lg
              transition-all duration-200
              ${canGoNext
                ? 'bg-gradient-to-r from-purple-600/80 to-pink-600/80 hover:from-purple-600 hover:to-pink-600 text-white active:scale-95 shadow-lg shadow-purple-500/30'
                : 'bg-gray-900 text-gray-600 cursor-not-allowed opacity-50'
              }
              min-w-[44px] min-h-[44px]
            `}
            aria-label="Next slide"
            aria-disabled={!canGoNext}
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </button>
        </div>
      </div>
    </nav>
  );
}
