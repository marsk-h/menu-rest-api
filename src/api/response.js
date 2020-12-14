exports.success = (req, res, msg, status) => {
  let statusCode = status || 200;
  let statusMessage = msg || '';

  res.status(statusCode).send({
      error: false,
      status: statusCode,
      body: statusMessage,
  });
};

exports.error = (req, res, msg, status) => {
  let statusCode = status || 500;
  let statusMessage = msg || 'Internal Server Error';

  res.status(statusCode).send({
      error: false,
      status: statusCode,
      body: statusMessage,
  });
};