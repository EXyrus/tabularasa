
import React, { useState, useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';
import HeaderBar from '@/components/HeaderBar';
import BottomNavigation from '@/components/BottomNavigation';
import SettingsForm from '@/components/settings/SettingsForm';
import { useToast } from '@/hooks/use-toast';

const VendorSettings: React.FC = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  
  // Initial settings from localStorage or defaults
  const [settings, setSettings] = useState(() => {
    const savedSettings = localStorage.getItem('sms_settings_vendor');
    if (savedSettings) {
      return JSON.parse(savedSettings);
    }
    return {
      darkMode: false,
      pushNotifications: true,
      emailNotifications: true,
      smsNotifications: false,
    };
  });

  const handleUpdateSettings = async (data: any) => {
    setIsLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Save settings to localStorage
      localStorage.setItem('sms_settings_vendor', JSON.stringify(data));
      setSettings(data);
      
      // Apply dark mode if needed
      if (data.darkMode) {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
      
      toast({
        title: 'Settings Updated',
        description: 'Your settings have been updated successfully.',
      });
    } catch (error) {
      toast({
        title: 'Update Failed',
        description: 'There was an error updating your settings.',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Apply dark mode on initial load
  useEffect(() => {
    if (settings.darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, []);

  if (!user) {
    return <div className="flex items-center justify-center min-h-screen dark:bg-gray-900 dark:text-white">Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pb-20">
      <HeaderBar appType="vendor" userName={user?.name || ''} userAvatar={getCloudinaryImge(user?.avatar)} />
      
      <div className="container max-w-3xl mx-auto px-4 py-8 mt-16">
        <h1 className="text-2xl font-bold mb-6 dark:text-white">Settings</h1>
        
        <div className="grid gap-6">
          <SettingsForm 
            appType="vendor" 
            initialSettings={settings} 
            onSubmit={handleUpdateSettings} 
          />
        </div>
      </div>
      
      <BottomNavigation appType="vendor" />
    </div>
  );
};

export default VendorSettings;
