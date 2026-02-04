'use client';

import React from 'react';
import { motion } from 'framer-motion';

export default function Success() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        className="w-full max-w-2xl"
      >
        <div className="bg-gray-800/50 backdrop-blur-lg border border-gray-700 rounded-2xl p-8 shadow-2xl text-center">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
            className="mb-6"
          >
            <div className="w-20 h-20 mx-auto bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center">
              <svg
                className="w-12 h-12 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={3}
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </div>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-3xl font-bold text-white mb-4"
          >
            Thank you for submitting the form!
          </motion.h1>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="text-gray-300 space-y-4 mb-8"
          >
            <p className="text-lg">
              Ready to amplify your influence with GodGPT? Share this with your people.
            </p>
            <p>
              Invite them into a new class of thought. Everything changes when you stop asking{' '}
              <em className="text-white">what</em> this is — and start asking{' '}
              <em className="text-white">who you become</em> by using it.
            </p>
            <p className="pt-4">
              Should there be any enquiries, please direct them to{' '}
              <a
                href="mailto:dionne.ng@aelf.io"
                className="text-blue-400 hover:text-blue-300 underline"
              >
                dionne.ng@aelf.io
              </a>
            </p>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}
