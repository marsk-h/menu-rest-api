const mysql = require('mysql');
const config = require('../config/conf');

const conf = {
  host: config.dbHost,
  port: config.dbPort,
  user: config.dbUser,
  password: config.dbPassword,
  database: config.dbName
};

const db = (query, data) => {
  const connection = mysql.createConnection(conf);
  return new Promise((resolve, reject) => {
    connection.connect((err) => {
      if (!err) {
        connection.query(query, data, (err, fact) => {
          if (err) return reject(err);
          connection.end();
          resolve(fact);
        });
      } else {
        console.log('Database no connected');
        console.error(err);
      }
    });
  });
};

module.exports = db;