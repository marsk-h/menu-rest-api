const express = require('express');
const router = express.Router();
const controller = require('../controllers/user');
const trimRequest = require('trim-request');

router.get(
  '/',
  trimRequest.all,
  controller.listItems
);

router.get(
  '/id/:id',
  trimRequest.all,
  controller.getItem
);

// router.post(
//   '/search',
//   trimRequest.all,
//   controller.search
// );

router.post(
  '/new',
  trimRequest.all,
  controller.createItem
);

router.put(
  '/update',
  trimRequest.all,
  controller.updateItem
);

router.put(
  '/disable/:id',
  trimRequest.all,
  controller.disableItem
);

module.exports = router;