const sendMail = require("./send-mail");

(async () => {
  try {
    const info = await sendMail(
      "testuser@gmail.com",
      "Testing...",
      "This is the body..."
    );
    console.log("Success", info);
  } catch (err) {
    console.error(err.message);
  }
})();
