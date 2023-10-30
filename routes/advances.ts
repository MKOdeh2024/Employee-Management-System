import express from 'express';
import { allowedTo, authenticate } from '../middlewares/auth/authenticate.js';
import { authorize } from '../middlewares/auth/authorize.js';
import { UpdateAdvanceStatus, deleteAdvane, getAdvance, getAdvances, insertExceptionalAdvance, insertNormalAdvance, updateExceptionalAdvane, updateNormalAdvane } from '../controllers/advance.js';
import { Advance } from '../db/entities/Advance.js';
import { createExceptionalAdvanceValidator, createNormalAdvanceValidator, deleteAdvacneValidator, getAdvacneValidator, updateExceptionalAdvanceValidator, updateNormalAdvanceValidator } from '../middlewares/validation/advance.js'

var router = express.Router();

router.post('/normal',authenticate,authorize('post_advacne'),createNormalAdvanceValidator,(req: express.Request, res: express.Response, next: express.NextFunction) => {
  // console.log(res.locals.employee.id);
  console.log(req.body);
  insertNormalAdvance(res.locals.employee.id, req.body).then((result) => {
    res.send(result)
  }).catch(err => {
    console.error(err);
    res.status(500).send(err);
  });
});

router.post('/exceptional',authenticate,authorize('post_advacne'),createExceptionalAdvanceValidator, (req: express.Request, res: express.Response, next: express.NextFunction) => {
  insertExceptionalAdvance(res.locals.employee.id, req.body).then((result) => {
    res.send(result)
  }).catch(err => {
    console.error(err);
    res.status(500).send(err);
  });
});

router.get('/advance',authenticate,authorize('get_advacne'), getAdvacneValidator, (req: express.Request, res: express.Response, next: express.NextFunction) => {
  getAdvance(res.locals.employee.id, req.body.id).then((data) => {
    if (data === 1) {
      res.send("please enter the id of the advance correctly!")
    } else
      res.send(data)
  }).catch(err => {
    console.error(err);
    res.status(500).send(err);
  });
});

router.get('/advances',authenticate,authorize('get_allAdvacne'), (req: express.Request, res: express.Response, next: express.NextFunction) => {
  getAdvances(res.locals.employee.id,req.body).then((data) => {
    if (data === 1) {
      res.send("there is no advances for you")
    } else
      res.send(data)
  }).catch(err => {
    console.error(err);
    res.status(500).send(err);
  });
});

router.delete('/',authenticate,authorize('delete_advacne'), deleteAdvacneValidator, (req: express.Request, res: express.Response, next: express.NextFunction) => {
  deleteAdvane(res.locals.employee.id, req.body.id).then((data) => {
    if (data === 1) {
      res.send("advance not found")
    } else
      res.send(data)
  }).catch(err => {
    console.error(err);
    res.status(500).send(err);
  });
});

router.put('/normal',authenticate,authorize('update_advacne'), updateNormalAdvanceValidator, async (req: express.Request, res: express.Response, next: express.NextFunction) => {
  const adv = await Advance.findOneBy({ id: req.body.id });
  if (adv) {
    updateNormalAdvane(res.locals.employee.id, req.body).then((data) => {
      if (data === 3) {
        res.send("thats not an exeptional advance")
      }
      else if (data === 2) {
        res.send("something went wrong, when saving the advance")
      }
      else if (data === 1) {
        res.send("advance not found")
      } else if (data) { res.send(data) }
      else {
        res.send("something went wrong")
      }

    }).catch(err => {
      console.error(err);
      res.status(500).send(err);
    });
  } else {
    res.send("advance not found");
  }

});

router.put('/exceptional',authenticate,authorize('update_advacne'), updateExceptionalAdvanceValidator, async (req: express.Request, res: express.Response, next: express.NextFunction) => {
  const adv = await Advance.findOneBy({ id: req.body.id });
  if (adv) {
    updateExceptionalAdvane(res.locals.employee.id, req.body).then((data) => {
      if (data === 3) {
        res.send("thats not an exeptional advance")
      }
      else if (data === 2) {
        res.send("something went wrong, when saving the advance")
      }
      if (data === 1) {
        res.send("advance not found")
      } else if (data) { res.send(data) }
      else {
        res.send("something went wrong")
      }

    }).catch(err => {
      console.error(err);
      res.status(500).send(err);
    });
  } else {
    res.send("advance not found");
  }

});

router.put('/updateStatus',authenticate,allowedTo('manager'),async (req: express.Request, res: express.Response, next: express.NextFunction) => {
  if (req.body.status==="accepted"||req.body.status === "rejected"){
    const leave = await Advance.findOneBy({id:req.body.id});
    if(leave){
      UpdateAdvanceStatus(req.body.id,req.body.status).then((data) => {
        
        if (data === 2) {
          res.send("something went wrong, when saving the advance")
        }
        if (data === 1) {
          res.send("The advance has been answered previously")
        } else if (data) { res.json({data:data,msg:"advance updated"}) }
        else {
          res.send("advance not found")
        }
        }).catch(err => {
          res.status(500).send(err);
        });
      }else {
      res.send("advance not found")
      }
  }else res.send("Enter the status correctly");
});



export default router;
