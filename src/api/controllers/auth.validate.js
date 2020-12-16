const { check, validationResult } = require('express-validator');
const { handleError, buildErrObject } = require('./base');

exports.register = [
  check('Email').exists().withMessage('Missing')
    .not().isEmpty().withMessage('Is Empty'),
  check('Password').exists().withMessage('Missing')
    .not().isEmpty().withMessage('Is Empty')
    .isLength({ min: 8 }).withMessage('Password too short, min 5'),
  (req, res, next) => {
    try {
      validationResult(req).throw();
      return next();
    } catch (err) {
      return handleError(res, buildErrObject(422, err.array()));
    }
  }
];