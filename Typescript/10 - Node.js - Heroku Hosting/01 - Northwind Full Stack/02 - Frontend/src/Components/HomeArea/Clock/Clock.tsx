import { useEffect, useState } from "react";
import "./Clock.css";

function Clock(): JSX.Element {
  const [time, setTime] = useState("");

  useEffect(() => {
    // Will be invoked only once - when component started (because of the []):
    const timerId = setInterval(() => {
      console.log(Math.random());
      const now = new Date();
      setTime(now.toLocaleTimeString());
    }, 1000);

    // Will be invoked only when component destroyed:
    return () => clearInterval(timerId);
  }, []);

  return (
    <div className="Clock Box">
      <p>
        <span>{time}</span>
      </p>
    </div>
  );
}

export default Clock;
