import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import Profile from "./pages/profile/Profile";
import Register from "./pages/register/Register";
import Welcome from "./pages/welcome/Welcome";
import { Switch, Route, Redirect } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "./context/AuthContext";
import SinglePost from "./pages/singlePost/SinglePost";
import SearchUsername from "./pages/search/SearchUsername";

function App() {
  const { user } = useContext(AuthContext);

  return (
    <Switch>
      <Route exact path="/">
        {user ? <Home /> : <Welcome />}
      </Route>
      <Route path="/welcome">
        <Welcome />
      </Route>
      <Route path="/search">
        <SearchUsername />
      </Route>
      <Route path="/login">{user ? <Redirect to="/" /> : <Login />}</Route>
      <Route path="/register">
        {user ? <Redirect to="/" /> : <Register />}
      </Route>
      <Route path="/profile/:username">
        <Profile />
      </Route>
      <Route path="/posts/:postId">
        <SinglePost />
      </Route>
    </Switch>
  );
}

export default App;
