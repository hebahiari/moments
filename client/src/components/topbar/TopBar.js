import "./topbar.css";
import { Search, Person, Notifications, Menu } from "@mui/icons-material";
import { Link } from "react-router-dom";
import { useContext, useState } from "react";
import { AuthContext } from "../../context/AuthContext";

export default function TopBar() {
  const { user } = useContext(AuthContext);
  const [menuClicked, setMenuClicked] = useState(false);

  const handleClick = () => {
    setMenuClicked(!menuClicked);
  };

  const hamburgerMenuItems = (
    <>
      <div className="topbarRightHamburgerMenu">
        <span className="topbarRightHamburgerItem">
          <Link to="/">Home</Link>
        </span>
        <span className="topbarRightHamburgerItem">
          <Link to={`/profile/${user.username}`}>Profile</Link>
        </span>
        <span className="topbarRightHamburgerItem">
          <Link to="/">Search</Link>
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
          <input
            type="text"
            placeholder="Search Moments"
            className="searchInput"
          />
        </div>
      </div>
      <div className="topbarLeft">
        <Link to="/" style={{ textDecoration: "none" }}>
          <span className="logo">Petsgram</span>
        </Link>
      </div>
      <div className="topbarRight">
        <ul className="topbarRightMenu">
          <li className="topbarRightMenuItem">
            <Notifications />
            <span className="topbarIconBadge">1</span>
          </li>
          <li className="topbarRightMenuItem">
            <Link to={`/profile/${user.username}`}>
              <img
                src={user.profilePicture}
                alt="profile"
                className="topbarImage"
              />
            </Link>
          </li>
        </ul>
        <div className="topbarRightHamburgerIcon" onClick={handleClick}>
          <Menu />
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
