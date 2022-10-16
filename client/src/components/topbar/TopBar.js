import "./topbar.css";
import { Search, Menu, Close } from "@mui/icons-material";
import { Link, useHistory } from "react-router-dom";
import { useContext, useEffect, useRef, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import TopbarPopover from "../topbarPopover/TopbarPopover";
import NotificationsPopover from "../notificationsPopover/NotificationsPopover";
import { getUserNotifications } from "../../utils/api";

export default function TopBar() {
  const [menuClicked, setMenuClicked] = useState(false);
  const history = useHistory();
  const searchUsername = useRef();
  const { user, dispatch } = useContext(AuthContext);
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const abortController = new AbortController();
    try {
      setLoading(true);
      getUserNotifications(user._id, abortController.signal).then(
        (response) => {
          setNotifications(response.data);
          setLoading(false);
        }
      );
    } catch (error) {
      console.log(error);
    }
    return () => abortController.abort();
  }, [user?._id]);

  const handleSubmit = (event) => {
    event.preventDefault();
    // go to search page
    history.push(`/search?username=${searchUsername.current.value}`);
  };

  const handleClick = () => {
    // collapse/open menu
    setMenuClicked(!menuClicked);
  };

  const handleLogout = () => {
    localStorage.clear();
    dispatch({ type: "LOGOUT" });
    history.push("/welcome");
  };

  //TODO
  const handleOpenNotifications = () => {};

  const hamburgerMenuItems = (
    <>
      <div className="topbarRightHamburgerMenu">
        <span className="topbarRightHamburgerItem">
          <Link to="/" style={{ textDecoration: "none", color: "#555555" }}>
            Home
          </Link>
        </span>
        <span className="topbarRightHamburgerItem">
          <Link
            to={`/profile/${user?.username}`}
            style={{ textDecoration: "none", color: "#555555" }}
          >
            Profile
          </Link>
        </span>
        <span className="topbarRightHamburgerItem">
          <Link
            to="/search"
            style={{ textDecoration: "none", color: "#555555" }}
          >
            Search
          </Link>
        </span>
        <span className="topbarRightHamburgerItem" onClick={handleLogout}>
          Log out
        </span>
      </div>
      <div className="topbarRightHamburgerOverlay"></div>
    </>
  );

  if (loading) {
    return null;
  }

  return (
    <div className="topbarContainer">
      <div className="topbarCenter">
        <div className="searchBar">
          <Search className="icon" />
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="Search Usernames"
              className="searchInput"
              ref={searchUsername}
              required
            />
          </form>
        </div>
      </div>
      <div className="topbarLeft">
        <Link to="/" style={{ textDecoration: "none" }}>
          <span className="logo">Petsgram</span>
        </Link>
      </div>
      <div className="topbarRight">
        <ul className="topbarRightMenu">
          <li className="topbarRightMenuItemNotification">
            <NotificationsPopover
              user={user}
              notifications={notifications}
              handleLogout={handleOpenNotifications}
            />
          </li>
          <li className="topbarRightMenuItem">
            <TopbarPopover
              user={user}
              handleLogout={handleLogout}
              dispatch={dispatch}
            />
          </li>
        </ul>
        <div className="topbarRightHamburgerIcon" onClick={handleClick}>
          {menuClicked ? (
            <Close style={{ color: "white" }} />
          ) : (
            <Menu style={{ color: "white" }} />
          )}
        </div>
        {menuClicked ? hamburgerMenuItems : null}
      </div>
    </div>
  );
}
