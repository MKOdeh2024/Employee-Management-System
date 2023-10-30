export namespace ADVERTISEMENT {
    export interface Item {
      title:string;
      content:string;
    }

    export interface updateAdvertisement {
      id:number;
      title?:string;
      date?:Date;
      content?:string;
    }
  }