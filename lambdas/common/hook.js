import { useHooks, logEvent, parseEvent, handleUnexpectedError } from 'lambda-hooks';

export const withHooks = useHooks({
    before: [
        logEvent, 
        parseEvent        
    ],
    onError: [handleUnexpectedError]
});

export const hooksWithValidation = ({ bodySchema, pathSchema }) => {
    return useHooks({
        before: [ logEvent, parseEvent , validateEventBody, validatePaths],
        onError: [handleUnexpectedError]
    }, 
    {
        bodySchema,
        pathSchema
    })
}

const validateEventBody = async state => {
    const { bodySchema } = state.config;

    if(!bodySchema) {
        throw Error('missing the required body schema');
    }

    try {
        const { event } = state;
        await bodySchema.validate(event.body, { strict: true });
    }catch (error) {
        console.log('yup validation error of event.body', error);
        state.exit = true;
        state.response = { statusCode: 400, body:  JSON.stringify({ error: error.message })}
    }
    return state;
}

const validatePaths = async state => {
    const { pathSchema } = state.config;

    if(!pathSchema) {
        throw Error('missing the required path schema');
    }

    try {
        const { event } = state;

        await pathSchema.validate(event.pathParameters, { strict: true });
    }catch (error) {
        console.log('yup validation error of path parameters', error);
        state.exit = true;
        state.response = { statusCode: 400, body:  JSON.stringify({ error: error.message })}
    }
    return state;
}
