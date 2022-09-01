// Return a suitable error message:
function getError(err) {
  // On production - return a general error message:
  if (config.isProduction) {
    return "Some error occurred, please try again.";
  }

  // On development - return the exception message:
  return err.message;
}

module.exports = {
  getError,
};
