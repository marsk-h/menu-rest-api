const user = require('../../db/models/universal');

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