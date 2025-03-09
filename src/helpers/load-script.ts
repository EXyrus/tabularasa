
import * as Sentry from '@/overrides/sentry.override';

export function loadScript(src: string, async = true, defer = true) {
  return new Promise((resolve, reject) => {
    try {
      if (document.querySelector(`script[src="${src}"]`)) {
        resolve(true);
        return;
      }

      const script = document.createElement('script');
      script.src = src;
      script.async = async;
      script.defer = defer;

      script.onload = () => {
        resolve(true);
      };

      script.onerror = () => {
        reject(new Error(`Failed to load ${src}`));
      };

      document.head.appendChild(script);
    } catch (error) {
      Sentry.captureException(error);
      reject(error);
    }
  });
}
