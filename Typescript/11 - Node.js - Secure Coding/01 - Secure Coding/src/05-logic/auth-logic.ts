import { OkPacket } from "mysql";
import cyber from "../01-utils/cyber";
import CredentialsModel from "../03-models/credentials-model";
import ErrorModel from "../03-models/error-model";
import UserModel from "../03-models/user-model";
import dal from "../04-dal/dal";

async function register(user: UserModel): Promise<string> {
  // Validation...

  // Test if username already taken:
  const isTaken = await isUsernameTaken(user.username);
  if (isTaken) {
    throw new ErrorModel(400, `Username ${user.username} already taken`);
  }

  // Hash password before entering to database:
  user.password = cyber.hash(user.password);

  // sql:
  const sql = `INSERT INTO users VALUES(DEFAULT,'${user.firstName}','${user.lastName}','${user.username}','${user.password}')`;

  // Save:
  const info: OkPacket = await dal.execute(sql);

  // ID:
  user.id = info.insertId;

  // Remove password:
  delete user.password;

  // Token:
  const token = cyber.getNewToken(user);

  // Return:
  return token;
}

async function login(credentials: CredentialsModel): Promise<string> {
  // Validation...

  // Hash password before comparing to database:
  credentials.password = cyber.hash(credentials.password);

  // sql:
  // const sql = `SELECT * FROM users WHERE username = '${credentials.username}' AND password = '${credentials.password}'`;
  const sql = `SELECT * FROM users WHERE username = ? AND password = ?`;

  // Execute
  const users = await dal.execute(sql, [
    credentials.username,
    credentials.password,
  ]);

  // If not exists:
  if (users.length === 0) {
    throw new ErrorModel(401, "Incorrect username or password");
  }

  // Get user:
  const user = users[0];

  // Remove password:
  delete user.password;

  // Token:
  const token = cyber.getNewToken(user);

  // Return:
  return token;
}

async function isUsernameTaken(username: string): Promise<boolean> {
  const sql = `SELECT COUNT(*) AS count FROM users WHERE username = '${username}'`;
  const table = await dal.execute(sql);
  const row = table[0];
  const count = row.count;
  return count > 0;
}

export default {
  register,
  login,
};
