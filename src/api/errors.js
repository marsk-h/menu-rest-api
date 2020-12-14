const response = require('./response');

const errors = (err, req, res, next) => {
    console.error('Hay Error:', err);

    const message = err.message || 'Error Intreno';
    const status = err.statusCode || 500;

    response.error(req, res, message, status);
};

module.exports = errors;