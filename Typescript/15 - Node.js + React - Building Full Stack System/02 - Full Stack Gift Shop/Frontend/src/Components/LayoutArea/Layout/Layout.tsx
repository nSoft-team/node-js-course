import { NavLink } from "react-router-dom";
import Routing from "../Routing/Routing";
import "./Layout.css";

function Layout(): JSX.Element {
  return (
    <div className="Layout">
      <nav>
        <NavLink to="/home">Home</NavLink>
        <span> | </span>
        <NavLink to="/gift-list">Gifts</NavLink>
        <span> | </span>
        <NavLink to="/add-gift">New</NavLink>
      </nav>

      <h1>Gift Shop</h1>

      <hr />

      <Routing />
    </div>
  );
}

export default Layout;
