const user = require('./user');

const routes = (server) => {
  server.use('/api/user', user);
}

module.exports = routes;