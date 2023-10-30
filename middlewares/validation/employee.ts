import express from 'express';
import { check, body, validationResult } from 'express-validator';
import {validatorMiddleware} from '../../middlewares/validationMiddleware/validatorMiddleware.js';
const validStatusValues = ['married', 'single'];
const validGenderValues = ['male', 'female'];

const createAdminValidator = [
  check('firstName')
    .notEmpty()
    .withMessage('first name required')
    .isLength({ min: 3 })
    .withMessage('Too short first name')
    .isLength({ max: 32 })
    .withMessage('Too long first name'),
  check('midName')
    .notEmpty()
    .withMessage('mid name required')
    .isLength({ min: 3 })
    .withMessage('Too short mid name')
    .isLength({ max: 32 })
    .withMessage('Too long mid name'),
  check('lastName')
    .notEmpty()
    .withMessage('last ame required')
    .isLength({ min: 3 })
    .withMessage('Too short last name')
    .isLength({ max: 32 })
    .withMessage('Too long last name'),
  check('password')
    .notEmpty()
    .withMessage('password is required')
    .isLength({ min: 8, max: 32 })
    .withMessage('Password length should be 8 to 32 characters')
    .custom((value) => {
      var re = /^(?=.*\d)(?=.*[0-9])(?=.*[-])(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
      return re.test(value);
    })
    .withMessage('The password can only consist of characters that fall within the range of lowercase letters (a-z), uppercase letters (A-Z), digits (0-9), and the hyphen ("-"). '),
  check('email')
    .notEmpty()
    .withMessage('email is required')
    .isLength({ min: 3 })
    .withMessage('Too short email')
    .isLength({ max: 32 })
    .withMessage('Too long email')
    .isEmail()
    .withMessage("enter email correctly!"),
  check('salary')
    .notEmpty()
    .withMessage('salary is required')
    .isNumeric()
    .withMessage("salary is a numeric value")
    .isLength({ min: 3, max: 4 })
    .withMessage('salary length should be 3 to 4 digit number'),
  check('status')
    .notEmpty()
    .withMessage('status is required')
    .isIn(validStatusValues)
    .withMessage("status value should be 'marrid' or 'single' "),
  check('phoneNumber')
    .notEmpty()
    .withMessage('phoneNumber is required')
    .isNumeric()
    .withMessage("salary is a numeric value")
    .isLength({ min: 10, max: 10 })
    .withMessage('phone number length should be 10 digit number'),
  check('gender')
    .notEmpty()
    .withMessage('gender is required')
    .isIn(validGenderValues)
    .withMessage("status value should be 'male' or 'female' "),
  check('role')
    .notEmpty()
    .withMessage('role is required')
    .equals('admin')
    .withMessage("role should be 'admin'"),
  check('DOB')
    .notEmpty()
    .withMessage('date of birth is required')
    .isDate({ format: 'YYYY-MM-DD' })
    .withMessage("date of birth is a date value"),
  check('city')
    .notEmpty()
    .withMessage('cityis required')
    .isAlpha('en-US')
    .withMessage("city a string  value"),
  check('identification')
    .notEmpty()
    .withMessage('identification is required')
    .isNumeric()
    .withMessage("identification is a numeric value"),
  validatorMiddleware,
];

const createManagerValidator = [
  check('firstName')
    .notEmpty()
    .withMessage('first name required')
    .isLength({ min: 3 })
    .withMessage('Too short first name')
    .isLength({ max: 32 })
    .withMessage('Too long first name'),
  check('midName')
    .notEmpty()
    .withMessage('mid name required')
    .isLength({ min: 3 })
    .withMessage('Too short mid name')
    .isLength({ max: 32 })
    .withMessage('Too long mid name'),
  check('lastName')
    .notEmpty()
    .withMessage('last ame required')
    .isLength({ min: 3 })
    .withMessage('Too short last name')
    .isLength({ max: 32 })
    .withMessage('Too long last name'),
  check('password')
    .notEmpty()
    .withMessage('password is required')
    .isLength({ min: 8, max: 32 })
    .withMessage('Password length should be 8 to 32 characters')
    .custom((value) => {
      var re = /^(?=.*\d)(?=.*[0-9])(?=.*[-])(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
      return re.test(value);
    })
    .withMessage('The password can only consist of characters that fall within the range of lowercase letters (a-z), uppercase letters (A-Z), digits (0-9), and the hyphen ("-"). '),
  check('email')
    .notEmpty()
    .withMessage('email is required')
    .isLength({ min: 3 })
    .withMessage('Too short email')
    .isLength({ max: 32 })
    .withMessage('Too long email')
    .isEmail()
    .withMessage("enter email correctly!"),
  check('salary')
    .notEmpty()
    .withMessage('salary is required')
    .isNumeric()
    .withMessage("salary is a numeric value")
    .isLength({ min: 3, max: 4 })
    .withMessage('salary length should be 3 to 4 digit number'),
  check('status')
    .notEmpty()
    .withMessage('status is required')
    .isIn(validStatusValues)
    .withMessage("status value should be 'marrid' or 'single' "),
  check('phoneNumber')
    .notEmpty()
    .withMessage('phoneNumber is required')
    .isNumeric()
    .withMessage("salary is a numeric value")
    .isLength({ min: 10, max: 10 })
    .withMessage('phone number length should be 10 digit number'),
  check('gender')
    .notEmpty()
    .withMessage('gender is required')
    .isIn(validGenderValues)
    .withMessage("status value should be 'male' or 'female' "),
    check('role')
    .notEmpty()
    .withMessage('role is required')
    .equals('manager')
    .withMessage("role should be 'manager'"),
  check('DOB')
    .notEmpty()
    .withMessage('date of birth is required')
    .isDate({ format: 'YYYY-MM-DD' })
    .withMessage("date of birth is a date value"),
  check('city')
    .notEmpty()
    .withMessage('cityis required')
    .isAlpha('en-US')
    .withMessage("city a string  value"),
  check('identification')
    .notEmpty()
    .withMessage('identification is required')
    .isNumeric()
    .withMessage("identification is a numeric value"),
  validatorMiddleware,
];

const createEmployeeValidator = [
  check('firstName')
    .notEmpty()
    .withMessage('first name required')
    .isLength({ min: 3 })
    .withMessage('Too short first name')
    .isLength({ max: 32 })
    .withMessage('Too long first name'),
  check('midName')
    .notEmpty()
    .withMessage('mid name required')
    .isLength({ min: 3 })
    .withMessage('Too short mid name')
    .isLength({ max: 32 })
    .withMessage('Too long mid name'),
  check('lastName')
    .notEmpty()
    .withMessage('last ame required')
    .isLength({ min: 3 })
    .withMessage('Too short last name')
    .isLength({ max: 32 })
    .withMessage('Too long last name'),
  check('password')
    .notEmpty()
    .withMessage('password is required')
    .isLength({ min: 8, max: 32 })
    .withMessage('Password length should be 8 to 32 characters')
    .custom((value) => {
      var re = /^(?=.*\d)(?=.*[0-9])(?=.*[-])(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
      return re.test(value);
    })
    .withMessage('The password can only consist of characters that fall within the range of lowercase letters (a-z), uppercase letters (A-Z), digits (0-9), and the hyphen ("-"). '),
  check('email')
    .notEmpty()
    .withMessage('email is required')
    .isLength({ min: 3 })
    .withMessage('Too short email')
    .isLength({ max: 32 })
    .withMessage('Too long email')
    .isEmail()
    .withMessage("enter email correctly!"),
  check('salary')
    .notEmpty()
    .withMessage('salary is required')
    .isNumeric()
    .withMessage("salary is a numeric value")
    .isLength({ min: 3, max: 4 })
    .withMessage('salary length should be 3 to 4 digit number'),
  check('status')
    .notEmpty()
    .withMessage('status is required')
    .isIn(validStatusValues)
    .withMessage("status value should be 'marrid' or 'single' "),
  check('phoneNumber')
    .notEmpty()
    .withMessage('phoneNumber is required')
    .isNumeric()
    .withMessage("salary is a numeric value")
    .isLength({ min: 10, max: 10 })
    .withMessage('phone number length should be 10 digit number'),
  check('gender')
    .notEmpty()
    .withMessage('gender is required')
    .isIn(validGenderValues)
    .withMessage("status value should be 'male' or 'female' "),
    check('role')
    .notEmpty()
    .withMessage('role is required')
    .equals('employee')
    .withMessage("role should be 'employee'"),
  check('DOB')
    .notEmpty()
    .withMessage('date of birth is required')
    .isDate({ format: 'YYYY-MM-DD' })
    .withMessage("date of birth is a date value"),
  check('city')
    .notEmpty()
    .withMessage('cityis required')
    .isAlpha('en-US')
    .withMessage("city a string  value"),
  check('identification')
    .notEmpty()
    .withMessage('identification is required')
    .isNumeric()
    .withMessage("identification is a numeric value"),
  check('section')
    .notEmpty()
    .withMessage('section is required')
    .isNumeric()
    .withMessage("section is a numeric value")
    .isLength({ min: 1, max: 2 })
    .withMessage('salary length should be 1 to 2 digit number'),
  validatorMiddleware,
];

const createSectionManagerValidator = [
  check('firstName')
    .notEmpty()
    .withMessage('first name required')
    .isLength({ min: 3 })
    .withMessage('Too short first name')
    .isLength({ max: 32 })
    .withMessage('Too long first name'),
  check('midName')
    .notEmpty()
    .withMessage('mid name required')
    .isLength({ min: 3 })
    .withMessage('Too short mid name')
    .isLength({ max: 32 })
    .withMessage('Too long mid name'),
  check('lastName')
    .notEmpty()
    .withMessage('last ame required')
    .isLength({ min: 3 })
    .withMessage('Too short last name')
    .isLength({ max: 32 })
    .withMessage('Too long last name'),
  check('password')
    .notEmpty()
    .withMessage('password is required')
    .isLength({ min: 8, max: 32 })
    .withMessage('Password length should be 8 to 32 characters')
    .custom((value) => {
      var re = /^(?=.*\d)(?=.*[0-9])(?=.*[-])(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
      return re.test(value);
    })
    .withMessage('The password can only consist of characters that fall within the range of lowercase letters (a-z), uppercase letters (A-Z), digits (0-9), and the hyphen ("-"). '),
  check('email')
    .notEmpty()
    .withMessage('email is required')
    .isLength({ min: 3 })
    .withMessage('Too short email')
    .isLength({ max: 32 })
    .withMessage('Too long email')
    .isEmail()
    .withMessage("enter email correctly!"),
  check('salary')
    .notEmpty()
    .withMessage('salary is required')
    .isNumeric()
    .withMessage("salary is a numeric value")
    .isLength({ min: 3, max: 4 })
    .withMessage('salary length should be 3 to 4 digit number'),
  check('status')
    .notEmpty()
    .withMessage('status is required')
    .isIn(validStatusValues)
    .withMessage("status value should be 'marrid' or 'single' "),
  check('phoneNumber')
    .notEmpty()
    .withMessage('phoneNumber is required')
    .isNumeric()
    .withMessage("salary is a numeric value")
    .isLength({ min: 10, max: 10 })
    .withMessage('phone number length should be 10 digit number'),
  check('gender')
    .notEmpty()
    .withMessage('gender is required')
    .isIn(validGenderValues)
    .withMessage("status value should be 'male' or 'female' "),
    check('role')
    .notEmpty()
    .withMessage('role is required')
    .equals('sectionManager')
    .withMessage("role should be 'sectionManager'"),
  check('DOB')
    .notEmpty()
    .withMessage('date of birth is required')
    .isDate({ format: 'YYYY-MM-DD' })
    .withMessage("date of birth is a date value"),
  check('city')
    .notEmpty()
    .withMessage('cityis required')
    .isAlpha('en-US')
    .withMessage("city a string  value"),
  check('identification')
    .notEmpty()
    .withMessage('identification is required')
    .isNumeric()
    .withMessage("identification is a numeric value"),
  check('section')
    .notEmpty()
    .withMessage('section is required')
    .isNumeric()
    .withMessage("section is a numeric value")
    .isLength({ min: 1, max: 2 })
    .withMessage('salary length should be 1 to 2 digit number'),
  validatorMiddleware,
];

const deleteEmployeeValidator = [
  check('id')
    .notEmpty()
    .withMessage('id required')
    .isNumeric()
    .withMessage("id is a numeric value"),
    validatorMiddleware
];

const getEmployeeValidator = [
  check('id')
    .notEmpty()
    .withMessage('id required')
    .isNumeric()
    .withMessage("id is a numeric value"),
    validatorMiddleware
];

const updateEmployeeValidator = [
  check('firstName')
    .optional()
    .isLength({ min: 3 })
    .withMessage('Too short first name')
    .isLength({ max: 32 })
    .withMessage('Too long first name'),
  check('midName')
    .optional()
    .isLength({ min: 3 })
    .withMessage('Too short mid name')
    .isLength({ max: 32 })
    .withMessage('Too long mid name'),
  check('lastName')
    .optional()
    .isLength({ min: 3 })
    .withMessage('Too short last name')
    .isLength({ max: 32 })
    .withMessage('Too long last name'),
  check('email')
    .optional()
    .isLength({ min: 3 })
    .withMessage('Too short email')
    .isLength({ max: 32 })
    .withMessage('Too long email')
    .isEmail()
    .withMessage("enter email correctly!"),
  check('salary')
    .optional()
    .isNumeric()
    .withMessage("salary is a numeric value")
    .isLength({ min: 3, max: 4 })
    .withMessage('salary length should be 3 to 4 digit number'),
  check('status')
    .optional()
    .isIn(validStatusValues)
    .withMessage("status value should be 'marrid' or 'single' "),
  check('phoneNumber')
    .optional()
    .isNumeric()
    .withMessage("salary is a numeric value")
    .isLength({ min: 10, max: 10 })
    .withMessage('phone number length should be 10 digit number'),
  check('city')
    .optional()
    .isAlpha('en-US')
    .withMessage("city a string  value"),
  validatorMiddleware,
];


  export {
    createEmployeeValidator,
    updateEmployeeValidator,
    deleteEmployeeValidator,
    getEmployeeValidator,
    createManagerValidator,
    createAdminValidator,
    createSectionManagerValidator
  }