/**
 * Analytics utility for GA4 event tracking
 * Provides type-safe helper functions for conversion tracking
 */

// Extend Window interface to include gtag
declare global {
  interface Window {
    gtag?: (...args: any[]) => void;
    dataLayer?: any[];
  }
}

export interface CTAClickParams {
  page_slug: string;
  cta_position: "hero" | "navbar" | "mid-content" | "bottom" | "exit-intent";
  cta_text: string;
}

export interface AppStoreClickParams extends CTAClickParams {
  utm_source: string;
  utm_medium: string;
  utm_campaign: string;
}

export interface ScrollDepthParams {
  page_slug: string;
  scroll_percentage: 25 | 50 | 75 | 100;
}

export interface EmailCaptureParams {
  page_slug: string;
  lead_magnet: string;
  form_position: string;
}

export interface ExitIntentParams {
  page_slug: string;
  popup_offer: string;
}

/**
 * Track CTA button clicks
 */
export function trackCTAClick(params: CTAClickParams): void {
  if (typeof window !== "undefined" && window.gtag) {
    window.gtag("event", "cta_click", {
      page_slug: params.page_slug,
      cta_position: params.cta_position,
      cta_text: params.cta_text,
    });
  }
}

/**
 * Track App Store link clicks with UTM parameters
 */
export function trackAppStoreClick(params: AppStoreClickParams): void {
  if (typeof window !== "undefined" && window.gtag) {
    window.gtag("event", "app_store_click", {
      page_slug: params.page_slug,
      cta_position: params.cta_position,
      cta_text: params.cta_text,
      utm_source: params.utm_source,
      utm_medium: params.utm_medium,
      utm_campaign: params.utm_campaign,
    });
  }
}

/**
 * Track scroll depth milestones
 */
export function trackScrollDepth(params: ScrollDepthParams): void {
  if (typeof window !== "undefined" && window.gtag) {
    window.gtag("event", "scroll_depth", {
      page_slug: params.page_slug,
      scroll_percentage: params.scroll_percentage,
    });
  }
}

/**
 * Track email form submissions
 */
export function trackEmailCapture(params: EmailCaptureParams): void {
  if (typeof window !== "undefined" && window.gtag) {
    window.gtag("event", "email_capture", {
      page_slug: params.page_slug,
      lead_magnet: params.lead_magnet,
      form_position: params.form_position,
    });
  }
}

/**
 * Track exit-intent popup displays
 */
export function trackExitIntentShown(params: ExitIntentParams): void {
  if (typeof window !== "undefined" && window.gtag) {
    window.gtag("event", "exit_intent_shown", {
      page_slug: params.page_slug,
      popup_offer: params.popup_offer,
    });
  }
}

/**
 * Build App Store URL with UTM parameters
 */
export function buildAppStoreURL(params: {
  utm_source: string;
  utm_medium: string;
  utm_campaign: string;
}): string {
  const baseURL =
    "https://apps.apple.com/us/app/noolife-10-week-habit-plan/id6754310402";
  const utmParams = new URLSearchParams({
    utm_source: params.utm_source,
    utm_medium: params.utm_medium,
    utm_campaign: params.utm_campaign,
  });
  return `${baseURL}?${utmParams.toString()}`;
}

/**
 * Get current page slug from URL pathname
 * Defaults to 'home' for index page
 */
export function getPageSlug(): string {
  if (typeof window === "undefined") return "home";
  const pathname = window.location.pathname;
  if (pathname === "/" || pathname === "") return "home";
  return pathname.replace(/^\/|\/$/g, ""); // Remove leading/trailing slashes
}

// Step 2: Mark Events as Conversions
// Navigate to Events
// Admin → Property → Events
// Wait for your events to appear (may take 24-48hrs after first traffic, or trigger them manually by clicking CTAs on your site)
// Mark as Conversions Toggle the "Mark as conversion" switch for:
// ✅ app_store_click (PRIMARY - actual install intent)
// ✅ email_capture (when Phase 2 implemented)
// Optional: scroll_depth (only mark the 75% threshold as conversion for "high engagement")
// Step 3: Create Custom Conversion (High Engagement)
// Admin → Property → Events → Create event
// Set up event modification:
// Custom event name: high_engagement
// Matching conditions:
// Parameter: scroll_percentage
// Operator: equals
// Value: 75
// Copy parameters from the source event: ✅ (checked)
// Mark high_engagement as conversion
// Step 4: Verify Setup
// Test events are firing:
// Open your site in browser
// Press F12 → Console tab
// Type: window.dataLayer and press Enter
// Click a CTA button
// Type window.dataLayer again - you should see new event objects with cta_click and app_store_click
// Or use GA4 DebugView:
// Admin → Property → DebugView
// Install Google Analytics Debugger extension
// Visit your site - events appear in real-time
// Optional: Set Up Explorations
// CTA Performance Report:
// Explore → Free form
// Dimensions: Page Slug, CTA Position
// Metrics: Event count (app_store_click), Event count (cta_click)
// Compare which position converts best
