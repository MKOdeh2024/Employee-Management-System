import express from 'express';
import { getEmployee, insertEmployee, } from '../controllers/employee.js';
import {login} from "../controllers/employee.js"
import { authenticate } from '../middlewares/auth/authenticate.js';
import { authorize } from '../middlewares/auth/authorize.js';
import { deleteAdvane, getAdvance, getAdvances, insertExceptionalAdvance, insertNormalAdvance, updateExceptionalAdvane, updateNormalAdvane } from '../controllers/advance.js';
import { Advance } from '../db/entities/Advance.js';


var router = express.Router();

router.post('/',(req, res, next) => {
  // console.log(res.locals.employee.id);
  console.log(req.body);
    if(req.body.type === 'normal'){
        insertNormalAdvance(res.locals.employee.id,req.body).then((result)=>{
            res.send(result)
        }).catch(err => {
            console.error(err);
            res.status(500).send(err);
          });
    }else if (req.body.type === 'exceptional'){
        insertExceptionalAdvance(res.locals.employee.id,req.body).then((result)=>{
            res.send(result)
        }).catch(err => {
            console.error(err);
            res.status(500).send(err);
          });
    }else {
        res.send("please enter type correctly!");
    }
});

router.get('/advance',(req, res, next) => {
  getAdvance(res.locals.employee.id,req.body.id).then((data) => {
    if(data ===1){
      res.send("please enter the id of the advance correctly!")
    }else
    res.send(data)
  }).catch(err => {
    console.error(err);
    res.status(500).send(err);
  });
});


router.get('/advances',(req, res, next) => {
    getAdvances(res.locals.employee.id).then((data) => {
      if(data ===1){
        res.send("there is no advances for you")
      }else
      res.send(data)
    }).catch(err => {
      console.error(err);
      res.status(500).send(err);
    });
  });


  router.delete('/',(req, res, next) => {
    deleteAdvane(res.locals.employee.id,req.body.id).then((data) => {
      if(data ===1){
        res.send("advance not found")
      }else
      res.send(data)
    }).catch(err => {
      console.error(err);
      res.status(500).send(err);
    });
  });


  router.put('/normal',(req, res, next) => {
    updateNormalAdvane(res.locals.employee.id,req.body).then((data) => {
      if(data === 1){
        res.send("advance not found")
 
      }else res.send(data)   
     }).catch(err => {
      console.error(err);
      res.status(500).send(err);
    });
  });

  router.put('/exceptional',(req, res, next) => {
    updateExceptionalAdvane(res.locals.employee.id,req.body).then((data) => {
      if(data === 1){
        res.send("advance not found")
      }else if(data){res.send(data)}
      else res.send("not found") 
       
    }).catch(err => {
      console.error(err);
      res.status(500).send(err);
    });
  });








export default router;
