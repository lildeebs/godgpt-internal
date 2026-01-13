# React Components Location

The React components for this campaign are located in the main codebase:

## Location

```
src/components/
├── LunarNewYearBanner.tsx          # Banner component for chatbot
├── ChatbotJanuaryForm.tsx          # Form component for chatbot
├── DownloadBanner.tsx              # Original download banner (legacy)
└── ChatbotIntegrationExample.tsx  # Complete integration example

src/app/
└── banner-preview/
    └── page.tsx                    # Preview page for banner
```

## Why Not Moved?

These components are part of the main Next.js application and should remain in `src/components/` for:
- Proper TypeScript compilation
- Next.js routing and imports
- Shared usage across the application
- Standard project structure

## Usage

Import them in your chatbot interface:

```tsx
import LunarNewYearBanner from '@/components/LunarNewYearBanner';
import ChatbotJanuaryForm from '@/components/ChatbotJanuaryForm';
```

See `Documentation/CHATBOT_INTEGRATION_GUIDE.md` for detailed usage instructions.
