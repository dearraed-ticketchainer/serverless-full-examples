import { CognitoIdentityProviderClient, AdminCreateUserCommand } from "@aws-sdk/client-cognito-identity-provider"; // ES Modules import
import { write } from '../common/Dynamo'
import { addUserToGroup } from '../../cognitoFunctions/addUserToGroup';
import { format } from "date-fns";

const client = new CognitoIdentityProviderClient();


// eslint-disable-next-line no-undef
const tableName = process.env.raedDynamoDBTableCognito;
const UserPoolId = 'us-east-1_yDFiU8fRq';

export async function handler(event, context) {
  console.log("event : ", event);
  console.log("context : ", context);
  const { email, password, group } = event.arguments; // You'll pass these values from the AppSync mutation

  if(!['Admins', 'Users'].includes(group)){
    throw Error("Should be Admins or Users");
  }

  const input = {
    UserPoolId, // Replace with your actual User Pool ID
    Username: email,
    TemporaryPassword: password,
    UserAttributes: [
      {
        Name: 'email',
        Value: email,
      }
    ],
  };

  try {
    const command = new AdminCreateUserCommand(input);
    const response = await client.send(command);

    console.log("response : ", response);
    console.log("Attributes : ", response.User.Attributes);

    const { UserCreateDate, UserStatus: userStatus } = response.User;

    

    const addedToGroup = await addUserToGroup({ UserPoolId, Username: email, GroupName: group });
    console.log("addedToGroup : ", addedToGroup);

    const createdAt = format(UserCreateDate, 'MM/dd/yyyy HH:mm:ss')
    const data = { email, group, createdAt, userStatus };
    console.log("data : ", data);
    const newUser = await write(data, tableName);

    if(!newUser){
      throw Error ('Failed to write user by ID');
  }    
    
    console.log("createdAt : ", createdAt);
    return { email: email, group, userStatus, createdAt }
  } catch (error) {
    throw Error(error);
  }
}