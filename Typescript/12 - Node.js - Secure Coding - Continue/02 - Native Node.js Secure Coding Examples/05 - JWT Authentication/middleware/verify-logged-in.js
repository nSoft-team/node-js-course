const cryptoHelper = require("../helpers/crypto-helper");

// Verify logged-in:
async function verifyLoggedIn(request, response, next) {
  const isValidToken = await cryptoHelper.verifyTokenAsync(
    request.headers.authorization
  );

  if (!isValidToken)
    return response.status(401).send("Invalid or expired token.");

  next();
}

module.exports = verifyLoggedIn;
