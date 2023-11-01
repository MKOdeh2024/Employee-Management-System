
import { ADVANCE } from "../@types/advance.js";
import { Advance } from "../db/entities/Advance.js";
import { Employee } from "../db/entities/Employee.js";



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

const getAdvances = async (employeeId:number,payload:ADVANCE.getAdvances) => {
  console.log("here")
  const empId = employeeId;
  console.log(employeeId)
  try {
    const page = parseInt(payload.page)||1;
    const pageSize = parseInt(payload.pageSize)||10;
    const [complaints, total] = await Advance.findAndCount({
      skip: pageSize * (page - 1),
        take: pageSize,
        order: {
          createdAt: 'ASC'
        },
        where:{employee:empId}
    })
    if (complaints) {
      const complaint = complaints.map(({ employee, ...rest }) => {
        return rest;
      });
      return{
        page,
        pageSize: complaint.length,
        total,
        complaint
      };
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

const UpdateAdvanceStatus = async (advId:number,status:string) => {
  const advance = await  Advance.findOneBy({id:advId});
  console.log(advance)
  
  if(advance){
    console.log(advance)
    if(advance.status ==="waiting"){
      advance.status = status;
      const result = await advance.save()
      if(result){
        return result
      }else return 2
    }else return 1 ;
  }else return 0;
};



export {
  insertExceptionalAdvance,
  insertNormalAdvance,
  deleteAdvane,
  updateNormalAdvane,
  getAdvance,
  getAdvances,
  updateExceptionalAdvane,
  UpdateAdvanceStatus
}
