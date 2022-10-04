import "./register.css";

export default function Register() {
  return (
    <div className="login">
      <div className="loginWrapper">
        <div className="loginLeft">
          <h3 className="loginLogo">Petsgram</h3>
          <span className="loginDesc">See Other Pets!</span>
        </div>
        <div className="loginRight">
          <div className="loginBox">
            <input type="text" className="loginInput" placeholder="Username" />
            <input type="text" className="loginInput" placeholder="Email" />
            <input type="text" className="loginInput" placeholder="Password" />
            <input type="text" className="loginInput" placeholder="Confirm Password" />
            <button className="loginButton">Sign Up</button>
            <button className="loginRegisterButton">Log In</button>
          </div>
        </div>
      </div>
    </div>
  );
}
