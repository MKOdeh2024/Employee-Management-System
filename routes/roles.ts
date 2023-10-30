import express from 'express';
import {assignRole, insertRole} from '../controllers/role.js';
import { authorize } from '../middlewares/auth/authorize.js';
import { allowedTo, authenticate } from '../middlewares/auth/authenticate.js';
import { assignRoleValidator, createRoleValidator } from '../middlewares/validation/role.js';
var router = express.Router();


router.post('/role',authenticate,allowedTo('manager'),createRoleValidator,(req: express.Request, res: express.Response, next: express.NextFunction) => {
  insertRole(req.body).then((data) => {
    res.status(201).send(data)
  }).catch(err => {
    console.error(err);
    res.status(500).send(err);
  });
});

router.post('/assignRole',authenticate,allowedTo('manager'),assignRoleValidator, (req: express.Request, res: express.Response, next: express.NextFunction) => {
  if(req.body.role === 'manager' ||req.body.role === 'sectionManager' ||req.body.role === 'admin' ){
      res.send(`you can't assign this role : ${req.body.role}`)
  }else {
    assignRole(req.body).then((data) => {
      res.status(201).send(data)
    }).catch(err => {
      console.error(err);
      res.status(500).send(err);
    });
  }
});

export default router;
