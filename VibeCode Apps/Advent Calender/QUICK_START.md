# Quick Start Guide

## Installation

1. Install dependencies:
```bash
npm install
```

2. Copy color palette images (if not already done):
The palette images should be in `public/palettes/` directory. They should already be there from the setup.

3. Start the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Features

### Setup Page (`/setup`)
- Enter a custom calendar name (e.g., "Sarah's Birthday Advent Calendar")
- Choose the number of days (12, 24, 25, or 31)
- Select from 12 beautiful color palettes with preview images

### Calendar Page (`/calendar`)
- View your calendar in a responsive grid layout
- Click doors to open them with smooth animations
- Each door reveals a surprise emoji and message
- Calendar state is saved locally and persists across sessions

## Customization

### Adding New Color Palettes

1. Add your palette image to `public/palettes/`
2. Update `DEFAULT_PALETTES` in `app/setup/page.tsx`:
```typescript
{
  id: '13',
  name: 'Your Palette Name',
  colors: ['#HEX1', '#HEX2', '#HEX3', '#HEX4'], // Extract 4 main colors
  image: '/palettes/your-image.png',
}
```

### Customizing Door Content

Edit `app/components/Door.tsx` to customize what appears when doors are opened.

## Troubleshooting

- **Images not showing**: Make sure palette images are in `public/palettes/` and filenames match exactly
- **State not persisting**: Check browser localStorage is enabled
- **Build errors**: Run `npm install` again to ensure all dependencies are installed
