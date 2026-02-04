'use client';

import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import type { ResearchData } from '@/data/research/types';

interface ComparisonChartProps {
  researchData: ResearchData;
  chartType?: 'bar' | 'comparison';
}

/**
 * ComparisonChart component
 * Displays data visualization graphs for easy overview
 */
export default function ComparisonChart({ researchData, chartType = 'bar' }: ComparisonChartProps) {
  const { comparisonMetric, hingeValue, tinderValue } = researchData;

  const getNumericValue = (value: string | number): number => {
    if (typeof value === 'number') return value;
    // Extract numbers from strings like "65M" -> 65, "$550M" -> 550
    const match = value.toString().replace(/[^0-9.]/g, '').match(/[\d.]+/);
    return match ? parseFloat(match[0]) : 0;
  };

  const data = [
    {
      name: 'Hinge',
      value: getNumericValue(hingeValue),
      fill: '#a855f7', // purple-500
    },
    {
      name: 'Tinder',
      value: getNumericValue(tinderValue),
      fill: '#f97316', // orange-500
    },
  ];

  return (
    <div className="w-full h-64 sm:h-80 mt-6 p-4 rounded-bento-lg bg-gradient-to-br from-gray-900/80 to-dark-surface border border-purple-500/30">
      <h4 className="text-lg font-semibold text-white mb-4 text-center">{comparisonMetric}</h4>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data} margin={{ top: 10, right: 10, left: 10, bottom: 10 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
          <XAxis 
            dataKey="name" 
            stroke="#9ca3af"
            tick={{ fill: '#d1d5db', fontSize: 12 }}
          />
          <YAxis 
            stroke="#9ca3af"
            tick={{ fill: '#d1d5db', fontSize: 12 }}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: '#1f2937',
              border: '1px solid #4b5563',
              borderRadius: '8px',
              color: '#fff',
            }}
            cursor={{ fill: 'rgba(168, 85, 247, 0.1)' }}
          />
          <Bar 
            dataKey="value" 
            radius={[8, 8, 0, 0]}
            animationDuration={800}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
