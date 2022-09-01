import axios from "axios";
import CredentialsModel from "../Models/CredentialsModel";
import UserModel from "../Models/UserModel";
import { loginAction, logoutAction, registerAction } from "../Redux/AuthState";
import store from "../Redux/Store";
import config from "../Utils/Config";

class AuthService {
  public async register(user: UserModel): Promise<void> {
    const response = await axios.post<string>(config.registerUrl, user);
    const token = response.data;
    store.dispatch(registerAction(token));
  }

  public async login(credentials: CredentialsModel): Promise<void> {
    const response = await axios.post<string>(config.loginUrl, credentials); // Unique case for post without adding data to database.
    const token = response.data;
    store.dispatch(loginAction(token));
  }

  public logout(): void {
    store.dispatch(logoutAction());
  }
}

const authService = new AuthService();

export default authService;
