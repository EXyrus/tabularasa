
import { useState, useEffect } from 'react';
import { toast } from '@/components/ui/use-toast';
import { Button } from '@/components/ui/button';
import pwaManager from '@/utils/pwaManager';

const UpdateNotification = () => {
  const [updateAvailable, setUpdateAvailable] = useState(false);
  const [isOnline, setIsOnline] = useState(navigator.onLine);

  useEffect(() => {
    // Initialize PWA and listen for updates
    pwaManager.register();
    
    const unsubscribe = pwaManager.onUpdate((event) => {
      if (event.type === 'UPDATE_AVAILABLE' || event.type === 'UPDATE_READY') {
        setUpdateAvailable(true);
        
        toast({
          title: "New version available",
          description: "A new version of TabR is available. Reload to update.",
          action: (
            <Button variant="outline" size="sm" onClick={handleUpdate}>
              Update now
            </Button>
          ),
          duration: 0 // Don't auto-dismiss
        });
      } else if (event.type === 'ONLINE') {
        setIsOnline(true);
        toast({
          title: "You're back online",
          description: "Connected to the network",
          duration: 3000
        });
      } else if (event.type === 'OFFLINE') {
        setIsOnline(false);
        toast({
          title: "You're offline",
          description: "Some features may be unavailable",
          variant: "destructive",
          duration: 0
        });
      }
    });
    
    // Clean up on unmount
    return () => unsubscribe();
  }, []);

  const handleUpdate = () => {
    pwaManager.installUpdate();
  };

  return (
    <>
      {!isOnline && (
        <div className="fixed bottom-0 left-0 right-0 bg-amber-100 text-amber-800 p-2 text-center z-50">
          You are currently offline. Some features may be unavailable.
        </div>
      )}
      {updateAvailable && (
        <div className="fixed bottom-16 right-4 z-50">
          <Button 
            onClick={handleUpdate}
            className="shadow-lg animate-pulse bg-blue-600 hover:bg-blue-700"
          >
            Update Now
          </Button>
        </div>
      )}
    </>
  );
};

export default UpdateNotification;
