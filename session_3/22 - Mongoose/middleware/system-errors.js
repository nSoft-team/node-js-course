// Uncaught system errors, e.g: bad JSON format.

function systemErrors(err, request, response, next) {
  response.status(err.status).send(err.message);
}

module.exports = systemErrors;
