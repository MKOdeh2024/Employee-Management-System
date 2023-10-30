import { LEAVE } from "../@types/leavePermission.js";
import { Employee } from "../db/entities/Employee.js";
import { LeavePermission, LeavePermissionState } from "../db/entities/LeavePermission.js";
import express from 'express'

const insertLeavePermission = async (employeeId:number,payload: LEAVE.Item) => {
    try {
        console.log(employeeId)
        console.log(payload)

    const leavePermission =new LeavePermission();
    let time = new Date().getTime();
    let date = new Date(time);
    leavePermission.date = new Date(date);
    leavePermission.status ="waiting";
    leavePermission.duration = payload.duration;
    leavePermission.reason = payload.reason;
    leavePermission.leaveDate=payload.leaveDate;
    leavePermission.leaveHour = payload.leaveHour;
    leavePermission.employee = employeeId;
    console.log(leavePermission)
    await leavePermission.save();
    return leavePermission;
  } catch (error) {
    throw ("Something went wrong , can't create leave permission "+error);
  }
}

const getLeavePermissions = async (employeeId:number) => {
    const empId = employeeId;
    try {
      const leavePermissions = await LeavePermission.find({where :{employee:empId},order:{id: "ASC"}})
      if(leavePermissions){
        const leavePermission = leavePermissions.map(({employee, ...rest}) => {
          return rest;
        });
        return leavePermission;
      }
      else 
        return 1;
    } catch (error) {
      return 0;
    }
};

const getLeavePermission = async (empId:number,leaveId:number) => {
    try {
      const leavePermission =await LeavePermission.findOne({where:{id:leaveId,employee:empId}});
      if(leavePermission){
        delete leavePermission["employee"];
        return leavePermission;
      }
      else 
        return 1;
    } catch (error) {
      return 0;
    }
};

const deleteLeavePermission = async (employeeId:number, leaveId:number) => {
    const empId = employeeId;
    try {
      const leavePermission =await LeavePermission.delete({id:leaveId,employee:empId,status:"waiting"});
      if(leavePermission.affected !=0){
        return leavePermission;
      }
      else 
        return 1;
    } catch (error) {
      return 0;
  
  };
}

const updateLeavePermission= async (employeeId:number,payload:LEAVE.updateLeavePermission) => {

    const leaveId = payload.id;
    const empId = employeeId;
    try {
      const leavePermission = await LeavePermission.findOneBy({id:leaveId,employee:empId,status:"waiting"});
      console.log(leavePermission)
        if(leavePermission){
            leavePermission.duration =payload.duration || leavePermission.duration;
            leavePermission.leaveDate = payload.leaveDate || leavePermission.leaveDate;
            leavePermission.reason = payload.reason || leavePermission.reason;
            leavePermission.leaveHour = payload.leaveHour || leavePermission.leaveHour;
            leavePermission.date=new Date(payload.date || leavePermission.date) ;
          console.log(leavePermission)
          const result = await leavePermission.save();
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

const UpdateLeavePermissionStatus = async (permissionId:number,status:string) => {
    const leavePermission = await  LeavePermission.findOneBy({id:permissionId});
    if(leavePermission){
      if(leavePermission.status ==="waiting"){
        const employee = await Employee.findOneBy({id:Number(leavePermission.employee!.id)});
        if(employee){
          console.log(employee.vacationDays)
          const hours = employee.leaveHours + leavePermission.duration;
          if(hours>=8 && status ==="accepted"){
            if(employee.vacationDays === 0){
              leavePermission.status ='rejected';
              leavePermission.save()
              .then(result =>{
                if(result){
                  return 8;
                }
                else return 0;
              }).catch(err => {
                console.log(err.message);
                return;
              })
              
            }
            else{
              const HoursDifference = hours-8;
            var vacationDays =employee.vacationDays;
            vacationDays--;
            employee.leaveHours =HoursDifference;
            employee.vacationDays=vacationDays;
            employee.save()
            .then(async result => {
              if(result){
                leavePermission.status ='accepted';
                const updated = await leavePermission.save()
                if(updated){
                  return 8;
                }
                else return 0;
              }
              else
                return 2;
            }).catch(err => {
              console.log(err.message);
              return;
            })
            }
          }
          else if(hours < 8 ){
            employee.leaveHours=hours;
            console.log(employee.leaveHours)
            const result = await employee.save()
            console.log(result)
            if(result){
                
                leavePermission.status =status;
                const updated = await leavePermission.save()
                if(updated){
                  return 8;
                }
                else return 0;
              }
              else
              return 2;
            
          }
          else if(hours>=8 && status==="rejected"){
            leavePermission.status=status;
            leavePermission.save()
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
          else return 3;
        }else return 2;
      }else return 1;
    }else return 0;
};


export {
    insertLeavePermission,
    getLeavePermission,
    getLeavePermissions,
    deleteLeavePermission,
    updateLeavePermission,
    UpdateLeavePermissionStatus
  }