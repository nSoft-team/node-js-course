import "./Home.css";
import giftSource from "../../../Assets/Images/gift.jpg";

function Home(): JSX.Element {
  return (
    <div className="Home">
      <p>
        Kiddush cups, menorah mascots, and many other products inspired by
        different eras in Jewish history and museum exhibitions
      </p>

      <img src={giftSource} />
    </div>
  );
}

export default Home;
