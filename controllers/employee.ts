import { EMPLOYEE } from "../@types/employee.js";
import { Role } from "../db/entities/Role.js";
import {Employee} from '../db/entities/Employee.js'
import { In } from "typeorm";
import jwt from 'jsonwebtoken'
import bcrypt from "bcrypt"
import { Name } from "../db/entities/Name.js";
import { Section } from "../db/entities/Section.js";

const insertEmployee = async (payload: EMPLOYEE.createEmployee) => {
  const section = await Section.findOneBy({id:payload.section});
  try {
    
    const employee = new Employee();
    employee.firstName=payload.firstName;
    employee.midName=payload.midName;
    employee.lastName=payload.lastName;
    employee.identification =payload.identification;
    employee.phoneNumber=payload.phoneNumber;
    employee.city = payload.city;
    employee.street = payload.street || '';
    employee.email = payload.email;
    employee.password = payload.password;
    employee.DOB = payload.DOB;
    let time = new Date().getTime();
    let date = new Date(time);
    employee.passwordChangedAt = date||null;
    employee.logoutAt = date||null;
    employee.salary = payload.salary;
    employee.advances =[];
    employee.vacations =[];
    employee.leavePermissions =[];
    employee.section= payload.section;
    employee.status= payload.status;
    employee.gender =payload.gender;
    employee.roles = await Role.findBy({
      id: In(payload.role)
    });
    console.log(employee)
    // user.roles =roles.map(role => role.id);
    await employee.save();
    return employee;
  } catch (error) {
    throw ("Something went wrong , can't create an employee "+ error);
  }
}

const getEmployee = async (id: number) => {
  return await Employee.findOneBy({
    id
  });
}

const getEmployees = async () => {
  return await Employee.findAndCount();
}

const getPersonalInformation = async (employeeId:number) => {
  const empId = employeeId;
  try {
    const info = await Employee.findOneBy({id:empId})
    if(info){      
      return info;
    }else 
      return 1;
  } catch (error) {
    return 0;
  }
};

const login = async (email: string, password: string) => {

  const employee = await Employee.findOneBy({
    email
  });
  console.log(email, password, employee);
  const passwordMatching = await bcrypt.compare(password, employee?.password || '');

  if (employee && passwordMatching) {
    const token =
      jwt.sign({
        email: employee.email,
        id: employee.id
      }, process.env.JWT_SECRET_KEY || '', {
        expiresIn: "30m",
      });

    return token;
  } else {
    throw ("somethin went wrong!");
  }

}

const deleteEmployee = async (employeeId:number) => {
  try {
    const employee =await Employee.delete({id:employeeId});
    if(employee){
      return employee;
    }
    else 
      return 1;
  } catch (error) {
    return 0;

};
}

const updateEmployee= async (payload:EMPLOYEE.updateEmployee) => {
  try {
    const employee = await Employee.findOneBy({id:payload.id});
    console.log(employee)
      if(employee){
        employee.salary =payload.salary||employee.salary;
        employee.section = payload.section || employee.section;
        employee.phoneNumber = payload.phoneNumber|| employee.phoneNumber;
        console.log(employee)
        const result = await employee.save();
        if(result){
          return result;
        }else {
          return 2;
        }
    }else 
        return 1;
  
  } catch (error) {
    console.log(error)
    return 0;

};
}

const updatePersonalInformation= async (payload:EMPLOYEE.updatePersonalInformation) => {
  try {
    const employee = await Employee.findOneBy({id:payload.id});
    console.log(employee)
      if(employee){
        employee.firstName =payload.firstName||employee.firstName;
        employee.midName =payload.midName||employee.midName;
        employee.lastName =payload.lastName||employee.lastName;
        employee.status =payload.status||employee.status;
        employee.city =payload.city||employee.city;
        employee.email = payload.email||employee.email;
        employee.phoneNumber = payload.phoneNumber|| employee.phoneNumber;
        console.log(employee)
        const result = await employee.save();
        if(result){
          return result;
        }else {
          return 2;
        }
    }else 
        return 1;
  
  } catch (error) {
    console.log(error)
    return 0;

};
}




export {
  insertEmployee,
  getEmployee,
  getPersonalInformation,
  getEmployees,
  updateEmployee,
  updatePersonalInformation,
  deleteEmployee,
  login
}