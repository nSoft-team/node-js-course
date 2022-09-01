import "./Specials.css";

// Conditional Rendering

function Specials(): JSX.Element {
  return (
    <div className="Specials Box">
      <p>
        Our Specials:
        {/* Ternary Operator */}
        {isWeekend() ? <span>Pizza</span> : <span>Pasta</span>}
        {/* Short Circuit */}
        {isWeekend() && <span>Cholent</span>}
      </p>
    </div>
  );
}

function isWeekend(): boolean {
  const now = new Date();
  const dayOfWeek = now.getDay() + 1;
  return dayOfWeek >= 6;
}

export default Specials;
