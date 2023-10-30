export namespace VACATION {
  export interface Item {
    duration:number;
    suggestionDate:Date;
    reason:string;
    type?:string
  }

  export interface updateVacation {
    id:number;
    duration?:number;
    suggestionDate?:Date;
    reason?:string;
  }
  
  }