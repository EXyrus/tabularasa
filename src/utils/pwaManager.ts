interface UpdateEvent {
  type: 'UPDATE_AVAILABLE' | 'UPDATE_READY' | 'OFFLINE' | 'ONLINE' | 'INSTALLABLE';
  registration?: ServiceWorkerRegistration;
  deferredPrompt?: BeforeInstallPromptEvent;
}

type UpdateCallback = (event: UpdateEvent) => void;

interface BeforeInstallPromptEvent extends Event {
  readonly platforms: string[];
  readonly userChoice: Promise<{
    outcome: 'accepted' | 'dismissed';
    platform: string;
  }>;
  prompt(): Promise<void>;
}

class PWAManager {
  private updateCallbacks: UpdateCallback[] = [];
  private registration: ServiceWorkerRegistration | null = null;
  private refreshing = false;
  private deferredPrompt: BeforeInstallPromptEvent | null = null;

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

    // Listen for the beforeinstallprompt event
    window.addEventListener('beforeinstallprompt', (e) => {
      // Prevent Chrome 67 and earlier from automatically showing the prompt
      e.preventDefault();
      // Store the event so it can be triggered later
      this.deferredPrompt = e as BeforeInstallPromptEvent;
      // Notify listeners that the app is installable
      this.notifyListeners({ 
        type: 'INSTALLABLE', 
        deferredPrompt: this.deferredPrompt 
      });
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

  public promptInstall = async (): Promise<boolean> => {
    if (!this.deferredPrompt) {
      console.log('Install prompt not available');
      return false;
    }

    // Show the install prompt
    this.deferredPrompt.prompt();

    // Wait for the user to respond to the prompt
    const choiceResult = await this.deferredPrompt.userChoice;
    
    // Clear the saved prompt
    this.deferredPrompt = null;

    return choiceResult.outcome === 'accepted';
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
