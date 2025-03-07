import { number } from 'yup';
export const phoneNumberValidation = (message = 'Phone number is required') => {
    return number().min(9, 'Phone number must be a min. of ').required(message);
};
