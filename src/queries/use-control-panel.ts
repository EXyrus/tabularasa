import { useMutation, useQuery } from '@tanstack/react-query';
import type { AxiosError } from 'axios';
import axios from 'overrides/axios';
import { queryClient } from 'overrides/react-query';
import type {
    InstitutionFee,
    InstitutionRole,
    InstitutionRolePayload,
    Organization,
    Role
} from 'types';
import type { FetchResponseError } from 'types/fetch';
import { flattenOrgTree } from 'helpers/flatten-organization-tree';
import URIS from './uris.json';

export const useInstitutionRoles = () => {
    const institution = JSON.parse(
        localStorage.getItem('institutionTheme') ?? '{}'
    );

    return useQuery({
        queryKey: ['roles', institution.data.id],

        queryFn: async () => {
            const response = await axios.get<Role[]>(
                `${URIS.institutions.index}/${institution.data.id}/roles`
            );

            return response.data;
        }
    });
};

export const useCreateInstitutionRole = () => {
    const institution = JSON.parse(
        localStorage.getItem('institutionTheme') ?? '{}'
    );

    return useMutation({
        mutationFn: async (variables: InstitutionRolePayload) => {
            const response = await axios.post<InstitutionRole>(
                `${URIS.institutions.index}/${institution.data?.id}/roles/save`,
                variables
            );

            return response.data;
        },

        onSettled: () => {
            queryClient.invalidateQueries({
                queryKey: ['roles']
            });
        }
    });
};

export const useGetInstitutionStructure = () => {
    const institution = JSON.parse(
        localStorage.getItem('institutionTheme') ?? '{}'
    );

    return useQuery({
        queryKey: ['structure', institution.data.id],

        queryFn: async () => {
            const response = await axios.get(
                `${URIS.institutions.index}/${institution.data.id}/structure`
            );

            return response.data as Organization[];
        }
    });
};

export const useUpdateInstitutionStructure = () => {
    const institution = JSON.parse(
        localStorage.getItem('institutionTheme') ?? '{}'
    );

    return useMutation({
        mutationFn: async (params: Organization) => {
            const flattendOrgTree = flattenOrgTree(params);
            const response = await axios.post<Organization[]>(
                `${URIS.institutions.index}/${institution.data.id}/structure`,
                flattendOrgTree
            );

            return response.data;
        },

        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ['institution']
            });
            queryClient.invalidateQueries({
                queryKey: ['structure']
            });
        }
    });
};

export const useDeleteStructure = () => {
    const institution = JSON.parse(
        localStorage.getItem('institutionTheme') ?? '{}'
    );

    const deleteOrganizationMutation = useMutation({
        mutationFn: async (organizationId: number) => {
            const response = await axios.delete(
                `${URIS.institutions.index}/${institution.data.id}/structure/${organizationId}`
            );

            return response.data;
        },

        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ['institution']
            });
            queryClient.invalidateQueries({
                queryKey: ['organizations']
            });
        }
    });

    return {
        deleteOrganization: deleteOrganizationMutation.mutateAsync
    };
};

export const useInstitutionFees = () => {
    const institution = JSON.parse(
        localStorage.getItem('institutionTheme') ?? '{}'
    );

    return useQuery({
        queryKey: ['fees', institution.data.id],

        queryFn: async () => {
            const response = await axios.get<InstitutionFee[]>(
                `${URIS.institutions.index}/${institution.data.id}/fees`
            );

            return response.data;
        }
    });
};

export const useCreateInstitutionFee = () => {
    const institution = JSON.parse(
        localStorage.getItem('institutionTheme') ?? '{}'
    );

    return useMutation({
        mutationFn: async (variables: Omit<InstitutionFee, 'id'>) => {
            const response = await axios.post(
                `${URIS.institutions.index}/${institution.data?.id}/fees`,
                variables
            );

            return response.data;
        },

        onSettled: () => {
            queryClient.invalidateQueries({
                queryKey: ['fees']
            });
        }
    });
};

export const useEditInstitutionFees = () => {
    const institution = JSON.parse(
        localStorage.getItem('institutionTheme') ?? '{}'
    );

    const editFeeMutation = useMutation<
        InstitutionRole,
        AxiosError<FetchResponseError>,
        { id: string; newName: string }
    >({
        mutationFn: async params => {
            const { id, newName } = params;

            const response = await axios.patch<InstitutionRole>(
                `${URIS.institutions.index}/${institution.data.id}/fees/${id}`,
                { newName }
            );

            return response.data;
        },

        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ['fees']
            });
        }
    });

    const deleteFeeMutation = useMutation({
        mutationFn: async (roleId: string) => {
            await axios.delete(
                `${URIS.institutions.index}/${institution.data.id}/fees/${roleId}`
            );
        },

        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ['fees']
            });
        }
    });

    const editFee = async (id: string, newName: string) => {
        await editFeeMutation.mutateAsync({ id, newName });
    };

    const deleteFee = async (id: string) => {
        await deleteFeeMutation.mutateAsync(id);
    };

    return { editFee, deleteFee };
};
