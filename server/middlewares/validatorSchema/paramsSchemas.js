import Joi from 'joi';

const accountNumber = Joi.string().regex(/^\d+$/).required();

const accountNumberSchema = Joi.object({
  accountNumber: accountNumber.error(new Error('accountNumber must be an integer')),
});

export default {
  '/accounts/:accountNumber': accountNumberSchema,
};
