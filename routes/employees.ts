import express from 'express';
import { deleteEmployee, getEmployee, getEmployees, getPersonalInformation, insertEmployee, updateEmployee, } from '../controllers/employee.js';
import {login} from "../controllers/employee.js"
import { authenticate } from '../middlewares/auth/authenticate.js';
import { authorize } from '../middlewares/auth/authorize.js';
import { Section } from '../db/entities/Section.js';
import { Employee } from '../db/entities/Employee.js';
import {createEmployeeValidator,updateEmployeeValidator, deleteEmployeeValidator, getEmployeeValidator} from '../middlewares/validation/employee.js'

var router = express.Router();

// Route for creating an employee
router.post('/', createEmployeeValidator, async (req: express.Request, res: express.Response, next: express.NextFunction) => {
  const section = await Section.findOneBy({ id: req.body.section });
  if (section) {
    insertEmployee(req.body).then((data) => {
      res.send(data);
    }).catch(err => {
      console.error(err);
      res.status(500).send(err);
    });
  } else {
    res.send("please enter the section name correctly!");
  }
});

// Route for retrieving a specific employee
router.get('/employee', getEmployeeValidator, (req: express.Request, res: express.Response, next: express.NextFunction) => {
  getEmployee(req.body.id).then((data: any) => {
    res.send(data);
  }).catch(err => {
    console.error(err);
    res.status(500).send(err);
  });
});

// Route for retrieving all employees
router.get('/employees', (req, res, next) => {
  getEmployees().then((data) => {
    res.send(data);
  }).catch(err => {
    console.error(err);
    res.status(500).send(err);
  });
});

// Route for employee login
router.post('/login', (req, res) => {
  const email = req.body.email;
  const password = req.body.password;
  console.log(email, password);
  login(email, password)
    .then(data => {
      res.json({ token: data });
    })
    .catch(err => {
      res.status(401).send(err);
    });
});

// Route for retrieving personal information of the logged-in employee
router.get('/personalInfo', (req, res, next) => {
  getPersonalInformation(res.locals.employee.id).then((Info) => {
    if (Info) {
      res.status(200).json({ Information: Info });
    } else {
      res.send("something went wrong");
    }
  }).catch((err) => {
    res.status(500).send(err.message);
  });
});

// Route for deleting an employee
router.delete('/', deleteEmployeeValidator, (req: express.Request, res: express.Response, next: express.NextFunction) => {
  deleteEmployee(req.body.id).then((data) => {
    if (data === 1) {
      res.send("employee not found");
    } else {
      res.send(data);
    }
  }).catch(err => {
    console.error(err);
    res.status(500).send(err);
  });
});

// Route for updating employee information
router.put('/', updateEmployeeValidator, async (req: express.Request, res: express.Response, next: express.NextFunction) => {
  const emp = await Employee.findOneBy({ id: req.body.id });
  if (emp) {
    updateEmployee(req.body).then((data) => {
      // Handle different update scenarios
      // ...
    }).catch(err => {
      console.error(err);
      res.status(500).send(err);
    });
  } else {
    res.send("employee not found");
  }
});



export default router;


