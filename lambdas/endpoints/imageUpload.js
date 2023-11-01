/* eslint-disable no-undef */
import { _200, _400 } from '../common/API_Responses';
import { fileTypeFromBuffer } from 'file-type'
import { Buffer } from 'node:buffer';
import { v4 as uuid } from 'uuid';
import * as AWS from 'aws-sdk';

const s3 = new AWS.S3()

const bucketName = process.env.imageUploadBucket;

const allowedMimes = ['image/jpeg', 'image/png', 'image/jpg']

export const handler = async event => {
   try {
     const body = JSON.parse(event.body);

     if(!body || !body.image || !body.mime) {
        return _400({ message: 'incorrect body on request' });
     }
    
     if(!allowedMimes.includes(body.mime)){
        return _400({ message:' mime is not allowed '});
     }

     let imageData = body.image;
     if(body.image.substr(0, 7) == 'base64,'){
        imageData = body.image.substr(7, body.image.length);
     }

     const buffer = Buffer.from(imageData, 'base64');
     const fileInfo = await fileTypeFromBuffer(buffer);
     const detectedExt = fileInfo.ext;
     const detectedMime = fileInfo.mime;

     if(detectedMime !== body.mime) {
        return _400({ message: 'mime types dont match '});
     }


     const name = uuid();
     const key = `${name}.${detectedExt}`;

     console.log(`Writing image to bucket called ${key}`);

     await s3.putObject({
        Body: buffer,
        Key: key,
        ContentType: body.mime,
        Bucket: bucketName,
        ACL: 'public-read'
     }).promise();

     const url = `https://${bucketName}.s3-us-east-1.amazonaws.com/${key}`;
     
     return _200({
        imageURL: url,
     })      
   }catch (error) {
       console.log('error : ', error);

       return _400({ message: error.message || 'failed to upload image'})
   }
} 