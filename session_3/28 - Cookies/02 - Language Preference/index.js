$(function () {
  $("#divFlags > img").click(function () {
    const d = new Date();
    d.setFullYear(d.getFullYear() + 1);
    const language = $(this).attr("data-language");
    document.cookie = `language=${language}; expires=${d.toUTCString()}`;
    getContent();
  });

  function getContent() {
    $.ajax({
      url: "/content",
      success: (response) => {
        $("#content").html(response);
      },
    });
  }

  getContent();
});
