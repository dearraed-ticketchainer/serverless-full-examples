import { CognitoIdentityProviderClient, AdminAddUserToGroupCommand } from "@aws-sdk/client-cognito-identity-provider"; // ES Modules import

const client = new CognitoIdentityProviderClient();
export const addUserToGroup = async ({ UserPoolId, Username, GroupName }) => {
    const input = { // AdminAddUserToGroupRequest
        UserPoolId, // required
        Username, // required
        GroupName, // required
      };
      const command = new AdminAddUserToGroupCommand(input);
      const response = await client.send(command);
      return response;
}
