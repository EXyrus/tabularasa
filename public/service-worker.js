// Service Worker Version
const CACHE_VERSION = 'v1';
const CACHE_NAME = `tabula-rasa-${CACHE_VERSION}`;

// Assets to cache on install
const STATIC_ASSETS = [
  '/',
  '/index.html',
  '/manifest.json',
  '/icons/icon-192x192.png',
  '/icons/icon-512x512.png'
];

// Install event - cache static assets
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log('Caching static assets');
      return cache.addAll(STATIC_ASSETS);
    })
  );
});

// Activate event - clean up old caches
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames
          .filter((name) => name.startsWith('tabula-rasa-') && name !== CACHE_NAME)
          .map((name) => {
            console.log(`Deleting old cache: ${name}`);
            return caches.delete(name);
          })
      );
    })
  );
});

// Message event - handle skip waiting
self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    console.log('Skip waiting command received');
    self.skipWaiting();
  }
});

// Fetch event - serve from cache, fallback to network
self.addEventListener('fetch', (event) => {
  // Skip non-GET requests
  if (event.request.method !== 'GET') return;
  
  // Skip browser extensions and chrome-extension requests
  if (event.request.url.startsWith('chrome-extension://')) return;
  
  // Skip API requests and analytics
  const url = new URL(event.request.url);
  if (url.pathname.startsWith('/api/') || 
      url.hostname.includes('analytics') ||
      url.hostname.includes('googletagmanager')) {
    return;
  }

  event.respondWith(
    caches.match(event.request).then((cachedResponse) => {
      // Return cached response if available
      if (cachedResponse) {
        return cachedResponse;
      }

      // Otherwise, fetch from network
      return fetch(event.request)
        .then((response) => {
          // Skip caching if response is invalid
          if (!response || response.status !== 200 || response.type !== 'basic') {
            return response;
          }

          // Cache the response for future requests
          const responseToCache = response.clone();
          caches.open(CACHE_NAME).then((cache) => {
            cache.put(event.request, responseToCache);
          });

          return response;
        })
        .catch(() => {
          // If both cache and network fail, return offline page
          if (event.request.headers.get('Accept')?.includes('text/html')) {
            return caches.match('/');
          }
          
          // Return a placeholder for images
          if (event.request.destination === 'image') {
            return caches.match('/placeholder.svg');
          }
          
          // Otherwise just return a network error
          return new Response('Network error occurred', { 
            status: 503,
            headers: { 'Content-Type': 'text/plain' }
          });
        });
    })
  );
});
