import { notification } from 'antd';
import type { FormikErrors } from 'formik';
import { checkServerErrors } from 'helpers/check-server-errors';
import type { FetchResponseError } from 'types/fetch';
export const useOnError = <T>(onError: (errors: FormikErrors<T>) => void) => {
    return {
        onError: (error: FetchResponseError) => {
            checkServerErrors(error.errors!, onError);
            notification.error({ message: error.message });
        }
    };
};
