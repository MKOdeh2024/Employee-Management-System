import express from 'express';
import { check, body, validationResult } from 'express-validator';
import {validatorMiddleware} from '../../middlewares/validationMiddleware/validatorMiddleware.js';

const createLeavePermissionValidator = [
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
        .withMessage('The maximum hours for leave permits are 6 hours!'),
    check('leaveHour')
        .notEmpty()
        .withMessage('Leave hour is required')
        .isNumeric()
        .withMessage("Leave hour is a numeric value")
        .custom((value) => {
             if(value >= 8&& value <= 15){
                return true
            }return false;;
        })
        .withMessage('leave hour should be between 8 ,15!')
        .custom((value, { req }) => {
            if((value + req.body.duration)>16 ){
                throw new Error(`You request a leave permission with a number of hours exceeding the required limit, the maximum remaining period for the request to leave is ${16-value}`);
            }return true;
       }),
    check('reason')
        .notEmpty()
        .withMessage('reason required'),
    check('leaveDate')
        .notEmpty()
        .withMessage('leave date is required')
        .isDate({ format: 'YYYY-MM-DD' })
        .withMessage('leave date should be of type date')
        .custom((value) => {
            var ToDate = new Date();
        if (new Date(value).getTime() <= ToDate.getTime()) {
            return false;
        }return true;})
        .withMessage("The Date must be Bigger than today date"),
    validatorMiddleware,
];

const deleteLeavePermissionValidator = [
    check('id')
      .notEmpty()
      .withMessage('id required')
      .isNumeric()
      .withMessage("id is a numeric value"),
      validatorMiddleware
];

const getLeavePermissionValidator = [
    check('id')
      .notEmpty()
      .withMessage('id required')
      .isNumeric()
      .withMessage("id is a numeric value"),
      validatorMiddleware
];

const updateLeavePermissionValidator = [
    check('duration')
        .optional()
        .isNumeric()
        .withMessage("Duration is a numeric value")
        .custom((value) => {
            if(value < 1||value >7){
                return false;
            }return true;
        })
        .withMessage('The maximum hours for leave permits are 6 hours!'),
    check('leaveHour')
        .optional()
        .isNumeric()
        .withMessage("Leave hour is a numeric value")
        .custom((value) => {
            if(value >= 8&& value <= 15){
                return true
            }return false;;
        })
        .withMessage('leave hour should be between 8 ,15!')
        .custom((value, { req }) => {
            if((value + req.body.duration)>16 ){
                throw new Error(`You request a leave permission with a number of hours exceeding the required limit, the maximum remaining period for the request to leave is ${16-value}`);
            }return true;
        }),
        
    check('reason')
        .optional(),
    check('leaveDate')
        .optional()
        .isDate({ format: 'YYYY-MM-DD' })
        .withMessage('leave date should be of type date')
        .custom((value) => {
            var ToDate = new Date();
        if (new Date(value).getTime() <= ToDate.getTime()) {
            return false;
        }return true;})
        .withMessage("The Date must be Bigger than today date"),
    validatorMiddleware,
];
    export {
        createLeavePermissionValidator,
        deleteLeavePermissionValidator,
        getLeavePermissionValidator,
        updateLeavePermissionValidator
    }