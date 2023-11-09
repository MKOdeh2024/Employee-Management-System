import express from 'express';
import { authenticate } from '../middlewares/auth/authenticate.js';
import { authorize } from '../middlewares/auth/authorize.js';
import { deleteAdvane, getAdvance, getAdvances, insertExceptionalAdvance, insertNormalAdvance, updateExceptionalAdvane, updateNormalAdvane } from '../controllers/advance.js';
import { Advance } from '../db/entities/Advance.js';
import { createExceptionalAdvanceValidator, createNormalAdvanceValidator, deleteAdvacneValidator, getAdvacneValidator, updateExceptionalAdvanceValidator, updateNormalAdvanceValidator } from '../middlewares/validation/advance.js'

var router = express.Router();

// Route for creating a normal advance
router.post('/normal', createNormalAdvanceValidator, (req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.log(req.body);
  insertNormalAdvance(res.locals.employee.id, req.body).then((result) => {
    res.send(result);
  }).catch(err => {
    console.error(err);
    res.status(500).send(err);
  });
});

// Route for creating an exceptional advance
router.post('/exceptional', createExceptionalAdvanceValidator, (req: express.Request, res: express.Response, next: express.NextFunction) => {
  insertExceptionalAdvance(res.locals.employee.id, req.body).then((result) => {
    res.send(result);
  }).catch(err => {
    console.error(err);
    res.status(500).send(err);
  });
});

// Route for retrieving a specific advance record
router.get('/advance', getAdvacneValidator, (req: express.Request, res: express.Response, next: express.NextFunction) => {
  getAdvance(res.locals.employee.id, req.body.id).then((data) => {
    if (data === 1) {
      res.send("please enter the id of the advance correctly!");
    } else {
      res.send(data);
    }
  }).catch(err => {
    console.error(err);
    res.status(500).send(err);
  });
});

// Route for retrieving all advance records
router.get('/advances', (req: express.Request, res: express.Response, next: express.NextFunction) => {
  getAdvances(res.locals.employee.id).then((data) => {
    if (data === 1) {
      res.send("there is no advances for you");
    } else {
      res.send(data);
    }
  }).catch(err => {
    console.error(err);
    res.status(500).send(err);
  });
});

// Route for deleting an advance record
router.delete('/', deleteAdvacneValidator, (req: express.Request, res: express.Response, next: express.NextFunction) => {
  deleteAdvane(res.locals.employee.id, req.body.id).then((data) => {
    if (data === 1) {
      res.send("advance not found");
    } else {
      res.send(data);
    }
  }).catch(err => {
    console.error(err);
    res.status(500).send(err);
  });
});

// Route for updating a normal advance
router.put('/normal', updateNormalAdvanceValidator, async (req: express.Request, res: express.Response, next: express.NextFunction) => {
  const adv = await Advance.findOneBy({ id: req.body.id });
  if (adv) {
    updateNormalAdvane(res.locals.employee.id, req.body).then((data) => {
      // Handle different update scenarios
      // ...
    }).catch(err => {
      console.error(err);
      res.status(500).send(err);
    });
  } else {
    res.send("advance not found");
  }
});

// Route for updating an exceptional advance
router.put('/exceptional', updateExceptionalAdvanceValidator, async (req: express.Request, res: express.Response, next: express.NextFunction) => {
  const adv = await Advance.findOneBy({ id: req.body.id });
  if (adv) {
    updateExceptionalAdvane(res.locals.employee.id, req.body).then((data) => {
      // Handle different update scenarios
      // ...
    }).catch(err => {
      console.error(err);
      res.status(500).send(err);
    });
  } else {
    res.send("advance not found");
  }
});

export default router;
