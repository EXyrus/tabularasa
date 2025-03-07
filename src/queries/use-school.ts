import { useQuery } from '@tanstack/react-query';
import axios from 'overrides/axios';
import type { SchoolResponse } from 'types';
import URIS from './uris.json';

type Props = {
    name: string;
    email?: string;
    phone?: string;
    attendant?: string;
    payment_method?: string;
    method?: string;
    class_method?: string;
    logoUrl?: string;
    color?: string;
    slug?: string;
};

export const useSchoolDetail = () => {
    return useQuery({
        queryKey: ['items'],

        queryFn: async () => {
            const response = await axios.get<Props>(URIS.theme);

            return response.data;
        }
    });
};

export const useSchoolStatistics = () => {
    return useQuery({
        queryKey: ['Schools_statistics'],

        queryFn: async () => {
            const storedName = JSON.parse(
                localStorage.getItem('institutionTheme') ?? '{}'
            );

            const response = await axios.get<SchoolResponse>(
                `${URIS.institutions.index}/${storedName?.data?.id}/stats`
            );

            return response.data;
        }
    });
};
