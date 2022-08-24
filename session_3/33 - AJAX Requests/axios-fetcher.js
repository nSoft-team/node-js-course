const axios = require("axios");

module.exports = async () => {
  try {
    const response = await axios.get(
      "https://api.nasa.gov/planetary/apod?api_key=Bhhd2BN7aqTrbgUXcIow9vGKuwzaN29RifKyMFeN"
    );
    console.log(response.data);
  } catch (err) {
    console.error(err.message);
  }
};
