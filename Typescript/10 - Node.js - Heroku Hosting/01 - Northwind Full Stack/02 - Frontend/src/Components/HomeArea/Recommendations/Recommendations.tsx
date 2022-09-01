import { SyntheticEvent } from "react";
import "./Recommendations.css";

function Recommendations(): JSX.Element {
  const item1 = "Irish Coffee";
  const item2 = "Blueberries";

  function recommend1(): void {
    alert(item1);
  }

  function recommend2(args: SyntheticEvent): void {
    // SyntheticEvent is a general type for any React event containing event data
    // args is an information object regarding the current event.
    console.log(args.target); // The element raising the event.
    console.log("Event: ", args.nativeEvent);
    alert(item2);
  }

  function recommend3(item: string): void {
    alert(item);
  }

  return (
    <div className="Recommendations Box">
      <p>
        <button onClick={recommend1}>Recommend 1</button>
        <button onClick={recommend2}>Recommend 2</button>
        <button onClick={() => recommend3("Chocolate")}>Recommend 3</button>
      </p>
    </div>
  );
}

export default Recommendations;
