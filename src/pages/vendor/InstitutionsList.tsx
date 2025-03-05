
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, PlusCircle, Building, ArrowUpDown, MoreHorizontal, Check, X, AlertTriangle, Mail, BellRing, Pencil, Trash2 } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
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

// Mock function to fetch institutions - would be replaced with an API call
const fetchInstitutions = async () => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 800));
  
  return [
    { id: 1, name: 'Springfield Elementary', slug: 'springfield-elementary', status: 'active', adminEmail: 'principal@springfield.edu', studentsCount: 450, employeesCount: 35, createdAt: '2023-01-15' },
    { id: 2, name: 'Westfield High School', slug: 'westfield-high', status: 'active', adminEmail: 'principal@westfield.edu', studentsCount: 820, employeesCount: 65, createdAt: '2023-02-20' },
    { id: 3, name: 'Oakridge Academy', slug: 'oakridge-academy', status: 'suspended', adminEmail: 'admin@oakridge.edu', studentsCount: 340, employeesCount: 28, createdAt: '2023-03-05' },
    { id: 4, name: 'Riverside Middle School', slug: 'riverside-middle', status: 'active', adminEmail: 'principal@riverside.edu', studentsCount: 560, employeesCount: 42, createdAt: '2023-04-10' },
    { id: 5, name: 'Meadowbrook Elementary', slug: 'meadowbrook-elementary', status: 'pending', adminEmail: 'admin@meadowbrook.edu', studentsCount: 390, employeesCount: 31, createdAt: '2023-05-18' },
    { id: 6, name: 'Lakeside Preparatory', slug: 'lakeside-prep', status: 'active', adminEmail: 'headmaster@lakesideprep.edu', studentsCount: 280, employeesCount: 25, createdAt: '2023-06-22' },
  ];
};

const InstitutionsList: React.FC = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [searchQuery, setSearchQuery] = useState('');
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [selectedInstitution, setSelectedInstitution] = useState<any>(null);
  
  const { data: institutions = [], isLoading } = useQuery({
    queryKey: ['institutions'],
    queryFn: fetchInstitutions,
  });
  
  const filteredInstitutions = institutions.filter(
    (institution) => institution.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    institution.slug.toLowerCase().includes(searchQuery.toLowerCase())
  );
  
  const handleStatusToggle = (id: number, currentStatus: string) => {
    const newStatus = currentStatus === 'active' ? 'suspended' : 'active';
    // This would be an API call to update the status
    toast({
      title: `Institution ${newStatus === 'active' ? 'activated' : 'suspended'}`,
      description: `The institution has been ${newStatus === 'active' ? 'activated' : 'suspended'} successfully.`,
      variant: newStatus === 'active' ? 'default' : 'destructive',
    });
  };
  
  const handleEdit = (id: number) => {
    navigate(`/vendor/institutions/${id}/edit`);
  };
  
  const openDeleteDialog = (institution: any) => {
    setSelectedInstitution(institution);
    setDeleteDialogOpen(true);
  };
  
  const handleDelete = () => {
    // This would be an API call to delete the institution
    toast({
      title: "Institution deleted",
      description: `${selectedInstitution?.name} has been deleted.`,
      variant: "destructive",
    });
    setDeleteDialogOpen(false);
  };
  
  const handleSendEmail = (email: string) => {
    // This would integrate with an email service
    toast({
      title: "Email sent",
      description: `An email has been sent to ${email}.`,
    });
  };
  
  const handleSendNotification = (id: number) => {
    // This would send a notification to the institution admin
    toast({
      title: "Notification sent",
      description: "The notification has been sent to the institution admin.",
    });
  };

  return (
    <>
      <HeaderBar 
        appType="vendor" 
        userName={user?.name || 'Admin User'} 
        userAvatar={user?.avatar} 
      />
      
      <div className="page-container pt-20 pb-20 px-4 animate-fade-in">
        <div className="mb-8 flex flex-col md:flex-row md:justify-between md:items-center gap-4">
          <div>
            <h1 className="text-2xl font-bold mb-1 dark:text-white">Institutions</h1>
            <p className="text-sm text-gray-500 dark:text-gray-400">Manage all institutions in the system</p>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input 
                placeholder="Search institutions..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
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
                    <TableHead>Students</TableHead>
                    <TableHead>Employees</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredInstitutions.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={5} className="text-center py-8 text-gray-500 dark:text-gray-400">
                        <Building className="h-12 w-12 mx-auto mb-2 opacity-20" />
                        <p>No institutions found</p>
                      </TableCell>
                    </TableRow>
                  ) : (
                    filteredInstitutions.map((institution) => (
                      <TableRow key={institution.id} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                        <TableCell className="font-medium">
                          <div>
                            <div className="font-medium dark:text-white">{institution.name}</div>
                            <div className="text-sm text-gray-500 dark:text-gray-400">{institution.slug}</div>
                          </div>
                        </TableCell>
                        <TableCell>{institution.studentsCount}</TableCell>
                        <TableCell>{institution.employeesCount}</TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <Switch 
                              checked={institution.status === 'active'} 
                              onCheckedChange={() => handleStatusToggle(institution.id, institution.status)}
                            />
                            <span className={`text-sm ${
                              institution.status === 'active' ? 'text-green-600 dark:text-green-400' : 
                              institution.status === 'suspended' ? 'text-red-600 dark:text-red-400' : 'text-yellow-600 dark:text-yellow-400'
                            }`}>
                              {institution.status.charAt(0).toUpperCase() + institution.status.slice(1)}
                            </span>
                          </div>
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
                              <DropdownMenuItem onClick={() => navigate(`/vendor/institutions/${institution.id}`)}>
                                <Building className="mr-2 h-4 w-4" />
                                View Details
                              </DropdownMenuItem>
                              <DropdownMenuItem onClick={() => handleEdit(institution.id)}>
                                <Pencil className="mr-2 h-4 w-4" />
                                Edit Details
                              </DropdownMenuItem>
                              <DropdownMenuItem onClick={() => handleSendEmail(institution.adminEmail)}>
                                <Mail className="mr-2 h-4 w-4" />
                                Email Admin
                              </DropdownMenuItem>
                              <DropdownMenuItem onClick={() => handleSendNotification(institution.id)}>
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
              Are you sure you want to delete {selectedInstitution?.name}? This action cannot be undone.
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
