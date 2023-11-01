import { _400, _200 } from '../common/API_Responses';
import { write } from '../common/Dynamo'
import { hooksWithValidation } from '../common/hook';
import { createBodySchema as bodySchema, pathSchema } from '../schemas/playerScoreSchema';


// eslint-disable-next-line no-undef
const tableName = process.env.tableName;


const main = async (event) => {

    let ID = event.pathParameters.ID;
    const user = event.body;
    user.ID = ID;

    const newUser = await write(user, tableName);
    if(!newUser){
        return _400({ message: 'Failed to write user by ID' });
    }

    return _200({ newUser })

}

export const handler = hooksWithValidation({ bodySchema, pathSchema })(main)