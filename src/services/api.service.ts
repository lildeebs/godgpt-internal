import { config } from '../config/env';

export interface SubmissionRequest {
  fullName: string;
  email: string;
  socialMediaChannels: string;
  followerCount: number;
}

export interface SubmissionResponse {
  id: string;
  status: string;
  message: string;
}

export interface ApiError {
  error: string;
  message?: string;
  details?: Array<{ field: string; message: string }>;
}

export const apiService = {
  async submitForm(data: SubmissionRequest): Promise<SubmissionResponse> {
    const response = await fetch(`${config.apiUrl}/api/submissions`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const error: ApiError = await response.json();
      throw new Error(error.message || error.error || 'Failed to submit form');
    }

    return response.json();
  },
};
