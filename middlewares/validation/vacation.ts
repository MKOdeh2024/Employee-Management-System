import express from 'express';
import { check, body, validationResult } from 'express-validator';
import {validatorMiddleware} from '../../middlewares/validationMiddleware/validatorMiddleware.js';


const createVacationValidator = [
    check('suggestionDate')
        .notEmpty()
        .withMessage('Suggestion date required')
        .isDate({format: 'YYYY-MM-DD' })
        .withMessage('Suggestion date should be of type date')
        .custom((value) => {
            var ToDate = new Date();
        if (new Date(value).getTime() <= ToDate.getTime()) {
            return false;
        }return true;})
        .withMessage("The Date must be Bigger than today date"),
        
    check('reason')
        .notEmpty()
        .withMessage('reason required'),
    check('duration')
        .notEmpty()
        .withMessage('Duration is required')
        .isNumeric()
        .withMessage("Duration is a numeric value")
        .custom((value) => {
            if(value < 1||value >7){
                return false;
            }return true;
        })
        .withMessage('The number of vacation days is a maximum of 7 days, and a minimum of one day'),
    validatorMiddleware,
];

const deleteVacationValidator = [
    check('id')
      .notEmpty()
      .withMessage('id required')
      .isNumeric()
      .withMessage("id is a numeric value"),
      validatorMiddleware
];

const getVacationValidator = [
    check('id')
      .notEmpty()
      .withMessage('id required')
      .isNumeric()
      .withMessage("id is a numeric value"),
      validatorMiddleware
];

const updateVacationValidator = [
    check('id')
        .notEmpty()
        .withMessage('id required')
        .isNumeric()
        .withMessage("id is a numeric value"),
    check('suggestionDate')
        .optional()
        .isDate({ format: 'YYYY-MM-DD' })
        .withMessage('Suggestion date should be of type date')
        .custom((value) => {
            var ToDate = new Date();
        if (new Date(value).getTime() <= ToDate.getTime()) {
            return false;
        }return true;})
        .withMessage("The Date must be Bigger than today date"),
    check('reason')
        .optional(),
    check('duration')
        .optional()
        .isNumeric()
        .withMessage("Duration is a numeric value")
        .custom((value) => {
            if(value < 1||value >7){
                return false;
            }return true;
        })
        .withMessage('The number of vacation days is a maximum of 7 days, and a minimum of one day'),
    validatorMiddleware,
];
    export {
        createVacationValidator,
        deleteVacationValidator,
        getVacationValidator,
        updateVacationValidator
    }