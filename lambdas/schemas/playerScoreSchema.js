import { object, string, number } from 'yup';



export const createBodySchema = object().shape({
    name: string().required(),
    score: number().required()
});

export const updateBodySchema = object().shape({
    score: number().required()
});


export const pathSchema = object().shape({
    ID: string().required()
});