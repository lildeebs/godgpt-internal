'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { formSchema, FormData, FormDataWithArray } from '../utils/validation';
import { apiService } from '../services/api.service';
import { SocialMediaDropdown, SOCIAL_MEDIA_OPTIONS } from '../components/SocialMediaDropdown';

export default function OnboardingForm() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    watch,
    setValue,
  } = useForm<FormDataWithArray>({
    resolver: zodResolver(formSchema),
    mode: 'onChange',
    defaultValues: {
      socialMediaChannels: [],
    },
  });

  const formValues = watch();
  const selectedChannels = formValues.socialMediaChannels || [];

  const onSubmit = async (data: FormDataWithArray) => {
    if (isSubmitting) return; // Prevent duplicate submissions

    setIsSubmitting(true);
    setSubmitError(null);

    try {
      // Convert array to comma-separated string for API
      const channelsString = Array.isArray(data.socialMediaChannels)
        ? data.socialMediaChannels.join(', ')
        : data.socialMediaChannels;

      await apiService.submitForm({
        fullName: data.fullName,
        email: data.email,
        socialMediaChannels: channelsString,
        followerCount: data.followerCount,
      });

      // Clear any draft data
      localStorage.removeItem('affiliate-onboarding-draft');

      // Redirect to success page
      router.push('/success');
    } catch (error) {
      setSubmitError(
        error instanceof Error ? error.message : 'Failed to submit form. Please try again.'
      );
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 flex items-center justify-center p-4">
      <div className="w-full max-w-2xl">
        <div className="bg-gray-800/50 backdrop-blur-lg border border-gray-700 rounded-2xl p-8 shadow-2xl">
          <h1 className="text-3xl font-bold text-white mb-2 text-center">
            Join the GodGPT Community
          </h1>
          <p className="text-gray-400 text-center mb-8">
            Ready to amplify your influence? Let's get started.
          </p>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div className="mb-6">
              <label htmlFor="fullName" className="block text-sm font-medium text-gray-300 mb-2">
                Full Name <span className="text-red-400 ml-1" aria-label="required">*</span>
              </label>
              <input
                {...register('fullName')}
                id="fullName"
                type="text"
                placeholder="Enter your full name"
                className={`w-full px-4 py-3 bg-gray-900 border rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 ${
                  errors.fullName ? 'border-red-500' : 'border-gray-700'
                }`}
                aria-required="true"
                aria-invalid={!!errors.fullName}
                aria-describedby={errors.fullName ? 'fullName-error' : undefined}
              />
              {errors.fullName && (
                <p id="fullName-error" className="mt-2 text-sm text-red-400" role="alert">
                  {errors.fullName.message}
                </p>
              )}
            </div>

            <div className="mb-6">
              <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
                Email <span className="text-red-400 ml-1" aria-label="required">*</span>
              </label>
              <input
                {...register('email')}
                id="email"
                type="email"
                placeholder="your.email@example.com"
                className={`w-full px-4 py-3 bg-gray-900 border rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 ${
                  errors.email ? 'border-red-500' : 'border-gray-700'
                }`}
                aria-required="true"
                aria-invalid={!!errors.email}
                aria-describedby={errors.email ? 'email-error' : undefined}
              />
              {errors.email && (
                <p id="email-error" className="mt-2 text-sm text-red-400" role="alert">
                  {errors.email.message}
                </p>
              )}
            </div>

            <div className="mb-6">
              <SocialMediaDropdown
                value={selectedChannels}
                onChange={(channels) => {
                  setValue('socialMediaChannels', channels, { shouldValidate: true });
                }}
                error={errors.socialMediaChannels?.message}
                required
              />
            </div>

            <div className="mb-6">
              <label htmlFor="followerCount" className="block text-sm font-medium text-gray-300 mb-2">
                Number of Followers <span className="text-red-400 ml-1" aria-label="required">*</span>
              </label>
              <input
                {...register('followerCount', { valueAsNumber: true })}
                id="followerCount"
                type="number"
                placeholder="0"
                min={0}
                max={999999999}
                className={`w-full px-4 py-3 bg-gray-900 border rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 ${
                  errors.followerCount ? 'border-red-500' : 'border-gray-700'
                }`}
                aria-required="true"
                aria-invalid={!!errors.followerCount}
                aria-describedby={errors.followerCount ? 'followerCount-error' : undefined}
              />
              {errors.followerCount && (
                <p id="followerCount-error" className="mt-2 text-sm text-red-400" role="alert">
                  {errors.followerCount.message}
                </p>
              )}
            </div>

            {submitError && (
              <div className="bg-red-900/50 border border-red-500 rounded-lg p-4">
                <p className="text-red-400 text-sm">{submitError}</p>
              </div>
            )}

            <button
              type="submit"
              disabled={!isValid || isSubmitting}
              className={`
                w-full py-4 px-6 rounded-lg font-semibold text-white
                transition-all duration-200 transform
                ${
                  isValid && !isSubmitting
                    ? 'bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 hover:scale-[1.02] active:scale-[0.98] shadow-lg hover:shadow-xl'
                    : 'bg-gray-700 cursor-not-allowed opacity-50'
                }
                focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-800
              `}
            >
              {isSubmitting ? 'Submitting...' : 'Submit'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
