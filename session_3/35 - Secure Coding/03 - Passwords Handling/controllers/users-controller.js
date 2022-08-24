const express = require("express");
const usersLogic = require("../business-logic/users-logic");
const errorsHelper = require("../helpers/errors-helper");
const router = express.Router();

router.get("/:id", async (request, response) => {
  try {
    const id = +request.params.id;
    const user = await usersLogic.getOneUserAsync(id);
    if (!user) return response.status(404).send("User not found.");
    response.json(user);
  } catch (err) {
    response.status(500).send(errorsHelper.getError(err));
  }
});

router.patch("/:id", async (request, response) => {
  try {
    const id = +request.params.id;
    request.body.id = id;
    const updatedUser = await usersLogic.updateUserAsync(request.body);
    if (!updatedUser) return response.status(404).send("User not found.");
    response.json(updatedUser);
  } catch (err) {
    response.status(500).send(errorsHelper.getError(err));
  }
});

module.exports = router;
