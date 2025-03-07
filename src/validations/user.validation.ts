import { string } from 'yup';
// import type { User } from 'types';
import { emailValidation } from './email.validation';
import { phoneNumberValidation } from './phone-number.validation';
import { passwordValidation } from './password.validation';
import { passwordConfirmValidation } from './password-confirm.validation';

// const userTypes: Extract<User, 'student' | 'employee' | 'guardian' | 'user'>[] = [
//     'student',
//     'employee',
//     'guardian',
//     'user'
// ];
const genders = ['male', 'female'];

export const userValidation = () => {
    return {
        email: emailValidation(),
        firstName: string().required('Given Name is required'),
        lastName: string().required('Family Name is required'),
        password: passwordValidation(),
        passwordConfirm: passwordConfirmValidation(),
        phoneNumber: phoneNumberValidation(),
        // type: string()
        //     .oneOf(userTypes)
        //     .required('Please select an account type'),
        gender: string().oneOf(genders).required('Please select a gender')
    };
};
