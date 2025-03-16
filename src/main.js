import { projectsData } from './data/projects.js';

// Initialize page when DOM is ready
document.addEventListener('DOMContentLoaded', initializePage);

function initializePage() {
  loadProjects();
  setupTabNavigation();
}

/**
 * Load projects using template
 */
function loadProjects() {
  const projectsContainer = document.getElementById('projects-container');
  const template = document.getElementById('project-template');
  
  if (!projectsContainer || !template) {
    console.error('Required elements for projects not found');
    return;
  }
  
  // Clear loading state
  projectsContainer.innerHTML = '';
  
  projectsData.forEach((project, index) => {
    const projectElement = template.content.cloneNode(true);
    const projectDiv = projectElement.querySelector('.project');
    
    // Assign grid spans based on index for visual interest
    if (index === 0) {
      projectDiv.classList.add('span-8', 'tall'); // Featured project
    } else if (index === 1) {
      projectDiv.classList.add('span-4', 'tall'); // Tall side project
    } else if (index % 3 === 0) {
      projectDiv.classList.add('span-6'); // Medium project
    } else if (index % 4 === 0) {
      projectDiv.classList.add('span-12'); // Full width project
    } else {
      projectDiv.classList.add('span-4'); // Standard project
    }
    
    // Set video source
    const video = projectElement.querySelector('video');
    const source = projectElement.querySelector('source');
    if (video && source) {
      source.src = project.videoSrc;
      video.load(); // Force video to load
    }
    
    // Set project title
    const titleText = projectElement.querySelector('.title-text');
    if (titleText) {
      titleText.textContent = project.title;
    }
    
    // Set project link to detail page
    const projectLink = projectElement.querySelector('a');
    if (projectLink) {
      projectLink.href = `./projects/${project.slug}/index.html`;
    }
    
    // Set project year
    const yearElement = projectElement.querySelector('.project-year');
    if (yearElement) {
      yearElement.textContent = project.year;
    }
    
    // Add to container
    projectsContainer.appendChild(projectElement);
  });
}

/**
 * Set up tab navigation
 */
function setupTabNavigation() {
  const tabContainer = document.querySelector('.toggle-pill');
  const contentSections = document.querySelectorAll('.content');
  
  if (!tabContainer || !contentSections.length) {
    console.error('Required elements for navigation not found');
    return;
  }
  
  // Set initial state
  const initialActiveTab = tabContainer.querySelector('button.active');
  if (initialActiveTab) {
    updatePillIndicator(initialActiveTab);
    showContent(initialActiveTab.dataset.content);
  }
  
  // Use event delegation for tab navigation
  tabContainer.addEventListener('click', (e) => {
    const targetButton = e.target.closest('button');
    if (!targetButton) return;
    
    e.preventDefault();
    
    // Get the content ID from the data attribute
    const targetContentId = targetButton.dataset.content;
    if (!targetContentId) return;
    
    // Update UI
    updateActiveTab(targetButton);
    showContent(targetContentId);
    updatePillIndicator(targetButton);
  });
}

/**
 * Update active tab
 */
function updateActiveTab(activeTab) {
  const allTabs = activeTab.parentNode.querySelectorAll('button');
  allTabs.forEach(tab => tab.classList.remove('active'));
  activeTab.classList.add('active');
}

/**
 * Show content section
 */
function showContent(contentId) {
  const contentSections = document.querySelectorAll('.content');
  contentSections.forEach(section => {
    if (section.id === contentId) {
      section.classList.remove('hidden');
      section.classList.add('active');
    } else {
      section.classList.remove('active');
      section.classList.add('hidden');
    }
  });
}

/**
 * Update pill indicator position
 */
function updatePillIndicator(activeTab) {
  const pillIndicator = document.getElementById('toggle-pill-indicator');
  if (!pillIndicator || !activeTab) return;
  
  // Remove all position classes first
  pillIndicator.classList.remove('center', 'right');
  
  // Get position information
  const buttons = Array.from(activeTab.parentNode.children).filter(child => 
    child.tagName === 'BUTTON'
  );
  const tabIndex = buttons.indexOf(activeTab);
  
  // Add appropriate class based on index
  if (tabIndex === 1) {
    pillIndicator.classList.add('center');
  } else if (tabIndex === 2) {
    pillIndicator.classList.add('right');
  }
}

// Export project data for use in detail pages
export { projectsData };