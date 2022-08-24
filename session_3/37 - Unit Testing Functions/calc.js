function getSum(arr) {
  let sum = 0;
  for (const item of arr) {
    sum += item;
  }
  return sum;
}

function getAvg(arr) {
  return getSum(arr) / arr.length;
}

function getMaxAsync(arr) {
  return new Promise((resolve) => {
    setTimeout(() => {
      let max = arr[0];
      for (const item of arr) {
        if (item > max) max = item;
      }
      resolve(max);
    }, 1000);
  });
}

function getMin(arr) {
  if (!Array.isArray(arr)) {
    throw new Error("No array sent.");
  }

  if (arr.length === 0) {
    throw new Error("Array can't be empty.");
  }

  let min = arr[0];
  for (const item of arr) {
    if (item < min) min = item;
  }
  return min;
}

module.exports = {
  getSum,
  getAvg,
  getMaxAsync,
  getMin,
};
