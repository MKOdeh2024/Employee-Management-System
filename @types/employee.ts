export namespace EMPLOYEE {
  export interface Item {
    id: string;
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
}