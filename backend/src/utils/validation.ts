import { z } from 'zod';

export const submissionSchema = z.object({
  fullName: z
    .string()
    .min(1, 'Full name is required')
    .max(255, 'Full name must be 255 characters or less')
    .transform((val) => val.trim()),
  email: z
    .string()
    .min(1, 'Email is required')
    .max(255, 'Email must be 255 characters or less')
    .email('Please enter a valid email address')
    .transform((val) => val.trim().toLowerCase()),
  socialMediaChannels: z
    .string()
    .min(1, 'Social media channels are required')
    .max(500, 'Social media channels must be 500 characters or less')
    .transform((val) => val.trim())
    .refine(
      (val) => {
        const validOptions = ['Facebook', 'Instagram', 'YouTube', 'TikTok'];
        const selected = val.split(',').map((s) => s.trim());
        return selected.every((channel) => validOptions.includes(channel));
      },
      {
        message: 'Social media channels must be selected from: Facebook, Instagram, YouTube, TikTok',
      }
    ),
  followerCount: z
    .number()
    .int('Follower count must be a whole number')
    .min(0, 'Follower count must be 0 or greater')
    .max(999999999, 'Follower count exceeds maximum value'),
});

export type SubmissionInput = z.infer<typeof submissionSchema>;
