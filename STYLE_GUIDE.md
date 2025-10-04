# VRY Portfolio Style Guide

## Color Palette

### Primary Colors
- **Primary Orange**: `#FA4F01` (original brand color)
- **Soft Peach**: `#ecc4b2` (current accent color)
- **Light Beige**: `#E3DFCC` (hover states)

### Background Colors
- **Dark Background**: `#020404`
- **Card Background**: `#1a1a1a`
- **Border Color**: `rgba(236, 196, 178, 0.15)`

### Text Colors
- **Primary Text**: `#ffffff`
- **Secondary Text**: `#787878`
- **Accent Text**: `#ecc4b2`
- **Dark Text**: `#1a1a1a`

### Transparent Overlays
- **Light Background**: `rgba(236, 196, 178, 0.08)`
- **Border**: `rgba(236, 196, 178, 0.15)`
- **Subtle Background**: `rgba(236, 196, 178, 0.02)`

## Typography

### Font Family
- **Primary**: `'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif`

### Font Sizes
- `--font-size-xs: 10px`
- `--font-size-sm: 12px`
- `--font-size-base: 14px`
- `--font-size-md: 16px`
- `--font-size-lg: 18px`
- `--font-size-xl: 20px`
- `--font-size-xxl: 24px`
- `--font-size-xxxl: 32px`
- `--font-size-display: 48px`

### Font Weights
- `--font-weight-normal: 400`
- `--font-weight-medium: 500`
- `--font-weight-semibold: 600`
- `--font-weight-bold: 700`
- `--font-weight-black: 900`

### Line Heights
- `--line-height-tight: 1.2`
- `--line-height-normal: 1.4`
- `--line-height-relaxed: 1.6`

## Spacing System

### Spacing Variables
- `--spacing-xs: 4px`
- `--spacing-sm: 8px`
- `--spacing-md: 16px`
- `--spacing-lg: 24px`
- `--spacing-xl: 32px`
- `--spacing-xxl: 40px`
- `--spacing-xxxl: 48px`
- `--spacing-huge: 64px`
- `--spacing-massive: 80px`

### Layout Spacing
- `--container-width: 800px`
- `--container-padding: var(--spacing-lg)`
- `--section-padding: var(--spacing-lg)`
- `--item-padding: var(--spacing-md)`
- `--element-gap: var(--spacing-md)`
- `--section-gap: var(--spacing-xl)`

## Border Radius
- `--radius-sm: 4px`
- `--radius-md: 6px`
- `--radius-lg: 8px`
- `--radius-xl: 12px`

## Layout Components


### Navigation
- **Height**: `700px` (home), `fit-content` (other pages)
- **Padding**: `35px 0`
- **Text Size**: `var(--font-size-md)`
- **Active Color**: `#ecc4b2`
- **Hover Color**: `#ecc4b2`

### Cards
- **Background**: `#1a1a1a`
- **Border**: `1px solid rgba(236, 196, 178, 0.15)`
- **Border Radius**: `var(--radius-lg)`
- **Padding**: `var(--spacing-lg)`
- **Hover**: `translateY(-4px)`, `box-shadow: 0 8px 25px rgba(0, 0, 0, 0.3)`

### Videos
- **Aspect Ratio**: `16:9`
- **Border Radius**: `var(--radius-lg)`
- **Object Fit**: `cover`

### Buttons/Links
- **Text Decoration**: `none`
- **Hover Transition**: `color 0.2s ease`
- **Arrow**: `→` (inline)

## Page-Specific Styles

### Home Page
- **Headline Container**: `600px` height
- **Headline Text**: `220px` font size, absolute positioning
- **Hero Image**: Positioned `top: 80px`
- **Description**: Standard padding

### Other Pages (Experiments, Workshops, Contact)
- **Headline**: `fit-content` height, padding-based
- **Text Size**: `120px` (desktop), `60px` (mobile)
- **Layout**: Simple vertical flow

## Responsive Breakpoints

### Desktop
- No specific breakpoint (default)
- Grid: `repeat(auto-fit, minmax(350px, 1fr))`

### Tablet (max-width: 768px)
- Single column layouts
- Reduced padding
- Smaller font sizes

### Mobile (max-width: 480px)
- Full-width containers
- Minimal padding
- Even smaller fonts

## Component Examples

### Experiment Card Structure
```html
<div class="experiment-card">
    <div class="experiment-video">

    </div>
    <div class="experiment-content">
        <h3 class="experiment-title">Title</h3>
        <p class="experiment-description">Description text</p>
        <div class="experiment-meta">
            <span class="experiment-date">Date</span>
            <a href="#" class="experiment-link">View Project →</a>
        </div>
    </div>
</div>
```

### Navigation Structure
```html
<header class="header">
    <a href="index.html" class="name">Home</a>
    <a href="#" class="name active">Current Page</a>
    <a href="other.html" class="name">Other Page</a>
</header>
```

## Usage Guidelines

### Color Application
1. Use **Soft Peach** (`#ecc4b2`) for active states and accents
2. Use **Light Beige** (`#E3DFCC`) for hover states
3. Use **Secondary Text** (`#787878`) for descriptions
4. Use **Transparent Overlays** for subtle backgrounds and borders

### Typography Hierarchy
1. **Headlines**: `var(--font-size-xxxl)` or larger
2. **Titles**: `var(--font-size-xl)` to `var(--font-size-xxl)`
3. **Body Text**: `var(--font-size-base)`
4. **Meta Info**: `var(--font-size-sm)`

### Spacing Principles
1. Use spacing variables consistently
2. Follow the 8px grid system
3. Maintain visual breathing room
4. Group related elements with consistent gaps

### Interactive States
1. **Hover**: Subtle color change or lift effect
2. **Active**: Distinct color highlighting
3. **Focus**: Proper accessibility support
4. **Transition**: `0.2s ease` for smooth interactions

---

*This style guide should be updated when making design changes to maintain consistency across the portfolio.*
