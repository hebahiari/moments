import "./register.css";
import { useContext, useRef, useState } from "react";
import { useHistory } from "react-router";
import { getUserById, getUserByUsername, registerUser } from "../../utils/api";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";

export default function Register() {
  const username = useRef();
  const email = useRef();
  const password = useRef();
  const confirmPassword = useRef();
  const history = useHistory();
  const [loginError, setLoginError] = useState(null);
  const { dispatch } = useContext(AuthContext);

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
        registerUser(user)
          .then(() =>
            getUserByUsername(user.username).then((response) => {
              localStorage.setItem("storedUser", JSON.stringify(response.data));
              dispatch({ type: "LOGIN_SUCCESS", payload: response.data });
              history.push("/");
            })
          )
          .catch((response) => {
            setLoginError(response.response.data.error);
          });
      } catch (error) {
        console.log(error);
      }
    }
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
            {loginError ? (
              <div className="loginError" style={{ marginBottom: "0px" }}>
                {loginError}
              </div>
            ) : null}
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
