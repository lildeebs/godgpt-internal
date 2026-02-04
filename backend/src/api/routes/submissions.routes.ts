import { Router } from 'express';
import { submissionsController } from '../controllers/submissions.controller';
import { submissionRateLimit, securityHeaders } from '../middleware/security.middleware';
import { validate } from '../middleware/validation.middleware';
import { submissionSchema } from '../../utils/validation';

const router = Router();

// Apply security headers to all routes
router.use(securityHeaders);

// POST /api/submissions - Submit form
router.post(
  '/',
  submissionRateLimit,
  validate(submissionSchema),
  submissionsController.create
);

export { router as submissionsRouter };
