
import React, { useState } from 'react';
import { useAuth } from '@/hooks/useAuth';
import HeaderBar from '@/components/HeaderBar';
import BottomNavigation from '@/components/BottomNavigation';
import ProfileForm from '@/components/profile/ProfileForm';
import { useToast } from '@/hooks/use-toast';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useUpdatePasswordMutation } from '@/queries/use-auth';
import type { UpdatePasswordPayload } from '@/types/auth';

const VendorProfile: React.FC = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  
  // Use the update password mutation 
  const { updatePassword } = useUpdatePasswordMutation();

  const handleUpdateProfile = async (data: any) => {
    setIsLoading(true);
    try {
      // API call would be here 
      // For now simulate an API delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Update local storage with updated user data
      const updatedUser = { ...user, ...data };
      localStorage.setItem('sms_user_data', JSON.stringify(updatedUser));
      
      toast({
        title: 'Profile Updated',
        description: 'Your profile has been updated successfully.',
      });
    } catch (error) {
      const e = error as Error;

      toast({
        title: 'Update Failed',
        description: e.message ?? 'There was an error updating your profile.',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };
  
  const handleChangePassword = async () => {
    // In a real application, you would open a modal or form here
    // For demonstration purposes, we'll just show a toast
    toast({
      title: 'Change Password',
      description: 'Password change feature is coming soon.',
    });
    
    // In a real implementation, you would do something like:
    // const passwordData: UpdatePasswordPayload = {
    //   oldPassword: 'current-password',
    //   newPassword: 'new-password',
    //   passwordConfirmation: 'new-password',
    // };
    // try {
    //   await updatePassword(passwordData);
    //   toast({
    //     title: 'Password Updated',
    //     description: 'Your password has been changed successfully.',
    //   });
    // } catch (error) {
    //   toast({
    //     variant: 'destructive',
    //     title: 'Error',
    //     description: 'Failed to update password.',
    //   });
    // }
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
                <Button 
                  variant="outline"
                  className="text-blue-600 hover:text-blue-800 text-sm"
                  onClick={handleChangePassword}
                >
                  Change Password
                </Button>
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
