const express = require("express");
const authLogic = require("../business-logic/auth-logic");
const errorsHelper = require("../helpers/errors-helper"); // Error handler.
const router = express.Router();

router.post("/register", async (request, response) => {
  try {
    const addedUser = await authLogic.registerAsync(request.body);
    response.status(201).json(addedUser);
  } catch (err) {
    response.status(500).send(errorsHelper.getError(err)); // Return suitable error.
  }
});

router.post("/login", async (request, response) => {
  try {
    const loggedInUser = await authLogic.loginAsync(request.body);
    if (!loggedInUser)
      return response.status(401).send("Incorrect username or password.");
    response.json(loggedInUser);
  } catch (err) {
    response.status(500).send(errorsHelper.getError(err)); // Return suitable error.
  }
});

module.exports = router;
