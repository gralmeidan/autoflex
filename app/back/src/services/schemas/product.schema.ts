import * as Joi from 'joi';

const productSchema = {
  name: Joi.string().min(1),
  value: Joi.number().min(0),
};

export default productSchema;
