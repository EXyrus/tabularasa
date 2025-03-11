import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Search,
  PlusCircle,
  Building,
  ArrowUpDown,
  MoreHorizontal,
  Check,
  X,
  AlertTriangle,
  Mail,
  BellRing,
  Pencil,
  Trash2,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Switch } from '@/components/ui/switch';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { useToast } from '@/hooks/use-toast';
import HeaderBar from '@/components/HeaderBar';
import BottomNavigation from '@/components/BottomNavigation';
import { useAuth } from '@/context/AuthContext';
import {
  useInstitutions,
  useUpdateInstitutionStatus,
  useDeleteInstitution,
} from '@/queries/use-institutions';
import type { InstitutionStatusPayload } from '@/types';

const InstitutionsList: React.FC = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [searchQuery, setSearchQuery] = useState('');
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [selectedInstitution, setSelectedInstitution] = useState<any>(null);

  // Use the real query instead of mock data
  const { data: institutionsData, isLoading } = useInstitutions();
  const updateStatusMutation = useUpdateInstitutionStatus();
  const deleteInstitutionMutation = useDeleteInstitution();

  // Safely access institutions data with fallback to empty array
  const institutions = institutionsData?.institutions || [];

  const filteredInstitutions = institutions.filter(
    institution =>
      institution.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      institution.slug.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleStatusToggle = async (id: string, currentStatus: string) => {
    try {
      const newStatus = currentStatus === 'active' ? 'inactive' : 'active';

      const payload: InstitutionStatusPayload = {
        id: id,
        status: newStatus as 'active' | 'inactive' | 'pending',
      };

      await updateStatusMutation.mutateAsync(payload);

      toast({
        title: `Institution ${newStatus === 'active' ? 'activated' : 'suspended'}`,
        description: `The institution has been ${newStatus === 'active' ? 'activated' : 'suspended'} successfully.`,
        variant: newStatus === 'active' ? 'default' : 'destructive',
      });
    } catch (error) {
      toast({
        title: 'Status Update Failed',
        description: 'There was an error updating the institution status.',
        variant: 'destructive',
      });
    }
  };

  const handleEdit = (id: string) => {
    navigate(`/vendor/institutions/${id}`);
  };

  const openDeleteDialog = (institution: any) => {
    setSelectedInstitution(institution);
    setDeleteDialogOpen(true);
  };

  const handleDelete = async () => {
    if (!selectedInstitution) return;

    try {
      const payload: InstitutionStatusPayload = {
        id: selectedInstitution.id,
        status: selectedInstitution.status,
      };

      await deleteInstitutionMutation.mutateAsync(payload);

      toast({
        title: 'Institution deleted',
        description: `${selectedInstitution?.name} has been deleted.`,
        variant: 'destructive',
      });

      setDeleteDialogOpen(false);
    } catch (error) {
      toast({
        title: 'Delete Failed',
        description: 'There was an error deleting the institution.',
        variant: 'destructive',
      });
    }
  };

  const handleSendEmail = (email: string) => {
    // This would integrate with an email service
    toast({
      title: 'Email sent',
      description: `An email has been sent to ${email}.`,
    });
  };

  const handleSendNotification = (id: string) => {
    // This would send a notification to the institution admin
    toast({
      title: 'Notification sent',
      description: 'The notification has been sent to the institution admin.',
    });
  };

  return (
    <>
      <HeaderBar appType="vendor" userName={user?.name || 'Admin User'} userAvatar={user?.photo} />

      <div className="page-container pt-20 pb-20 px-4 animate-fade-in">
        <div className="mb-8 flex flex-col md:flex-row md:justify-between md:items-center gap-4">
          <div>
            <h1 className="text-2xl font-bold mb-1 dark:text-white">Institutions</h1>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Manage all institutions in the system
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Search institutions..."
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                className="pl-10 w-full sm:w-[250px]"
              />
            </div>

            <Button onClick={() => navigate('/vendor/create-institution')} className="gap-1">
              <PlusCircle className="h-4 w-4" />
              <span>Add Institution</span>
            </Button>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow overflow-hidden">
          {isLoading ? (
            <div className="flex justify-center items-center p-12">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[300px]">Institution</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Created At</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredInstitutions.length === 0 ? (
                    <TableRow>
                      <TableCell
                        colSpan={5}
                        className="text-center py-8 text-gray-500 dark:text-gray-400"
                      >
                        <Building className="h-12 w-12 mx-auto mb-2 opacity-20" />
                        <p>No institutions found</p>
                      </TableCell>
                    </TableRow>
                  ) : (
                    filteredInstitutions.map(institution => (
                      <TableRow
                        key={institution.id}
                        className="hover:bg-gray-50 dark:hover:bg-gray-700"
                      >
                        <TableCell className="font-medium">
                          <div>
                            <div className="font-medium dark:text-white">{institution.name}</div>
                            <div className="text-sm text-gray-500 dark:text-gray-400">
                              {institution.slug}
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <Switch
                              checked={institution.status === 'active'}
                              onCheckedChange={() =>
                                handleStatusToggle(institution.id, institution.status)
                              }
                            />
                            <span
                              className={`text-sm ${
                                institution.status === 'active'
                                  ? 'text-green-600 dark:text-green-400'
                                  : institution.status === 'inactive'
                                    ? 'text-red-600 dark:text-red-400'
                                    : 'text-yellow-600 dark:text-yellow-400'
                              }`}
                            >
                              {institution.status.charAt(0).toUpperCase() +
                                institution.status.slice(1)}
                            </span>
                          </div>
                        </TableCell>
                        <TableCell>{institution.type}</TableCell>
                        <TableCell>
                          {new Date(institution.createdAt).toLocaleDateString()}
                        </TableCell>
                        <TableCell className="text-right">
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="sm">
                                <MoreHorizontal className="h-4 w-4" />
                                <span className="sr-only">Actions</span>
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem
                                onClick={() => navigate(`/vendor/institutions/${institution.id}`)}
                              >
                                <Building className="mr-2 h-4 w-4" />
                                View Details
                              </DropdownMenuItem>
                              <DropdownMenuItem onClick={() => handleEdit(institution.id)}>
                                <Pencil className="mr-2 h-4 w-4" />
                                Edit Details
                              </DropdownMenuItem>
                              <DropdownMenuItem onClick={() => handleSendEmail(institution.email)}>
                                <Mail className="mr-2 h-4 w-4" />
                                Email Admin
                              </DropdownMenuItem>
                              <DropdownMenuItem
                                onClick={() => handleSendNotification(institution.id)}
                              >
                                <BellRing className="mr-2 h-4 w-4" />
                                Send Notification
                              </DropdownMenuItem>
                              <DropdownMenuItem
                                className="text-red-600 dark:text-red-400 focus:text-red-700 dark:focus:text-red-300"
                                onClick={() => openDeleteDialog(institution)}
                              >
                                <Trash2 className="mr-2 h-4 w-4" />
                                Delete
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </div>
          )}
        </div>
      </div>

      <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <AlertTriangle className="h-5 w-5 text-red-500" />
              Delete Institution
            </DialogTitle>
            <DialogDescription>
              Are you sure you want to delete {selectedInstitution?.name}? This action cannot be
              undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="flex-col sm:flex-row gap-2">
            <Button variant="outline" onClick={() => setDeleteDialogOpen(false)}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={handleDelete}>
              Delete Institution
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <BottomNavigation appType="vendor" />
    </>
  );
};

export default InstitutionsList;
