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
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
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
  DialogTrigger,
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
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { ArrowLeft, Plus, Pencil, Trash2, Shield } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

// Mock data
const fetchRoles = async () => {
  await new Promise(resolve => setTimeout(resolve, 800));
  return [
    {
      id: 1,
      name: 'Administrator',
      description: 'Full access to all systems',
      permissions: ['manage_users', 'manage_roles', 'manage_finances', 'view_reports'],
    },
    {
      id: 2,
      name: 'Teacher',
      description: 'Can manage classes and student records',
      permissions: ['manage_classes', 'manage_grades', 'view_student_records'],
    },
    {
      id: 3,
      name: 'Accountant',
      description: 'Manages financial records and payments',
      permissions: ['manage_finances', 'view_reports'],
    },
    {
      id: 4,
      name: 'Librarian',
      description: 'Manages library resources',
      permissions: ['manage_library'],
    },
    {
      id: 5,
      name: 'Health Staff',
      description: 'Manages health records',
      permissions: ['manage_health_records'],
    },
  ];
};

const fetchPermissions = async () => {
  await new Promise(resolve => setTimeout(resolve, 600));
  return [
    {
      id: 'manage_users',
      name: 'Manage Users',
      description: 'Create, update, and delete user accounts',
    },
    { id: 'manage_roles', name: 'Manage Roles', description: 'Create, update, and delete roles' },
    {
      id: 'manage_finances',
      name: 'Manage Finances',
      description: 'Access to financial modules and records',
    },
    {
      id: 'manage_classes',
      name: 'Manage Classes',
      description: 'Create, update, and delete classes',
    },
    { id: 'manage_grades', name: 'Manage Grades', description: 'Record and manage student grades' },
    {
      id: 'view_student_records',
      name: 'View Student Records',
      description: 'Access to view student information',
    },
    { id: 'view_reports', name: 'View Reports', description: 'Access to view system reports' },
    {
      id: 'manage_library',
      name: 'Manage Library',
      description: 'Manage library resources and loans',
    },
    {
      id: 'manage_health_records',
      name: 'Manage Health Records',
      description: 'Access to health records',
    },
  ];
};

const formSchema = z.object({
  name: z.string().min(2, { message: 'Role name must be at least 2 characters' }),
  description: z.string().min(5, { message: 'Description must be at least 5 characters' }),
  permissions: z.array(z.string()).min(1, { message: 'Select at least one permission' }),
});

const ManageRoles: React.FC = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [open, setOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [selectedRole, setSelectedRole] = useState<any>(null);

  const { data: roles = [], isLoading: rolesLoading } = useQuery({
    queryKey: ['roles'],
    queryFn: fetchRoles,
  });

  const { data: permissions = [], isLoading: permissionsLoading } = useQuery({
    queryKey: ['permissions'],
    queryFn: fetchPermissions,
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      description: '',
      permissions: [],
    },
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    if (isEditing) {
      // This would be an API call to update the role
      toast({
        title: 'Role updated',
        description: `${values.name} has been updated successfully.`,
      });
    } else {
      // This would be an API call to create a new role
      toast({
        title: 'Role created',
        description: `${values.name} has been created successfully.`,
      });
    }
    setOpen(false);
    form.reset();
    setIsEditing(false);
  };

  const handleEditRole = (role: any) => {
    setIsEditing(true);
    setSelectedRole(role);
    form.reset({
      name: role.name,
      description: role.description,
      permissions: role.permissions,
    });
    setOpen(true);
  };

  const handleDeleteRole = (role: any) => {
    // This would be an API call to delete the role
    toast({
      title: 'Role deleted',
      description: `${role.name} has been deleted successfully.`,
      variant: 'destructive',
    });
  };

  const openNewRoleDialog = () => {
    setIsEditing(false);
    form.reset({
      name: '',
      description: '',
      permissions: [],
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
            <h1 className="text-2xl font-bold mb-1 dark:text-white">Manage Roles</h1>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Create and manage institution roles and permissions
            </p>
          </div>
        </div>

        <Card className="mb-8 border border-gray-200 dark:border-gray-700">
          <CardHeader className="pb-3">
            <div className="flex justify-between items-center">
              <div>
                <CardTitle className="text-xl dark:text-white">Roles</CardTitle>
                <CardDescription className="dark:text-gray-400">
                  Manage existing roles or create new ones
                </CardDescription>
              </div>
              <Button onClick={openNewRoleDialog}>
                <Plus className="h-4 w-4 mr-1" />
                New Role
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            {rolesLoading ? (
              <div className="flex justify-center items-center py-8">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Role Name</TableHead>
                      <TableHead>Description</TableHead>
                      <TableHead>Permissions</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {roles.map(role => (
                      <TableRow key={role.id}>
                        <TableCell className="font-medium dark:text-white">{role.name}</TableCell>
                        <TableCell className="dark:text-gray-300">{role.description}</TableCell>
                        <TableCell>
                          <div className="flex flex-wrap gap-1">
                            {role.permissions.map(permission => (
                              <span
                                key={permission}
                                className="px-2 py-1 text-xs rounded-full bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200"
                              >
                                {permission
                                  .split('_')
                                  .map(word => word.charAt(0).toUpperCase() + word.slice(1))
                                  .join(' ')}
                              </span>
                            ))}
                          </div>
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end gap-2">
                            <Button variant="ghost" size="sm" onClick={() => handleEditRole(role)}>
                              <Pencil className="h-4 w-4" />
                              <span className="sr-only">Edit</span>
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleDeleteRole(role)}
                              className="text-red-500 hover:text-red-700 hover:bg-red-100 dark:text-red-400 dark:hover:bg-red-900"
                            >
                              <Trash2 className="h-4 w-4" />
                              <span className="sr-only">Delete</span>
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
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
              <Shield className="mr-2 h-5 w-5 text-primary" />
              {isEditing ? 'Edit Role' : 'Create New Role'}
            </DialogTitle>
            <DialogDescription className="dark:text-gray-400">
              {isEditing
                ? 'Update the role details and permissions below.'
                : 'Fill in the details to create a new role.'}
            </DialogDescription>
          </DialogHeader>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Role Name</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="e.g. Teacher, Accountant"
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
                        placeholder="Describe the role's responsibilities"
                        {...field}
                        className="resize-none dark:bg-gray-800 dark:border-gray-700"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div>
                <FormLabel className="block mb-3">Permissions</FormLabel>
                <div className="border rounded-md p-4 space-y-4 max-h-[300px] overflow-y-auto dark:border-gray-700 dark:bg-gray-800">
                  {permissionsLoading ? (
                    <div className="flex justify-center py-4">
                      <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-primary"></div>
                    </div>
                  ) : (
                    permissions.map(permission => (
                      <FormField
                        key={permission.id}
                        control={form.control}
                        name="permissions"
                        render={({ field }) => (
                          <FormItem
                            key={permission.id}
                            className="flex flex-row items-start space-x-3 space-y-0"
                          >
                            <FormControl>
                              <Checkbox
                                checked={field.value?.includes(permission.id)}
                                onCheckedChange={checked => {
                                  return checked
                                    ? field.onChange([...field.value, permission.id])
                                    : field.onChange(
                                        field.value?.filter(value => value !== permission.id)
                                      );
                                }}
                              />
                            </FormControl>
                            <div className="space-y-1 leading-none">
                              <FormLabel className="text-sm font-medium dark:text-white">
                                {permission.name}
                              </FormLabel>
                              <FormDescription className="text-xs dark:text-gray-400">
                                {permission.description}
                              </FormDescription>
                            </div>
                          </FormItem>
                        )}
                      />
                    ))
                  )}
                </div>
                <FormMessage className="mt-2">
                  {form.formState.errors.permissions?.message}
                </FormMessage>
              </div>

              <DialogFooter>
                <Button type="button" variant="outline" onClick={() => setOpen(false)}>
                  Cancel
                </Button>
                <Button type="submit">{isEditing ? 'Update Role' : 'Create Role'}</Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>

      <BottomNavigation appType="institution" />
    </>
  );
};

export default ManageRoles;
