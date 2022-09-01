import { NextFunction, Request, Response } from "express";

function errorsHandler(
  err: any,
  request: Request,
  response: Response,
  next: NextFunction
): void {
  console.log(err);

  response.status(err.status || 500).send(err.message); // Need to secure the message...
}

export default errorsHandler;
