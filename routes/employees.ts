import express from 'express';
import { getEmployee, insertEmployee, } from '../controllers/employee.js';
import {login} from "../controllers/employee.js"
import { authenticate } from '../middlewares/auth/authenticate.js';
import { authorize } from '../middlewares/auth/authorize.js';
import { Section } from '../db/entities/Section.js';


var router = express.Router();

router.post('/',async (req, res, next) => {
  const section = await Section.findOneBy({id:req.body.section});
  if(section){
    insertEmployee(req.body).then((data) => {
      res.send(data)
    }).catch(err => {
      console.error(err);
      res.status(500).send(err);
    });
  }else {res.send("please enter the section name correctly!")}

});

router.get('/employee',(req, res, next) => {
  getEmployee(req.body.id).then((data) => {
    res.send(data)
  }).catch(err => {
    console.error(err);
    res.status(500).send(err);
  });
});

router.get('/employees',(req, res, next) => {
  getEmployee(req.body.id).then((data) => {
    res.send(data)
  }).catch(err => {
    console.error(err);
    res.status(500).send(err);
  });
});

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
