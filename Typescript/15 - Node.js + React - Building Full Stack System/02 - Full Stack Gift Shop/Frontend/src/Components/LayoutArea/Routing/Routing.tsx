import { Navigate, Route, Routes } from "react-router-dom";
import AddGift from "../../GiftsArea/AddGift/AddGift";
import GiftList from "../../GiftsArea/GiftList/GiftList";
import Home from "../../HomeArea/Home/Home";
import "./Routing.css";

function Routing(): JSX.Element {
  return (
    <div>
      <Routes>
        <Route path="/home" element={<Home />} />
        <Route path="/gift-list" element={<GiftList />} />
        <Route path="/add-gift" element={<AddGift />} />
        <Route path="/" element={<Navigate to="/home" />} />
      </Routes>
    </div>
  );
}

export default Routing;
