import express from 'express';
import { deleteEmployee, getEmployee, getEmployees, getPersonalInformation, insertEmployee, updateEmployee, } from '../controllers/employee.js';
import {login} from "../controllers/auth.js"
import { allowedTo, authenticate } from '../middlewares/auth/authenticate.js';
import { authorize } from '../middlewares/auth/authorize.js';
import { Section } from '../db/entities/Section.js';
import { Employee } from '../db/entities/Employee.js';

var router = express.Router();

router.post('/login', (req, res) => {
    const email = req.body.email;
    const password = req.body.password;
    console.log(email,password)
    login(email, password)
      .then(data => {
        res.json({token:data});
      })
      .catch(err => {
        res.status(401).send(err);
      })
  });
  



  

  export default router;