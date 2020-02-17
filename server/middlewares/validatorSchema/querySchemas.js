import Joi from 'joi';

const statusSchema = Joi.object({
  status: Joi.string().lowercase().valid('draft', 'dormant', 'active'),
});

export default {
  '/accounts': statusSchema,
};
