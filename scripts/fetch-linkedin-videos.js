const fs = require('fs')
const path = require('path')

/**
 * Fetch LinkedIn videos and integrate into projects
 * 
 * Usage:
 * 1. Add LinkedIn post URLs to the linkedinPosts array below
 * 2. Run: node scripts/fetch-linkedin-videos.js
 * 3. Script will fetch video URLs and update projects
 * 
 * Note: LinkedIn API requires authentication. For manual approach:
 * - Get video URL from LinkedIn post
 * - Add to linkedinPosts array with metadata
 */

// LinkedIn posts with video content
// Format: { url: 'linkedin post url', projectTitle: 'matching project title', videoUrl: 'direct video url' }
const linkedinPosts = [
  // Example:
  // {
  //   url: 'https://www.linkedin.com/posts/vraj247_project-name-activity-1234567890',
  //   projectTitle: 'ET Money App Onboarding',
  //   videoUrl: 'https://media.licdn.com/dms/video/.../video.mp4' // Get this from LinkedIn post
  // }
]

/**
 * Fetch video URL from LinkedIn post
 * Note: LinkedIn doesn't provide public API for this
 * You'll need to manually extract video URLs or use LinkedIn API with authentication
 */
async function fetchLinkedInVideo(postUrl) {
  try {
    // Option 1: Use LinkedIn API (requires OAuth)
    // This would require setting up LinkedIn API credentials
    
    // Option 2: Manual extraction
    // User needs to provide video URL directly
    
    // Option 3: Scraping (may violate ToS)
    // Not recommended for production
    
    // For now, return the videoUrl if provided in linkedinPosts
    const post = linkedinPosts.find(p => p.url === postUrl)
    return post?.videoUrl || null
  } catch (error) {
    console.error(`Error fetching video from ${postUrl}:`, error)
    return null
  }
}

/**
 * Download video from URL and save to public/assets/video/
 */
async function downloadVideo(videoUrl, filename) {
  try {
    const https = require('https')
    const http = require('http')
    
    const videoPath = path.join(process.cwd(), 'public', 'assets', 'video', filename)
    const videoDir = path.dirname(videoPath)
    
    // Ensure directory exists
    if (!fs.existsSync(videoDir)) {
      fs.mkdirSync(videoDir, { recursive: true })
    }
    
    // Check if file already exists
    if (fs.existsSync(videoPath)) {
      console.log(`⏭️  Video already exists: ${filename}`)
      return videoPath
    }
    
    return new Promise((resolve, reject) => {
      const parsedUrl = new URL(videoUrl)
      const client = parsedUrl.protocol === 'https:' ? https : http
      
      const file = fs.createWriteStream(videoPath)
      let downloadedBytes = 0
      
      const request = client.get(videoUrl, {
        headers: {
          'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36'
        }
      }, (response) => {
        if (response.statusCode === 200 || response.statusCode === 206) {
          const totalBytes = parseInt(response.headers['content-length'] || '0', 10)
          
          response.on('data', (chunk) => {
            downloadedBytes += chunk.length
            if (totalBytes > 0) {
              const percent = ((downloadedBytes / totalBytes) * 100).toFixed(1)
              process.stdout.write(`\r   Progress: ${percent}%`)
            }
          })
          
          response.pipe(file)
          
          file.on('finish', () => {
            file.close()
            console.log(`\n✅ Downloaded: ${filename} (${(downloadedBytes / 1024 / 1024).toFixed(2)} MB)`)
            resolve(videoPath)
          })
        } else if (response.statusCode === 301 || response.statusCode === 302) {
          // Handle redirects
          file.close()
          if (fs.existsSync(videoPath)) {
            fs.unlinkSync(videoPath)
          }
          const redirectUrl = response.headers.location
          console.log(`   Following redirect to: ${redirectUrl}`)
          downloadVideo(redirectUrl, filename).then(resolve).catch(reject)
        } else {
          file.close()
          if (fs.existsSync(videoPath)) {
            fs.unlinkSync(videoPath)
          }
          reject(new Error(`Failed to download: HTTP ${response.statusCode}`))
        }
      })
      
      request.on('error', (err) => {
        file.close()
        if (fs.existsSync(videoPath)) {
          fs.unlinkSync(videoPath)
        }
        reject(err)
      })
      
      request.setTimeout(30000, () => {
        request.destroy()
        reject(new Error('Download timeout'))
      })
    })
  } catch (error) {
    console.error(`Error downloading video ${videoUrl}:`, error.message)
    throw error
  }
}

/**
 * Update project data with LinkedIn videos
 */
async function updateProjectsWithLinkedInVideos() {
  console.log('Fetching LinkedIn videos...')
  
  const projectsPath = path.join(process.cwd(), 'app', 'page.tsx')
  let projectsContent = fs.readFileSync(projectsPath, 'utf8')
  
  let updatedCount = 0
  let skippedCount = 0
  
  for (const post of linkedinPosts) {
    if (!post.videoUrl || !post.projectTitle) {
      console.warn(`⏭️  Skipping "${post.projectTitle || 'Untitled'}": missing videoUrl`)
      skippedCount++
      continue
    }
    
    // Extract video filename or use a generated one
    const videoFilename = post.videoFilename || `linkedin-${Date.now()}.mp4`
    const videoPath = `/assets/video/${videoFilename}`
    
    // Download video
    try {
      console.log(`📥 Downloading video for: ${post.projectTitle}`)
      await downloadVideo(post.videoUrl, videoFilename)
      
      // Update project in page.tsx
      // Find the project by title and update its video path
      const escapedTitle = post.projectTitle.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
      const projectRegex = new RegExp(
        `(title:\\s*['"]${escapedTitle}['"],[^}]*video:\\s*['"])([^'"]+)(['"])`,
        'g'
      )
      
      if (projectRegex.test(projectsContent)) {
        projectsContent = projectsContent.replace(
          projectRegex,
          `$1${videoPath}$3`
        )
        console.log(`✅ Updated project: ${post.projectTitle} → ${videoPath}`)
        updatedCount++
      } else {
        console.warn(`⚠️  Project not found: ${post.projectTitle}`)
        skippedCount++
      }
    } catch (error) {
      console.error(`❌ Failed to process ${post.url}:`, error.message)
      skippedCount++
    }
  }
  
  // Write updated content
  if (updatedCount > 0) {
    fs.writeFileSync(projectsPath, projectsContent, 'utf8')
    console.log(`\n✨ Successfully updated ${updatedCount} project(s)!`)
  }
  
  if (skippedCount > 0) {
    console.log(`\n⏭️  Skipped ${skippedCount} post(s) (missing videoUrl or project not found)`)
  }
  
  if (updatedCount === 0 && skippedCount === linkedinPosts.length) {
    console.log('\n💡 Tip: Add videoUrl to posts in linkedin-videos.json and run again')
  }
}

/**
 * Alternative: Manual JSON-based approach
 * Create a linkedin-videos.json file for easier management
 */
function createLinkedInVideosConfig() {
  const configPath = path.join(process.cwd(), 'linkedin-videos.json')
  const config = {
    posts: linkedinPosts,
    instructions: [
      '1. Add LinkedIn post URLs and video URLs to the posts array',
      '2. Run: node scripts/fetch-linkedin-videos.js',
      '3. Videos will be downloaded and projects updated',
      '',
      'To get video URL from LinkedIn:',
      '- Open LinkedIn post in browser',
      '- Right-click video > Inspect',
      '- Find <video> tag and copy src URL',
      '- Or use browser DevTools Network tab to find video request'
    ]
  }
  
  if (!fs.existsSync(configPath)) {
    fs.writeFileSync(configPath, JSON.stringify(config, null, 2))
    console.log('Created linkedin-videos.json config file')
  }
  
  return config
}

// Main execution
async function main() {
  // Create config file if it doesn't exist
  createLinkedInVideosConfig()
  
  // Load config if it exists
  const configPath = path.join(process.cwd(), 'linkedin-videos.json')
  if (fs.existsSync(configPath)) {
    const config = JSON.parse(fs.readFileSync(configPath, 'utf8'))
    if (config.posts && config.posts.length > 0) {
      linkedinPosts.push(...config.posts)
    }
  }
  
  if (linkedinPosts.length === 0) {
    console.log('No LinkedIn posts configured.')
    console.log('Edit linkedin-videos.json and add your posts, then run again.')
    return
  }
  
  await updateProjectsWithLinkedInVideos()
}

// Run if called directly
if (require.main === module) {
  main().catch(console.error)
}

module.exports = { fetchLinkedInVideo, downloadVideo, updateProjectsWithLinkedInVideos }
