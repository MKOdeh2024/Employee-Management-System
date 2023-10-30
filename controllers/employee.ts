import { EMPLOYEE } from "../@types/employee.js";
import { Role } from "../db/entities/Role.js";
import { Employee } from '../db/entities/Employee.js'
import { AdminProfile } from "../db/entities/AdminProfile.js";
import { ManagerProfile } from "../db/entities/ManagerProfile.js";
import dataSource from "../db/dataSource.js";
import { SectionManagerProfile } from "../db/entities/SectionManagerProfile.js";
import { Advance } from "../db/entities/Advance.js";
import { Vacation } from "../db/entities/Vacation.js";
import { LeavePermission } from "../db/entities/LeavePermission.js";
import { Section } from "../db/entities/Section.js";
import bcrypt from "bcrypt"
import { Complaint } from "../db/entities/Complaint.js";


const insertAdmin = async (payload: EMPLOYEE.createAdmin) => {
  try {
    const adminRole = await Role.findOneBy({name:payload.role})
    if(adminRole){
      const admin = await AdminProfile.find();
      
      console.log(admin)
      if (!admin.length) {
        const result = await dataSource.manager.transaction(async transaction => {
          const employee = new Employee();
          employee.firstName = payload.firstName;
          employee.midName = payload.midName;
          employee.lastName = payload.lastName;
          employee.identification = payload.identification;
          employee.phoneNumber = payload.phoneNumber;
          employee.city = payload.city;
          employee.street = payload.street || '';
          employee.email = payload.email;
          employee.password = payload.password;
          employee.DOB = payload.DOB;
          let time = new Date().getTime();
          let date = new Date(time);
          employee.passwordChangedAt = date || null;
          employee.logoutAt = date || null;
          employee.salary = payload.salary;
          employee.advances = [];
          employee.vacations = [];
          employee.leavePermissions = [];
          employee.status = payload.status;
          employee.gender = payload.gender;
          employee.roles = await Role.findBy({
            name: payload.role
          });
          const admin = new AdminProfile();
          const name = payload.firstName + " " + payload.midName + " " + payload.lastName
          admin.name = name;
          await transaction.save(employee)
          console.log(admin)
          admin.employeeId = employee.id;
          await transaction.save(admin)
          console.log(employee)
          })
        return result;
      } else return 1;
    }else return 0;
  } catch (error) {
    throw ("Something went wrong , can't create an employee " + error);
  }
}

const insertEmployee = async (payload: EMPLOYEE.createEmployee) => {
  try {
    const employeeRole = await Role.findOneBy({name:payload.role})
    if(employeeRole){
      const employee = new Employee();
      employee.firstName = payload.firstName;
      employee.midName = payload.midName;
      employee.lastName = payload.lastName;
      employee.identification = payload.identification;
      employee.phoneNumber = payload.phoneNumber;
      employee.city = payload.city;
      employee.street = payload.street || '';
      employee.email = payload.email;
      employee.password = payload.password;
      employee.DOB = payload.DOB;
      let time = new Date().getTime();
      let date = new Date(time);
      employee.passwordChangedAt = date || null;
      employee.logoutAt = date || null;
      employee.salary = payload.salary;
      employee.advances = [];
      employee.vacations = [];
      employee.leavePermissions = [];
      employee.section = payload.section;
      employee.status = payload.status;
      employee.gender = payload.gender;
      employee.roles = await Role.findBy({
        name: payload.role
      });
      console.log(employee)
      // user.roles =roles.map(role => role.id);
      await employee.save();
      return employee;
    }else return 0;
  } catch (error) {
    throw ("Something went wrong , can't create an employee " + error);
  }
}

const insertManager = async (payload: EMPLOYEE.createManager) => {
  try {
    const managerRole = await Role.findOneBy({name:payload.role})
    if(managerRole){
      const manager = await ManagerProfile.find();
      if (manager) {
        const result:any = await dataSource.manager.transaction(async transaction => {
          const employee = new Employee();
          employee.firstName = payload.firstName;
          employee.midName = payload.midName;
          employee.lastName = payload.lastName;
          employee.identification = payload.identification;
          employee.phoneNumber = payload.phoneNumber;
          employee.city = payload.city;
          employee.street = payload.street || '';
          employee.email = payload.email;
          employee.password = payload.password;
          employee.DOB = payload.DOB;
          let time = new Date().getTime();
          let date = new Date(time);
          employee.passwordChangedAt = date || null;
          employee.logoutAt = date || null;
          employee.salary = payload.salary;
          employee.advances = [];
          employee.vacations = [];
          employee.leavePermissions = [];
          employee.status = payload.status;
          employee.gender = payload.gender;
          employee.roles = await Role.findBy({
            name: payload.role
          });
          console.log(employee)
          const manager = new ManagerProfile();
          const name = payload.firstName + " " + payload.midName + " " + payload.lastName
          manager.name = name;
          await transaction.save(employee)
          console.log(manager)
          manager.employeeId = employee.id;
          await transaction.save(manager)
          console.log(employee)
        })
        return result;
      } else return 1;
    } else return 0;
  } catch (error) {
    throw ("Something went wrong , can't create an employee " + error);
  }
}

const insertSectionManager = async (payload: EMPLOYEE.createSectionManager) => {
  try {
    const sectionManagerRole = await Role.findOneBy({name:payload.role})
    if(sectionManagerRole){
      const section =await Section.findOneBy({id:payload.section})
      if(section){
        const sectionManager = await SectionManagerProfile.findOneBy({ section: payload.section });
        if (!sectionManager) {
          const result = await dataSource.manager.transaction(async transaction => {
            const employee = new Employee();
            employee.firstName = payload.firstName;
            employee.midName = payload.midName;
            employee.lastName = payload.lastName;
            employee.identification = payload.identification;
            employee.phoneNumber = payload.phoneNumber;
            employee.city = payload.city;
            employee.street = payload.street || '';
            employee.email = payload.email;
            employee.password = payload.password;
            employee.DOB = payload.DOB;
            let time = new Date().getTime();
            let date = new Date(time);
            employee.passwordChangedAt = date || null;
            employee.logoutAt = date || null;
            employee.salary = payload.salary;
            employee.advances = [];
            employee.vacations = [];
            employee.leavePermissions = [];
            employee.status = payload.status;
            employee.gender = payload.gender;
            employee.roles = await Role.findBy({
              name:payload.role
            });
            console.log(employee)
            const sectionManager = new SectionManagerProfile();
            const name = payload.firstName + " " + payload.midName + " " + payload.lastName
            sectionManager.name = name;
            sectionManager.section = payload.section;
            await transaction.save(employee)
            console.log(sectionManager)
            sectionManager.employeeId = employee.id;
            await transaction.save(sectionManager)
            console.log(employee)
          })
          return result;
        } else return 2;
      }else return 1;
    } else return 0;
  } catch (error) {
    throw ("Something went wrong , can't create an employee " + error);
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

const getSectionManagers = async () => {
  return await SectionManagerProfile.findAndCount();
}

const getPersonalInformation = async (employeeId: number) => {
  const empId = employeeId;
  try {
    const info = await Employee.findOneBy({ id: empId })
    if (info) {
      return info;
    } else
      return 1;
  } catch (error) {
    return 0;
  }
};

const deleteEmployee = async (employeeId: number) => {
  try {
    const employee = await Employee.findOneBy({ id: employeeId });
    let secManager:any =null; 
    let emp:any =null; 
    if (employee) {
      let employeeroles = employee?.roles;
      console.log(employeeroles)
      const roleNames: string[] = [];
      employeeroles!.map((role) => {
        roleNames.push(role.name)
      })
      const check = roleNames.includes('sectionManager');
      if(check){
        secManager = await SectionManagerProfile.delete({section:employee.section})
        console.log(secManager)
        if(secManager){
           emp =await Employee.delete({id:employeeId})
        }
      }else   emp =await Employee.delete({id:employeeId})
      return emp;
    }
    else
      return 1;
  } catch (error) {
    return 0;

  };
}

const updateEmployee = async (payload: EMPLOYEE.updateEmployee) => {
  try {
    const employee = await Employee.findOneBy({ id: payload.id });
    console.log(employee)
    if (employee) {
      employee.salary = payload.salary || employee.salary;
      employee.section = payload.section || employee.section;
      employee.phoneNumber = payload.phoneNumber || employee.phoneNumber;
      console.log(employee)
      const result = await employee.save();
      if (result) {
        return result;
      } else {
        return 2;
      }
    } else
      return 1;

  } catch (error) {
    console.log(error)
    return 0;

  };
}

const updatePersonalInformation = async (employeeId:number,payload: EMPLOYEE.updatePersonalInformation) => {
  try {
    const employee = await Employee.findOneBy({ id: employeeId });
    console.log(employee)
    if (employee) {
      employee.firstName = payload.firstName || employee.firstName;
      employee.midName = payload.midName || employee.midName;
      employee.lastName = payload.lastName || employee.lastName;
      employee.status = payload.status || employee.status;
      employee.city = payload.city || employee.city;
      employee.email = payload.email || employee.email;
      employee.phoneNumber = payload.phoneNumber || employee.phoneNumber;
      console.log(employee)
      const result = await employee.save();
      if (result) {
        return result;
      } else {
        return 2;
      }
    } else
      return 1;

  } catch (error) {
    console.log(error)
    return 0;
  };
}

const findAdvance = async (advId:number) => {
  try {
    const advacne = await Advance.findOneBy({id:advId})
    if(advacne){
      return advacne
    }else return 0;
  } catch (error) {
    throw ("Something went wrong , can't get advacne " + error);
  }
};

const findVacation = async (vacId:number) => {
  try {
    const vacation = await Vacation.findOneBy({id:vacId})
    if(vacation){
      return vacation
    }else return 0;
  } catch (error) {
    throw ("Something went wrong , can't get vacation " + error);
  }
};

const findLeavePermission =async  (leaveId:number) => {
  try {
    const leavePermission = await LeavePermission.findOneBy({id:leaveId})
    if(leavePermission){
      return leavePermission
    }else return 0;
  } catch (error) {
    throw ("Something went wrong , can't get leavePermission " + error);
  }

};

const getAllRequests = async () => {
  try {
    
    const leavePermissions= await LeavePermission.find()
    const advances= await Advance.find()
    const vacations= await Vacation.find()
    const complaints= await Complaint.find()

    let notifications:EMPLOYEE.Notifications = {
      vacations :vacations,
      advances:advances,
      leavePermissions:leavePermissions,
      complaints:complaints
    };
    return notifications;
  } catch (error) {
    throw ("Something went wrong" + error)
  }
};

const getSectionRequests = async () => {
  try {
    
    const leavePermissions= await LeavePermission.find()
    const vacations= await Vacation.find()
    let notifications:EMPLOYEE.SectionNotifications = {
      vacations :vacations,
      leavePermissions:leavePermissions
    };
    return notifications;
  } catch (error) {
    throw ("Something went wrong" + error)
  }
};

const updatePassword = async (employeeId:number,payload:EMPLOYEE.changePassword) => {
  try {
    const oldPassword =payload.oldPassword;
    const employee = await Employee.findOneBy({id:employeeId})
    if(employee){
      if(await bcrypt.compare(oldPassword, payload.oldPassword)){
        employee.password = payload.newPassword;
        let time = new Date().getTime();
        let date = new Date(time);
        employee.passwordChangedAt=date;
        const result = await employee.save();
        if(result){
          return result;
        }else return 2;
      }return 1;
    }else return 0;
  } catch (error) {
    console.log(error)
    return;
  }
};


export {
  insertEmployee,
  getEmployee,
  getPersonalInformation,
  getEmployees,
  updateEmployee,
  updatePersonalInformation,
  deleteEmployee,
  insertManager,
  insertSectionManager,
  findAdvance,
  findLeavePermission,
  findVacation,
  insertAdmin,
  getAllRequests,
  getSectionManagers,
  getSectionRequests,
  updatePassword
}