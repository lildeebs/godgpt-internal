# Advent Calendar App

A cute, fun, and visual e-advent calendar app where users can create personalized advent calendars with custom names, lengths, and color themes.

## Features

- 🎄 **Custom Setup**: Create calendars with custom names (e.g., "Sarah's Birthday Advent Calendar")
- 📅 **Flexible Length**: Choose from 12, 24, 25, or 31 days
- 🎨 **Color Themes**: Select from beautiful color palettes
- 🚪 **Interactive Doors**: Click to open doors with smooth animations
- 💾 **Persistent Storage**: Your calendar is saved locally
- 📱 **Responsive Design**: Works on mobile, tablet, and desktop

## Getting Started

### Installation

```bash
npm install
```

### Development

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Build

```bash
npm run build
npm start
```

## Project Structure

```
app/
  ├── components/     # Reusable components (Door, etc.)
  ├── setup/         # Setup page for creating calendars
  ├── calendar/      # Main calendar view
  ├── store.ts       # Zustand state management
  ├── layout.tsx     # Root layout
  ├── page.tsx       # Home page
  └── globals.css    # Global styles
```

## Color Palettes

Color palette images should be placed in `public/palettes/` directory. The app includes default color palettes, but you can add more by:

1. Adding palette images to `public/palettes/`
2. Updating the `DEFAULT_PALETTES` array in `app/setup/page.tsx`

## Technologies

- **Next.js 14** - React framework
- **TypeScript** - Type safety
- **Tailwind CSS** - Styling
- **Framer Motion** - Animations
- **Zustand** - State management

## License

MIT
