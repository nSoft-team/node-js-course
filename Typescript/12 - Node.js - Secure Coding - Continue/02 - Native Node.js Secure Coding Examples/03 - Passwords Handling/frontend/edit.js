$(() => {
  if (!isUserLoggedIn()) return (location = "/login");

  function getUrlLastValue() {
    return location.pathname.substr(location.pathname.lastIndexOf("/") + 1);
  }

  $.ajax({
    url: "/api/users/" + getUrlLastValue(),
    contentType: "application/json",
    dataType: "json",
    error: (err) => alert(err.responseText),
    success: (user) => {
      $("#firstNameBox").val(user.firstName);
      $("#lastNameBox").val(user.lastName);
      $("#usernameBox").val(user.username);
    },
  });

  $("form").submit((e) => {
    e.preventDefault();

    const user = {
      firstName: $("#firstNameBox").val(),
      lastName: $("#lastNameBox").val(),
      username: $("#usernameBox").val(),
    };

    $.ajax({
      method: "PATCH",
      url: "/api/users/" + getUrlLastValue(),
      data: JSON.stringify(user),
      contentType: "application/json",
      dataType: "json",
      error: (err) => alert(err.responseText),
      success: (updatedUser) => {
        const user = JSON.parse(sessionStorage.getItem("user"));
        user.firstName = updatedUser.firstName;
        user.lastName = updatedUser.lastName;
        user.username = updatedUser.username;
        sessionStorage.setItem("user", JSON.stringify(user));
        location = "/home";
      },
    });
  });
});
