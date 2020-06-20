import sgMail from '@sendgrid/mail';
import { config } from 'dotenv';

config();

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const sendMail = async (to, subject, message) => {
  try {
    const msg = {
      to,
      from: {
        email: 'support@kudi.com',
        name: 'Kudi Bank Support',
      },
      subject,
      html: message,
    };
    // don't send mail in test mode
    if (process.env.NODE_ENV !== 'test') await sgMail.send(msg);
  } catch (err) {
    throw new Error('Unable to send email notification');
  }
};

export default sendMail;
