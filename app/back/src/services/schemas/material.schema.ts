import * as Joi from 'joi';

const materialSchema = {
  name: Joi.string().min(1),
  quantity: Joi.number().min(0),
};

export default materialSchema;
