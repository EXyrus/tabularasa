import React, { useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import HeaderBar from '@/components/HeaderBar';
import BottomNavigation from '@/components/BottomNavigation';
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from '@/components/ui/table';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { MoreVertical, Eye, Edit, Mail, Bell, Trash, Ban, CheckCircle, Search } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

// Mock institution data
const mockInstitutions = [
  {
    id: '1',
    name: 'Springfield Elementary School',
    slug: 'springfield-elementary',
    students: 450,
    status: 'active',
    email: 'admin@springfield.edu',
    location: 'Springfield, USA',
    createdAt: '2023-01-15',
  },
  {
    id: '2',
    name: 'Westfield High School',
    slug: 'westfield-high',
    students: 820,
    status: 'active',
    email: 'admin@westfield.edu',
    location: 'Westfield, USA',
    createdAt: '2023-02-20',
  },
  {
    id: '3',
    name: 'Oakridge Academy',
    slug: 'oakridge-academy',
    students: 340,
    status: 'suspended',
    email: 'admin@oakridge.edu',
    location: 'Oakridge, USA',
    createdAt: '2023-03-10',
  },
  {
    id: '4',
    name: 'Riverside Middle School',
    slug: 'riverside-middle',
    students: 560,
    status: 'active',
    email: 'admin@riverside.edu',
    location: 'Riverside, USA',
    createdAt: '2023-04-05',
  },
];

const Institutions: React.FC = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [institutions, setInstitutions] = useState(mockInstitutions);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedInstitution, setSelectedInstitution] = useState<any>(null);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [isEmailDialogOpen, setIsEmailDialogOpen] = useState(false);
  const [emailSubject, setEmailSubject] = useState('');
  const [emailBody, setEmailBody] = useState('');

  // Filter institutions based on search term
  const filteredInstitutions = institutions.filter(
    institution =>
      institution.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      institution.slug.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Handle institution status change
  const handleStatusChange = (id: string, newStatus: 'active' | 'suspended') => {
    setInstitutions(
      institutions.map(institution =>
        institution.id === id ? { ...institution, status: newStatus } : institution
      )
    );

    toast({
      title: `Institution ${newStatus === 'active' ? 'activated' : 'suspended'}`,
      description: `The institution has been ${newStatus === 'active' ? 'activated' : 'suspended'} successfully.`,
      variant: newStatus === 'active' ? 'default' : 'destructive',
    });
  };

  // Handle institution deletion
  const handleDelete = () => {
    if (selectedInstitution) {
      setInstitutions(
        institutions.filter(institution => institution.id !== selectedInstitution.id)
      );

      toast({
        title: 'Institution deleted',
        description: 'The institution has been deleted successfully.',
        variant: 'destructive',
      });

      setIsDeleteDialogOpen(false);
    }
  };

  // Handle sending email
  const handleSendEmail = () => {
    if (selectedInstitution && emailSubject && emailBody) {
      // In a real app, this would call an API to send the email
      console.log('Sending email to:', selectedInstitution.email);
      console.log('Subject:', emailSubject);
      console.log('Body:', emailBody);

      toast({
        title: 'Email sent',
        description: `Email has been sent to ${selectedInstitution.name} successfully.`,
      });

      setIsEmailDialogOpen(false);
      setEmailSubject('');
      setEmailBody('');
    } else {
      toast({
        title: 'Missing information',
        description: 'Please fill in all required fields.',
        variant: 'destructive',
      });
    }
  };

  // Handle sending notification
  const handleSendNotification = (institution: any) => {
    // In a real app, this would call an API to send a notification
    console.log('Sending notification to:', institution.name);

    toast({
      title: 'Notification sent',
      description: `Notification has been sent to ${institution.name} successfully.`,
    });
  };

  return (
    <div className="min-h-screen bg-background text-foreground pb-20">
      <HeaderBar appType="vendor" userName={user?.name || ''} userAvatar={user?.photo} />

      <div className="container max-w-7xl mx-auto px-4 py-8 mt-16">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold dark:text-white">Institutions</h1>
          <Button className="bg-sms-vendor text-white">Add Institution</Button>
        </div>

        <Card className="mb-6">
          <CardContent className="pt-6">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Search institutions..."
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>All Institutions</CardTitle>
            <CardDescription>Manage all registered institutions in the system</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Students</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Created</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredInstitutions.map(institution => (
                  <TableRow key={institution.id}>
                    <TableCell className="font-medium">{institution.name}</TableCell>
                    <TableCell>{institution.students}</TableCell>
                    <TableCell>
                      <Badge
                        variant={institution.status === 'active' ? 'default' : 'destructive'}
                        className={
                          institution.status === 'active'
                            ? 'bg-green-100 text-green-800 hover:bg-green-100 hover:text-green-800'
                            : 'bg-red-100 text-red-800 hover:bg-red-100 hover:text-red-800'
                        }
                      >
                        {institution.status === 'active' ? 'Active' : 'Suspended'}
                      </Badge>
                    </TableCell>
                    <TableCell>{new Date(institution.createdAt).toLocaleDateString()}</TableCell>
                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" className="h-8 w-8 p-0">
                            <span className="sr-only">Open menu</span>
                            <MoreVertical className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem className="cursor-pointer flex items-center gap-2">
                            <Eye className="h-4 w-4" /> View Details
                          </DropdownMenuItem>
                          <DropdownMenuItem className="cursor-pointer flex items-center gap-2">
                            <Edit className="h-4 w-4" /> Edit
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            onClick={() => {
                              setSelectedInstitution(institution);
                              setIsEmailDialogOpen(true);
                            }}
                            className="cursor-pointer flex items-center gap-2"
                          >
                            <Mail className="h-4 w-4" /> Send Email
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            onClick={() => handleSendNotification(institution)}
                            className="cursor-pointer flex items-center gap-2"
                          >
                            <Bell className="h-4 w-4" /> Send Notification
                          </DropdownMenuItem>
                          {institution.status === 'active' ? (
                            <DropdownMenuItem
                              onClick={() => handleStatusChange(institution.id, 'suspended')}
                              className="cursor-pointer flex items-center gap-2 text-amber-500"
                            >
                              <Ban className="h-4 w-4" /> Suspend
                            </DropdownMenuItem>
                          ) : (
                            <DropdownMenuItem
                              onClick={() => handleStatusChange(institution.id, 'active')}
                              className="cursor-pointer flex items-center gap-2 text-green-500"
                            >
                              <CheckCircle className="h-4 w-4" /> Activate
                            </DropdownMenuItem>
                          )}
                          <DropdownMenuItem
                            onClick={() => {
                              setSelectedInstitution(institution);
                              setIsDeleteDialogOpen(true);
                            }}
                            className="cursor-pointer flex items-center gap-2 text-red-500"
                          >
                            <Trash className="h-4 w-4" /> Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>

      {/* Delete Confirmation Dialog */}
      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete Institution</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete {selectedInstitution?.name}? This action cannot be
              undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDeleteDialogOpen(false)}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={handleDelete}>
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Send Email Dialog */}
      <Dialog open={isEmailDialogOpen} onOpenChange={setIsEmailDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Send Email</DialogTitle>
            <DialogDescription>
              Send an email to the admin of {selectedInstitution?.name}.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <label htmlFor="subject" className="text-sm font-medium">
                Subject
              </label>
              <Input
                id="subject"
                value={emailSubject}
                onChange={e => setEmailSubject(e.target.value)}
                placeholder="Enter email subject"
              />
            </div>
            <div className="grid gap-2">
              <label htmlFor="body" className="text-sm font-medium">
                Message
              </label>
              <textarea
                id="body"
                value={emailBody}
                onChange={e => setEmailBody(e.target.value)}
                placeholder="Enter your message"
                className="min-h-[100px] w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsEmailDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleSendEmail}>Send Email</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <BottomNavigation appType="vendor" />
    </div>
  );
};

export default Institutions;
