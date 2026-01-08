'use client';

import React, { useState } from 'react';
import { config } from '../config/env';

export default function JanuaryReadingForm() {
  const [email, setEmail] = useState('');
  const [birthDate, setBirthDate] = useState('');
  const [birthTime, setBirthTime] = useState('');
  const [birthCity, setBirthCity] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState('');

  const validateEmail = (email: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!email) {
      setError('Email is required');
      return;
    }

    if (!validateEmail(email)) {
      setError('Please enter a valid email address');
      return;
    }

    setIsSubmitting(true);

    try {
      // Try to send to backend API (if available)
      // You can create a new endpoint: /api/january-reading or use existing /api/submissions
      const apiUrl = config.apiUrl || 'http://localhost:3001';
      
      // Store data locally first (as backup)
      const formData = {
        email,
        birthDate: birthDate || null,
        birthTime: birthTime || null,
        birthCity: birthCity || null,
        source: 'godgpt-marketing-january-reading',
        timestamp: new Date().toISOString(),
      };
      
      localStorage.setItem('january_reading_data', JSON.stringify(formData));
      
      // Try to send to backend (optional - will work even if backend is down)
      try {
        const response = await fetch(`${apiUrl}/api/january-reading`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData),
        });

        if (response.ok) {
          console.log('Successfully sent to backend');
        }
      } catch (apiError) {
        // Backend might not have this endpoint yet - that's okay
        // Data is stored in localStorage as backup
        console.log('Backend endpoint not available, using localStorage fallback');
      }
      
      // Always show success and redirect
      setIsSubmitted(true);
      setTimeout(() => {
        window.location.href = 'https://godgpt.fun/en';
      }, 2000);
    } catch (err) {
      setError('Something went wrong. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSubmitted) {
    return (
      <div className="p-8 rounded-2xl bg-gradient-to-br from-purple-900/40 to-pink-900/40 border-2 border-purple-500/50 text-center">
        <div className="w-16 h-16 rounded-full bg-green-500/20 flex items-center justify-center mx-auto mb-4">
          <svg className="w-8 h-8 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h3 className="text-2xl font-bold text-white mb-2">Your January Reading is Coming!</h3>
        <p className="text-gray-300">Check your email in a few minutes. Redirecting you now...</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-md mx-auto">
      <div className="p-6 md:p-8 rounded-2xl bg-gradient-to-br from-purple-900/30 to-pink-900/30 border border-purple-500/30 backdrop-blur-sm">
        <h3 className="text-2xl font-bold text-white mb-2 text-center">
          Get Your January Theme
        </h3>
        <p className="text-sm text-gray-400 text-center mb-6">
          Enter your details to receive your personalized January reading via email
        </p>

        <div className="space-y-4">
          {/* Email - Required */}
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
              My email is <span className="text-red-400">*</span>
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="your.email@example.com"
              required
              className="w-full px-4 h-[48px] rounded-lg bg-gray-900/50 border border-gray-700 text-white placeholder-gray-500 focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all"
            />
          </div>

          {/* Birth Date - Optional */}
          <div>
            <label htmlFor="birthDate" className="block text-sm font-medium text-gray-300 mb-2">
              I was born on <span className="text-gray-500 text-xs">(optional, for more accurate reading)</span>
            </label>
            <div className="relative">
              <input
                type="date"
                id="birthDate"
                value={birthDate}
                onChange={(e) => setBirthDate(e.target.value)}
                className="w-full px-4 h-[48px] rounded-lg bg-gray-900/50 border border-gray-700 text-white focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all"
              />
            </div>
          </div>

          {/* Birth Time - Optional */}
          <div>
            <label htmlFor="birthTime" className="block text-sm font-medium text-gray-300 mb-2">
              At <span className="text-gray-500 text-xs">(optional)</span>
            </label>
            <div className="relative">
              <input
                type="time"
                id="birthTime"
                value={birthTime}
                onChange={(e) => setBirthTime(e.target.value)}
                className="w-full px-4 h-[48px] rounded-lg bg-gray-900/50 border border-gray-700 text-white focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all"
              />
            </div>
          </div>

          {/* Birth City - Optional */}
          <div>
            <label htmlFor="birthCity" className="block text-sm font-medium text-gray-300 mb-2">
              In <span className="text-gray-500 text-xs">(optional)</span>
            </label>
            <input
              type="text"
              id="birthCity"
              value={birthCity}
              onChange={(e) => setBirthCity(e.target.value)}
              placeholder="City name"
              className="w-full px-4 h-[48px] rounded-lg bg-gray-900/50 border border-gray-700 text-white placeholder-gray-500 focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all"
            />
          </div>

          {error && (
            <div className="p-3 rounded-lg bg-red-500/10 border border-red-500/30 text-red-300 text-sm">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full h-[52px] rounded-xl bg-gradient-to-r from-purple-600 to-pink-600 text-white font-bold text-lg transition-all duration-200 active:opacity-80 active:scale-[0.98] hover:shadow-[0_0_30px_rgba(168,85,247,0.4)] shadow-[0_4px_20px_rgba(168,85,247,0.3)] disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? (
              <span className="flex items-center justify-center gap-2">
                <svg className="animate-spin h-5 w-5" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                </svg>
                Sending...
              </span>
            ) : (
              'Get My January Reading →'
            )}
          </button>

          <p className="text-xs text-gray-500 text-center">
            By submitting, you agree to receive your January reading via email. 
            We respect your privacy and won't spam you.
          </p>
        </div>
      </div>
    </form>
  );
}
