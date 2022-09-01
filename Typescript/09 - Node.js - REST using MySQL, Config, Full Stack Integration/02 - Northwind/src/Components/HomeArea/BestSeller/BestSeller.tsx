import { useState } from "react";
import "./BestSeller.css";

function BestSeller(): JSX.Element {
  // const nameArr = useState(""); // "" init
  // const name = nameArr[0]; // The state value
  // const setName = nameArr[1]; // Function for changing the state and automatically render the component.

  // Save as above:
  const [name, setName] = useState("");

  // const itemsArr = useState(0);
  // const totalItems = itemsArr[0];
  // const setTotalItems = itemsArr[1];

  // Same as above:
  const [totalItems, setTotalItems] = useState(0);

  function show(): void {
    setName("Exotic Liquids");
    setTotalItems(170);
  }

  return (
    <div className="BestSeller Box">
      <p>
        <button onClick={show}>Best Seller</button>
        <span>Name: {name} | </span>
        <span>Total Items: {totalItems}</span>
      </p>
    </div>
  );
}

export default BestSeller;
