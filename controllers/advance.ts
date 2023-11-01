
import { ADVANCE } from "../@types/advance.js";
import { Advance } from "../db/entities/Advance.js";



const insertNormalAdvance = async (employeeId:number,payload: ADVANCE.normalAdvance) => {
    try {
    const advance =new Advance();
    let time = new Date().getTime();
    let date = new Date(time);
    advance.date =date;
    advance.suggestionDate = new Date(payload.suggestionDate);
    advance.status ="waiting";
    advance.amount = payload.amount;
    advance.employee = employeeId;
    advance.type='normal';
    await advance.save();
    return advance;
  } catch (error) {
    throw ("Something went wrong , can't create normal advance"+error);
  }
}

const insertExceptionalAdvance = async (employeeId:number,payload: ADVANCE.exceptionalAdvance) => {
  try {
    console.log("employeeid :"+employeeId )
  const advance =new Advance();
  let time = new Date().getTime();
  let date = new Date(time);
  advance.date =date;
  advance.suggestionDate = new Date(payload.suggestionDate);
  advance.installmentValue = payload.installmentValue;
  advance.reason =payload.reason;
  advance.status ="waiting";
  advance.amount = payload.amount;
  advance.employee = employeeId;
  advance.type='exceptional';
  await advance.save();
  return advance;
} catch (error) {
  throw ("Something went wrong , can't create exceptional advance"+error);
}
}

const getAdvances = async (employeeId:number) => {
  const empId = employeeId;
  try {
    const advances = await Advance.find({where :{employee:empId},order:{id: "ASC"}})
    if(advances){
      const adv = advances.map(({employee, ...rest}) => {
        return rest;
      });
      return adv;
    }
    else 
      return 1;
  } catch (error) {
    return 0;
  }
};

const getAdvance = async (empId:number,advId:number) => {
  try {
    const advance =await Advance.findOne({where:{id:advId,employee:empId}});
    if(advance){
      delete advance["employee"];
      return advance;
    }
    else 
      return 1;
  } catch (error) {
    return 0;
  }
};

const deleteAdvane = async (employeeId:number, advid:number) => {
  const advId = advid;
  const empId = employeeId;
  try {
    const advance =await Advance.delete({id:advId,employee:empId,status:"waiting"});
    if(advance.affected !=0){
      return advance;
    }
    else 
      return 1;
  } catch (error) {
    return 0;

};
}

const updateNormalAdvane = async (employeeId:number,payload:ADVANCE.updateExceptionalAdvance) => {

  const advId = payload.id;
  const empId = employeeId;
  try {
    const advance = await Advance.findOneBy({id:advId,employee:empId,status:"waiting"});
    console.log(advance)
    if(advance!.type != "normal"){
      return 3;
    }else {
      if(advance){
        advance.amount =payload.amount||advance.amount;
        advance.suggestionDate = payload.suggestionDate||advance.suggestionDate;
        console.log(advance)
        const result = await advance.save();
        if(result){
          delete result["employee"];
          return result;
        }else {
          return 2;
        }
    }else 
        return 1;
  }
  } catch (error) {
    console.log(error)
    return 0;

};
}

const updateExceptionalAdvane= async (employeeId:number,payload:ADVANCE.updateExceptionalAdvance) => {

  const advId = payload.id;
  const empId = employeeId;
  try {
    const advance = await Advance.findOneBy({id:advId,employee:empId,status:"waiting"});
    console.log(advance)
    if(advance!.type != "exceptional"){
      return 3;
    }else {
      if(advance){
        advance.amount =payload.amount || advance.amount;
        advance.installmentValue =payload.installmentValue || advance.installmentValue;
        advance.reason = payload.reason || advance.reason;
        advance.suggestionDate = payload.suggestionDate ||advance.suggestionDate;
        console.log(advance)
        const result = await advance.save();
        if(result){
          delete result["employee"];
          return result;
        }else {
          return 2;
        }
    }else 
        return 1;
  }
  } catch (error) {
    console.log(error)
    return 0;

}}


export {
  insertExceptionalAdvance,
  insertNormalAdvance,
  deleteAdvane,
  updateNormalAdvane,
  getAdvance,
  getAdvances,
  updateExceptionalAdvane
}