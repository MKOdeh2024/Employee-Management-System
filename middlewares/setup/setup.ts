import express from 'express'
import { In } from "typeorm";
import { EMPLOYEE } from "../../@types/employee.js";
import { insertAdmin } from "../../controllers/employee.js";
import { insertRole } from "../../controllers/role.js";
import { AdminProfile } from "../../db/entities/AdminProfile.js"
import { Role } from "../../db/entities/Role.js";
import { rmSync } from 'fs';


const admin:EMPLOYEE.createAdmin = {
    firstName: "mustafa",
    midName: "raed",
    lastName: "zaareer",
    identification:"40726428401",
    phoneNumber: "595041725",
    email: "mustafa323@gmail.com",
    DOB:new Date("2022-02-17"),
    password:"Mustafa-123",
    salary:2050,
    city:"hebron",
    street:"alsamu",
    role:"admin",
    status:"single",
    gender:"male"
}
const adminRole:EMPLOYEE.Role ={
    name:"admin",
    permissions:[]
}
const managerRole:EMPLOYEE.Role = {
    name:"manager",
    permissions:[]
}
const sectionManagerRole:EMPLOYEE.Role = {
    name:"sectionManager",
    permissions:[]
}
const setUp =async (req:express.Request,res:express.Response,next:express.NextFunction)=>{
    console.log("here")
    try {
        const roles = await Role.findOneBy({name:In([adminRole.name,managerRole.name])});
        if(!roles){
            const createAdminRole = await insertRole(adminRole);
            const createManagerRole = await insertRole(managerRole);
            const createSectionManagerRole = await insertRole(sectionManagerRole);
            console.log(createAdminRole,createManagerRole,createSectionManagerRole)
        }
        const checkAdmin =await  AdminProfile.find();
        if(!checkAdmin.length){
            const createAdmin = await insertAdmin(admin)
        }
        res.send()
    } catch (error) {
        res.send("you already setupded")

        throw("something went wrong on set up the system"+error)
    }
}

export{
    setUp
}
