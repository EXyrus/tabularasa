// @ts-nocheck
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
  TableRow 
} from '@/components/ui/table';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
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
import { ArrowLeft, Plus, CreditCard, Search, Eye, FileText } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { createRouteChain } from '@/utils/route-builder';

// Mock data
const fetchPayments = async () => {
  await new Promise(resolve => setTimeout(resolve, 800));
  return [
    { id: 1, studentName: 'John Doe', studentId: 'ST-001', feeId: 1, feeName: 'Tuition Fee', amount: 5000, dueDate: '2023-09-15', status: 'pending', createdAt: '2023-08-20' },
    { id: 2, studentName: 'Emily Smith', studentId: 'ST-002', feeId: 2, feeName: 'Library Fee', amount: 200, dueDate: '2023-08-30', status: 'paid', createdAt: '2023-08-22', paidAt: '2023-08-25' },
    { id: 3, studentName: 'David Wilson', studentId: 'ST-003', feeId: 1, feeName: 'Tuition Fee', amount: 5000, dueDate: '2023-09-15', status: 'overdue', createdAt: '2023-08-15' },
    { id: 4, studentName: 'Sophia Brown', studentId: 'ST-004', feeId: 3, feeName: 'Transportation Fee', amount: 1200, dueDate: '2023-09-05', status: 'pending', createdAt: '2023-08-26' },
    { id: 5, studentName: 'James Johnson', studentId: 'ST-005', feeId: 4, feeName: 'Sports Fee', amount: 450, dueDate: '2023-09-15', status: 'paid', createdAt: '2023-08-10', paidAt: '2023-08-12' },
  ];
};

const fetchStudents = async () => {
  await new Promise(resolve => setTimeout(resolve, 600));
  return [
    { id: 'ST-001', name: 'John Doe', grade: '10th', section: 'A' },
    { id: 'ST-002', name: 'Emily Smith', grade: '9th', section: 'B' },
    { id: 'ST-003', name: 'David Wilson', grade: '11th', section: 'A' },
    { id: 'ST-004', name: 'Sophia Brown', grade: '8th', section: 'C' },
    { id: 'ST-005', name: 'James Johnson', grade: '12th', section: 'A' },
    { id: 'ST-006', name: 'Olivia Davis', grade: '10th', section: 'B' },
  ];
};

const fetchFees = async () => {
  await new Promise(resolve => setTimeout(resolve, 500));
  return [
    { id: 1, name: 'Tuition Fee', amount: 5000, category: 'tuition' },
    { id: 2, name: 'Library Fee', amount: 200, category: 'facility' },
    { id: 3, name: 'Transportation Fee', amount: 1200, category: 'service' },
    { id: 4, name: 'Sports Fee', amount: 450, category: 'facility' },
    { id: 5, name: 'Computer Lab Fee', amount: 350, category: 'facility' },
    { id: 6, name: 'Examination Fee', amount: 300, category: 'academic' },
  ];
};

const formSchema = z.object({
  studentId: z.string({
    required_error: "Please select a student",
  }),
  feeId: z.string({
    required_error: "Please select a fee",
  }),
  amount: z.coerce.number().positive({ message: "Amount must be a positive number" }),
  dueDate: z.string().min(1, { message: "Please select a due date" }),
  notes: z.string().optional(),
});

const ManagePayments: React.FC = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [open, setOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  
  const { data: payments = [], isLoading: paymentsLoading } = useQuery({
    queryKey: ['payments'],
    queryFn: fetchPayments,
  });
  
  const { data: students = [], isLoading: studentsLoading } = useQuery({
    queryKey: ['students'],
    queryFn: fetchStudents,
  });
  
  const { data: fees = [], isLoading: feesLoading } = useQuery({
    queryKey: ['fees'],
    queryFn: fetchFees,
  });
  
  const filteredPayments = payments.filter(payment => 
    payment.studentName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    payment.studentId.toLowerCase().includes(searchQuery.toLowerCase()) ||
    payment.feeName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    payment.status.toLowerCase().includes(searchQuery.toLowerCase())
  );
  
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      studentId: "",
      feeId: "",
      amount: 0,
      dueDate: "",
      notes: "",
    },
  });
  
  // Update amount when fee is selected
  const watchFeeId = form.watch("feeId");
  React.useEffect(() => {
    if (watchFeeId) {
      const selectedFee = fees.find(fee => fee.id.toString() === watchFeeId);
      if (selectedFee) {
        form.setValue("amount", selectedFee.amount);
      }
    }
  }, [watchFeeId, fees, form]);
  
  const onSubmit = (values: z.infer<typeof formSchema>) => {
    // This would be an API call to create a new payment
    const selectedStudent = students.find(student => student.id === values.studentId);
    const selectedFee = fees.find(fee => fee.id.toString() === values.feeId);
    
    toast({
      title: "Payment created",
      description: `Payment for ${selectedStudent?.name} (${selectedFee?.name}) has been created successfully.`,
    });
    
    setOpen(false);
    form.reset();
  };
  
  const handleViewPayment = (paymentId: number) => {
    navigate(createRouteChain('institution')('control-panel')('payments')(`${paymentId}`));
  };
  
  const handleViewReceipt = (paymentId: number) => {
    navigate(createRouteChain('institution')('control-panel')('payments')(`${paymentId}`)('receipt'));
  };
  
  const openNewPaymentDialog = () => {
    form.reset({
      studentId: "",
      feeId: "",
      amount: 0,
      dueDate: "",
      notes: "",
    });
    setOpen(true);
  };

  return (
    <>
      <HeaderBar 
        appType="institution" 
        userName={user?.name || 'Admin'} 
        userAvatar={user?.avatar} 
      />
      
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
            <h1 className="text-2xl font-bold mb-1 dark:text-white">Manage Payments</h1>
            <p className="text-sm text-gray-500 dark:text-gray-400">Create and track student fee payments</p>
          </div>
        </div>
        
        <Card className="mb-8 border border-gray-200 dark:border-gray-700">
          <CardHeader className="pb-3">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div>
                <CardTitle className="text-xl dark:text-white">Payments</CardTitle>
                <CardDescription className="dark:text-gray-400">Create and manage student payments</CardDescription>
              </div>
              <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
                <div className="relative w-full sm:w-auto">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <Input 
                    placeholder="Search payments..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10 w-full"
                  />
                </div>
                <Button onClick={openNewPaymentDialog}>
                  <Plus className="h-4 w-4 mr-1" />
                  Add Payment
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            {paymentsLoading ? (
              <div className="flex justify-center items-center py-8">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Student</TableHead>
                      <TableHead>Fee</TableHead>
                      <TableHead>Amount</TableHead>
                      <TableHead>Due Date</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredPayments.length === 0 ? (
                      <TableRow>
                        <TableCell colSpan={6} className="text-center py-8 text-gray-500 dark:text-gray-400">
                          <CreditCard className="h-12 w-12 mx-auto mb-2 opacity-20" />
                          <p>No payments found</p>
                        </TableCell>
                      </TableRow>
                    ) : (
                      filteredPayments.map((payment) => (
                        <TableRow key={payment.id}>
                          <TableCell>
                            <div>
                              <div className="font-medium dark:text-white">{payment.studentName}</div>
                              <div className="text-sm text-gray-500 dark:text-gray-400">{payment.studentId}</div>
                            </div>
                          </TableCell>
                          <TableCell className="dark:text-white">{payment.feeName}</TableCell>
                          <TableCell className="dark:text-white">₹{payment.amount.toLocaleString()}</TableCell>
                          <TableCell className="dark:text-white">{new Date(payment.dueDate).toLocaleDateString()}</TableCell>
                          <TableCell>
                            <span className={`px-2 py-1 rounded-full text-xs ${
                              payment.status === 'paid' ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' :
                              payment.status === 'pending' ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200' :
                              'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
                            }`}>
                              {payment.status.charAt(0).toUpperCase() + payment.status.slice(1)}
                            </span>
                          </TableCell>
                          <TableCell className="text-right">
                            <div className="flex justify-end gap-2">
                              <Button 
                                variant="ghost" 
                                size="sm" 
                                onClick={() => handleViewPayment(payment.id)}
                              >
                                <Eye className="h-4 w-4" />
                                <span className="sr-only">View</span>
                              </Button>
                              {payment.status === 'paid' && (
                                <Button 
                                  variant="ghost" 
                                  size="sm"
                                  onClick={() => handleViewReceipt(payment.id)}
                                >
                                  <FileText className="h-4 w-4" />
                                  <span className="sr-only">Receipt</span>
                                </Button>
                              )}
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
              <CreditCard className="mr-2 h-5 w-5 text-primary" />
              Create New Payment
            </DialogTitle>
            <DialogDescription className="dark:text-gray-400">
              Create a new payment for a student to pay
            </DialogDescription>
          </DialogHeader>
          
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="studentId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Student</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger className="dark:bg-gray-800 dark:border-gray-700">
                          <SelectValue placeholder="Select a student" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {studentsLoading ? (
                          <div className="flex justify-center py-4">
                            <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-primary"></div>
                          </div>
                        ) : (
                          students.map((student) => (
                            <SelectItem key={student.id} value={student.id}>
                              {student.name} ({student.grade} {student.section})
                            </SelectItem>
                          ))
                        )}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="feeId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Fee Type</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger className="dark:bg-gray-800 dark:border-gray-700">
                          <SelectValue placeholder="Select a fee" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {feesLoading ? (
                          <div className="flex justify-center py-4">
                            <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-primary"></div>
                          </div>
                        ) : (
                          fees.map((fee) => (
                            <SelectItem key={fee.id} value={fee.id.toString()}>
                              {fee.name} (₹{fee.amount})
                            </SelectItem>
                          ))
                        )}
                      </SelectContent>
                    </Select>
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
                        {...field}
                        className="dark:bg-gray-800 dark:border-gray-700" 
                      />
                    </FormControl>
                    <FormDescription className="text-xs dark:text-gray-400">
                      This is auto-filled based on the fee type selected, but you can modify it if needed.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
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
              
              <FormField
                control={form.control}
                name="notes"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Notes (Optional)</FormLabel>
                    <FormControl>
                      <Textarea 
                        placeholder="Any additional notes about this payment" 
                        {...field} 
                        className="resize-none dark:bg-gray-800 dark:border-gray-700" 
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
                <Button type="submit">
                  Create Payment
                </Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
      
      <BottomNavigation appType="institution" />
    </>
  );
};

export default ManagePayments;
