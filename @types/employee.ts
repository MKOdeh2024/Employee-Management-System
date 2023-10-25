export namespace EMPLOYEE {
  export interface createEmployee {
    id: number;
    firstName: string;
    midName: string;
    lastName: string;
    email: string;
    password: string;
    role:number[];
    DOB:Date;
    identification:string;
    phoneNumber:string;
    salary:number;
    city:string;
    street?:string;
    section:number;
    status:string;
    gender:string;
  }
  export interface Role {
    id: number;
    name: string;
    permissions: number[];
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

  export interface roleAssign{
    employeeId:number;
    role:string;
  }



  export interface permissionAssign{
    roleId:number;
    permission:string;
  }
  export interface updateEmployee{
    id:number;
    phoneNumber?:string;
    salary?:number;
    section?:number;
  }

  export interface updatePersonalInformation {
    id: number;
    firstName?: string;
    midName?: string;
    lastName?: string;
    email?: string;
    phoneNumber?:string;
    city?:string;
    street?:string;
    status?:string;
  }

}