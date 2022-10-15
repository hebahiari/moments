import "./register.css";
import { useRef } from "react";
import { useHistory } from "react-router";
import { registerUser } from "../../utils/api";
import { Link } from "react-router-dom";

export default function Register() {
  const username = useRef();
  const email = useRef();
  const password = useRef();
  const confirmPassword = useRef();
  const history = useHistory();

  const handleSubmit = (event) => {
    event.preventDefault();

    if (password.current.value !== confirmPassword.current.value) {
      confirmPassword.current.setCustomValidity("Passwords don't match");
    } else {
      const user = {
        username: username.current.value,
        email: email.current.value,
        password: password.current.value,
      };

      try {
        registerUser(user).then(history.push("/login"));
      } catch (error) {
        console.log(error);
      }
    }
    // loginCall({ email: email.current.value, password: password.current.value }, dispatch);
  };

  return (
    <div
      className="login"
      style={{
        backgroundImage:
          'url("https://petsgram-app.s3.us-west-1.amazonaws.com/wallpaper-pets.gif")',
      }}
    >
      <div className="loginWrapper">
        <div className="loginTitle">
          <Link to="/welcome" style={{ textDecoration: "none" }}>
            <h3 className="loginLogo">Petsgram</h3>
          </Link>

          <span className="loginDesc">Share picutres of your pets!</span>
        </div>
        <div className="loginItems">
          <form className="loginBox" onSubmit={handleSubmit} required>
            <input
              type="text"
              className="loginInput"
              placeholder="Username"
              ref={username}
              required
              minLength="8"
            />
            <input
              type="email"
              className="loginInput"
              placeholder="Email"
              ref={email}
              minLength="8"
            />
            <input
              type="password"
              className="loginInput"
              placeholder="Password"
              ref={password}
              required
              minLength="6"
              autocomplete="on"
            />
            <input
              type="password"
              className="loginInput"
              placeholder="Confirm Password"
              ref={confirmPassword}
              required
              minLength="6"
              autocomplete="on"
            />
            <button className="loginButton" type="submit">
              Sign Up
            </button>
            <Link to="/login">
              <button className="loginRegisterButton">Log In</button>
            </Link>
          </form>
        </div>
      </div>
    </div>
  );
}
