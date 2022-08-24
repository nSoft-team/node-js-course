const express = require("express");
const usersLogic = require("../business-logic/users-logic");
const errorsHelper = require("../helpers/errors-helper");
const router = express.Router();

// Receive uuid instead of id:
router.get("/:uuid", async (request, response) => {
  try {
    // Get user by its uuid:
    const uuid = request.params.uuid;
    const user = await usersLogic.getOneUserAsync(uuid);

    if (!user) return response.status(404).send("User not found.");
    response.json(user);
  } catch (err) {
    response.status(500).send(errorsHelper.getError(err));
  }
});

// Receive uuid instead of id:
router.patch("/:uuid", async (request, response) => {
  try {
    // Take uuid instead of id:
    const uuid = request.params.uuid;
    request.body.uuid = uuid;

    const updatedUser = await usersLogic.updateUserAsync(request.body);
    if (!updatedUser) return response.status(404).send("User not found.");
    response.json(updatedUser);
  } catch (err) {
    response.status(500).send(errorsHelper.getError(err));
  }
});

module.exports = router;
