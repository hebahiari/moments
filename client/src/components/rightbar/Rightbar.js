import "./rightbar.css";
import { Celebration, Add } from "@mui/icons-material";
import OnlineUser from "../onlineUser/OnlineUser";
import { useContext, useEffect, useState } from "react";
import { getFollowingUsers } from "../../utils/api";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";

export default function Rightbar({ user }) {
  const [followingUsers, setFollowingUsers] = useState([]);
  const { user: currentUser } = useContext(AuthContext);

  useEffect(() => {
    try {
      getFollowingUsers(user._id).then((response) =>
        setFollowingUsers(response.data)
      );
    } catch (error) {
      console.log(error);
    }
  }, [user]);

  const ProfileRightBar = () => {
    return (
      <>
        {user.username !== currentUser._id && (
          <button className="rightbarFollowButton">
            <Add /> Follow
          </button>
        )}
        <h4 className="rightbarTitle">User Information</h4>
        <div className="rightbarInfo">
          <div className="rightbarInfoItem">
            <span className="rightbarInfoKey">Pets:</span>
            <span className="rightbarInfoValue">
              {user.pets && user.pets.length
                ? user.pets.join("! ")
                : "No data yet"}
            </span>
          </div>
        </div>
        <h4 className="rightbarTitle">User Information</h4>
        <div className="rightbarFollowings">
          <div className="rightbarFollowing">
            {followingUsers.map((person) => {
              return (
                <Link
                  to={`/profile/${person.username}`}
                  style={{ textDecoration: "none" }}
                >
                  <img
                    src={person.profilePicture}
                    alt=""
                    className="rightbarFollowingImg"
                  />
                  <span className="rightbarFollowingName">
                    {person.username}
                  </span>
                </Link>
              );
            })}
          </div>
        </div>
      </>
    );
  };

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
          {/* {Users.map((user) => (
            <OnlineUser key={user.id} user={user} />
          ))} */}
        </ul>
      </>
    );
  };

  return (
    <div className="rightbar">
      <div className="rightbarWrapper">
        {user ? <ProfileRightBar /> : <HomeRightBar />}
      </div>
    </div>
  );
}
