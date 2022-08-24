let socket;

function connect() {
  socket = io.connect("http://localhost:3001");

  socket.on("msg-from-server", (msg) => {
    const messagesDiv = document.getElementById("messagesDiv");
    messagesDiv.innerHTML += msg + "<br>";
  });
}

function send() {
  const messageBox = document.getElementById("messageBox");
  const msg = messageBox.value;
  socket.emit("msg-from-client", msg);
  messageBox.value = "";
  messageBox.focus();
}

function disconnect() {
  socket.disconnect();
}
