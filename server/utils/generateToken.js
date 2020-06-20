import jwt from 'jsonwebtoken';
import { config } from 'dotenv';
import _ from 'lodash';

config();

/**
 * @description - signs token
 * @param {object} payload
 */
const genToken = (user, authyID = '') => {
  let payload = _.pick(user, ['id', 'firstName', 'lastName', 'isAdmin', 'type', 'email', 'phoneNumber', 'enable2FA']);

  if (user.enable2FA === true && authyID === '') {
    payload = { allowOnly2FA: true, user: user.email };
  }

  return jwt.sign(payload, process.env.secretOrPrivateKey, {
    expiresIn: '24h'
  });
};

export default genToken;