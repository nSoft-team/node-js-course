const https = require("https");

module.exports = () => {
  https
    .get(
      "https://api.nasa.gov/planetary/apod?api_key=Bhhd2BN7aqTrbgUXcIow9vGKuwzaN29RifKyMFeN",
      (response) => {
        let data = "";

        // A chunk of data has been received:
        response.on("data", (chunk) => (data += chunk));

        // The whole response has been received:
        response.on("end", () => console.log(JSON.parse(data)));
      }
    )
    .on("error", (err) => console.log("Error: " + err.message));
};
