import { useMutation, useQuery } from '@tanstack/react-query';
import type { AxiosError } from 'axios';
import {axios} from '@/overrides';
import type { Institution, Module, ModulePayload } from '@/types';
import type { FetchResponseError } from '@/types/fetch';
import URIS from './uris.json';

export const useModules = () => {
    return useQuery({
        queryKey: ['modules'],

        queryFn: async () => {
            const response = await axios.get<Module[]>(`${URIS.modules}`);

            return response.data;
        }
    });
};

export const useInstitutionModules = () => {
    const institution = JSON.parse(
        localStorage.getItem('institutionTheme') ?? '{}'
    );

    return useQuery({
        queryKey: ['modules', institution.data.id],

        queryFn: async () => {
            const response = await axios.get<Module[]>(
                `${URIS.institutions.index}/${institution.data.id}/modules`
            );

            return response.data;
        }
    });
};

export const useUpdateInstitutionModules = () => {
    return useMutation<
        Institution,
        AxiosError<FetchResponseError>,
        ModulePayload
    >({
        mutationFn: async (variables: ModulePayload) => {
            const response = await axios.post<Institution>(
                `${URIS.modules}/manage-institution`,
                variables
            );

            return response.data;
        }
    });
};
