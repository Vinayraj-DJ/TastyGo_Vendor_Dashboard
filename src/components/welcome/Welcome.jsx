import "./Welcome.css";
import welcomeImage from "../../assets/welcome.png";

const Welcome = () => {
  return (
    <div className="welcomeSection">
      <div className="welcomeCard">
        <img
          src={welcomeImage}
          alt="Welcome"
          className="welcomeImage"
        />
      </div>
    </div>
  );
};

export default Welcome;