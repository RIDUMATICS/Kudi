import twiloConfig from 'twilio';
import {
  config
} from 'dotenv';

config();

const twilioClient = twiloConfig(process.env.accountSid, process.env.authToken);

const sendSMS = async (body, to) => {
  try {
    return twilioClient.messages.create({
      body,
      from: '+14043414510',
      to
    });
  } catch (error) {
    throw new Error('Unable to send sms notification');
  }
};

export default sendSMS;