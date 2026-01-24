# GA4 Integration Verification Guide

## Quick Verification Steps

### 1. Browser Console Check (Immediate)

1. Open your website in a browser
2. Open Developer Tools (F12 or Right-click → Inspect)
3. Go to the **Console** tab
4. Check for:
   - ✅ "GA4 initialized with ID: G-SYDGLK4LKX" (in development mode)
   - ✅ No errors about gtag or dataLayer
   - ✅ When you interact with the site, you should see "GA4 Event:" logs (in development)

### 2. Network Tab Check

1. Open Developer Tools → **Network** tab
2. Filter by "gtag" or "collect"
3. Interact with your site (click projects, navigate)
4. You should see requests to:
   - `https://www.googletagmanager.com/gtag/js?id=G-SYDGLK4LKX`
   - `https://www.google-analytics.com/g/collect?...`

### 3. GA4 Realtime Report (30 seconds delay)

1. Go to: https://analytics.google.com
2. Select your property: **G-SYDGLK4LKX**
3. Navigate to: **Reports → Realtime**
4. Interact with your site:
   - Click on a project
   - Change filters
   - Navigate between pages
   - Hover over videos
5. Within 30 seconds, you should see:
   - Active users count increase
   - Events appearing in "Event count by Event name"
   - Page views updating

### 4. Manual Test in Browser Console

Open browser console and run:

```javascript
// Check if GA4 is loaded
console.log('gtag available:', typeof window.gtag !== 'undefined')
console.log('dataLayer:', window.dataLayer)

// Send a test event manually
window.gtag('event', 'test_manual_event', {
  test_param: 'manual_test',
  test_value: 123
})

// Check if event was sent
console.log('Last dataLayer entry:', window.dataLayer[window.dataLayer.length - 1])
```

### 5. GA4 DebugView (Most Accurate)

1. Install **Google Analytics Debugger** Chrome extension
2. Enable it
3. Go to GA4 → **Admin → DebugView**
4. Interact with your site
5. You'll see events in real-time with all parameters

### 6. Verify Events in GA4

1. Go to: **Reports → Engagement → Events**
2. Wait 5-60 minutes for events to appear
3. Look for these events:
   - `project_click`
   - `project_view`
   - `project_time_spent`
   - `project_section_click`
   - `filter_change`
   - `grid_toggle`
   - `navigation_click`
   - `video_play`
   - `video_hover`

### 7. Check Event Parameters

1. Go to: **Reports → Engagement → Events**
2. Click on any event (e.g., `project_click`)
3. Click "View events in Explore"
4. You should see parameters like:
   - `project_title`
   - `project_slug`
   - `project_tags`
   - `interaction_type`

## Common Issues & Solutions

### Issue: No events showing in Realtime
**Solutions:**
- Check browser console for errors
- Verify GA4 property ID is correct (G-SYDGLK4LKX)
- Disable ad blockers
- Check if site is deployed with latest code
- Wait 30-60 seconds for events to appear

### Issue: "gtag is not defined" error
**Solutions:**
- Check if GA4 script is loading (Network tab)
- Verify script is in `<head>` or before closing `</body>`
- Check for JavaScript errors blocking script execution

### Issue: Events show but no parameters
**Solutions:**
- Parameters may take longer to process
- Check DebugView for real-time parameter verification
- Verify custom dimensions are created in GA4 (Admin → Custom Definitions)

## Testing Checklist

- [ ] GA4 script loads (Network tab)
- [ ] No console errors
- [ ] Realtime shows active users
- [ ] Events appear in Realtime (within 30 seconds)
- [ ] Event parameters are visible in DebugView
- [ ] Events appear in standard reports (after 5-60 minutes)

## Quick Test Script

Add this to your browser console to test all tracking:

```javascript
// Test all analytics functions
if (window.gtag) {
  console.log('✅ GA4 is loaded');
  
  // Test project click
  window.gtag('event', 'project_click', {
    project_title: 'Test Project',
    project_slug: 'test-project',
    project_tags: 'Test, Demo',
    interaction_type: 'project_interaction'
  });
  
  console.log('✅ Test events sent. Check GA4 Realtime reports.');
} else {
  console.error('❌ GA4 not loaded. Check script implementation.');
}
```
