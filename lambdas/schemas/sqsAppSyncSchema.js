import { object, string } from 'yup';



export const createBodySchema = object().shape({
    messageId: string().required(),
    message: string().required()
});

