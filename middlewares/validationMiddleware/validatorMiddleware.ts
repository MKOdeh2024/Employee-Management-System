import { validationResult }  from 'express-validator';
import express from 'express'
// @desc  Finds the validation errors in this request and wraps them in an object with handy functions
const validatorMiddleware = (req:express.Request, res:express.Response, next:express.NextFunction) => {
  const errors = validationResult(req);
  console.log(errors)
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};
export {
    validatorMiddleware
  }
