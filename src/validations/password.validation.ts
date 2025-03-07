import { string } from 'yup';
export const passwordValidation = (message = 'Password is required') => {
    return string().min(6).required(message);
};
