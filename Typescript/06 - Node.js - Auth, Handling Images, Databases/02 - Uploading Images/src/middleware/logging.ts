import { NextFunction, Request, Response } from "express";

function logging(
  request: Request,
  response: Response,
  next: NextFunction
): void {
  console.log("Request has been made using method: " + request.method);
  next(); // Go to next middleware (or route)
}

export default logging;
