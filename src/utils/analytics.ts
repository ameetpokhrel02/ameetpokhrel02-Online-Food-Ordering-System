interface AnalyticsEvent {
  category: string;
  action: string;
  label?: string;
  value?: number;
}

interface ErrorEvent {
  error: Error;
  componentStack?: string;
  userInfo?: Record<string, any>;
}

class Analytics {
  private static instance: Analytics;
  private isInitialized: boolean = false;

  private constructor() {}

  static getInstance(): Analytics {
    if (!Analytics.instance) {
      Analytics.instance = new Analytics();
    }
    return Analytics.instance;
  }

  initialize() {
    if (this.isInitialized) return;
    
    // Initialize analytics services here
    // Example: Google Analytics, Mixpanel, etc.
    
    this.isInitialized = true;
  }

  trackEvent(event: AnalyticsEvent) {
    if (!this.isInitialized) {
      console.warn('Analytics not initialized');
      return;
    }

    // Send event to analytics service
    console.log('Analytics Event:', event);
  }

  trackError(error: ErrorEvent) {
    if (!this.isInitialized) {
      console.warn('Analytics not initialized');
      return;
    }

    // Send error to error tracking service
    console.error('Error Event:', error);
  }

  trackPageView(path: string) {
    if (!this.isInitialized) {
      console.warn('Analytics not initialized');
      return;
    }

    // Track page view
    console.log('Page View:', path);
  }

  trackUserAction(action: string, details?: Record<string, any>) {
    if (!this.isInitialized) {
      console.warn('Analytics not initialized');
      return;
    }

    // Track user action
    console.log('User Action:', { action, details });
  }
}

export const analytics = Analytics.getInstance();

// Example usage:
// analytics.initialize();
// analytics.trackEvent({ category: 'User', action: 'Login' });
// analytics.trackError({ error: new Error('Something went wrong') });
// analytics.trackPageView('/products');
// analytics.trackUserAction('Add to Cart', { productId: 123 }); 