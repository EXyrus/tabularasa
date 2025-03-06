
import React, { useState } from 'react';
import { message, Typography } from 'antd';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import AuthForm from '@/components/AuthForm';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
;

const { Paragraph } = Typography;

const InstitutionLogin: React.FC = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [loading, setLoading] = useState(false);
  const [institutionSlug, setInstitutionSlug] = useState('');
  const [institutionFound, setInstitutionFound] = useState(false);
  const [institutionName, setInstitutionName] = useState('');
  const [slugError, setSlugError] = useState('');

  const onSlugSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setSlugError('');
    
    try {
      // In a real app, this would be an API call to verify the institution
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Mock validation - in a real app this would check against a database
      const mockValidSlugs = ['springfield', 'westfield', 'oakridge', 'riverside'];
      const mockInstitutionNames = {
        'springfield': 'Springfield Elementary School',
        'westfield': 'Westfield High School',
        'oakridge': 'Oakridge Academy',
        'riverside': 'Riverside Middle School'
      };
      
      if (mockValidSlugs.includes(institutionSlug)) {
        setInstitutionFound(true);
        setInstitutionName(mockInstitutionNames[institutionSlug as keyof typeof mockInstitutionNames]);
      } else {
        setSlugError('Institution not found. Please check the slug and try again.');
      }
    } catch (error) {
      setSlugError('Error verifying institution. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const onLogin = async (values: { email: string; password: string }) => {
    try {
      setLoading(true);
      await login(values.email, values.password, 'institution');
      message.success('Login successful!');
      navigate('/institution/dashboard');
    } catch (error) {
      if (error instanceof Error) {
        message.error(error.message);
      } else {
        message.error('An unexpected error occurred');
      }
    } finally {
      setLoading(false);
    }
  };

  const onBack = () => {
    setInstitutionFound(false);
    setInstitutionSlug('');
    setInstitutionName('');
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50 dark:from-gray-900 dark:to-black flex flex-col justify-center items-center p-4">
      {!institutionFound ? (
        <Card className="w-full max-w-md mx-auto animate-scale-in">
          <CardHeader className="text-center">
            <div className="w-16 h-1 mx-auto bg-sms-institution rounded-full mb-4"></div>
            <CardTitle className="text-2xl">Institution Login</CardTitle>
            <CardDescription>Enter your institution's unique slug to proceed</CardDescription>
            <Paragraph copyable={{ text: 'springfield' }}>springfield</Paragraph>
          </CardHeader>
          <CardContent>
            <form onSubmit={onSlugSubmit} className="space-y-4">
              <div className="space-y-2">
                <label htmlFor="institutionSlug" className="text-sm font-medium">
                  Institution Slug
                </label>
                <Input 
                  id="institutionSlug"
                  placeholder="springfield" 
                  value={institutionSlug}
                  onChange={(e) => setInstitutionSlug(e.target.value)}
                  className="w-full"
                  autoComplete="off"
                  required
                />
                {slugError && <p className="text-red-500 text-sm">{slugError}</p>}
                <p className="text-sm text-muted-foreground">
                  The slug is the unique identifier for your institution.
                </p>
              </div>
              
              <Button 
                type="submit" 
                className="w-full bg-sms-institution hover:bg-sms-institution/90 text-white"
                disabled={loading}
                aria-disabled={loading}
              >
                {loading ? 'Verifying...' : 'Continue'}
              </Button>
              
              <div className="text-center mt-4">
                <Button 
                  variant="link" 
                  onClick={() => navigate('/')}
                  className="text-sm"
                >
                  Back to home
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      ) : (
        <>
          <div className="w-full max-w-md mx-auto mb-4">
            <Button 
              variant="ghost" 
              onClick={onBack}
              className="mb-2 pl-0 hover:bg-transparent"
            >
              ← Back to institution selection
            </Button>
            <h2 className="text-xl font-semibold text-center dark:text-white">
              {institutionName}
            </h2>
          </div>
          
          <AuthForm
            appType="institution"
            formType="login"
            onSubmit={onLogin}
            loading={loading}
          />
        </>
      )}
    </div>
  );
};

export default InstitutionLogin;
