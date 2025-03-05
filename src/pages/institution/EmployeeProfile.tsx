
import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import HeaderBar from '@/components/HeaderBar';
import BottomNavigation from '@/components/BottomNavigation';
import { useToast } from '@/hooks/use-toast';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Avatar } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Mail, Phone, MapPin, GraduationCap, Briefcase, User } from 'lucide-react';

const EmployeeProfile: React.FC = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();
  const { employeeId } = useParams<{ employeeId: string }>();
  const [employee, setEmployee] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchEmployee = async () => {
      setIsLoading(true);
      try {
        // Mock API call - in a real app, this would fetch from a backend
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // Mock employee data
        const mockEmployee = {
          id: employeeId,
          name: 'Jane Smith',
          email: 'jane.smith@school.edu',
          phone: '+1 (555) 123-4567',
          avatar: 'https://randomuser.me/api/portraits/women/44.jpg',
          department: 'Mathematics',
          position: 'Senior Teacher',
          address: '123 Education Street, Learn City',
          education: 'Masters in Mathematics Education',
          joinDate: '2019-08-15',
          employmentStatus: 'Active',
        };
        
        setEmployee(mockEmployee);
      } catch (error) {
        toast({
          title: 'Error',
          description: 'Failed to load employee data.',
          variant: 'destructive',
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchEmployee();
  }, [employeeId, toast]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (!employee) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center px-4">
        <h2 className="text-2xl font-bold mb-2">Employee Not Found</h2>
        <p className="text-gray-600 mb-6">Could not find the requested employee information.</p>
        <Button onClick={() => navigate('/institution/employees')}>
          Back to Employees
        </Button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      <HeaderBar appType="institution" userName={user?.name || ''} userAvatar={user?.avatar} />
      
      <div className="container max-w-3xl mx-auto px-4 py-8 mt-16">
        <div className="flex items-center mb-6">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => navigate('/institution/employees')}
            className="mr-2"
          >
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <h1 className="text-2xl font-bold">Employee Profile</h1>
        </div>
        
        <Card className="mb-6">
          <CardHeader className="pb-0">
            <div className="flex flex-col items-center">
              <Avatar className="h-24 w-24 mb-4">
                {employee.avatar ? (
                  <img src={employee.avatar} alt={employee.name} />
                ) : (
                  <User className="h-12 w-12" />
                )}
              </Avatar>
              <CardTitle className="text-center">{employee.name}</CardTitle>
              <p className="text-sm text-gray-500 mt-1">{employee.position}</p>
            </div>
          </CardHeader>
          <CardContent className="pt-6">
            <div className="grid gap-4">
              <div className="flex items-center">
                <Mail className="h-4 w-4 mr-2 text-gray-500" />
                <span>{employee.email}</span>
              </div>
              
              <div className="flex items-center">
                <Phone className="h-4 w-4 mr-2 text-gray-500" />
                <span>{employee.phone}</span>
              </div>
              
              <div className="flex items-center">
                <MapPin className="h-4 w-4 mr-2 text-gray-500" />
                <span>{employee.address}</span>
              </div>
              
              <div className="flex items-center">
                <Briefcase className="h-4 w-4 mr-2 text-gray-500" />
                <span>{employee.department}</span>
              </div>
              
              <div className="flex items-center">
                <GraduationCap className="h-4 w-4 mr-2 text-gray-500" />
                <span>{employee.education}</span>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Employment Details</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-500">Join Date</span>
                  <span>{new Date(employee.joinDate).toLocaleDateString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Status</span>
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                    {employee.employmentStatus}
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Actions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <Button 
                  variant="outline" 
                  className="w-full"
                  onClick={() => toast({ 
                    title: 'Coming Soon', 
                    description: 'This feature will be available soon.' 
                  })}
                >
                  Send Message
                </Button>
                <Button 
                  variant="outline" 
                  className="w-full"
                  onClick={() => toast({ 
                    title: 'Coming Soon', 
                    description: 'This feature will be available soon.' 
                  })}
                >
                  View Schedule
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
      
      <BottomNavigation appType="institution" />
    </div>
  );
};

export default EmployeeProfile;
