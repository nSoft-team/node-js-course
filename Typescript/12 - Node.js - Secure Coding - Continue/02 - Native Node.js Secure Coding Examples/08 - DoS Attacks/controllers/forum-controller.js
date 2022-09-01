const express = require("express");
const forumLogic = require("../business-logic/forum-logic");
const errorsHelper = require("../helpers/errors-helper");
const router = express.Router();

router.get("/", async (request, response) => {
  try {
    // Log some message when user request forum messages:
    console.log("User request forum messages...");

    const messages = await forumLogic.getAllMessagesAsync();
    response.json(messages);
  } catch (err) {
    response.status(500).send(errorsHelper.getError(err));
  }
});

router.post("/", async (request, response) => {
  try {
    const addedMessage = await forumLogic.addMessageAsync(request.body);
    response.status(201).json(addedMessage);
  } catch (err) {
    response.status(500).send(errorsHelper.getError(err));
  }
});

module.exports = router;
