$(() => {
  window.isUserLoggedIn = () => sessionStorage.getItem("user") !== null;

  $("a[href='/home']").css("display", "inline");
  $("a[href='/products']").css("display", "inline");
  $("a[href='/forum']").css("display", "inline");
  $("a[href='/login']").css("display", isUserLoggedIn() ? "none" : "inline");
  $("a[href='/login']")
    .next()
    .css("display", isUserLoggedIn() ? "none" : "inline");
  $("a[href='/register']").css("display", isUserLoggedIn() ? "none" : "inline");
  $("a[href='/logout']").css("display", isUserLoggedIn() ? "inline" : "none");

  $("a[href='/logout']").click((e) => {
    e.preventDefault();
    sessionStorage.clear();
    location = "/home";
  });

  if (isUserLoggedIn()) {
    const user = JSON.parse(sessionStorage.getItem("user"));
    $("#greetings").html(
      `Hello ${user.firstName} ${user.lastName} | <i class="fa fa-edit"></i>`
    );
  } else {
    $("#greetings").html("Hello Guest");
  }

  $("i").click(() => {
    const user = JSON.parse(sessionStorage.getItem("user"));
    location = "/users/edit/" + user.id;
  });
});
