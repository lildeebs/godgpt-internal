import { prisma } from './prisma.service';
import { emailService, EmailData } from './email.service';
import { SubmissionInput } from '../utils/validation';
import validator from 'validator';

export const submissionService = {
  async createSubmission(input: SubmissionInput) {
    // Sanitize inputs
    const sanitizedInput = {
      fullName: validator.escape(input.fullName.trim()),
      email: validator.normalizeEmail(input.email.trim()) || input.email.trim().toLowerCase(),
      socialMediaChannels: validator.escape(input.socialMediaChannels.trim()),
      followerCount: input.followerCount,
    };

    // Create submission record
    const submission = await prisma.affiliateSubmission.create({
      data: {
        fullName: sanitizedInput.fullName,
        email: sanitizedInput.email,
        socialMediaChannels: sanitizedInput.socialMediaChannels,
        followerCount: sanitizedInput.followerCount,
        status: 'PENDING',
      },
    });

    // Send email notification asynchronously
    const emailData: EmailData = {
      fullName: sanitizedInput.fullName,
      email: sanitizedInput.email,
      socialMediaChannels: sanitizedInput.socialMediaChannels,
      followerCount: sanitizedInput.followerCount,
      submittedAt: submission.submittedAt,
    };

    // Attempt to send email (don't block submission)
    emailService.sendNotification(emailData)
      .then((result) => {
        // Update submission with email status
        prisma.affiliateSubmission.update({
          where: { id: submission.id },
          data: {
            emailSentAt: result.success ? new Date() : null,
            emailSentStatus: result.success ? 'sent' : 'failed',
            status: result.success ? 'PROCESSED' : 'FAILED',
          },
        }).catch((error) => {
          console.error('Failed to update email status:', error);
        });
      })
      .catch((error) => {
        console.error('Email notification failed:', error);
        // Update status to failed
        prisma.affiliateSubmission.update({
          where: { id: submission.id },
          data: {
            emailSentStatus: 'failed',
            status: 'FAILED',
          },
        }).catch((updateError) => {
          console.error('Failed to update email status:', updateError);
        });
      });

    return submission;
  },
};
