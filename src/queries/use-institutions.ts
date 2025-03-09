
import type { UseMutationOptions } from '@tanstack/react-query';
import { useMutation, useQuery } from '@tanstack/react-query';
import type { AxiosError } from 'axios';
import axios from '@/overrides/axios.override';
import { queryClient } from '@/overrides/react-query.override';
import type {
    CreateInstitutionDetailsPayload,
    Institution,
    InstitutionDetailsPayload,
    InstitutionResponse,
    InstitutionStatusPayload,
    InstitutionTheme,
    InstitutionsResponse,
    InstitutionSettingsPayload
} from '@/types';
import type { BankAccount, BankAccountResponse } from '@/types/bank-account';
import type { FetchResponseError } from '@/types/fetch';
import URIS from './uris.json';

export const useSignupRequest = () => {
    return useMutation({
        mutationFn: async (variables: {
            fullNmae: string;
            email: string;
            institionName: string;
        }) => {
            const response = await axios.post(URIS.request, variables);

            return await response.data;
        }
    });
};

export const useInstitutions = () => {
    return useQuery({
        queryKey: ['get_institutions'],

        queryFn: async () => {
            const response = await axios.get<InstitutionResponse>(
                URIS.institutions.index
            );

            return response.data;
        }
    });
};

export const useInstitutionDetails = (id: string) => {
    return useQuery({
        queryKey: ['institution_details', id],

        queryFn: async () => {
            const response = await axios.get<Institution>(
                `${URIS.institutions.index}/${id}`
            );

            return response.data;
        }
    });
};

export const useInstitutionTheme = (slug: string, enabled: boolean) => {
    return useQuery({
        queryKey: ['institutionTheme', slug],

        queryFn: async () => {
            const url = `${URIS.index}/${slug}/theme`;
            const response = await axios.get<InstitutionTheme>(url);

            localStorage.setItem('institutionTheme', JSON.stringify(response));
            localStorage.setItem('subdomain', slug);

            return response.data;
        },

        enabled
    });
};

export const useUpdateInstitutionSettings = () => {
    return useMutation<
        Institution,
        AxiosError<FetchResponseError>,
        InstitutionSettingsPayload
    >({
        mutationFn: async (variables: InstitutionSettingsPayload) => {
            const formData = new FormData();

            formData.append('id', variables.id?.toString() ?? '');
            formData.append('color', variables.color ?? '');
            formData.append('slug', variables.slug ?? '');

            if (variables.logo) {
                formData.append('logo', variables.logo);
            }

            const config = {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            };

            const response = await axios.post<Institution>(
                `${URIS.institutions.index}/${variables.id}/customize`,
                formData,
                config
            );

            return response.data;
        }
    });
};

export const useCreateInstitution = () => {
    return useMutation<
        CreateInstitutionDetailsPayload,
        AxiosError<FetchResponseError>,
        CreateInstitutionDetailsPayload
    >({
        mutationFn: async (variables: CreateInstitutionDetailsPayload) => {
            const response = await axios.post<CreateInstitutionDetailsPayload>(
                `${URIS.institutions.index}`,
                variables
            );

            return response.data;
        }
    });
};

export const useDeleteInstitution = (
    options?: UseMutationOptions<
        Institution,
        AxiosError<FetchResponseError>,
        InstitutionStatusPayload
    >
) => {
    return useMutation({
        ...options,
        mutationFn: async (variables: InstitutionStatusPayload) => {
            const response = await axios.delete<Institution>(
                `${URIS.institutions.index}/${variables.id}`
            );

            return response.data;
        }
    });
};

export const useInstitutionStatistics = () => {
    return useQuery({
        queryKey: ['institutions_statistics'],

        queryFn: async () => {
            const response = await axios.get<InstitutionsResponse>(
                URIS.institutions.stats
            );

            return response.data;
        }
    });
};

export const useUpdateInstitutionDetails = () => {
    return useMutation<
        Institution,
        AxiosError<FetchResponseError>,
        InstitutionDetailsPayload
    >({
        mutationFn: async variables => {
            const response = await axios.put<Institution>(
                `${URIS.institutions.index}/${variables.id}/update-details`,
                variables
            );

            return response.data;
        }
    });
};

export const useUpdateInstitutionStatus = () => {
    return useMutation<
        Institution,
        AxiosError<FetchResponseError>,
        InstitutionStatusPayload
    >({
        mutationFn: async (variables: InstitutionStatusPayload) => {
            const response = await axios.put<Institution>(
                `${URIS.institutions.index}/${variables.id}/update-status`,
                variables
            );

            return response.data;
        },

        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ['institution_details']
            });
        }
    });
};

export const useEditInstitutionRoles = () => {
    const institution = JSON.parse(
        localStorage.getItem('institutionTheme') ?? '{}'
    );

    const editRoleMutation = useMutation({
        mutationFn: async (params: { roleId: string; newName: string }) => {
            const { roleId, newName } = params;

            await axios.patch(
                `${URIS.institutions.index}/${institution.data.id}/roles/${roleId}`,
                { newName }
            );
        },

        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ['roles']
            });
        }
    });

    const deleteRoleMutation = useMutation({
        mutationFn: async (roleId: string) => {
            await axios.delete(
                `${URIS.institutions.index}/${institution.data.id}/roles/${roleId}`
            );
        },

        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ['roles']
            });
        }
    });

    const editRole = async (roleId: string, newName: string) => {
        await editRoleMutation.mutateAsync({ roleId, newName });
    };

    const deleteRole = async (roleId: string) => {
        await deleteRoleMutation.mutateAsync(roleId);
    };

    return { editRole, deleteRole };
};

export const useAddRolePermissions = () => {
    const institution = JSON.parse(
        localStorage.getItem('institutionTheme') ?? '{}'
    );

    const addPermissionToRoleMutation = useMutation({
        mutationFn: async (params: {
            roleId: string;
            permissionIds: string[];
        }) => {
            const { roleId, permissionIds } = params;

            await axios.post(
                `${URIS.institutions.index}/${institution.data.id}/roles/${roleId}/add-role-permissions`,
                { permissionIds: permissionIds }
            );
        },

        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ['roles']
            });
            queryClient.invalidateQueries({
                queryKey: ['permissions']
            });
        }
    });

    const addPermissions = async (roleId: string, permissionIds: string[]) => {
        await addPermissionToRoleMutation.mutateAsync({
            roleId,
            permissionIds
        });
    };

    return { addPermissions };
};

export const useActivateInstitution = () => {
    return useMutation({
        mutationFn: async (variables: { userId: string; token: string }) => {
            await axios.post(`${URIS.institutions.index}/activate`, variables);
        }
    });
};

export const useGetBankAccounts = () => {
    const institution = JSON.parse(
        localStorage.getItem('institutionTheme') ?? '{}'
    );

    return useQuery({
        queryKey: ['bank_accounts', institution.data.id],
        queryFn: async () => {
            const response = await axios.get<BankAccountResponse[]>(
                `${URIS.institutions.index}/${institution.data.id}/bank-accounts`
            );

            return response.data;
        }
    });
};

export const useAddBankAccount = () => {
    const institution = JSON.parse(
        localStorage.getItem('institutionTheme') ?? '{}'
    );

    return useMutation({
        mutationFn: async (variables: {
            bank: string;
            accountNumber: string;
            accountName: string;
            accountType: string;
            password: string;
        }) => {
            const response = await axios.post<
                BankAccount & { password: string }
            >(
                `${URIS.institutions.index}/${institution.data.id}/bank-accounts`,
                variables
            );

            return response.data;
        }
    });
};

export const useUpdateBankAccount = () => {
    const institution = JSON.parse(
        localStorage.getItem('institutionTheme') ?? '{}'
    );

    return useMutation({
        mutationFn: async (variables: {
            id: string;
            bank: string;
            accountNumber: string;
            accountName: string;
            accountType: string;
        }) => {
            const response = await axios.put<BankAccount>(
                `${URIS.institutions.index}/${institution.data.id}/bank-accounts/${variables.id}`,
                variables
            );

            return response.data;
        }
    });
};

export const useDeleteBankAccount = () => {
    const institution = JSON.parse(
        localStorage.getItem('institutionTheme') ?? '{}'
    );

    return useMutation({
        mutationFn: async (bankAccountId: string) => {
            await axios.delete(
                `${URIS.institutions.index}/${institution.data.id}/bank-accounts/${bankAccountId}`
            );
        }
    });
};

