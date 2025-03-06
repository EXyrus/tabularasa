// @ts-nocheck
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { useAuth } from '@/context/AuthContext';
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
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { ArrowLeft, ArrowDown, ArrowUp, Search, FileText, Download, Filter } from 'lucide-react';
import { createRouteChain } from '@/utils/route-builder';

// Mock data
const fetchTransactions = async () => {
  await new Promise(resolve => setTimeout(resolve, 800));
  return [
    { id: 1, type: 'fee', category: 'income', description: 'Tuition Fee payment from John Doe (ST-001)', amount: 5000, date: '2023-08-25', status: 'completed', referenceId: 'TX-2023082501' },
    { id: 2, type: 'salary', category: 'expense', description: 'Salary payment to Mrs. Anderson (Teacher)', amount: 35000, date: '2023-08-22', status: 'completed', referenceId: 'TX-2023082201' },
    { id: 3, type: 'fee', category: 'income', description: 'Library Fee payment from Emily Smith (ST-002)', amount: 200, date: '2023-08-20', status: 'completed', referenceId: 'TX-2023082001' },
    { id: 4, type: 'fee', category: 'income', description: 'Sports Fee payment from James Johnson (ST-005)', amount: 450, date: '2023-08-12', status: 'completed', referenceId: 'TX-2023081201' },
    { id: 5, type: 'purchase', category: 'expense', description: 'Purchase of lab equipment', amount: 12500, date: '2023-08-15', status: 'completed', referenceId: 'TX-2023081501' },
    { id: 6, type: 'fee', category: 'income', description: 'Transportation Fee payment (Pending) from Sophia Brown (ST-004)', amount: 1200, date: '2023-08-26', status: 'pending', referenceId: 'TX-2023082601' },
    { id: 7, type: 'salary', category: 'expense', description: 'Salary payment to Mr. Wilson (Librarian)', amount: 28000, date: '2023-08-22', status: 'completed', referenceId: 'TX-2023082202' },
    { id: 8, type: 'utility', category: 'expense', description: 'Electricity bill payment', amount: 8500, date: '2023-08-18', status: 'completed', referenceId: 'TX-2023081801' },
  ];
};

const ViewTransactions: React.FC = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [typeFilter, setTypeFilter] = useState('all');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [dateRange, setDateRange] = useState({ from: '', to: '' });
  
  const { data: transactions = [], isLoading } = useQuery({
    queryKey: ['transactions'],
    queryFn: fetchTransactions,
  });
  
  // Calculate totals
  const totalIncome = transactions
    .filter(tx => tx.category === 'income' && tx.status === 'completed')
    .reduce((sum, tx) => sum + tx.amount, 0);
    
  const totalExpenses = transactions
    .filter(tx => tx.category === 'expense' && tx.status === 'completed')
    .reduce((sum, tx) => sum + tx.amount, 0);
  
  const filteredTransactions = transactions.filter(transaction => {
    // Search query filter
    const matchesSearch = 
      transaction.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      transaction.referenceId.toLowerCase().includes(searchQuery.toLowerCase());
    
    // Type filter
    const matchesType = typeFilter === 'all' || transaction.type === typeFilter;
    
    // Category filter
    const matchesCategory = categoryFilter === 'all' || transaction.category === categoryFilter;
    
    // Date range filter
    let matchesDateRange = true;
    if (dateRange.from) {
      matchesDateRange = matchesDateRange && new Date(transaction.date) >= new Date(dateRange.from);
    }
    if (dateRange.to) {
      matchesDateRange = matchesDateRange && new Date(transaction.date) <= new Date(dateRange.to);
    }
    
    return matchesSearch && matchesType && matchesCategory && matchesDateRange;
  });
  
  const handleViewTransaction = (transactionId: number) => {
    navigate(createRouteChain('institution')('control-panel')('transactions')(`${transactionId}`));
  };
  
  const handleDownloadReceipt = (transactionId: number) => {
    // This would download the receipt
    alert(`Downloading receipt for transaction ${transactionId}`);
  };
  
  const handleExportTransactions = () => {
    // This would export the transactions to CSV/Excel
    alert('Exporting transactions to CSV');
  };
  
  const clearFilters = () => {
    setSearchQuery('');
    setTypeFilter('all');
    setCategoryFilter('all');
    setDateRange({ from: '', to: '' });
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
            <h1 className="text-2xl font-bold mb-1 dark:text-white">Transactions</h1>
            <p className="text-sm text-gray-500 dark:text-gray-400">View all financial transactions</p>
          </div>
        </div>
        
        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          <Card className="border border-gray-200 dark:border-gray-700">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-500 dark:text-gray-400">Total Income</CardTitle>
              <div className="text-2xl font-bold dark:text-white">₹{totalIncome.toLocaleString()}</div>
            </CardHeader>
            <CardContent>
              <div className="text-green-600 dark:text-green-400 flex items-center">
                <ArrowUp className="h-4 w-4 mr-1" />
                <span className="text-xs">Income from fees and other sources</span>
              </div>
            </CardContent>
          </Card>
          
          <Card className="border border-gray-200 dark:border-gray-700">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-500 dark:text-gray-400">Total Expenses</CardTitle>
              <div className="text-2xl font-bold dark:text-white">₹{totalExpenses.toLocaleString()}</div>
            </CardHeader>
            <CardContent>
              <div className="text-red-600 dark:text-red-400 flex items-center">
                <ArrowDown className="h-4 w-4 mr-1" />
                <span className="text-xs">Expenses from salaries and purchases</span>
              </div>
            </CardContent>
          </Card>
          
          <Card className="border border-gray-200 dark:border-gray-700">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-500 dark:text-gray-400">Balance</CardTitle>
              <div className="text-2xl font-bold dark:text-white">₹{(totalIncome - totalExpenses).toLocaleString()}</div>
            </CardHeader>
            <CardContent>
              <div className={`flex items-center ${totalIncome - totalExpenses >= 0 ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}>
                {totalIncome - totalExpenses >= 0 ? <ArrowUp className="h-4 w-4 mr-1" /> : <ArrowDown className="h-4 w-4 mr-1" />}
                <span className="text-xs">Current balance</span>
              </div>
            </CardContent>
          </Card>
        </div>
        
        <Card className="mb-8 border border-gray-200 dark:border-gray-700">
          <CardHeader className="pb-3">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div>
                <CardTitle className="text-xl dark:text-white">Transaction History</CardTitle>
                <CardDescription className="dark:text-gray-400">View all financial transactions</CardDescription>
              </div>
              <Button onClick={handleExportTransactions} variant="outline" className="dark:text-white">
                <Download className="h-4 w-4 mr-1" />
                Export
              </Button>
            </div>
          </CardHeader>
          
          {/* Filters */}
          <CardContent className="border-b border-gray-200 dark:border-gray-700 pb-4">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <Input 
                    placeholder="Search transactions..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
                <Select value={typeFilter} onValueChange={setTypeFilter}>
                  <SelectTrigger className="w-full dark:bg-gray-800 dark:border-gray-700">
                    <SelectValue placeholder="Filter by type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Types</SelectItem>
                    <SelectItem value="fee">Fees</SelectItem>
                    <SelectItem value="salary">Salaries</SelectItem>
                    <SelectItem value="purchase">Purchases</SelectItem>
                    <SelectItem value="utility">Utilities</SelectItem>
                  </SelectContent>
                </Select>
                
                <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                  <SelectTrigger className="w-full dark:bg-gray-800 dark:border-gray-700">
                    <SelectValue placeholder="Filter by category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Categories</SelectItem>
                    <SelectItem value="income">Income</SelectItem>
                    <SelectItem value="expense">Expense</SelectItem>
                  </SelectContent>
                </Select>
                
                <div>
                  <Input 
                    type="date" 
                    placeholder="From date" 
                    value={dateRange.from}
                    onChange={(e) => setDateRange({ ...dateRange, from: e.target.value })}
                    className="dark:bg-gray-800 dark:border-gray-700"
                  />
                </div>
                
                <div>
                  <Input 
                    type="date" 
                    placeholder="To date" 
                    value={dateRange.to}
                    onChange={(e) => setDateRange({ ...dateRange, to: e.target.value })}
                    className="dark:bg-gray-800 dark:border-gray-700"
                  />
                </div>
              </div>
              
              <Button variant="ghost" onClick={clearFilters} className="whitespace-nowrap">
                <Filter className="h-4 w-4 mr-1" />
                Clear Filters
              </Button>
            </div>
          </CardContent>
          
          {/* Transactions Table */}
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
                      <TableHead>Date</TableHead>
                      <TableHead>Reference</TableHead>
                      <TableHead>Description</TableHead>
                      <TableHead>Type</TableHead>
                      <TableHead>Amount</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredTransactions.length === 0 ? (
                      <TableRow>
                        <TableCell colSpan={7} className="text-center py-8 text-gray-500 dark:text-gray-400">
                          <FileText className="h-12 w-12 mx-auto mb-2 opacity-20" />
                          <p>No transactions found</p>
                        </TableCell>
                      </TableRow>
                    ) : (
                      filteredTransactions.map((transaction) => (
                        <TableRow key={transaction.id}>
                          <TableCell className="dark:text-white">{new Date(transaction.date).toLocaleDateString()}</TableCell>
                          <TableCell className="font-mono text-sm dark:text-white">{transaction.referenceId}</TableCell>
                          <TableCell className="max-w-xs truncate dark:text-white">{transaction.description}</TableCell>
                          <TableCell>
                            <span className={`px-2 py-1 rounded-full text-xs capitalize ${
                              transaction.type === 'fee' ? 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200' :
                              transaction.type === 'salary' ? 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200' :
                              transaction.type === 'purchase' ? 'bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-200' :
                              'bg-indigo-100 text-indigo-800 dark:bg-indigo-900 dark:text-indigo-200'
                            }`}>
                              {transaction.type}
                            </span>
                          </TableCell>
                          <TableCell className={`${
                            transaction.category === 'income' ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'
                          }`}>
                            {transaction.category === 'income' ? '+' : '-'}₹{transaction.amount.toLocaleString()}
                          </TableCell>
                          <TableCell>
                            <span className={`px-2 py-1 rounded-full text-xs ${
                              transaction.status === 'completed' ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' :
                              'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200'
                            }`}>
                              {transaction.status.charAt(0).toUpperCase() + transaction.status.slice(1)}
                            </span>
                          </TableCell>
                          <TableCell className="text-right">
                            <div className="flex justify-end gap-2">
                              <Button 
                                variant="ghost" 
                                size="sm" 
                                onClick={() => handleViewTransaction(transaction.id)}
                              >
                                <FileText className="h-4 w-4" />
                                <span className="sr-only">View</span>
                              </Button>
                              {transaction.status === 'completed' && (
                                <Button 
                                  variant="ghost" 
                                  size="sm"
                                  onClick={() => handleDownloadReceipt(transaction.id)}
                                >
                                  <Download className="h-4 w-4" />
                                  <span className="sr-only">Download</span>
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
      
      <BottomNavigation appType="institution" />
    </>
  );
};

export default ViewTransactions;
