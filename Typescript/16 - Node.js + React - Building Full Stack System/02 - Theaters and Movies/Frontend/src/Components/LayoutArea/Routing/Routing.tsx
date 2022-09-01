import { Navigate, Route, Routes } from "react-router-dom";
import Home from "../../HomeArea/Home/Home";
import AddMovie from "../../MoviesArea/AddMovie/AddMovie";
import Movies from "../../MoviesArea/Movies/Movies";
import "./Routing.css";

function Routing(): JSX.Element {
  return (
    <div className="Routing">
      <Routes>
        <Route path="/home" element={<Home />} />
        <Route path="/movies" element={<Movies />} />
        <Route path="/add-movie" element={<AddMovie />} />
        <Route path="/" element={<Navigate to="/home" />} />
      </Routes>
    </div>
  );
}

export default Routing;
