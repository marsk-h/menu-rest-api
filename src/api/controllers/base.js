//const { config } = require('dotenv/types');
const user = require('../../db/models/universal');
const jwt = require('jsonwebtoken');
const config = require('../../config/conf');
//const bcrypt = require('bcrypt');

exports.emailExists = async (table, field, email) => {
    const found = await user.findOne(table, field, email);
    if (found.length > 0) {
      return true;
    }
    return false;
};

exports.phoneExists = async (table, field, id, phone) => {
    const found = await user.findOne(table, field, phone);
    if (found.length > 0) {
      if (phone === found[0].Phone &&  id === found[0].ID) {
        return false
      } else {
        return true;
      }
    }
    return false;
};

exports.emailExistsExcludingMySelf = async (table, field, id, email) => {
  const found = await user.findOne(table, field, email);
  if (found.length > 0) {
    if (email === found[0].Email &&  id === found[0].ID) {
      return false
    } else {
      return true;
    }
  }
  return false;
};

exports.encrypt = user => {
  jwt.sign({user}, config.jwtSecret, (err, token) => {
    return token;
  });
};


/**   Manejador de errores
 *     errors: {
 *       message: array[]
 */
exports.handleError = (res, err) => {
  if (process.env.NODE_ENV === 'development') {
    console.log(err);
  }
  res.status(err.code).json({
    errors: {
      message: err.message
    }
  });
};


/** return json
 *   code: statusCode,
 *   message: [] or string
 * */ 
exports.buildErrObject = (code, message) => {
  return {
    code,
    message
  }
};