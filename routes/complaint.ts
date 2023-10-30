import express from 'express';
import { getComplaint, getComplaints, insertComplaint, deleteComplaint, updateComplaint, } from '../controllers/complaint.js';
import { createLeavePermissionValidator, deleteLeavePermissionValidator, getLeavePermissionValidator, updateLeavePermissionValidator } from '../middlewares/validation/leavePermission.js';
import { Complaint } from '../db/entities/Complaint.js';
import { authenticate } from '../middlewares/auth/authenticate.js';
import { authorize } from '../middlewares/auth/authorize.js';



var router = express.Router();

router.post('/',authenticate,authorize('post_complaint'), createLeavePermissionValidator, (req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.log(req.body);
  insertComplaint(res.locals.employee.id, req.body).then((data) => {
    res.status(201).send(data)
  }).catch(err => {
    console.error(err);
    res.status(500).send(err);
  });
});

router.get('/complaint',authenticate,authorize('get_complaint'), getLeavePermissionValidator, (req: express.Request, res: express.Response, next: express.NextFunction) => {
  getComplaint(res.locals.employee.id, req.body.id).then((data) => {
    if (data === 1) {
      res.send("complaint not found!")
    } else if (data === 0) {
      res.send("something went wrong")
    } else
      res.send(data)
  }).catch(err => {
    console.log("here")
    console.error(err);
    res.status(500).send(err);
  });
});

router.get('/complaints',authenticate,authorize('get_allComplaint'), (req: express.Request, res: express.Response, next: express.NextFunction) => {
  getComplaints(res.locals.employee.id).then((data) => {
    if (data === 1) {
      res.send("there is no complaint requests for you")
    } else if (data === 0) {
      res.send("something went wrong")
    } else
      res.send(data)
  }).catch(err => {
    console.error(err);
    res.status(500).send(err);
  });
});

router.delete('/',authenticate,authorize('delete_complaint'), deleteLeavePermissionValidator, (req: express.Request, res: express.Response, next: express.NextFunction) => {
  deleteComplaint(res.locals.employee.id, req.body.id).then((data) => {
    if (data === 1) {
      res.send("complaint not found")
    } else
      res.send("complaint deleted")
  }).catch(err => {
    console.error(err);
    res.status(500).send(err);
  });
});

router.put('/',authenticate,authorize('update_complaint'), updateLeavePermissionValidator, async (req: express.Request, res: express.Response, next: express.NextFunction) => {
  const complaint = await Complaint.findOneBy({ id: req.body.id });
  if (complaint) {
    updateComplaint(res.locals.employee.id, req.body).then((data) => {
      if (data === 2) {
        res.send("something went wrong, when saving the complaint request")
      }
      else if (data === 1) {
        res.send("complaint request not found")
      } else if (data) { res.send(data) }
      else {
        res.send("something went wrong")
      }

    }).catch(err => {
      console.error(err);
      res.status(500).send(err);
    });
  } else {
    res.send("complaint request not found");
  }
});





export default router;
