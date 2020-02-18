import Joi from 'joi';
import Schemas from './validatorSchema/querySchemas';
import ResponseGenerator from '../utils/ResponseGenerator';

const response = new ResponseGenerator();


const QuerySchemaValidator = (req, res, next) => {
  const { path } = req.route;

  // Joi validation options
  const validationOptions = { abortEarly: false, allowUnknown: true, stripUnknown: true };

  if (path in Schemas) {
    const schema = Schemas[path];

    Joi.validate(req.query, schema, validationOptions, (err, data) => {
      if (err) {
        return response.sendError(res, 400, err.message);
      }
      req.query = data;
      return next();
    });
  }
};

export default QuerySchemaValidator;
