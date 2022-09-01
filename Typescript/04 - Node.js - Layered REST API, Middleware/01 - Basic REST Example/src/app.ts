const cats = [
  { id: 1, name: "Mitsi", age: 4 },
  { id: 2, name: "Kitsi", age: 5 },
  { id: 3, name: "Ditsi", age: 6 },
];

// 6 Basics Routes:
// 1. Get all
// 2. Get one
// 3. Add
// 4. Update full
// 5. Update partial
// 6. Delete

import express, { Request, Response } from "express";

const server = express();

// Tels express that we might have a body, so if body was sent - create a request.body object:
server.use(express.json());

// Get all cats:
server.get("/api/cats", (request: Request, response: Response) => {
  response.json(cats);
});

// Get one cat:
server.get("/api/cats/:id", (request: Request, response: Response) => {
  const id = +request.params.id;
  const cat = cats.find((c) => c.id === id);
  response.json(cat);
});

// Add new cat:
server.post("/api/cats", (request: Request, response: Response) => {
  const cat = request.body;
  cat.id = cats[cats.length - 1].id + 1;
  cats.push(cat);
  response.status(201).json(cat);
});

// Update full cat:
server.put("/api/cats/:id", (request: Request, response: Response) => {
  const id = +request.params.id;
  const cat = request.body;
  cat.id = id;
  const index = cats.findIndex((c) => c.id === id);
  cats[index] = cat;
  response.json(cat);
});

// Update partial cat:
server.patch("/api/cats/:id", (request: Request, response: Response) => {
  const id = +request.params.id;
  const cat = request.body;
  cat.id = id;
  const dbCat = cats.find((c) => c.id === id);
  for (const prop in cat) {
    dbCat[prop] = cat[prop];
  }
  response.json(dbCat);
});

// Delete cat:
server.delete("/api/cats/:id", (request: Request, response: Response) => {
  const id = +request.params.id;
  const index = cats.findIndex((c) => c.id === id);
  cats.splice(index, 1);
  response.sendStatus(204);
});

server.listen(3001, () => console.log("Listening..."));
