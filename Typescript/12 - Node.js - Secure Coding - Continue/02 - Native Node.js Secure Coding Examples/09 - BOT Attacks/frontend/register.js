$(() => {
  // Get CAPTCHA image from server and display it:
  $.ajax({
    url: "/api/auth/captcha",
    error: (err) => alert(err.responseText),
    success: (captchaDocument) =>
      $("#captchaDiv").html(captchaDocument.firstChild),
  });

  $("form").submit((e) => {
    e.preventDefault();

    const user = {
      firstName: $("#firstNameBox").val(),
      lastName: $("#lastNameBox").val(),
      username: $("#usernameBox").val(),
      password: $("#passwordBox").val(),
      userCaptchaText: $("#captchaBox").val(), // Send also user CAPTCHA text to server.
    };

    $.ajax({
      method: "POST",
      url: "/api/auth/register",
      data: JSON.stringify(user),
      contentType: "application/json",
      dataType: "json",
      error: (err) => alert(err.responseText),
      success: (user) => {
        sessionStorage.setItem("user", JSON.stringify(user));
        location = "/home";
      },
    });
  });
});
