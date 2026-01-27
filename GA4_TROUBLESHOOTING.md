# GA4 Troubleshooting Guide

## If events are NOT showing in Google Analytics

### Step 1: Verify Property ID
1. Go to GA4 Admin → Property Settings
2. Check the **Measurement ID** - should be `G-SYDGLK4LKX`
3. If different, update it in `app/layout.tsx`

### Step 2: Check Browser Console
Open browser console (F12) and check:

```javascript
// Check if GA4 is loaded
console.log('gtag:', typeof window.gtag)
console.log('dataLayer:', window.dataLayer)

// Should show:
// gtag: "function"
// dataLayer: [array with entries]
```

### Step 3: Check Network Requests
1. Open Developer Tools → Network tab
2. Filter by: `collect` or `gtag`
3. Interact with your site
4. You should see requests to:
   - `https://www.google-analytics.com/g/collect?...`
   - `https://www.googletagmanager.com/gtag/js?id=G-SYDGLK4LKX`

### Step 4: Test with DebugView
1. Install **Google Analytics Debugger** Chrome extension
2. Enable it
3. Go to GA4 → Admin → DebugView
4. Interact with your site
5. You should see events in real-time

### Step 5: Verify Property Access
1. Make sure you're logged into the correct Google account
2. Verify you have access to property `G-SYDGLK4LKX`
3. Check Admin → Property Access

### Step 6: Check for Ad Blockers
- Disable ad blockers (uBlock Origin, AdBlock Plus, etc.)
- Try incognito/private mode
- Some browsers block GA4 by default

### Step 7: Verify Script is in HTML
1. View page source (Ctrl+U or Cmd+U)
2. Search for: `G-SYDGLK4LKX`
3. Should find the GA4 script tags

### Step 8: Test with Manual Event
Open browser console and run:

```javascript
// Manual test
window.gtag('event', 'manual_test', {
  test_param: 'test_value'
});

// Check dataLayer
console.log('Last event:', window.dataLayer[window.dataLayer.length - 1]);
```

### Step 9: Check Realtime Reports
1. Go to: Reports → Realtime
2. Wait 30-60 seconds after interacting
3. Events should appear in "Event count by Event name"

### Step 10: Verify Domain/URL
1. Check GA4 Admin → Data Streams
2. Verify your website URL is configured
3. Make sure the stream is active

## Common Issues

### Issue: "gtag is not defined"
**Solution:** Script not loading. Check:
- Network tab for script loading errors
- Console for JavaScript errors
- Ad blockers disabled

### Issue: Events show in console but not GA4
**Solution:** 
- Property ID might be wrong
- Wrong GA4 property selected
- Events need 30-60 seconds to appear in Realtime

### Issue: No network requests to google-analytics.com
**Solution:**
- Script not loading
- Ad blocker blocking requests
- Check browser console for errors

## Quick Test Checklist

- [ ] Property ID correct: `G-SYDGLK4LKX`
- [ ] Script loads (Network tab)
- [ ] No console errors
- [ ] gtag function exists
- [ ] dataLayer has entries
- [ ] Network requests to google-analytics.com
- [ ] Ad blockers disabled
- [ ] Correct GA4 property selected
- [ ] Wait 30-60 seconds for Realtime

## Still Not Working?

1. Check the debug HTML file: `/ga4-debug.html`
2. Run in console: `analytics.testAll()`
3. Check status: `checkGA4Status()`
4. Verify property ID in GA4 dashboard matches code
