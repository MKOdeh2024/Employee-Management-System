import { check } from 'express-validator';
import {validatorMiddleware} from '../../middlewares/validationMiddleware/validatorMiddleware.js';

const createSectionValidator = [
    check('name')
        .notEmpty()
        .withMessage('section name required')
        .isLength({ min: 4})
        .withMessage('Too short section name ')
        .isLength({ max: 50})
        .withMessage('Too long name'),
    validatorMiddleware
];

const deleteSectionValidator = [
    check('id')
      .notEmpty()
      .withMessage('id required')
      .isNumeric()
      .withMessage("id is a numeric value"),
      validatorMiddleware
];

const getSectionValidator = [
    check('id')
      .notEmpty()
      .withMessage('id required')
      .isNumeric()
      .withMessage("id is a numeric value"),
      validatorMiddleware
];

const updateSectionValidator = [
    check('id')
        .notEmpty()
        .withMessage('id required')
        .isNumeric()
        .withMessage("id is a numeric value"),
    check('name')
        .optional()
        .isLength({ min: 4})
        .withMessage('Too short section name')
        .isLength({ max: 50})
        .withMessage('Too long name'),
    validatorMiddleware,
];
export {
    createSectionValidator,
    deleteSectionValidator,
    getSectionValidator,
    updateSectionValidator
}