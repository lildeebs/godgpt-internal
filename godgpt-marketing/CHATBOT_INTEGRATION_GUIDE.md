# Chatbot Integration Guide - Lunar New Year Reading

This guide explains how to integrate the January reading form into your GodGPT chatbot interface at `https://godgpt.fun/en`.

## Overview

Instead of redirecting users to a separate landing page, the form is integrated directly into the chatbot conversation flow. Users can:
1. See a banner prompting them to get their Lunar New Year reading
2. Fill out the form within the chat interface
3. Receive confirmation and continue the conversation

## Components Created

### 1. `LunarNewYearBanner.tsx`
A dismissible banner component that prompts users to get their reading.

**Props:**
- `onGetReading?: () => void` - Callback when user clicks "Get Started"
- `onDismiss?: () => void` - Callback when user dismisses banner
- `compact?: boolean` - Use compact version for chat interface

**Usage:**
```tsx
<LunarNewYearBanner
  onGetReading={() => setShowForm(true)}
  onDismiss={() => console.log('Dismissed')}
  compact={true}
/>
```

### 2. `ChatbotJanuaryForm.tsx`
A form component designed to work within the chatbot interface.

**Props:**
- `onComplete?: (data) => void` - Callback when form is submitted successfully
- `onCancel?: () => void` - Callback when user cancels

**Usage:**
```tsx
<ChatbotJanuaryForm
  onComplete={(data) => {
    // Handle form completion
    // Send data to backend
    // Show success message
  }}
  onCancel={() => setShowForm(false)}
/>
```

### 3. `ChatbotIntegrationExample.tsx`
Example component showing how to integrate both components into your chatbot.

## Integration Steps

### Step 1: Add Banner to Chat Interface

In your main chat component, add the banner:

```tsx
import LunarNewYearBanner from '@/components/LunarNewYearBanner';

function ChatInterface() {
  const [showForm, setShowForm] = useState(false);
  
  return (
    <div className="chat-container">
      {/* Show banner when form is not visible */}
      {!showForm && (
        <LunarNewYearBanner
          onGetReading={() => setShowForm(true)}
          compact={true}
        />
      )}
      
      {/* Rest of your chat UI */}
    </div>
  );
}
```

### Step 2: Show Form in Chat Flow

When user clicks "Get Started", show the form:

```tsx
import ChatbotJanuaryForm from '@/components/ChatbotJanuaryForm';

function ChatInterface() {
  const [showForm, setShowForm] = useState(false);
  
  return (
    <div className="chat-container">
      {showForm && (
        <ChatbotJanuaryForm
          onComplete={(data) => {
            // Handle completion
            handleFormSubmission(data);
            setShowForm(false);
          }}
          onCancel={() => setShowForm(false)}
        />
      )}
    </div>
  );
}
```

### Step 3: Handle Form Submission

Create a handler to process the form data:

```tsx
async function handleFormSubmission(data: {
  email: string;
  question1: string;
  question2: string;
  question3: string;
}) {
  // 1. Send to your backend API
  try {
    const response = await fetch('/api/january-reading', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        ...data,
        source: 'godgpt-chatbot',
        timestamp: new Date().toISOString(),
      }),
    });
    
    if (response.ok) {
      // 2. Show success message in chat
      addChatMessage({
        type: 'assistant',
        content: 'Your January reading is on its way! Check your email in a few minutes.',
      });
      
      // 3. Continue conversation
      continueConversation();
    }
  } catch (error) {
    // Handle error
    addChatMessage({
      type: 'assistant',
      content: 'Sorry, something went wrong. Please try again.',
    });
  }
}
```

### Step 4: Add Chatbot Prompt

You can also trigger the form via chatbot prompts. Add this to your chatbot's prompt system:

```tsx
// In your chatbot message handler
function handleUserMessage(message: string) {
  const lowerMessage = message.toLowerCase();
  
  // Detect if user wants January reading
  if (
    lowerMessage.includes('january') ||
    lowerMessage.includes('lunar new year') ||
    lowerMessage.includes('reading') ||
    lowerMessage.includes('theme')
  ) {
    // Show the form
    setShowForm(true);
    
    // Optional: Send a chatbot response
    return {
      type: 'assistant',
      content: "I'd love to help you get your personalized January reading! Let me collect a few quick details...",
    };
  }
  
  // Handle other messages normally
  return processNormalMessage(message);
}
```

## Backend API Endpoint

Create an endpoint to handle form submissions:

```typescript
// /api/january-reading/route.ts (Next.js App Router)
// OR /api/january-reading.ts (Next.js Pages Router)

export async function POST(request: Request) {
  const data = await request.json();
  
  // Validate data
  if (!data.email || !data.email.includes('@')) {
    return Response.json({ error: 'Invalid email' }, { status: 400 });
  }
  
  // Save to database
  // Send email notification
  // Process the reading request
  
  return Response.json({ success: true });
}
```

## Styling

The components use Tailwind CSS and match your existing GodGPT design:
- Purple/pink gradient colors
- Dark theme
- Rounded corners
- Smooth transitions

## User Flow

1. **User sees banner** → "Get your Lunar New Year Reading"
2. **User clicks "Get Started"** → Form appears in chat
3. **User fills form** → Email + 3 questions
4. **User submits** → Data sent to backend
5. **Success message** → "Your January reading is on its way!"
6. **Conversation continues** → Normal chat flow resumes

## Optional Enhancements

### Auto-trigger on First Message
```tsx
useEffect(() => {
  // Show banner after first user message
  if (messageCount === 1) {
    setShowBanner(true);
  }
}, [messageCount]);
```

### Smart Timing
```tsx
// Only show during January/February
const currentMonth = new Date().getMonth();
if (currentMonth === 0 || currentMonth === 1) { // Jan or Feb
  setShowBanner(true);
}
```

### Persistence
```tsx
// Don't show if user already submitted
const hasSubmitted = localStorage.getItem('january_reading_submitted');
if (!hasSubmitted) {
  setShowBanner(true);
}
```

## Testing

1. Test banner appears correctly
2. Test form opens when clicking "Get Started"
3. Test form validation (email required)
4. Test form submission
5. Test success message appears
6. Test form can be cancelled
7. Test banner can be dismissed

## Files to Integrate

Copy these files to your main GodGPT website:
- `src/components/LunarNewYearBanner.tsx`
- `src/components/ChatbotJanuaryForm.tsx`

Then import and use them in your chat interface.

## Questions?

Refer to `ChatbotIntegrationExample.tsx` for a complete working example.
