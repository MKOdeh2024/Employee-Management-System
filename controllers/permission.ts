import { ArrayContainedBy } from "typeorm";
import { EMPLOYEE } from "../@types/employee.js";
import { Permission } from "../db/entities/Permission.js";
import { Role } from "../db/entities/Role.js";
import { create } from "domain";



const insertPermission = async (payload: EMPLOYEE.Permission) => {
  try {
    console.log("here")
    const permission = await  Permission.findOneBy({name:payload.name})
    console.log(permission)
    if(!permission){
        const permissionCreator =new Permission();
        permissionCreator.name =payload.name;
      const created = await permissionCreator.save();
      console.log(created)
      if(created){
        return created;
      }else return 1;
      
    }else return 0;
    
  } catch (error) {
    console.log(error);
    throw ("Something went wrong");
  }
}
const assignPermission = async (payload: EMPLOYEE.permissionAssign) => {
  console.log(payload);
  // if(role){
    // const name = payload.first+payload.mid+payload.last
  const role = await Role.findOneBy({
    id: payload.roleId
  });
  console.log(role);
  if (role) {
    const permission = await Permission.findOneBy({
      name: payload.permission
    })
    console.log(permission);
    if (permission) {
      const checkRoles = role.permissions.find((permission) => permission.name === permission.name)
      console.log(checkRoles)
      if (!checkRoles) {
        role.permissions.push(permission);
        await permission.save();
        return permission;
      } else throw ("Role already have this permission!");
    } else throw ("permission not found!");
  } else throw ("role not found");

}
const getPermissios = async (roleId:number) => {
  try {
    const permissions = await Permission.find({where :{roles:ArrayContainedBy([roleId])},order:{id: "ASC"}})
    if(permissions){
      const permission = permissions.map(({roles, ...rest}) => {
        return rest;
      });
      return permission;
    }
    else 
      return 1;
  } catch (error) {
    return 0;
  }
};
const getPermission = async (roleId:number,permissioneId:number) => {
  try {
    const permission =await Permission.findOne({where:{id:permissioneId,roles:ArrayContainedBy([roleId])}});
    if(permission){
      return permission;
    }
    else 
      return 1;
  } catch (error) {
    return 0;
  }
};




export {
  insertPermission,
  assignPermission,
  getPermission,
  getPermissios
}