import * as Joi from 'joi';

const recipeEntrySchema = {
  productId: Joi.number().min(1).integer().required(),
  materialId: Joi.number().min(1).integer().required(),
  quantity: Joi.number().min(1).integer().required(),
};

export default recipeEntrySchema;
