import "./rightbar.css";
import { Celebration } from "@mui/icons-material";

export default function Rightbar({ user }) {
  return (
    <div className="rightbar">
      <div className="rightbarWrapper">
        <div className="birthdayContainer">
          <Celebration className="birthdayImg" />
          <span className="birthdayText">
            <b> Heba A </b> and <b> 3 other friends </b> have a birthday today
          </span>
        </div>
        <img src="assets/pictures/ad.jpg" className="rightbarAd" alt="" />
        <h4 className="rightbarTitle">Online Friends</h4>
        <ul className="rightbarFriendList">
          {/* {Users.map((user) => (
            <OnlineUser key={user.id} user={user} />
          ))} */}
        </ul>
      </div>
    </div>
  );
}
