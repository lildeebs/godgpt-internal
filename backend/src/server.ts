import express from 'express';
import cors from 'cors';
import { config } from './config/env';
import { errorHandler } from './api/middleware/error-handler.middleware';
import { submissionsRouter } from './api/routes/submissions.routes';

const app = express();

// Middleware
app.use(cors({
  origin: config.corsOrigin,
  credentials: true,
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// API Routes
app.use('/api/submissions', submissionsRouter);

// Error handling (must be last)
app.use(errorHandler);

const PORT = config.port;

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
  console.log(`📧 Notification email: ${config.notificationEmail}`);
});

export default app;
