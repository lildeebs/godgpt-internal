import { z } from 'zod';

// Schema for form validation (uses array for socialMediaChannels)
export const formSchema = z.object({
  fullName: z
    .string()
    .min(1, 'Full name is required')
    .max(255, 'Full name must be 255 characters or less')
    .transform((val) => val.trim()),
  email: z
    .string()
    .min(1, 'Email is required')
    .email('Please enter a valid email address')
    .max(255, 'Email must be 255 characters or less')
    .transform((val) => val.trim().toLowerCase()),
  socialMediaChannels: z
    .array(z.enum(['Facebook', 'Instagram', 'YouTube', 'TikTok']))
    .min(1, 'Please select at least one social media channel'),
  followerCount: z
    .number({
      required_error: 'Follower count is required',
      invalid_type_error: 'Follower count must be a number',
    })
    .int('Follower count must be a whole number')
    .min(0, 'Follower count must be 0 or greater')
    .max(999999999, 'Follower count exceeds maximum value'),
});

export type FormDataWithArray = z.infer<typeof formSchema>;

// Type for API submission (socialMediaChannels as string)
export type FormData = Omit<FormDataWithArray, 'socialMediaChannels'> & {
  socialMediaChannels: string;
};
