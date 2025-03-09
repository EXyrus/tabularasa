
import { useEffect, useState } from 'react';

const ReloadPrompt = () => {
  const [needRefresh, setNeedRefresh] = useState(false);
  const [offlineReady, setOfflineReady] = useState(false);

  useEffect(() => {
    if ('serviceWorker' in navigator) {
      // Listen for service worker updates
      window.addEventListener('sw-updated', () => {
        setNeedRefresh(true);
      });
      
      // Listen for service worker ready event
      window.addEventListener('sw-ready', () => {
        setOfflineReady(true);
      });
    }

    return () => {
      window.removeEventListener('sw-updated', () => {});
      window.removeEventListener('sw-ready', () => {});
    };
  }, []);

  const close = () => {
    setOfflineReady(false);
    setNeedRefresh(false);
  };

  const updateServiceWorker = () => {
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.getRegistrations().then(registrations => {
        for (const registration of registrations) {
          registration.update();
        }
      });
    }
    window.location.reload();
  };

  if (!offlineReady && !needRefresh) return null;

  return (
    <div className="fixed bottom-0 right-0 m-4 p-4 bg-white rounded-lg shadow-lg border border-gray-200 z-50">
      {offlineReady && (
        <div className="flex items-center gap-2">
          <span>App ready to work offline</span>
          <button 
            onClick={close}
            className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300"
          >
            Close
          </button>
        </div>
      )}
      
      {needRefresh && (
        <div className="flex items-center gap-2">
          <span>New content available, click on reload button to update.</span>
          <button 
            onClick={updateServiceWorker}
            className="px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Reload
          </button>
          <button 
            onClick={close}
            className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300"
          >
            Close
          </button>
        </div>
      )}
    </div>
  );
};

export default ReloadPrompt;
