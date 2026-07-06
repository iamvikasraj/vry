// Single source of truth for the GA4 measurement ID.
// Set NEXT_PUBLIC_GA_ID in the environment to override; falls back to the
// portfolio's production property so nothing breaks if the env var is missing.
export const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_ID || 'G-SYDGLK4LKX'

// Only log analytics chatter in development.
export const GA_DEBUG = process.env.NODE_ENV !== 'production'
