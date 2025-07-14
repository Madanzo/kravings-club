# Kravings Club Deployment Guide

## Overview

There are currently three Kravings Club projects in the repository. This guide clarifies which to use and how to deploy them.

## Project Comparison

### 1. **kravings-club-correct** (Vite + TypeScript + ShadCN)
- **Location**: `/workspaces/madanzo/kravings-club-correct/`
- **Technology**: Vite, React 18, TypeScript, ShadCN UI, Tailwind CSS
- **Status**: UI Implementation (no backend integration)
- **Best For**: Modern UI showcase, fast development
- **Deployment**: Vercel (static site)

### 2. **kravings-club-dev** (Next.js 14 + Blaze Integration)
- **Location**: `/workspaces/madanzo/army-command/operations/active-projects/kravings-club-dev/`
- **Technology**: Next.js 14, Tailwind CSS, Zustand, Blaze POS API
- **Status**: Full-stack implementation with live inventory
- **Best For**: Production deployment with real-time data
- **Deployment**: Vercel (server-side or static)

### 3. **kravings-club-delivery-now** (React CRA)
- **Location**: `/workspaces/madanzo/army-command/operations/active-projects/kravings-club-delivery-now/`
- **Technology**: Create React App, WordPress integration
- **Status**: Legacy implementation
- **Best For**: GitHub Pages deployment
- **Deployment**: GitHub Pages or Vercel

## Recommended Production Deployment

### **Use kravings-club-dev (Next.js) for production** because:
- Live Blaze POS integration for real-time inventory
- Modern Next.js architecture with optimized performance
- Server-side rendering capabilities
- Environment variable support for API keys
- Professional cart and checkout system

## Deployment Steps

### For kravings-club-dev (Recommended)

1. **Set up environment variables in Vercel:**
   ```
   BLAZE_API_URL=https://api.blaze.me
   BLAZE_API_KEY=your_key_here
   BLAZE_STORE_ID=your_store_id
   NEXT_PUBLIC_ENVIRONMENT=production
   ```

2. **Deploy to Vercel:**
   ```bash
   cd army-command/operations/active-projects/kravings-club-dev
   npm install
   npm run build
   vercel --prod
   ```

3. **Or use GitHub integration:**
   - Connect repository to Vercel
   - Set root directory to: `army-command/operations/active-projects/kravings-club-dev`
   - Configure environment variables in Vercel dashboard

### For kravings-club-correct (UI Demo)

1. **Deploy to Vercel:**
   ```bash
   cd kravings-club-correct
   npm install
   npm run build
   vercel --prod
   ```

2. **Configuration:**
   - Framework: Vite
   - Build Command: `npm run build`
   - Output Directory: `dist`
   - Install Command: `npm install`

### For kravings-club-delivery-now (Legacy)

1. **Deploy to GitHub Pages:**
   ```bash
   cd army-command/operations/active-projects/kravings-club-delivery-now
   npm install
   npm run deploy
   ```

2. **Or deploy to Vercel:**
   - Use existing vercel.json configuration
   - Output directory is `build`

## Environment Variables Required

### For Production (kravings-club-dev):
- `BLAZE_API_URL` - Blaze POS API endpoint
- `BLAZE_API_KEY` - Your Blaze API key
- `BLAZE_STORE_ID` - Your store ID
- `NEXT_PUBLIC_SITE_URL` - Your domain (https://kravings.club)
- `NEXT_PUBLIC_MIN_AGE` - 21 for cannabis compliance
- `NEXT_PUBLIC_STATE_LICENSE` - C9-0000555-LIC

### For Static Deployment:
- Set `EXPORT_MODE=static` to enable static export
- Run `npm run build:static` instead of `npm run build`

## Post-Deployment Checklist

- [ ] Verify age verification gate is working
- [ ] Test cart functionality
- [ ] Check mobile responsiveness
- [ ] Confirm API integration (if applicable)
- [ ] Test checkout flow
- [ ] Verify compliance information displays
- [ ] Check delivery zone validation
- [ ] Test contact forms/links

## Troubleshooting

### Vercel deployment not updating:
1. Clear build cache in Vercel dashboard
2. Check environment variables are set
3. Verify correct root directory
4. Check build logs for errors

### API not working:
1. Verify API keys in environment variables
2. Check CORS settings
3. Ensure API endpoints are whitelisted
4. Test API keys locally first

### Static export issues:
1. Use `EXPORT_MODE=static` for Next.js static export
2. Ensure no server-side features are used
3. Check for dynamic routes that need configuration

## Consolidation Plan

To reduce confusion, consider:
1. Archive kravings-club-delivery-now (legacy)
2. Move kravings-club-correct into army structure
3. Focus development on kravings-club-dev
4. Update all documentation to reflect single source of truth