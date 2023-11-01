import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient, GetCommand, PutCommand, UpdateCommand, QueryCommand } from "@aws-sdk/lib-dynamodb";



const client = new DynamoDBClient();
const docClient = DynamoDBDocumentClient.from(client);


   export const get = async(ID, TableName) => {
        const command = new GetCommand({
            TableName,
            Key: {
                ID
            }
        });

        const data = await docClient.send(command);

        if(!data || !data.Item){
            throw Error(`There was an error fetching the data for ID of ${ID} from ${TableName}`)
        }

        console.log("data : ", data)

        return data.Item;
   }

   export const write = async (data, TableName) => {
    console.log("TableName: ", TableName);
        // if(!data.ID){
        //     throw Error('No ID on the data')
        // }

        const command = new PutCommand({
            TableName: TableName,
            Item: data
          });

        const res = await docClient.send(command);

        if(res.error) {
            throw Error(`There was an error inserting ID of ${data.ID} in table ${TableName}`)
        }

        console.log("res : ", res)

        return data;
   }

   export const update = async ({ tableName, primaryKey, primaryKeyValue, updateKey, updateValue }) => {
     const command = new UpdateCommand({
        TableName: tableName,
        Key: { [primaryKey]: primaryKeyValue },
        UpdateExpression: `set ${updateKey} = :updateValue`,
        ExpressionAttributeValues: {
            ':updateValue': updateValue
        },
        ReturnValues: "ALL_NEW"
     })
     const response = await docClient.send(command);
     console.log("response : ", response);
     return response
   }

   export const query = async ({ tableName, index, queryKey, queryValue }) => {
    const command = new QueryCommand({
        TableName: tableName,
        IndexName: index,
        KeyConditionExpression: `${queryKey} = :hkey`,
        ExpressionAttributeValues: {
        ':hkey': queryValue
      },
    });
  
    const response = await docClient.send(command);
    console.log("response : ", response);
    return response
  }
