import css from "./Hours.module.css";

function Hours(): JSX.Element {
  return (
    <div className="Hours Box">
      <p className={css.CoolText}>
        Opening hours: 09:00 AM - 08:00 PM
        <span className={css.Smaller}>Sunday to Thursday</span>
      </p>
    </div>
  );
}

export default Hours;
