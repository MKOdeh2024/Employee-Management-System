export namespace LEAVE {
    export interface Item {
      leaveDate:Date;
      leaveHour:number;
      duration:number;
      reason:string;
    }

    export interface updateLeavePermission {
        id:number;
        leaveDate?:Date;
        leaveHour?:number;
        duration?:number;
        date?:Date;
        reason?:string;
    }
  
  }