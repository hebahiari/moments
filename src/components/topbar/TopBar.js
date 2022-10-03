import "./topbar.css";
import { Search, Person, Notifications, Chat } from "@mui/icons-material";

export default function TopBar() {
  return (
    <div className="topbarContainer">
      <div className="topbarLeft">
        <span className="logo">Moments</span>
      </div>

      <div className="topbarCenter">
        <div className="searchBar">
          <Search className="icon"/>
          <input
            type="text"
            placeholder="Search Moments"
            className="searchInput"
          />
        </div>
      </div>

      <div className="topbarRight">
        <div className="topbarLinks">
          <span className="topbarLinks">Home</span>
          <span className="topbarLinks">Profile</span>
        </div>

        <div className="topbarIcons">
          <div className="topbarIconsItem">
            <Person />
            <span className="topbarIconBadge">1</span>
          </div>
          <div className="topbarIconsItem">
            <Notifications />
            <span className="topbarIconBadge">1</span>
          </div>
          <div className="topbarIconsItem">
            <Chat />
            <span className="topbarIconBadge">1</span>
          </div>
        </div>

        <img src="/assets/people/1.jpg" alt="profile" className="topbarImage" />
      </div>
    </div>
  );
}
