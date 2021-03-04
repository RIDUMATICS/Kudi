import Joi from 'joi';

const accountNumber = Joi.string()
  .regex(/^\d+$/)
  .required();

const accountNumberSchema = Joi.object({
  accountNumber: accountNumber.error(
    new Error('accountNumber must be an integer')
  )
});

const transactionIdSchema = Joi.object({
  transactionId: accountNumber.error(
    new Error('trasactionId must be an integer')
  )
});

export default {
  '/accounts/:accountNumber': accountNumberSchema,
  '/verify/:accountNumber': accountNumberSchema,
  '/transactions/:accountNumber/debit': accountNumberSchema,
  '/transactions/:accountNumber/credit': accountNumberSchema,
  '/transactions/:accountNumber/transfer': accountNumberSchema,
  '/accounts/:accountNumber/transactions': accountNumberSchema,
  '/transactions/:transactionId': transactionIdSchema
};
