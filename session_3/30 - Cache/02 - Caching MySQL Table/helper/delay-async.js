function delayAsync(milliseconds = 1000) {
  return new Promise((resolve, reject) => {
    setTimeout(() => resolve(), milliseconds);
  });
}

module.exports = delayAsync;
