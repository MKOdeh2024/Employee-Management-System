import express from 'express';
import { deleteEmployee, getEmployee, getEmployees, getPersonalInformation, insertAdmin, insertEmployee, insertManager, updateEmployee, } from '../controllers/employee.js';
import {login} from "../controllers/auth.js"
import { allowedTo, authenticate } from '../middlewares/auth/authenticate.js';
import { authorize } from '../middlewares/auth/authorize.js';
import { Section } from '../db/entities/Section.js';
import { Employee } from '../db/entities/Employee.js';
import {createAdminValidator, createManagerValidator} from '../middlewares/validation/employee.js'
import { setUp } from '../middlewares/setup/setup.js';

var router = express.Router();

router.post('/setup',setUp)

router.post('/manager',authenticate,allowedTo('admin'), createManagerValidator, async (req: express.Request, res: express.Response, next: express.NextFunction) => {
    insertManager(req.body).then((data) => {
        if(data === 0){
            res.send("there is no 'manager' role on system roles ")
        }else if(data === 1){
            res.send("there is already manager on the system")
        }else
            res.json({info:data,msg:"manager account created"});
    }).catch(err => {
      console.error(err);
      res.status(500).send(err);
    });
})

export default router;
