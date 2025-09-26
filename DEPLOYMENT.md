# Portfolio Versioning & Deployment Guide

This guide explains how to create versioned deployments of your portfolio that can be accessed via subdomains like `v1.vry.works`, `v2.vry.works`, etc.

## 🚀 Quick Start

### 1. Create a New Version
```bash
# Create a patch version (1.0.0 → 1.0.1)
npm run version:create patch "Fixed responsive design issues"

# Create a minor version (1.0.0 → 1.1.0)
npm run version:create minor "Added new portfolio section"

# Create a major version (1.0.0 → 2.0.0)
npm run version:create major "Complete redesign with new features"
```

### 2. Deploy the Version
```bash
# Deploy current version
npm run deploy

# Deploy specific version
npm run deploy 1.2.0
```

### 3. One-Command Release
```bash
# Create version and deploy in one command
npm run release patch "Quick fix deployment"
```

## 📋 Available Commands

| Command | Description |
|---------|-------------|
| `npm run version:create [type] [message]` | Create new version (patch/minor/major) |
| `npm run version:list` | List all available versions |
| `npm run version:checkout <version>` | Switch to specific version |
| `npm run version:current` | Show current version |
| `npm run deploy [version]` | Deploy version to subdomain |
| `npm run release [type] [message]` | Create version and deploy |

## 🌐 Subdomain Setup

### DNS Configuration
For each version, you'll need to set up DNS records:

```
v1.vry.works    → A record → Your server IP
v2.vry.works    → A record → Your server IP
v3.vry.works    → A record → Your server IP
```

### Web Server Configuration
The deployment script generates Nginx configurations for each version. Update the SSL certificate paths and deploy to your server.

## 📁 File Structure After Deployment

```
deployments/
├── v1.0.0/
│   ├── index.html
│   ├── assets/
│   ├── deployment-info.json
│   ├── deploy.sh
│   └── nginx.conf
├── v1.1.0/
│   └── ...
└── v2.0.0/
    └── ...
```

## 🔄 Workflow Example

### Scenario: Adding a New Feature

1. **Develop your changes** on the main branch
2. **Create a version** when ready to deploy:
   ```bash
   npm run version:create minor "Added contact form and animations"
   ```
3. **Deploy the version**:
   ```bash
   npm run deploy
   ```
4. **Continue development** on main branch for the next version

### Scenario: Quick Bug Fix

1. **Fix the issue** on main branch
2. **Create patch version**:
   ```bash
   npm run version:create patch "Fixed mobile navigation bug"
   ```
3. **Deploy immediately**:
   ```bash
   npm run deploy
   ```

## 🏗️ Hosting Provider Setup

### Option 1: Netlify
1. Create separate sites for each version
2. Update `deploy.sh` with Netlify commands:
   ```bash
   netlify deploy --prod --dir=deployments/v1.0.0
   ```

### Option 2: Vercel
1. Create separate projects for each version
2. Update `deploy.sh` with Vercel commands:
   ```bash
   vercel --prod deployments/v1.0.0
   ```

### Option 3: Custom Server
1. Upload deployment packages to your server
2. Configure Nginx with generated configs
3. Set up SSL certificates

## 📊 Version Management

### Semantic Versioning
- **Patch** (1.0.0 → 1.0.1): Bug fixes, small improvements
- **Minor** (1.0.0 → 1.1.0): New features, sections
- **Major** (1.0.0 → 2.0.0): Complete redesigns, breaking changes

### Git Tags
Each version creates a Git tag for easy reference:
```bash
git tag -l "v*"  # List all version tags
git checkout v1.2.0  # Switch to specific version
```

## 🔧 Customization

### Update Deployment Scripts
Edit `scripts/deploy.js` to match your hosting provider's deployment process.

### Modify Version Scripts
Edit `scripts/version.js` to customize version creation process.

### Add Version Info to HTML
The system automatically adds version meta tags to your HTML files:
```html
<meta name="version" content="1.2.0">
```

## 🚨 Important Notes

1. **Always test locally** before creating a version
2. **Keep main branch stable** - only create versions when ready to deploy
3. **Update DNS records** for new subdomains
4. **Configure SSL certificates** for HTTPS
5. **Monitor deployments** to ensure they're working correctly

## 🆘 Troubleshooting

### Version Creation Fails
- Check if you have uncommitted changes
- Ensure you're on the main branch
- Verify Git remote is configured

### Deployment Fails
- Check build process: `npm run build`
- Verify deployment directory exists
- Check hosting provider credentials

### Subdomain Not Working
- Verify DNS propagation (can take 24-48 hours)
- Check SSL certificate configuration
- Ensure web server is running

## 📈 Benefits of This System

1. **Version History**: Keep track of all portfolio iterations
2. **Easy Rollback**: Switch back to any previous version
3. **Client Demos**: Show different versions to different clients
4. **A/B Testing**: Compare different versions
5. **Professional Presentation**: Organized, versioned portfolio

---

Happy versioning! 🎉
