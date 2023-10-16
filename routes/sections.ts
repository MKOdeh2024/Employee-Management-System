import express from 'express';
import { getEmployee, insertEmployee, } from '../controllers/employee.js';
import {login} from "../controllers/employee.js"
import { authenticate } from '../middlewares/auth/authenticate.js';
import { authorize } from '../middlewares/auth/authorize.js';
import { Section } from '../db/entities/Section.js';
import { insertSection } from '../controllers/section.js';
import { SECTION } from "../@types/section.js";


var router = express.Router();

router.post('/',async (req, res, next) => {
    insertSection(req.body).then((data) => {
      res.send(data)
    }).catch(err => {
      console.error(err);
      res.status(500).send(err);
    });

});

// router.get('/get',(req, res, next) => {
//   getEmployee(req.body.userName).then((data) => {
//     res.send(data)
//   }).catch(err => {
//     console.error(err);
//     res.status(500).send(err);
//   });
// });



export default router;
