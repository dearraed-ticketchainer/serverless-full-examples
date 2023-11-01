import { _400, _200 } from '../common/API_Responses';
import { query } from '../common/Dynamo';
import { withHooks } from '../common/hook';

// eslint-disable-next-line no-undef
const tableName = process.env.tableName;

const main = async (event) => {
   
    if(!event.pathParameters.game){
        //failed withoiut game
        return _400({ message: 'missing the game from the path'})
    }

    const game = event.pathParameters.game;
    console.log("game param : ", game);
    
    const gamePlayers = await query({ 
        tableName,
        index:'game-index',
        queryKey: 'game',
        queryValue: game
    })

    if(!gamePlayers){
        return _400({ message: 'Failed to get user by ID' });
    }
 
    return _200(gamePlayers)

}

export const handler = withHooks(main)

