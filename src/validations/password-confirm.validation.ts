import { string, ref } from 'yup';

export const passwordConfirmValidation = (
    message = 'Password confirm is required'
) => {
    return string()
        .oneOf([ref('password')], 'Passwords must match')
        .required(message);
};
