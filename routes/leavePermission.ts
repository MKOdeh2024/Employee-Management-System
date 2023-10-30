import express from 'express';
import { getLeavePermission, getLeavePermissions, insertLeavePermission,deleteLeavePermission,updateLeavePermission, UpdateLeavePermissionStatus } from '../controllers/leavePermission.js';
import { LeavePermission } from '../db/entities/LeavePermission.js';
import { createLeavePermissionValidator, deleteLeavePermissionValidator, getLeavePermissionValidator, updateLeavePermissionValidator } from '../middlewares/validation/leavePermission.js';
import { allowedTo, authenticate } from '../middlewares/auth/authenticate.js';
import { authorize } from '../middlewares/auth/authorize.js';



var router = express.Router();

router.post('/',authenticate,authorize('post_leavePermission'),createLeavePermissionValidator, (req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.log(req.body);
    insertLeavePermission(res.locals.employee.id,req.body).then((data) => {
      res.status(201).send(data)
    }).catch(err => {
      console.error(err);
      res.status(500).send(err);
    });
});

router.get('/leavePermission',authenticate,authorize('get_leavePermission'),getLeavePermissionValidator,(req: express.Request, res: express.Response, next: express.NextFunction) => {
    getLeavePermission(res.locals.employee.id,req.body.id).then((data) => {
      if(data ===1){
        res.send("leavePermission not found!")
      }else if(data === 0){
        res.send("something went wrong")
      }else
      res.send(data)
    }).catch(err => {
        console.log("here")
      console.error(err);
      res.status(500).send(err);
    });
});

router.get('/leavePermissions',authenticate,authorize('get_allLeavePermission'),(req: express.Request, res: express.Response, next: express.NextFunction) => {
      getLeavePermissions(res.locals.employee.id).then((data) => {
        if(data ===1){
          res.send("there is no leavePermission requests for you")
        }else if(data === 0){
            res.send("something went wrong")
          }else
        res.send(data)
      }).catch(err => {
        console.error(err);
        res.status(500).send(err);
      });
});

router.delete('/',authenticate,authorize('delete_leavePermission'),deleteLeavePermissionValidator,(req: express.Request, res: express.Response, next: express.NextFunction) => {
    deleteLeavePermission(res.locals.employee.id,req.body.id).then((data) => {
      if(data === 1){
        res.send("leavePermission not found")
      }else
      res.send("leave permission deleted")
    }).catch(err => {
      console.error(err);
      res.status(500).send(err);
    });
  });

  router.put('/',authenticate,authorize('update_leavePermission'),updateLeavePermissionValidator,async (req: express.Request, res: express.Response, next: express.NextFunction) => {
    const leave = await LeavePermission.findOneBy({id:req.body.id});
    if(leave){
      updateLeavePermission(res.locals.employee.id,req.body).then((data) => {
        if(data === 2){
          res.send("something went wrong, when saving the leave permission request")
        }
       else if(data === 1){
          res.send("leave permission request not found")
        }else if(data){res.send(data)}
        else{
          res.send("something went wrong")} 
         
      }).catch(err => {
        console.error(err);
        res.status(500).send(err);
      });
    }else {
      res.send("eave permission request not found");
    }
});

router.put('/updateStatus',authenticate,allowedTo('manager'),async (req: express.Request, res: express.Response, next: express.NextFunction) => {
  if (req.body.status==="accepted"||req.body.status === "rejected"){
    const leave = await LeavePermission.findOneBy({id:req.body.id});
    if(leave){
      UpdateLeavePermissionStatus(req.body.id,req.body.status).then((data) => {
        if(data === 3){
          res.send("leavePermission not found")
        }else if(data === 2){
          res.send("leavePermission not found")
        }else if(data === 1){
          res.send("leavePermission not found")
        }else
        res.send("leave permission deleted")
        }).catch(err => {
          console.log("here2")
          res.status(500).send(err);
        });
      }else {
      res.send("leave permission not found")
      }
  }else res.send("Enter the status correctly");
});



  export default router;
