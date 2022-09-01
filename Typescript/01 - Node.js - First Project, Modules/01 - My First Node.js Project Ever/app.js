console.log("Hello!");

// console.log(global);
// console.log(global.process);
// console.log(global.process.env);
// console.log(process.env);

setInterval(() => {
  const now = new Date();
  console.log(now.toLocaleTimeString());
}, 1000);
