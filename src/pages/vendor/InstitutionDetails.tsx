
import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  Building, ArrowLeft, Edit, Users, School, CheckCircle, XCircle, AlertTriangle,
  MoreHorizontal, Mail, BellRing, FileText, Download, Trash2
} from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useToast } from '@/hooks/use-toast';
import HeaderBar from '@/components/HeaderBar';
import BottomNavigation from '@/components/BottomNavigation';
import { useAuth } from '@/context/AuthContext';
import { useGetInstitutionDetails } from '@/queries/use-institutions';

import configIcon from '@/assets/img/config.svg';

const InstitutionDetails: React.FC = () => {
  const { id = '' } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { user } = useAuth();
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState('overview');
  
  const { 
    data: institution, 
    isLoading, 
    isError, 
    error 
  } = useGetInstitutionDetails(id);

  const handleEdit = () => {
    navigate(`/vendor/institutions/${id}/edit`);
  };

  const handleGenerateReport = () => {
    toast({
      title: "Report Generated",
      description: "The report has been generated and is ready for download.",
    });
  };

  const handleSendEmail = () => {
    toast({
      title: "Email Sent",
      description: "Email has been sent to the institution admin.",
    });
  };

  const handleDeleteInstitution = () => {
    toast({
      title: "Delete Institution",
      description: "This feature is not available in the current version.",
      variant: "destructive",
    });
  };

  if (isLoading) {
    return (
      <>
        <HeaderBar 
          appType="vendor" 
          userName={user?.name || 'Admin User'} 
          userAvatar={user?.avatar}
        />
        <div className="flex justify-center items-center h-screen bg-gray-50 dark:bg-gray-900">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
        </div>
        <BottomNavigation appType="vendor" />
      </>
    );
  }

  if (isError) {
    return (
      <>
        <HeaderBar 
          appType="vendor" 
          userName={user?.name || 'Admin User'} 
          userAvatar={user?.avatar}
        />
        <div className="flex flex-col justify-center items-center h-screen bg-gray-50 dark:bg-gray-900 p-4">
          <AlertTriangle className="h-12 w-12 text-red-500 mb-4" />
          <h2 className="text-2xl font-bold mb-2 dark:text-white">Error</h2>
          <p className="text-gray-600 dark:text-gray-400 text-center max-w-md mb-4">
            Failed to load institution details: {(error as Error)?.message || 'Unknown error'}
          </p>
          <Button onClick={() => navigate('/vendor/institutions')}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Institutions
          </Button>
        </div>
        <BottomNavigation appType="vendor" />
      </>
    );
  }

  const renderStatusBadge = (status: string) => {
    if (status === 'active') {
      return <Badge className="bg-green-500 hover:bg-green-600">Active</Badge>;
    } else if (status === 'suspended') {
      return <Badge className="bg-red-500 hover:bg-red-600">Suspended</Badge>;
    } else {
      return <Badge className="bg-yellow-500 hover:bg-yellow-600">Pending</Badge>;
    }
  };

  return (
    <>
      <HeaderBar 
        appType="vendor" 
        userName={user?.name || 'Admin User'} 
        userAvatar={user?.avatar}
      />
      
      <div className="page-container pt-20 pb-20 px-4 animate-fade-in bg-gray-50 dark:bg-gray-900 min-h-screen">
        <div className="max-w-6xl mx-auto">
          {/* Header with actions */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
            <div className="flex items-center">
              <Button 
                variant="ghost" 
                size="sm" 
                className="mr-2"
                onClick={() => navigate('/vendor/institutions')}
              >
                <ArrowLeft className="h-4 w-4" />
              </Button>
              <h1 className="text-2xl font-bold dark:text-white">{institution?.name}</h1>
              <div className="ml-3">{renderStatusBadge(institution?.status || 'pending')}</div>
            </div>
            
            <div className="flex gap-2">
              <Button onClick={handleEdit} variant="outline" className="gap-1">
                <Edit className="h-4 w-4" />
                <span className="hidden sm:inline">Edit</span>
              </Button>
              
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" size="icon">
                    <MoreHorizontal className="h-4 w-4" />
                    <span className="sr-only">More actions</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem onClick={handleSendEmail}>
                    <Mail className="mr-2 h-4 w-4" />
                    Send Email
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <BellRing className="mr-2 h-4 w-4" />
                    Send Notification
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={handleGenerateReport}>
                    <FileText className="mr-2 h-4 w-4" />
                    Generate Report
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Download className="mr-2 h-4 w-4" />
                    Export Data
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={handleDeleteInstitution} className="text-red-600 dark:text-red-400">
                    <Trash2 className="mr-2 h-4 w-4" />
                    Delete Institution
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
          
          {/* Tabs */}
          <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-6">
            <TabsList className="grid grid-cols-3 w-full max-w-md">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="modules">Modules</TabsTrigger>
              <TabsTrigger value="settings">Settings</TabsTrigger>
            </TabsList>
            
            <TabsContent value="overview" className="space-y-6 mt-6">
              {/* Quick Stats */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium text-gray-500 dark:text-gray-400">Students</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center">
                      <School className="h-5 w-5 text-blue-500 mr-2" />
                      <span className="text-2xl font-bold dark:text-white">{institution?.studentsCount || 0}</span>
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium text-gray-500 dark:text-gray-400">Employees</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center">
                      <Users className="h-5 w-5 text-green-500 mr-2" />
                      <span className="text-2xl font-bold dark:text-white">{institution?.employeesCount || 0}</span>
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium text-gray-500 dark:text-gray-400">Institution Type</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center">
                      <Building className="h-5 w-5 text-purple-500 mr-2" />
                      <span className="text-xl font-medium capitalize dark:text-white">{institution?.type || 'Unknown'}</span>
                    </div>
                  </CardContent>
                </Card>
              </div>
              
              {/* Institution Details */}
              <Card>
                <CardHeader>
                  <CardTitle>Institution Details</CardTitle>
                  <CardDescription>Basic information about the institution</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">Name</h3>
                      <p className="dark:text-white">{institution?.name}</p>
                    </div>
                    <div>
                      <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">Email</h3>
                      <p className="dark:text-white">{institution?.email}</p>
                    </div>
                    <div>
                      <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">Phone</h3>
                      <p className="dark:text-white">{institution?.phoneNumber}</p>
                    </div>
                    <div>
                      <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">Website</h3>
                      <p className="dark:text-white">{institution?.settings?.slug}.tabularasa.com.ng</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              {/* Status & Subscription */}
              <Card>
                <CardHeader>
                  <CardTitle>Status & Access</CardTitle>
                  <CardDescription>Information about access and activation</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between items-center p-3 bg-gray-50 dark:bg-gray-800 rounded-md">
                    <div className="flex items-center">
                      <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                      <div>
                        <p className="font-medium dark:text-white">Account Status</p>
                        <p className="text-sm text-gray-500 dark:text-gray-400">Institution account is active</p>
                      </div>
                    </div>
                    {renderStatusBadge(institution?.status || 'pending')}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="modules" className="space-y-6 mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>Active Modules</CardTitle>
                  <CardDescription>Modules assigned to this institution</CardDescription>
                </CardHeader>
                <CardContent>
                  {institution?.modules && institution.modules.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {institution.modules.map((module) => (
                        <div key={module.id} className="flex p-3 bg-gray-50 dark:bg-gray-800 rounded-lg items-center">
                          <img src={configIcon} alt={module.name} className="w-8 h-8 mr-3" />
                          <div>
                            <p className="font-medium dark:text-white">{module.name}</p>
                            <p className="text-sm text-gray-500 dark:text-gray-400">
                              {module.permissions?.length || 0} Permissions
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-8">
                      <Building className="h-12 w-12 mx-auto mb-4 text-gray-300" />
                      <p className="text-gray-500 dark:text-gray-400">No modules assigned</p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="settings" className="space-y-6 mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>Customization</CardTitle>
                  <CardDescription>Institution branding and appearance</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">Theme Color</h3>
                      <div className="flex items-center mt-1">
                        <div 
                          className="w-6 h-6 rounded-full mr-2" 
                          style={{ backgroundColor: institution?.settings?.color || '#4A90E2' }}
                        ></div>
                        <span className="dark:text-white">{institution?.settings?.color || '#4A90E2'}</span>
                      </div>
                    </div>
                    
                    <div>
                      <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">Logo</h3>
                      <div className="mt-1">
                        {institution?.settings?.logo ? (
                          <img 
                            src={institution.settings.logo} 
                            alt={`${institution.name} logo`} 
                            className="h-12 object-contain"
                          />
                        ) : (
                          <div className="h-12 w-12 bg-gray-200 dark:bg-gray-700 rounded flex items-center justify-center">
                            <Building className="h-6 w-6 text-gray-500" />
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                  
                  <Separator className="my-2" />
                  
                  <div>
                    <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">URL</h3>
                    <p className="text-blue-500 dark:text-blue-400 hover:underline">
                      https://{institution?.settings?.slug || 'institution'}.tabularasa.com.ng
                    </p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
      
      <BottomNavigation appType="vendor" />
    </>
  );
};

export default InstitutionDetails;
