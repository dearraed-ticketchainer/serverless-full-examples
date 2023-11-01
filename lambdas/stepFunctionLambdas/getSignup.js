/* eslint-disable no-undef */
import { get } from '../common/Dynamo';

const tableName = process.env.signupTableName;

exports.handler = async event => {
    console.log('event', event);

    const ID = event.Input.Payload.ID;

    const row = await get(ID, tableName);

    return row;
};