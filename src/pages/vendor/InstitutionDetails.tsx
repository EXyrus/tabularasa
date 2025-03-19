import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useQuery, useMutation } from '@tanstack/react-query';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Avatar } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { MoreVertical, Edit, Trash, ArrowLeft, CheckCircle, Ban } from 'lucide-react';
import { DropdownMenu, DropdownMenuItem, DropdownMenuContent, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { useToast } from '@/hooks/use-toast';
import { useInstitutionDetails, useUpdateInstitutionDetails, useUpdateInstitutionStatus } from '@/queries/use-institutions';
import { InstitutionDetailsPayload, InstitutionStatusPayload } from '@/types/payloads';
import HeaderBar from '@/components/HeaderBar';
import { useAuth } from '@/context/AuthContext';

const InstitutionDetails: React.FC = () => {
  const { user } = useAuth();
  const { institutionId } = useParams<{ institutionId: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [institutionData, setInstitutionData] = useState<any>(null);

  // Use the correct hook
  const { data, isLoading, isError, error } = useInstitutionDetails(institutionId as string);
  
  // Use the mutation hooks
  const updateInstitutionDetailsMutation = useUpdateInstitutionDetails();
  const updateInstitutionStatusMutation = useUpdateInstitutionStatus();

  useEffect(() => {
    if (data) {
      setInstitutionData(data);
    }
  }, [data]);

  const handleEdit = () => {
    navigate(`/vendor/institutions/edit/${institutionId}`);
  };

  const handleDelete = async () => {
    // Implement delete logic here
    toast({
      title: 'Delete Action',
      description: 'Delete functionality is not implemented yet.',
    });
  };

  const handleStatusToggle = async (institutionId: string) => {
    const currentStatus = institutionData?.status;
    const newStatus = currentStatus === 'active' ? 'inactive' : 'active';
    
    try {
      await updateInstitutionStatusMutation.mutateAsync({ 
        id: institutionId, 
        status: newStatus
      });
      
      // Update the local state to reflect the change
      if (institutionData) {
        setInstitutionData({
          ...institutionData,
          status: newStatus,
        });
      }
      
      toast({
        title: 'Status Updated',
        description: `Institution has been ${newStatus === 'active' ? 'activated' : 'deactivated'}.`,
      });
    } catch (error) {
      toast({
        title: 'Update Failed',
        description: 'Failed to update institution status.',
        variant: 'destructive',
      });
    }
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error: {error?.message}</div>;
  }

  if (!institutionData) {
    return <div>No institution data found.</div>;
  }

  return (
    <div className="min-h-screen bg-gray-100 pb-20">
      <HeaderBar appType="vendor" userName={user?.name || 'Vendor User'} userAvatar={user?.photo} />

      <div className="container max-w-4xl mx-auto px-4 py-8 mt-20">
        <div className="mb-4 flex justify-between items-center">
          <Button variant="ghost" onClick={() => navigate('/vendor/institutions')}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Institutions
          </Button>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <span className="sr-only">Open menu</span>
                <MoreVertical className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={handleEdit}>
                <Edit className="mr-2 h-4 w-4" /> Edit
              </DropdownMenuItem>
              <DropdownMenuItem onClick={handleDelete}>
                <Trash className="mr-2 h-4 w-4" /> Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        <Card>
          <CardHeader>
            <div className="flex items-center">
              <Avatar className="mr-4 h-12 w-12">
                {institutionData.logo ? (
                  <img src={institutionData.logo} alt={institutionData.name} />
                ) : (
                  <span>{institutionData.name?.charAt(0)}</span>
                )}
              </Avatar>
              <div>
                <CardTitle>{institutionData.name}</CardTitle>
                <CardDescription>{institutionData.type}</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="grid gap-4 md:grid-cols-2">
            <div>
              <p className="text-sm font-bold">Contact Information</p>
              <p>Email: {institutionData.email}</p>
              <p>Phone: {institutionData.phoneNumber}</p>
            </div>
            <div>
              <p className="text-sm font-bold">Status</p>
              <div className="flex items-center">
                {institutionData.status === 'active' ? (
                  <>
                    <CheckCircle className="mr-2 h-4 w-4 text-green-500" />
                    <span>Active</span>
                  </>
                ) : (
                  <>
                    <Ban className="mr-2 h-4 w-4 text-red-500" />
                    <span>Inactive</span>
                  </>
                )}
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={() => handleStatusToggle(institutionData.id)}
              >
                {institutionData.status === 'active' ? 'Deactivate' : 'Activate'}
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default InstitutionDetails;
