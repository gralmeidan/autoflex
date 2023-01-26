import { NextFunction, Request, Response } from 'express';
import validateSchema from '../services/schemas/utils/validateSchema';
import Joi = require('joi');

export default function validateIdParams(...ids: string[]) {
  const idSchema = Joi.number().min(1).integer().required();

  return async (req: Request, _res: Response, next: NextFunction) => {
    ids.forEach(id => {
      validateSchema(idSchema.label(id), req.params[id]);
    });

    next();
  };
}
