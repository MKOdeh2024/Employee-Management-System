import express from 'express';
import { deleteAdvertisement, getAdvertisement, getAdvertisements, insertAdvertisement, updateAdvertisement } from '../controllers/advertisement.js';
import { Advertisement } from '../db/entities/Advertisement.js';
import { createAdvertisementValidator, deleteAdvertisementValidator, getAdvertisementValidator, updateAdvertisementValidator } from '../middlewares/validation/advertisement.js';



var router = express.Router();

// Route for creating an advertisement
router.post('/', createAdvertisementValidator, (req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.log("here");
  console.log(res.locals.employee.id);
  console.log(req.body);
  insertAdvertisement(req.body).then((data) => {
    res.status(201).send(data);
  }).catch(err => {
    console.error(err);
    res.status(500).send(err);
  });
});

// Route for retrieving a specific advertisement
router.get('/advertisement', getAdvertisementValidator, (req: express.Request, res: express.Response, next: express.NextFunction) => {
  getAdvertisement(req.body.id).then((data) => {
    if(data === 1){
      res.send("advertisement not found!");
    } else if(data === 0){
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

// Route for retrieving all advertisements
router.get('/advertisements', (req: express.Request, res: express.Response, next: express.NextFunction) => {
    getAdvertisements().then((data) => {
      if(data === 1){
        res.send("there is no advertisements posted yet!");
      } else if(data === 0){
          res.send("something went wrong");
        } else {
          res.send(data);
        }
    }).catch(err => {
      console.error(err);
      res.status(500).send(err);
    });
});

// Route for deleting an advertisement
router.delete('/', deleteAdvertisementValidator, (req: express.Request, res: express.Response, next: express.NextFunction) => {
      deleteAdvertisement(req.body.id).then((data) => {
        if(data === 1){
          res.send("advertisement not found");
        } else {
          res.send(data);
        }
      }).catch(err => {
        console.error(err);
        res.status(500).send(err);
      });
});

// Route for updating an advertisement
router.put('/', updateAdvertisementValidator, async (req: express.Request, res: express.Response, next: express.NextFunction) => {
  const adv = await Advertisement.findOneBy({id: req.body.id});
  if(adv){
    updateAdvertisement(req.body).then((data) => {
      // Handle different update scenarios
      // ...
    }).catch(err => {
      console.error(err);
      res.status(500).send(err);
    });
  } else {
    res.send("advertisement not found");
  }
});




  export default router;
