import "./profileInfo.css";
import { Add, Remove } from "@mui/icons-material";
import OnlineUser from "../onlineUser/OnlineUser";
import { useContext, useEffect, useState } from "react";
import { followUser, getFollowingUsers, unfollowUser } from "../../utils/api";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";

export default function ProfileInfo({ user }) {
  const [followingUsers, setFollowingUsers] = useState([]);
  const { user: currentUser, dispatch } = useContext(AuthContext);
  const [followed, setFollowed] = useState(false);

  useEffect(() => {
    try {
      getFollowingUsers(user._id).then((response) =>
        setFollowingUsers(response.data)
      );
    } catch (error) {
      console.log(error);
    }
  }, [user]);

  useEffect(() => {
    setFollowed(currentUser.following.includes(user?._id));
  }, [currentUser, user]);

  const handleClick = () => {
    try {
      if (followed) {
        unfollowUser(user._id, currentUser._id).then(setFollowed(false));
        dispatch({ type: "UNFOLLOW", payload: user._id });
      } else {
        followUser(user._id, currentUser._id).then(setFollowed(true));
        dispatch({ type: "FOLLOW", payload: user._id });
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="profileInfo">
      <div className="profileInfoWrapper">
        {user.username !== currentUser._id && (
          <button className="profileInfoFollowButton" onClick={handleClick}>
            {followed ? <Remove /> : <Add />}
            {followed ? "Unfollow" : "Follow"}
          </button>
        )}
        <h4 className="profileInfoTitle">User Information</h4>
        <div className="profileInfoInfo">
          <div className="profileInfoInfoItem">
            <span className="profileInfoInfoKey">Pets:</span>
            <span className="profileInfoInfoValue">
              {user.pets && user.pets.length
                ? user.pets.join("! ")
                : "No data yet"}
            </span>
          </div>
        </div>
        <h4 className="profileInfoTitle">Following List</h4>
        <div className="profileInfoFollowings">
          <div className="profileInfoFollowing">
            {followingUsers.map((person) => {
              return (
                <Link
                  to={`/profile/${person.username}`}
                  style={{ textDecoration: "none" }}
                >
                  <img
                    src={person.profilePicture}
                    alt=""
                    className="profileInfoFollowingImg"
                  />
                  <span className="profileInfoFollowingName">
                    {person.username}
                  </span>
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
