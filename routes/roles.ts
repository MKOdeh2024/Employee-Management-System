import express from 'express';
import {assignRole, insertRole} from '../controllers/role.js';
import { authorize } from '../middlewares/auth/authorize.js';
import { authenticate } from '../middlewares/auth/authenticate.js';
import { assignRoleValidator, createRoleValidator } from '../middlewares/validation/role.js';
var router = express.Router();


router.post('/role',createRoleValidator,(req: express.Request, res: express.Response, next: express.NextFunction) => {
  insertRole(req.body).then((data) => {
    res.status(201).send(data)
  }).catch(err => {
    console.error(err);
    res.status(500).send(err);
  });
});

router.post('/assignRole',assignRoleValidator, (req: express.Request, res: express.Response, next: express.NextFunction) => {
  assignRole(req.body).then((data) => {
    res.status(201).send(data)
  }).catch(err => {
    console.error(err);
    res.status(500).send(err);
  });
});




export default router;
