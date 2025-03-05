
import * as Sentry from '@sentry/react';
import config from '../config';

/**
 * Initialize Sentry for error tracking
 */
export const initSentry = (): void => {
  // Only initialize Sentry if DSN is available and in production
  if (config.SENTRY?.dsn && config.IS_PROD) {
    Sentry.init({
      dsn: config.SENTRY.dsn,
      integrations: [
        new Sentry.BrowserTracing(),
        new Sentry.Replay(),
      ],
      // Set tracesSampleRate to 1.0 to capture 100% of transactions for performance monitoring
      tracesSampleRate: 0.5,
      // Capture Replay for 10% of all sessions
      replaysSessionSampleRate: 0.1,
      // Capture Replay for 100% of sessions with an error
      replaysOnErrorSampleRate: 1.0,
      environment: config.ENV,
    });
  } else {
    console.log('Sentry not initialized: Missing DSN or not in production environment');
  }
};

/**
 * Capture an exception with Sentry
 */
export const captureException = (error: Error | string, extras?: Record<string, any>): void => {
  if (config.IS_PROD) {
    Sentry.captureException(error, {
      extras,
    });
  } else {
    console.error('Error captured:', error, extras);
  }
};

/**
 * Set user context for Sentry
 */
export const setUserContext = (user: { id: string; email?: string; username?: string }): void => {
  Sentry.setUser(user);
};

/**
 * Clear user context from Sentry
 */
export const clearUserContext = (): void => {
  Sentry.setUser(null);
};
