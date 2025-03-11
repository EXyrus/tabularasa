import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import HeaderBar from '@/components/HeaderBar';
import BottomNavigation from '@/components/BottomNavigation';
import { useToast } from '@/hooks/use-toast';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Avatar } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Book, CalendarDays, Clock, User, Award, FileText } from 'lucide-react';

const GuardianStudentProfile: React.FC = () => {
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
          name: 'Emily Johnson',
          dateOfBirth: '2009-08-22',
          avatar: 'https://randomuser.me/api/portraits/women/62.jpg',
          grade: '9th Grade',
          section: 'B',
          admissionNumber: 'ST20190822',
          school: 'Springfield High School',
          attendanceRate: '95%',
          upcomingEvents: [
            { id: 1, title: 'Math Test', date: '2023-06-15' },
            { id: 2, title: 'Science Project Due', date: '2023-06-22' },
          ],
          recentGrades: [
            { id: 1, subject: 'Mathematics', grade: 'A', score: '92/100' },
            { id: 2, subject: 'Science', grade: 'B+', score: '88/100' },
            { id: 3, subject: 'English', grade: 'A-', score: '90/100' },
          ],
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
        <Button onClick={() => navigate('/guardian/students')}>Back to Students</Button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      <HeaderBar appType="guardian" userName={user?.name || ''} userAvatar={user?.photo} />

      <div className="container max-w-3xl mx-auto px-4 py-8 mt-16">
        <div className="flex items-center mb-6">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => navigate('/guardian/students')}
            className="mr-2"
          >
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <h1 className="text-2xl font-bold">Student Information</h1>
        </div>

        <Card className="mb-6">
          <CardHeader className="pb-0">
            <div className="flex flex-col items-center">
              <Avatar className="h-24 w-24 mb-4">
                {student.photo ? (
                  <img src={student.photo} alt={student.name} />
                ) : (
                  <User className="h-12 w-12" />
                )}
              </Avatar>
              <CardTitle className="text-center">{student.name}</CardTitle>
              <p className="text-sm text-gray-500 mt-1">
                {student.grade} - Section {student.section}
              </p>
              <p className="text-sm text-gray-500">{student.school}</p>
            </div>
          </CardHeader>
          <CardContent className="pt-6">
            <div className="grid gap-4">
              <div className="flex items-center">
                <CalendarDays className="h-4 w-4 mr-2 text-gray-500" />
                <span>DOB: {new Date(student.dateOfBirth).toLocaleDateString()}</span>
              </div>

              <div className="flex items-center">
                <Book className="h-4 w-4 mr-2 text-gray-500" />
                <span>Admission Number: {student.admissionNumber}</span>
              </div>

              <div className="flex items-center">
                <Clock className="h-4 w-4 mr-2 text-gray-500" />
                <span>Attendance: {student.attendanceRate}</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="grid gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Recent Academic Performance</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {student.recentGrades.map((grade: any) => (
                  <div key={grade.id} className="flex items-center justify-between">
                    <div className="flex items-center">
                      <Award className="h-4 w-4 mr-2 text-gray-500" />
                      <span>{grade.subject}</span>
                    </div>
                    <div className="flex items-center">
                      <span className="mr-2">{grade.grade}</span>
                      <span className="text-sm text-gray-500">({grade.score})</span>
                    </div>
                  </div>
                ))}

                <Button
                  variant="outline"
                  className="w-full mt-4"
                  onClick={() =>
                    toast({
                      title: 'Coming Soon',
                      description: 'Full academic report will be available soon.',
                    })
                  }
                >
                  <FileText className="h-4 w-4 mr-2" />
                  View Full Academic Report
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Upcoming Events</CardTitle>
            </CardHeader>
            <CardContent>
              {student.upcomingEvents.length > 0 ? (
                <div className="space-y-4">
                  {student.upcomingEvents.map((event: any) => (
                    <div key={event.id} className="flex justify-between items-center">
                      <span>{event.title}</span>
                      <span className="text-sm text-gray-500">
                        {new Date(event.date).toLocaleDateString()}
                      </span>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-center text-gray-500">No upcoming events</p>
              )}
            </CardContent>
          </Card>
        </div>
      </div>

      <BottomNavigation appType="guardian" />
    </div>
  );
};

export default GuardianStudentProfile;
