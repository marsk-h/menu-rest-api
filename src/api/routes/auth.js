const express = require('express');
const router = express.Router();
const controller = require('../controllers/auth');
const validate = require('../controllers/auth.validate');
const trimRequest = require('trim-request');

router.post(
  '/register',
  trimRequest.all,
  validate.register,
  controller.register
  );
  
  router.post(
    '/login',
    trimRequest.all,
    validate.register
    //controller.regi
  );

  router.post(
    '/verify',
    trimRequest.all,
    validate.register
    //controller.regi
  );

  router.post(
    '/forgot',
    trimRequest.all,
    validate.register
    //controller.regi
  );

  router.post(
    '/reset',
    trimRequest.all,
    validate.register
    //controller.regi
  );

module.exports = router;