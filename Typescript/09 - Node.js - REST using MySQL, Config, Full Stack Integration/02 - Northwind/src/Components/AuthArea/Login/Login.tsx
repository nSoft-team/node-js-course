import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import CredentialsModel from "../../../Models/CredentialsModel";
import authService from "../../../Services/AuthService";
import notify from "../../../Services/NotifyService";
import "./Login.css";

function Login(): JSX.Element {
  const navigate = useNavigate();
  const { register, handleSubmit, formState } = useForm<CredentialsModel>();

  async function submit(credentials: CredentialsModel) {
    try {
      await authService.login(credentials);
      notify.success("You are now logged-in");

      navigate("/home");
    } catch (err: any) {
      notify.error(err);
    }
  }

  return (
    <div className="Login Box">
      <h2>Login</h2>

      <form onSubmit={handleSubmit(submit)}>
        <label>Username: </label>
        <input type="text" {...register("username")} />

        <label>Password: </label>
        <input type="password" {...register("password")} />

        <button>Login</button>
      </form>
    </div>
  );
}

export default Login;
