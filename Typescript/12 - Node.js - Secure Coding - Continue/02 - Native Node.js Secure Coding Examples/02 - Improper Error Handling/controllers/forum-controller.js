const express = require("express");
const forumLogic = require("../business-logic/forum-logic");
const errorsHelper = require("../helpers/errors-helper"); // Error handler.
const router = express.Router();

router.get("/", async (request, response) => {
  try {
    const messages = await forumLogic.getAllMessagesAsync();
    response.json(messages);
  } catch (err) {
    response.status(500).send(errorsHelper.getError(err)); // Return suitable error.
  }
});

router.post("/", async (request, response) => {
  try {
    const addedMessage = await forumLogic.addMessageAsync(request.body);
    response.status(201).json(addedMessage);
  } catch (err) {
    response.status(500).send(errorsHelper.getError(err)); // Return suitable error.
  }
});

module.exports = router;
