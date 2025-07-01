# Kravings Club - Deployment Instructions

## 🚀 Quick Deploy to Vercel (Recommended)

### Option 1: Via GitHub Integration (Easiest)

1. **Push to GitHub** (if not already done):
   ```bash
   git push origin main
   ```

2. **Connect to Vercel**:
   - Go to [vercel.com](https://vercel.com)
   - Sign up/Login with your GitHub account
   - Click "New Project"
   - Import the `kravings-club` repository
   - Configure settings:
     - **Framework Preset**: Create React App
     - **Build Command**: `npm run build`
     - **Output Directory**: `build`
     - **Install Command**: `npm install`
   - Click "Deploy"

3. **Custom Domain Setup**:
   - In Vercel dashboard → Project Settings → Domains
   - Add `kravings.club` and `www.kravings.club`
   - Update DNS at your domain registrar:
     ```
     A Record: @ → 76.76.19.61
     CNAME: www → cname.vercel-dns.com
     ```

### Option 2: Via Vercel CLI

1. **Install Vercel CLI**:
   ```bash
   npm i -g vercel
   ```

2. **Login to Vercel**:
   ```bash
   vercel login
   ```

3. **Deploy from project directory**:
   ```bash
   cd /workspaces/madanzo/projects/kravings-club-delivery-now
   vercel
   ```

4. **Follow prompts**:
   - Set up and deploy? **Y**
   - Which scope? **Your Account**
   - Link to existing project? **N**
   - Project name? **kravings-club**
   - Code directory? **./`**

## 🔧 GitHub Setup

### If GitHub Push Failed

The project is ready but may need GitHub permissions. Here's how to resolve:

1. **Check Repository Access**:
   - Ensure you have write access to `https://github.com/Madanzo/kravings-club`
   - Repository should be public or you should be a collaborator

2. **Alternative: Create New Repository**:
   ```bash
   # Create new repo via GitHub CLI
   gh repo create kravings-club-delivery --public
   
   # Update remote
   git remote set-url origin https://github.com/Madanzo/kravings-club-delivery.git
   
   # Push
   git push -u origin main
   ```

3. **Manual Upload**:
   - Download project files locally
   - Create repository on github.com
   - Upload files via GitHub web interface

## 📱 Testing Deployment

### Pre-deployment Checklist

1. **Test Build Locally**:
   ```bash
   npm run build
   npm install -g serve
   serve -s build
   ```

2. **Verify Features**:
   - [ ] Age verification modal appears
   - [ ] Navigation works (all 4 pages)
   - [ ] Mobile hamburger menu functions
   - [ ] Forms are responsive
   - [ ] Images and styling load correctly

### Post-deployment Verification

1. **Test Live Site**:
   - Age verification on first visit
   - Cookie persistence (refresh page)
   - Mobile responsiveness
   - All navigation links work
   - Contact information displays

2. **Performance Check**:
   - Page load speed
   - Mobile lighthouse score
   - SEO meta tags

## 🎯 Environment Variables

### For Production Deployment

Add these in Vercel dashboard (Project → Settings → Environment Variables):

```env
# API Integration (when ready)
REACT_APP_API_URL=https://api.kravingsclub.com

# Google Maps (for delivery tracking)
REACT_APP_GOOGLE_MAPS_KEY=your_maps_api_key

# Analytics (optional)
REACT_APP_GA_TRACKING_ID=your_google_analytics_id

# Stripe (for payments)
REACT_APP_STRIPE_PUBLIC_KEY=your_stripe_public_key
```

## 🔒 Cannabis Compliance Features

### Age Verification
- ✅ 21+ age gate implemented
- ✅ Birth date validation
- ✅ 30-day cookie persistence
- ✅ Mobile-responsive modal

### Legal Requirements
- Add privacy policy page
- Add terms of service
- State-specific compliance messaging
- Age verification logging (if required)

## 🛠️ Troubleshooting

### Common Issues

**Build Fails**:
```bash
# Clear cache and reinstall
rm -rf node_modules package-lock.json
npm install
npm run build
```

**Routing Issues on Vercel**:
- ✅ Already configured in `vercel.json`
- Uses HashRouter for compatibility

**Age Verification Not Working**:
- Check browser cookies enabled
- Verify JavaScript is enabled
- Test in incognito mode

**Mobile Menu Issues**:
- Clear browser cache
- Test on actual mobile device
- Check touch target sizes (44px minimum)

### Support Commands

```bash
# Check Vercel deployment logs
vercel logs

# Redeploy manually
vercel --prod

# Remove and redeploy
vercel remove kravings-club
vercel
```

## 📈 Next Steps After Deployment

1. **Test thoroughly** on multiple devices
2. **Set up analytics** (Google Analytics)
3. **Configure monitoring** (Vercel Analytics)
4. **Add SSL certificate** (automatic with Vercel)
5. **Implement payment system** (Stripe integration)
6. **Add order management** system
7. **Set up email notifications**

## 🔗 Useful Links

- [Vercel Docs](https://vercel.com/docs)
- [React Deployment Guide](https://create-react-app.dev/docs/deployment/)
- [Custom Domain Setup](https://vercel.com/docs/custom-domains)
- [Environment Variables](https://vercel.com/docs/environment-variables)

---

**Ready to Deploy!** 🚀

Your Kravings Club project is fully configured for Vercel deployment with age verification and cannabis compliance features.