import "./Sales.css";

// percent
// category

// Creating a data type:
interface SalesProps {
  percent: number;
  category: string;
}

function Sales(props: SalesProps): JSX.Element {
  return (
    <div className="Sales Box">
      <p>
        Sale: {props.percent}% discount on all {props.category}
      </p>
    </div>
  );
}

export default Sales;
