import * as yup from 'yup';

const phoneNumberSchema = yup
    .string()
    .matches(
        /^[+]\d{1,3}[-\s]?\d{3,}$/,
        'Please enter a valid international phone number.'
    );

export const validatePhoneNumber = async (_: unknown, value: string) => {
    try {
        await phoneNumberSchema.validate(value);

        return Promise.resolve();
    } catch (err: unknown) {
        return Promise.reject((err as { errors: unknown[] }).errors[0]);
    }
};
