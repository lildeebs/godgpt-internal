import { Resend } from 'resend';
import { config } from '../config/env';

// Only initialize Resend if API key is provided
const resend = config.resendApiKey ? new Resend(config.resendApiKey) : null;

export interface EmailData {
  fullName: string;
  email: string;
  socialMediaChannels: string;
  followerCount: number;
  submittedAt: Date;
}

export const emailService = {
  async sendNotification(data: EmailData): Promise<{ success: boolean; messageId?: string; error?: string }> {
    if (!config.resendApiKey || !resend) {
      console.warn('RESEND_API_KEY is not configured. Email notification skipped.');
      return { success: false, error: 'Email service not configured' };
    }

    try {
      const emailBody = `
New Affiliate Onboarding Submission

Full Name: ${data.fullName}
Email: ${data.email}
Social Media Channels: ${data.socialMediaChannels}
Follower Count: ${data.followerCount.toLocaleString()}
Submitted At: ${data.submittedAt.toISOString()}
      `.trim();

      const result = await resend.emails.send({
        from: 'onboarding@aelf.io',
        to: config.notificationEmail,
        subject: `New Affiliate Submission: ${data.fullName}`,
        text: emailBody,
      });

      if (result.error) {
        console.error('Resend API error:', result.error);
        return { success: false, error: result.error.message };
      }

      return { success: true, messageId: result.data?.id };
    } catch (error) {
      console.error('Email sending error:', error);
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error',
      };
    }
  },
};
