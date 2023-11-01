import { COMPLAINT } from "../@types/complaint.js";
import { EMPLOYEE } from "../@types/employee.js";
import { Complaint } from "../db/entities/Complaint.js";


const insertComplaint = async (empId:number,payload: COMPLAINT.Item) => {
  try {
    // console.log(employeeId)
    // console.log(payload)
    const complaint = new Complaint();
    let time = new Date().getTime();
    let date = new Date(time);
    complaint.date = new Date(date);
    complaint.subject = payload.subject;
    complaint.content = payload.content;
    complaint.employee=empId;
    console.log(complaint)
    await complaint.save();
    return complaint;
  } catch (error) {
    throw ("Something went wrong , can't create complaint " + error);
  }
}

const getComplaints = async (empId: number,payload:EMPLOYEE.paging) => {
  try {
    const page = parseInt(payload.page)||1;
    const pageSize = parseInt(payload.pageSize)||10;
    const [complaints, total] = await Complaint.findAndCount({
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

const getComplaint = async (empId: number, complaintId: number) => {
  try {
    const complaint = await Complaint.findOne({ where: { employee: empId, id: complaintId } });
    if (complaint) {
      delete complaint["employee"];
      return complaint;
    }
    else
      return 1;
  } catch (error) {
    return 0;
  }
};

const deleteComplaint = async (complaintId: number, empId: number) => {
  try {
    const complaint = await Complaint.delete({ id: complaintId, employee: empId });
    if (complaint.affected != 0) {
      return complaint;
    }
    else
      return 1;
  } catch (error) {
    return 0;

  };
}

const updateComplaint = async (empId: number, payload: COMPLAINT.updatecomplaint) => {
  try {
    const complaint = await Complaint.findOneBy({ id: payload.id, employee: empId });
    console.log(complaint)
    if (complaint) {
      complaint.subject = payload.subject || complaint.subject;
      complaint.date = new Date(payload.date || complaint.date)
      complaint.content = payload.content || complaint.content;
      console.log(complaint)
      const result = await complaint.save();
      if (result) {
        return result;
      } else {
        return 2;
      }
    } else
      return 1;

  } catch (error) {
    console.log(error)
    return 0;

  };
}

export {
  insertComplaint,
  getComplaint,
  getComplaints,
  deleteComplaint,
  updateComplaint
}
