
import { useQuery, useMutation } from '@tanstack/react-query';
import { Event, RecipientGroup } from '@/types/institution';
import { useToast } from '@/hooks/use-toast';

/**
 * Custom hook to fetch events
 */
export const useGetEvents = () => {
  return useQuery({
    queryKey: ['events'],
    queryFn: async () => {
      try {
        // Mock data for development - in production this would fetch from the API
        const mockEvents: Event[] = [
          {
            id: '1',
            title: 'Parent-Teacher Conference',
            description: 'Annual parent-teacher conference to discuss student progress',
            startDate: '2023-10-15T14:00:00',
            endDate: '2023-10-15T18:00:00',
            location: 'School Main Hall',
            allDay: false,
            createdBy: 'Administrator',
            recipientGroups: [
              { id: '1', name: 'All Parents', type: 'guardian', members: 450 }
            ]
          },
          {
            id: '2',
            title: 'Staff Meeting',
            description: 'Monthly staff meeting to discuss school operations',
            startDate: '2023-10-10T09:00:00',
            endDate: '2023-10-10T11:00:00',
            location: 'Conference Room A',
            allDay: false,
            createdBy: 'Principal',
            recipientGroups: [
              { id: '2', name: 'All Staff', type: 'staff', members: 45 }
            ]
          },
          {
            id: '3',
            title: 'School Holiday',
            description: 'National Independence Day',
            startDate: '2023-10-01T00:00:00',
            endDate: '2023-10-01T23:59:59',
            allDay: true,
            createdBy: 'System',
            recipientGroups: [
              { id: '3', name: 'Everyone', type: 'all', members: 1200 }
            ]
          }
        ];
        
        return mockEvents;
      } catch (error: any) {
        console.error('Error fetching events:', error);
        throw new Error(error.message || 'Failed to fetch events');
      }
    },
    retry: 1,
  });
};

/**
 * Custom hook to fetch recipient groups
 */
export const useGetRecipientGroups = () => {
  return useQuery({
    queryKey: ['recipient_groups'],
    queryFn: async () => {
      try {
        // Mock data for development - in production this would fetch from the API
        const mockGroups: RecipientGroup[] = [
          { id: '1', name: 'All Parents', type: 'guardian', description: 'All registered parents/guardians', members: 450 },
          { id: '2', name: 'All Staff', type: 'staff', description: 'All school staff members', members: 45 },
          { id: '3', name: 'Everyone', type: 'all', description: 'All users in the system', members: 1200 },
          { id: '4', name: 'Primary School Students', type: 'student', description: 'All primary school students', members: 300 },
          { id: '5', name: 'Secondary School Students', type: 'student', description: 'All secondary school students', members: 450 },
          { id: '6', name: 'Teaching Staff', type: 'staff', description: 'Teachers only', members: 30 },
          { id: '7', name: 'Admin Staff', type: 'staff', description: 'Administrative staff only', members: 15 }
        ];
        
        return mockGroups;
      } catch (error: any) {
        console.error('Error fetching recipient groups:', error);
        throw new Error(error.message || 'Failed to fetch recipient groups');
      }
    },
    retry: 1,
  });
};

/**
 * Custom hook to add an event
 */
export const useAddEvent = () => {
  const { toast } = useToast();
  
  return useMutation({
    mutationFn: async (newEvent: Omit<Event, 'id'>) => {
      try {
        // This would be an API call in production
        console.log('Adding event:', newEvent);
        
        // Mock creating a new event with an ID
        const createdEvent: Event = {
          id: Math.random().toString(36).substring(2, 11),
          ...newEvent
        };
        
        return createdEvent;
      } catch (error: any) {
        console.error('Error adding event:', error);
        throw new Error(error.message || 'Failed to add event');
      }
    },
    onSuccess: () => {
      toast({
        title: "Success",
        description: "Event created successfully",
      });
    },
    onError: (error: Error) => {
      toast({
        title: "Error",
        description: `Failed to create event: ${error.message}`,
        variant: "destructive",
      });
    }
  });
};

/**
 * Custom hook to add a recipient group
 */
export const useAddRecipientGroup = () => {
  const { toast } = useToast();
  
  return useMutation({
    mutationFn: async (newGroup: Omit<RecipientGroup, 'id'>) => {
      try {
        // This would be an API call in production
        console.log('Adding recipient group:', newGroup);
        
        // Mock creating a new group with an ID
        const createdGroup: RecipientGroup = {
          id: Math.random().toString(36).substring(2, 11),
          ...newGroup
        };
        
        return createdGroup;
      } catch (error: any) {
        console.error('Error adding recipient group:', error);
        throw new Error(error.message || 'Failed to add recipient group');
      }
    },
    onSuccess: () => {
      toast({
        title: "Success",
        description: "Recipient group created successfully",
      });
    },
    onError: (error: Error) => {
      toast({
        title: "Error",
        description: `Failed to create recipient group: ${error.message}`,
        variant: "destructive",
      });
    }
  });
};
