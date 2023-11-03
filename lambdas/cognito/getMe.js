import { CognitoIdentityProviderClient, GetUserCommand } from "@aws-sdk/client-cognito-identity-provider"; // ES Modules import
import { getByObj } from "../common/Dynamo";

const client = new CognitoIdentityProviderClient();
// eslint-disable-next-line no-undef
const tableName = process.env.raedDynamoDBTableCognito;


export async function handler(event, context) {
    console.log("event : ", event);
    const { accessToken } = event.arguments;
    const input = { // GetUserRequest
        AccessToken: accessToken, // required
      };
      try{

      const command = new GetUserCommand(input);
      const response = await client.send(command);
      console.log('response : ', response);
        const { UserAttributes, Username } = response;
        const email = UserAttributes.find(x => x.Name == 'email')['Value'];
        console.log("email : ", email);
        const userDynamo = await getByObj({ email: email }, tableName);
        const { group, createdAt, userStatus } = userDynamo;

        console.log("UserAttributes : ", UserAttributes);
        console.log(group, createdAt, userStatus);

        return { username: Username, email: email, UserAttributes, groupInDynamo: group, createdAt, UserStatus: userStatus }
    
        // You can use the obtained tokens as needed
    } catch (error) {
      throw Error(error)
    }
  }