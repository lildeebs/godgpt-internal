'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import type { ResearchData } from '@/data/research/types';

interface ComparisonCardProps {
  researchData: ResearchData;
  additionalStats?: {
    hinge?: Record<string, string | number>;
    tinder?: Record<string, string | number>;
  };
}

/**
 * ComparisonCard component with vibrant design
 * Displays Hinge vs Tinder comparison with metrics, values, units
 * Includes micro animations on hover and dropdown statistics
 */
export default function ComparisonCard({ researchData, additionalStats }: ComparisonCardProps) {
  const { comparisonMetric, hingeValue, tinderValue, unit } = researchData;
  const [hoveredCard, setHoveredCard] = useState<'hinge' | 'tinder' | null>(null);

  const formatValue = (value: string | number): string => {
    if (typeof value === 'number') {
      return value.toLocaleString();
    }
    return value;
  };

  const getNumericValue = (value: string | number): number => {
    if (typeof value === 'number') return value;
    // Extract numbers from strings like "65M" -> 65
    const match = value.toString().match(/[\d.]+/);
    return match ? parseFloat(match[0]) : 0;
  };

  const hingeNum = getNumericValue(hingeValue);
  const tinderNum = getNumericValue(tinderValue);
  const maxValue = Math.max(hingeNum, tinderNum);
  const hingePercentage = maxValue > 0 ? (hingeNum / maxValue) * 100 : 0;
  const tinderPercentage = maxValue > 0 ? (tinderNum / maxValue) * 100 : 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="rounded-bento-lg bg-gradient-to-br from-gray-900 via-dark-surface to-gray-900 border border-purple-500/30 p-6 shadow-lg shadow-purple-500/10"
    >
      <h3 className="text-2xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-400 to-purple-400">
        {comparisonMetric}
      </h3>
      
      <div className="grid grid-cols-2 gap-6">
        {/* Hinge Card */}
        <motion.div
          onHoverStart={() => setHoveredCard('hinge')}
          onHoverEnd={() => setHoveredCard(null)}
          whileHover={{ scale: 1.02, y: -4 }}
          transition={{ duration: 0.2, ease: 'easeOut' }}
          className="relative text-center p-6 rounded-bento-lg bg-gradient-to-br from-purple-600/20 to-pink-600/20 border-2 border-purple-500/50 backdrop-blur-sm cursor-pointer group"
        >
          <div className="text-sm font-semibold text-purple-300 mb-3 uppercase tracking-wide">Hinge</div>
          <div className="text-3xl font-bold text-white mb-2">
            {formatValue(hingeValue)}
            {unit && <span className="text-xl text-purple-300 ml-1">{unit}</span>}
          </div>
          
          {/* Progress Bar */}
          <div className="w-full h-2 bg-gray-800 rounded-full mt-4 overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${hingePercentage}%` }}
              transition={{ duration: 0.8, ease: 'easeOut' }}
              className="h-full bg-gradient-to-r from-purple-500 to-pink-500 rounded-full"
            />
          </div>

          {/* Hover Dropdown with Additional Stats */}
          <AnimatePresence>
            {hoveredCard === 'hinge' && additionalStats?.hinge && (
              <motion.div
                initial={{ opacity: 0, y: 10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 10, scale: 0.95 }}
                transition={{ duration: 0.2 }}
                className="absolute top-full left-0 right-0 mt-2 p-4 rounded-bento-lg bg-gray-900 border border-purple-500/50 shadow-xl z-10"
              >
                <div className="text-xs font-semibold text-purple-300 mb-2 uppercase">Additional Statistics</div>
                <div className="space-y-2">
                  {Object.entries(additionalStats.hinge).map(([key, value]) => (
                    <div key={key} className="flex justify-between text-sm">
                      <span className="text-gray-400 capitalize">{key.replace(/([A-Z])/g, ' $1').trim()}:</span>
                      <span className="text-white font-semibold">{String(value)}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        {/* Tinder Card */}
        <motion.div
          onHoverStart={() => setHoveredCard('tinder')}
          onHoverEnd={() => setHoveredCard(null)}
          whileHover={{ scale: 1.02, y: -4 }}
          transition={{ duration: 0.2, ease: 'easeOut' }}
          className="relative text-center p-6 rounded-bento-lg bg-gradient-to-br from-orange-600/20 to-red-600/20 border-2 border-orange-500/50 backdrop-blur-sm cursor-pointer group"
        >
          <div className="text-sm font-semibold text-orange-300 mb-3 uppercase tracking-wide">Tinder</div>
          <div className="text-3xl font-bold text-white mb-2">
            {formatValue(tinderValue)}
            {unit && <span className="text-xl text-orange-300 ml-1">{unit}</span>}
          </div>
          
          {/* Progress Bar */}
          <div className="w-full h-2 bg-gray-800 rounded-full mt-4 overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${tinderPercentage}%` }}
              transition={{ duration: 0.8, ease: 'easeOut', delay: 0.1 }}
              className="h-full bg-gradient-to-r from-orange-500 to-red-500 rounded-full"
            />
          </div>

          {/* Hover Dropdown with Additional Stats */}
          <AnimatePresence>
            {hoveredCard === 'tinder' && additionalStats?.tinder && (
              <motion.div
                initial={{ opacity: 0, y: 10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 10, scale: 0.95 }}
                transition={{ duration: 0.2 }}
                className="absolute top-full left-0 right-0 mt-2 p-4 rounded-bento-lg bg-gray-900 border border-orange-500/50 shadow-xl z-10"
              >
                <div className="text-xs font-semibold text-orange-300 mb-2 uppercase">Additional Statistics</div>
                <div className="space-y-2">
                  {Object.entries(additionalStats.tinder).map(([key, value]) => (
                    <div key={key} className="flex justify-between text-sm">
                      <span className="text-gray-400 capitalize">{key.replace(/([A-Z])/g, ' $1').trim()}:</span>
                      <span className="text-white font-semibold">{String(value)}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </motion.div>
  );
}
