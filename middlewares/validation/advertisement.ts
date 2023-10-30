import { check } from 'express-validator';
import {validatorMiddleware} from '../../middlewares/validationMiddleware/validatorMiddleware.js';


const createAdvertisementValidator = [
    check('title')
        .notEmpty()
        .withMessage('title required')
        .isLength({ min: 5})
        .withMessage('Too short title')
        .isLength({ max: 50})
        .withMessage('Too long title'),
    check('content')
        .notEmpty()
        .withMessage('content required'),
    validatorMiddleware
];

const deleteAdvertisementValidator = [
    check('id')
      .notEmpty()
      .withMessage('id required')
      .isNumeric()
      .withMessage("id is a numeric value"),
      validatorMiddleware
];

const getAdvertisementValidator = [
    check('id')
      .notEmpty()
      .withMessage('id required')
      .isNumeric()
      .withMessage("id is a numeric value"),
      validatorMiddleware
];

const updateAdvertisementValidator = [
    check('id')
        .notEmpty()
        .withMessage('id required')
        .isNumeric()
        .withMessage("id is a numeric value"),
        check('title')
        .optional()
        .isLength({ min: 5})
        .withMessage('Too short title')
        .isLength({ max: 50})
        .withMessage('Too long title'),
    check('content')
        .optional(),
    validatorMiddleware,
];
    export {
        createAdvertisementValidator,
        deleteAdvertisementValidator,
        getAdvertisementValidator,
        updateAdvertisementValidator
    }