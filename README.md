# Affiliate Onboarding Form

A modern, accessible 2-page form for onboarding affiliates into the GodGPT online community.

## Features

- ✅ 2-page form with required fields (name, email, social media channels, follower count)
- ✅ Real-time form validation
- ✅ Auto-save draft functionality
- ✅ Email notifications to dionne.ng@aelf.io
- ✅ Success page with animation
- ✅ Dark, futuristic design
- ✅ Mobile-responsive
- ✅ WCAG 2.1 AA accessible
- ✅ Secure (HTTPS, input sanitization, CSRF protection)

## Tech Stack

**Frontend:**
- Next.js 14+ (React 18+)
- TypeScript 5+
- React Hook Form + Zod
- Framer Motion
- Tailwind CSS

**Backend:**
- Node.js 20+
- Express.js
- TypeScript 5+
- Prisma ORM
- PostgreSQL
- Resend (email service)

## Setup

### Prerequisites

- Node.js 20+
- PostgreSQL database
- Resend API key

### Installation

1. **Clone and install dependencies:**

```bash
# Frontend
cd frontend
npm install

# Backend
cd ../backend
npm install
```

2. **Configure environment variables:**

```bash
# Backend - copy .env.example to .env and fill in values
cd backend
cp .env.example .env
# Edit .env with your DATABASE_URL and RESEND_API_KEY

# Frontend - copy .env.example to .env.local
cd ../frontend
cp .env.example .env.local
# Edit .env.local if needed (defaults should work for local dev)
```

3. **Setup database:**

```bash
cd backend
npx prisma generate
npx prisma migrate dev --name init
```

4. **Start development servers:**

```bash
# Terminal 1 - Backend
cd backend
npm run dev

# Terminal 2 - Frontend
cd frontend
npm run dev
```

5. **Access the application:**

- Frontend: http://localhost:3000/onboarding
- Backend API: http://localhost:3001
- Health check: http://localhost:3001/health

## Project Structure

```
.
├── frontend/
│   ├── src/
│   │   ├── app/          # Next.js App Router pages
│   │   ├── components/   # React components
│   │   ├── pages/        # Page components
│   │   ├── services/     # API services
│   │   ├── hooks/        # Custom React hooks
│   │   ├── utils/        # Utilities (validation)
│   │   └── styles/       # Global styles
│   └── package.json
├── backend/
│   ├── src/
│   │   ├── api/          # API routes and middleware
│   │   ├── services/     # Business logic
│   │   ├── config/       # Configuration
│   │   └── utils/        # Utilities
│   ├── prisma/           # Database schema
│   └── package.json
└── specs/                # Specification documents
```

## Development

### Running Tests

```bash
# Frontend tests (when added)
cd frontend
npm test

# Backend tests (when added)
cd backend
npm test
```

### Database Management

```bash
cd backend

# Generate Prisma client
npm run db:generate

# Create migration
npm run db:migrate

# Open Prisma Studio
npm run db:studio
```

## API Endpoints

### POST /api/submissions

Submit affiliate onboarding form.

**Request:**
```json
{
  "fullName": "John Doe",
  "email": "john@example.com",
  "socialMediaChannels": "Instagram, TikTok",
  "followerCount": 50000
}
```

**Response:**
```json
{
  "id": "uuid",
  "status": "pending",
  "message": "Form submitted successfully"
}
```

## Constitution Compliance

This project follows the Affiliate Onboarding Platform Constitution:
- ✅ Mobile & Web Friendly Design
- ✅ Accessibility & User-Friendliness (WCAG 2.1 AA)
- ✅ Security & Data Privacy Priority
- ✅ Required Fields Enforcement

## License

ISC
