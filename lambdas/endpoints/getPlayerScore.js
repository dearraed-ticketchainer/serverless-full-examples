import { _400, _200 } from '../common/API_Responses';
import { get } from '../common/Dynamo';
import { withHooks } from '../common/hook';

// eslint-disable-next-line no-undef
const tableName = process.env.tableName;

const main = async (event) => {
   
    if(!event.pathParameters.ID){
        //failed withoiut ID
        return _400({ message: 'missing the ID from the path'})
    }

    let ID = event.pathParameters.ID;
    
    const user = await get(ID, tableName)

    if(!user){
        return _400({ message: 'Failed to get user by ID' });
    }

    return _200({ user})

}

export const handler = withHooks(main)

