import "./profileInfo.css";
import { Add, Remove } from "@mui/icons-material";
import OnlineUser from "../onlineUser/OnlineUser";
import { useContext, useEffect, useState } from "react";
import {
  followUser,
  getFollowingUsers,
  unfollowUser,
  getFollowersUsers,
} from "../../utils/api";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";

export default function ProfileInfo({ user }) {
  const [followingUsers, setFollowingUsers] = useState([]);
  const [followersUsers, setFollowersUsers] = useState([]);
  const { user: currentUser, dispatch } = useContext(AuthContext);
  const [followed, setFollowed] = useState(false);

  useEffect(() => {
    try {
      getFollowingUsers(user._id).then((response) =>
        setFollowingUsers(response.data)
      );
      getFollowersUsers(user._id).then((response) =>
        setFollowersUsers(response.data)
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
        {user._id !== currentUser._id && (
          <button className="profileInfoFollowButton" onClick={handleClick}>
            {followed ? (
              <Remove style={{ color: "white" }} />
            ) : (
              <Add style={{ color: "white" }} />
            )}
            {followed ? "Unfollow" : "Follow"}
          </button>
        )}
        <h4 className="profileInfoTitle">User Information</h4>
        <div className="profileInfoSections">
          <div className="profileInfoSection">
            <span className="profileInfoInfoKey">Pets:</span>
            <span className="profileInfoInfoValue">
              {user.pets && user.pets.length
                ? user.pets.join("! ")
                : "No data yet"}
            </span>
          </div>
          <div className="profileInfoSection">
            <h4 className="profileInfoInfoKey">Following:</h4>
            <div className="profileInfoFollowings">
              {followingUsers.map((person) => {
                return (
                  <Link
                    className="profileInfoFollowing"
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
          <div className="profileInfoSection">
            <h4 className="profileInfoInfoKey">Followers:</h4>
            <div className="profileInfoFollowings">
              <div className="profileInfoFollowing">
                {followersUsers.map((person) => {
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
      </div>
    </div>
  );
}
