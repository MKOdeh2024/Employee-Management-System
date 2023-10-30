import express from 'express';
import { EMPLOYEE } from '../../@types/employee.js';
import { Permission } from '../../db/entities/Permission.js';

const authorize = (api: string) => {
  return async (
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) => {
    const permission = await Permission.findOneBy({name:api});
    console.log(permission)
    if(permission){
    const roles: EMPLOYEE.Role[] = res.locals.employee.roles;
    console.log(roles)
    // let permissions:Permission []=[]
    let permissions:any [] = [];
    roles.filter((role)=>{
      permissions =role.permissions;
        return role.permissions
      })
      let permissionsName:any[] =[]
      permissions.filter((per)=>{
        permissionsName.push(per.name)
      })
    if (permissionsName.includes(api)) {
      console.log("authorized")
      next();
    } else {
      res.status(403).send("You don't have the permission to access this resource!");
    }
    }else {
      res.send("permission not found!")
    }
  }
}

export {
  authorize
}