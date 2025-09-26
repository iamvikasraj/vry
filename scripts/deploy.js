#!/usr/bin/env node

import { execSync } from 'child_process';
import fs from 'fs';

class DeploymentManager {
  constructor() {
    this.currentVersion = this.getCurrentVersion();
  }

  getCurrentVersion() {
    try {
      return fs.readFileSync('VERSION', 'utf8').trim();
    } catch (error) {
      return '1.0.0';
    }
  }

  buildProject() {
    console.log('🔨 Building project...');
    try {
      execSync('npm run build', { stdio: 'inherit' });
      console.log('✅ Build completed');
    } catch (error) {
      console.error('❌ Build failed:', error.message);
      process.exit(1);
    }
  }

  createDeploymentPackage(version) {
    const distDir = 'dist';
    const packageDir = `deployments/v${version}`;
    
    console.log(`📦 Creating deployment package for v${version}...`);
    
    // Create deployments directory if it doesn't exist
    if (!fs.existsSync('deployments')) {
      fs.mkdirSync('deployments');
    }
    
    // Copy dist to versioned directory
    execSync(`cp -r ${distDir} ${packageDir}`, { stdio: 'inherit' });
    
    // Create deployment info file
    const deploymentInfo = {
      version: version,
      timestamp: new Date().toISOString(),
      subdomain: `v${version.split('.')[0]}.vry.works`,
      files: this.getFileList(packageDir)
    };
    
    fs.writeFileSync(`${packageDir}/deployment-info.json`, JSON.stringify(deploymentInfo, null, 2));
    
    console.log(`✅ Deployment package created at ${packageDir}`);
    return packageDir;
  }

  getFileList(dir) {
    const files = [];
    
    function traverse(currentDir) {
      const items = fs.readdirSync(currentDir);
      
      items.forEach(item => {
        const fullPath = path.join(currentDir, item);
        const stat = fs.statSync(fullPath);
        
        if (stat.isDirectory()) {
          traverse(fullPath);
        } else {
          files.push(fullPath.replace(dir + '/', ''));
        }
      });
    }
    
    traverse(dir);
    return files;
  }

  generateDeploymentScript(version) {
    const subdomain = `v${version.split('.')[0]}.vry.works`;
    const script = `#!/bin/bash

# Deployment script for v${version}
# Subdomain: ${subdomain}

echo "🚀 Deploying v${version} to ${subdomain}..."

# Upload files to your hosting provider
# Replace these commands with your actual deployment commands

# Example for Netlify:
# netlify deploy --prod --dir=deployments/v${version}

# Example for Vercel:
# vercel --prod deployments/v${version}

# Example for GitHub Pages:
# cp -r deployments/v${version}/* ../vry-${version}-pages/
# cd ../vry-${version}-pages
# git add .
# git commit -m "Deploy v${version}"
# git push origin main

echo "✅ Deployment completed for v${version}"
echo "🌐 Your site should be available at: https://${subdomain}"
`;

    fs.writeFileSync(`deployments/v${version}/deploy.sh`, script);
    execSync(`chmod +x deployments/v${version}/deploy.sh`);
    
    console.log(`📝 Deployment script created: deployments/v${version}/deploy.sh`);
  }

  generateNginxConfig(version) {
    const subdomain = `v${version.split('.')[0]}.vry.works`;
    const config = `server {
    listen 80;
    server_name ${subdomain};
    
    # Redirect HTTP to HTTPS
    return 301 https://$server_name$request_uri;
}

server {
    listen 443 ssl http2;
    server_name ${subdomain};
    
    # SSL configuration (update paths as needed)
    ssl_certificate /path/to/ssl/cert.pem;
    ssl_certificate_key /path/to/ssl/private.key;
    
    # Document root
    root /var/www/vry/v${version};
    index index.html;
    
    # Gzip compression
    gzip on;
    gzip_vary on;
    gzip_min_length 1024;
    gzip_types text/plain text/css text/xml text/javascript application/javascript application/xml+rss application/json;
    
    # Cache static assets
    location ~* \\.(css|js|png|jpg|jpeg|gif|ico|svg|woff|woff2|ttf|eot)$ {
        expires 1y;
        add_header Cache-Control "public, immutable";
    }
    
    # Handle SPA routing
    location / {
        try_files $uri $uri/ /index.html;
    }
    
    # Security headers
    add_header X-Frame-Options "SAMEORIGIN" always;
    add_header X-XSS-Protection "1; mode=block" always;
    add_header X-Content-Type-Options "nosniff" always;
    add_header Referrer-Policy "no-referrer-when-downgrade" always;
    add_header Content-Security-Policy "default-src 'self' http: https: data: blob: 'unsafe-inline'" always;
}
`;

    fs.writeFileSync(`deployments/v${version}/nginx.conf`, config);
    console.log(`📝 Nginx config created: deployments/v${version}/nginx.conf`);
  }

  deploy(version = null) {
    const targetVersion = version || this.currentVersion;
    
    console.log(`🚀 Starting deployment for v${targetVersion}...`);
    
    this.buildProject();
    const packageDir = this.createDeploymentPackage(targetVersion);
    this.generateDeploymentScript(targetVersion);
    this.generateNginxConfig(targetVersion);
    
    console.log(`\n🎉 Deployment package ready for v${targetVersion}!`);
    console.log(`📁 Package location: ${packageDir}`);
    console.log(`🌐 Target subdomain: v${targetVersion.split('.')[0]}.vry.works`);
    console.log(`\n📋 Next steps:`);
    console.log(`   1. Run: ./${packageDir}/deploy.sh`);
    console.log(`   2. Update DNS records for v${targetVersion.split('.')[0]}.vry.works`);
    console.log(`   3. Configure SSL certificate`);
  }
}

// CLI Interface
const args = process.argv.slice(2);
const command = args[0];
const manager = new DeploymentManager();

switch (command) {
  case 'deploy':
    const version = args[1];
    manager.deploy(version);
    break;
    
  default:
    console.log(`
🚀 Portfolio Deployment Manager

Usage:
  node scripts/deploy.js deploy [version]  - Deploy specific version (defaults to current)

Examples:
  node scripts/deploy.js deploy           - Deploy current version
  node scripts/deploy.js deploy 1.2.0     - Deploy version 1.2.0
`);
}
