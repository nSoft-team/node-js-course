const express = require("express");
const svgCaptcha = require("svg-captcha"); // npm i svg-captcha
const authLogic = require("../business-logic/auth-logic");
const errorsHelper = require("../helpers/errors-helper");
const verifyCaptcha = require("../middleware/verify-captcha"); // Verify captcha.
const router = express.Router();

// Generate a new CAPTCHA, send back the image, cookie back the hashed text:
router.get("/captcha", (request, response) => {
  // Create a new CAPTCHA:
  const captcha = svgCaptcha.create();

  // Save CAPTCHA text in server session:
  request.session.originalCaptchaText = captcha.text;

  // Send back the CAPTCHA image (data = image):
  response.type("svg").send(captcha.data);
});

// Verify CAPTCHA text using middleware:
router.post("/register", verifyCaptcha, async (request, response) => {
  try {
    const addedUser = await authLogic.registerAsync(request.body);
    response.status(201).json(addedUser);
  } catch (err) {
    response.status(500).send(errorsHelper.getError(err));
  }
});

router.post("/login", async (request, response) => {
  try {
    const loggedInUser = await authLogic.loginAsync(request.body);
    if (!loggedInUser)
      return response.status(401).send("Incorrect username or password.");
    response.json(loggedInUser);
  } catch (err) {
    response.status(500).send(errorsHelper.getError(err));
  }
});

module.exports = router;
