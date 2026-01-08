'use client';

import React from 'react';

interface ValidationMessageProps {
  message: string;
  type?: 'error' | 'success';
}

export const ValidationMessage: React.FC<ValidationMessageProps> = ({
  message,
  type = 'error',
}) => {
  if (!message) return null;

  return (
    <p
      className={`mt-2 text-sm ${
        type === 'error' ? 'text-red-400' : 'text-green-400'
      }`}
      role="alert"
      aria-live="polite"
    >
      {message}
    </p>
  );
};
