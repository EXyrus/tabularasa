import type { FormikErrors } from 'formik';
import type { ServerErrors } from 'types/fetch';

const mapServerErrorsToFormikErrors = <T>(
    errors: ServerErrors
): FormikErrors<T> => {
    return Object.keys(errors).reduce((result, field) => {
        return {
            ...result,
            [field]: errors[field][0]
        };
    }, {});
};

export const checkServerErrors = <T>(
    errors: ServerErrors,
    onError: (errors: FormikErrors<T>) => void
) => {
    if (errors) {
        const formikErrors = mapServerErrorsToFormikErrors<T>(errors);

        if (Object.keys(formikErrors).length) {
            onError(formikErrors);
        }
    }
};
