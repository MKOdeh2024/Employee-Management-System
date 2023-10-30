import express from 'express';
import { check, body, validationResult } from 'express-validator';
import {validatorMiddleware} from '../../middlewares/validationMiddleware/validatorMiddleware.js';

const createComplaintValidator = [
    check('subject')
        .notEmpty()
        .withMessage('subject name required')
        .isLength({ min: 5})
        .withMessage('Too short Subject')
        .isLength({ max: 50})
        .withMessage('Too long Subject'),
    check('content')
        .notEmpty()
        .withMessage('subject name required'),
validatorMiddleware,
];

const deleteComplaintValidator = [
    check('id')
      .notEmpty()
      .withMessage('id required')
      .isNumeric()
      .withMessage("id is a numeric value"),
      validatorMiddleware
];

const getComplaintValidator = [
    check('id')
      .notEmpty()
      .withMessage('id required')
      .isNumeric()
      .withMessage("id is a numeric value"),
      validatorMiddleware
];

const updateComplaintValidator = [
    check('subject')
        .optional()
        .isLength({ min: 5})
        .withMessage('Too short Subject')
        .isLength({ max: 50})
        .withMessage('Too long Subject'),
    check('content')
        .optional(),
validatorMiddleware,
];
    export {
        createComplaintValidator,
        deleteComplaintValidator,
        getComplaintValidator,
        updateComplaintValidator
    }