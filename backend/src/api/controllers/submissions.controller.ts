import { Request, Response, NextFunction } from 'express';
import { submissionService } from '../../services/submission.service';

export const submissionsController = {
  create: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const submission = await submissionService.createSubmission(req.body);
      res.status(201).json({
        id: submission.id,
        status: submission.status,
        message: 'Form submitted successfully',
      });
    } catch (error) {
      next(error);
    }
  },
};
