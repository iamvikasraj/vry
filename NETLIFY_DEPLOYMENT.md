# Netlify Deployment Guide

## Quick Fix Applied ✅

Your project structure has been fixed! The issue was that your `package.json` was configured for a React/Vite build, but you have a static HTML site.

## What Was Fixed

1. **Removed Vite configuration** - Deleted `vite.config.js` since you don't need it
2. **Updated package.json** - Removed React dependencies and build commands
3. **Created netlify.toml** - Added proper Netlify configuration for static sites
4. **Fixed favicon path** - Corrected the favicon reference in HTML

## How to Deploy to Netlify

### Option 1: Drag & Drop (Easiest)
1. Go to [netlify.com](https://netlify.com)
2. Log in to your account
3. Drag your entire project folder to the deploy area
4. Your site will be live instantly!

### Option 2: Git Integration (Recommended)
1. Push your changes to GitHub
2. Connect your GitHub repo to Netlify
3. Netlify will auto-deploy on every push

### Option 3: Netlify CLI
```bash
# Install Netlify CLI
npm install -g netlify-cli

# Login to Netlify
netlify login

# Deploy from your project directory
netlify deploy --prod --dir=.
```

## Project Structure (Now Correct)

```
vry/
├── index.html          # Main HTML file
├── styles.css          # Main CSS file
├── assets/             # Static assets
│   ├── favicon/        # Favicon files
│   ├── video/          # Video files
│   └── *.svg           # Icon files
├── experiments.html    # Experiments page
├── netlify.toml        # Netlify configuration
├── package.json        # Updated for static site
└── README.md
```

## Build Settings for Netlify

- **Build command**: (leave empty - no build needed)
- **Publish directory**: `.` (root directory)
- **Node version**: 18 (optional, for any Node tools)

## Testing Locally

```bash
# Start local server
npm start

# Or use Python
python3 -m http.server 8000
```

Your site should now work perfectly on Netlify! 🎉
