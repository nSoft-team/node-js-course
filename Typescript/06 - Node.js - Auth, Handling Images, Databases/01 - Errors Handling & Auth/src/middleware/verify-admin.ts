import { NextFunction, Request, Response } from "express";
import ErrorModel from "../models/error-model";
import RoleModel from "../models/role-model";
import cyber from "../utils/cyber";

async function verifyAdmin(
  request: Request,
  response: Response,
  next: NextFunction
): Promise<void> {
  const authorizationHeader = request.header("authorization"); // Suppose to be "Bearer the-token"

  const isValid = await cyber.verifyToken(authorizationHeader);

  if (!isValid) {
    next(new ErrorModel(401, "You are not logged in"));
    return;
  }

  const user = cyber.getUserFromToken(authorizationHeader);

  if (user.role !== RoleModel.Admin) {
    next(new ErrorModel(403, "You are not authorized"));
    return;
  }

  next();
}

export default verifyAdmin;
