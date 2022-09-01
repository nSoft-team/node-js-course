import { NextFunction, Request, Response } from "express";

function errorsHandler(
  err: any,
  request: Request,
  response: Response,
  next: NextFunction
): void {
  // Log error to log file.

  response.status(err.status).send(err.message);
}

export default errorsHandler;
