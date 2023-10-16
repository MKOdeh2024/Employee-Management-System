export namespace ADVANCE {
    export interface exceptionalAdvance {
      amount:number;
      suggestionDate:Date;
      installmentValue:number;
      reason:string;
      type:string
    }

    export interface normalAdvance {
      amount:number;
      suggestionDate:Date;
      type:string
    }
    export interface updateNormalAdvance {
      id:number;
      amount:number;
      suggestionDate:Date;
    }


    export interface updateExceptionalAdvance {
      id:number;
      amount:number;
      suggestionDate:Date;
      installmentValue:number;
      reason:string;
    }
  
  }