import express from 'express';
import jwt from 'jsonwebtoken';
import { Employee } from '../../db/entities/Employee.js';

const authenticate = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  const token = req.headers['authorization'] || '';
  console.log(token)
  let tokenIsValid;
  try {
    tokenIsValid = jwt.verify(token, process.env.JWT_SECRET_KEY||'');
  } catch (error) {console.log(error) }
  console.log(tokenIsValid)
  if (tokenIsValid) {
    const decoded = jwt.decode(token, { json: true });
    console.log(decoded!.email)
    const employee = await Employee.findOneBy({ email: decoded?.email || '' })
    res.locals.employee = employee;
    console.log(res.locals.employee)
    console.log(employee)
    console.log("authenticate")
    next();
  } else {
    res.status(401).send("You are Unauthenticated!");
  }
}

const allowedTo =(...roles: Array<string>) => async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  const employee = await Employee.findOneBy({ id: res.locals.employee.id });
  const employeeroles = employee?.roles;
  console.log(employeeroles)
  const roleNames: string[] = [];
  employeeroles!.map((role) => {
    roleNames.push(role.name)
  })
  console.log(roles)
  const check = roleNames.some(role => roles.includes(role));
  console.log(check)
  if (!check) {
    return res.status(403).send('You are not allowed to access this route');
  }
  next();
};

export {
  authenticate,
  allowedTo
}