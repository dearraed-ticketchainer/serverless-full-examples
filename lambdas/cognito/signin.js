import { CognitoIdentityProviderClient, InitiateAuthCommand } from "@aws-sdk/client-cognito-identity-provider"; // ES Modules import
const client = new CognitoIdentityProviderClient();


const userPoolClientId = '62q267sv858igc4t7pjh46eeo8';

export async function handler(event, context) {
    console.log("event : ", event);
    const { username, password } = event.arguments;
    const input = { // InitiateAuthRequest
      AuthFlow: "USER_PASSWORD_AUTH", // required
      AuthParameters: { // AuthParametersType
        USERNAME: username,
        PASSWORD : password
      },
      ClientMetadata: { // ClientMetadataType
        metaData: "Test meta data",
      },
      ClientId: userPoolClientId, // required
    };
    try{
        const command = new InitiateAuthCommand(input);
        const response = await client.send(command);
        console.log("response : ", response);
      if(response.AuthenticationResult){
        const { AccessToken, RefreshToken, IdToken} = response.AuthenticationResult;
        
        return { AccessToken, RefreshToken, IdToken, email: username, username }
      }else {
        const { ChallengeName, Session } = response;
        return { ChallengeName, Session }
      }
       
    
        // You can use the obtained tokens as needed
    } catch (error) {
      throw Error(error)
    }
  }