import { _200 } from '../common/API_Responses';
import { update } from '../common/Dynamo';
import { hooksWithValidation } from '../common/hook';
import { updateBodySchema as bodySchema, pathSchema } from '../schemas/playerScoreSchema';


// eslint-disable-next-line no-undef
const tableName = process.env.tableName;


const main = async (event) => {

    let ID = event.pathParameters.ID;
    const { score } = event.body;
   

    const res = await update({ 
        tableName, 
        primaryKey: 'ID', 
        primaryKeyValue: ID, 
        updateKey: 'score', 
        updateValue: score
    });
  

    return _200(res)

}

export const handler = hooksWithValidation({ bodySchema, pathSchema })(main)