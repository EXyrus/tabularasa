
import * as Sentry from '@sentry/react';

const initSentry = (): void => {
  const SENTRY_DSN = import.meta.env.VITE_SENTRY_DSN;
  const APP_VERSION = import.meta.env.VITE_APP_VERSION;
  const ENV = import.meta.env.MODE;
  const shouldInit = SENTRY_DSN && ENV === 'production';

  if (!shouldInit) {
    console.warn('Sentry is not initialized in development');
    return;
  }

  Sentry.init({
    dsn: SENTRY_DSN,
    integrations: [
      Sentry.browserTracingIntegration(),
      Sentry.replayIntegration(),
    ],
    // Performance Monitoring
    tracesSampleRate: 1.0, // Capture 100% of the transactions, reduce in production!
    // Session Replay
    replaysSessionSampleRate: 0.1, // This sets the sample rate at 10%.
    replaysOnErrorSampleRate: 1.0, // If you're not already sampling the entire session, change the sample rate to 100% when sampling sessions where errors occur.
    release: APP_VERSION,
    environment: ENV,
  });
};

// Export all Sentry functions
export default initSentry;
export const captureException = Sentry.captureException;
export const captureMessage = Sentry.captureMessage;
export const withScope = Sentry.withScope;
export * from '@sentry/react';
