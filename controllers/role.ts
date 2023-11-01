import { EMPLOYEE } from "../@types/employee.js";
import { Role } from "../db/entities/Role.js";
import { Permission } from "../db/entities/Permission.js";
import { Any, In } from "typeorm";
import { Employee } from "../db/entities/Employee.js";



const insertRole = async (payload: EMPLOYEE.Role) => {
  try {
    const role = new Role();

    role.name = payload.name;
    role.permissions = await Permission.findBy({
      id: In(payload.permissions)
    });
    console.log(role.permissions)
    // role.permissions = permissions.map(permission => permission.id);
    await role.save();
    return role;
  } catch (error) {
    console.log(error);
    throw ("Something went wrong");
  }
}

const assignRole = async (payload: EMPLOYEE.roleAssign) => {
  console.log(payload);
  const employee = await Employee.findOneBy({
    id: payload.employeeId
  });
  console.log(employee);
  if (employee) {
    const role = await Role.findOneBy({
      name: payload.role
    })
    console.log(role);
    if (role) {
      const checkRoles = employee.roles.find((role1) => role1.name === role.name)
      console.log(checkRoles)
      if (!checkRoles) {
        employee.roles.push(role);
        await employee.save();
        return employee;
      } else throw ("User already have this role!");
    } else throw ("role not found!");
  } else throw ("employee not found");

}




export {
  insertRole,
  assignRole
}