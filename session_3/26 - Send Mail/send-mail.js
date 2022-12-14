const nodemailer = require("nodemailer");

const transport = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "testemailsender@gmail.com",
    pass: "yvayfhnfnujifgfo", // This is an App Password generated by gmail. It must require a 2 step verification. Regular password are not valid for apps access
  },
});

function sendMail(to, subject, body) {
  return new Promise((resolve, reject) => {
    const message = { to, subject, text: body };
    transport.sendMail(message, function (err, info) {
      if (err) {
        reject(err);
      } else {
        resolve(info);
      }
    });
  });
}

module.exports = sendMail;
