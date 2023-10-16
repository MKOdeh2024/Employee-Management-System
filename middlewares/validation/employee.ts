import express from 'express';

const postValidation = (req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) => {
    const values = ['firstName', 'midName', 'lastName', 'password', 'DOB','identification',
    'phoneNumber','email','salary','city','street','role'];
    const employee = req.body;
    const errorList = values.map(key => !employee[key] && `${key} is Required!`).filter(Boolean);
  
    if (errorList.length) {
      res.status(400).send(errorList);
    } else {
      next();
    }
  }

  const getValidation = (req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) => {
    const values = ['id'];
    const employee = req.body;
    const errorList = values.map(key => !employee[key] && `${key} is Required!`).filter(Boolean);
  
    if (errorList.length) {
      res.status(400).send(errorList);
    } else {
      next();
    }
  }

function validateEmployee(operation:string){

if(operation === 'post'){
    postValidation;
}else if(operation === 'get'){
    getValidation;
}
}
export {
  validateEmployee
}

