import { Link } from "react-router-dom";
import "./welcome.css";

export default function Welcome() {
  return (
    <>
      <div
        className="welcomeWrapper"
        style={{
          backgroundImage:
            'url("https://petsgram-app.s3.us-west-1.amazonaws.com/wallpaper-pets.gif")',
        }}
      >
        <div className="welcomeLogin">
          <div className="welcomeInput">
            <h1 className="welcomeTitle">Welcome to Petsgram!</h1>
            <div className="welcomeDesc">
              The place where you come to smile!
            </div>
            <div className="welcomeButtons">
              <Link to="/login">
                <button className="welcomeButton">Log In</button>
              </Link>
              <Link to="/Register">
                <button className="welcomeButton">Sign Up</button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
