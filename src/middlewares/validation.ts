import { plainToClass } from 'class-transformer';
import { validate, ValidationError } from 'class-validator';
import { RequestHandler } from 'express';
import { BadRequestException } from '../exceptions';

type ValidationObject = {
  type: any;
  value: 'body' | 'query' | 'params';
};

const validationMiddleware = (
  validationObjects: ValidationObject[],
  skipMissingProperties = false,
  whitelist = true,
  forbidNonWhitelisted = true
): RequestHandler => {
  return (req, res, next) => {
    for (const index in validationObjects) {
      const validationObject = validationObjects[index];

      validate(plainToClass(validationObject.type, req[validationObject.value]), {
        skipMissingProperties,
        whitelist,
        forbidNonWhitelisted
      }).then((errors: ValidationError[]) => {
        if (errors.length > 0) {
          const message = errors.map((error: ValidationError) => Object.values(error.constraints)).join(', ');
          return next(new BadRequestException(message));
        }
      });
    }

    next();
  };
};

export default validationMiddleware;
