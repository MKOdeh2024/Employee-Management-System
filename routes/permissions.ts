import express from 'express';
import {  assignPermission, insertPermission } from '../controllers/permission.js';
import { authorize } from '../middlewares/auth/authorize.js';
import { allowedTo, authenticate } from '../middlewares/auth/authenticate.js';
var router = express.Router();



router.post('/permission',authenticate,allowedTo('manager'), (req, res, next) => {
  insertPermission(req.body).then((data) => {
    if(data ===1){
      res.send("something went wrong , when creating permission")
    }else if (data===0){
      res.send("permission should be uniqe")
    }else 
    res.status(201).send(data)
  }).catch(err => {
    console.error(err);
    res.status(500).send(err);
  });
});


router.post('/assignPermission',authenticate,allowedTo('manager'),(req, res, next) => {
  assignPermission(req.body).then((data) => {
    res.status(201).send(data)
  }).catch(err => {
    console.error(err);
    res.status(500).send(err);
  });
});


export default router;

