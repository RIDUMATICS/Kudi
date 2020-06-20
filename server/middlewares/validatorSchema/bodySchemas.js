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
  phoneNumber: Joi.string().regex(/([+]?\d{1,3}[.-\s]?)?(\d{3}[.-]?){2}\d{4}/).required().error(new Error('Please enter a valid phone number')),
  enable2FA: Joi.boolean().default(false)
});

const loginUserSchema = Joi.object({
  email,
  password
});

const verifyAuthyTokenSchema = Joi.object({
  authyToken: Joi.string().required().error(new Error('Please enter a valid token'))
});

const createStaffSchema = Joi.object({
  firstName: Joi.string().regex(/^\D+$/).required().error(new Error('Please enter a valid first name')),
  lastName: Joi.string().regex(/^\D+$/).required().error(new Error('Please enter a valid last name')),
  email,
  password,
  confirmPassword: Joi.string().valid(Joi.ref('password')).required().strict()
    .error(new Error('your password and confirm password do not match')),
  countryCode: Joi.string().regex(/^(\+?\d{1,3}|\d{1,4})$/).required().error(new Error('Please enter a valid Country Code')),
  phoneNumber: Joi.string().regex(/^\d{1,14}$/).required().error(new Error('Please enter a valid phone number')),
  enable2FA: Joi.boolean().default(false),
  isAdmin: Joi.boolean().required().error(new Error('isAdmin is requires'))
});

const createAccountSchema = Joi.object({
  type: Joi.string().lowercase().valid('savings', 'current').required()
    .error(new Error('Please enter a valid account type [savings, current]')),
});

const updateStatusSchema = Joi.object({
  status: Joi.string().lowercase().valid('dormant', 'active').required()
    .error(new Error('Please enter a valid account status [dormant, active]')),
});

const transactionSchema = Joi.object({
  amount: Joi.number().min(0.0).positive().precision(2)
    .required()
    .error(new Error('Please enter a valid amount')),
});

const updateUserSchema = Joi.object({
  firstName: Joi.string().regex(/^\D+$/).error(new Error('Please enter a valid first name')),
  lastName: Joi.string().regex(/^\D+$/).error(new Error('Please enter a valid last name')),
  password: Joi.string().regex(new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[_!@#\$%\^&\*\-])(?=.{8,})')).strict()
    .error(new Error('password must be at least 8 characters long; must contain at least one lowercase letter, one uppercase letter, one numeric digit, and one special character')),
  confirmPassword: Joi.string().valid(Joi.ref('password')).strict(),
  oldPassword: Joi.string().regex(new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[_!@#\$%\^&\*\-])(?=.{8,})')).strict()
    .error(new Error('password must be at least 8 characters long; must contain at least one lowercase letter, one uppercase letter, one numeric digit, and one special character')),
  countryCode: Joi.string().regex(/^(\+?\d{1,3}|\d{1,4})$/).error(new Error('Please enter a valid Country Code')),
  phoneNumber: Joi.string().regex(/^\d{1,14}$/).error(new Error('Please enter a valid phone number')),
  enable2FA: Joi.boolean()
});

export default {
  '/signup': createUserSchema,
  '/signin': loginUserSchema,
  '/2fa': verifyAuthyTokenSchema,
  '/create/staff': createStaffSchema,
  '/update': updateUserSchema,
  '/accounts': createAccountSchema,
  '/accounts/:accountNumber': updateStatusSchema,
  '/transactions/:accountNumber/debit': transactionSchema,
  '/transactions/:accountNumber/credit': transactionSchema,
};