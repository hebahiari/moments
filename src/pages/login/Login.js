import "./login.css";

export default function Login() {
  return (
    <div className="login">
      <div className="loginWrapper">
        <div className="loginLeft">
          <h3 className="loginLogo">Petsgram</h3>
          <span className="loginDesc">See Other Pets!</span>
        </div>
        <div className="loginRight">
          <div className="loginBox">
            <input type="text" className="loginInput" placeholder="Email" />
            <input type="text" className="loginInput" placeholder="Password" />
            <button className="loginButton">Log in</button>
            <span className="loginForgot">Forgot Password?</span>
            <button className="loginRegisterButton">Sign Up</button>
          </div>
        </div>
      </div>
    </div>
  );
}
