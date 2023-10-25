import express from 'express';
import { deleteVacation, getVacation, getVacations, insertVacation, updateVacation } from '../controllers/vacation.js';
import { Vacation } from '../db/entities/Vacation.js';
import { createVacationValidator, deleteVacationValidator, getVacationValidator, updateVacationValidator } from '../middlewares/validation/vacation.js';



var router = express.Router();

router.post('/',createVacationValidator, (req: express.Request, res: express.Response, next: express.NextFunction) => {
    insertVacation(res.locals.employee.id,req.body).then((data) => {
      res.status(201).send(data)
    }).catch(err => {
      console.error(err);
      res.status(500).send(err);
    });
});

router.get('/vacation',getVacationValidator,(req: express.Request, res: express.Response, next: express.NextFunction)=> {
    getVacation(res.locals.employee.id,req.body.id).then((data) => {
      if(data ===1){
        res.send("vacation not found!")
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

router.get('/vacations',(req, res, next) => {
      getVacations(res.locals.employee.id).then((data) => {
        if(data ===1){
          res.send("there is no vacations requests for you")
        }else if(data === 0){
            res.send("something went wrong")
          }else
        res.send(data)
      }).catch(err => {
        console.error(err);
        res.status(500).send(err);
      });
});

router.delete('/',deleteVacationValidator,(req: express.Request, res: express.Response, next: express.NextFunction) => {
        deleteVacation(res.locals.employee.id,req.body.id).then((data) => {
          if(data ===1){
            res.send("vacation not found")
          }else
          res.json({data:data, message:"vacation deleted"})
        }).catch(err => {
          console.error(err);
          res.status(500).send(err);
        });
});

router.put('/',updateVacationValidator,async (req: express.Request, res: express.Response, next: express.NextFunction) => {
    const vac = await Vacation.findOneBy({id:req.body.id});
    if(vac){
      updateVacation(res.locals.employee.id,req.body).then((data) => {
        if(data === 2){
          res.send("something went wrong, when saving the vacation request")
        }
        else if(data === 1){
          res.send("vacation not found")
        }else if(data){res.send(data)}
        else{
          res.send("something went wrong")} 
      }).catch(err => {
        console.error(err);
        res.status(500).send(err);
      });
    }else {
      res.send("vacation request not found");
    }
});



  export default router;
