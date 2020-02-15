import Joi from 'joi';
import Schemas from './validatorSchema/bodySchemas';
import ResponseGenerator from '../utils/ResponseGenerator';

const response = new ResponseGenerator();


const BodySchemaValidator = (req, res, next) => {
  const { path } = req.route;

  // Joi validation options
  const validationOptions = { abortEarly: false, allowUnknown: true, stripUnknown: true };

  if (path in Schemas) {
    const schema = Schemas[path];

    Joi.validate(req.body, schema, validationOptions, (err, data) => {
      if (err) {
        return response.sendError(res, 400, err.message);
      }
      req.body = data;
      return next();
    });
  }
};

export default BodySchemaValidator;
