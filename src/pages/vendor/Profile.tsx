
import React, { useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import HeaderBar from '@/components/HeaderBar';
import BottomNavigation from '@/components/BottomNavigation';
import ProfileForm from '@/components/profile/ProfileForm';
import { useToast } from '@/hooks/use-toast';
import { Card, CardContent } from '@/components/ui/card';

const VendorProfile: React.FC = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);

  const handleUpdateProfile = async (data: any) => {
    setIsLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Update local storage with updated user data
      const updatedUser = { ...user, ...data };
      localStorage.setItem('sms_user_data', JSON.stringify(updatedUser));
      
      toast({
        title: 'Profile Updated',
        description: 'Your profile has been updated successfully.',
      });
    } catch (error) {
      toast({
        title: 'Update Failed',
        description: 'There was an error updating your profile.',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      <HeaderBar appType="vendor" userName={user?.name || ''} userAvatar={user?.avatar} />
      
      <div className="container max-w-3xl mx-auto px-4 py-8 mt-16">
        <h1 className="text-2xl font-bold mb-6">Your Profile</h1>
        
        <div className="grid gap-6">
          <ProfileForm 
            appType="vendor" 
            userData={user} 
            onSubmit={handleUpdateProfile} 
          />
          
          <Card>
            <CardContent className="pt-6">
              <div className="flex justify-between items-center">
                <h3 className="font-medium">Account Settings</h3>
                <button 
                  className="text-blue-600 hover:text-blue-800 text-sm"
                  onClick={() => toast({ 
                    title: 'Coming Soon', 
                    description: 'This feature will be available soon.' 
                  })}
                >
                  Change Password
                </button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
      
      <BottomNavigation appType="vendor" />
    </div>
  );
};

export default VendorProfile;
