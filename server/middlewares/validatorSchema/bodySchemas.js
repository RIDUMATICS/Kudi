/* eslint-disable no-useless-escape */
import Joi from 'joi';

const email = Joi.string().email().lowercase().required()
  .error(new Error('Please enter a valid E-mail'));

const password = Joi.string().regex(new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[_!@#\$%\^&\*\-])(?=.{8,})')).required().strict()
  .error(new Error('password must be at least 8 characters long; must contain at least one lowercase letter, one uppercase letter, one numeric digit, and one special character'));

const createUserSchema = Joi.object({
  firstName: Joi.string().regex(/^\D+$/).required().error(new Error('Please enter a valid first name')),
  lastName: Joi.string().regex(/^\D+$/).required().error(new Error('Please enter a valid last name')),
  email,
  password,
  confirmPassword: Joi.string().valid(Joi.ref('password')).required().strict()
    .error(new Error('your password and confirm password do not match')),
  countryCode: Joi.string().regex(/^(\+?\d{1,3}|\d{1,4})$/).required().error(new Error('Please enter a valid Country Code')),
  phoneNumber: Joi.string().regex(/^\d{1,14}$/).required().error(new Error('Please enter a valid phone number')),
  enable2FA: Joi.boolean().default(false)
});

const loginUserSchema = Joi.object({
  email,
  password
});

const verifyAuthyTokenSchema = Joi.object({
  authyToken: Joi.number().required().error(new Error('Please enter a valid token'))
});

export default {
  '/auth/signup': createUserSchema,
  '/auth/signin': loginUserSchema,
  '/auth/2fa': verifyAuthyTokenSchema
};