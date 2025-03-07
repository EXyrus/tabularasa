import { useMutation, useQuery } from '@tanstack/react-query';
import axios from 'overrides/axios';
import { queryClient } from 'overrides/react-query';
import type {
    Student,
    StudentDashboardResponse,
    StudentData,
    SuspensionData
} from 'types';
import URIS from './uris.json';

export const useStudentDashboard = () => {
    const institution = JSON.parse(
        localStorage.getItem('institutionTheme') ?? '{}'
    );

    return useQuery({
        queryKey: ['students-dashboard', institution.data.id],

        queryFn: async () => {
            const response = await axios.get<StudentDashboardResponse>(
                `${URIS.institutions.index}/${institution.data.id}/stats/students`
            );

            return response.data;
        }
    });
};

export const useStudents = () => {
    const institution = JSON.parse(
        localStorage.getItem('institutionTheme') ?? '{}'
    );

    return useQuery({
        queryKey: ['students', institution.data.id],

        queryFn: async () => {
            const response = await axios.get<Student[]>(
                `${URIS.institutions.index}/${institution.data.id}/students`
            );

            return response.data;
        }
    });
};

export const useStudent = (id: string) => {
    const institution = JSON.parse(
        localStorage.getItem('institutionTheme') ?? '{}'
    );

    return useQuery({
        queryKey: ['student', institution.data.id, id],

        // Include id in the query key
        queryFn: async () => {
            const response = await axios.get<Student>(
                `${URIS.institutions.index}/${institution.data.id}/students/${id}`
            );

            return response.data;
        }
    });
};

export const useGenerateRegNumber = () => {
    const institution = JSON.parse(
        localStorage.getItem('institutionTheme') ?? '{}'
    );

    return useQuery({
        queryKey: ['registration-number', institution.data.id],

        queryFn: async () => {
            const response = await axios.get(
                `${URIS.institutions.index}/${institution.data.id}/students/generate-registration-number`
            );

            return response.data as string;
        }
    });
};

export const useCreateStudent = () => {
    const institution = JSON.parse(
        localStorage.getItem('institutionTheme') ?? '{}'
    );

    return useMutation({
        mutationFn: async (variables: StudentData) => {
            const response = await axios.post(
                `${URIS.institutions.index}/${institution.data.id}/students`,
                variables
            );

            return response.data;
        },

        onSettled: () => {
            queryClient.invalidateQueries({
                queryKey: ['students']
            });
        }
    });
};

export const useSuspendStudent = () => {
    const institution = JSON.parse(
        localStorage.getItem('institutionTheme') ?? '{}'
    );

    return useMutation({
        // invalidate the students query
        mutationFn: async (variables: SuspensionData) => {
            const response = await axios.post(
                `${URIS.institutions.index}/${institution.data.id}/students/${variables.studentId}/suspend`,
                variables
            );

            return response.data;
        },

        onSettled: () => {
            queryClient.invalidateQueries({
                queryKey: ['students']
            });
        }
    });
};

export const useTerminateStudent = () => {
    const institution = JSON.parse(
        localStorage.getItem('institutionTheme') ?? '{}'
    );

    return useMutation({
        mutationFn: async (variables: SuspensionData) => {
            const response = await axios.post(
                `${URIS.institutions.index}/${institution.data.id}/students/${variables.studentId}/terminate`
            );

            return response.data;
        }
    });
};
