import dal from "../dal/dal";
import CredentialsModel from "../models/credentials-model";
import ErrorModel from "../models/error-model";
import RoleModel from "../models/role-model";
import UserModel from "../models/user-model";
import cyber from "../utils/cyber";

async function register(user: UserModel): Promise<string> {
  // Validation...

  // Get all users (in real database we don't need it)
  const users = await dal.getAllUsers();

  // Generate new id (in real database - the database will do it):
  user.id = users[users.length - 1].id + 1;

  // Create "User" role:
  user.role = RoleModel.User;

  // Add user to collection:
  users.push(user);

  // Save back the new user:
  await dal.saveAllUsers(users);

  // Generate token:
  const token = cyber.getNewToken(user);

  // Return the token:
  return token;
}

async function login(credentials: CredentialsModel): Promise<string> {
  // Validation...

  // Get all users (in real database we don't need it)
  const users = await dal.getAllUsers();

  // Find that user:
  const user = users.find(
    (u) =>
      u.username === credentials.username && u.password === credentials.password
  );

  // If user not exists:
  if (!user) {
    throw new ErrorModel(401, "Incorrect username or password");
  }

  // Generate token:
  const token = cyber.getNewToken(user);

  // Return the token:
  return token;
}

export default {
  register,
  login,
};
