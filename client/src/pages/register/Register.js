import "./register.css";
import { useContext, useRef } from "react";
import { useHistory } from "react-router"
import { registerUser } from "../../utils/api";

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
        registerUser(user).then(history.push("/login"))
      } catch (error) {
        console.log(error);
      }
    }
    // loginCall({ email: email.current.value, password: password.current.value }, dispatch);
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
          <form className="loginBox" onSubmit={handleSubmit} required>
            <input
              type="text"
              className="loginInput"
              placeholder="Username"
              ref={username}
              required
            />
            <input
              type="email"
              className="loginInput"
              placeholder="Email"
              ref={email}
            />
            <input
              type="password"
              className="loginInput"
              placeholder="Password"
              ref={password}
              required
              minLength="6"
            />
            <input
              type="password"
              className="loginInput"
              placeholder="Confirm Password"
              ref={confirmPassword}
              required
              minLength="6"
            />
            <button className="loginButton" type="submit">
              Sign Up
            </button>
            <button className="loginRegisterButton">Log In</button>
          </form>
        </div>
      </div>
    </div>
  );
}
