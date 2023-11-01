import { SES as _SES } from 'aws-sdk';
import { _200, _400 } from '../common/API_Responses';

const SES = new _SES();

export async function handler(event) {
    console.log('event', event);

    const message = `Hey Sam
    
Don't forget to film next weeks serverless video`;

    const params = {
        Destination: {
            ToAddresses: ['raed.besbes@ticketchainer.com'],
        },
        Message: {
            Body: {
                Text: { Data: message },
            },
            Subject: { Data: 'reminder email' },
        },
        Source: 'raed.besbes@ticketchainer.com',
    };

    try {
        await SES.sendEmail(params).promise();
        return _200({ message: 'email sent' });
    } catch (error) {
        console.log('error', error);
        return _400({ message: 'failed to send the email' });
    }
}