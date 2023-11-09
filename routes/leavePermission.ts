import express from 'express';
import { getLeavePermission, getLeavePermissions, insertLeavePermission,deleteLeavePermission,updateLeavePermission } from '../controllers/leavePermission.js';
import { LeavePermission } from '../db/entities/LeavePermission.js';
import { createLeavePermissionValidator, deleteLeavePermissionValidator, getLeavePermissionValidator, updateLeavePermissionValidator } from '../middlewares/validation/leavePermission.js';



var router = express.Router();

// Route for creating a leave permission request
router.post('/', createLeavePermissionValidator, (req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.log(req.body);
  insertLeavePermission(res.locals.employee.id, req.body).then((data) => {
    res.status(201).send(data);
  }).catch(err => {
    console.error(err);
    res.status(500).send(err);
  });
});

// Route for retrieving a specific leave permission request
router.get('/leavePermission', getLeavePermissionValidator, (req: express.Request, res: express.Response, next: express.NextFunction) => {
  getLeavePermission(res.locals.employee.id, req.body.id).then((data) => {
    if (data === 1) {
      res.send("leave permission not found!");
    } else if (data === 0) {
      res.send("something went wrong");
    } else {
      res.send(data);
    }
  }).catch(err => {
    console.log("here");
    console.error(err);
    res.status(500).send(err);
  });
});

// Route for retrieving all leave permission requests
router.get('/leavePermissions', (req: express.Request, res: express.Response, next: express.NextFunction) => {
  getLeavePermissions(res.locals.employee.id).then((data) => {
    if (data === 1) {
      res.send("there is no leave permission requests for you");
    } else if (data === 0) {
      res.send("something went wrong");
    } else {
      res.send(data);
    }
  }).catch(err => {
    console.error(err);
    res.status(500).send(err);
  });
});

// Route for deleting a leave permission request
router.delete('/', deleteLeavePermissionValidator, (req: express.Request, res: express.Response, next: express.NextFunction) => {
  deleteLeavePermission(res.locals.employee.id, req.body.id).then((data) => {
    if (data === 1) {
      res.send("leave permission not found");
    } else {
      res.send("leave permission deleted");
    }
  }).catch(err => {
    console.error(err);
    res.status(500).send(err);
  });
});

// Route for updating a leave permission request
router.put('/', updateLeavePermissionValidator, async (req: express.Request, res: express.Response, next: express.NextFunction) => {
  const leave = await LeavePermission.findOneBy({ id: req.body.id });
  if (leave) {
    updateLeavePermission(res.locals.employee.id, req.body).then((data) => {
      // Handle different update scenarios
      // ...
    }).catch(err => {
      console.error(err);
      res.status(500).send(err);
    });
  } else {
    res.send("leave permission request not found");
  }
});


  export default router;
