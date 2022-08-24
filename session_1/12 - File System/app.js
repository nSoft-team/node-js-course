// The fs Module gives information and access to the File System.

const fs = require("fs");

// fs.renameSync("./data/dest-file.txt", "./data/destination.txt");

fs.rename(
  "./data/destination.txt",
  "./data/destination-2.txt",
  (err) => console.error("error from rename", err),
  () => console.log("File renamed")
);

// ---------- Common operations on files and folders (sync): ----------
// If directory doesn't exists:

if (!fs.existsSync("./data")) {
  // Create it:
  fs.mkdirSync("./data");
}

// Copy file:
fs.copyFileSync("./data/source-file.txt", "./data/dest-file.txt");

// Rename file:
fs.renameSync("./data/dest-file.txt", "./data/destination.txt");
fs.rename(
  "./data/destination.txt",
  "./data/destination-2.txt",
  (err) => console.log(err),
  () => console.log("File renamed")
);

console.log("after rename");

// If file exists:
if (fs.existsSync("./data/destination.txt")) {
  // Delete file:
  fs.unlinkSync("./data/destination.txt");
}

// Get file names in a directory:
const files = fs.readdirSync("./data");
for (const file of files) {
  console.log(file);
}

// ---------- Write and Read Files Sync: ----------

// Write file sync (overrides an existing file):
fs.writeFileSync(
  "./my-file1.txt",
  "Hello All!\r\nThis is the second line.\r\nBye...\r\n"
);

// Append file sync:
fs.appendFileSync("./my-file1.txt", "This line will be added to the file.\r\n");

// Read file sync:
const fileContent = fs.readFileSync("./my-file1.txt", "utf-8");
console.log(fileContent);

// ---------- Write and Read Files Async: ----------

// Write file async:
fs.writeFile(
  "./my-file2.txt",
  "Hello All!\r\nThis is the second line.\r\nBye...\r\n",
  (err) => {
    if (err) {
      console.error(err);
      return;
    }
    console.log("Done Writing.");
  }
);

// Append file async:
fs.appendFile(
  "./my-file2.txt",
  "This line will be added to the file.\r\n",
  (err) => {
    if (err) {
      console.error(err);
      return;
    }
    console.log("Done Appending.");
  }
);

// Read file async:
fs.readFile("./my-file2.txt", "utf-8", (err, fileContent) => {
  if (err) {
    console.error(err);
    return;
  }
  console.log("Done Reading.");
  console.log(fileContent);
});

const promise = new Promise((resolve, reject) => {
  //do something async ... call to server etc. / get a file
  const err = true;

  if (err) {
    reject(err);
  } else {
    resolve("Hello World");
  }
});

promise().then(() => console.log("Done"));

const result = await promise();
