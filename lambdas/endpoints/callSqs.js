/* eslint-disable no-undef */
import { _200 } from '../common/API_Responses';
import { SendMessageCommand, SQSClient } from "@aws-sdk/client-sqs";
import { withHooks } from '../common/hook';
import { createBodySchema as bodySchema } from '../schemas/sqsAppSyncSchema';


const sqsQueueUrl = process.env.sqsQueueUrl
const client = new SQSClient({});


const main = async (event) => {
  
  const message = event.arguments.message;
  console.log("sqsQueueUrl :", sqsQueueUrl)
  const command = new SendMessageCommand({
    QueueUrl: sqsQueueUrl,
    DelaySeconds: 10,
    MessageAttributes: {
      Title: {
        DataType: "String",
        StringValue: "The Whistler",
      },
      Author: {
        DataType: "String",
        StringValue: "John Grisham",
      },
      WeeksOn: {
        DataType: "Number",
        StringValue: "6",
      },
    },
    MessageBody: message,
  });

  const response = await client.send(command);
  console.log("response : ", response);
  return { messageId :response.MessageId };
  };

  export const handler = withHooks(main)