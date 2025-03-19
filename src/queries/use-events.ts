import { useMutation, useQuery } from '@tanstack/react-query';
import type { AxiosError } from 'axios';
import { Event, RecipientGroup } from '@/types';
import { axios } from '@/overrides';
import { queryClient } from '@/overrides';
import URIS from './uris.json';

export const useEvents = () => {
    return useQuery({
        queryKey: ['events'],
        queryFn: async () => {
            const response = await axios.get<Event[]>(URIS.events.index);

            return response.data;
        }
    });
};

export const useEvent = (id: string) => {
    return useQuery({
        queryKey: ['event', id],
        queryFn: async () => {
            const response = await axios.get<Event>(`${URIS.events.index}/${id}`);

            return response.data;
        },
        enabled: !!id // Ensure the query doesn't run without an ID
    });
};

export const useCreateEvent = () => {
    return useMutation<Event, AxiosError, Event>({
        mutationFn: async (event: Event) => {
            const response = await axios.post<Event>(URIS.events.index, event);

            return response.data;
        },
        onSuccess: () => {
            // Invalidate and refetch events after successful creation
            queryClient.invalidateQueries({ queryKey: ['events'] });
        }
    });
};

export const useUpdateEvent = () => {
    return useMutation<Event, AxiosError, Event>({
        mutationFn: async (event: Event) => {
            const response = await axios.put<Event>(`${URIS.events.index}/${event.id}`, event);

            return response.data;
        },
        onSuccess: () => {
            // Invalidate and refetch events after successful update
            queryClient.invalidateQueries({ queryKey: ['events'] });
        }
    });
};

export const useDeleteEvent = () => {
    return useMutation<void, AxiosError, string>({
        mutationFn: async (id: string) => {
            await axios.delete(`${URIS.events.index}/${id}`);
        },
        onSuccess: () => {
            // Invalidate and refetch events after successful deletion
            queryClient.invalidateQueries({ queryKey: ['events'] });
        }
    });
};

export const useRecipientGroups = () => {
    return useQuery({
        queryKey: ['recipientGroups'],
        queryFn: async () => {
            const response = await axios.get<RecipientGroup[]>(URIS.recipientGroups.index);

            return response.data;
        }
    });
};

export const useRecipientGroup = (id: string) => {
    return useQuery({
        queryKey: ['recipientGroup', id],
        queryFn: async () => {
            const response = await axios.get<RecipientGroup>(`${URIS.recipientGroups.index}/${id}`);

            return response.data;
        },
        enabled: !!id // Ensure the query doesn't run without an ID
    });
};

export const useCreateRecipientGroup = () => {
    return useMutation<RecipientGroup, AxiosError, RecipientGroup>({
        mutationFn: async (recipientGroup: RecipientGroup) => {
            const response = await axios.post<RecipientGroup>(URIS.recipientGroups.index, recipientGroup);

            return response.data;
        },
        onSuccess: () => {
            // Invalidate and refetch recipient groups after successful creation
            queryClient.invalidateQueries({ queryKey: ['recipientGroups'] });
        }
    });
};

export const useUpdateRecipientGroup = () => {
    return useMutation<RecipientGroup, AxiosError, RecipientGroup>({
        mutationFn: async (recipientGroup: RecipientGroup) => {
            const response = await axios.put<RecipientGroup>(`${URIS.recipientGroups.index}/${recipientGroup.id}`, recipientGroup);

            return response.data;
        },
        onSuccess: () => {
            // Invalidate and refetch recipient groups after successful update
            queryClient.invalidateQueries({ queryKey: ['recipientGroups'] });
        }
    });
};

export const useDeleteRecipientGroup = () => {
    return useMutation<void, AxiosError, string>({
        mutationFn: async (id: string) => {
            await axios.delete(`${URIS.recipientGroups.index}/${id}`);
        },
        onSuccess: () => {
            // Invalidate and refetch recipient groups after successful deletion
            queryClient.invalidateQueries({ queryKey: ['recipientGroups'] });
        }
    });
};
