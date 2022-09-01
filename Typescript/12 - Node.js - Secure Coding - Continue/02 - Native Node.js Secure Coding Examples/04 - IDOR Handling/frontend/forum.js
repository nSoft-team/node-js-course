$(() => {
  $.ajax({
    url: "/api/forum",
    contentType: "application/json",
    dataType: "json",
    error: (err) => alert(err.responseText),
    success: (messages) => {
      let cards = "";
      for (const m of messages) {
        m.text = m.text.split("\n").join("<br>");
        cards += `<div class="card"><strong>${m.sender}</strong><hr>${m.text}</div>`;
      }
      $("#container").html(cards);
    },
  });

  $("form").submit((e) => {
    e.preventDefault();

    const message = {
      sender: $("#senderBox").val(),
      text: $("#textBox").val(),
    };

    $.ajax({
      method: "POST",
      url: "/api/forum",
      data: JSON.stringify(message),
      contentType: "application/json",
      dataType: "json",
      error: (err) => alert(err.responseText),
      success: (message) => {
        const card = `<div class="card"><strong>${message.sender}</strong><hr>${message.text}</div>`;
        $("#container").append(card);
        $("#senderBox").val("");
        $("#textBox").val("");
        $("#senderBox").focus();
      },
    });
  });
});
