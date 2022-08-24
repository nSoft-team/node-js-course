// Uploading images from frontend to backend.
// Note: same example works for any other file type which can be selected in frontend.

const fs = require("fs");
const express = require("express");
const fileUpload = require("express-fileupload");
const uuid = require("uuid");
const server = express();

server.use(express.static(__dirname + "/frontend"));
server.use(fileUpload());

// Target folder must exists when uploading the files:
if (!fs.existsSync("./images")) fs.mkdirSync("./images");

// Upload a single image:
server.post("/upload-single-image", async (request, response) => {
  if (!request.files) return response.status(400).send("No image sent.");
  const image = request.files.mySingleImage;
  const extension = image.name.substr(image.name.lastIndexOf(".")); // E.g: ".jpg"
  const newImageName = uuid.v4() + extension; // E.g: "204b3caf-9e37-4600-9537-9f7b4cbb181b.jpg"
  await image.mv("./images/" + newImageName);
  response.redirect("/");
});

// Upload multiple images:
server.post("/upload-multiple-images", async (request, response) => {
  if (!request.files) return response.status(400).send("No images sent.");
  const images = Array.isArray(request.files.myMultipleImages)
    ? request.files.myMultipleImages
    : [request.files.myMultipleImages]; // One or more files in a single array.
  for (const image of images) {
    const extension = image.name.substr(image.name.lastIndexOf(".")); // E.g: ".jpg"
    const newImageName = uuid.v4() + extension; // E.g: "204b3caf-9e37-4600-9537-9f7b4cbb181b.jpg"
    await image.mv("./images/" + newImageName);
  }
  response.redirect("/");
});

// Serve a specific image:
server.get("/images/:imageName", (request, response) => {
  const imageName = request.params.imageName;
  response.sendFile(__dirname + "/images/" + imageName);
});

const port = process.env.PORT || 3001;
server.listen(port, () => console.log(`Listening on http://localhost:${port}`));
