#!/usr/bin/env node

import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';

const VERSION_FILE = 'VERSION';
const CHANGELOG_FILE = 'CHANGELOG.md';

class VersionManager {
  constructor() {
    this.currentVersion = this.getCurrentVersion();
  }

  getCurrentVersion() {
    try {
      if (fs.existsSync(VERSION_FILE)) {
        return fs.readFileSync(VERSION_FILE, 'utf8').trim();
      }
      return '1.0.0';
    } catch (error) {
      console.error('Error reading version file:', error);
      return '1.0.0';
    }
  }

  getNextVersion(type = 'patch') {
    const [major, minor, patch] = this.currentVersion.split('.').map(Number);
    
    switch (type) {
      case 'major':
        return `${major + 1}.0.0`;
      case 'minor':
        return `${major}.${minor + 1}.0`;
      case 'patch':
      default:
        return `${major}.${minor}.${patch + 1}`;
    }
  }

  updateVersion(newVersion) {
    // Update package.json
    const packagePath = 'package.json';
    const packageJson = JSON.parse(fs.readFileSync(packagePath, 'utf8'));
    packageJson.version = newVersion;
    fs.writeFileSync(packagePath, JSON.stringify(packageJson, null, 2));

    // Update VERSION file
    fs.writeFileSync(VERSION_FILE, newVersion);

    // Update HTML files with version info
    this.updateHtmlVersion(newVersion);

    console.log(`✅ Version updated to ${newVersion}`);
  }

  updateHtmlVersion(version) {
    const htmlFiles = ['index.html', 'projects.html', 'postpaid.html', 'presentation.html'];
    
    htmlFiles.forEach(file => {
      if (fs.existsSync(file)) {
        let content = fs.readFileSync(file, 'utf8');
        
        // Update meta version tag
        content = content.replace(
          /<meta name="version" content="[^"]*">/g,
          `<meta name="version" content="${version}">`
        );
        
        // Add version meta tag if it doesn't exist
        if (!content.includes('<meta name="version"')) {
          content = content.replace(
            /<meta charset="utf-8">/,
            `<meta charset="utf-8">\n    <meta name="version" content="${version}">`
          );
        }
        
        fs.writeFileSync(file, content);
      }
    });
  }

  createGitTag(version, message) {
    try {
      execSync(`git add .`, { stdio: 'inherit' });
      execSync(`git commit -m "Release version ${version}: ${message}"`, { stdio: 'inherit' });
      execSync(`git tag -a v${version} -m "Version ${version}: ${message}"`, { stdio: 'inherit' });
      execSync(`git push origin main --tags`, { stdio: 'inherit' });
      
      console.log(`✅ Git tag v${version} created and pushed`);
    } catch (error) {
      console.error('Error creating git tag:', error.message);
    }
  }

  updateChangelog(version, message) {
    const changelogEntry = `## [${version}] - ${new Date().toISOString().split('T')[0]}\n\n### Added\n- ${message}\n\n`;
    
    let changelog = '';
    if (fs.existsSync(CHANGELOG_FILE)) {
      changelog = fs.readFileSync(CHANGELOG_FILE, 'utf8');
    } else {
      changelog = '# Changelog\n\nAll notable changes to this project will be documented in this file.\n\n';
    }
    
    const newChangelog = changelog.replace('# Changelog', `# Changelog\n\n${changelogEntry}`);
    fs.writeFileSync(CHANGELOG_FILE, newChangelog);
    
    console.log(`✅ Changelog updated`);
  }

  createVersion(type, message) {
    const newVersion = this.getNextVersion(type);
    
    console.log(`🚀 Creating version ${newVersion}...`);
    
    this.updateVersion(newVersion);
    this.updateChangelog(newVersion, message);
    this.createGitTag(newVersion, message);
    
    console.log(`\n🎉 Version ${newVersion} created successfully!`);
    console.log(`📋 Next steps:`);
    console.log(`   1. Deploy to v${newVersion.split('.')[0]}.vry.works`);
    console.log(`   2. Update DNS records for subdomain`);
    console.log(`   3. Continue development on main branch`);
    
    return newVersion;
  }

  listVersions() {
    try {
      const tags = execSync('git tag -l "v*" --sort=-version:refname', { encoding: 'utf8' });
      const versionList = tags.trim().split('\n').filter(tag => tag);
      
      console.log('📋 Available versions:');
      versionList.forEach(tag => {
        console.log(`   ${tag}`);
      });
      
      return versionList;
    } catch (error) {
      console.log('No versions found');
      return [];
    }
  }

  checkoutVersion(version) {
    try {
      execSync(`git checkout v${version}`, { stdio: 'inherit' });
      console.log(`✅ Checked out version ${version}`);
    } catch (error) {
      console.error(`Error checking out version ${version}:`, error.message);
    }
  }
}

// CLI Interface
const args = process.argv.slice(2);
const command = args[0];
const manager = new VersionManager();

switch (command) {
  case 'create':
    const type = args[1] || 'patch';
    const message = args.slice(2).join(' ') || 'New version release';
    manager.createVersion(type, message);
    break;
    
  case 'list':
    manager.listVersions();
    break;
    
  case 'checkout':
    const version = args[1];
    if (!version) {
      console.error('Please specify a version to checkout');
      process.exit(1);
    }
    manager.checkoutVersion(version);
    break;
    
  case 'current':
    console.log(`Current version: ${manager.currentVersion}`);
    break;
    
  default:
    console.log(`
🚀 Portfolio Version Manager

Usage:
  node scripts/version.js create [type] [message]  - Create new version (patch|minor|major)
  node scripts/version.js list                    - List all versions
  node scripts/version.js checkout <version>      - Checkout specific version
  node scripts/version.js current                 - Show current version

Examples:
  node scripts/version.js create patch "Fixed responsive design"
  node scripts/version.js create minor "Added new portfolio section"
  node scripts/version.js create major "Complete redesign"
  node scripts/version.js list
  node scripts/version.js checkout 1.2.0
`);
}
