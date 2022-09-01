function dateTime() {
  const now = new Date();
  console.log("Date & Time: " + now.toLocaleString());
}

module.exports = {
  dateTime,
};
