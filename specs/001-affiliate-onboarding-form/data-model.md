# Data Model: Affiliate Onboarding Form

**Feature**: Affiliate Onboarding Form  
**Date**: 2026-01-07

## Entities

### AffiliateSubmission

Represents a completed form submission from an affiliate candidate.

**Fields**:
- `id` (UUID, Primary Key): Unique identifier for the submission
- `fullName` (String, Required, Max 255 chars): Affiliate's full name
- `email` (String, Required, Email format, Max 255 chars): Affiliate's email address
- `socialMediaChannels` (String, Required, Max 500 chars): Comma-separated list of main social media channels (e.g., "Instagram, TikTok, YouTube")
- `followerCount` (Integer, Required, Min 0, Max 999999999): Total number of followers across all channels
- `submittedAt` (DateTime, Required): Timestamp when form was submitted
- `status` (Enum, Required): Submission status - "pending", "processed", "failed"
- `emailSentAt` (DateTime, Nullable): Timestamp when notification email was sent
- `emailSentStatus` (String, Nullable): Status of email delivery - "sent", "failed", null
- `createdAt` (DateTime, Required, Auto): Record creation timestamp
- `updatedAt` (DateTime, Required, Auto): Record last update timestamp

**Validation Rules**:
- `fullName`: Required, non-empty, trimmed, no leading/trailing whitespace
- `email`: Required, valid email format, lowercase normalized
- `socialMediaChannels`: Required, non-empty, trimmed, at least one channel
- `followerCount`: Required, integer, non-negative, reasonable maximum (999M)
- All required fields must be present before submission

**Indexes**:
- Primary key on `id`
- Index on `email` for lookups
- Index on `submittedAt` for time-based queries
- Index on `status` for filtering

**Relationships**:
- None (standalone entity for this feature)

**State Transitions**:
1. `pending` → `processed`: When email notification is successfully sent
2. `pending` → `failed`: When email notification fails after retries
3. `failed` → `processed`: If email is successfully sent on retry

---

### DraftData (Client-Side Only)

Represents saved form progress stored in browser localStorage. Not persisted to database.

**Fields** (localStorage structure):
- `formData` (Object): Partial form data containing:
  - `fullName` (String, Optional)
  - `email` (String, Optional)
  - `socialMediaChannels` (String, Optional)
  - `followerCount` (Number, Optional)
- `savedAt` (ISO DateTime String): Timestamp when draft was last saved
- `sessionId` (String, Optional): Browser session identifier

**Storage Key**: `affiliate-onboarding-draft`

**Validation Rules**:
- Draft data is not validated (allows partial/invalid data)
- Auto-cleared after successful submission
- Auto-cleared after 30 days of inactivity (optional cleanup)

**Relationships**:
- None (client-side only, not in database)

---

## Database Schema (Prisma)

```prisma
model AffiliateSubmission {
  id              String   @id @default(uuid())
  fullName        String   @db.VarChar(255)
  email           String   @db.VarChar(255)
  socialMediaChannels String @db.VarChar(500)
  followerCount   Int
  submittedAt     DateTime @default(now())
  status          SubmissionStatus @default(PENDING)
  emailSentAt     DateTime?
  emailSentStatus String?
  createdAt       DateTime @default(now())
  updatedAt       DateTime @updatedAt

  @@index([email])
  @@index([submittedAt])
  @@index([status])
}

enum SubmissionStatus {
  PENDING
  PROCESSED
  FAILED
}
```

---

## Data Flow

1. **User Input** → Form fields (client-side)
2. **Auto-save** → localStorage (draft data, client-side)
3. **Form Submission** → API endpoint → Validation → Database (AffiliateSubmission)
4. **Email Notification** → Resend API → Update emailSentAt and emailSentStatus
5. **Success Response** → Clear draft data from localStorage

---

## Privacy & Security Considerations

- Email addresses are considered PII (Personally Identifiable Information)
- **Data retention policy**: Submissions will be retained for 1 year from submission date, then archived. Archived data will be retained for an additional 2 years for compliance purposes, then permanently deleted. This policy may be adjusted based on business requirements and legal obligations.
- No sensitive data stored in draft (localStorage) - only form fields
- All data transmitted over HTTPS
- Input sanitization before storage
- No data shared with third parties except email service (Resend)

---

## Future Considerations

- Potential addition of submission status tracking
- Potential addition of admin dashboard to view submissions
- Potential addition of export functionality
- Potential addition of duplicate submission detection (same email within time window)
