import { CognitoIdentityProviderClient, AdminRespondToAuthChallengeCommand } from "@aws-sdk/client-cognito-identity-provider"; // ES Modules import

const client = new CognitoIdentityProviderClient();
// eslint-disable-next-line no-undef
const UserPoolId = 'us-east-1_yDFiU8fRq';
const userPoolClientId = '62q267sv858igc4t7pjh46eeo8';




export async function handler(event, context) {
    console.log("event : ", event);
    const { username, password, session } = event.arguments;
    const input = { // AdminSetUserPasswordRequest
      UserPoolId, // required
      ClientId: userPoolClientId, // required
      ChallengeName: "NEW_PASSWORD_REQUIRED", // required
      ChallengeResponses: { // ChallengeResponsesType
        NEW_PASSWORD: password,
        USERNAME: username
      },
      Session : session

    }
    try{ 
      const command = new AdminRespondToAuthChallengeCommand(input);
      const response = await client.send(command);
      console.log("Response : ", response);
      const { AccessToken, RefreshToken } = response.AuthenticationResult;
      return { username , msg: "Password updated successfuly", AccessToken, RefreshToken}
    
    } catch (error) {
      throw Error(error)
    }
  }