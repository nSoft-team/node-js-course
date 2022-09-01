import "./Logo.css";
import logoSource from "../../../Assets/Images/logo.jpg";

function Logo(): JSX.Element {
  return (
    <div className="Logo">
      <img src={logoSource} alt="Logo" />
    </div>
  );
}

export default Logo;
