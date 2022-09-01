import { NextFunction, Request, Response } from "express";

function errorsHandler(
  err: any,
  request: Request,
  response: Response,
  next: NextFunction
): void {
  console.log(err);

  // Log error to log file.

  // let status = 500;
  // if(err.status) {
  //     status = err.status;
  // }
  // response.status(status).send(err.message);

  response.status(err.status || 500).send(err.message); // Need to secure the message...
}

export default errorsHandler;
