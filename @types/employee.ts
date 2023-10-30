import { Advance } from "../db/entities/Advance.js";
import { Complaint } from "../db/entities/Complaint.js";
import { LeavePermission } from "../db/entities/LeavePermission.js";
import { Vacation } from "../db/entities/Vacation.js";

export namespace EMPLOYEE {
  export interface createEmployee {
    firstName: string;
    midName: string;
    lastName: string;
    email: string;
    password: string;
    role: "employee";
    DOB: Date;
    identification: string;
    phoneNumber: string;
    salary: number;
    city: string;
    street?: string;
    section: number;
    status: string;
    gender: string;
  }

  export interface createSectionManager {
    firstName: string;
    midName: string;
    lastName: string;
    email: string;
    password: string;
    role: "sectionManager";
    DOB: Date;
    identification: string;
    phoneNumber: string;
    salary: number;
    city: string;
    street?: string;
    section: number;
    status: string;
    gender: string;
  }

  export interface createManager {
    firstName: string;
    midName: string;
    lastName: string;
    email: string;
    password: string;
    role: "manager";
    DOB: Date;
    identification: string;
    phoneNumber: string;
    salary: number;
    city: string;
    street?: string;
    status: string;
    gender: string;
  }

  export interface createAdmin {
    firstName: string;
    midName: string;
    lastName: string;
    email: string;
    password: string;
    role: "admin";
    DOB: Date;
    identification: string;
    phoneNumber: string;
    salary: number;
    city: string;
    street?: string;
    status: string;
    gender: string;
  }
  export interface Role {
    name: string;
    permissions: number[];
  }
  export interface changePassword {
    newPassword: string;
    oldPassword: string;
  }

  export interface Permission {
    id: number;
    name: string;
  }

  export interface Profile {
    id: number;
    firstName: string;
    lastName: string;
    DOB: Date;
  }

  export interface roleAssign {
    employeeId: number;
    role: string;
  }



  export interface permissionAssign {
    roleId: number;
    permission: string;
  }
  export interface updateEmployee {
    id: number;
    phoneNumber?: string;
    salary?: number;
    section?: number;
  }

  export interface updatePersonalInformation {
    firstName?: string;
    midName?: string;
    lastName?: string;
    email?: string;
    phoneNumber?: string;
    city?: string;
    street?: string;
    status?: string;
  }

  export interface Notifications {
    advances: Advance[]; 
    vacations: Vacation[]; 
    leavePermissions: LeavePermission[];
    complaints:Complaint[]; 
  }
  export interface SectionNotifications {
    vacations: Vacation[]; 
    leavePermissions: LeavePermission[]; 
  }
}