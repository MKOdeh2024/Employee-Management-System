import express from 'express';
import jwt from 'jsonwebtoken';
import { Employee } from '../../db/entities/Employee.js';

//Express middleware for JWT authentication. Validates the token, fetches employee details from the DB, and adds to response locals if valid. 
const authenticate = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  const token = req.headers['authorization'] || '';
  let tokenIsValid;
  console.log(token);
  try {
    tokenIsValid = jwt.verify(token, process.env.JWT_SECRET_KEY || '');
  } catch (error) { }
  if (tokenIsValid) {
    const decoded = jwt.decode(token, { json: true });
    const employee = await Employee.findOneBy({ email: decoded?.email || '' })
    res.locals.employee = employee;
    console.log("authonticate");
    next();
  } else {
    res.status(401).send("You are Unauthorized!");
  }

}

export {
  authenticate
}