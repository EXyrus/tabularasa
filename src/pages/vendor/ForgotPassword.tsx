import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/hooks/useAuth';
import { Icons } from '@/components/icons';

const formSchema = z.object({
  email: z.string().email({ message: 'Please enter a valid email address.' }),
});

type FormData = z.infer<typeof formSchema>;

const ForgotPassword: React.FC = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();
  const { forgotPassword } = useAuth();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
  });

  const handleSubmit = async (data: FormData) => {
    setIsSubmitting(true);
    try {
      // Corrected to use only one argument
      await forgotPassword({ email: data.email });
      toast({
        title: 'Email Sent',
        description:
          'If your email is registered with us, you will receive password reset instructions.',
      });
      // Reset the form and navigate
      navigate('/vendor/login');
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to send reset password email.',
        variant: 'destructive',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="w-full max-w-md space-y-8">
      <div className="flex flex-col items-center justify-center space-y-2 text-center">
        <Icons.logo className="h-10 w-10" />
        <h1 className="text-2xl font-semibold">Forgot Password</h1>
        <p className="text-sm text-muted-foreground">
          Enter your email address and we will send you a reset link.
        </p>
      </div>
      <form onSubmit={handleSubmit(handleSubmit)} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            placeholder="Enter your email"
            type="email"
            required
            {...register('email')}
          />
          {errors.email && (
            <p className="text-sm text-red-500">{errors.email.message}</p>
          )}
        </div>
        <Button disabled={isSubmitting} className="w-full" type="submit">
          {isSubmitting ? (
            <>
              <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
              Please wait
            </>
          ) : (
            'Send Reset Link'
          )}
        </Button>
      </form>
    </div>
  );
};

export default ForgotPassword;
