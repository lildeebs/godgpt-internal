'use client';

import React, { useState } from 'react';
import LunarNewYearBanner from './LunarNewYearBanner';
import ChatbotJanuaryForm from './ChatbotJanuaryForm';

/**
 * Example component showing how to integrate the January reading form
 * into a chatbot interface. This can be adapted to your existing chatbot.
 */
export default function ChatbotIntegrationExample() {
  const [showForm, setShowForm] = useState(false);
  const [formCompleted, setFormCompleted] = useState(false);

  const handleGetReading = () => {
    setShowForm(true);
  };

  const handleFormComplete = (data: {
    email: string;
    question1: string;
    question2: string;
    question3: string;
  }) => {
    console.log('Form completed with data:', data);
    setFormCompleted(true);
    setShowForm(false);
    
    // Here you can:
    // 1. Send the data to your chatbot backend
    // 2. Trigger a chatbot response
    // 3. Show a success message in the chat
    // 4. Continue the conversation flow
  };

  const handleFormCancel = () => {
    setShowForm(false);
  };

  const handleBannerDismiss = () => {
    // Optional: Track dismissal
    console.log('Banner dismissed');
  };

  return (
    <div className="flex flex-col h-full">
      {/* Chat Messages Area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {/* Example: Show banner when form is not shown */}
        {!showForm && !formCompleted && (
          <LunarNewYearBanner
            onGetReading={handleGetReading}
            onDismiss={handleBannerDismiss}
            compact={true}
          />
        )}

        {/* Example: Show form when user clicks "Get Started" */}
        {showForm && (
          <ChatbotJanuaryForm
            onComplete={handleFormComplete}
            onCancel={handleFormCancel}
          />
        )}

        {/* Example: Success message after form completion */}
        {formCompleted && (
          <div className="bg-gradient-to-br from-green-900/40 to-emerald-900/40 border border-green-500/30 rounded-2xl p-6">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 rounded-full bg-green-500/20 flex items-center justify-center">
                <svg className="w-6 h-6 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <div>
                <h3 className="text-lg font-bold text-white">Your January Reading is Coming!</h3>
                <p className="text-sm text-gray-300">Check your email in a few minutes for your personalized theme.</p>
              </div>
            </div>
          </div>
        )}

        {/* Example: Regular chatbot messages */}
        <div className="bg-gray-900/50 rounded-2xl p-4">
          <p className="text-white">This is where your regular chatbot messages would appear...</p>
        </div>
      </div>

      {/* Chat Input Area */}
      <div className="border-t border-gray-800 p-4">
        <div className="flex items-center gap-3">
          <button className="w-10 h-10 rounded-xl bg-gray-800 flex items-center justify-center text-gray-400 hover:text-white transition-colors">
            <span className="text-xl">+</span>
          </button>
          <input
            type="text"
            placeholder="Ask anything..."
            className="flex-1 px-4 h-12 rounded-xl bg-gray-900/50 border border-gray-700 text-white placeholder-gray-500 focus:outline-none focus:border-purple-500"
          />
          <button className="w-10 h-10 rounded-xl bg-gray-800 flex items-center justify-center text-gray-400 hover:text-white transition-colors">
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"/>
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}
