import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { projectsData } from '../data/projects.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Read the template file
const templatePath = path.join(__dirname, '..', 'templates', 'project.html');
const template = fs.readFileSync(templatePath, 'utf8');

// Create projects directory if it doesn't exist
const projectsDir = path.join(__dirname, '..', '..', 'projects');
if (!fs.existsSync(projectsDir)) {
  fs.mkdirSync(projectsDir);
}

// Generate individual project pages
projectsData.forEach(project => {
  // Create project directory
  const projectDir = path.join(projectsDir, project.slug);
  if (!fs.existsSync(projectDir)) {
    fs.mkdirSync(projectDir, { recursive: true });
  }

  // Replace template placeholders with project data
  let projectPage = template
    .replace(/{{PROJECT_TITLE}}/g, project.title)
    .replace(/{{PROJECT_DESCRIPTION}}/g, project.description)
    .replace(/{{PROJECT_YEAR}}/g, project.year)
    .replace(/{{PROJECT_URL}}/g, project.url)
    .replace(/{{PROJECT_VIDEO}}/g, project.videoSrc);

  // Write the project page
  const outputPath = path.join(projectDir, 'index.html');
  fs.writeFileSync(outputPath, projectPage);

  console.log(`Generated project page: ${outputPath}`);
}); 