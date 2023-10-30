import { VACATION } from "../@types/vacation.js";
import { Employee } from "../db/entities/Employee.js";
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
const UpdateVacationStatus = async (vacationId:number,status:string) => {
  const vacation = await  Vacation.findOneBy({id:vacationId});
  if(vacation){
    if(vacation.status ==="waiting"){
      const employee = await Employee.findOneBy({id:Number(vacation.employee!.id)});
      if(employee){
        console.log(employee.vacationDays)
        const VacationDays =employee.vacationDays;
        const daysDifference = VacationDays-vacation.duration;
          console.log('here0');
          if(employee.vacationDays === 0){
            console.log(employee.vacationDays)
            vacation.status ='rejected';
            vacation.save()
            .then(result =>{
              if(result){
                return 4;
              }
              else return 0;
            }).catch(err => {
              console.log(err.message);
              return;
            })
            
          }else if(daysDifference < 0){
            vacation.status ='rejected';
            vacation.save()
            .then(result => {
              if(result){
                return 4;
              }
              else
              return 0;
            }).catch(err => {
              console.log(err.message);
              return;
            })
          }
          else if(status==="accepted"){
            vacation.status=status;
            vacation.save()
            .then(async result => {
              if(result){
                employee.vacationDays =employee.vacationDays -vacation.duration;
                employee.save()
                .then(result => {
                  if(result){
                    return 4;
                  }
                  else
                  return 1;
                }).catch(err => {
                  console.log(err.message);
                return;
                })
              }
              else
              return 0;
            })
            .catch(err => {
              console.log(err.message);
              return;
            });
          }
          else{
            vacation.status=status;
            vacation.save()
            .then(result => {
              if(result){
                return 4;
              }
              else
                return 0;
            })
            .catch(err => {
              console.log(err.message);
              return;
            });
          }
      }else return 2;
    }else return 1;
  }else return 0;
};

export {
    insertVacation,
    getVacation,
    getVacations,
    deleteVacation,
    updateVacation,
    UpdateVacationStatus
  }