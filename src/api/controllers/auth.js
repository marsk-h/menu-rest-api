const { handleError, emailExists, buildErrObject, encrypt } = require("./base");
const model = require('../../db/models/universal');
const response = require('../response');
const config = require('../../config/conf');
const jwt = require('jsonwebtoken');

/** PRIVATE FUNCTIONS */

const TABLE = {
  name: 'user',
  email: 'Email',
  phone: 'Phone'
};

const registerUser = async (table, req) => {
  return new Promise((resolve, reject) => {
    const item = model.saveItem(table, req);
    try {
      resolve(item);
    } catch (error) {
      reject(buildErrObject(422, 'User no regitered'))
    }
  })
};

const setUserInfo = async (id) => {
  // Return list of objects []
  const item = await model.findById(TABLE.name, id);
  return {
    id: item[0].ID,
    email: item[0].Email
  }
  };

const returnRegisterToken = (id, userInfo) => {
  return {
    token: generateToken(id),
    user: userInfo
  }
};

const generateToken = user => {
  const obj = {
    id: user
  }
  return jwt.sign(obj, config.jwtSecret);
};

/** PUBLIC FUNCTIONS */

exports.register = async (req, res) => {
  try {
    const doesEmailExists = await emailExists(TABLE.name, TABLE.email, req.body.Email);
    if (!doesEmailExists) {
      const item = await registerUser(TABLE.name, req.body);
      console.log(item.insertId);
      const userInfo = await setUserInfo(item.insertId);
      const resp = returnRegisterToken(item.insertId, userInfo);
      //sendRegistrationEmailMessage(item);
      response.success(req, res, resp, 201);
    }
  } catch (error) {
    handleError(res, error);
  } 
};