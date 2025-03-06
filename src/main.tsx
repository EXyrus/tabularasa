
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import AppWrapper from './AppWrapper';
import { BrowserRouter } from 'react-router-dom';

// Register service worker for PWA
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/service-worker.js')
      .then(registration => {
        console.log('ServiceWorker registration successful with scope: ', registration.scope);
      })
      .catch(error => {
        console.error('ServiceWorker registration failed: ', error);
      });
  });
}

// Add PWA install prompt handler
window.addEventListener('beforeinstallprompt', (e: Event) => {
  // Prevent Chrome 67 and earlier from automatically showing the prompt
  e.preventDefault();
  // Stash the event so it can be triggered later
  window.deferredPrompt = e as BeforeInstallPromptEvent;
  
  // Show the install prompt to the user
  setTimeout(() => {
    const installBtn = document.createElement('div');
    installBtn.className = 'pwa-install-prompt fixed bottom-5 left-1/2 transform -translate-x-1/2 bg-white p-4 rounded-lg shadow-lg flex flex-col items-center z-50';
    installBtn.innerHTML = `
      <p class="mb-2 font-medium">Install TabulaRasa app for better experience!</p>
      <div class="flex space-x-2">
        <button id="install-btn" class="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">Install</button>
        <button id="dismiss-btn" class="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300">Not now</button>
      </div>
    `;
    document.body.appendChild(installBtn);

    document.getElementById('install-btn')?.addEventListener('click', async () => {
      if (window.deferredPrompt) {
        window.deferredPrompt.prompt();
        const { outcome } = await window.deferredPrompt.userChoice;
        console.log(`User ${outcome === 'accepted' ? 'accepted' : 'dismissed'} the install prompt`);
        window.deferredPrompt = null;
      }
      installBtn.remove();
    });

    document.getElementById('dismiss-btn')?.addEventListener('click', () => {
      installBtn.remove();
    });
  }, 3000);
});

createRoot(document.getElementById("root")!).render(
  <AppWrapper>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </AppWrapper>
);
