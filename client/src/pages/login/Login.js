import "./login.css";
import { useContext, useRef } from "react";
import { loginCall } from "../../utils/api";
import { AuthContext } from "../../context/AuthContext";
import { Link } from "@mui/material";
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
        <div className="loginLeft">
          <h3 className="loginLogo">Petsgram</h3>
          <span className="loginDesc">See Other Pets!</span>
        </div>
        <div className="loginRight">
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
            <Link to="/register">
              <button className="loginRegisterButton">Sign Up</button>
            </Link>
          </form>
        </div>
      </div>
    </div>
  );
}
