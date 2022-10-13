import "./topbar.css";
import { Search, Notifications, Menu, Close } from "@mui/icons-material";
import { Link, useHistory } from "react-router-dom";
import { useContext, useRef, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import TopbarPopover from "../topbarPopover/TopbarPopover";

export default function TopBar() {
  const [menuClicked, setMenuClicked] = useState(false);
  const history = useHistory();
  const searchUsername = useRef();
  const { user, dispatch } = useContext(AuthContext);

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
    history.push("/welcome");
  };

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
            to={`/profile/${user.username}`}
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
            <Notifications />
            <span className="topbarIconBadge">1</span>
          </li>
          {/* //TODO add notifications */}
          <li className="topbarRightMenuItem">
            <TopbarPopover user={user} handleLogout={handleLogout} />
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
        {/* <div className="topbarIcons">
          <div className="topbarIconsItem">
            <Notifications />
            <span className="topbarIconBadge">1</span>
          </div>
        </div>
        <Link to={`/profile/${user.username}`}>
          <img
            src={user.profilePicture}
            alt="profile"
            className="topbarImage"
          />
        </Link> */}
      </div>
    </div>
  );
}
