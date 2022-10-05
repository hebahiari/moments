import "./welcome.css";

export default function Welcome() {
  return (
    <>
      <div
        className="welcomeWrapper"
        style={{ backgroundImage: 'url("assets/website/pets.gif")' }}
      >
        <div className="welcomeLogin">
          <div className="welcomeInput">
            <h1 className="welcomeTitle">Welcome to Petsgram!</h1>
            <div className="welcomeDesc">The place where you come to smile!</div>
            <div className="welcomeButtons">
              <button className="welcomeButton">Log In</button>
              <button className="welcomeButton">Sign Up</button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
