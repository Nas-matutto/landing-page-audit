// Google Analytics event tracking
export const trackGAEvent = (eventName: string, parameters?: Record<string, any>) => {
  if (typeof window !== 'undefined' && (window as any).gtag) {
    (window as any).gtag('event', eventName, parameters)
  }
}

// Convenience functions for common events
export const trackCTAClick = (buttonName: string, location: string) => {
  trackGAEvent('cta_click', {
    button_name: buttonName,
    location: location,
  })
}

export const trackSignup = () => {
  trackGAEvent('sign_up', {
    method: 'website',
  })
}

export const trackPricingView = (plan: string) => {
  trackGAEvent('view_pricing', {
    plan_name: plan,
  })
}