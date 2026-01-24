# GA4 Events Checklist

## How to Verify Events in Google Analytics

### Step 1: Open GA4 Realtime Reports
1. Go to: https://analytics.google.com
2. Select property: **G-SYDGLK4LKX**
3. Navigate to: **Reports → Realtime**
4. Look for "Event count by Event name"

### Step 2: Test Events on Your Site
Interact with your site and check if these events appear:

## ✅ Events We're Tracking

### 1. **project_click**
- **When:** User clicks on a project card
- **Parameters:**
  - `project_title` - Name of the project
  - `project_slug` - URL slug
  - `project_tags` - Tags (e.g., "Rive, Live Projects")
- **How to test:** Click any project on homepage

### 2. **project_view**
- **When:** User views a project detail page
- **Parameters:**
  - `project_title` - Name of the project
  - `project_slug` - URL slug
- **How to test:** Open any project detail page

### 3. **project_time_spent**
- **When:** User spends time on a project detail page
- **Parameters:**
  - `project_title` - Name of the project
  - `project_slug` - URL slug
  - `time_spent_seconds` - Time in seconds
- **How to test:** Stay on a project page for 10+ seconds, then navigate away

### 4. **project_section_click**
- **When:** User views a section (Context, Process, Results) on project page
- **Parameters:**
  - `project_title` - Name of the project
  - `project_slug` - URL slug
  - `section_name` - Section name (Context, Process, Results)
- **How to test:** Scroll to sections on a project detail page

### 5. **filter_change**
- **When:** User changes filter (All, Live Projects, Rive)
- **Parameters:**
  - `filter_name` - Filter name
- **How to test:** Click filter buttons on homepage

### 6. **grid_toggle**
- **When:** User switches between 1x1 and 2x2 grid
- **Parameters:**
  - `grid_size` - "1x1" or "2x2"
- **How to test:** Click grid toggle buttons

### 7. **navigation_click**
- **When:** User clicks header navigation links
- **Parameters:**
  - `page_name` - Page name (work, about, contact, etc.)
  - `link_text` - Link text
- **How to test:** Click Work, About, Contact, Workshops links

### 8. **video_play**
- **When:** Video starts playing on hover
- **Parameters:**
  - `video_title` - Project title
  - `video_src` - Video source path
- **How to test:** Hover over project videos

### 9. **video_hover**
- **When:** User hovers over a video
- **Parameters:**
  - `video_title` - Project title
- **How to test:** Hover over project videos

## 🧪 Quick Test in Browser Console

Open browser console (F12) and run:

```javascript
// Check GA4 status
checkGA4Status()

// Test all events
analytics.testAll()
```

## 📊 Where to Check in GA4

1. **Realtime Reports** (30 seconds delay)
   - Reports → Realtime → Event count by Event name

2. **Events Report** (5-60 minutes delay)
   - Reports → Engagement → Events

3. **DebugView** (Real-time, most accurate)
   - Admin → DebugView (requires Google Analytics Debugger extension)

## ✅ Verification Checklist

- [ ] `project_click appears when clicking projects`
- [ ] `project_view appears when viewing project pages`
- [ ] `project_time_spent appears after staying on project pages`
- [ ] `project_section_click appears when scrolling to sections`
- [ ] `filter_change appears when changing filters`
- [ ] `grid_toggle appears when switching grid sizes`
- [ ] `navigation_click appears when clicking nav links`
- [ ] `video_play appears when hovering over videos`
- [ ] `video_hover appears when hovering over videos`

## 🔍 Troubleshooting

If events don't appear:
1. Check browser console for errors
2. Run `checkGA4Status()` in console
3. Verify GA4 property ID is correct (G-SYDGLK4LKX)
4. Check Network tab for requests to `google-analytics.com/g/collect`
5. Disable ad blockers
6. Wait 30-60 seconds for Realtime reports
