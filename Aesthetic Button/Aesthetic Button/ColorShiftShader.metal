#include <metal_stdlib>
#include <SwiftUI/SwiftUI_Metal.h>
using namespace metal;

// ============================================
// COLOR VARIABLES - Easy to update!
// ============================================

// Hue values (0.0-1.0 in HSV color space)
constant half HUE_NIGHT = 0.6;           // Blue-purple
constant half HUE_DAWN_START = 0.6;      // Blue
constant half HUE_DAWN_END = 0.08;       // Orange
constant half HUE_MORNING_START = 0.08;  // Orange
constant half HUE_MORNING_END = 0.13;    // Yellow-orange
constant half HUE_LATE_MORNING = 0.13;   // Yellow
constant half HUE_MIDDAY_START = 0.13;   // Yellow
constant half HUE_MIDDAY_END = 0.55;     // Blue
constant half HUE_AFTERNOON_START = 0.55; // Blue
constant half HUE_AFTERNOON_END = 0.12;   // Yellow
constant half HUE_LATE_AFTERNOON_START = 0.12; // Yellow
constant half HUE_LATE_AFTERNOON_END = 0.08;    // Orange
constant half HUE_SUNSET_START = 0.08;    // Orange
constant half HUE_SUNSET_END = 0.0;       // Red
constant half HUE_EVENING_START = 0.0;    // Red
constant half HUE_EVENING_END = 0.6;      // Blue-purple

// Saturation values (0.0-1.0)
constant half SAT_NIGHT_MIN = 0.6;
constant half SAT_NIGHT_MAX = 0.9;
constant half SAT_DAWN_START = 0.7;
constant half SAT_DAWN_END = 0.85;
constant half SAT_MORNING_START = 0.85;
constant half SAT_MORNING_END = 0.75;
constant half SAT_LATE_MORNING = 0.75;
constant half SAT_MIDDAY_START = 0.75;
constant half SAT_MIDDAY_END = 0.65;
constant half SAT_AFTERNOON_START = 0.65;
constant half SAT_AFTERNOON_END = 0.7;
constant half SAT_LATE_AFTERNOON_MIN = 0.7;
constant half SAT_LATE_AFTERNOON_MAX = 0.95;
constant half SAT_SUNSET_MIN = 0.85;
constant half SAT_SUNSET_MAX = 1.0;
constant half SAT_EVENING_START = 0.95;
constant half SAT_EVENING_END = 0.65;

// Value/Brightness values (0.0-1.0)
constant half VAL_NIGHT_MIN = 0.3;
constant half VAL_NIGHT_MAX = 0.5;
constant half VAL_DAWN_START = 0.4;
constant half VAL_DAWN_END = 0.65;
constant half VAL_MORNING_START = 0.65;
constant half VAL_MORNING_END = 0.9;
constant half VAL_LATE_MORNING_MIN = 0.85;
constant half VAL_LATE_MORNING_MAX = 0.95;
constant half VAL_MIDDAY_MIN = 0.9;
constant half VAL_MIDDAY_MAX = 0.98;
constant half VAL_AFTERNOON_MIN = 0.85;
constant half VAL_AFTERNOON_MAX = 0.95;
constant half VAL_LATE_AFTERNOON_MIN = 0.7;
constant half VAL_LATE_AFTERNOON_MAX = 0.85;
constant half VAL_SUNSET_START = 0.65;
constant half VAL_SUNSET_END = 0.5;
constant half VAL_EVENING_START = 0.5;
constant half VAL_EVENING_END = 0.35;

// Gradient adjustments
constant half GRADIENT_TOP_BOOST = 0.15;      // How much brighter/saturated at top
constant half GRADIENT_BOTTOM_DARKEN = 0.2;   // How much darker at bottom
constant half GRADIENT_BOTTOM_DESAT = 0.15;    // How much less saturated at bottom

// Minimum values to ensure vibrancy
constant half MIN_SATURATION = 0.5;
constant half MIN_BRIGHTNESS = 0.4;

// ============================================
// HELPER FUNCTIONS
// ============================================

// Helper function to convert HSV to RGB
half3 hsv2rgb(half3 c) {
    half4 K = half4(1.0, 2.0 / 3.0, 1.0 / 3.0, 3.0);
    half3 p = abs(fract(c.xxx + K.xyz) * 6.0 - K.www);
    return c.z * mix(K.xxx, clamp(p - K.xxx, 0.0, 1.0), c.y);
}

// Map time of day (0.0-1.0) to color palette
// 0.0 = midnight, 0.25 = 6am, 0.5 = noon, 0.75 = 6pm, 1.0 = midnight
half3 getTimeOfDayColor(half timeOfDay, half yPos) {
    // Time periods (normalized 0-1):
    // 0.0-0.25 (midnight-6am): Night - dark blue/purple
    // 0.25-0.33 (6am-8am): Dawn - dark blue to orange
    // 0.33-0.42 (8am-10am): Morning - bright orange/yellow
    // 0.42-0.5 (10am-12pm): Late morning - bright yellow
    // 0.5-0.58 (12pm-2pm): Midday - bright blue/white
    // 0.58-0.67 (2pm-4pm): Afternoon - warm yellow
    // 0.67-0.75 (4pm-6pm): Late afternoon - warm orange
    // 0.75-0.83 (6pm-8pm): Sunset - orange/red
    // 0.83-1.0 (8pm-midnight): Evening/Night - dark blue/purple
    
    half hue, sat, val;
    
    if (timeOfDay < 0.25) {
        // Night (midnight-6am): Dark blue/purple
        hue = HUE_NIGHT;
        sat = SAT_NIGHT_MIN + (SAT_NIGHT_MAX - SAT_NIGHT_MIN) * yPos;
        val = VAL_NIGHT_MIN + (VAL_NIGHT_MAX - VAL_NIGHT_MIN) * (1.0 - yPos);
    } else if (timeOfDay < 0.33) {
        // Dawn (6am-8am): Transition from night to sunrise
        half t = (timeOfDay - 0.25) / 0.08;
        hue = mix(half(HUE_DAWN_START), half(HUE_DAWN_END), t);
        sat = mix(half(SAT_DAWN_START), half(SAT_DAWN_END), t);
        val = mix(half(VAL_DAWN_START), half(VAL_DAWN_END), t);
    } else if (timeOfDay < 0.42) {
        // Morning (8am-10am): Bright orange/yellow sunrise
        half t = (timeOfDay - 0.33) / 0.09;
        hue = HUE_MORNING_START + (HUE_MORNING_END - HUE_MORNING_START) * t;
        sat = SAT_MORNING_START + (SAT_MORNING_END - SAT_MORNING_START) * t;
        val = VAL_MORNING_START + (VAL_MORNING_END - VAL_MORNING_START) * t;
    } else if (timeOfDay < 0.5) {
        // Late morning (10am-12pm): Bright yellow
        hue = HUE_LATE_MORNING;
        sat = SAT_LATE_MORNING;
        val = VAL_LATE_MORNING_MIN + (VAL_LATE_MORNING_MAX - VAL_LATE_MORNING_MIN) * yPos;
    } else if (timeOfDay < 0.58) {
        // Midday (12pm-2pm): Bright blue/white sky
        half t = (timeOfDay - 0.5) / 0.08;
        hue = mix(half(HUE_MIDDAY_START), half(HUE_MIDDAY_END), t);
        sat = mix(half(SAT_MIDDAY_START), half(SAT_MIDDAY_END), t);
        val = VAL_MIDDAY_MIN + (VAL_MIDDAY_MAX - VAL_MIDDAY_MIN) * yPos;
    } else if (timeOfDay < 0.67) {
        // Afternoon (2pm-4pm): Warm yellow
        half t = (timeOfDay - 0.58) / 0.09;
        hue = mix(half(HUE_AFTERNOON_START), half(HUE_AFTERNOON_END), t);
        sat = mix(half(SAT_AFTERNOON_START), half(SAT_AFTERNOON_END), t);
        val = VAL_AFTERNOON_MIN + (VAL_AFTERNOON_MAX - VAL_AFTERNOON_MIN) * yPos;
    } else if (timeOfDay < 0.75) {
        // Late afternoon (4pm-6pm): Warm orange
        half t = (timeOfDay - 0.67) / 0.08;
        hue = mix(half(HUE_LATE_AFTERNOON_START), half(HUE_LATE_AFTERNOON_END), t);
        sat = SAT_LATE_AFTERNOON_MIN + (SAT_LATE_AFTERNOON_MAX - SAT_LATE_AFTERNOON_MIN) * t;
        val = VAL_LATE_AFTERNOON_MIN + (VAL_LATE_AFTERNOON_MAX - VAL_LATE_AFTERNOON_MIN) * yPos;
    } else if (timeOfDay < 0.83) {
        // Sunset (6pm-8pm): Orange/red
        half t = (timeOfDay - 0.75) / 0.08;
        hue = mix(half(HUE_SUNSET_START), half(HUE_SUNSET_END), t);
        sat = SAT_SUNSET_MIN + (SAT_SUNSET_MAX - SAT_SUNSET_MIN) * t;
        val = VAL_SUNSET_START + (VAL_SUNSET_END - VAL_SUNSET_START) * t;
    } else {
        // Evening/Night (8pm-midnight): Dark blue/purple
        half t = (timeOfDay - 0.83) / 0.17;
        hue = mix(half(HUE_EVENING_START), half(HUE_EVENING_END), t);
        sat = mix(half(SAT_EVENING_START), half(SAT_EVENING_END), t);
        val = mix(half(VAL_EVENING_START), half(VAL_EVENING_END), t);
    }
    
    // Apply vertical gradient variation
    // Top of screen (sky) vs bottom (ground/horizon)
    if (yPos < 0.5) {
        // Top half: sky colors (brighter, more saturated)
        val = val + GRADIENT_TOP_BOOST * (0.5 - yPos) * 2.0;
        sat = sat + GRADIENT_TOP_BOOST * (0.5 - yPos) * 2.0;
    } else {
        // Bottom half: horizon/ground (slightly darker, but still vibrant)
        val = val * (1.0 - GRADIENT_BOTTOM_DARKEN * (yPos - 0.5) * 2.0);
        sat = sat * (1.0 - GRADIENT_BOTTOM_DESAT * (yPos - 0.5) * 2.0);
    }
    
    // Ensure minimum brightness and saturation for vibrancy
    sat = max(sat, half(MIN_SATURATION));
    val = max(val, half(MIN_BRIGHTNESS));
    
    return half3(hue, sat, val);
}

[[ stitchable ]] half4 colorShift(float2 position, half4 currentColor, float timeOfDay) {
    // Normalize Y position for vertical gradient (0.0 = top, 1.0 = bottom)
    float yNormalized = clamp(position.y / 1000.0, 0.0, 1.0);
    
    // Get time-of-day based color
    half3 hsv = getTimeOfDayColor(half(timeOfDay), half(yNormalized));
    
    // Convert HSV to RGB
    half3 rgb = hsv2rgb(hsv);
    
    return half4(rgb, 1.0);
}
