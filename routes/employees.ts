import express from 'express';
import { deleteEmployee, findAdvance, findLeavePermission, findVacation, getAllRequests, getEmployee, getEmployees, getEmployeesCounter, getPersonalInformation, getSectionManagers, getSectionRequests, insertEmployee, insertSectionManager, updateEmployee, updatePassword, updatePersonalInformation, } from '../controllers/employee.js';
import { allowedTo, authenticate } from '../middlewares/auth/authenticate.js';
import { authorize } from '../middlewares/auth/authorize.js';
import { Section } from '../db/entities/Section.js';
import { Employee } from '../db/entities/Employee.js';
import { createEmployeeValidator, updateEmployeeValidator, deleteEmployeeValidator, getEmployeeValidator,createSectionManagerValidator} from '../middlewares/validation/employee.js'
import { getLeavePermissionValidator } from '../middlewares/validation/leavePermission.js';
import { getAdvacneValidator } from '../middlewares/validation/advance.js';
import { getVacationValidator } from '../middlewares/validation/vacation.js';

var router = express.Router();

router.post('/', authenticate, allowedTo('manager'), createEmployeeValidator, async (req: express.Request, res: express.Response, next: express.NextFunction) => {
  const section = await Section.findOneBy({ id: req.body.section });
  if (section) {
    insertEmployee(req.body).then((data) => {
      if (data === 0) {
        res.send("enter role correctly")
      } else
        res.send(data)
    }).catch(err => {
      console.error(err);
      res.status(500).send(err);
    });
  } else { res.send("please enter the section name correctly!") }

});

router.post('/sectionManager', authenticate, allowedTo('manager'), createSectionManagerValidator, async (req: express.Request, res: express.Response, next: express.NextFunction) => {
  const section = await Section.findOneBy({ id: req.body.section });
  console.log(section)
  if (section) {
    console.log("here")
    insertSectionManager(req.body).then((data) => {
      if (data === 2) {
        res.send("there is already manager for this section!")
      }else if(data ===1){
        res.send("please enter the section name correctly!") 
      }else if(data===0){
        res.send("please enter the role name correctly!")
      }
       else
        res.send(data)
    }).catch(err => {
      console.error(err);
      res.status(500).send(err);
    });
  } else { res.send("please enter section correctly!") }

});

router.get('/employee', authenticate, allowedTo('manager'), getEmployeeValidator, (req: express.Request, res: express.Response, next: express.NextFunction) => {
  getEmployee(req.body.id).then((data) => {
    res.send(data)
  }).catch(err => {
    console.error(err);
    res.status(500).send(err);
  });
});

router.get('/employees', authenticate, allowedTo('manager'), (req, res, next) => {
  getEmployees(req.body).then((data) => {
    res.send(data)
  }).catch(err => {
    console.error(err);
    res.status(500).send(err);
  });
});

router.get('/getSectionManagers', authenticate, allowedTo('manager'), (req, res, next) => {
  getSectionManagers().then((data) => {
    res.send(data)
  }).catch(err => {
    console.error(err);
    res.status(500).send(err);
  });
});

router.get('/personalInfo', authenticate, authorize('get_personalInfo'), (req, res, next) => {
  getPersonalInformation(res.locals.employee.id).then((Info) => {
    if (Info === 1 || Info === 0) {
      res.send("something went wrong")
    }
    else
      res.status(200).json({ Information: Info });
  }).catch((err) => {
    res.status(500).send(err.message)
  })
});

router.put('/password', authenticate, authorize('post_changePassword'), (req, res, next) => {
  updatePassword(res.locals.employee.id, req.body).then((data) => {
    if (data === 2) {
      res.send("something went wrong when saving new password!")
    } else if (data === 1) {
      res.send("type the old password correctly!")
    } else if (data === 0 || !data) {
      res.send("something went wrong!")
    }
    else
      res.status(200).json({ data: data });
  }).catch((err) => {
    res.status(500).send(err.message)
  })
});

router.put('/personalInfo', authenticate, authorize('update_personalInfo'), (req, res, next) => {
  updatePersonalInformation(res.locals.employee.id, req.body).then((data) => {
    if (data === 2||data===1||data===0||!data) {
      res.send("something went wrong!")
    }
    else
      res.status(200).json({ data: data });
  }).catch((err) => {
    res.status(500).send(err.message)
  })
});

router.get('/leavePermission', authenticate, allowedTo('manager'), getLeavePermissionValidator, (req: express.Request, res: express.Response, next: express.NextFunction) => {
  findLeavePermission(req.body.id).then((data) => {
    if (data) {
      res.send(data)
    } else
    res.send("leavePermission not found!")
  }).catch(err => {
    res.status(500).send(err);
  });
});

router.get('/advacne', authenticate, getAdvacneValidator, (req: express.Request, res: express.Response, next: express.NextFunction) => {
  findAdvance(req.body.id).then((data) => {
    if (data) {
      res.send(data)
    } else
    res.send("advance not found!")
  }).catch(err => {
    res.status(500).send(err);
  });
});

router.get('/vacation', authenticate, getVacationValidator, (req: express.Request, res: express.Response, next: express.NextFunction) => {
  findVacation(req.body.id).then((data) => {
    if (data) {
      res.send(data)
    } else
    res.send("vacation not found!")
  }).catch(err => {
    res.status(500).send(err);
  });
});

router.delete('/', authenticate, allowedTo('manager'), deleteEmployeeValidator, (req: express.Request, res: express.Response, next: express.NextFunction) => {
  if(req.body.id === 1 || req.body.id===2){
    res.send("you can't delete the admin or the manager from the system")
  }else {
    deleteEmployee(req.body.id).then((data) => {
      if (data === 1) {
        res.send("vacation not found")
      } else
        res.send(data)
    }).catch(err => {
      console.error(err);
      res.status(500).send(err);
    });
  }
});

router.put('/', authenticate, allowedTo('manager'), updateEmployeeValidator, async (req: express.Request, res: express.Response, next: express.NextFunction) => {
  const emp = await Employee.findOneBy({ id: req.body.id });
  if (emp) {
    updateEmployee(req.body).then((data) => {
      if (data === 3) {
        res.send("something went wrong, when saving employee information")
      }else if (data === 2) {
        res.send("can't change section manager section")
      }else if (data === 1) {
        res.send("employee not found")
      } else if (data) { res.send(data) }
      else {
        res.send("something went wrong")
      }

    }).catch(err => {
      console.error(err);
      res.status(500).send(err);
    });
  } else {
    res.send("employee not found");
  }

});

router.get('/allRequests', authenticate, allowedTo('manager'), (req, res, next) => {
  getAllRequests().then((data) => {
    if(data){res.send(data)}
    else res.send("something went wrong")
  }).catch(err => {
    res.status(500).send(err);
  });
});

router.get('/allSectionRequests', authenticate, allowedTo('sectionManager'), (req, res, next) => {
  getSectionRequests(res.locals.employee.section).then((data) => {
    if(data){res.send(data)}
    else res.send("something went wrong")
  }).catch(err => {
    res.status(500).send(err);
  });
});



router.get('/employeeCounter', authenticate, allowedTo('manager'), (req, res, next) => {
  getEmployeesCounter().then((data) => {
    if(data){res.send(data)}
    else res.send("there is no employees on system yet")
  }).catch(err => {
    res.status(500).send(err);
  });
});
export default router;


