import { _400, _200 } from '../common/API_Responses';
import { write } from '../common/Dynamo'
import { withHooks } from '../common/hook';


// eslint-disable-next-line no-undef
const tableName = process.env.sqsTableName;


const main = async (event) => {

    const { messageId, body } = event.Records[0];
    const dataMessage = await write({ messageId, message: body}, tableName);
    if(!dataMessage){
        return _400({ message: 'Failed to write user by ID' });
    }

    return _200(dataMessage)

}

export const handler = withHooks(main)