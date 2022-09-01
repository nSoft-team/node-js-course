// Verify CAPTCHA:
function verifyCaptcha(request, response, next) {
  const userCaptchaText = request.body.userCaptchaText;
  const originalCaptchaText = request.session.originalCaptchaText;
  if (userCaptchaText !== originalCaptchaText)
    return response.status(400).send("Are you a Robot?");
  next();
}

module.exports = verifyCaptcha;
