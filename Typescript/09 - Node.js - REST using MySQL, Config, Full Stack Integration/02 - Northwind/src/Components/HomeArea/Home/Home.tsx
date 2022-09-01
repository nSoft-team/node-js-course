import BestSeller from "../BestSeller/BestSeller";
import Clock from "../Clock/Clock";
import Desserts from "../Desserts/Desserts";
import Discount from "../Discount/Discount";
import Hours from "../Hours/Hours";
import RandomColor from "../RandomColor/RandomColor";
import Recommendations from "../Recommendations/Recommendations";
import Sales from "../Sales/Sales";
import Specials from "../Specials/Specials";
import Suggestions from "../Suggestions/Suggestions";
import "./Home.css";

function Home(): JSX.Element {
  return (
    <div className="Home">
      {/* Interpolation */}
      <Discount />

      {/* Conditional Rendering */}
      <Specials />

      {/* Displaying Lists */}
      <Desserts />

      {/* Events */}
      <Recommendations />

      {/* Props */}
      <Sales percent={10} category="Beverages" />
      <Sales percent={15} category="Fruits" />

      {/* State */}
      <BestSeller />

      {/* Side Effects */}
      <Clock />

      {/* Class Component */}
      <Suggestions header="Cool Suggestions" />

      {/* Dynamic Styling */}
      <RandomColor />

      {/* CSS Modules */}
      <Hours />
    </div>
  );
}

export default Home;
