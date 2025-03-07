import { string } from 'yup';
export const emailValidation = (message = 'Email is required') => {
    return string().email().required(message);
};
