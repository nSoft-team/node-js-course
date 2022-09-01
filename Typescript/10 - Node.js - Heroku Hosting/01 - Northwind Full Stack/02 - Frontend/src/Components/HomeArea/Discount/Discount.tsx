import "./Discount.css";

// Interpolation

function Discount(): JSX.Element {
  const discount = 10; // Demo of a backend value.

  return (
    <div className="Discount Box">
      <p>Only now {discount}% discount on all products!</p>
    </div>
  );
}

export default Discount;
