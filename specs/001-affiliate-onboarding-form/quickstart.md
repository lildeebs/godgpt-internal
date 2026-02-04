# Quickstart Guide: Affiliate Onboarding Form

**Feature**: Affiliate Onboarding Form  
**Date**: 2026-01-07

## Overview

This guide provides test scenarios and setup instructions for the affiliate onboarding form feature. Use this to understand the expected behavior and test the implementation.

## Test Scenarios

### Scenario 1: Successful Form Submission (Happy Path)

**Given**: User visits the onboarding form  
**When**: 
1. User enters valid data in all fields:
   - Full Name: "Jane Smith"
   - Email: "jane.smith@example.com"
   - Social Media Channels: "Instagram, TikTok"
   - Follower Count: 75000
2. User clicks Submit button

**Then**:
- Form validates successfully
- User is redirected to success page (Page 2)
- Success animation plays
- Thank you message is displayed
- Email notification is sent to dionne.ng@aelf.io
- Submission is stored in database with status "pending"
- Draft data is cleared from localStorage

**Expected API Response**:
```json
{
  "id": "uuid-here",
  "status": "pending",
  "message": "Form submitted successfully"
}
```

---

### Scenario 2: Real-time Email Validation

**Given**: User is on the form page  
**When**: 
1. User enters invalid email: "not-an-email"
2. User moves to next field (blur event)

**Then**:
- Validation error appears immediately (<500ms)
- Error message: "Please enter a valid email address"
- Submit button remains disabled
- Error is announced to screen readers

**When**: User corrects email to "valid@example.com"  
**Then**:
- Error message disappears immediately
- Field is marked as valid

---

### Scenario 3: Required Field Validation

**Given**: User is on the form page  
**When**: User attempts to submit with empty required fields  
**Then**:
- Validation errors appear for all empty required fields
- Submit button is disabled
- Error messages are clear and actionable
- Focus moves to first invalid field

**Expected Error Messages**:
- Full Name: "Full name is required"
- Email: "Email is required"
- Social Media Channels: "Social media channels are required"
- Follower Count: "Follower count is required"

---

### Scenario 4: Auto-save Draft Functionality

**Given**: User is filling out the form  
**When**: 
1. User enters data in fields (e.g., name and email)
2. User navigates away or closes browser
3. User returns to the form

**Then**:
- Previously entered data is restored from localStorage
- Form fields are pre-populated
- User can continue filling the form
- Draft is saved within 2 seconds of last input

**Test Steps**:
1. Fill name and email fields
2. Wait 2+ seconds
3. Check localStorage: `affiliate-onboarding-draft`
4. Refresh page
5. Verify fields are pre-populated

---

### Scenario 5: Follower Count Validation

**Given**: User is on the form page  
**When**: User enters non-numeric value in follower count field  
**Then**:
- Field rejects non-numeric input (or shows error)
- Error message: "Follower count must be a number"
- Submit button remains disabled

**When**: User enters negative number  
**Then**:
- Validation error appears
- Error message: "Follower count must be 0 or greater"

---

### Scenario 6: Success Page Animation

**Given**: User has successfully submitted the form  
**When**: User is redirected to success page (Page 2)  
**Then**:
- Success animation plays automatically (<1s after page load)
- Animation is smooth (60fps)
- Animation respects `prefers-reduced-motion` setting
- Thank you message is displayed with correct text
- Contact email (dionne.ng@aelf.io) is visible and accessible

**Expected Message**:
> "Thank you for submitting the form! Ready to amplify your influence with GodGPT? Share this with your people. Invite them into a new class of thought. Everything changes when you stop asking what this is — and start asking who you become by using it. Should there be any enquiries, please direct them to dionne.ng@aelf.io"

---

### Scenario 7: Mobile Responsive Design

**Given**: User accesses form on mobile device (320px width)  
**When**: User views and interacts with the form  
**Then**:
- Form is fully functional and readable
- Touch targets are minimum 44x44px
- Form fields are appropriately sized
- Submit button is easily tappable
- Success page displays correctly

**Test Devices**:
- iPhone SE (375px)
- iPhone 12/13 (390px)
- Android (360px)
- iPad (768px)

---

### Scenario 8: Keyboard Navigation

**Given**: User navigates using only keyboard  
**When**: User tabs through form fields  
**Then**:
- All fields are accessible via Tab key
- Focus indicators are visible
- Submit button is accessible via keyboard
- Error messages are announced to screen readers
- Form can be completed without mouse

---

### Scenario 9: Email Notification

**Given**: Form is successfully submitted  
**When**: Backend processes submission  
**Then**:
- Email is sent to dionne.ng@aelf.io within 30 seconds
- Email contains all submitted form data:
  - Full Name
  - Email
  - Social Media Channels
  - Follower Count
  - Submission timestamp
- Database record is updated with `emailSentAt` and `emailSentStatus`

---

### Scenario 10: Duplicate Submission Prevention

**Given**: User has submitted the form  
**When**: User attempts to submit again immediately  
**Then**:
- Submit button is disabled after first submission
- Loading state is shown
- Duplicate submissions are prevented
- User sees success page only once

---

### Scenario 11: Network Error Handling

**Given**: User submits form  
**When**: Network connection is lost during submission  
**Then**:
- User sees friendly error message
- Form data is preserved (not lost)
- User can retry submission
- Draft data remains in localStorage

**Expected Error Message**:
> "Unable to submit form. Please check your connection and try again."

---

### Scenario 12: Accessibility - Screen Reader

**Given**: User uses screen reader (NVDA/JAWS/VoiceOver)  
**When**: User navigates the form  
**Then**:
- All form fields have associated labels
- Error messages are announced
- Required field indicators are announced
- Success message is announced
- Form is fully usable with screen reader

---

## Setup Instructions

### Prerequisites

- Node.js 20+ installed
- PostgreSQL database (or SQLite for development)
- Resend API key (for email notifications)
- Git repository initialized

### Environment Variables

Create `.env` file:

```env
# Database
DATABASE_URL="postgresql://user:password@localhost:5432/affiliate_db"

# Email Service
RESEND_API_KEY="re_xxxxxxxxxxxxx"
NOTIFICATION_EMAIL="dionne.ng@aelf.io"

# Application
NEXT_PUBLIC_API_URL="http://localhost:3000"
NODE_ENV="development"
```

### Installation Steps

1. **Install dependencies**:
   ```bash
   # Frontend
   cd frontend
   npm install
   
   # Backend
   cd ../backend
   npm install
   ```

2. **Setup database**:
   ```bash
   cd backend
   npx prisma migrate dev
   npx prisma generate
   ```

3. **Start development servers**:
   ```bash
   # Terminal 1 - Frontend
   cd frontend
   npm run dev
   
   # Terminal 2 - Backend
   cd backend
   npm run dev
   ```

4. **Access application**:
   - Frontend: http://localhost:3000
   - Backend API: http://localhost:3001

### Testing

```bash
# Frontend tests
cd frontend
npm test

# Backend tests
cd backend
npm test

# E2E tests
npm run test:e2e
```

---

## Manual Testing Checklist

- [ ] Form loads in <2 seconds
- [ ] All required fields are marked
- [ ] Real-time validation works (<500ms)
- [ ] Auto-save works (check localStorage)
- [ ] Form submission works
- [ ] Success page displays correctly
- [ ] Animation plays smoothly
- [ ] Email notification is sent
- [ ] Mobile responsive design works
- [ ] Keyboard navigation works
- [ ] Screen reader compatibility
- [ ] Error handling works
- [ ] Draft restoration works

---

## Troubleshooting

**Issue**: Form not submitting  
**Solution**: Check browser console for errors, verify API endpoint is running

**Issue**: Email not sending  
**Solution**: Verify Resend API key is correct, check backend logs

**Issue**: Draft not saving  
**Solution**: Check browser localStorage support, verify debounce timing

**Issue**: Validation not working  
**Solution**: Check React Hook Form setup, verify Zod schema
