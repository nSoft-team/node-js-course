const { workerData, parentPort } = require("worker_threads");

// Do work (calc primes):
const primes = [];
for (let i = 1; i <= workerData; i++) {
  if (isPrime(i)) {
    primes.push(i);
  }
}

function isPrime(n) {
  const limit = Math.sqrt(n);
  for (let i = 2; i <= limit; i++) {
    if (n % i == 0) {
      return false;
    }
  }
  return n > 1;
}

// Send back data to main thread:
parentPort.postMessage(primes);
