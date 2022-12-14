import jwt from "jsonwebtoken";
import UserModel from "../models/user-model";

const secretKey = "KittensAreCute";

function getNewToken(user: UserModel): string {
  // The object we're setting inside the token:
  const payload = { user };

  // Generate token:
  const token = jwt.sign(payload, secretKey, { expiresIn: "2h" });

  // Return the token:
  return token;
}

// Verify token:
function verifyToken(authorizationHeader: string): Promise<boolean> {
  return new Promise((resolve, reject) => {
    // If there is no authorization header:
    if (!authorizationHeader) {
      resolve(false);
      return;
    }

    // Extract the token ("Bearer given-token"):
    const token = authorizationHeader.split(" ")[1];

    // If there is no token:
    if (!token) {
      resolve(false);
      return;
    }

    // Here we have a token:
    jwt.verify(token, secretKey, (err) => {
      // If token expired, if token not legal:
      if (err) {
        resolve(false);
        return;
      }

      // Here the token is legal:
      resolve(true);
    });
  });
}

function getUserFromToken(authorizationHeader: string): UserModel {
  // Extract token:
  const token = authorizationHeader.split(" ")[1];

  // Extract payload from the token:
  const payload: any = jwt.decode(token);

  // Extract user:
  const user = payload.user;

  return user;
}

export default {
  getNewToken,
  verifyToken,
  getUserFromToken,
};
