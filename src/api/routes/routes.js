const user = require('./user');
const validate = require('./auth');

const routes = (server) => {
  server.use('/api/user', user);
  server.use('/api/validate', validate);
}

module.exports = routes;