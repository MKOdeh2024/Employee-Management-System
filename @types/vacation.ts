export namespace VACATION {
  export interface Item {
    duration:number;
    suggestionDate:Date;
    reason:string;
  }

  export interface updateVacation {
    id:number;
    duration?:number;
    suggestionDate?:Date;
    reason?:string;
  }
  
  }