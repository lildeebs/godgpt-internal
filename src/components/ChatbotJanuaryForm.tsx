'use client';

import React, { useState } from 'react';

interface ChatbotJanuaryFormProps {
  onComplete?: (data: {
    email: string;
    question1: string;
    question2: string;
    question3: string;
  }) => void;
  onCancel?: () => void;
}

export default function ChatbotJanuaryForm({ onComplete, onCancel }: ChatbotJanuaryFormProps) {
  const [email, setEmail] = useState('');
  const [question1, setQuestion1] = useState('');
  const [question2, setQuestion2] = useState('');
  const [question3, setQuestion3] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
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
      const formData = {
        email,
        question1: question1 || null,
        question2: question2 || null,
        question3: question3 || null,
        source: 'godgpt-chatbot-january-reading',
        timestamp: new Date().toISOString(),
      };
      
      // Store locally as backup
      localStorage.setItem('january_reading_data', JSON.stringify(formData));
      
      // Try to send to backend
      try {
        const response = await fetch('/api/january-reading', {
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
        console.log('Backend endpoint not available, using localStorage fallback');
      }
      
      // Call completion callback
      if (onComplete) {
        onComplete({
          email,
          question1,
          question2,
          question3,
        });
      }
    } catch (err) {
      setError('Something went wrong. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto p-4">
      <div className="bg-gradient-to-br from-purple-900/40 to-pink-900/40 border border-purple-500/30 rounded-2xl p-6 backdrop-blur-sm">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xl font-bold text-white">
            Get Your Personalized January Theme
          </h3>
          {onCancel && (
            <button
              onClick={onCancel}
              className="text-gray-400 hover:text-white transition-colors"
              aria-label="Close form"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          )}
        </div>
        
        <p className="text-sm text-gray-400 mb-6">
          Answer 3 quick questions to help us tailor your January reading
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Email - Required */}
          <div>
            <label htmlFor="chatbot-email" className="block text-sm font-medium text-gray-300 mb-2">
              My email is <span className="text-red-400">*</span>
            </label>
            <input
              type="email"
              id="chatbot-email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="your.email@example.com"
              required
              className="w-full px-4 h-[48px] rounded-lg bg-gray-900/50 border border-gray-700 text-white placeholder-gray-500 focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all"
            />
          </div>

          {/* Question 1 - Main Focus for 2026 */}
          <div>
            <label htmlFor="chatbot-q1" className="block text-sm font-medium text-gray-300 mb-2">
              What's your main focus for 2026? <span className="text-gray-500 text-xs">(e.g., career growth, relationships, health, creativity)</span>
            </label>
            <input
              type="text"
              id="chatbot-q1"
              value={question1}
              onChange={(e) => setQuestion1(e.target.value)}
              placeholder="Type your answer..."
              className="w-full px-4 h-[48px] rounded-lg bg-gray-900/50 border border-gray-700 text-white placeholder-gray-500 focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all"
            />
          </div>

          {/* Question 2 - Biggest Challenge from 2025 */}
          <div>
            <label htmlFor="chatbot-q2" className="block text-sm font-medium text-gray-300 mb-2">
              What was your biggest challenge or lesson in 2025? <span className="text-gray-500 text-xs">(optional)</span>
            </label>
            <textarea
              id="chatbot-q2"
              value={question2}
              onChange={(e) => setQuestion2(e.target.value)}
              placeholder="Share what you learned or want to leave behind..."
              rows={3}
              className="w-full px-4 py-3 rounded-lg bg-gray-900/50 border border-gray-700 text-white placeholder-gray-500 focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all resize-none"
            />
          </div>

          {/* Question 3 - Energy for January */}
          <div>
            <label htmlFor="chatbot-q3" className="block text-sm font-medium text-gray-300 mb-2">
              What energy do you want to bring into January? <span className="text-gray-500 text-xs">(e.g., new beginnings, healing, action, clarity)</span>
            </label>
            <input
              type="text"
              id="chatbot-q3"
              value={question3}
              onChange={(e) => setQuestion3(e.target.value)}
              placeholder="Type your answer..."
              className="w-full px-4 h-[48px] rounded-lg bg-gray-900/50 border border-gray-700 text-white placeholder-gray-500 focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all"
            />
          </div>

          {error && (
            <div className="p-3 rounded-lg bg-red-500/10 border border-red-500/30 text-red-300 text-sm">
              {error}
            </div>
          )}

          <div className="flex gap-3">
            <button
              type="submit"
              disabled={isSubmitting}
              className="flex-1 h-[48px] rounded-xl bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold transition-all duration-200 active:opacity-80 active:scale-[0.98] hover:shadow-[0_0_20px_rgba(168,85,247,0.4)] shadow-[0_4px_15px_rgba(168,85,247,0.3)] disabled:opacity-50 disabled:cursor-not-allowed"
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
            {onCancel && (
              <button
                type="button"
                onClick={onCancel}
                className="px-6 h-[48px] rounded-xl bg-gray-800/50 border border-gray-700 text-gray-300 font-semibold hover:bg-gray-700/50 transition-colors"
              >
                Cancel
              </button>
            )}
          </div>

          <p className="text-xs text-gray-500 text-center">
            By submitting, you agree to receive your January reading via email. 
            We respect your privacy and won't spam you.
          </p>
        </form>
      </div>
    </div>
  );
}
