# Nenes del Perreo

A React-based web application showcasing reggaeton music and Texas vibes.

## Project Overview

This is a single-page application built with React that serves as a promotional website for the "Perreo Texas Vibes" music project, blending reggaeton with Texas culture.

## Tech Stack

- **React 18.2.0** - Frontend framework
- **React Router DOM 6.20.0** - Client-side routing
- **React Scripts 5.0.1** - Build tooling
- **GitHub Pages** - Deployment platform

## Project Structure

```
src/
├── App.js          # Main application component
├── App.css         # Global styles
├── index.js        # Application entry point
├── index.css       # Base styles
└── pages/          # Page components
    ├── Home.js     # Landing page
    ├── About.js    # About section
    ├── Music.js    # Music showcase
    └── Events.js   # Events calendar
```

## Available Scripts

- `npm start` - Runs the app in development mode
- `npm run build` - Builds the app for production
- `npm test` - Launches the test runner
- `npm run deploy` - Deploys to GitHub Pages

## Deployment

This project is configured for deployment to GitHub Pages at:
https://madanzo.github.io/nenes-del-perreo

## Development

1. Install dependencies: `npm install`
2. Start development server: `npm start`
3. Open http://localhost:3000 to view in browser

## Features

- **Fully Responsive Design** - Optimized for mobile, tablet, and desktop
- **Mobile-First Navigation** - Hamburger menu with smooth animations
- **Touch-Friendly Interface** - 44px minimum touch targets for mobile usability
- **Multi-page Navigation** - React Router with smooth page transitions
- **Music Showcase** - Featured tracks and releases
- **Events Calendar** - Upcoming shows and performances
- **Texas-Themed Branding** - Reggaeton meets Southern swagger

## Mobile Optimization

This project has been specifically optimized for mobile devices with:

### Responsive Breakpoints
- **Desktop**: 1200px+ (full layout)
- **Tablet**: 768px (horizontal navigation, single-column grid)
- **Mobile**: 480px (hamburger menu, stacked layout)
- **Small Mobile**: 320px (compact design)

### Mobile Features
- **Hamburger Navigation Menu** - Animated toggle with dropdown
- **Touch-Optimized Controls** - Minimum 44px touch targets
- **Responsive Typography** - Font sizes scale appropriately
- **Mobile-First CSS** - Optimized for small screens first
- **Cross-Browser Support** - Works on iOS Safari, Chrome Mobile, etc.

### Accessibility
- Proper ARIA labels for mobile navigation
- Keyboard navigation support
- Screen reader compatibility
- High contrast ratios for readability

## Recent Updates

### June 2025 - Mobile Responsiveness Overhaul
- ✅ Added hamburger navigation menu for mobile devices
- ✅ Implemented comprehensive mobile breakpoints (768px, 480px, 320px)
- ✅ Improved touch targets and spacing for mobile usability
- ✅ Added mobile-first CSS with proper scaling and padding
- ✅ Fixed navigation layout issues on small screens

See `MOBILE_FIX_SUMMARY.md` for detailed technical documentation.