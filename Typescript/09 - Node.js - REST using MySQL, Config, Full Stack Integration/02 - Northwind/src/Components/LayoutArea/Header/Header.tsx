import AuthMenu from "../../AuthArea/AuthMenu/AuthMenu";
import Logo from "../../HomeArea/Logo/Logo";
import "./Header.css";

function Header(): JSX.Element {
  return (
    <div className="Header">
      {/* Display Image */}
      <Logo />

      {/* Auth Menu */}
      <AuthMenu />

      <h1>Northwind Traders 🚀</h1>
    </div>
  );
}

export default Header;
