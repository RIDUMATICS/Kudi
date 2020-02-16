import authyConfig from 'authy';
import twiloConfig from 'twilio';
import { config } from 'dotenv';

config();

const authy = authyConfig(process.env.authy_key);
// eslint-disable-next-line no-unused-vars
const twilioClient = twiloConfig(process.env.accountSid, process.env.authToken);

export const registerAuthy = ({
  email,
  phoneNumber,
  countryCode
}) => new Promise(((resolve, reject) => {
  authy.register_user(
    email,
    phoneNumber,
    countryCode,
    (err, response) => {
      if (err || !response.user) reject(err);
      return resolve(response);
    }
  );
}));


export const sendAutyToken = ({
  authyID
}) => new Promise(((resolve, reject) => {
  authy.request_sms(authyID, true, (err, smsRes) => {
    if (err) {
      return reject(err);
    }
    return resolve(smsRes);
  });
}));

export const verifyAuthyToken = (authyID, token) => new Promise((resolve, reject) => {
  authy.verify(authyID, token, (err, tokenRes) => {
    if (err) {
      if (err.message === 'Token is invalid. Token was used recently' || err.message === 'Token is invalid') {
        // eslint-disable-next-line no-param-reassign
        err.status = 400;
      }
      return reject(err);
    }
    return resolve(tokenRes);
  });
});
