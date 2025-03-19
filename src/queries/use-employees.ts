
import { useMutation, useQuery } from '@tanstack/react-query';
import type { AxiosError } from 'axios';
import { axios } from '@/overrides';
import type {
    AllEmployeeResponse,
    Employee,
    EmployeePayload,
    SingleEmployeeResponse
} from '@/types';
import type { FetchResponseError } from '@/types/fetch';
import URIS from './uris.json';

export const useEmployeesQuery = () => {
    return useQuery({
        queryKey: ['employees'],

        queryFn: async () => {
            const response = await axios.get<Employee[]>(URIS.employees.index);

            return response.data;
        }
    });
};

export const useSchoolEmployeeQuery = () => {
    return useQuery({
        queryKey: ['allEmployees'],

        queryFn: async () => {
            const institution = JSON.parse(
                localStorage.getItem('institutionTheme') ?? '{}'
            );

            const response = await axios.get<AllEmployeeResponse>(
                `${URIS.institutions.index}/${institution.data?.id}/employees`
            );

            return response.data;
        }
    });
};

export const useSchoolEmployeeDetailsQuery = (id: string) => {
    return useQuery({
        queryKey: ['employeeDetails', id],

        // Include id in the query key
        queryFn: async () => {
            const institution = JSON.parse(
                localStorage.getItem('institutionTheme') ?? '{}'
            );

            const response = await axios.get<SingleEmployeeResponse>(
                `${URIS.institutions.index}/${institution?.data.id}/employees/${id}`
            );

            return response.data;
        }
    });
};

export const useUpdateEmployeeMutation = () => {
    return useMutation<
        EmployeePayload,
        AxiosError<FetchResponseError>,
        EmployeePayload
    >({
        mutationFn: async (variables: EmployeePayload) => {
            const storedName = JSON.parse(
                localStorage.getItem('institutionTheme') ?? '{}'
            );

            const response = await axios.put<EmployeePayload>(
                `${URIS.institutions.index}/${storedName?.data.id}/employees/${variables.id}`,
                variables
            );

            return response.data;
        }
    });
};

export const useCreateEmployeeMutation = () => {
    return useMutation({
        mutationFn: async (data: unknown) => {
            const storedName = JSON.parse(
                localStorage.getItem('institutionTheme') ?? '{}'
            );
            const response = await axios.post<unknown>(
                `${URIS.institutions.index}/${storedName?.data.id}/employees`,
                data
            );

            return response.data;
        }
    });
};

export const useUpdateEmployeeRoleMutation = () => {
    const storedName = JSON.parse(
        localStorage.getItem('institutionTheme') ?? '{}'
    );

    return useMutation({
        mutationFn: async (values: {
            hasRole: boolean;
            roleId: string;
            employeeId: string;
        }) => {
            const route = values.hasRole
                ? 'remove-employee-role'
                : 'add-employee-role';

            const response = await axios.post(
                `${URIS.institutions.index}/${storedName?.data.id}/roles/${values.roleId}/${route}`,
                {
                    roleId: values.roleId,
                    employeeId: values.employeeId
                }
            );

            return response.data;
        }
    });
};

export const useAssignCustomPermissionMutation = () => {
    const storedName = JSON.parse(
        localStorage.getItem('institutionTheme') ?? '{}'
    );

    return useMutation({
        mutationFn: async (values: {
            name: string;
            description: string;
            employeeId: string;
        }) => {
            const response = await axios.post(
                `${URIS.institutions.index}/${storedName?.data.id}/roles/add-custom-permission`,
                values
            );

            return response.data;
        }
    });
};
