'use client';

import React from 'react';
import { motion } from 'framer-motion';
import type { AnimationConfig } from '@/data/research/types';

interface MicroAnimationProps {
  children: React.ReactNode;
  config?: AnimationConfig;
  className?: string;
}

/**
 * MicroAnimation wrapper component
 * Provides seamless micro animations on hover and interaction
 */
export default function MicroAnimation({ 
  children, 
  config = {
    type: 'scale',
    duration: 200,
    trigger: 'hover',
    easing: 'ease-out',
  },
  className = '',
}: MicroAnimationProps) {
  const getAnimationVariants = () => {
    const baseTransition = {
      duration: config.duration / 1000,
      ease: config.easing || 'ease-out',
    };

    switch (config.type) {
      case 'scale':
        return {
          rest: { scale: 1 },
          hover: { scale: 1.05 },
          tap: { scale: 0.98 },
        };
      case 'fade':
        return {
          rest: { opacity: 1 },
          hover: { opacity: 0.9 },
          tap: { opacity: 0.85 },
        };
      case 'slide':
        return {
          rest: { y: 0 },
          hover: { y: -4 },
          tap: { y: -2 },
        };
      case 'bounce':
        return {
          rest: { scale: 1 },
          hover: { scale: 1.05, y: -2 },
          tap: { scale: 0.98, y: 0 },
        };
      default:
        return {
          rest: { scale: 1 },
          hover: { scale: 1.02 },
          tap: { scale: 0.99 },
        };
    }
  };

  const variants = getAnimationVariants();

  return (
    <motion.div
      className={className}
      initial="rest"
      whileHover={config.trigger === 'hover' ? 'hover' : undefined}
      whileTap={config.trigger === 'click' ? 'tap' : undefined}
      variants={variants}
      transition={{
        duration: config.duration / 1000,
        ease: config.easing || 'ease-out',
      }}
    >
      {children}
    </motion.div>
  );
}
