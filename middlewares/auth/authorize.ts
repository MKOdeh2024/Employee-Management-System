import express from 'express';
import { EMPLOYEE } from '../../@types/employee.js';

//Express middleware "authorize" checks user permissions for a specific API
const authorize = (api: string) => {
  return (
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) => {
    console.log(res.locals.employee.roles[1].permissions);
    const roles: EMPLOYEE.Role[] = res.locals.user.roles;
    console.log(roles)
    const permissions = roles.filter(p => { console.log(p.permissions); return p.permissions });
    if (permissions.filter(p => p.name).length > 0) {
      next();
    } else {
      res.status(403).send("You don't have the permission to access this resource!");
    }
  }
}

export {
  authorize
}