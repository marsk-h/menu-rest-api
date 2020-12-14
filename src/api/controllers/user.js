const model = require('../../db/models/universal');
const response = require('../response');
const { emailExists, emailExistsExcludingMySelf, phoneExists } = require('./base');

const TABLE = {
  name: 'user',
  email: 'Email',
  phone: 'Phone'
};

const listItems = async (req, res) => {
  console.log('Request listItems');
  const items = await model.list(TABLE.name);
  try {
    response.success(req, res, items, 200)
  } catch (error) {
    console.error(error);
  }
};

const getItem = async (req, res) => {
  console.log('Request getItem');
  const item = await model.findById(TABLE.name, req.params.id);
  try {
    if (item.length < 1) {
      console.log('Not Found');
      response.success(req, res, 'Not Found', 404);
    } else {
      response.success(req, res, item, 200);
    }
  } catch (error) {
    console.error(error);
  }
};

const createItem = async (req, res) => {
  console.log('Request insert');
  const doesEmailExists = await emailExists(
    TABLE.name, 
    TABLE.email, 
    req.body.Email
    );
  if (doesEmailExists) {
    response.success(req, res, 'Email is in use!', 422);
  } else {
    const item = await model.saveItem(
      TABLE.name,
      req.body
    );
    try {
      response.success(req, res, item, 201);
    } catch (error) {
      console.error(error);
    }
  }
};

const updateItem = async (req, res) => {
  console.log('Request update');
  const doesEmailExists = await emailExistsExcludingMySelf(
    TABLE.name, 
    TABLE.email,
    req.body.ID, 
    req.body.Email
    );
  const doesPhoneExists = await phoneExists(
    TABLE.name, 
    TABLE.phone, 
    req.body.ID,
    req.body.Phone
    );
  if (doesEmailExists) {
    response.success(req, res, 'Email is in use!', 422);
  } else if (doesPhoneExists) {
    response.success(req, res, 'Phone is in use!', 422);
  } else {
    const item = await model.updateItem(
      TABLE.name,
      req.body
    );
    try {
      response.success(req, res, item, 200);
    } catch (error) {
      console.error(error);
    }
  }
};

const disableItem = async (req, res) => {
  console.log('Disabling item');
  const item = await model.disableItem(
    TABLE.name,
    req.params.id
  );
  try {
    response.success(req, res, item, 200);
  } catch (error) {
    
  }
};

module.exports = {
  TABLE,
  listItems,
  getItem,
  createItem,
  updateItem,
  disableItem
};