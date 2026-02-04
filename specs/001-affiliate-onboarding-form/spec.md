# Feature Specification: Affiliate Onboarding Form

**Feature Branch**: `001-affiliate-onboarding-form`  
**Created**: 2026-01-07  
**Status**: Draft  
**Input**: User description: "I want to create a form to allow the affiliates I'm onboarding into a online community base. It needs to be 2 pages. The first page will have the following field where visitors can enter their full name, email, main social media channel(s) and a no. of followers. All fields are compulsory. It should also have a submit button. The form should send an email notification to dionne.ng@aelf.io whenever there is a submission. The design of the form needs to adopt a tech-like modern aesthetic, dark, moody but also clean and futuristic with cool animations. Add real-time form validation, auto-save draft messages for all pages where necessary. For page 2, add a success animation when the form is submitted. Also add a message that says, "Thank you for submitting the form! Ready to amplify your influence with GodGPT? Share this with your people. Invite them into a new class of thought. Everything changes when you stop asking what this is — and start asking who you become by using it. Should there be any enquiries, please direct them to dionne.ng@aelf.io""

**Update (2026-01-07)**: Main social media channel(s) field changed to dropdown/multi-select with predefined options: Facebook, Instagram, YouTube, TikTok. Users can select one or more channels from the dropdown.

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Submit Affiliate Onboarding Form (Priority: P1)

An affiliate candidate visits the onboarding form and completes all required information to join the online community. They enter their full name, email address, select main social media channel(s) from a dropdown (Facebook, Instagram, YouTube, TikTok), and number of followers. All fields are validated in real-time. Upon successful submission, they are redirected to a success page with an animation and confirmation message. An email notification is automatically sent to dionne.ng@aelf.io with the submitted information.

**Why this priority**: This is the core functionality that enables the primary business goal of onboarding affiliates. Without this, the feature cannot deliver value.

**Independent Test**: Can be fully tested by completing the form with valid data and verifying: (1) form accepts all required inputs, (2) validation prevents invalid submissions, (3) success page displays after submission, (4) email notification is sent. This delivers the ability to collect affiliate information and notify the administrator.

**Acceptance Scenarios**:

1. **Given** a user visits the onboarding form, **When** they fill in all required fields (full name, email, select social media channel(s) from dropdown, follower count) with valid data, **Then** the submit button becomes enabled and they can submit the form
2. **Given** a user submits a valid form, **When** the submission is processed, **Then** they are redirected to page 2 showing a success animation and confirmation message
3. **Given** a form is successfully submitted, **When** the system processes it, **Then** an email notification is sent to dionne.ng@aelf.io containing all submitted information
4. **Given** a user attempts to submit with missing required fields, **When** they click submit, **Then** validation errors are displayed and submission is prevented
5. **Given** a user enters invalid email format, **When** they move to the next field or attempt to submit, **Then** real-time validation shows an error message and prevents submission

---

### User Story 2 - Real-time Validation and Auto-save Draft (Priority: P2)

As the user fills out the form, the system validates each field in real-time, providing immediate feedback. Additionally, the form automatically saves draft data to prevent data loss if the user navigates away or closes the browser. Users can return and continue filling the form with their previously entered data.

**Why this priority**: This significantly improves user experience by preventing frustration from lost data and providing immediate feedback. While not critical for MVP, it greatly enhances usability and reduces abandonment.

**Independent Test**: Can be fully tested by: (1) entering data and verifying real-time validation messages appear, (2) filling partial form and closing browser, (3) returning and verifying data is restored. This delivers improved user experience and data protection.

**Acceptance Scenarios**:

1. **Given** a user is filling the email field, **When** they enter an invalid email format, **Then** a validation error message appears immediately below the field
2. **Given** a user has entered data in the form, **When** they navigate away or close the browser, **Then** the form data is automatically saved as a draft
3. **Given** a user returns to the form with saved draft data, **When** they load the form, **Then** previously entered fields are pre-populated with their draft data
4. **Given** a user corrects a validation error, **When** the field becomes valid, **Then** the error message disappears immediately

---

### User Story 3 - Success Page with Animation and Sharing Message (Priority: P2)

After successful form submission, users are presented with an engaging success page featuring a smooth animation and a compelling message encouraging them to share the form with others. The message includes contact information for inquiries.

**Why this priority**: This completes the user journey and provides a positive closing experience. It also serves as a conversion tool to encourage sharing and viral growth. While the core functionality works without this, it significantly enhances the user experience and business value.

**Independent Test**: Can be fully tested by submitting a form and verifying: (1) success page displays with animation, (2) message text is correct and readable, (3) contact email is displayed. This delivers a polished user experience and encourages sharing.

**Acceptance Scenarios**:

1. **Given** a user successfully submits the form, **When** they are redirected to page 2, **Then** a success animation plays automatically
2. **Given** a user is on the success page, **When** the page loads, **Then** they see the complete thank you message including the sharing prompt and contact email
3. **Given** the success page is displayed, **When** viewed on mobile or desktop, **Then** the animation and message are properly displayed and accessible

---

### Edge Cases

- What happens when the user's internet connection is lost during form submission?
- How does the system handle email delivery failures (notification to dionne.ng@aelf.io fails)?
- What happens if the user submits the form multiple times rapidly?
- How does the system handle very long names or email addresses?
- What happens when follower count is entered as text instead of numbers?
- How does the system handle special characters in the name field? (RESOLVED: Social media channels are from predefined dropdown options, no special character handling needed)
- What happens if the user has multiple social media channels - how are they captured? (RESOLVED: Multi-select dropdown allows multiple selections)
- How does auto-save handle browser storage limits or private/incognito mode?
- What happens if the success page animation fails to load?

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: System MUST provide a 2-page form for affiliate onboarding
- **FR-002**: System MUST include fields for: full name, email, main social media channel(s), and number of followers on page 1
- **FR-002a**: System MUST provide a dropdown field for main social media channel(s) with the following options: Facebook, Instagram, YouTube, TikTok
- **FR-002b**: System MUST allow users to select one or more social media channels from the dropdown options
- **FR-003**: System MUST mark all form fields as required and prevent submission if any required field is empty
- **FR-004**: System MUST validate email format in real-time as the user types or when the field loses focus
- **FR-005**: System MUST validate that follower count is a valid number (numeric input)
- **FR-006**: System MUST provide a submit button on page 1 that is only enabled when all required fields are valid
- **FR-007**: System MUST send an email notification to dionne.ng@aelf.io whenever a form is successfully submitted
- **FR-008**: System MUST include all submitted form data in the email notification
- **FR-009**: System MUST redirect users to page 2 (success page) after successful form submission
- **FR-010**: System MUST display a success animation on page 2 when the form is submitted
- **FR-011**: System MUST display the specified thank you message on page 2, including the sharing prompt and contact email (dionne.ng@aelf.io)
- **FR-012**: System MUST implement real-time validation for all form fields, showing error messages immediately when validation fails
- **FR-013**: System MUST automatically save draft form data as the user types or when fields lose focus
- **FR-014**: System MUST restore saved draft data when the user returns to the form
- **FR-015**: System MUST adopt a tech-like modern aesthetic with dark, moody, clean, and futuristic design
- **FR-016**: System MUST include cool animations throughout the form experience
- **FR-017**: System MUST be responsive and work on both mobile and desktop devices
- **FR-018**: System MUST be accessible, complying with WCAG 2.1 AA standards
- **FR-019**: System MUST handle form submission errors gracefully and display user-friendly error messages
- **FR-020**: System MUST prevent duplicate submissions if the user clicks submit multiple times

### Key Entities *(include if feature involves data)*

- **Affiliate Submission**: Represents a single form submission containing: full name (text), email (email format), social media channel(s) (selected from predefined options: Facebook, Instagram, YouTube, TikTok - stored as comma-separated string or array), follower count (number), submission timestamp, and submission status
- **Draft Data**: Represents saved form progress containing: partial form data, last saved timestamp, and browser session identifier

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: Users can complete the entire form submission process (page 1 to page 2) in under 2 minutes
- **SC-002**: 95% of form submissions result in successful email notifications being sent to dionne.ng@aelf.io
- **SC-003**: 90% of users who start filling the form successfully complete and submit it on their first attempt
- **SC-004**: Form validation errors are displayed within 500ms of user input or field blur
- **SC-005**: Draft data is saved automatically within 2 seconds of user input or field blur
- **SC-006**: Success page animation loads and plays within 1 second of page 2 being displayed
- **SC-007**: Form is fully functional and accessible on mobile devices (screen sizes 320px and above) and desktop devices (screen sizes 1024px and above)
- **SC-008**: All form fields are clearly marked as required with visible indicators that are accessible to screen readers
- **SC-009**: Email notifications are delivered to dionne.ng@aelf.io within 30 seconds of form submission

## Non-Functional Requirements

### Design Requirements

- **NFR-001**: Form MUST use a dark color scheme with moody, futuristic aesthetic
- **NFR-002**: Animations MUST be smooth (60fps) and purposeful, enhancing user experience without causing distraction
- **NFR-003**: Form MUST maintain visual consistency with modern, tech-like design language
- **NFR-004**: All text MUST be readable with minimum 4.5:1 contrast ratio (WCAG AA compliance)
- **NFR-005**: Form layout MUST be clean and uncluttered, with appropriate spacing and visual hierarchy

### Performance Requirements

- **NFR-006**: Form page MUST load in under 2 seconds on standard broadband connection
- **NFR-007**: Form validation MUST respond within 500ms of user input
- **NFR-008**: Auto-save draft functionality MUST not cause noticeable performance degradation
- **NFR-009**: Success page animation MUST not cause page performance issues or jank

### Accessibility Requirements

- **NFR-010**: Form MUST be fully keyboard navigable
- **NFR-011**: All form fields MUST have associated labels that are accessible to screen readers
- **NFR-012**: Error messages MUST be announced to screen readers
- **NFR-013**: Success animation MUST have a reduced motion option for users with motion sensitivity
- **NFR-014**: All interactive elements MUST meet minimum touch target size of 44x44px

### Security Requirements

- **NFR-015**: Form data MUST be transmitted over HTTPS
- **NFR-016**: All user inputs MUST be validated and sanitized to prevent XSS attacks
- **NFR-017**: Form submission MUST be protected against CSRF attacks
- **NFR-018**: Draft data stored locally MUST not contain sensitive information in plain text

## Assumptions

- Users have JavaScript enabled in their browsers
- Users have email access to receive notifications (for dionne.ng@aelf.io)
- Social media channel field is a dropdown/multi-select with predefined options: Facebook, Instagram, YouTube, TikTok. Users can select one or more channels.
- Follower count is expected to be a whole number (integers only, no decimals)
- Browser supports local storage for draft functionality
- Email service is available and configured for sending notifications
- Users understand that all fields are required before they can submit

## Constitution Compliance Notes

### Authentication Exception

**Constitution Principle III** requires "Authentication and authorization MUST be implemented for all data access." However, this is a **public form** with no user accounts or authentication system. 

**Justification for Exception**:
- This is a public-facing affiliate onboarding form accessible to anyone
- No user accounts or authentication system exists
- Data access control is implemented via:
  - Rate limiting (prevents abuse)
  - Input validation and sanitization (prevents malicious input)
  - HTTPS transmission (secures data in transit)
  - Server-side validation (ensures data integrity)
- Form submissions are public-facing by design - no restricted access needed
- Privacy protection is handled via input sanitization and secure transmission, not user authentication

This exception is documented here per constitution governance requirements for justified exceptions.

## Dependencies

- Email service provider or SMTP server for sending notifications
- Form validation library or framework (if using third-party)
- Animation library or framework (if using third-party)
- Browser storage API for draft functionality

## Out of Scope

- User authentication or login functionality
- Admin dashboard to view submissions
- Ability to edit submissions after they are submitted
- Integration with social media APIs to verify follower counts
- Multi-language support
- Form analytics or tracking beyond basic submission
- Ability for users to upload files or images
