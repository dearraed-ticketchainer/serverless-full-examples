const Responses = require('../common/API_Responses');

module.exports.handler = async (event) => {
    console.log("get user log")
    console.log('event', event);
    if(!event.pathParameters || !event.pathParameters.ID){
        //failed withoiut ID
        return Responses._400({ message: 'missing the ID from the path'})
    }

    let ID = event.pathParameters.ID;

    if(data[ID]) {
        //return data
        return Responses._200(data[ID]);
    }

    return Responses._400({ message: 'no ID in data'});

     
}

const data = {
    1234: { name: "Raed Besbes", age: 25, job: 'journalist' },
    7893: { name: "Chris Smith", age: 52, job: 'teacher' },
    5132: { name: "Tom Hague", age: 25, job: 'plasterer' }
}