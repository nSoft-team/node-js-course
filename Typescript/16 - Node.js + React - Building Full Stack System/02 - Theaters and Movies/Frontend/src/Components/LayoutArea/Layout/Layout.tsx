import { NavLink } from "react-router-dom";
import Routing from "../Routing/Routing";
import "./Layout.css";

function Layout(): JSX.Element {
  return (
    <div className="Layout">
      <NavLink to="/home">Home</NavLink>
      <span> | </span>
      <NavLink to="/movies">Movies</NavLink>
      <span> | </span>
      <NavLink to="/add-movie">Add Movie</NavLink>

      <hr />

      <h1>Theaters & Movies</h1>

      <Routing />
    </div>
  );
}

export default Layout;
