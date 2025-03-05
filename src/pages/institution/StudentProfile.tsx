
import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import HeaderBar from '@/components/HeaderBar';
import BottomNavigation from '@/components/BottomNavigation';
import { useToast } from '@/hooks/use-toast';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Avatar } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Mail, Phone, MapPin, CalendarDays, BookOpen, User, Users } from 'lucide-react';

const StudentProfile: React.FC = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();
  const { studentId } = useParams<{ studentId: string }>();
  const [student, setStudent] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchStudent = async () => {
      setIsLoading(true);
      try {
        // Mock API call - in a real app, this would fetch from a backend
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // Mock student data
        const mockStudent = {
          id: studentId,
          name: 'John Doe',
          gender: 'Male',
          dateOfBirth: '2010-05-12',
          email: 'john.doe@student.edu',
          phone: '+1 (555) 987-6543',
          avatar: 'https://randomuser.me/api/portraits/men/33.jpg',
          address: '456 Learning Avenue, Study City',
          grade: '8th Grade',
          section: 'A',
          admissionDate: '2018-09-01',
          guardianName: 'Robert Doe',
          guardianRelationship: 'Father',
          guardianContact: '+1 (555) 123-9876',
          enrollmentStatus: 'Active',
        };
        
        setStudent(mockStudent);
      } catch (error) {
        toast({
          title: 'Error',
          description: 'Failed to load student data.',
          variant: 'destructive',
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchStudent();
  }, [studentId, toast]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (!student) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center px-4">
        <h2 className="text-2xl font-bold mb-2">Student Not Found</h2>
        <p className="text-gray-600 mb-6">Could not find the requested student information.</p>
        <Button onClick={() => navigate('/institution/students')}>
          Back to Students
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
            onClick={() => navigate('/institution/students')}
            className="mr-2"
          >
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <h1 className="text-2xl font-bold">Student Profile</h1>
        </div>
        
        <Card className="mb-6">
          <CardHeader className="pb-0">
            <div className="flex flex-col items-center">
              <Avatar className="h-24 w-24 mb-4">
                {student.avatar ? (
                  <img src={student.avatar} alt={student.name} />
                ) : (
                  <User className="h-12 w-12" />
                )}
              </Avatar>
              <CardTitle className="text-center">{student.name}</CardTitle>
              <p className="text-sm text-gray-500 mt-1">{student.grade} - Section {student.section}</p>
            </div>
          </CardHeader>
          <CardContent className="pt-6">
            <div className="grid gap-4">
              <div className="flex items-center">
                <CalendarDays className="h-4 w-4 mr-2 text-gray-500" />
                <span>DOB: {new Date(student.dateOfBirth).toLocaleDateString()}</span>
              </div>
              
              <div className="flex items-center">
                <Mail className="h-4 w-4 mr-2 text-gray-500" />
                <span>{student.email}</span>
              </div>
              
              <div className="flex items-center">
                <Phone className="h-4 w-4 mr-2 text-gray-500" />
                <span>{student.phone}</span>
              </div>
              
              <div className="flex items-center">
                <MapPin className="h-4 w-4 mr-2 text-gray-500" />
                <span>{student.address}</span>
              </div>
              
              <div className="flex items-center">
                <BookOpen className="h-4 w-4 mr-2 text-gray-500" />
                <span>Admission Date: {new Date(student.admissionDate).toLocaleDateString()}</span>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Guardian Information</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center">
                  <Users className="h-4 w-4 mr-2 text-gray-500" />
                  <span>{student.guardianName} ({student.guardianRelationship})</span>
                </div>
                <div className="flex items-center">
                  <Phone className="h-4 w-4 mr-2 text-gray-500" />
                  <span>{student.guardianContact}</span>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Enrollment Status</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-gray-500">Status</span>
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                    {student.enrollmentStatus}
                  </span>
                </div>
                <div className="pt-4">
                  <Button 
                    variant="outline" 
                    className="w-full"
                    onClick={() => toast({ 
                      title: 'Coming Soon', 
                      description: 'This feature will be available soon.' 
                    })}
                  >
                    View Academic Records
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
      
      <BottomNavigation appType="institution" />
    </div>
  );
};

export default StudentProfile;
