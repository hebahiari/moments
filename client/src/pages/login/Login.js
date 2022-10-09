// import "./login.css";
import { useContext, useRef } from "react";
import { loginCall } from "../../utils/api";
import { AuthContext } from "../../context/AuthContext";
import { Link } from "react-router-dom";
// import { CircularProgress } from '@material-ui/core';

export default function Login() {
  const email = useRef();
  const password = useRef();
  const { user, isFetching, error, dispatch } = useContext(AuthContext);

  const handleSubmit = (event) => {
    event.preventDefault();
    loginCall(
      { email: email.current.value, password: password.current.value },
      dispatch
    );
  };

  return (
    <div
      className="login"
      style={{ backgroundImage: 'url("assets/website/pets.gif")' }}
    >
      <div className="loginWrapper">
        <div className="loginTitle">
          <Link to="/welcome" style={{ textDecoration: "none" }}>
            <h3 className="loginLogo">Petsgram</h3>
          </Link>
          <span className="loginDesc">Share picutres of your pets!</span>
        </div>
        <div className="loginItems">
          <form className="loginBox" onSubmit={handleSubmit}>
            <input
              type="email"
              className="loginInput"
              placeholder="Email"
              ref={email}
              required
            />
            <input
              type="password"
              className="loginInput"
              placeholder="Password"
              ref={password}
              required
              minLength={5}
            />
            <span className="loginForgot">Forgot Password?</span>
            <button className="loginButton" type="submit">
              {isFetching
                ? //ADD: fix this situation
                  // <CircularProgress size="20px" color="white" />
                  "Loading ..."
                : "Log in"}
            </button>
            {/* //TODO: register button not working */}
            <Link to="/register">
              <button className="loginRegisterButton">Sign Up</button>
            </Link>
          </form>
        </div>
      </div>
    </div>
  );
}
