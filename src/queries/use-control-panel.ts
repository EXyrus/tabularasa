import { useMutation, useQuery } from '@tanstack/react-query';
import type { AxiosError } from 'axios';
import { axios } from '@/overrides';
import { queryClient } from '@/overrides';
import type {
    InstitutionFee,
    Organization,
    OrganizationNode,
    RecipientGroup
} from '@/types';
import type { FetchResponseError } from '@/types/fetch';
import { flattenOrganizationTree } from '@/helpers/flatten-organization-tree';
import URIS from './uris.json';

export const useRecipientGroups = () => {
    return useQuery({
        queryKey: ['recipient-groups'],

        queryFn: async () => {
            const storedName = JSON.parse(
                localStorage.getItem('institutionTheme') ?? '{}'
            );

            const response = await axios.get<RecipientGroup[]>(
                `${URIS.institutions.index}/${storedName?.data.id}/recipient-groups`
            );

            return response.data;
        }
    });
};

export const useCreateRecipientGroup = () => {
    return useMutation({
        mutationFn: async (data: RecipientGroup) => {
            const storedName = JSON.parse(
                localStorage.getItem('institutionTheme') ?? '{}'
            );

            const response = await axios.post(
                `${URIS.institutions.index}/${storedName?.data.id}/recipient-groups`,
                data
            );

            return response.data;
        },

        onSettled: () => {
            queryClient.invalidateQueries({ queryKey: ['recipient-groups'] });
        }
    });
};

export const useUpdateRecipientGroup = () => {
    return useMutation({
        mutationFn: async (data: RecipientGroup) => {
            const storedName = JSON.parse(
                localStorage.getItem('institutionTheme') ?? '{}'
            );

            const response = await axios.put(
                `${URIS.institutions.index}/${storedName?.data.id}/recipient-groups/${data.id}`,
                data
            );

            return response.data;
        },

        onSettled: () => {
            queryClient.invalidateQueries({ queryKey: ['recipient-groups'] });
        }
    });
};

export const useDeleteRecipientGroup = () => {
    return useMutation({
        mutationFn: async (id: string) => {
            const storedName = JSON.parse(
                localStorage.getItem('institutionTheme') ?? '{}'
            );

            const response = await axios.delete(
                `${URIS.institutions.index}/${storedName?.data.id}/recipient-groups/${id}`
            );

            return response.data;
        },

        onSettled: () => {
            queryClient.invalidateQueries({ queryKey: ['recipient-groups'] });
        }
    });
};

export const useInstitutionFees = () => {
    return useQuery({
        queryKey: ['institution-fees'],

        queryFn: async () => {
            const storedName = JSON.parse(
                localStorage.getItem('institutionTheme') ?? '{}'
            );

            const response = await axios.get<InstitutionFee[]>(
                `${URIS.institutions.index}/${storedName?.data.id}/institution-fees`
            );

            return response.data;
        }
    });
};

export const useCreateInstitutionFee = () => {
    return useMutation({
        mutationFn: async (data: InstitutionFee) => {
            const storedName = JSON.parse(
                localStorage.getItem('institutionTheme') ?? '{}'
            );

            const response = await axios.post(
                `${URIS.institutions.index}/${storedName?.data.id}/institution-fees`,
                data
            );

            return response.data;
        },

        onSettled: () => {
            queryClient.invalidateQueries({ queryKey: ['institution-fees'] });
        }
    });
};

export const useUpdateInstitutionFee = () => {
    return useMutation({
        mutationFn: async (data: InstitutionFee) => {
            const storedName = JSON.parse(
                localStorage.getItem('institutionTheme') ?? '{}'
            );

            const response = await axios.put(
                `${URIS.institutions.index}/${storedName?.data.id}/institution-fees/${data.id}`,
                data
            );

            return response.data;
        },

        onSettled: () => {
            queryClient.invalidateQueries({ queryKey: ['institution-fees'] });
        }
    });
};

export const useDeleteInstitutionFee = () => {
    return useMutation({
        mutationFn: async (id: string) => {
            const storedName = JSON.parse(
                localStorage.getItem('institutionTheme') ?? '{}'
            );

            const response = await axios.delete(
                `${URIS.institutions.index}/${storedName?.data.id}/institution-fees/${id}`
            );

            return response.data;
        },

        onSettled: () => {
            queryClient.invalidateQueries({ queryKey: ['institution-fees'] });
        }
    });
};

// Fix the organization tree function
export const useOrganizationTree = () => {
    return useQuery({
        queryKey: ['organization-tree'],

        queryFn: async () => {
            const storedName = JSON.parse(
                localStorage.getItem('institutionTheme') ?? '{}'
            );

            const response = await axios.get<Organization>(
                `${URIS.institutions.index}/${storedName?.data.id}/organization-structure`
            );

            const flattendOrgTree = flattenOrganizationTree(response.data);

            return flattendOrgTree;
        }
    });
};
