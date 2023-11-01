import express from 'express';
import { deleteAdvertisement, getAdvertisement, getAdvertisements, insertAdvertisement, updateAdvertisement } from '../controllers/advertisement.js';
import { Advertisement } from '../db/entities/Advertisement.js';
import { createAdvertisementValidator, deleteAdvertisementValidator, getAdvertisementValidator, updateAdvertisementValidator } from '../middlewares/validation/advertisement.js';
import { allowedTo, authenticate } from '../middlewares/auth/authenticate.js';



var router = express.Router();

router.post('/',authenticate,allowedTo('manager'),createAdvertisementValidator, (req: express.Request, res: express.Response, next: express.NextFunction) => {
    console.log("here")
    console.log(res.locals.employee.id)
    console.log(req.body)
    insertAdvertisement(req.body).then((data) => {
      res.status(201).send(data)
    }).catch(err => {
      console.error(err);
      res.status(500).send(err);
    });
});

router.get('/advertisement',authenticate,allowedTo('manager'),getAdvertisementValidator,(req: express.Request, res: express.Response, next: express.NextFunction) => {
    getAdvertisement(req.body.id).then((data) => {
      if(data ===1){
        res.send("advertisement not found!")
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

router.get('/advertisements',authenticate,allowedTo('manager'),(req: express.Request, res: express.Response, next: express.NextFunction) => {
      getAdvertisements(req.body).then((data) => {
        if(data ===1){
          res.send("there is no advertisements posted yet!")
        }else if(data === 0){
            res.send("something went wrong")
          }else
        res.send(data)
      }).catch(err => {
        console.error(err);
        res.status(500).send(err);
      });
});

router.delete('/',authenticate,allowedTo('manager'),deleteAdvertisementValidator,(req: express.Request, res: express.Response, next: express.NextFunction) => {
        deleteAdvertisement(req.body.id).then((data) => {
          if(data ===1){
            res.send("advertisement not found")
          }else
          res.send(data)
        }).catch(err => {
          console.error(err);
          res.status(500).send(err);
        });
});

router.put('/',authenticate,allowedTo('manager'),updateAdvertisementValidator,async (req: express.Request, res: express.Response, next: express.NextFunction) => {
    const adv = await Advertisement.findOneBy({id:req.body.id});
    if(adv){
      updateAdvertisement(req.body).then((data) => {
        if(data === 2){
          res.send("something went wrong, when saving the advertisement request")
        }
       else if(data === 1){
          res.send("advertisement not found")
        }else if(data){res.send(data)}
        else{
          res.send("something went wrong")} 
         
      }).catch(err => {
        console.error(err);
        res.status(500).send(err);
      });
    }else {
      res.send("advertisement not found");
    }

});



  export default router;
