import "./topbar.css";
import { Search, Person, Notifications } from "@mui/icons-material";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";

export default function TopBar() {
  const { user } = useContext(AuthContext);

  return (
    <div className="topbarContainer">
      <div className="topbarLeft">
        <Link to="/" style={{ textDecoration: "none" }}>
          <span className="logo">Petsgram</span>
        </Link>
      </div>

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

      <div className="topbarRight">
        <div className="topbarIcons">
          <div className="topbarIconsItem">
            <Person />
            <span className="topbarIconBadge">1</span>
          </div>
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
        </Link>
      </div>
    </div>
  );
}
