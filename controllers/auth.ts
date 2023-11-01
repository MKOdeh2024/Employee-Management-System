import express from 'express'
import {Employee} from '../db/entities/Employee.js'
import jwt from 'jsonwebtoken'
import bcrypt from "bcrypt"





const login = async (email: string, password: string) => {
  try {
    const employee = await Employee.findOneBy({
      email: email
    });
    console.log(employee)
    const passwordMatching = await bcrypt.compare(password, employee?.password || '');
    if (employee && passwordMatching) {
      const token = jwt.sign({
        email: employee.email,
        id:employee.id,
        name: employee.firstName + " " + employee.midName + " " + employee.lastName
      }, process.env.JWT_SECRET_KEY || '', {
        expiresIn: process.env.JWT_EXPIRE_TIME,
      });
      console.log(token)
      return token;
    } else {
      throw ("Invalid Username or password!");
    }
  } catch (error) {
    console.log(error);

    throw ("Invalid Username or password!");
  }
}
  const logout = async (req:express.Request, res:express.Response)=>{
    res.cookie('token','',{
      maxAge:-1     
    })
    res.send();
  }
export {
    login,
    logout
}


