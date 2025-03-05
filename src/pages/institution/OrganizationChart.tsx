
import React, { useState, useEffect } from 'react';
import { useQuery, useMutation } from '@tanstack/react-query';
import { toast } from '@/components/ui/use-toast';
import HeaderBar from '@/components/HeaderBar';
import BottomNavigation from '@/components/BottomNavigation';
import OrganizationForm from '@/components/organization/OrganizationForm';
import OrganizationTree from '@/components/organization/OrganizationTree';
import LoadingSpinner from '@/components/LoadingSpinner';
import { fetchOrganizationChart, saveOrganizationChart } from '@/services/organizationService';

const OrganizationChartPage: React.FC = () => {
  const [activeView, setActiveView] = useState<'tree' | 'form'>('tree');
  const [organizationId, setOrganizationId] = useState<string | null>(null);

  // Fetch organization data
  const { data: organizationData, isLoading, error, refetch } = useQuery({
    queryKey: ['organizationChart'],
    queryFn: fetchOrganizationChart,
  });

  // Mutation for saving organization data
  const mutation = useMutation({
    mutationFn: saveOrganizationChart,
    onSuccess: () => {
      toast({
        title: "Success",
        description: "Organization chart saved successfully.",
      });
      refetch();
      setActiveView('tree');
    },
    onError: (error: any) => {
      toast({
        title: "Error",
        description: error.message || "Failed to save organization chart.",
        variant: "destructive",
      });
    }
  });

  const handleSaveOrganization = (organizationData: any) => {
    mutation.mutate(organizationData);
  };

  const handleEditNode = (nodeId: string) => {
    setOrganizationId(nodeId);
    setActiveView('form');
  };

  const handleAddNode = (parentId: string | null = null) => {
    setOrganizationId(parentId);
    setActiveView('form');
  };

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return (
      <div className="p-4 text-red-500">
        Error loading organization data: {(error as Error).message}
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <HeaderBar title="Organization Chart" />
      
      <main className="flex-1 p-4 pb-20">
        {activeView === 'tree' && (
          <>
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-bold">Organization Structure</h2>
              <button 
                onClick={() => handleAddNode(null)}
                className="bg-sms-institution text-white px-4 py-2 rounded-md"
              >
                Add Root Organization
              </button>
            </div>
            <OrganizationTree 
              data={organizationData || []} 
              onEdit={handleEditNode}
              onAddChild={handleAddNode}
            />
          </>
        )}

        {activeView === 'form' && (
          <OrganizationForm 
            organizationId={organizationId}
            organizationData={organizationData}
            onSubmit={handleSaveOrganization} 
            onCancel={() => setActiveView('tree')}
          />
        )}
      </main>
      
      <BottomNavigation appType="institution" />
    </div>
  );
};

export default OrganizationChartPage;
