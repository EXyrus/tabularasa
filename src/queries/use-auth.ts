
import { useState } from 'react';
import { useMutation, useQuery } from '@tanstack/react-query';
import {
    getLocalStorageItem,
    removeLocalStorageItem,
    setLocalStorageItem
} from '@/helpers/local-storage';
import { decodeTokenPayload, getTokenPayload } from '@/helpers/token';
import axios from '@/overrides/axios.override';
import { queryClient } from '@/overrides/react-query.override';
import type {
    AdminLoginResponse,
    EmployeeUserResponse,
    InstitutionLoginResponse,
    LoginCredentials,
    TokenResponse,
    User,
    UserRole,
    UserForgotPasswordRequest,
    UserResetPasswordRequest
} from '@/types';
import URIS from '@/queries/uris.json';

export const useTokenQuery = () => {
  return useQuery({
    queryKey: ['token'],
    queryFn: async (): Promise<TokenResponse | null> => {
      const token = getLocalStorageItem('token');

      if (!token) {
        return null;
      }

      const loginLocation = window.location.pathname.split('/')[1] as
        | 'vendor'
        | 'institution'
        | 'student';

      const tokenURIs = {
        vendor: URIS.users.token,
        institution: URIS.employees.token,
        student: URIS.students.token,
      };

      const tokenURI = tokenURIs[loginLocation] || URIS.token;

      const response = await axios.get<TokenResponse>(tokenURI);

      // const tokenPayload = getTokenPayload(response.data.payload);

      return response.data;
    },
    retry: false,
  });
};

const csrf = async () => {
  await axios.get('/sanctum/csrf-cookie');
};

export const useLogin = () => {
  const [user, setUser] = useState<User | EmployeeUserResponse | null>();
  const [userRole, setUserRole] = useState<UserRole>();

  const loginMutation = useMutation<User, Error, LoginCredentials>({
    mutationFn: async credentials => {
      await csrf();

      const response = await axios.post<AdminLoginResponse>(URIS.login, credentials);

      const { user, payload } = response.data;

      const token = getTokenPayload(payload)?.token;

      if (token) {
        setLocalStorageItem('token', token);
        setLocalStorageItem('tokenRegistered', Date.now().toString());
      }

      if (user) {
        setUser(user);
        setUserRole(user.role);

        removeLocalStorageItem('subdomain');
      }

      return user;
    },
    onSuccess: data => {
      setLocalStorageItem('appType', 'vendor');
      queryClient.setQueryData(['user'], data);
    },
  });

  const login = async (credentials: LoginCredentials) => {
    await loginMutation.mutateAsync(credentials);
  };

  return { login, user, userRole };
};

export const useInstitutionLogin = () => {
  const [user, setUser] = useState<User | EmployeeUserResponse | null>();

  const institutionLoginMutation = useMutation<
    InstitutionLoginResponse,
    Error,
    { url: string; credentials: LoginCredentials }
  >({
    mutationFn: async ({ url, credentials }) => {
      const LOGIN_URL = `${URIS.index}${url}`;

      await csrf();

      const response = await axios.post<InstitutionLoginResponse>(LOGIN_URL, credentials);

      const { user, payload } = response.data;

      const token = getTokenPayload(payload)?.token;

      if (token) {
        setLocalStorageItem('token', token);
        setLocalStorageItem('tokenRegistered', Date.now().toString());
      }

      if (user) {
        setUser(user);
      }

      return response.data;
    },

    onSuccess: data => {
      if (data) {
        const token = decodeTokenPayload(data?.payload)?.token;

        if (token) {
            setLocalStorageItem('token', token);
            setLocalStorageItem('appType', 'institution');
            setLocalStorageItem('tokenRegistered', Date.now().toString());
        }

        queryClient.setQueryData(['user'], data.user);
      }
    },
  });

  const institutionLogin = async (url: string, credentials: LoginCredentials) => {
    await institutionLoginMutation.mutateAsync({ url, credentials });
  };

  return { user, institutionLogin };
};

export const useLogout = () => {
  const logoutMutation = useMutation<void, Error, void>({
    mutationFn: async () => {
      await csrf();
      const response = await axios.post(URIS.logout);

      return response.data;
    },
    onSuccess: () => {
      const token = getLocalStorageItem('token');

      if (token) {
        removeLocalStorageItem('token');
        removeLocalStorageItem('appType');
        removeLocalStorageItem('tokenRegistered');
      }

      queryClient.invalidateQueries({
        queryKey: ['user'],
      });
    },
  });

  const logout = async () => {
    await logoutMutation.mutateAsync();
  };

  return { logout };
};

export const useUpdatePasswordMutation = () => {
  const updatePasswordMutation = useMutation<void, Error, UserResetPasswordRequest>({
    mutationFn: async variables => {
      const response = await axios.post(`${URIS.users.password.reset}`, variables);

      return response.data;
    },
  });

  const updatePassword = async (variables: UserResetPasswordRequest) => {
    await updatePasswordMutation.mutateAsync(variables);
  };

  return { updatePassword };
};

export const useForgotPassword = () => {
  const forgotPasswordMutation = useMutation<void, Error, UserForgotPasswordRequest>({
    mutationFn: async (data: UserForgotPasswordRequest) => {
      const response = await axios.post(URIS.users.password.forgot, data);

      return response.data;
    },
  });

  const forgotPassword = async (variables: UserForgotPasswordRequest) => {
    await forgotPasswordMutation.mutateAsync(variables);
  };

  return { forgotPassword };
};
