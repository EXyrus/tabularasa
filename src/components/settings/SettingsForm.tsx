
import React from 'react';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel } from '@/components/ui/form';
import { Switch } from '@/components/ui/switch';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { BellRing, Moon, Sun, Mail, Phone } from 'lucide-react';

type AppType = 'vendor' | 'institution' | 'guardian';

// Define form schema
const formSchema = z.object({
  darkMode: z.boolean().default(false),
  pushNotifications: z.boolean().default(true),
  emailNotifications: z.boolean().default(true),
  smsNotifications: z.boolean().default(false),
});

interface SettingsFormProps {
  appType: AppType;
  initialSettings: z.infer<typeof formSchema>;
  onSubmit: (data: z.infer<typeof formSchema>) => void;
}

const SettingsForm: React.FC<SettingsFormProps> = ({ appType, initialSettings, onSubmit }) => {
  const { toast } = useToast();

  // Create form with react-hook-form and zod validation
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: initialSettings,
  });

  const handleSubmit = async (data: z.infer<typeof formSchema>) => {
    try {
      await onSubmit(data);
      toast({
        title: 'Settings updated',
        description: 'Your settings have been updated successfully.',
      });
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to update settings. Please try again.',
        variant: 'destructive',
      });
    }
  };

  return (
    <Card className="shadow-md dark:bg-gray-800 dark:border-gray-700">
      <CardHeader>
        <CardTitle className="dark:text-white">Application Settings</CardTitle>
        <CardDescription className="dark:text-gray-300">Customize your application preferences</CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="darkMode"
              render={({ field }) => (
                <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4 dark:border-gray-700">
                  <div className="space-y-0.5">
                    <FormLabel className="text-base flex items-center dark:text-white">
                      {field.value ? 
                        <Moon className="w-4 h-4 mr-2 text-blue-400" /> : 
                        <Sun className="w-4 h-4 mr-2 text-amber-500" />
                      }
                      {field.value ? 'Dark Mode' : 'Light Mode'}
                    </FormLabel>
                    <FormDescription className="dark:text-gray-400">
                      {field.value ? 'Disable dark mode' : 'Enable dark mode'} for the application
                    </FormDescription>
                  </div>
                  <FormControl>
                    <Switch
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="pushNotifications"
              render={({ field }) => (
                <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4 dark:border-gray-700">
                  <div className="space-y-0.5">
                    <FormLabel className="text-base flex items-center dark:text-white">
                      <BellRing className="w-4 h-4 mr-2" />
                      Push Notifications
                    </FormLabel>
                    <FormDescription className="dark:text-gray-400">
                      Receive push notifications for important updates
                    </FormDescription>
                  </div>
                  <FormControl>
                    <Switch
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="emailNotifications"
              render={({ field }) => (
                <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4 dark:border-gray-700">
                  <div className="space-y-0.5">
                    <FormLabel className="text-base flex items-center dark:text-white">
                      <Mail className="w-4 h-4 mr-2" />
                      Email Notifications
                    </FormLabel>
                    <FormDescription className="dark:text-gray-400">
                      Receive email notifications for important updates
                    </FormDescription>
                  </div>
                  <FormControl>
                    <Switch
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="smsNotifications"
              render={({ field }) => (
                <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4 dark:border-gray-700">
                  <div className="space-y-0.5">
                    <FormLabel className="text-base flex items-center dark:text-white">
                      <Phone className="w-4 h-4 mr-2" />
                      SMS Notifications
                    </FormLabel>
                    <FormDescription className="dark:text-gray-400">
                      Receive SMS notifications for important updates
                    </FormDescription>
                  </div>
                  <FormControl>
                    <Switch
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            
            <div className="pt-4">
              <Button 
                type="submit" 
                className={`w-full ${
                  appType === 'vendor' 
                    ? 'bg-sms-vendor hover:bg-sms-vendor/90' 
                    : appType === 'institution' 
                    ? 'bg-sms-institution hover:bg-sms-institution/90' 
                    : 'bg-sms-guardian hover:bg-sms-guardian/90'
                } text-white`}
              >
                Save Settings
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default SettingsForm;
