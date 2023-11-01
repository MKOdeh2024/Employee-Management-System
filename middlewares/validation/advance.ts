import express from 'express';
import { check, body, validationResult } from 'express-validator';
import {validatorMiddleware} from '../../middlewares/validationMiddleware/validatorMiddleware.js';
const validInstallmentValueValues = [100,200,300];


const createExceptionalAdvanceValidator = [
    check('type')
        .notEmpty()
        .withMessage('type required')
        .equals('exceptional')
        .withMessage('type should be "exceptional"'),
    check('suggestionDate')
        .notEmpty()
        .withMessage('suggestionDate required')
        .isDate({ format: 'YYYY-MM-DD' })
        .withMessage('suggestionDate should be of type date'),
    check('reason')
        .notEmpty()
        .withMessage('reason required'),
    check('amount')
        .notEmpty()
        .withMessage('Exceptional advance amount is required')
        .isNumeric()
        .withMessage("Exceptional advance amount is a numeric value")
        .custom((value) => {
        if (value >= 1000 && value <= 1500) {
            return true;
        }
        return false;
        })
        .withMessage('Exceptional advance amount should be between 1000 and 1500'),
        check('installmentValue')
        .notEmpty()
        .withMessage('Advance installment value   is required')
        .isNumeric()
        .withMessage("Advance installment value is a numeric value")
        .isIn(validInstallmentValueValues)
        .withMessage('Exceptional advance amount should be 100 or 200 or 300'),
    validatorMiddleware,
];

const createNormalAdvanceValidator = [
    check('type')
        .notEmpty()
        .withMessage('type required')
        .equals('normal')
        .withMessage('type should be "normal"'),
    check('suggestionDate')
      .notEmpty()
      .withMessage('suggestionDate required')
      .isDate({ format: 'YYYY-MM-DD' })
      .withMessage('suggestionDate should be of type date'),
    check('amount')
      .notEmpty()
      .withMessage('Normal advance amount is required')
      .isNumeric()
      .withMessage("Normal advance amount is a numeric value")
      .custom((value) => {
        if (value >= 200 && value <= 500) {
            return true;
        }
        return false;
        })
        .withMessage('Normal advance amount should be between 100 and 500'),
    validatorMiddleware,
];

const deleteAdvacneValidator = [
    check('id')
      .notEmpty()
      .withMessage('id required')
      .isNumeric()
      .withMessage("id is a numeric value"),
      validatorMiddleware
];

const getAdvacneValidator = [
    check('id')
      .notEmpty()
      .withMessage('id required')
      .isNumeric()
      .withMessage("id is a numeric value"),
      validatorMiddleware
];

const updateExceptionalAdvanceValidator = [
    check('id')
        .notEmpty()
        .withMessage('id required')
        .isNumeric()
        .withMessage("id is a numeric value"),
    check('suggestionDate')
        .optional()
        .isDate({ format: 'YYYY-MM-DD' })
        .withMessage('suggestionDate should be of type date'),
    check('reason')
        .optional(),
    check('amount')
        .optional()
        .isNumeric()
        .withMessage("Exceptional advance amount is a numeric value")
        .custom((value) => {
        if (value >= 1000 && value <= 1500) {
            return true;
        }
        return false;
        })
        .withMessage('Exceptional advance amount should be between 1000 and 1500'),
    check('installmentValue')
        .optional()
        .isNumeric()
        .withMessage("Advance installment value is a numeric value")
        .isIn(validInstallmentValueValues)
        .withMessage('Exceptional advance amount should be 100 or 200 or 300'),
    validatorMiddleware,
];
const updateNormalAdvanceValidator = [
    check('id')
        .notEmpty()
        .withMessage('id required')
        .isNumeric()
        .withMessage("id is a numeric value"),
    check('suggestionDate')
        .optional()
        .isDate({ format: 'YYYY-MM-DD' })
        .withMessage('suggestionDate should be of type date'),
    check('reason')
        .optional(),
    check('amount')
        .optional()
        .isNumeric()
        .withMessage("Exceptional advance amount is a numeric value")
        .custom((value) => {
        if (value >= 1000 && value <= 1500) {
            return true;
        }
        return false;
        })
        .withMessage('Exceptional advance amount should be between 1000 and 1500'),
    check('installmentValue')
        .optional()
        .isNumeric()
        .withMessage("Advance installment value is a numeric value")
        .isIn(validInstallmentValueValues)
        .withMessage('Exceptional advance amount should be 100 or 200 or 300'),
    validatorMiddleware,
];

    export {
        createExceptionalAdvanceValidator,
        createNormalAdvanceValidator,
        updateExceptionalAdvanceValidator,
        deleteAdvacneValidator,
        getAdvacneValidator,
        updateNormalAdvanceValidator
    }