import { VACATION } from "../@types/vacation.js";
import { Vacation } from "../db/entities/Vacation.js";


const insertVacation = async (employeeId:number,payload: VACATION.Item) => {
    try {
        console.log(employeeId)
        console.log(payload)

    const vacation =new Vacation();
    vacation.suggestionDate = new Date(payload.suggestionDate);
    vacation.status ="waiting";
    vacation.duration = payload.duration;
    vacation.employee = employeeId;
    vacation.reason = payload.reason;
    console.log(vacation)
    await vacation.save();
    return vacation;
  } catch (error) {
    throw ("Something went wrong , can't create vacation "+error);
  }
}

const getVacations = async (employeeId:number) => {
    const empId = employeeId;
    try {
      const vacations = await Vacation.find({where :{employee:empId},order:{id: "ASC"}})
      if(vacations){
        const vac = vacations.map(({employee, ...rest}) => {
          return rest;
        });
        return vac;
      }
      else 
        return 1;
    } catch (error) {
      return 0;
    }
};

const getVacation = async (empId:number,vacId:number) => {
    try {
      const vacation =await Vacation.findOne({where:{id:vacId,employee:empId}});
      if(vacation){
        delete vacation["employee"];
        return vacation;
      }
      else 
        return 1;
    } catch (error) {
      return 0;
    }
};

const deleteVacation = async (employeeId:number, vacId:number) => {
    const empId = employeeId;
    try {
      const vacation =await Vacation.delete({id:vacId,employee:empId,status:"waiting"});
      if(vacation.affected !=0){
        return vacation;
      }
      else 
        return 1;
    } catch (error) {
      return 0;
  
  };
}

const updateVacation= async (employeeId:number,payload:VACATION.updateVacation) => {

    const vacId = payload.id;
    const empId = employeeId;
    try {
      const vacation = await Vacation.findOneBy({id:vacId,employee:empId,status:"waiting"});
      console.log(vacation)
        if(vacation){
            vacation.duration =payload.duration || vacation.duration;
            vacation.suggestionDate = new Date(payload.suggestionDate || vacation.suggestionDate)
            vacation.reason = payload.reason || vacation.reason;
          console.log(vacation)
          const result = await vacation.save();
          if(result){
            delete result["employee"];
            return result;
          }else {
            return 2;
          }
      }else 
          return 1;
    
    } catch (error) {
      console.log(error)
      return 0;
  
  };
}

export {
    insertVacation,
    getVacation,
    getVacations,
    deleteVacation,
    updateVacation
  }