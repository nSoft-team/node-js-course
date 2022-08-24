// We can export a single variable/object/function to the entire exports object:

function doSomethingElse() {
  console.log("Doing Something Else...");
}

// Must use module.exports here and not just exports:
module.exports = doSomethingElse;
