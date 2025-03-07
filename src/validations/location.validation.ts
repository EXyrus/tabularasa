import { string } from 'yup';
export const locationValidation = (
    cityMessage = 'Please, enter a city.',
    stateMessage = 'Please, choose a state.',
    countryMessage = 'Please, choose a country.'
) => {
    return {
        city: string().required(cityMessage).label('City').nullable(),
        countryId: string().required(countryMessage),
        stateId: string().required(stateMessage)
    };
};
