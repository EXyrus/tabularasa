
interface UpdateEvent {
  type: 'UPDATE_AVAILABLE' | 'UPDATE_READY' | 'OFFLINE' | 'ONLINE';
  registration?: ServiceWorkerRegistration;
}

type UpdateCallback = (event: UpdateEvent) => void;

class PWAManager {
  private updateCallbacks: UpdateCallback[] = [];
  private registration: ServiceWorkerRegistration | null = null;
  private refreshing = false;

  constructor() {
    // Handle page refresh when new service worker is activated
    window.addEventListener('beforeunload', () => {
      this.refreshing = true;
    });

    // Monitor online/offline status
    window.addEventListener('online', () => {
      this.notifyListeners({ type: 'ONLINE' });
    });
    
    window.addEventListener('offline', () => {
      this.notifyListeners({ type: 'OFFLINE' });
    });
    
    // Listen for controller change (new service worker took over)
    navigator.serviceWorker?.addEventListener('controllerchange', () => {
      if (!this.refreshing) {
        window.location.reload();
      }
    });
  }

  public register = async (): Promise<void> => {
    if ('serviceWorker' in navigator) {
      try {
        // Register the service worker
        this.registration = await navigator.serviceWorker.register('/service-worker.js');
        console.log('Service Worker registered successfully', this.registration);
        
        // Check for updates
        this.checkForUpdates();
      } catch (error) {
        console.error('Service Worker registration failed:', error);
      }
    }
  };

  public checkForUpdates = (): void => {
    if (!this.registration) return;
    
    // Check if a new service worker is waiting
    if (this.registration.waiting) {
      this.notifyListeners({ 
        type: 'UPDATE_READY', 
        registration: this.registration 
      });
      return;
    }
    
    // Add listeners for new service workers
    this.registration.addEventListener('updatefound', () => {
      const newWorker = this.registration?.installing;
      
      if (!newWorker) return;
      
      newWorker.addEventListener('statechange', () => {
        // If the new service worker is installed but waiting
        if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
          this.notifyListeners({ 
            type: 'UPDATE_AVAILABLE', 
            registration: this.registration as ServiceWorkerRegistration 
          });
        }
      });
    });
  };

  public installUpdate = (): void => {
    if (this.registration && this.registration.waiting) {
      // Send message to service worker to skip waiting and activate new version
      this.registration.waiting.postMessage({ type: 'SKIP_WAITING' });
    }
  };

  public onUpdate = (callback: UpdateCallback): () => void => {
    this.updateCallbacks.push(callback);
    
    // Return unsubscribe function
    return () => {
      this.updateCallbacks = this.updateCallbacks.filter(cb => cb !== callback);
    };
  };

  private notifyListeners = (event: UpdateEvent): void => {
    this.updateCallbacks.forEach(callback => callback(event));
  };
}

export const pwaManager = new PWAManager();
export default pwaManager;
