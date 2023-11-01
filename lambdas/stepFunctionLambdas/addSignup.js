/* eslint-disable no-undef */
import { write } from '../common/Dynamo';
import { v4 as uuid } from 'uuid';

const tableName = process.env.signupTableName;

exports.handler = async event => {
    console.log('event', event);

    const email = event.Input.signup.email;

    const ID = uuid();

    await write({ email, ID, played: 'false' }, tableName);

    return { ID };
};