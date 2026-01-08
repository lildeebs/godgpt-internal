'use client';

import React from 'react';

export const SOCIAL_MEDIA_OPTIONS = [
  { value: 'Facebook', label: 'Facebook' },
  { value: 'Instagram', label: 'Instagram' },
  { value: 'YouTube', label: 'YouTube' },
  { value: 'TikTok', label: 'TikTok' },
] as const;

export type SocialMediaChannel = 'Facebook' | 'Instagram' | 'YouTube' | 'TikTok';

interface SocialMediaDropdownProps {
  value: SocialMediaChannel[];
  onChange: (value: SocialMediaChannel[]) => void;
  error?: string;
  required?: boolean;
}

export const SocialMediaDropdown: React.FC<SocialMediaDropdownProps> = ({
  value,
  onChange,
  error,
  required = false,
}) => {
  const handleToggle = (channelValue: SocialMediaChannel) => {
    const newValue = value.includes(channelValue)
      ? value.filter((v) => v !== channelValue)
      : [...value, channelValue];
    onChange(newValue);
  };

  return (
    <div>
      <label
        htmlFor="socialMediaChannels"
        className="block text-sm font-medium text-gray-300 mb-2"
      >
        Main Social Media Channel(s){' '}
        {required && <span className="text-red-400 ml-1" aria-label="required">*</span>}
      </label>
      <div
        id="socialMediaChannels"
        role="group"
        aria-required={required}
        aria-invalid={!!error}
        aria-describedby={error ? 'socialMediaChannels-error' : undefined}
        className={`
          border rounded-lg p-4 space-y-3
          ${error ? 'border-red-500' : 'border-gray-700'}
        `}
      >
        {SOCIAL_MEDIA_OPTIONS.map((option) => {
          const isSelected = value.includes(option.value);
          return (
            <label
              key={option.value}
              className={`
                flex items-center space-x-3 p-3 rounded-lg cursor-pointer
                transition-all duration-200
                ${
                  isSelected
                    ? 'bg-blue-600/20 border-2 border-blue-500'
                    : 'bg-gray-900/50 border-2 border-transparent hover:bg-gray-800/50'
                }
              `}
            >
              <input
                type="checkbox"
                checked={isSelected}
                onChange={() => handleToggle(option.value)}
                className="w-5 h-5 rounded border-gray-600 bg-gray-800 text-blue-600 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-900 cursor-pointer"
                aria-label={`Select ${option.label}`}
              />
              <span className="text-white font-medium flex-1">{option.label}</span>
              {isSelected && (
                <svg
                  className="w-5 h-5 text-blue-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              )}
            </label>
          );
        })}
      </div>
      {error && (
        <p
          id="socialMediaChannels-error"
          className="mt-2 text-sm text-red-400"
          role="alert"
        >
          {error}
        </p>
      )}
    </div>
  );
};
