// GA4 Test Script - Paste this in browser console

(function() {
  console.log('🧪 GA4 Test Script\n');
  
  // Check GA4 status
  const checkStatus = () => {
    const status = {
      gtag: typeof window.gtag === 'function',
      dataLayer: Array.isArray(window.dataLayer),
      dataLayerLength: window.dataLayer?.length || 0,
      propertyId: 'G-SYDGLK4LKX'
    };
    console.table(status);
    return status;
  };
  
  // Send test event
  const sendTestEvent = () => {
    if (typeof window.gtag === 'function') {
      window.gtag('event', 'test_verification', {
        test_param: 'verification_test',
        timestamp: new Date().toISOString(),
        test_value: 123
      });
      console.log('✅ Test event sent: test_verification');
      console.log('📊 Check GA4 Realtime reports now');
    } else if (window.dataLayer) {
      window.dataLayer.push({
        event: 'test_verification',
        test_param: 'verification_test',
        timestamp: new Date().toISOString()
      });
      console.log('⚠️ gtag not ready, queued to dataLayer');
    } else {
      console.error('❌ GA4 not initialized');
    }
  };
  
  // Check network requests
  const checkNetwork = () => {
    console.log('\n📡 Check Network tab for:');
    console.log('   - google-analytics.com/g/collect');
    console.log('   - googletagmanager.com/gtag/js');
  };
  
  console.log('=== GA4 Status ===');
  checkStatus();
  console.log('\n=== Sending Test Event ===');
  sendTestEvent();
  checkNetwork();
  
  console.log('\n💡 Next steps:');
  console.log('   1. Open GA4 → Reports → Realtime');
  console.log('   2. Look for "test_verification" event');
  console.log('   3. Wait 30-60 seconds if not showing');
})();
