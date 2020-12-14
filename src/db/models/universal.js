const db = require('../mysql');

const list = (table) => {
  let query = `SELECT * FROM ${table} WHERE Status = 1`;
  return db(query);
};

const findById = (table, id) => {
  let query = `SELECT * FROM ${table} WHERE ID = '${id}' AND Status = 1`;
  return db(query);
};

const findOne = (table, field, value) => {
  let query = `SELECT * FROM ${table} WHERE ${field} = '${value}'`;
  return db(query);
};

const search = (table, field, value) => {
  let query = `SELECT * FROM ${table} WHERE ${field} LIKE '${value}%'`;
  return db(query);
};

const saveItem = (table, data) => {
  let query = `INSERT INTO ${table} SET ?`;
  return db(query, data);
};

const updateItem = (table, data) => {
  let query = `UPDATE ${table} SET Modified = current_timestamp(), ? WHERE ID = ? AND Status = 1`;
  return db(query, [data, data.ID]);
};

const disableItem = (table, id) => {
  let query = `UPDATE ${table} SET Modified = current_timestamp(), Status = 0 WHERE ID = ${id}`;
  return db(query);
};

module.exports = {
  list,
  findById,
  findOne,
  search,
  saveItem,
  updateItem,
  disableItem
}