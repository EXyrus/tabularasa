import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { useAuth } from '@/context/AuthContext';
import { useToast } from '@/hooks/use-toast';
import HeaderBar from '@/components/HeaderBar';
import BottomNavigation from '@/components/BottomNavigation';
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
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { ArrowLeft, Plus, Edit, Trash2, Receipt, Search } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

// Mock data
const fetchFees = async () => {
  await new Promise(resolve => setTimeout(resolve, 800));
  return [
    {
      id: 1,
      name: 'Tuition Fee',
      amount: 5000,
      description: 'Basic tuition fee for the semester',
      category: 'tuition',
      frequency: 'semester',
      dueDate: '2023-09-15',
    },
    {
      id: 2,
      name: 'Library Fee',
      amount: 200,
      description: 'Access to library facilities',
      category: 'facility',
      frequency: 'annual',
      dueDate: '2023-08-30',
    },
    {
      id: 3,
      name: 'Transportation Fee',
      amount: 1200,
      description: 'School bus service fee',
      category: 'service',
      frequency: 'monthly',
      dueDate: '2023-09-05',
    },
    {
      id: 4,
      name: 'Sports Fee',
      amount: 450,
      description: 'Access to sports facilities',
      category: 'facility',
      frequency: 'semester',
      dueDate: '2023-09-15',
    },
    {
      id: 5,
      name: 'Computer Lab Fee',
      amount: 350,
      description: 'Access to computer labs',
      category: 'facility',
      frequency: 'semester',
      dueDate: '2023-09-15',
    },
    {
      id: 6,
      name: 'Examination Fee',
      amount: 300,
      description: 'End-of-term examination fee',
      category: 'academic',
      frequency: 'semester',
      dueDate: '2023-10-20',
    },
  ];
};

const formSchema = z.object({
  name: z.string().min(2, { message: 'Fee name must be at least 2 characters' }),
  amount: z.coerce.number().positive({ message: 'Amount must be a positive number' }),
  description: z.string().min(5, { message: 'Description must be at least 5 characters' }),
  category: z.string({
    required_error: 'Please select a category',
  }),
  frequency: z.string({
    required_error: 'Please select a frequency',
  }),
  dueDate: z.string().min(1, { message: 'Please select a due date' }),
});

const ManageFees: React.FC = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [open, setOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [selectedFee, setSelectedFee] = useState<any>(null);
  const [searchQuery, setSearchQuery] = useState('');

  const { data: fees = [], isLoading } = useQuery({
    queryKey: ['fees'],
    queryFn: fetchFees,
  });

  const filteredFees = fees.filter(
    fee =>
      fee.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      fee.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      fee.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      amount: 0,
      description: '',
      category: '',
      frequency: '',
      dueDate: '',
    },
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    if (isEditing) {
      // This would be an API call to update the fee
      toast({
        title: 'Fee updated',
        description: `${values.name} has been updated successfully.`,
      });
    } else {
      // This would be an API call to create a new fee
      toast({
        title: 'Fee created',
        description: `${values.name} has been created successfully.`,
      });
    }
    setOpen(false);
    form.reset();
    setIsEditing(false);
  };

  const handleEditFee = (fee: any) => {
    setIsEditing(true);
    setSelectedFee(fee);
    form.reset({
      name: fee.name,
      amount: fee.amount,
      description: fee.description,
      category: fee.category,
      frequency: fee.frequency,
      dueDate: fee.dueDate,
    });
    setOpen(true);
  };

  const handleDeleteFee = (fee: any) => {
    // This would be an API call to delete the fee
    toast({
      title: 'Fee deleted',
      description: `${fee.name} has been deleted successfully.`,
      variant: 'destructive',
    });
  };

  const openNewFeeDialog = () => {
    setIsEditing(false);
    form.reset({
      name: '',
      amount: 0,
      description: '',
      category: '',
      frequency: '',
      dueDate: '',
    });
    setOpen(true);
  };

  return (
    <>
      <HeaderBar appType="institution" userName={user?.name || 'Admin'} userAvatar={user?.photo} />

      <div className="page-container pt-20 pb-20 px-4 animate-fade-in">
        <div className="flex items-center mb-6">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => navigate('/institution/control-panel')}
            className="mr-2"
          >
            <ArrowLeft className="h-4 w-4 mr-1" />
            Back
          </Button>
          <div>
            <h1 className="text-2xl font-bold mb-1 dark:text-white">Manage Fees</h1>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Create and manage institution fee structure
            </p>
          </div>
        </div>

        <Card className="mb-8 border border-gray-200 dark:border-gray-700">
          <CardHeader className="pb-3">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div>
                <CardTitle className="text-xl dark:text-white">Fee Structure</CardTitle>
                <CardDescription className="dark:text-gray-400">
                  Manage existing fees or create new ones
                </CardDescription>
              </div>
              <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
                <div className="relative w-full sm:w-auto">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <Input
                    placeholder="Search fees..."
                    value={searchQuery}
                    onChange={e => setSearchQuery(e.target.value)}
                    className="pl-10 w-full"
                  />
                </div>
                <Button onClick={openNewFeeDialog}>
                  <Plus className="h-4 w-4 mr-1" />
                  Add Fee
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <div className="flex justify-center items-center py-8">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Fee Name</TableHead>
                      <TableHead>Amount</TableHead>
                      <TableHead>Category</TableHead>
                      <TableHead>Frequency</TableHead>
                      <TableHead>Due Date</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredFees.length === 0 ? (
                      <TableRow>
                        <TableCell
                          colSpan={6}
                          className="text-center py-8 text-gray-500 dark:text-gray-400"
                        >
                          <Receipt className="h-12 w-12 mx-auto mb-2 opacity-20" />
                          <p>No fees found</p>
                        </TableCell>
                      </TableRow>
                    ) : (
                      filteredFees.map(fee => (
                        <TableRow key={fee.id}>
                          <TableCell>
                            <div>
                              <div className="font-medium dark:text-white">{fee.name}</div>
                              <div className="text-sm text-gray-500 dark:text-gray-400">
                                {fee.description}
                              </div>
                            </div>
                          </TableCell>
                          <TableCell className="dark:text-white">
                            ₹{fee.amount.toLocaleString()}
                          </TableCell>
                          <TableCell>
                            <span
                              className={`px-2 py-1 rounded-full text-xs ${
                                fee.category === 'tuition'
                                  ? 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200'
                                  : fee.category === 'facility'
                                    ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                                    : fee.category === 'service'
                                      ? 'bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-200'
                                      : 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200'
                              }`}
                            >
                              {fee.category.charAt(0).toUpperCase() + fee.category.slice(1)}
                            </span>
                          </TableCell>
                          <TableCell className="capitalize dark:text-white">
                            {fee.frequency}
                          </TableCell>
                          <TableCell className="dark:text-white">
                            {new Date(fee.dueDate).toLocaleDateString()}
                          </TableCell>
                          <TableCell className="text-right">
                            <div className="flex justify-end gap-2">
                              <Button variant="ghost" size="sm" onClick={() => handleEditFee(fee)}>
                                <Edit className="h-4 w-4" />
                                <span className="sr-only">Edit</span>
                              </Button>
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => handleDeleteFee(fee)}
                                className="text-red-500 hover:text-red-700 hover:bg-red-100 dark:text-red-400 dark:hover:bg-red-900"
                              >
                                <Trash2 className="h-4 w-4" />
                                <span className="sr-only">Delete</span>
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))
                    )}
                  </TableBody>
                </Table>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="sm:max-w-[525px]">
          <DialogHeader>
            <DialogTitle className="flex items-center dark:text-white">
              <Receipt className="mr-2 h-5 w-5 text-primary" />
              {isEditing ? 'Edit Fee' : 'Add New Fee'}
            </DialogTitle>
            <DialogDescription className="dark:text-gray-400">
              {isEditing
                ? 'Update the fee details below.'
                : 'Fill in the details to create a new fee.'}
            </DialogDescription>
          </DialogHeader>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Fee Name</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="e.g. Tuition Fee, Library Fee"
                        {...field}
                        className="dark:bg-gray-800 dark:border-gray-700"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="amount"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Amount (₹)</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        placeholder="0.00"
                        {...field}
                        className="dark:bg-gray-800 dark:border-gray-700"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Describe the purpose of this fee"
                        {...field}
                        className="resize-none dark:bg-gray-800 dark:border-gray-700"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <FormField
                  control={form.control}
                  name="category"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Category</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger className="dark:bg-gray-800 dark:border-gray-700">
                            <SelectValue placeholder="Select a category" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="tuition">Tuition</SelectItem>
                          <SelectItem value="facility">Facility</SelectItem>
                          <SelectItem value="service">Service</SelectItem>
                          <SelectItem value="academic">Academic</SelectItem>
                          <SelectItem value="other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="frequency"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Frequency</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger className="dark:bg-gray-800 dark:border-gray-700">
                            <SelectValue placeholder="Select frequency" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="monthly">Monthly</SelectItem>
                          <SelectItem value="quarterly">Quarterly</SelectItem>
                          <SelectItem value="semester">Per Semester</SelectItem>
                          <SelectItem value="annual">Annual</SelectItem>
                          <SelectItem value="one-time">One-time</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="dueDate"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Due Date</FormLabel>
                    <FormControl>
                      <Input
                        type="date"
                        {...field}
                        className="dark:bg-gray-800 dark:border-gray-700"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <DialogFooter>
                <Button type="button" variant="outline" onClick={() => setOpen(false)}>
                  Cancel
                </Button>
                <Button type="submit">{isEditing ? 'Update Fee' : 'Create Fee'}</Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>

      <BottomNavigation appType="institution" />
    </>
  );
};

export default ManageFees;
