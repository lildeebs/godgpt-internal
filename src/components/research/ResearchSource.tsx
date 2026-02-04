'use client';

import React from 'react';
import type { SourceReference } from '@/data/research/types';

interface ResearchSourceProps {
  sources: SourceReference[];
}

/**
 * ResearchSource component
 * Displays source attribution, URLs, credibility ratings
 */
export default function ResearchSource({ sources }: ResearchSourceProps) {
  if (!sources || sources.length === 0) {
    return null;
  }

  const getCredibilityColor = (credibility: 'high' | 'medium' | 'low'): string => {
    switch (credibility) {
      case 'high':
        return 'text-green-400';
      case 'medium':
        return 'text-yellow-400';
      case 'low':
        return 'text-red-400';
      default:
        return 'text-gray-400';
    }
  };

  const getCredibilityLabel = (credibility: 'high' | 'medium' | 'low'): string => {
    switch (credibility) {
      case 'high':
        return 'High';
      case 'medium':
        return 'Medium';
      case 'low':
        return 'Low';
      default:
        return 'Unknown';
    }
  };

  return (
    <div className="mt-6 pt-6 border-t border-gray-800">
      <h4 className="text-sm font-semibold text-gray-400 mb-3">Sources</h4>
      <div className="space-y-2">
        {sources.map((source, index) => (
          <div key={index} className="flex items-start gap-2 text-sm">
            <span className={`font-medium ${getCredibilityColor(source.credibility)}`}>
              [{getCredibilityLabel(source.credibility)}]
            </span>
            <a
              href={source.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-400 hover:text-blue-300 underline break-all"
            >
              {source.title}
            </a>
            <span className="text-gray-500 text-xs ml-auto">
              {new Date(source.date).getFullYear()}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
