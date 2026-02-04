# Vite React Setup for GodGPT Info Preview

This project has been set up with Vite + React + Tailwind CSS to run the GodGPT Info Preview page.

## Quick Start

### Install Dependencies
```bash
npm install
```

### Run Development Server
```bash
npm run vite:dev
```

The app will be available at `http://localhost:3000`

### Build for Production
```bash
npm run vite:build
```

### Preview Production Build
```bash
npm run vite:preview
```

## Project Structure

```
├── index.html              # Vite entry HTML
├── vite.config.ts         # Vite configuration
├── postcss.config.js      # PostCSS config (Tailwind + Autoprefixer)
├── tailwind.config.js     # Tailwind CSS configuration
└── src/
    ├── main.tsx           # React entry point
    ├── App.tsx            # Main App component
    ├── vite-env.d.ts      # Vite TypeScript types
    ├── styles/
    │   └── index.css      # Tailwind imports and custom styles
    └── components/
        └── GodGPTInfoPreview.tsx  # Main component (converted from HTML)
```

## Configuration

### Tailwind CSS
- Already configured in `tailwind.config.js`
- Content paths include Vite entry files
- PostCSS is configured to process Tailwind

### PostCSS
- Configured in `postcss.config.js`
- Includes Tailwind CSS and Autoprefixer plugins

### Vite
- Configured in `vite.config.ts`
- Uses `@vitejs/plugin-react`
- Path alias `@` points to `./src`
- Development server runs on port 3000

## Notes

- The original HTML file has been converted to a React component
- All Tailwind classes are preserved
- Custom animations (like `animate-ping`) are included in `src/styles/index.css`
- The component is fully responsive and matches the original design
