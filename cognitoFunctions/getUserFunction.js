const AWS = require('aws-sdk');
const dynamodb = new AWS.DynamoDB.DocumentClient();

exports.handler = async (event) => {
  const userId = event.identity.sub; // Cognito user's unique identifier

  const params = {
    TableName: 'UserTable', // Your DynamoDB table name
    Key: {
      id: userId,
    },
  };

  try {
    const data = await dynamodb.get(params).promise();
    return data.Item;
  } catch (error) {
    console.error('Error fetching user data:', error);
    return null;
  }
};