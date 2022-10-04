import "./rightbar.css";
import { Celebration } from "@mui/icons-material";
import { Users } from "../../dummyData";
import OnlineUser from "../onlineUser/OnlineUser";

export default function Rightbar({profile}) {

const ProfileRightBar = () => {
  return (
    <>
    <h4 className="rightbarTitle">User Information</h4>
    <div className="rightbarInfo">
      <div className="rightbarInfoItem">
        <span className="rightbarInfoKey">City:</span>
        <span className="rightbarInfoValue">San Jose</span>
      </div>
      <div className="rightbarInfoItem">
        <span className="rightbarInfoKey">Relationship:</span>
        <span className="rightbarInfoValue">Single</span>
      </div>
    </div>
    <h4 className="rightbarTitle">User Information</h4>
<div className="rightbarFollowings">
  <div className="rightbarFollowing">
    <img src="assets/people/2.png" alt="" className="rightbarFollowingImg" />
  <span className="rightbarFollowingName">Taffy T</span>
  </div>
</div>
    </>
  )
}

const HomeRightBar = () => {
return (
  <>
          <div className="birthdayContainer">
          <Celebration className="birthdayImg" />
          <span className="birthdayText">
            <b> Heba A </b> and <b> 3 other friends </b> have a birthday today
          </span>
        </div>
        <img src="assets/pictures/ad.jpg" className="rightbarAd" alt="" />
        <h4 className="rightbarTitle">Online Friends</h4>
        <ul className="rightbarFriendList">
          {Users.map((user) => (
            <OnlineUser key={user.id} user={user} />
          ))}
        </ul>
  </>
)
}


  return (
    <div className="rightbar">
      <div className="rightbarWrapper">
    {profile? <ProfileRightBar/> : <HomeRightBar/> }
      </div>
    </div>
  );
}
