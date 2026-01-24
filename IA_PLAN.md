# Information Architecture Plan
## Senior Designer Portfolio (10 Years Experience)

---

## 🎯 **Primary Goals & User Personas**

### **User Personas:**
1. **Recruiters/Hiring Managers** (Primary)
   - Goal: Quickly assess skills, experience, and fit
   - Need: Clear hierarchy, easy navigation, impressive work samples
   - Time: 2-3 minutes

2. **Design Peers/Industry** (Secondary)
   - Goal: Learn from your process, see detailed case studies
   - Need: Deep dives, methodology, thought process
   - Time: 10-15 minutes

3. **Potential Clients/Collaborators** (Tertiary)
   - Goal: Understand your expertise and approach
   - Need: Credibility, diverse work, clear communication

---

## 📐 **Current Structure Analysis**

### **What You Have:**
- ✅ Homepage with Featured Work + Selected Works
- ✅ About Me section
- ✅ Sidebar: Workshops, Play Ambassador, Rive Projects, Freebies
- ✅ 5 Project pages (HTML - needs conversion)
- ✅ No clear navigation structure
- ✅ No filtering/categorization
- ✅ No dedicated case study pages

### **Issues:**
- ❌ Everything on one page (information overload)
- ❌ No clear hierarchy of importance
- ❌ Projects not categorized (FinTech, Motion, Tutorials)
- ❌ No dedicated "Work" or "Projects" page
- ❌ Sidebar content mixed with main content
- ❌ No clear CTA or next steps

---

## 🏗️ **Proposed Information Architecture**

### **Level 1: Primary Navigation**

```
Home (/)
├── Work (/work)
│   ├── Featured Projects (Hero)
│   ├── All Projects (Grid with filters)
│   └── Project Detail Pages
├── About (/about)
│   ├── Bio & Experience
│   ├── Skills & Expertise
│   └── Recognition (Ambassador, Awards)
├── Workshops (/workshops)
│   ├── Talks & Presentations
│   └── Workshop Details
└── Contact (/contact)
    └── Get in Touch
```

### **Level 2: Content Organization**

#### **Homepage (/)** - First Impression
**Purpose:** Hook visitors, show best work, establish credibility

**Content Hierarchy:**
1. **Hero Section** (Above fold)
   - Name + Title
   - One-line value proposition
   - Primary CTA: "View Work" or "See Projects"

2. **Featured Project** (1-2 max)
   - Your absolute best work
   - Large, immersive presentation
   - Clear "View Case Study" CTA

3. **Quick Stats/Highlights** (Optional)
   - Years of experience
   - Companies worked with
   - Key achievements

4. **Selected Works Preview** (3-4 projects)
   - Diverse representation
   - Grid layout
   - "View All Work" link

5. **About Preview** (Brief)
   - 2-3 sentences
   - Link to full About page

6. **Recent Activity** (Sidebar or Footer)
   - Latest workshop/talk
   - Recent project
   - Social links

---

#### **Work Page (/work)** - Portfolio Hub
**Purpose:** Comprehensive view of all projects with filtering

**Content Structure:**
1. **Filter/Tag System**
   - By Industry: FinTech, HealthTech, Banking
   - By Type: Product Design, Motion Design, Design Systems
   - By Role: Lead Designer, Design Director, Individual Contributor
   - By Year: 2024, 2023, 2022...

2. **Project Grid**
   - Consistent card design
   - Hover states with preview
   - Quick info: Client, Year, Role, Tags

3. **Featured Section** (Top)
   - 2-3 featured projects (different from homepage)

4. **All Projects** (Below)
   - Chronological or by importance
   - Load more / Infinite scroll option

---

#### **Project Detail Pages (/work/[slug])**
**Purpose:** Deep dive into your process and impact

**Standard Structure:**
1. **Hero**
   - Project title
   - Client/Company
   - Year, Role, Team size
   - Hero image/video

2. **Overview**
   - Problem statement
   - Your role & responsibilities
   - Key metrics/outcomes (if available)

3. **Process** (Show your thinking)
   - Research & Discovery
   - Ideation & Concepts
   - Design Decisions
   - Iterations

4. **Solution**
   - Final designs
   - Key features
   - Motion/interactions
   - Design system elements

5. **Impact/Results**
   - Metrics (if available)
   - User feedback
   - Business impact

6. **Next Project** (Navigation)
   - Previous/Next project links

---

#### **About Page (/about)** - Your Story
**Purpose:** Build trust, show personality, establish expertise

**Content Structure:**
1. **Hero**
   - Professional photo
   - Current role & location
   - One-line bio

2. **Experience Timeline**
   - Current: Loop Health (Staff Product Designer)
   - Previous: ETMoney, HDFC Bank, Paytm
   - Key achievements at each

3. **Expertise & Skills**
   - Visual representation
   - Categories: Design, Motion, Prototyping, Leadership

4. **Recognition**
   - Rive Ambassador
   - Play Ambassador
   - Awards, Publications, Speaking

5. **Philosophy/Approach**
   - Design principles
   - Working style
   - What you're passionate about

6. **Contact CTA**
   - "Let's work together"
   - Email, LinkedIn, etc.

---

#### **Workshops Page (/workshops)**
**Purpose:** Show thought leadership and teaching ability

**Content:**
- List of workshops/talks
- Videos/Recordings
- Slides/Presentations
- Topics covered
- Audience/Event details

---

## 🗺️ **User Journeys**

### **Journey 1: Quick Assessment (Recruiter)**
```
Home → Featured Project → About (Quick scan) → Contact
Time: 2-3 minutes
Goal: "Is this person qualified?"
```

### **Journey 2: Deep Dive (Design Peer)**
```
Home → Work → Project Detail (Full case study) → Another Project → About
Time: 15-20 minutes
Goal: "Learn from their process"
```

### **Journey 3: Collaboration (Potential Client)**
```
Home → About → Work (Browse) → Contact
Time: 5-10 minutes
Goal: "Can they help us?"
```

---

## 📊 **Content Prioritization Matrix**

### **Must Have (P0):**
- ✅ Homepage with clear value prop
- ✅ Work/Projects page with filtering
- ✅ 3-5 detailed case studies
- ✅ About page with experience
- ✅ Contact information
- ✅ Responsive design

### **Should Have (P1):**
- ⚠️ Workshops/Talks page
- ⚠️ Project filtering/categorization
- ⚠️ Search functionality
- ⚠️ Blog/Articles (if you write)

### **Nice to Have (P2):**
- 💡 Testimonials
- 💡 Process documentation
- 💡 Design system showcase
- 💡 Freebies/Resources page

---

## 🎨 **Navigation Structure**

### **Primary Navigation (Header)**
```
[Logo/Name] | Work | About | Workshops | Contact
```

### **Secondary Navigation (Footer)**
```
- Links: LinkedIn, GitHub, Email
- Legal: Privacy, Terms
- Quick Links: Resume Download
```

### **Breadcrumbs** (For deep pages)
```
Home > Work > ET Money Onboarding
```

---

## 📱 **Mobile Considerations**

- Simplified navigation (hamburger menu)
- Stacked content (no sidebar)
- Touch-friendly CTAs
- Fast loading (optimized images/videos)
- Thumb-friendly navigation

---

## 🔍 **Content Gaps to Fill**

1. **Project Case Studies**
   - Convert 5 HTML project pages to proper case studies
   - Add process sections
   - Include metrics/outcomes

2. **About Page Content**
   - Expand experience timeline
   - Add skills visualization
   - Include testimonials (if available)

3. **Workshops Page**
   - Create dedicated page
   - Add workshop details
   - Link to recordings/slides

4. **Contact Page**
   - Dedicated contact form or clear CTA
   - Availability/booking (if freelance)

---

## ✅ **Recommended Implementation Order**

### **Phase 1: Foundation** (Week 1)
1. Create `/work` page with project grid
2. Convert 2-3 best projects to detailed case studies
3. Create `/about` page with full content
4. Add primary navigation

### **Phase 2: Enhancement** (Week 2)
5. Add filtering to work page
6. Convert remaining projects
7. Create `/workshops` page
8. Add contact page/form

### **Phase 3: Polish** (Week 3)
9. Add search functionality
10. Optimize for SEO
11. Add analytics
12. Test all user journeys

---

## 🎯 **Success Metrics**

- **Engagement:** Time on site, pages per session
- **Conversion:** Contact form submissions, resume downloads
- **Navigation:** Bounce rate, exit pages
- **Content:** Most viewed projects, popular pages

---

## 💡 **Best Practices for Senior Designer Portfolios**

1. **Quality over Quantity** - 5-7 great projects > 20 mediocre ones
2. **Show Process** - Recruiters want to see HOW you think
3. **Tell Stories** - Each project should have a narrative
4. **Be Specific** - "Led design for 5M users" > "Worked on app"
5. **Show Range** - Different industries, scales, challenges
6. **Keep Updated** - Recent work shows you're active
7. **Make it Personal** - Your unique perspective matters

---

## 🚀 **Next Steps**

1. Review this IA plan
2. Prioritize which sections to build first
3. Audit existing content - what's missing?
4. Create content outline for each page
5. Design navigation structure
6. Build in phases (start with Work + About)

Would you like me to start implementing any of these sections?
