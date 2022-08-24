// Workers (threads) are useful for performing CPU-intensive JavaScript operations.
// They do not help much with I/O-intensive work. T
// The Node.js built-in asynchronous I/O operations are more efficient than Workers can be.
// See https://nodejs.org/api/worker_threads.html for more details.

const { Worker, isMainThread } = require("worker_threads");

// Create new worker + send data to it through the workerData reserved variable:
const worker = new Worker("./primes-worker.js", { workerData: 100 });

// Make sure we're *not* running inside a thread:
if (isMainThread) {
  console.log("Main thread");

  // message event - got some message from the worker during its operation:
  worker.on("message", (primes) => console.log(primes));

  // error event - some exception inside the worker. this also will terminate it:
  worker.on("error", (err) => console.log("Error inside the worker: ", err));

  // exit event - worker has ended naturally or not naturally.
  // code === 0 means no error.
  // code === 1 means worker has crashed.
  // process.exit(); inside the worker terminates the worker with code === 0.
  // process.exit(123); inside the worker terminates the worker with code === 123.
  worker.on("exit", (code) =>
    console.log("Worker has ended with code: " + code)
  );

  console.log("End Main Thread.");
}
