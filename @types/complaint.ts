export namespace COMPLAINT {
    export interface Item {
      subject:string;
      content:string;
    }

    export interface updatecomplaint {
      id:number;
      subject?:string;
      date?:Date;
      content?:string;
    }
  }