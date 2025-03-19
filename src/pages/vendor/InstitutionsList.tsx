
import React, { useState, useEffect } from 'react';
import { AlertTriangle } from 'lucide-react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import {
  useInstitutions,
  useUpdateInstitutionStatus,
  useInstitutionDetails,
} from '@/queries/use-institutions';
import { useDebounce } from '@/hooks/useDebounce';
import { Icons } from '@/components/icons';
import { useNavigate } from 'react-router-dom';

interface Institution {
  id: string;
  name: string;
  slug: string;
  type: string;
  logo: string;
  status: 'active' | 'inactive' | 'pending';
  createdAt: string;
  email: string;
}

interface InstitutionStatusPayload {
  id: string;
  status: 'active' | 'inactive' | 'pending';
}

interface InstitutionDetailsPayload {
  id: string;
  name?: string;
  institutionType?: string;
  email?: string;
  phoneNumber?: string;
}

const InstitutionsList: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStatus, setSelectedStatus] = useState<
    'active' | 'inactive' | 'pending' | 'all'
  >('all');
  const [isDetailsDialogOpen, setIsDetailsDialogOpen] = useState(false);
  const [selectedInstitution, setSelectedInstitution] = useState<
    Institution | null
  >(null);
  const [institutionDetails, setInstitutionDetails] = useState<{
    name?: string;
    institutionType?: string;
    email?: string;
    phoneNumber?: string;
  }>({});
  const debouncedSearchQuery = useDebounce(searchQuery, 500);
  const navigate = useNavigate();

  const { toast } = useToast();
  const {
    data: institutionsData,
    isLoading,
    isError,
    error,
  } = useInstitutions();
  const {
    mutate: updateInstitutionStatus,
    isLoading: isStatusUpdating,
  } = useUpdateInstitutionStatus();
  const {
    mutate: updateInstitutionDetails,
    isLoading: isDetailsUpdating,
  } = useInstitutionDetails();

  useEffect(() => {
    if (selectedInstitution) {
      setInstitutionDetails({
        name: selectedInstitution.name,
        institutionType: selectedInstitution.type,
        email: selectedInstitution.email,
        phoneNumber: selectedInstitution.email,
      });
    }
  }, [selectedInstitution]);

  const handleStatusChange = (
    institutionId: string,
    newStatus: 'active' | 'inactive' | 'pending'
  ) => {
    const payload: InstitutionStatusPayload = {
      id: institutionId,
      status: newStatus,
    };

    updateInstitutionStatus(payload, {
      onSuccess: () => {
        toast({
          title: 'Status Updated',
          description: `Institution status updated to ${newStatus}`,
        });
      },
      onError: (error: any) => {
        toast({
          title: 'Error',
          description: `Failed to update institution status: ${error.message}`,
          variant: 'destructive',
        });
      },
    });
  };

  const institutions = institutionsData?.institutions || [];

  const filteredInstitutions = React.useMemo(() => {
    if (!institutions) return [];

    let filtered = [...institutions];

    if (debouncedSearchQuery) {
      filtered = filtered.filter((institution) =>
        institution.name.toLowerCase().includes(debouncedSearchQuery.toLowerCase())
      );
    }

    if (selectedStatus !== 'all') {
      filtered = filtered.filter(
        (institution) => institution.status === selectedStatus
      );
    }

    return filtered;
  }, [institutions, debouncedSearchQuery, selectedStatus]);

  const handleDetailsChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setInstitutionDetails({
      ...institutionDetails,
      [e.target.name]: e.target.value,
    });
  };

  const handleUpdateDetails = () => {
    if (!selectedInstitution) return;

    const payload: InstitutionDetailsPayload = {
      id: selectedInstitution.id,
      ...institutionDetails,
    };

    updateInstitutionDetails(payload, {
      onSuccess: () => {
        toast({
          title: 'Details Updated',
          description: 'Institution details updated successfully',
        });
        setIsDetailsDialogOpen(false);
      },
      onError: (error: any) => {
        toast({
          title: 'Error',
          description: `Failed to update institution details: ${error.message}`,
          variant: 'destructive',
        });
      },
    });
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-48">
        <Icons.spinner className="mr-2 h-6 w-6 animate-spin" />
        Loading institutions...
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex items-center justify-center h-48 text-red-500">
        <AlertTriangle className="mr-2 h-4 w-4" />
        Error: {(error as Error).message}
      </div>
    );
  }

  return (
    <div>
      <Card>
        <CardHeader>
          <CardTitle>Institutions</CardTitle>
          <CardDescription>Manage registered institutions</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center space-x-2">
            <Input
              type="text"
              placeholder="Search institutions..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <Select
              value={selectedStatus}
              onValueChange={(value) =>
                setSelectedStatus(value as typeof selectedStatus)
              }
            >
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All</SelectItem>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="inactive">Inactive</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredInstitutions.map((institution) => (
                  <TableRow key={institution.id}>
                    <TableCell>{institution.name}</TableCell>
                    <TableCell>{institution.type}</TableCell>
                    <TableCell>{institution.email}</TableCell>
                    <TableCell>
                      <Select
                        value={institution.status}
                        onValueChange={(value) =>
                          handleStatusChange(institution.id, value as any)
                        }
                        disabled={isStatusUpdating}
                      >
                        <SelectTrigger className="w-[120px]">
                          <SelectValue placeholder={institution.status} />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="active">Active</SelectItem>
                          <SelectItem value="inactive">Inactive</SelectItem>
                          <SelectItem value="pending">Pending</SelectItem>
                        </SelectContent>
                      </Select>
                    </TableCell>
                    <TableCell className="text-right">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => {
                          setSelectedInstitution(institution);
                          setIsDetailsDialogOpen(true);
                        }}
                      >
                        View Details
                      </Button>
                      <Button
                        size="sm"
                        className="ml-2"
                        onClick={() =>
                          navigate(`/vendor/institutions/${institution.id}`)
                        }
                      >
                        Manage
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      <Dialog open={isDetailsDialogOpen} onOpenChange={setIsDetailsDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Institution Details</DialogTitle>
            <DialogDescription>
              Update institution details here. Click save when you're done.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">
                Name
              </Label>
              <Input
                id="name"
                name="name"
                value={institutionDetails.name || ''}
                onChange={handleDetailsChange}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="institutionType" className="text-right">
                Type
              </Label>
              <Input
                id="institutionType"
                name="institutionType"
                value={institutionDetails.institutionType || ''}
                onChange={handleDetailsChange}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="email" className="text-right">
                Email
              </Label>
              <Input
                id="email"
                name="email"
                type="email"
                value={institutionDetails.email || ''}
                onChange={handleDetailsChange}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="phoneNumber" className="text-right">
                Phone Number
              </Label>
              <Input
                id="phoneNumber"
                name="phoneNumber"
                type="tel"
                value={institutionDetails.phoneNumber || ''}
                onChange={handleDetailsChange}
                className="col-span-3"
              />
            </div>
          </div>
          <div className="flex justify-end">
            <Button type="submit" onClick={handleUpdateDetails} disabled={isDetailsUpdating}>
              {isDetailsUpdating ? (
                <>
                  <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
                  Updating...
                </>
              ) : (
                'Save changes'
              )}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default InstitutionsList;
