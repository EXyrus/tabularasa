import React from 'react';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from '@/components/ui/card';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { Avatar } from '@/components/ui/avatar';
import { User } from 'lucide-react';

type AppType = 'vendor' | 'institution' | 'guardian';

// Define the form schema types to match our fields
interface BaseFormValues {
  name: string;
  email: string;
  phone?: string;
}

interface VendorFormValues extends BaseFormValues {
  companyName: string;
  website?: string;
}

interface InstitutionFormValues extends BaseFormValues {
  position: string;
  department?: string;
}

interface GuardianFormValues extends BaseFormValues {
  address?: string;
  relationship: string;
}

type FormValues = BaseFormValues | VendorFormValues | InstitutionFormValues | GuardianFormValues;

// Define form schema based on app type
const getFormSchema = (appType: AppType) => {
  const baseSchema = {
    name: z.string().min(2, 'Name must be at least 2 characters'),
    email: z.string().email('Please enter a valid email address'),
    phone: z.string().optional(),
  };

  // Add additional fields based on app type
  switch (appType) {
    case 'vendor':
      return z.object({
        ...baseSchema,
        companyName: z.string().min(2, 'Company name must be at least 2 characters'),
        website: z.string().url('Please enter a valid URL').optional(),
      });
    case 'institution':
      return z.object({
        ...baseSchema,
        position: z.string().min(2, 'Position must be at least 2 characters'),
        department: z.string().optional(),
      });
    case 'guardian':
      return z.object({
        ...baseSchema,
        address: z.string().optional(),
        relationship: z.string().min(2, 'Relationship must be at least 2 characters'),
      });
    default:
      return z.object(baseSchema);
  }
};

interface ProfileFormProps {
  appType: AppType;
  userData: any;
  onSubmit: (data: any) => void;
}

const ProfileForm: React.FC<ProfileFormProps> = ({ appType, userData, onSubmit }) => {
  const { toast } = useToast();
  const formSchema = getFormSchema(appType);

  // Create form with react-hook-form and zod validation
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: userData?.name || '',
      email: userData?.email || '',
      phone: userData?.phone || '',
      ...(appType === 'vendor' && {
        companyName: userData?.companyName || '',
        website: userData?.website || '',
      }),
      ...(appType === 'institution' && {
        position: userData?.position || '',
        department: userData?.department || '',
      }),
      ...(appType === 'guardian' && {
        address: userData?.address || '',
        relationship: userData?.relationship || '',
      }),
    },
  });

  const handleSubmit = async (data: z.infer<typeof formSchema>) => {
    try {
      await onSubmit(data);
      toast({
        title: 'Profile updated',
        description: 'Your profile has been updated successfully.',
      });
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to update profile. Please try again.',
        variant: 'destructive',
      });
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Profile Information</CardTitle>
        <CardDescription>Update your personal information</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex justify-center mb-6">
          <Avatar className="h-24 w-24">
            {userData?.photo ? (
              <img src={userData.photo} alt={userData.name} />
            ) : (
              <User className="h-12 w-12" />
            )}
          </Avatar>
        </div>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Full Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter your full name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input type="email" placeholder="Enter your email" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Phone</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter your phone number" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Render fields specific to app type */}
            {appType === 'vendor' && (
              <>
                <FormField
                  control={form.control}
                  name={'companyName' as keyof z.infer<typeof formSchema>}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Company Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter company name" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name={'website' as keyof z.infer<typeof formSchema>}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Website</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter company website" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </>
            )}

            {appType === 'institution' && (
              <>
                <FormField
                  control={form.control}
                  name={'position' as keyof z.infer<typeof formSchema>}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Position</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter your position" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name={'department' as keyof z.infer<typeof formSchema>}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Department</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter your department" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </>
            )}

            {appType === 'guardian' && (
              <>
                <FormField
                  control={form.control}
                  name={'address' as keyof z.infer<typeof formSchema>}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Address</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter your address" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name={'relationship' as keyof z.infer<typeof formSchema>}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Relationship to Student</FormLabel>
                      <FormControl>
                        <Input placeholder="E.g., Parent, Guardian" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </>
            )}

            <div className="pt-4">
              <Button type="submit" className="w-full">
                Save Changes
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default ProfileForm;
