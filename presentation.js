// ========================================
// PRESENTATION SLIDE NAVIGATION
// ========================================

class PresentationController {
    constructor() {
        this.currentSlide = 0;
        this.totalSlides = 7; // Updated to 7 slides
        this.container = document.querySelector('.presentation-container');
        this.prevButton = document.getElementById('prevSlide');
        this.nextButton = document.getElementById('nextSlide');
        this.currentSlideElement = document.getElementById('currentSlide');
        this.totalSlidesElement = document.getElementById('totalSlides');
        
        this.init();
    }
    
    init() {
        this.bindEvents();
        this.updateNavigation();
        this.updateSlideCounter();
    }
    
    bindEvents() {
        // Navigation buttons
        this.prevButton.addEventListener('click', () => this.previousSlide());
        this.nextButton.addEventListener('click', () => this.nextSlide());
        
        // Keyboard navigation
        document.addEventListener('keydown', (e) => this.handleKeyPress(e));
        
        // Section links in index slide
        this.bindSectionLinks();
        
        // Touch/swipe support for mobile
        this.initTouchSupport();
    }
    
    bindSectionLinks() {
        const sectionLinks = document.querySelectorAll('.section-link');
        sectionLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const slideIndex = parseInt(link.getAttribute('data-slide'));
                if (!isNaN(slideIndex)) {
                    this.goToSlide(slideIndex);
                }
            });
        });
    }
    
    handleKeyPress(e) {
        switch(e.key) {
            case 'ArrowLeft':
                e.preventDefault();
                this.previousSlide();
                break;
            case 'ArrowRight':
                e.preventDefault();
                this.nextSlide();
                break;
            case 'Home':
                e.preventDefault();
                this.goToSlide(0);
                break;
            case 'End':
                e.preventDefault();
                this.goToSlide(this.totalSlides - 1);
                break;
        }
    }
    
    initTouchSupport() {
        let startX = 0;
        let startY = 0;
        let endX = 0;
        let endY = 0;
        
        const handleTouchStart = (e) => {
            startX = e.touches[0].clientX;
            startY = e.touches[0].clientY;
        };
        
        const handleTouchEnd = (e) => {
            endX = e.changedTouches[0].clientX;
            endY = e.changedTouches[0].clientY;
            
            const diffX = startX - endX;
            const diffY = startY - endY;
            
            // Only handle horizontal swipes
            if (Math.abs(diffX) > Math.abs(diffY) && Math.abs(diffX) > 50) {
                if (diffX > 0) {
                    this.nextSlide();
                } else {
                    this.previousSlide();
                }
            }
        };
        
        document.addEventListener('touchstart', handleTouchStart, { passive: true });
        document.addEventListener('touchend', handleTouchEnd, { passive: true });
    }
    
    goToSlide(slideIndex) {
        if (slideIndex < 0 || slideIndex >= this.totalSlides) return;
        
        this.currentSlide = slideIndex;
        this.updateSlidePosition();
        this.updateNavigation();
        this.updateSlideCounter();
        this.animateSlideTransition();
    }
    
    nextSlide() {
        if (this.currentSlide < this.totalSlides - 1) {
            this.goToSlide(this.currentSlide + 1);
        }
    }
    
    previousSlide() {
        if (this.currentSlide > 0) {
            this.goToSlide(this.currentSlide - 1);
        }
    }
    
    updateSlidePosition() {
        const translateX = -(this.currentSlide * 100);
        this.container.style.transform = `translateX(${translateX}vw)`;
    }
    
    updateNavigation() {
        // Update previous button
        this.prevButton.disabled = this.currentSlide === 0;
        
        // Update next button
        this.nextButton.disabled = this.currentSlide === this.totalSlides - 1;
    }
    
    updateSlideCounter() {
        // Add animation class
        this.currentSlideElement.classList.add('changing');
        
        // Update the number
        this.currentSlideElement.textContent = this.currentSlide + 1;
        
        // Remove animation class after animation completes
        setTimeout(() => {
            this.currentSlideElement.classList.remove('changing');
        }, 300);
    }
    
    animateSlideTransition() {
        // Add a subtle animation class
        this.container.classList.add('transitioning');
        
        // Remove the class after transition completes
        setTimeout(() => {
            this.container.classList.remove('transitioning');
        }, 500);
    }
}

// ========================================
// ADDITIONAL FEATURES
// ========================================

// Auto-advance slides (optional - can be disabled)
class AutoAdvance {
    constructor(controller, interval = 10000) { // 10 seconds default
        this.controller = controller;
        this.interval = interval;
        this.timer = null;
        this.isPaused = false;
        
        this.init();
    }
    
    init() {
        this.startTimer();
        this.pauseOnHover();
        this.pauseOnFocus();
    }
    
    startTimer() {
        this.timer = setInterval(() => {
            if (!this.isPaused) {
                if (this.controller.currentSlide < this.controller.totalSlides - 1) {
                    this.controller.nextSlide();
                } else {
                    this.controller.goToSlide(0); // Loop back to first slide
                }
            }
        }, this.interval);
    }
    
    pauseOnHover() {
        document.addEventListener('mouseenter', () => this.isPaused = true);
        document.addEventListener('mouseleave', () => this.isPaused = false);
    }
    
    pauseOnFocus() {
        document.addEventListener('focusin', () => this.isPaused = true);
        document.addEventListener('focusout', () => this.isPaused = false);
    }
    
    stop() {
        if (this.timer) {
            clearInterval(this.timer);
            this.timer = null;
        }
    }
}

// ========================================
// INITIALIZATION
// ========================================

document.addEventListener('DOMContentLoaded', () => {
    // Initialize the presentation controller
    const presentation = new PresentationController();
    
    // Optional: Enable auto-advance (uncomment to enable)
    // const autoAdvance = new AutoAdvance(presentation, 15000); // 15 seconds
    
    // Add some visual enhancements
    addVisualEnhancements();
});

// ========================================
// VISUAL ENHANCEMENTS
// ========================================

function addVisualEnhancements() {
    // Add entrance animations for slide content
    const slides = document.querySelectorAll('.slide');
    
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const slideObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('slide-visible');
            }
        });
    }, observerOptions);
    
    slides.forEach(slide => {
        slideObserver.observe(slide);
    });
    
    // Add smooth scroll behavior for any internal links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// ========================================
// UTILITY FUNCTIONS
// ========================================

// Debounce function for performance
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Throttle function for scroll events
function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    }
}

// ========================================
// ACCESSIBILITY FEATURES
// ========================================

// Announce slide changes for screen readers
function announceSlideChange(slideNumber, slideTitle) {
    const announcement = document.createElement('div');
    announcement.setAttribute('aria-live', 'polite');
    announcement.setAttribute('aria-atomic', 'true');
    announcement.className = 'sr-only';
    announcement.textContent = `Slide ${slideNumber + 1} of ${7}: ${slideTitle}`;
    
    document.body.appendChild(announcement);
    
    // Remove after announcement
    setTimeout(() => {
        document.body.removeChild(announcement);
    }, 1000);
}

// Add focus management
function manageFocus() {
    const slides = document.querySelectorAll('.slide');
    const activeSlide = slides[document.querySelector('.slide.active').dataset.slide];
    
    // Focus the first focusable element in the active slide
    const firstFocusable = activeSlide.querySelector('button, a, input, textarea, select, [tabindex]:not([tabindex="-1"])');
    if (firstFocusable) {
        firstFocusable.focus();
    }
}
