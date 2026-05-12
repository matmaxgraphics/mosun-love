# Birthday Website Customization Guide

## Overview
This is a luxury dark theme birthday website with a mobile-first design, smooth animations, and premium aesthetic using Playfair Display and Inter fonts.

## Customization

### 1. Change the Unlock Birth Date
Edit `/hooks/use-unlock-state.ts` to validate against a specific date, or modify the validation in `/components/sections/UnlockScreen.tsx`:

```typescript
// Currently accepts MM/DD format
// Modify the dobPattern regex to add year validation if needed
const dobPattern = /^(0[1-9]|1[0-2])\/(0[1-9]|[12]\d|3[01])$/;
```

### 2. Replace the Audio File
1. Add your audio file to `/public/audio/birthday-song.mp3`
2. The audio player automatically handles playback controls and progress tracking

### 3. Customize Timeline Years
Edit `/components/sections/TimelineSection.tsx`:

```typescript
const timelineYears = [
  {
    year: 2022,
    caption: 'The Beginning',
    color: 'from-purple-900 to-black',
  },
  // Add or modify entries here
];
```

### 4. Update Special Qualities
Edit `/components/sections/SpecialCardsSection.tsx` to change the titles and descriptions:

```typescript
const specialQualities = [
  {
    title: 'Your Quality Here',
    description: 'Description of this quality...',
  },
  // Add more qualities
];
```

### 5. Change the Final Message
Edit `/components/sections/FinalRevealSection.tsx`:

```typescript
const revelText = "Your custom message here.";
```

### 6. Color Customization
All colors are defined in `/app/globals.css`:
- `--gold: #d4af37` - Primary accent color
- `--background: #0a0a0a` - Main background
- `--foreground: #f5f5f5` - Text color

### 7. Add Background Images
To add images to sections:
1. Place images in `/public/images/`
2. Import and use them with Next.js Image component
3. Update section components to display the images

## Mobile Optimization
The website is optimized for mobile viewing:
- All sections are 100vh (full screen height)
- Touch-friendly interactions
- Optimized for WhatsApp sharing
- Smooth scroll animations on mobile devices

## Font Configuration
- **Headings**: Playfair Display (elegant, serif)
- **Body**: Inter (clean, modern sans-serif)
Both are imported from Google Fonts in `/app/layout.tsx`

## Animation Tweaks
Modify animation speeds in `/lib/animations.ts`:
- Adjust `duration` values for faster/slower animations
- Change `delay` values for timing adjustments
- Modify transition easing (ease-out, ease-in, etc.)

## Deployment
This project is ready for deployment to Vercel:
```bash
npm run build
```

The site will work perfectly on mobile devices and is optimized for social sharing.

## Browser Support
- Chrome/Edge (latest)
- Safari (iOS 13+)
- Firefox (latest)
- Optimized for WhatsApp in-app browser

## Notes
- All animations use Framer Motion for smooth 60fps performance
- The unlock state persists in localStorage
- Responsive design adapts to all screen sizes
- Audio player has automatic time tracking and progress display
